import { Schema, Types } from 'mongoose'

const appStateSchema = new Schema({
  isSessionActive: Boolean,
  activeSession: Types.ObjectId
})

export default appStateSchema
