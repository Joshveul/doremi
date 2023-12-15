<template>
  <div class="fill-viewport">
    <client-only>
      <video-player
        ref="videoPlayer"
        class="fit-container"
        :options="playerOptions"
        @ended="onPlayerEnded($event)"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'void',
  data () {
    return {
      currentSong: {
        video: '/Countdown_PreRun.mp4',
        tumbnail: '/archive/icon.png'
      }
    }
  },
  computed: {
    ...mapGetters(['getQueue', 'getNowPlayingSongIndex']),
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
      }
    }
  },
  methods: {
    onPlayerEnded (ev) {
      let nextSongIndex
      if (this.getQueue.length - 1 > this.getNowPlayingSongIndex) {
        nextSongIndex = this.getNowPlayingSongIndex + 1
      } else {
        nextSongIndex = 0
      }
      if (this.currentSong.video.includes(this.getQueue[nextSongIndex].videoId)) {
        const playingSong = this.getQueue[nextSongIndex]
        this.currentSong = {
          video: `/archive/${playingSong.videoId}.mp4`,
          tumbnail: playingSong.thumbnail
        }
      }
      this.$store.dispatch('updateNowPlayingSong', { nowPlayingIndex: nextSongIndex, wasPlayingIndex: this.getNowPlayingSongIndex })
    }
  }
}
</script>

<style scoped>
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
