/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import User from '../db/model/user'

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting postUser request...')
  let result = { userId: '' }
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    body = JSON.parse(body)
    if (typeof body !== 'undefined') {
      if (process.env.MODE !== 'offline') {
        const user = await User.findOne({
          name: body.user
        })
        if (user === null) {
          const newUser = new User({
            name: body.user,
            avatar: body.avatar || '/img/default_avatar.png'
          })
          result = await newUser.save()
          console.log(`User added: ${result.name}, OID: ${result._id}`)
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
