const ChromecastAPI = require('chromecast-api')

const client = new ChromecastAPI()

export default function () {
  client.on('device', function (device) {
    // console.log(device.friendlyName)
    // const mediaURL = 'http://192.168.188.75:3000/archive/4hwpLK7CWVM.mp4'
    // device.stop()
    // device.play(mediaURL, function (err) {
    //   if (!err) { console.log('Playing in your chromecast') }
    // })
  })
}
