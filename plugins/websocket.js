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
    .on('songsListChanged', (msg, cb) => { console.log('Song list changed: ', msg) })
    .on('sessionChanged', (msg, cb) => {
      console.info('Session changed: ', msg)
      if (msg.operationType === 'update' && 'playlist' in msg.updateDescription.updatedFields) {
        context.store.dispatch('updateQueue', msg.updateDescription.updatedFields.playlist)
      }
    })
  context.socket.emit('fn3', { id: 'abc123' })
}
