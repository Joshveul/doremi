export default (context) => {
  context.socket = context.$nuxtSocket({
    name: 'main'
  })
  /* Listen for events: */
  console.log(context.socket)
  context.socket.on('connect', (msg, cb) => {
    console.log('connected' + msg)
  })
  context.socket
    .on('progress', (msg, cb) => {
      console.log(msg)
    })
    .on('mongoStream', (msg, cb) => {
      console.log('From mongo:', msg)
    })
  context.socket.emit('fn3', { id: 'abc123' })
}
