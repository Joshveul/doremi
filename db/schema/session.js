import { Schema, Types } from 'mongoose'

const sessionSchema = new Schema({
  users: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  playlist: [{
    type: Object
  }],
  sessionStartDate: Date,
  sessionEndDate: Date
}, { timestamps: true })

export default sessionSchema
