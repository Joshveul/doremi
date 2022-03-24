import { Schema, Types } from 'mongoose'

const favoriteSchema = new Schema({
  userId: Types.ObjectId,
  songId: Types.ObjectId,
  dateAdded: Date
})

export default favoriteSchema
