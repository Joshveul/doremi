export function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
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

/**
 * @param {String} title
 * @param {String} channel
 * @returns {Object}
 */
export function getArtistAndTitle (title, channel) {
  let startTitle
  let endTitle
  let startArtist
  let endArtist
  switch (channel) {
    case 'Sing King':
    case 'Stingray Karaoke':
      endArtist = title.indexOf(' -')
      startTitle = endArtist + 3
      endTitle = title.indexOf(' (Karaoke')
      return {
        artist: title.substring(0, endArtist),
        title: title.substring(startTitle, endTitle)
      }
    case 'KaraFun Karaoke':
      endTitle = title.indexOf(' -')
      startArtist = endTitle + 3
      endArtist = title.indexOf(' | Karaoke')
      return {
        artist: title.substring(startArtist, endArtist),
        title: title.substring(0, endTitle)
      }
    case 'Piano Backing Tracks':
      endTitle = title.indexOf('oke)') + 4
      startArtist = endTitle + 1
      return {
        artist: title.substring(startArtist, title.length),
        title: title.substring(0, endTitle)
      }
    case 'Zoom Karaoke Official':
      endArtist = title.indexOf(' -')
      startTitle = endArtist + 3
      endTitle = title.indexOf(' - Karaoke')
      return {
        artist: title.substring(0, endArtist),
        title: title.substring(startTitle, endTitle)
      }
    case 'UCIk6z4gxI5ADYK7HmNiJvNg':
    case 'sing2piano | Piano Karaoke':
      endArtist = title.indexOf(' -')
      startTitle = endArtist + 3
      endTitle = title.indexOf(' Karaoke')
      return {
        artist: title.substring(0, endArtist),
        title: title.substring(startTitle, endTitle)
      }
    default:
      return {
        artist: title,
        title
      }
  }
}

export function readRequestBody (req) {
  return new Promise((resolve, reject) => {
    let body = '{}'

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body)
        resolve(parsedBody)
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', (error) => {
      reject(error)
    })
  })
}
