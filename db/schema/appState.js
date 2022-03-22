import mongoose from '../mongo'
const { Schema } = mongoose

const appStateSchema = new Schema({
  isSessionActive: Boolean,
  activeSession: mongoose.Types.ObjectId
})

export default appStateSchema
