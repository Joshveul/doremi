import { Schema, Types } from 'mongoose'

const favoriteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  song: {
    type: Types.ObjectId,
    ref: 'Song'
  },
  dateAdded: Date
}, { timestamps: true })

export default favoriteSchema
