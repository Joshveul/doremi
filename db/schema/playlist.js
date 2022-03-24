import { Schema, Types } from 'mongoose'

const playerStateSchema = new Schema({
  song: Types.ObjectId,
  addedBy: Types.ObjectId,
  order: Number
})

export default playerStateSchema
