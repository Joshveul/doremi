export default (context) => {
  context.socket = context.$nuxtSocket({
    name: 'main'
  })
  /* Listen for events coming from the server: */
  context.socket.on('connect', () => {
    console.log('connected: ' + context.socket.id)
  })
  if (context.route.name === 'player') {
    context.socket.emit('fn3', { id: 'abc123' })
    context.socket
      .on('progress', (msg, cb) => {
        console.log(msg)
      })
  }
  context.socket
    .on('songsListChanged', (msg, cb) => {
      if (msg.operationType === 'update') {
        if ('isProcessing' in msg.updateDescription.updatedFields) {
          context.store.getters.getQueue.forEach((e) => {
            if (e.id === msg.documentKey._id) {
              context.store.commit('setProcessing', { video: e, value: msg.updateDescription.updatedFields.isProcessing })
            }
          })
        }
        if ('isDownloading' in msg.updateDescription.updatedFields) {
          context.store.getters.getQueue.forEach((e) => {
            if (e.id === msg.documentKey._id) {
              context.store.commit('setDownloading', { video: e, value: msg.updateDescription.updatedFields.isDownloading })
            }
          })
        }
        if ('isEncoding' in msg.updateDescription.updatedFields) {
          context.store.getters.getQueue.forEach((e) => {
            if (e.id === msg.documentKey._id) {
              context.store.commit('setEncoding', { video: e, value: msg.updateDescription.updatedFields.isEncoding })
            }
          })
        }
        if ('videoDownloadProgress' in msg.updateDescription.updatedFields) {
          context.store.getters.getQueue.forEach((e) => {
            if (e.id === msg.documentKey._id) {
              context.store.commit('setProcessingProgress', { video: e, value: msg.updateDescription.updatedFields.videoDownloadProgress })
            }
          })
        }
      }
    })
    .on('playlistChanged', (msg, cb) => {
      console.log('playlist changed', msg.playlist)
      context.store.dispatch('updateQueue', msg.playlist)
    })
    .on('playingSongChanged', (msg, cb) => {
      console.log('playlist changed playingSongChanged', msg)
      const firstDotInMsg = msg.indexOf('.')
      const lastDotInMsg = msg.lastIndexOf('.')
      let indexOfPlayingSong = msg.substring(firstDotInMsg + 1, lastDotInMsg)
      if (indexOfPlayingSong < 0) {
        indexOfPlayingSong = 0
      }
      console.log('indexOfPlayingSong playingSongChanged 2', indexOfPlayingSong)
      context.store.commit('updateNowPlayingSongArray', { nowPlayingIndex: indexOfPlayingSong })
      context.store.commit('setNowPlayingSong', context.store.getters.getQueue[indexOfPlayingSong])
    })
    .on('playStateChanged', (msg, cb) => {
      context.store.commit('updateIsPlaying', msg)
    })
    .on('mongoStream', (msg, cb) => {
    })
}
