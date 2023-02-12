import Vue from 'vue'
import 'video.js/dist/video-js.css'

if (process.browser) {
  if (window.location.pathname === '/player') {
    const VueVideoPlayer = require('vue-video-player')
    Vue.use(VueVideoPlayer)
  }
}
