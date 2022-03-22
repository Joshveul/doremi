/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import Song from '../db/model/song'
import { getQueryParam } from './utils'

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getSong request...')
  const result = { count: 0, results: [] }
  const id = getQueryParam(req.url, 'id')

  if (id !== '') {
    if (process.env.MODE !== 'offline') {
      result.results = await Song.find({ videoId: id })
    } else {
      // Always return empty object to fake the video download
      const fakeRequest = new Promise(resolve => setTimeout(resolve([]), 2500))
      result.results = await fakeRequest
    }
    console.log('MongoResult: ', result.results)
    result.count = result.results.length
  } else {
    console.log('ID parameter was empty, returning empty value')
  }

  console.log('getSong result: ', result)

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
