<template>
  <div class="fill-viewport">
    <ul class="circles">
      <li v-for="n in 10" :key="n" />
    </ul>
    <v-card v-if="getQueue.length === 0" class="mx-auto" color="transparent" dark flat>
      <v-card-title class="font-weight-black" style="color: #fff; font-size: 5em;">
        <v-icon large left dark style="font-size: 250px;">
          mdi-music
        </v-icon>A&amp;J's B&amp;B
        Karaoke
      </v-card-title>
      <v-card-text class="text-h5 font-weight-bold text-center">
        Sit back and relax while someone decides how to start this party!.
      </v-card-text>
    </v-card>
    <div v-if="getQueue.length > 0" class="static-bar">
      <button @click="player.play()">
        <v-icon style="color: black;">
          mdi-play
        </v-icon>
      </button>
      {{ label }}
    </div>
    <client-only>
      <video-player
        v-if="getQueue.length > 0"
        ref="videoPlayer"
        class="fit-container"
        :options="playerOptions"
        @ended="onPlayerEnded($event)"
        @timeupdate="onPlayerTimeupdate($event)"
      />
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { playNext } from '../modules/utils'

export default {
  layout: 'empty',
  data () {
    return {
      currentSong: {},
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
        nextLabel = 'No more songs in queue...'
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
        sources: typeof this.currentSong.video !== 'undefined'
          ? [
            {
              type: 'video/mp4',
              src: this.currentSong.video
            }
          ]
          : [],
        poster: this.currentSong.thumbnail,
        autoplay: true
      }
    },
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    getQueue (newQueue, oldQueue) {
      if (typeof this.nowPlayingInfo.video === 'undefined') {
        const playingSong = newQueue[0]
        this.currentSong = {
          video: `/archive/${playingSong.videoId}.mp4`,
          tumbnail: playingSong.thumbnail
        }
        this.nowPlayingInfo = playingSong
      }
    },
    getNowPlayingSongIndex (newVal) {
      if (typeof newVal !== 'undefined' && typeof this.getQueue[newVal] !== 'undefined' && typeof this.currentSong.video !== 'undefined' && !this.currentSong.video.includes(this.getQueue[newVal].videoId)) {
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
    onPlayerTimeupdate (ev) {
      console.log(this.player.currentTime())
    },
    onPlayerEnded (ev) {
      const queue = this.getQueue
      const nowPlayingSongIndex = this.getNowPlayingSongIndex
      const nextSongIndex = playNext(this, queue, nowPlayingSongIndex)
      if (typeof this.currentSong.video !== 'undefined' && this.currentSong.video.includes(this.getQueue[nextSongIndex].videoId)) {
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

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  animation: animate 25s linear infinite;
  bottom: -150px;
  background-size: 20px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  background-size: 80px;
  animation-delay: 0s;
  background-image: url(/svg/cassette.svg);
  -webkit-filter: hue-rotate(20deg) saturate(10) opacity(0.5);
  filter: hue-rotate(20deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
  background-image: url(/svg/headphones.svg);
  -webkit-filter: hue-rotate(25deg) saturate(10) opacity(0.5);
  filter: hue-rotate(25deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  background-image: url(/svg/microphone1.svg);
  -webkit-filter: hue-rotate(50deg) saturate(10) opacity(0.5);
  filter: hue-rotate(50deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  background-size: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
  background-image: url(/svg/microphone2.svg);
  -webkit-filter: hue-rotate(75deg) saturate(10) opacity(0.5);
  filter: hue-rotate(75deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  background-image: url(/svg/microphone3.svg);
  -webkit-filter: hue-rotate(100deg) saturate(10) opacity(0.5);
  filter: hue-rotate(100deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  background-size: 110px;
  animation-delay: 3s;
  background-image: url(/svg/radio.svg);
  -webkit-filter: hue-rotate(280deg) saturate(6) opacity(0.5);
  filter: hue-rotate(280deg) saturate(6) opacity(0.5);
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  background-size: 150px;
  animation-delay: 7s;
  background-image: url(/svg/microphone3.svg);
  -webkit-filter: hue-rotate(320deg) saturate(10) opacity(0.5);
  filter: hue-rotate(320deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  background-size: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
  background-image: url(/svg/volume1.svg);
  -webkit-filter: hue-rotate(175deg) saturate(10) opacity(0.5);
  filter: hue-rotate(175deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  background-size: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
  background-image: url(/svg/volume2.svg);
  -webkit-filter: hue-rotate(200deg) saturate(10) opacity(0.5);
  filter: hue-rotate(200deg) saturate(10) opacity(0.5);
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  background-size: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
  background-image: url(/svg/volume3.svg);
  -webkit-filter: hue-rotate(225deg) saturate(10) opacity(0.5);
  filter: hue-rotate(225deg) saturate(10) opacity(0.5);
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
