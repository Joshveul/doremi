import { Schema, Types } from 'mongoose'

const appStateSchema = new Schema({
  currentSession: {
    type: Types.ObjectId,
    ref: 'Session'
  },
  play: Boolean,
  currentSecond: Number
})

export default appStateSchema
