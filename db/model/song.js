import { model, models } from 'mongoose'
import songSchema from '../schema/song'

export const Song = models.Song || model('Song', songSchema)

export const songExists = async (songId) => {
  const result = await Song.findOne({ videoId: songId })
  console.log(result.length)
  console.log(result)
  if (result.length) {
    return true
  }
  return false
}
