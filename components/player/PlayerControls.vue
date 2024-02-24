<template>
  <v-card-actions>
    <v-btn ref="prev" icon :disabled="getNowPlayingSongIndex < 1" @click.stop.prevent="playPrevious">
      <v-icon>mdi-skip-previous</v-icon>
    </v-btn>
    <v-btn ref="playpause" icon @click.stop.prevent="updatePlayStatus">
      <v-icon>mdi-{{ playPauseIcon }}</v-icon>
    </v-btn>
    <v-btn ref="next" icon @click.stop.prevent="playNext">
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { playNext, playPrevious } from '~/modules/utils'

export default {
  computed: {
    ...mapState({
      isPlayerPlaying: 'isPlayerPlaying',
      queue: 'queue'
    }),
    ...mapGetters({
      getNowPlayingSongIndex: 'getNowPlayingSongIndex'
    }),
    playPauseIcon () {
      return this.isPlayerPlaying ? 'pause' : 'play'
    }
  },
  methods: {
    updatePlayStatus () {
      this.$store.dispatch('updateIsPlaying', !this.isPlayerPlaying)
    },
    playNext () {
      playNext(this, this.queue, this.getNowPlayingSongIndex)
    },
    playPrevious () {
      playPrevious(this, this.queue, this.getNowPlayingSongIndex)
    }
  }
}
</script>
