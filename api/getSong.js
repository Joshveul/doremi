/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { getQueryParam } from './utils'
const Song = require('../db/model/song')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getSong request...')
  const result = { count: 0, results: [] }
  const id = getQueryParam(req.url, 'id')

  if (id !== '') {
    if (process.env.MODE === 'offline') {
      // Always return empty object to fake the video download
      const fakeRequest = new Promise(resolve => setTimeout(resolve([]), 2500))
      result.results = await fakeRequest
    } else {
      console.log('Finding song ', id)
      const mongoResult = await Song.dbModel.findOne({ ytId: id })
      console.log('Result from MongoDB: ', mongoResult)
      if (mongoResult !== null) {
        result.results.push(mongoResult)
        result.count = 1
      }
    }
  } else {
    console.log('ID parameter was empty, returning empty value')
  }

  console.log('getSong result: ', result)

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
