/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import client from '../api/mongo'

const db = client.db('doremi')
const collection = db.collection('songs')

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getSong request...')
  const result = { count: 0, results: [] }
  const id = getQueryParam(req.url, 'id')

  if (id !== '') {
    if (process.env.MODE !== 'offline') {
      result.results = await collection.find({ videoId: id }).toArray()
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
