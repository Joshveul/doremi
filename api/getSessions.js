/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
// import { getQueryParam } from './utils'
const Session = require('../db/model/session')

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse()) {
  console.info('Sessions API request...')
  try {
    const result = { count: 0, results: [] }

    // const userId = getQueryParam(req.url, 'userId') // Use in case we want to get the sessions where a user has participated

    const mongoResult = await Session.dbModel.find().populate('users')

    result.results = mongoResult
    result.count = result.results.length

    res.statusCode = 200
    res.statusMessage = 'success'
    res.end(JSON.stringify(result))
  } catch (error) {
    console.error('An error occurred', error)
    res.statusCode = 500
    res.statusMessage = error.message
    res.end()
  }
}
