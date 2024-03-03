/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { convertSecondsToTime } from './utils'
const Song = require('../db/model/song')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getStoredSongsList request...')
  const result = { count: 0, results: [] }

  const mongoResult = await Song.dbModel.find()

  const results = mongoResult.map((e) => {
    return {
      videoId: e.ytId,
      title: e.title,
      artist: e.artist,
      thumbnail: e.thumbnail,
      channel: e.channel.name,
      duration: convertSecondsToTime(e.duration),
      source: 'storage',
      id: e._id,
      downloading: e.isDownloading || false,
      encoding: e.isEncoding || false,
      processing: e.isProcessing || false,
      audioDownloadProgress: e.audioDownloadProgress || 100,
      videoDownloadProgress: e.videoDownloadProgress || 100
    }
  })

  result.results = results
  result.count = results.length

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
