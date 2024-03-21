/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import ytdl from 'ytdl-core'
import { getQueryParam, getArtistAndTitle } from './utils'
const Song = require('../db/model/song')
const Log = require('../db/model/log')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getSong request...')
  const result = { count: 0, results: [] }
  const songId = getQueryParam(req.url, 'songId')
  const userId = getQueryParam(req.url, 'userId')

  if (songId !== '') {
    if (process.env.MODE === 'offline') {
      // Always return empty object to fake the video download
      const fakeRequest = new Promise(resolve => setTimeout(resolve([]), 2500))
      result.results = await fakeRequest
    } else {
      console.log('Finding song ', songId)
      let mongoResult = await Song.dbModel.findOne({ ytId: songId })
      console.log('Result from MongoDB: ', mongoResult)
      if (mongoResult === null) {
        const { videoDetails } = await ytdl.getInfo(songId)
        // console.log(videoDetails)
        let { artist, title } = getArtistAndTitle(videoDetails.title, videoDetails.ownerChannelName)
        if (artist === title) {
          artist = videoDetails.media.artist || artist
          title = videoDetails.title
        }
        mongoResult = await Song.dbModel.create({
          ytId: songId,
          originalTitle: videoDetails.title,
          title,
          artist,
          thumbnail: encodeURIComponent(videoDetails.thumbnails[0].url),
          channel: {
            id: videoDetails.channelId,
            name: videoDetails.ownerChannelName
          },
          duration: videoDetails.lengthSeconds,
          isDownloading: false,
          isProcessing: true,
          isEncoding: false,
          audioDownloadProgress: 0,
          videoDownloadProgress: 0,
          firstAddedBy: userId,
          lastAddedBy: userId,
          timesAdded: 1,
          timesPlayed: 0,
          timesRemoved: 0,
          lastAdded: Date.now()
        })
      } else {
        const timesAdded = mongoResult.timesAdded += 1
        const lastAdded = Date.now()
        const lastAddedBy = userId
        mongoResult = await Song.dbModel.findOneAndUpdate({ ytId: songId }, { timesAdded, lastAdded, lastAddedBy })
      }
      Log.add(userId, 'Add Song', 'Song', mongoResult._id)
      result.results.push(mongoResult)
      result.count = 1
    }
  } else {
    console.log('ID parameter was empty, returning empty value')
  }

  // console.log('getSong result: ', result)

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
