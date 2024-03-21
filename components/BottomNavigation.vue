<template>
  <v-container>
    <v-bottom-navigation color="primary" app grow>
      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/my-songs">
        <span>Favorites</span>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn to="/sessions">
        <span>Past nights</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn v-if="showQueueInNavigation" to="/queue">
        <span>Queue</span>
        <v-icon>mdi-playlist-play</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['nowPlayingSong']),
    ...mapGetters(['getSettings']),
    showQueueInNavigation () {
      return this.getSettings.includes('queueInNavigation')
    }
  }
}
</script>
