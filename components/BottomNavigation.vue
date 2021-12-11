<template>
  <v-container>
    <v-bottom-navigation
      color="primary"
      app
      grow
    >
      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/queue">
        <span>Queue</span>
        <v-icon>mdi-playlist-music</v-icon>
      </v-btn>
      <v-btn>
        <span>My songs</span>
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>
      <v-btn>
        <span>Profile</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ nowPlayingSong: 'nowPlayingSong' })
  }
}
</script>
