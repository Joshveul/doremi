/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { URL } from 'url'
import fs from 'fs'
import cp from 'child_process'
import ytdl from 'ytdl-core'
import ffmpeg from 'ffmpeg-static'
import { Song, songExists } from '../db/model/song'
import { getQueryParam } from './utils'

const archiveFolderPath = './static/archive'

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const baseURL = 'http://' + req.headers.host + '/'
  const url = new URL(req.url, baseURL)
  const query = new URLSearchParams(url.search)
  console.log(`incoming download request... ${query.get('item')}`)
  const item = JSON.parse(decodeURI(query.get('item')))
  console.log(item)
  const user = getQueryParam(req.url, 'userId')
  const videoId = item.videoId

  const thumbnailPath = archiveFolderPath + '/' + videoId + '.jpg'
  const videoPath = archiveFolderPath + '/' + videoId + '.mp4'

  const shellArgs = [
    user,
    videoId,
    item.title,
    item.artist,
    decodeURIComponent(item.thumbnail),
    item.channel,
    item.duration
  ]
  if (process.env.MODE === 'offline') {
    console.info('Mocking successful download with args: ', shellArgs)
    setTimeout(() => {
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    }, 5000)
  } else {
    console.log('Song ' + videoId + '  exists?')
    const isSongExisting = await songExists(videoId)
    if (isSongExisting) {
      console.log('Yes, song ' + videoId + ' exists, skipping download...')
      res.statusCode = 200
      res.statusMessage = 'Existing'
      res.end()
    } else {
      console.log('No, downloading...')
      let videoProgress = 0
      let audioProgress = 0
      const encodingProgress = 0

      const videoStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestvideo' })
      const audioStream = ytdl('http://www.youtube.com/watch?v=' + videoId, { quality: 'highestaudio' })

      videoStream.on('progress', (length, downloaded, totalLength) => {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== videoProgress) {
          videoProgress = currentProgress
          console.log('Video progress: ', videoProgress)
        }
      })
      audioStream.on('progress', (length, downloaded, totalLength) => {
        const currentProgress = Math.floor((downloaded / totalLength) * 100)
        if (currentProgress % 5 === 0 && currentProgress !== audioProgress) {
          audioProgress = currentProgress
          console.log('Audio progress: ', audioProgress)
        }
      })

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
      ffmpegProcess.stdio[1].pipe(fs.createWriteStream(videoPath))

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
          if (exitCode === 1) {
            console.error(ffmpegLogs)
          }
        }
      )
    }

    // if (message === 'done') {
    //   res.statusCode = 200
    //   res.statusMessage = 'Archived'
    //   res.end()
    // }
    // pyshell.on('error', (code, signal) => {
    //   console.log('The exit code was: ' + code)
    //   console.log('The exit signal was: ' + signal)
    //   res.statusCode = 500
    //   res.statusMessage = 'Error'
    //   res.end()
    // })
    // pyshell.on('close', () => {
    //   res.statusCode = 400
    //   res.statusMessage = 'Unknown'
    //   res.end()
    // })
  }
}
