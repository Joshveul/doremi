/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
// import { Types } from 'mongoose'
import { getQueryParam, readRequestBody } from './utils'
const Session = require('../db/model/session')
// const Song = require('../db/model/song')

// const pipeline = [
//   { $match: { _id: Types.ObjectId('63f0a7863bd42c358127602c') } },
//   { $lookup: { from: 'users', localField: 'firstAddedBy', foreignField: '_id', as: 'firstAddedBy' } },
//   { $unwind: '$firstAddedBy' }
// ]
// Aggregation usage example
// const aggCursor = Song.dbModel.aggregate(pipeline)
// console.log('starting loop ')
// for await (const doc of aggCursor) {
//   console.log(doc)
// }

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const action = getQueryParam(req.url, 'action')
  const user = getQueryParam(req.url, 'user')
  const requestBody = await readRequestBody(req)

  switch (action) {
    case 'updateQueue':
      console.log(requestBody)
      // TODO DB Update
      // Request body = { queue: [] }
      await Session.updatePlaylist(user, requestBody)
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
