import { Schema, Types } from 'mongoose'

const logSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  action: String,
  schema: String,
  oid: Types.ObjectId
})

export default logSchema
