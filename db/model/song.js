import { model, models } from 'mongoose'
import songSchema from '../schema/song'

export const dbModel = models.Song || model('Song', songSchema)

export const exists = async (songId) => {
  const result = await dbModel.findOne({ videoId: songId })
  console.log(result.length)
  console.log(result)
  if (result.length) {
    return true
  }
  return false
}
