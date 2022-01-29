/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { getDbCollection } from './utils'

const userCollection = getDbCollection('users')

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getUser request...')
  let result = { userId: '' }
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    body = JSON.parse(body)
    if (typeof body !== 'undefined') {
      if (process.env.MODE !== 'offline') {
        const user = await userCollection.findOne({
          name: body.user
        })
        if (user === null) {
          result = await userCollection.insertOne({
            name: body.user
          })
          console.log(`User added: ${body.user}, OID: ${result.insertedId}`)
        }
      } else {
        // Return mock ID
        const fakeRequest = new Promise(resolve => setTimeout(resolve('12345'), 2500))
        result.userId = await fakeRequest
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
    res.end(JSON.stringify(result))
  })
}
