<template>
  <v-app id="back">
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

export default {
  components: { BottomNavigation, SongOptions },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
