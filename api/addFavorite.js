/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
const Favorite = require('../db/model/favorite')

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting addFavorite request...')
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    body = JSON.parse(body)
    if (typeof body !== 'undefined') {
      await Favorite.add({
        user: body.userId,
        song: body.songId
      })
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
