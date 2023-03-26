import { set } from 'vue'

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
  },
  storedSongs: [],
  userFavorites: []
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
  setStoredSongs (state, storedSongsArray) {
    state.storedSongs = storedSongsArray
  },
  setUserFavorites (state, favorites) {
    state.userFavorites = favorites
  },
  addFavorite (state, songId) {
    if (!state.userFavorites.includes(songId)) {
      state.userFavorites.push(songId)
    }
  },
  removeFavorite (state, songId) {
    const index = state.userFavorites.indexOf(songId)
    state.userFavorites.splice(index, 1)
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
    state.queue.splice(video.index, 1)
    state.queue = [...state.queue]
    state.queueState.time -= convertTimeToSeconds(video.item.duration)
  },
  setVideoUser (state, video) {
    set(video, 'user', state.userData._id)
  },
  setDownloading (state, { video, value }) {
    set(video, 'downloading', value)
  },
  setProcessing (state, { video, value }) {
    set(video, 'processing', value)
  },
  setEncoding (state, { video, value }) {
    set(video, 'encoding', value)
  },
  setProcessingProgress (state, { video, value }) {
    set(video, 'processingProgress', value)
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
  },
  getFavoritesList (state) {
    return state.storedSongs.filter((el) => {
      return state.userFavorites.includes(el.id)
    })
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
  async addSongToFavorites ({ commit, state }, songId) {
    try {
      const favoriteReq = await fetch('/api/addFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: state.userData._id,
          songId
        })
      })
      commit('addFavorite', songId)
      return favoriteReq
    } catch (e) {
      throw new Error('An error ocurred while adding favorite', e)
    }
  },
  async removeSongFromFavorites ({ commit, state }, songId) {
    try {
      const favoriteReq = await fetch('/api/removeFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: state.userData._id,
          songId
        })
      })
      commit('removeFavorite', songId)
      return favoriteReq
    } catch (e) {
      throw new Error('An error ocurred while removing favorite', e)
    }
  },
  async addToQueue ({ commit, state }, itemToAdd) {
    const videoData = await getVideoDataFromDB(itemToAdd.item.videoId, state.userData._id, true)
    itemToAdd.item.id = videoData._id
    commit('setDownloading', { video: itemToAdd.item, value: videoData.isDownloading })
    commit('setEncoding', { video: itemToAdd.item, value: videoData.isEncoding })
    commit('setProcessing', { video: itemToAdd.item, value: videoData.isProcessing })
    commit('setVideoUser', itemToAdd.item)
    commit('addToQueue', itemToAdd)
    await updateRemoteQueue(state.queue, state.userData._id)

    if (!videoData.isDownloading && videoData.isProcessing) {
      await downloadVideo(itemToAdd.item, state.userData._id)
    }
  },
  async removeFromQueue ({ commit, state }, video) {
    commit('removeFromQueue', video)
    await updateRemoteQueue(state.queue, state.userData._id)
  },
  async updateQueue ({ commit, state }, queue) {
    commit('updateQueue', queue)
    await updateRemoteQueue(queue, state.userData._id)
  }
}
