<template>
  <v-layout class="mini-player" style="width: 100%;">
    <v-card
      v-touch="{
        up: () => openQueue()
      }"
      color="primary"
      class="mx-1 flex-grow-1"
      :ripple="false"
      @click="openQueue"
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
        <div class="flex-grow-1">
          <v-card-subtitle
            class="px-0 pt-2 pb-0"
          >
            <overflow-marquee :text="nowPlayingSong.title" />
          </v-card-subtitle>
          <v-card-subtitle
            class="pl-0 py-0"
          >
            <overflow-marquee :text="nowPlayingSong.artist" />
          </v-card-subtitle>
        </div>
        <v-card-actions>
          <v-btn
            ref="playpause"
            icon
            @click.prevent=""
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            ref="next"
            icon
            @click.prevent=""
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn
            ref="prev"
            icon
            @click.prevent=""
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import OverflowMarquee from '~/components/OverflowMarquee.vue'

export default {
  components: { OverflowMarquee },
  computed: {
    ...mapState({ nowPlayingSong: 'nowPlayingSong' })
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
  bottom: 54px;
}
</style>
