<template>
  <v-list>
    <song-item
      v-for="(item) in storedSongResults"
      :key="item.id"
      :item="item"
    />
    <song-item
      v-for="(item) in ytSearchResults"
      :key="item.videoId"
      :item="item"
    />
    <v-card
      v-if="hasYtResults && ytNextPage !== ''"
      class="d-flex justify-space-around pa-4 ma-2"
      @click="!loadingResults ? onIntersect() : null"
    >
      <v-progress-circular
        v-if="loadingResults"
        indeterminate
        color="primary"
      />
      <div v-else>
        More results!
      </div>
    </v-card>
    <div v-if="storedSongResults.length === 0 && ytSearchResults.length === 0">
      <p class="text-center">
        No results found locally
      </p>
      <p class="text-center text-h6">
        Press enter to search the Cloud
      </p>
    </div>
    <div style="height: 43px;" />
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import SongItem from '~/components/SongItem.vue'

export default {
  components: {
    SongItem
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loadingResults: false
    }
  },
  computed: {
    ...mapState(['ytSearchResults', 'ytNextPage', 'storedSongs', 'searchTerm']),
    hasYtResults () {
      return this.ytSearchResults.length
    },
    storedSongResults () {
      if (this.searchTerm === '') {
        return this.storedSongs
      }
      return this.storedSongs.filter(el =>
        el.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        el.artist.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        el.genre.includes(_.startCase(_.toLower(this.searchTerm))) ||
        el.style.includes(_.startCase(_.toLower(this.searchTerm)))
      )
    }
  },
  methods: {
    async onIntersect () {
      if (this.hasYtResults) {
        this.loadingResults = true
        await this.$store.dispatch('fetchNextYouTubePage')
        this.loadingResults = false
      }
    }
  }
}
</script>
