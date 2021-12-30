<template>
  <v-app id="back">
    <v-app-bar
      app
    >
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <search-input ref="searchInput" class="flex-grow-1" @blur="showMagnifier" @focus="hideMagnifier" />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
      <v-fab-transition>
        <v-btn
          v-if="inSearchPage && !searchFocused"
          fab
          large
          dark
          bottom
          absolute
          right
          class="mb-10 mr-4"
          @click="focusSearch"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-fab-transition>
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
      searchFocused: true
    }
  },
  computed: {
    inSearchPage () {
      return this.$router.currentRoute.name === 'search'
    }
  },
  methods: {
    focusSearch () {
      this.$refs.searchInput.$el.querySelector('input').focus()
    },
    showMagnifier () {
      setTimeout(() => {
        this.searchFocused = false
      }, 500)
    },
    hideMagnifier () {
      setTimeout(() => {
        this.searchFocused = true
      }, 500)
    }
  }
}
</script>
