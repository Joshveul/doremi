import mongoose from '../mongo'
import userSchema from '../schema/user'
const { model } = mongoose

const User = model('User', userSchema)

export default User
