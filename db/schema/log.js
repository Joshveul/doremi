import { Schema, Types } from 'mongoose'

const logSchema = new Schema({
  user: Types.ObjectId,
  action: String,
  schema: String,
  oid: Types.ObjectId
})

export default logSchema
