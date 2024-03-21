/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import Log from '../db/model/log'
import { getQueryParam, convertSecondsToTime } from './utils'
import { songsByUser } from './aggregation-schemas/songsByUser'

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse()) {
  console.info('Starting getAddedSongs request...')
  const result = { count: 0, results: [] }

  const userId = getQueryParam(req.url, 'userId')

  const mongoResult = await Log.aggregate(songsByUser(userId)).exec()

  const results = mongoResult.map((e) => {
    e = e.song[0]
    return {
      videoId: e.ytId,
      title: e.title,
      artist: e.artist,
      thumbnail: e.thumbnail,
      channel: e.channel.name,
      duration: convertSecondsToTime(e.duration),
      source: 'storage',
      id: e._id,
      downloading: false,
      encoding: false,
      processing: false,
      processingProgress: 100
    }
  })

  result.results = results
  result.count = results.length

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
