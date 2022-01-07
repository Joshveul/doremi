const host = process.env.HOST

export const getVideoData = async function getVideoData (videoId) {
  const songData = await (await fetch(`http://${host}:3000/api/getSong?id=${videoId}`)).json()
  if (songData.count > 0) {
    return songData.results[0]
  }
  return false
}

export const downloadVideo = async function downloadVideo (item, user) {
  console.info('starting downloadVideo request...')
  const uri = `http://${host}:3000/api/download?` +
    `item=${encodeURI(JSON.stringify(item))}` +
    `&user=${user}`
  const result = await fetch(uri)
  console.info('download Video result: ', result)
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
