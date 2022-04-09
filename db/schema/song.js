import { Schema, Types } from 'mongoose'

const songSchema = new Schema({
  ytId: String,
  originalTitle: String,
  title: String,
  artist: String,
  thumbnail: String, // URL
  channel: String, // YT channel ID
  duration: String,
  audioDownloadProgress: Number,
  videoDownloadProgress: Number,
  isDownloaded: Boolean,
  firstAddedBy: {
    type: Types.ObjectId,
    ref: 'User'
  },
  timesAdded: Number,
  timesPlayed: Number,
  timesRemoved: Number,
  lastAdded: Date,
  lastPlayed: Date,
  lastRemoved: Date
})

export default songSchema
