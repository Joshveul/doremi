import mongoose from '../mongo'
const { Schema } = mongoose

const logSchema = new Schema({
  user: mongoose.Types.ObjectId,
  action: String,
  schema: String,
  oid: mongoose.Types.ObjectId
})

export default logSchema
