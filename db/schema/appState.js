import { Schema, Types } from 'mongoose'

const appStateSchema = new Schema({
  currentSession: {
    type: Types.ObjectId,
    ref: 'Session'
  }
})

export default appStateSchema
