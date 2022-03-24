import { Schema, Types } from 'mongoose'

const playerStateSchema = new Schema({
  currentSong: Types.ObjectId, // ObjectId from Playlist collection
  playing: Boolean,
  currentSecond: Number
})

export default playerStateSchema
