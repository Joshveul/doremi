/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { getQueryParam } from './utils'
const Favorites = require('../db/model/favorite')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse()) {
  console.info('Starting getFavorites request...')
  const result = { count: 0, results: [] }

  const userId = getQueryParam(req.url, 'userId')

  const mongoResult = await Favorites.dbModel.find({ user: userId })

  mongoResult.forEach((element) => {
    result.results.push(element.song)
  })

  result.count = result.results.length

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
