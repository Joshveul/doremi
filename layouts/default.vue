<template>
  <v-app id="default">
    <v-app-bar
      app
    >
      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-toolbar-title>Doremi</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <mini-player />
    <bottom-navigation />
    <song-options />
  </v-app>
</template>

<script>
import BottomNavigation from '~/components/BottomNavigation.vue'
import MiniPlayer from '~/components/MiniPlayer.vue'
import SongOptions from '~/components/SongOptions.vue'

export default {
  components: { BottomNavigation, SongOptions, MiniPlayer }
}
</script>
