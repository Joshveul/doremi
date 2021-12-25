export const state = () => ({
  activeUsers: [],
  songOptionsOpen: false,
  selectedSong: {
    color: '#1F7087',
    sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  },
  nowPlayingSong: {
    color: '#1F7087',
    sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    title: 'One big boi tile song yes :) - Sing Song Karaoke',
    artist: 'One'
  },
  selectedSessionOpen: false,
  selectedSession: {},
  queueOpen: false
})

export const mutations = {
  setSongOptionsOpen (state, isOpen) {
    state.songOptionsOpen = isOpen
  },
  setSelectedSong (state, songData) {
    state.selectedSong = songData
  },
  setSelectedSessionOpen (state, isOpen) {
    state.selectedSessionOpen = isOpen
  },
  setSelectedSession (state, songData) {
    state.selectedSession = songData
  },
  setQueueOpen (state, isOpen) {
    state.queueOpen = isOpen
  },
  setNowPlayingSong (state, songData) {
    state.NowPlayingSong = songData
  }
}
