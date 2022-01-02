export const state = () => ({
  activeUsers: [],
  songOptionsOpen: false,
  selectedSong: { videoId: '', title: '', artist: '', thumbnail: '', channel: '', duration: '' },
  nowPlayingSong: { videoId: '', title: '', artist: '', thumbnail: '', channel: '', duration: '' },
  searchTerm: '',
  mongoSearchResults: [],
  ytSearchResults: [],
  ytNextPage: {},
  selectedSessionOpen: false,
  selectedSession: {},
  queueOpen: false,
  queue: [],
  queueState: {
    currentSongIndex: 0,
    playing: false
  }
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
  },
  setSearchTerm (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  setYtSearchResults (state, results) {
    state.ytSearchResults = results
  },
  setYtNextPage (state, nextPage) {
    state.ytNextPage = nextPage
  },
  addYtSearchResults (state, results) {
    state.ytSearchResults.push(...results)
  },
  updateQueue (state, queue) {
    state.queue = queue
  }
}

export const getters = {
  getQueue (state) {
    return state.queue
  }
}

export const actions = {
  async searchYoutube ({ commit }, query) {
    const results = await (await fetch(`http://192.168.188.75:3000/api/search?q=${query}`)).json()
    commit('setYtSearchResults', results.entries)
    commit('setYtNextPage', results.nextPageToken)
  },
  async fetchNextYouTubePage ({ commit, state }) {
    const results = await (await fetch(`http://192.168.188.75:3000/api/search?nextPage=${JSON.stringify(state.ytNextPage)}`)).json()
    commit('addYtSearchResults', results.entries)
  },
  addToQueue ({ commit, state }, options) {
    const queue = state.queue.slice()
    if (queue.length > 0 && 'playNext' in options && options.playNext) {
      queue.splice(state.queueState.currentSongIndex + 1, 0, options.item)
    } else {
      queue.push(options.item)
    }
    console.log(queue)
    commit('updateQueue', queue)
  }
}
