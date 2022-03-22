import mongoose from '../mongo'
const { Schema } = mongoose

const playerStateSchema = new Schema({
  song: mongoose.Types.ObjectId,
  addedBy: mongoose.Types.ObjectId,
  order: Number
})

export default playerStateSchema
