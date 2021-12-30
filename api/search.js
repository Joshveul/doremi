/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import * as yt from 'youtube-search-api'

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : decodeURI(returnVal[1])
}

/**
 * @param {String} title
 * @param {String} channel
 * @returns {Object}
 */
function getArtistAndTitle (title, channel) {
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
    default:
      return {
        artist: title,
        title
      }
  }
}

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.log('Incoming search request with params: ', req.url)
  const videos = await yt.GetListByKeyword(getQueryParam(req.url, 'q'))

  const entries = videos.items.map((element) => {
    const { artist, title } = getArtistAndTitle(element.title, element.channelTitle)
    return {
      videoId: element.id,
      title,
      artist,
      thumbnails: element.thumbnail.thumbnails,
      channel: element.channelTitle,
      duration: element.length.simpleText
    }
  })

  res.statusCode = 200
  res.statusMessage = 'Success'
  res.end(JSON.stringify({
    count: entries.length,
    entries,
    nextPageToken: videos.nextPage
  }))
}
