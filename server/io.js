/* eslint-disable no-console */
import mongoose from 'mongoose'

const currentPlaylistFromSessionPipeline = [
  {
    $match: {
      sessionEndDate: null
    }
  },
  {
    $unwind: {
      path: '$playlist'
    }
  }, {
    $lookup: {
      from: 'users',
      let: {
        userId: {
          $toObjectId: '$playlist.user'
        }
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                '$_id', '$$userId'
              ]
            }
          }
        }
      ],
      as: 'playlist.username'
    }
  }, {
    $unwind: {
      path: '$playlist.username'
    }
  }, {
    $group: {
      _id: '$_id',
      playlist: {
        $push: '$playlist'
      }
    }
  }
]

export default function (socket, io) {
  console.log('Registering mongo Change Stream')
  const changeStream = mongoose.connection.watch()
  const songStream = mongoose.model('Song').watch()
  const sessionStream = mongoose.model('Session').watch()
  const appStateStream = mongoose.model('AppState').watch()

  songStream.on('change', (changes) => {
    socket.emit('songsListChanged', changes)
  })
  appStateStream.on('change', (change) => {
    if (change.operationType === 'update') {
      if ('play' in change.updateDescription.updatedFields) {
        socket.emit('playStateChanged', change.updateDescription.updatedFields.play)
      }
    }
  })
  sessionStream.on('change', async (change) => {
    try {
      if (change.operationType === 'update') {
        if ('sessionEndDate' in change.updateDescription.updatedFields && change.updateDescription.updatedFields.sessionEndDate !== null) {
          console.log('Session terminated')
          socket.emit('sessionTerminated')
          return
        }
        if ('playlist' in change.updateDescription.updatedFields) {
          console.log('Playlist changed, aggregating results...')
          const aggregatedResults = await mongoose.model('Session').aggregate([
            ...currentPlaylistFromSessionPipeline
          ]).exec()
          socket.emit('playlistChanged', aggregatedResults[0])
          return
        }
        const isPlayingSongChange = Object.keys(change.updateDescription.updatedFields).find((element) => {
          if (element.indexOf('.playing') > 0) {
            return change.updateDescription.updatedFields[element] === true
          }
          return false
        })
        if (typeof isPlayingSongChange !== 'undefined') {
          socket.emit('playingSongChanged', isPlayingSongChange)
        }
      }
    } catch (error) {
      console.log('An error occurred', error)
    }
  })
  changeStream.on('change', (changes) => {
    socket.emit('mongoStream', changes)
  })
  io.once('connection', (socket) => {
    console.log('connected: ', socket.id)
    socket.on('disconnect', (reason) => {
      console.log(`disconnected: ${socket.id} because ${reason}`)
    })
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
