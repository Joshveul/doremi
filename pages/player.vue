<template>
  <div class="fill-viewport">
    <video-player
      ref="videoPlayer"
      class="fit-container"
      :options="playerOptions"
      @ended="onPlayerEnded($event)"
    />
  </div>
</template>

<script>
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
        sources: [
          {
            type: 'video/mp4',
            src: '/archive/a5LOjg1EiAk.mp4'
          }
        ],
        poster: '/archive/a5LOjg1EiAk.jpg',
        autoplay: true
      }
    },
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    onPlayerEnded (ev) {
      // TODO: Get get next song logic
      this.player.play()
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
