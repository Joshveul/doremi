export const getVideoData = async function getVideoData (videoId) {
  const songData = await (await fetch(`http://192.168.188.75:3000/api/getSong?id=${videoId}`)).json()
  if (songData.count > 0) {
    return songData.results[0]
  }
  return false
}

export const downloadVideo = async function downloadVideo (item, user) {
  console.info('starting downloadVideo request...')
  const uri = 'http://192.168.188.75:3000/api/download?' +
    `item=${encodeURI(JSON.stringify(item))}` +
    `&user=${user}`
  // const uri = 'http://192.168.188.75:3000/api/getSong?' +
  //   `id=${item.videoId}` +
  //   `&title=${item.title}` +
  //   `&artist=${item.artist}` +
  //   `&thumbnail=${encodeURI(item.thumbnail)}` +
  //   `&channel=${item.channel}` +
  //   `&duration=${item.duration}` +
  //   `&addedBy=${user}`
  const result = await fetch(uri)
  console.info('download Video result: ', result)
  if (result.ok) {
    return true
  }
  return false
}
