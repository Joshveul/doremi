/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { ObjectId } from 'mongodb'
import { getDbCollection, getQueryParam } from './utils'

const appStateCollection = getDbCollection('songs')

const pipeline = [
  { $match: { _id: ObjectId('61d3937933c211eeb5f9358a') } },
  { $lookup: { from: 'users', localField: 'firstAddedBy', foreignField: '_id', as: 'firstAddedBy' } }
]

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const action = getQueryParam(req.url, 'action')
  const aggCursor = appStateCollection.aggregate(pipeline)
  switch (action) {
  case 'updateQueue':
    // TODO DB Update
    // Request body = { queue: [] }
    console.log('starting loop ')
    for await (const doc of aggCursor) {
      console.log(doc)
    }
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
