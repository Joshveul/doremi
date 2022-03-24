import { Schema } from 'mongoose'

const userSchema = new Schema({
  name: String,
  avatar: String, // A URL to the avatar image
  color: String,
  favorites: Array // An array of Song ObjectIds
})

export default userSchema
