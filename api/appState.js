/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { getDbCollection, getQueryParam } from './utils'

const appStateCollection = getDbCollection('appState')

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
