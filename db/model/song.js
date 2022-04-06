import { model, models } from 'mongoose'
import songSchema from '../schema/song'
const Log = require('./log')

export const dbModel = models.Song || model('Song', songSchema)

export const exists = async (songId, { action = String, userId = String }) => {
  const result = await dbModel.findOne({ ytId: songId })
  if (result !== null && result.length) {
    Log.add(userId, action, 'Song', result[0]._id)
    return true
  }
  return false
}
