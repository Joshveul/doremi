/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import * as yt from 'youtube-search-api'
import { getQueryParam, getArtistAndTitle } from './utils'

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.log('Incoming search request with params: ', req.url)

  const nextPageParam = getQueryParam(req.url, 'nextPage')
  const query = getQueryParam(req.url, 'q')
  const nextPage = nextPageParam === '' ? null : JSON.parse(decodeURIComponent(nextPageParam))

  let videos = []
  let entries = []
  try {
    if (nextPage !== null && Object.keys(nextPage).length !== 0) {
      console.log('Getting next page...')
      videos = await yt.NextPage(nextPage)
    } else if (query !== '') {
      console.log('Getting list by keyword: ', query)
      videos = await yt.GetListByKeyword(query)
    } else {
      console.log('"nextPage" and "q" were empty, ignoring request')
    }
  } catch (error) {
    console.log('Unable to fetch results from YT: ', error)
    res.statusCode = 500
    res.statusMessage = 'Internal server error'
    res.end()
    return
  }

  if (videos.length !== 0) {
    entries = videos.items.reduce((result, element) => {
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
  }

  res.statusCode = 200
  res.statusMessage = 'Success'
  res.end(JSON.stringify({
    count: entries.length,
    entries,
    nextPageToken: videos.nextPage || ''
  }))
}
