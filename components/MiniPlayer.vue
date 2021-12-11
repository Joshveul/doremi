<template>
  <v-container class="mini-player">
    <v-card
      :color="nowPlayingSong.color"
    >
      <div
        class="d-flex flex-nowrap"
      >
        <v-avatar
          class="ma-3"
          size="50"
          tile
        >
          <v-img :src="nowPlayingSong.sqThumb" />
        </v-avatar>
        <div>
          <v-card-subtitle
            class="pl-0 pt-2 pb-0"
          >
            <overflow-marquee>
              {{ nowPlayingSong.title }}
            </overflow-marquee>
          </v-card-subtitle>
          <v-card-subtitle
            class="pl-0 py-0"
          >
            <overflow-marquee>
              {{ nowPlayingSong.artist }}
            </overflow-marquee>
          </v-card-subtitle>
        </div>
        <v-card-actions class="flex-grow-1">
          <v-btn
            ref="playpause"
            icon
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            ref="next"
            icon
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn
            ref="prev"
            icon
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import OverflowMarquee from '~/components/OverflowMarquee.vue'

export default {
  components: { OverflowMarquee },
  computed: {
    ...mapState({ nowPlayingSong: 'nowPlayingSong' })
  }
}
</script>

<style>
.container.mini-player {
  position: fixed;
  bottom: 40px;
}
</style>
