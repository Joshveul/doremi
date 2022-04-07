/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { URL } from 'url'
import fs from 'fs'
import cp from 'child_process'
import internal from 'stream'
import ytdl from 'ytdl-core'
import ffmpeg from 'ffmpeg-static'
import request from 'request'
import { getQueryParam } from './utils'
const Song = require('../db/model/song')

const archiveFolderPath = './static/archive'

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

  // Log the original value of the "item" parameter which contains the YT Video object
  console.log(`Incoming download request for item: ${query.get('item')}`)

  // Decode the item and parse it to a usable JSON object
  const item = JSON.parse(decodeURI(query.get('item')))

  // Log the parsed value
  console.log(item)

  // Get the ID of the user that requested the download from the query parameters
  const userId = getQueryParam(req.url, 'userId')

  const videoId = item.videoId

  const thumbnailPath = archiveFolderPath + '/' + videoId + '.jpg'
  const videoPath = archiveFolderPath + '/' + videoId + '.mp4'

  if (process.env.MODE === 'offline') {
    console.info('MODE=offline. Mocking successful download of video ', videoId)
    setTimeout(() => {
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    }, 5000)
  } else {
    console.log('Song ' + videoId + '  exists?')
    const doesSongExist = await Song.exists(videoId, { action: 'Search', userId })
    if (doesSongExist) {
      console.log('Yes, song ' + videoId + ' exists, skipping download...')
      res.statusCode = 200
      res.statusMessage = 'Existing'
      res.end()
    } else {
      console.log('No, downloading...')

      console.log('Video: ', await ytdl.getInfo(videoId))

      // Download thumbnail
      const thumbnailUrl = decodeURIComponent(item.thumbnail)
      console.log('Downloading thumbnail from ' + thumbnailUrl)
      await download(thumbnailUrl, thumbnailPath)
      console.log('Thumbnail downloaded successfully to ' + thumbnailPath)

      // Get video and audio streams separately
      const audioStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestaudio' })
      const videoStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestvideo' })

      let audioDownloadProgress

      audioStream.on('progress', function (length, downloaded, totalLength) {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== audioDownloadProgress) {
          audioDownloadProgress = currentProgress
          console.log('Audio progress: ', audioDownloadProgress)
        }
      })

      let videoDownloadProgress = 0

      videoStream.on('progress', (length, downloaded, totalLength) => {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== videoDownloadProgress) {
          videoDownloadProgress = currentProgress
          console.log('Video progress: ', videoDownloadProgress)
        }
      })
      try {
        await combineAudioAndVideo(audioStream, videoStream, videoPath)
      } catch (error) {
        res.statusCode = 500
        res.statusMessage = 'Error'
        res.end()
      }

      console.log('Done')
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    }
  }
}
