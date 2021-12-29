/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { PythonShell } from 'python-shell'

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.log('Incoming search request with params: ', req.url)
  const currentCount = getQueryParam(req.url, 'currentcount')
  const normalizedCount = currentCount === '' ? 0 : currentCount

  console.log('Initiating pyshell ', { args: [getQueryParam(req.url, 'q'), normalizedCount] })

  const pyshell = new PythonShell(
    './scripts/ytsearch.py',
    { args: [getQueryParam(req.url, 'q'), normalizedCount] })
  console.log('Executed pyshell, waiting for response...')
  pyshell.on('message', (message) => {
    console.log('Message is: ', message)
    res.statusCode = 200
    res.statusMessage = 'Success'
    res.end(message)
  })
  pyshell.on('error', (code, signal) => {
    console.log('The exit code was: ' + code)
    console.log('The exit signal was: ' + signal)
    res.statusCode = 500
    res.statusMessage = 'Error'
    res.end()
  })
  pyshell.on('close', () => {
    console.log('Connection closed unexpectedly...')
    res.statusCode = 200
    res.statusMessage = 'Success'
    res.end()
  })
}
