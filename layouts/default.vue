<template>
  <v-app id="default">
    <v-app-bar app>
      <search-input class="flex-grow-1" />
      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <mini-player />
    <bottom-navigation />
    <song-options />
    <selected-session-dialog />
    <song-queue />
  </v-app>
</template>

<script>
import BottomNavigation from '~/components/BottomNavigation.vue'
import SelectedSessionDialog from '~/components/sessions/SelectedSessionDialog.vue'
import MiniPlayer from '~/components/player/MiniPlayer.vue'
import SongOptions from '~/components/SongOptions.vue'
import SearchInput from '~/components/SearchInput.vue'
import SongQueue from '~/components/SongQueue.vue'

export default {
  name: 'Default',
  components: {
    BottomNavigation,
    SongOptions,
    MiniPlayer,
    SearchInput,
    SelectedSessionDialog,
    SongQueue
  },
  middleware: ['auth']
}
</script>
