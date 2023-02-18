import { model, models } from 'mongoose'
import favoriteSchema from '../schema/favorite'
const Log = require('./log')

export const dbModel = models.Favorite || model('Favorite', favoriteSchema)

export const add = async (favorite = { user: String, song: String }) => {
  const query = { user: favorite.user, song: favorite.song }

  const doc = await dbModel.findOneAndUpdate(
    query,
    { ...query, dateAdded: Date.now() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  Log.add(
    favorite.user, 'Add favorite', 'Favorites', favorite.song
  )

  return doc
}

export const remove = async (favorite = { user: String, song: String }) => {
  const query = { user: favorite.user, song: favorite.song }

  const doc = await dbModel.findOneAndDelete(query)

  Log.add(
    favorite.user, 'Remove favorite', 'Favorites', doc._id
  )

  return doc
}
