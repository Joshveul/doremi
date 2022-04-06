import { Schema, Types } from 'mongoose'

const playerStateSchema = new Schema({
  currentSong: {
    type: Types.ObjectId,
    ref: 'Playlist'
  },
  playing: Boolean,
  currentSecond: Number
})

export default playerStateSchema
