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
        </div>
        <player-controls />
      </div>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import MarqueeText from '~/components/MarqueeText.vue'
import PlayerControls from '~/components/player/PlayerControls.vue'

export default {
  components: { MarqueeText, PlayerControls },
  data () {
    return {
      maxTextSpace: 0
    }
  },
  computed: {
    ...mapState({ nowPlayingSong: 'nowPlayingSong' }),
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maxTextSpace = document.body.clientWidth - 74 - 140 - 46
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
