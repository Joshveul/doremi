import { Schema, Types } from 'mongoose'

const playerStateSchema = new Schema({
  currentSong: {
    type: Types.ObjectId,
    ref: 'Playlist'
  },
  playList: [{
    type: String // An array of hashes from the playlist table
  }],
  playing: Boolean,
  currentSecond: Number
})

export default playerStateSchema
