const host = process.env.HOST

/**
 * Gets the video data from the DB.
 * @param {String} videoId - The Youtube video ID to search for
 * @param {String} userId - The User ID that is performing the action
 * @param {String} lockDocument - Value that will be set to the
 * isProcessing property of the document (useful to evaulate further operations)
 * if the song already exists, this value is ignored
 * @returns An object with the song document
 */
export const getVideoDataFromDB = async function getVideoData (videoId, userId, lockDocument) {
  const songData = await (await fetch(`http://${host}:3000/api/getSong?songId=${videoId}&userId=${userId}&lock=${lockDocument}`)).json()
  if (songData.count > 0) {
    return songData.results[0]
  }
  throw new Error('Unexpected error while getting song data, please try again.')
}

/**
 * Gets the full list of songs available in the local Database.
 * @returns An array with the songs
 */
export const getStoredSongsList = async function getStoredSongsList () {
  const songList = await (await fetch(`http://${host}:3000/api/getStoredSongsList`)).json()
  return songList.results
}

/**
 * Gets the full list of songs available in the local Database.
 * @returns An array with the songs
 */
export const getCurrentQueue = async function getCurrentQueue () {
  const songList = await (await fetch(`http://${host}:3000/api/appState?action=getQueue`)).json()
  return songList.results
}

/**
 * Gets the list of songs marked as favorite by the given user.
 * @returns An array with the songs
 */
export const getFavorites = async function getFavorites (user) {
  const songData = await (await fetch(`http://${host}:3000/api/getFavorites?userId=${user}`)).json()
  return songData.results
}

/**
 * Gets the list of all sessions.
 * @returns An array with the Sessions
 */
export const getSessions = async function getFavorites (user) {
  const sessionData = await (await fetch(`http://${host}:3000/api/getSessions?userId=${user}`)).json()
  return sessionData.results
}

/**
 * Adds user to the current session.
 * @returns An array with the songs
 */
export const joinSession = async function joinSession (user) {
  const sessionData = await (await fetch(`http://${host}:3000/api/joinSession?userId=${user}`)).json()
  return sessionData.results
}

/**
 * Calls the endpoint to download a video
 * @param {*} item
 * @param {*} user
 * @returns
 */
export const downloadVideo = async function downloadVideo (item, user) {
  const uri = `http://${host}:3000/api/download?` +
    `item=${encodeURI(JSON.stringify(item))}` +
    `&user=${user}`
  const result = await fetch(uri)
  if (result.ok) {
    return true
  }
  return false
}

export const updateRemoteQueue = async function updateRemoteQueue (queue, user) {
  const uri = `http://${host}:3000/api/appState?action=updateQueue&user=${user}`
  const result = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(queue)
  })
  if (result.ok) {
    return true
  }
  return false
}

export const playKaraoke = async function playKaraoke (user) {
  const uri = `http://${host}:3000/api/appState?action=play&user=${user}`
  const result = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify({ value: true })
  })
  if (result.ok) {
    return true
  }
  return false
}

export const pauseKaraoke = async function pauseKaraoke (user) {
  const uri = `http://${host}:3000/api/appState?action=pause&user=${user}`
  const result = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify({ value: false })
  })
  if (result.ok) {
    return true
  }
  return false
}

export const playNext = function playNext (vueContext, queue, nowPlayingSongIndex) {
  let nextSongIndex
  if (queue.length - 1 > nowPlayingSongIndex) {
    nextSongIndex = nowPlayingSongIndex + 1
  } else {
    nextSongIndex = 0
  }
  vueContext.$store.dispatch('updateNowPlayingSong', { nowPlayingIndex: nextSongIndex, wasPlayingIndex: nowPlayingSongIndex })
  vueContext.$store.commit('setNowPlayingSong', queue[nextSongIndex])
  return nextSongIndex
}

export const playPrevious = function playPrevious (vueContext, queue, nowPlayingSongIndex) {
  let previousSongIndex
  if (nowPlayingSongIndex > 0) {
    previousSongIndex = nowPlayingSongIndex - 1
  } else {
    previousSongIndex = 0
  }
  vueContext.$store.dispatch('updateNowPlayingSong', { nowPlayingIndex: previousSongIndex, wasPlayingIndex: nowPlayingSongIndex })
  vueContext.$store.commit('setNowPlayingSong', queue[previousSongIndex])
  return previousSongIndex
}

export const convertTimeToSeconds = function convertTimeToSeconds (time) {
  const hms = time
  const a = hms.split(':')
  let seconds

  if (a.length === 3) {
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])
  } else {
    seconds = (+a[0]) * 60 + (+a[1])
  }

  return seconds
}

export const convertSecondsToTime = function convertSecondsToTime (seconds) {
  const date = new Date(null)
  date.setSeconds(seconds)
  let time = date.toISOString().substr(11, 8)
  if (time.startsWith('00:')) {
    time = time.substring(3)
  }
  return time
}

export const terminateCurrentSession = async function terminateCurrentSession (queue, user) {
  const uri = `http://${host}:3000/api/appState?action=terminateSession&user=${user}`
  const result = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(queue)
  })
  if (result.ok) {
    return true
  }
  return false
}

export const initApp = async function initApp (vueContext) {
  vueContext.$store.commit('setSettings', JSON.parse(localStorage.getItem('settings')))
  if (vueContext.$router.currentRoute.name === 'player') {
    getCurrentQueue().then((result) => {
      vueContext.$store.commit('updateQueue', result)
    })
  } else {
    const userId = vueContext.$store.state.userData._id
    await joinSession(userId).then((result) => {
      console.log('joined session: ', result)
    })
    getStoredSongsList().then((result) => {
      vueContext.$store.commit('setStoredSongs', result)
    })
    getFavorites(userId).then((result) => {
      vueContext.$store.commit('setUserFavorites', result)
    })
    getSessions(userId).then((result) => {
      vueContext.$store.commit('setSessionList', result)
    })
    getCurrentQueue().then((result) => {
      vueContext.$store.commit('updateQueue', result)
      let nowPlayingSongIndex = vueContext.$store.getters.getNowPlayingSongIndex
      if (nowPlayingSongIndex < 0) {
        nowPlayingSongIndex = 0
        vueContext.$store.dispatch('updateNowPlayingSong', { nowPlayingIndex: 0 })
      }
      vueContext.$store.commit('setNowPlayingSong', result[nowPlayingSongIndex])
    })
  }
}

export const getNowPlayingSongIndex = function getNowPlayingSongIndex (queue) {
  let songIndex = -1
  queue.find((e, i) => {
    if (e.playing) {
      songIndex = i
    }
    return e.playing
  })
  return songIndex
}
