import mongoose from '../mongo'
const { Schema } = mongoose

const sessionSchema = new Schema({
  users: Array,
  songs: Array,
  lastActive: Date
})

export default sessionSchema
