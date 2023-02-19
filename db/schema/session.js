import { Schema, Types } from 'mongoose'

const sessionSchema = new Schema({
  users: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  songs: [{
    type: Types.ObjectId,
    ref: 'Song'
  }],
  sessionStartDate: Date,
  sessionEndDate: Date
}, { timestamps: true })

export default sessionSchema
