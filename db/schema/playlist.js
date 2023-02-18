import { Schema, Types } from 'mongoose'

const playlistSchema = new Schema({
  song: {
    type: Types.ObjectId,
    ref: 'Song'
  },
  addedBy: {
    type: Types.ObjectId,
    ref: 'User'
  },
  hash: String,
  order: Number
})

export default playlistSchema
