/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import { PythonShell } from 'python-shell'

function getQueryParam (url, param) {
  const rx = new RegExp('[?&]' + param + '=([^&]+).*$')
  const returnVal = url.match(rx)
  return returnVal === null ? '' : returnVal[1]
}

module.exports = function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  const pyshell = new PythonShell('./scripts/ytsuggestions.py', { args: [getQueryParam(req.url, 'q')] })
  pyshell.on('message', (message) => {
    console.log(message)
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
    res.statusCode = 400
    res.statusMessage = 'Unknown'
    res.end()
  })
}
