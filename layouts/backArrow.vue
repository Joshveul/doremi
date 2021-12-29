<template>
  <v-app id="back">
    <v-app-bar
      app
    >
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <search-input class="flex-grow-1" />

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
    <bottom-navigation />
    <song-options />
  </v-app>
</template>

<script>
import BottomNavigation from '~/components/BottomNavigation.vue'
import SongOptions from '~/components/SongOptions.vue'
import SearchInput from '~/components/SearchInput.vue'

export default {
  components: { BottomNavigation, SongOptions, SearchInput },
  data () {
    return {
    }
  }
}
</script>
