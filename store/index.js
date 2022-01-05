import { downloadVideo, getVideoData } from '~/modules/utils'

export const state = () => ({
  activeUsers: [],
  userData: { name: 'Josh', avatar: 'https://pps.whatsapp.net/v/t61.24694-24/121236150_887827375081777_7618963702791770178_n.jpg?ccb=11-4&oh=9380814569e8a8b9b66d13aa1e7a04fb&oe=61D84016' },
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
  addToQueue (state, payload) {
    if (state.queue.length > 0 && 'playNext' in payload && payload.playNext) {
      state.queue.splice(state.queueState.currentSongIndex + 1, 0, payload.item)
    } else {
      state.queue.push(payload.item)
    }
  },
  setVideoDownloaded (state, video) {
    const item = state.queue.find(el => el.videoId === video.videoId)
    item.downloading = false
    Object.assign(state.queue, state.queue)
  },
  addingToQueue (state, isAddingToqueue) {
    state.queueState.addingToQueue = isAddingToqueue
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
  async addToQueue ({ commit, state }, payload) {
    commit('addingToQueue', true)

    const videoData = await getVideoData(payload.item.videoId)
    payload.item.downloading = videoData === false

    commit('addToQueue', payload)

    if (!videoData) {
      const result = await downloadVideo(payload.item, state.userData.name)
      console.info('downloaded maybe?: ' + result)
    }

    commit('setVideoDownloaded', payload.item)
  }
}
