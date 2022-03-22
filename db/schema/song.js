import mongoose from '../mongo'
const { Schema } = mongoose

const songSchema = new Schema({
  title: String,
  thumbnail: String, // URL
  channel: String, // YT channel ID
  duration: String,
  firstAddedBy: String,
  timesAdded: Number,
  timesPlayed: Number,
  timesRemoved: Number,
  lastAdded: Date,
  lastPlayed: Date,
  lastRemoved: Date
})

export default songSchema
