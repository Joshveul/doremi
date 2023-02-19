/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { getQueryParam } from './utils'
const Session = require('../db/model/session')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse()) {
  console.info('Starting joinSession request...')
  try {
    const result = { count: 0, results: [] }

    const userId = getQueryParam(req.url, 'userId')

    const mongoResult = await Session.joinActiveSession(userId)

    result.results = mongoResult
    result.count = result.results.length

    res.statusCode = 200
    res.statusMessage = 'success'
    res.end(JSON.stringify(result))
  } catch (error) {
    res.statusCode = 500
    res.statusMessage = error.message
    res.end()
  }
}
