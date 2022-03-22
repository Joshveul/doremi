import mongoose from '../mongo'
const { Schema } = mongoose

const playerStateSchema = new Schema({
  currentSong: mongoose.Types.ObjectId, // ObjectId from Playlist collection
  playing: Boolean,
  currentSecond: Number
})

export default playerStateSchema
