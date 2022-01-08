const host = process.env.HOST

export const getVideoData = async function getVideoData (videoId) {
  const songData = await (await fetch(`http://${host}:3000/api/getSong?id=${videoId}`)).json()
  if (songData.count > 0) {
    return songData.results[0]
  }
  return false
}

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

export const hashString = function hashStringfunction (string) {
  let hash = 0
  let i, chr
  if (string.length === 0) {
    return hash
  }
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr - Date.now()
    hash |= 0
  }
  return hash
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
