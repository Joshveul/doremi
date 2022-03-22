/* eslint-disable no-console */
import client from '../db/mongo'

// Use connect method to connect to the server
let changeStream = null
console.log('get watcher')
console.log('watching stream changes')

export default function (socket, io) {
  console.log('Registering mongo Change Stream')
  changeStream = client.connection.watch()
  changeStream.on('change', (changes) => {
    // Add a event emitter
    console.log('Emitting mongo stream...')
    socket.emit('mongoStream', changes)
  })
  return Object.freeze({
    /* Just define the methods here */
    fn1(msg) {
      return { status: 'ok' }
    },
    // async fn2(msg) {
    //   const users = await getUsers(msg)
    //   return users
    // },
    fn3(msg) {
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
