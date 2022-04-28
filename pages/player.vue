<template>
  <div class="fill-viewport">
    <button style="position: absolute; z-index: 1; background: white;" @click="swapList">
      Hello
    </button>
    <video-player
      ref="videoPlayer"
      class="fit-container"
      :options="playerOptions"
    />
  </div>
</template>

<script>

require('videojs-playlist')

export default {
  layout: 'void',
  data () {
    return {
      alternate: true
    }
  },
  computed: {
    playerOptions () {
      return {
      // videojs options
        muted: false,
        fill: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        playlist: this.list,
        autoplay: true
      }
    },
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    swapList () {
      console.log('clicked with alternate: ', this.alternate)
      this.alternate = !this.alternate
      if (this.alternate) {
        this.player.playlist([{
          sources: [{
            type: 'video/mp4',
            src: '/archive/wqE5j1TQWVs.mp4'
          }],
          poster: '/archive/wqE5j1TQWVs.jpg'
        }, {
          sources: [{
            type: 'video/mp4',
            src: '/archive/GZ8RNuV1fTo.mp4'
          }],
          poster: '/archive/GZ8RNuV1fTo.jpg'
        }])
      } else {
        this.player.playlist([{
          sources: [{
            type: 'video/mp4',
            src: '/archive/qk4pxJZBCMw.mp4'
          }],
          poster: '/archive/qk4pxJZBCMw.jpg'
        }])
      }
      this.player.playlist.autoadvance(0)
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
