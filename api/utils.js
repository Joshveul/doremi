import { mergeWith, isArray } from 'lodash'

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
  console.log(`Cleaning title by Channel: ${channel} Title is: ${title}`)
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
      if (title.includes(' Karaoke')) {
        startTitle = 0
        endTitle = title.indexOf(' -')
        startArtist = endTitle + 3
        endArtist = title.indexOf(' | Karaoke')
      } else {
        startTitle = 8
        endTitle = title.indexOf(' -')
        startArtist = endTitle + 3
        endArtist = title.indexOf(' *')
      }
      return {
        artist: title.substring(startArtist, endArtist),
        title: title.substring(startTitle, endTitle)
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
    case 'Musisi Karaoke':
    case 'Karaoke Piano':
      endTitle = title.indexOf(' -')
      startArtist = endTitle + 3
      endArtist = title.indexOf(' (')
      return {
        artist: title.substring(startArtist, endArtist),
        title: title.substring(0, endTitle)
      }
    case 'EdKara':
      endTitle = title.indexOf(' -')
      startArtist = endTitle + 3
      endArtist = title.indexOf(' Karaoke')
      return {
        artist: title.substring(startArtist, endArtist),
        title: title.substring(0, endTitle)
      }
    case 'CC Karaoke':
      endArtist = title.indexOf(' •')
      startTitle = endArtist + 3
      endTitle = title.indexOf(' (CC')
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
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body)
        resolve(parsedBody)
      } catch (error) {
        if (error.message.indexOf('JSON')) {
          resolve(body)
        }
        reject(error)
      }
    })

    req.on('error', (error) => {
      reject(error)
    })
  })
}

export async function queryDiscogsData (query) {
  query = encodeURIComponent(query)
  const key = process.env.DISCOGS_API_KEY
  const secret = process.env.DISCOGS_API_SECRET
  console.log('Querying Discogs for ', query)
  const response = await fetch(`https://api.discogs.com/database/search?q=${query}&per_page=2&key=${key}&secret=${secret}`)
  const result = await response.json()
  console.log('Discogs result', result)
  if (result.results.length === 0) {
    return null
  } else if (result.results.length === 2) {
    return mergeWith(result.results[1], result.results[0], (objValue, srcValue) => {
      if (isArray(objValue)) {
        return [...new Set([...objValue, ...srcValue])]
      }
    })
  }
  return result.results[0]
}
