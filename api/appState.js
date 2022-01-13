/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import client from '../api/mongo'
const db = client.db('doremi')
const collection = db.collection('appstate')

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const action = getQueryParam(req.url, 'action')

  switch (action) {
    case 'updateQueue':
      // TODO DB Update
      // Request body = { queue: [] }
      console.log('Updating queue complete...')
      break
    case 'play':
    case 'pause':
    case 'currentSong':
    case 'join':
    case 'leave':
    case 'queue':
    case 'activeSession':
    default:
  }
  res.statusCode = 200
  res.statusMessage = 'Existing'
  res.end()
}
