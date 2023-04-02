export default (context) => {
  context.socket = context.$nuxtSocket({
    name: 'main'
  })
  /* Listen for events coming from the server: */
  console.log(context.socket)
  context.socket.on('connect', (msg, cb) => {
    console.log('connected' + msg)
  })
  context.socket
    .on('progress', (msg, cb) => {
      console.log(msg)
    })
    .on('songsListChanged', (msg, cb) => {
      console.log('Song list changed: ', msg)
      if (msg.operationType === 'update') {
        if ('isProcessing' in msg.updateDescription.updatedFields) {
          context.store.getters.getQueue.forEach((e) => {
            if (e.id === msg.documentKey._id) {
              context.store.commit('setProcessing', { video: e, value: msg.updateDescription.updatedFields.isProcessing })
              console.log('Processing song !')
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
      console.info('Playlist changed: ', msg)
      context.store.dispatch('updateQueue', msg.playlist)
    })
  context.socket.emit('fn3', { id: 'abc123' })
}
