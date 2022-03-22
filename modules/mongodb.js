/* eslint-disable no-console */
import mongoose from 'mongoose'

export default function () {
  this.nuxt.hook('render:setupMiddleware', async () => {
    if (process.env.MODE !== 'offline') {
      const connectionString = process.env.MONGODB_URI + '/doremi' || 'mongodb://localhost:37017/doremi'
      await mongoose.connect(connectionString)
      console.info('Connected successfully to MongoDB ' + connectionString)
    }
  })
}
