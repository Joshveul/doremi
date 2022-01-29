/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import * as yt from 'youtube-search-api'
import { getQueryParam } from './utils'

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

  const nextPageParam = getQueryParam(req.url, 'nextPage')
  const query = getQueryParam(req.url, 'q')
  const nextPage = nextPageParam === '' ? null : JSON.parse(nextPageParam)

  let videos
  try {
    if (nextPage === null) {
      videos = await yt.GetListByKeyword(query)
    } else {
      videos = await yt.NextPage(nextPage)
    }
  } catch (error) {
    console.log('Unable to fetch results from YT: ', error)
    res.statusCode = 500
    res.statusMessage = 'Internal server error'
    res.end()
    return
  }

  const entries = videos.items.reduce((result, element) => {
    if (element.type === 'video') {
      const { artist, title } = getArtistAndTitle(element.title, element.channelTitle)
      result.push({
        videoId: element.id,
        title,
        artist,
        thumbnail: encodeURIComponent(element.thumbnail.thumbnails[0].url),
        channel: element.channelTitle,
        duration: element.length.simpleText
      })
    }
    return result
  }, [])

  res.statusCode = 200
  res.statusMessage = 'Success'
  res.end(JSON.stringify({
    count: entries.length,
    entries,
    nextPageToken: videos.nextPage
  }))
}
