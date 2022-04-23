import { model, models } from 'mongoose'
import favoriteSchema from '../schema/favorite'
const Log = require('./log')

export const dbModel = models.Favorite || model('Favorite', favoriteSchema)

export const add = async (object = { user: String, song: String }) => {
  const query = { user: object.user, song: object.song }

  const doc = await dbModel.findByIdAndUpdate(
    query,
    { ...query, dateAdded: Date.now() },
    { upsert: true }
  )

  console.log('Favorite added: ', doc)

  Log.add(
    object.userId, 'Add favorite', 'Favorites', doc._id
  )

  return doc
}
