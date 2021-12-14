export const state = () => ({
  activeUsers: [],
  songOptionsOpen: false,
  selectedSong: {},
  nowPlayingSong: {
    color: '#1F7087',
    sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    title: 'Supermodel - Foster the People - SingKaraoke',
    artist: 'Foster the People'
  }
})

export const mutations = {
  setSongOptionsOpen (state, isOpen) {
    state.songOptionsOpen = isOpen
  },
  setSelectedSong (state, songData) {
    state.selectedSong = songData
  },
  setNowPlayingSong (state, songData) {
    state.NowPlayingSong = songData
  }
}
