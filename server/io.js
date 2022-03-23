/* eslint-disable no-console */
import mongoose from '../db/mongo'

export default function (socket, io) {
  console.log('Registering mongo Change Stream')
  const changeStream = mongoose.connection.watch()
  changeStream.on('change', (changes) => {
    // Add a event emitter
    console.log('Emitting mongo stream...')
    socket.emit('mongoStream', changes)
  })
  io.once('connection', (socket) => {
    console.log('connected: ', socket.id)
  })
  return Object.freeze({
    /* Just define the methods here */
    fn1 (msg) {
      return { status: 'ok' }
    },
    // async fn2(msg) {
    //   const users = await getUsers(msg)
    //   return users
    // },
    fn3 (msg) {
      return new Promise((resolve, reject) => {
        console.log('message received: ', msg)
        let progress = 0
        const interval = setInterval(() => {
          socket.emit('progress', progress)
          progress += 1
        }, 1000)
        setTimeout(() => {
          socket.emit('progress', progress)
          clearInterval(interval)
          resolve(progress)
        }, 5000)
      })
    }
  })
  // })
}
