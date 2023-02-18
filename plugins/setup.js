import { getFavorites, getStoredSongsList } from '~/modules/utils'

window.onNuxtReady((context) => {
  const userId = context.$store.state.userData._id
  getStoredSongsList().then((result) => {
    context.$store.commit('setStoredSongs', result)
  })
  getFavorites(userId).then((result) => {
    context.$store.commit('setUserFavorites', result)
  })
})
