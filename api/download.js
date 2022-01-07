/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { URL } from 'url'
import { PythonShell } from 'python-shell'

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const baseURL = 'http://' + req.headers.host + '/'
  const url = new URL(req.url, baseURL)
  const query = new URLSearchParams(url.search)
  console.log(`incoming download request... ${query.get('item')}`)
  const item = JSON.parse(decodeURI(query.get('item')))
  console.log(item)
  const user = getQueryParam(req.url, 'user')
  const shellArgs = [
    user,
    item.videoId,
    item.title,
    item.artist,
    decodeURIComponent(item.thumbnail),
    item.channel,
    item.duration
  ]
  if (process.env.MODE === 'offline') {
    console.info('Mocking successful download with args: ', shellArgs)
    setTimeout(() => {
      res.statusCode = 200
      res.statusMessage = 'Archived'
      res.end()
    }, 5000)
  } else {
    const pyshell = new PythonShell('./scripts/ytdownloader.py', {
      args: shellArgs
    })
    pyshell.on('message', (message) => {
      console.log(message)
      if (message.includes('exists')) {
        res.statusCode = 200
        res.statusMessage = 'Existing'
        res.end()
      }
      if (message === 'done') {
        res.statusCode = 200
        res.statusMessage = 'Archived'
        res.end()
      }
    })
    pyshell.on('error', (code, signal) => {
      console.log('The exit code was: ' + code)
      console.log('The exit signal was: ' + signal)
      res.statusCode = 500
      res.statusMessage = 'Error'
      res.end()
    })
    pyshell.on('close', () => {
      res.statusCode = 400
      res.statusMessage = 'Unknown'
      res.end()
    })
  }
}
