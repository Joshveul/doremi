/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { URL } from 'url'
import fs from 'fs'
import cp from 'child_process'
import internal from 'stream'
import ytdl from 'ytdl-core'
import ffmpeg from 'ffmpeg-static'
import request from 'request'
import sanitize from 'sanitize-filename'
import { queryDiscogsData } from './utils'
const Song = require('../db/model/song')

const staticFolderPath = './static'
const archiveFolderName = 'archive'
const archiveFolderPath = staticFolderPath + '/' + archiveFolderName

const download = (uri, filename) => {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res) => {
      console.log('content-type:', res.headers['content-type'])
      console.log('content-length:', res.headers['content-length'])

      if (err) {
        reject(err)
      }

      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve)
    })
  })
}

const combineAudioAndVideo = function (audioStream = new internal.Readable(), videoStream = new internal.Readable(), destinationPath) {
  return new Promise((resolve, reject) => {
    const ffmpegProcess = cp.spawn(ffmpeg, [
      '-i', 'pipe:3',
      '-i', 'pipe:4',
      '-map', '0:v',
      '-map', '1:a',
      '-c:v', 'copy',
      '-c:a', 'libmp3lame',
      '-crf', '27',
      '-preset', 'veryfast',
      '-movflags', 'frag_keyframe+empty_moov',
      '-f', 'mp4',
      '-loglevel', 'error',
      '-'
    ], {
      stdio: [
        'pipe', 'pipe', 'pipe', 'pipe', 'pipe'
      ]
    })

    videoStream.pipe(ffmpegProcess.stdio[3])
    audioStream.pipe(ffmpegProcess.stdio[4])
    ffmpegProcess.stdio[1].pipe(fs.createWriteStream(destinationPath))

    let ffmpegLogs = ''

    ffmpegProcess.stdout.on(
      'data',
      (chunk) => {
        ffmpegLogs += chunk.toString()
      }
    )

    ffmpegProcess.on(
      'exit',
      (exitCode) => {
        console.log('Finished encoding.')
        resolve()
        if (exitCode === 1) {
          reject(new Error('Encoding failed: ', ffmpegLogs))
          console.error(ffmpegLogs)
        }
      }
    )
  })
}

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  // Construct a URL based on the origin request host to easily get the queryParams from it
  const baseURL = 'http://' + req.headers.host + '/'
  const url = new URL(req.url, baseURL)
  const query = new URLSearchParams(url.search)

  console.log(`Incoming download request for item: ${query.get('item')}`)
  const item = JSON.parse(decodeURI(query.get('item')))
  console.log(item)

  const { videoId, artist, title } = item

  const fileName = sanitize(artist + ' - ' + title + ' - ' + videoId)

  const thumbnailPath = archiveFolderName + '/' + fileName + '.jpg'
  const thumbnailSavePath = archiveFolderPath + '/' + fileName + '.jpg'
  const videoPath = archiveFolderPath + '/' + fileName + '.mp4'

  if (process.env.MODE === 'offline') {
    console.info('MODE=offline. Mocking successful download of video ', videoId)
    setTimeout(() => {
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    }, 5000)
  } else {
    try {
      // const { videoDetails } = await ytdl.getInfo(videoId)
      // console.log(videoDetails)

      // Get metadata from Discogs
      const discogsData = await queryDiscogsData(artist + ' ' + title)

      if (discogsData) {
        item.genre = discogsData.genre || []
        item.style = discogsData.style || []
        // if ('cover_image' in discogsData && discogsData.cover_image !== '') {
        //   item.thumbnail = discogsData.cover_image
        // }
      }

      await Song.dbModel.findOneAndUpdate({ ytId: videoId }, {
        thumbnail: thumbnailPath,
        isDownloading: true,
        genre: item.genre,
        style: item.style
      })

      // Download thumbnail
      const thumbnailUrl = decodeURIComponent(item.thumbnail)
      console.log('Downloading thumbnail from ' + thumbnailUrl)
      await download(thumbnailUrl, thumbnailSavePath)
      console.log('Thumbnail downloaded successfully to ' + thumbnailSavePath)

      // Get video and audio streams separately
      const audioStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestaudio' })
      const videoStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestvideo' })

      // Process audio stream synchronously
      let audioDownloadProgress
      audioStream.on('progress', async function (length, downloaded, totalLength) {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== audioDownloadProgress) {
          audioDownloadProgress = currentProgress
          await Song.dbModel.updateOne({ ytId: videoId }, { audioDownloadProgress })
          console.log('Audio progress: ', audioDownloadProgress)
        }
      })

      // Process video stream synchronously
      let videoDownloadProgress = 0
      videoStream.on('progress', async (length, downloaded, totalLength) => {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== videoDownloadProgress) {
          videoDownloadProgress = currentProgress
          await Song.dbModel.updateOne({ ytId: videoId }, { videoDownloadProgress })
          console.log('Video progress: ', videoDownloadProgress)
        }
      })

      // Combine and encode the video with the audio
      await Song.dbModel.updateOne({ ytId: videoId }, { isEncoding: true })
      await combineAudioAndVideo(audioStream, videoStream, videoPath)
      await Song.dbModel.updateOne({ ytId: videoId }, { isEncoding: false })

      // At this point everything is done downloading and the song is available
      await Song.dbModel.updateOne({ ytId: videoId }, { isDownloading: false, isProcessing: false })
      console.log('Done downloading ' + item.title + item.id)

      // Prepare update to include the song in the session
      // const filter = {
      //   sessionEndDate: null
      // }
      // const update = { $set: { 'playlist.$[element].downloading': false, 'playlist.$[element].encoding': false, 'playlist.$[element].processingProgress': 100, 'playlist.$[element].processing': false } }
      // const options = {
      //   arrayFilters: [{ 'element.id': item.id }]
      // }
      // const result = await Session.dbModel.updateOne(filter, update, options)
      // console.log('Done with:', JSON.stringify(result))
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    } catch (error) {
      console.log('Error while downloading song: ', error)
      await Song.dbModel.findOneAndDelete({ ytId: videoId })
      res.statusCode = 500
      res.statusMessage = 'Error'
      res.end()
    }
  }
}
