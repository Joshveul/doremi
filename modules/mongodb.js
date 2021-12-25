/* eslint-disable no-console */
import client from '../api/mongo'

export default function () {
  this.nuxt.hook('render:setupMiddleware', async () => {
    await client.connect()
    console.info('Connected successfully to MongoDB')
  })
}
