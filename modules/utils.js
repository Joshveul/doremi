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

export const updateRemoteQueue = async function updateRemoteQueue (queue) {
  const uri = `http://${host}:3000/api/appState?action=updateQueue`
  const result = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(queue)
  })
  if (result.ok) {
    return true
  }
  return false
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
