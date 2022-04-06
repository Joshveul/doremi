import { Schema, Types } from 'mongoose'

const appStateSchema = new Schema({
  isSessionActive: Boolean,
  currentSession: {
    type: Types.ObjectId,
    ref: 'Session'
  }
})

export default appStateSchema
