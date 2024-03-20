<template>
  <v-layout class="mini-player" style="width: 100%;">
    <v-card
      v-touch="{
        up: () => openQueue()
      }"
      dark
      class="mx-1 flex-grow-1 bg bg-gradient"
      :ripple="false"
      @click="openQueue"
    >
      <div
        class="d-flex flex-nowrap"
      >
        <v-img class="ma-2" width="80" :src="thumbnail" />
        <div class="flex-grow-1">
          <v-card-subtitle class="px-0 pt-2 pb-0">
            <marquee-text :text="songTitle" :max-width="maxTextSpace" />
          </v-card-subtitle>
          <v-card-subtitle class="px-0 py-0">
            <marquee-text :text="songArtist" :max-width="maxTextSpace" />
          </v-card-subtitle>
          <div class="py-0 d-flex justify-space-between">
            <div class="justify-start">
              <v-icon size="18">
                mdi-playlist-play
              </v-icon>
              <span class="text-caption white--text">
                {{ queue.length }} song{{ queue.length !== 1 ? 's' : '' }} in queue
              </span>
            </div>
            <div class="justify-end pr-3">
              <v-icon size="15">
                mdi-timer-outline
              </v-icon>
              <span class="text-caption white--text">
                {{ listDuration }}
              </span>
            </div>
          </div>
        </div>
        <!-- <player-controls /> -->
      </div>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import MarqueeText from '~/components/MarqueeText.vue'
import { convertTimeToSeconds, convertSecondsToTime } from '~/modules/utils'

export default {
  components: { MarqueeText },
  data () {
    return {
      maxTextSpace: 0
    }
  },
  computed: {
    ...mapState(['nowPlayingSong', 'queue']),
    thumbnail () {
      if (typeof this.nowPlayingSong !== 'undefined') {
        return decodeURIComponent(this.nowPlayingSong.thumbnail)
      }
      return ''
    },
    songTitle () {
      if (typeof this.nowPlayingSong !== 'undefined') {
        return this.nowPlayingSong.title
      }
      return ''
    },
    songArtist () {
      if (typeof this.nowPlayingSong !== 'undefined') {
        return this.nowPlayingSong.artist
      }
      return ''
    },
    listDuration () {
      let duration = 0
      this.queue.forEach((element) => {
        duration += convertTimeToSeconds(element.duration)
      })
      return convertSecondsToTime(duration)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maxTextSpace = document.body.clientWidth - 140 - 35
    })
  },
  methods: {
    openQueue () {
      this.$store.commit('setQueueOpen', true)
    }
  }
}
</script>

<style>
.layout.mini-player {
  position: fixed;
  bottom: 55px;
}
</style>
