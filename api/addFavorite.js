/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import Favorite from '../db/model/favorite'

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getUser request...')
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    body = JSON.parse(body)
    if (typeof body !== 'undefined') {
      const favorite = await Favorite.findOne({
        userId: body.userId,
        songId: body.songId
      })
      if (favorite === null) {
        const newFavorite = new Favorite({
          userId: body.userId,
          songId: body.songId,
          dateAdded: Date.now()
        })
        const result = await newFavorite.save()
        console.log(`Favorite added: ${result}, OID: ${result._id}`)
      }
    } else {
      console.log('User data in body is empty')
      res.statusCode = 400
      res.statusMessage = 'Bad request'
      res.end()
      return
    }

    res.statusCode = 200
    res.statusMessage = 'success'
    res.end()
  })
}
