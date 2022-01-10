<template>
  <v-card
    tile
    flat
  >
    <v-card-title>
      <p class="text-h6 mx-auto line-height-20 text-center mb-1">
        {{ title }}
      </p>
    </v-card-title>
    <v-card-subtitle class="pb-0">
      <p class="mx-auto line-height-20 text-center mb-0">
        {{ nowPlayingSong.artist }}
      </p>
    </v-card-subtitle>
    <v-slider
      class="mx-5"
      max="50"
      min="0"
      hide-details
    />
    <v-container class="pt-0 text-caption">
      <span class="float-left">00:00</span>
      <span class="float-right">{{ nowPlayingSong.duration }}</span>
    </v-container>
    <player-controls class="justify-center" />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import PlayerControls from '~/components/player/PlayerControls.vue'

export default {
  components: { PlayerControls },
  computed: {
    ...mapState(['nowPlayingSong']),
    title () {
      if (this.nowPlayingSong.title === this.nowPlayingSong.artist) {
        return ''
      }
      return this.nowPlayingSong.title
    }
  }
}
</script>

<style>
.line-height-20 {
  line-height: 1.2rem !important;
}
</style>
