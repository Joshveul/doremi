import { Schema, Types } from 'mongoose'

const songSchema = new Schema({
  ytId: String,
  originalTitle: String,
  title: String,
  artist: String,
  thumbnail: String, // URL
  channel: Object,
  duration: String,
  audioDownloadProgress: Number,
  videoDownloadProgress: Number,
  isEncoding: Boolean,
  isDownloading: Boolean,
  isProcessing: Boolean,
  startAt: Number,
  endAt: Number,
  firstAddedBy: {
    type: Types.ObjectId,
    ref: 'User'
  },
  lastAddedBy: {
    type: Types.ObjectId,
    ref: 'User'
  },
  timesAdded: Number,
  timesPlayed: Number,
  timesRemoved: Number,
  lastAdded: Date,
  lastPlayed: Date,
  lastRemoved: Date
}, { timestamps: true })

export default songSchema
