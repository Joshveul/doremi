/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { Types } from 'mongoose'
import { getQueryParam } from './utils'
const Song = require('../db/model/song')

const pipeline = [
  { $match: { _id: Types.ObjectId('63f097d0f8aac3206b364b2e') } },
  { $lookup: { from: 'users', localField: 'firstAddedBy', foreignField: '_id', as: 'firstAddedBy' } },
  { $unwind: '$firstAddedBy' }
]

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const action = getQueryParam(req.url, 'action')
  const aggCursor = Song.dbModel.aggregate(pipeline)
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
