/* eslint-disable no-console */
const youtubeSearch = require('youtube-search')
const opts = {
  key: 'AIzaSyAdbe-PLDgvMib2Ak5ATl1v3FZyIbUnihA'
}
module.exports = function (req, res, next) {
  youtubeSearch('jsconf', opts, (err, results) => {
    if (err) { return console.log(err) }

    console.dir(results)
  })
}
