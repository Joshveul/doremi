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
      playingIndex: 0
    }
  },
  computed: {
    ...mapGetters(['getQueue']),
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
    },
    currentSong () {
      const playingSong = this.getQueue[this.playingIndex]
      if (playingSong) {
        return {
          video: `/archive/${playingSong.videoId}.mp4`,
          tumbnail: playingSong.thumbnail
        }
      }
      return {
        video: '/Countdown_PreRun.mp4',
        tumbnail: '/archive/icon.png'
      }
    }
  },
  methods: {
    onPlayerEnded (ev) {
      this.playingIndex++
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
