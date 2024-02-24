<template>
  <div class="fill-viewport">
    <div class="static-bar">
      <button @click="player.play()">
        <v-icon style="color: black;">
          mdi-play
        </v-icon>
      </button>
      {{ label }}
    </div>
    <client-only>
      <video-player ref="videoPlayer" class="fit-container" :options="playerOptions" @ended="onPlayerEnded($event)" />
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { playNext } from '../modules/utils'

export default {
  layout: 'void',
  data () {
    return {
      currentSong: {
        video: '/Countdown_PreRun.mp4',
        tumbnail: '/archive/icon.png'
      },
      nowPlayingInfo: {}
    }
  },
  computed: {
    ...mapState(['isPlayerPlaying']),
    ...mapGetters(['getQueue', 'getNowPlayingSongIndex']),
    label () {
      let username = '[loading...]'
      let nextUser = '[loading...]'
      let nextLabel = ''
      const nextSong = this.getQueue[this.nextSongIndex]
      if (typeof this.nowPlayingInfo.username !== 'undefined') {
        username = this.nowPlayingInfo.username.name
        nextUser = nextSong.username.name
      }
      if (this.nextSongIndex === 0) {
        nextLabel = 'WARNING: THIS IS THE LAST SONG! - The list will repeat from the beginning.'
      } else {
        nextLabel = `${nextSong.title} added by ${nextUser}`
      }
      return `Now Playing: ${this.nowPlayingInfo.artist} - ${this.nowPlayingInfo.title} added by ${username} *** Up next: ${nextLabel}`
    },
    nowPlaying () {
      return this.getQueue[this.getNowPlayingSongIndex]
    },
    nextSongIndex () {
      if (this.getQueue.length - 1 > this.getNowPlayingSongIndex) {
        return this.getNowPlayingSongIndex + 1
      }
      return 0
    },
    playerOptions () {
      return {
        // videojs options
        muted: false,
        fill: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.currentSong.video || '/Countdown_PreRun.mp4'
          }
        ],
        poster: this.currentSong.thumbnail || '/icon.png',
        autoplay: true
      }
    },
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    getNowPlayingSongIndex (newVal) {
      if (typeof newVal !== 'undefined' && !this.currentSong.video.includes(this.getQueue[newVal].videoId)) {
        const playingSong = this.getQueue[newVal]
        this.currentSong = {
          video: `/archive/${playingSong.videoId}.mp4`,
          tumbnail: playingSong.thumbnail
        }
        this.nowPlayingInfo = playingSong
      }
    },
    isPlayerPlaying (isPlaying) {
      if (isPlaying) {
        this.player.play()
      } else {
        this.player.pause()
      }
    }
  },
  methods: {
    onPlayerEnded (ev) {
      const queue = this.getQueue
      const nowPlayingSongIndex = this.getNowPlayingSongIndex
      const nextSongIndex = playNext(this, queue, nowPlayingSongIndex)
      if (this.currentSong.video.includes(this.getQueue[nextSongIndex].videoId)) {
        const playingSong = this.getQueue[nextSongIndex]
        this.currentSong = {
          video: `/archive/${playingSong.videoId}.mp4`,
          tumbnail: playingSong.thumbnail
        }
      }
    }
  }
}
</script>

<style scoped>
.static-bar {
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 0.6;
  background-color: aquamarine;
  color: black;
  font-size: larger;
  z-index: 1;
}

.fill-viewport {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.fit-container {
  height: 100%;
  width: 100%;
}
</style>
