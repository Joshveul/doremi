import { getFavorites, getStoredSongsList } from '~/modules/utils'

window.onNuxtReady((context) => {
  const userId = context.$store.state.userData._id
  getStoredSongsList().then((result) => {
    context.$store.commit('setStoredSongs', result)
  })
  getFavorites(userId).then((result) => {
    context.$store.commit('setUserFavorites', result)
  })

  const socket = context.$nuxtSocket({
    name: 'main'
  })
  /* Listen for events: */
  console.log(socket)
  socket.on('connect', (msg, cb) => {
    console.log('connected' + msg)
  })
  socket
    .on('progress', (msg, cb) => {
      console.log(msg)
    })
    .on('mongoStream', (msg, cb) => {
      console.log('From mongo:', msg)
    })
  socket.emit('fn3', { id: 'abc123' })
})
