import { convertTimeToSeconds, downloadVideo, getVideoDataFromDB, updateRemoteQueue } from '~/modules/utils'
// import { videoArray } from '~/modules/mock'

export const state = () => ({
  activeUsers: [],
  userData: {},
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
    addingToQueue: false,
    currentSongIndex: 0,
    playing: false,
    time: 0
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
  addToQueue (state, payload) {
    if (state.queue.length > 0 && 'playNext' in payload && payload.playNext) {
      state.queue.splice(state.queueState.currentSongIndex + 1, 0, payload.item)
    } else {
      state.queue.push(payload.item)
      if (state.queue.length === 1) {
        state.nowPlayingSong = state.queue[0]
      }
    }
    state.queueState.time += convertTimeToSeconds(payload.item.duration)
  },
  removeFromQueue (state, video) {
    const existsAtIndex = state.queue.findIndex(el => el.hash === video.hash)
    state.queue.splice(existsAtIndex, 1)
    state.queue = [...state.queue]
    state.queueState.time -= convertTimeToSeconds(video.duration)
  },
  setVideoDownloaded (state, video) {
    video.downloading = false
    const existsAtIndex = state.queue.findIndex(el => el.hash === video.hash)
    const newItem = { ...state.queue[existsAtIndex] }
    state.queue[existsAtIndex] = newItem
    state.queue = [...state.queue]
  },
  addingToQueue (state, isAddingToqueue) {
    state.queueState.addingToQueue = isAddingToqueue
  },
  updateQueue (state, queue) {
    state.queue = queue
  },
  setUser (state, payload) {
    state.userData = Object.assign(state.userData, payload)
    this.app.$cookies.set('user', state.userData, {
      path: '/',
      maxAge: 60 * 60 * 5
    })
  }
}

export const getters = {
  getQueue (state) {
    return state.queue
  }
}

export const actions = {
  login ({ commit }, user) {
    // See if user exists in DB, otherwise add it
    commit('setUser', user)
  },
  async searchYoutube ({ commit }, query) {
    const results = await (await fetch(`/api/search?q=${query}`)).json()
    commit('setYtSearchResults', results.entries)
    commit('setYtNextPage', results.nextPageToken)
  },
  async fetchNextYouTubePage ({ commit, state }) {
    let results
    try {
      const result = await fetch(`/api/search?nextPage=${JSON.stringify(state.ytNextPage)}`)
      results = await result.json()
    } catch (e) {
      throw new Error('An error ocurred while requesting Youtube Next Page', e)
    }

    commit('addYtSearchResults', results.entries)
  },
  async addToQueue ({ commit, state }, payload) {
    const videoData = await getVideoDataFromDB(payload.item.videoId, state.userData._id, true)
    commit('addToQueue', payload)
    await updateRemoteQueue(state.queue)

    if (!videoData.isDownloaded) {
      await downloadVideo(payload.item, state.userData._id)
      commit('setVideoDownloaded', payload.item)
      await updateRemoteQueue(state.queue)
    }
  },
  removeFromQueue ({ commit, state }, video) {
    commit('removeFromQueue', video)
    updateRemoteQueue(state.queue)
  }
}
