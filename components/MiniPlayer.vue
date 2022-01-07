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
        <v-img class="ma-2" width="80" :src="nowPlayingSong.thumbnail" />
        <div class="flex-grow-1">
          <v-card-subtitle
            class="px-0 pt-2 pb-0"
          >
            <marquee-text :text="nowPlayingSong.title" :max-width="maxTextSpace" />
          </v-card-subtitle>
          <v-card-subtitle
            class="pl-0 py-0"
          >
            <marquee-text :text="nowPlayingSong.artist" :max-width="maxTextSpace" />
          </v-card-subtitle>
        </div>
        <v-card-actions>
          <v-btn
            ref="playpause"
            icon
            @click.stop.prevent=""
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            ref="next"
            icon
            @click.stop.prevent=""
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn
            ref="prev"
            icon
            @click.stop.prevent=""
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
import MarqueeText from '~/components/MarqueeText.vue'

export default {
  components: { MarqueeText },
  data () {
    return {
      maxTextSpace: 0
    }
  },
  computed: {
    ...mapState({ nowPlayingSong: 'nowPlayingSong' })
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
