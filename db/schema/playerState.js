import { Schema } from 'mongoose'

const playerStateSchema = new Schema({
  playing: Boolean,
  currentSecond: Number,
  currentIndex: Number
})

export default playerStateSchema
