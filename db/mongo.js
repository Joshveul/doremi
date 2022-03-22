import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI + '/doremi' || 'mongodb://localhost:37017/doremi')

export default mongoose
