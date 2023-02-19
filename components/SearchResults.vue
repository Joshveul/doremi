<template>
  <v-list>
    <song-item
      v-for="(item, i) in ytSearchResults"
      :key="i"
      :item="item"
    />
    <v-card
      v-if="hasYtResults"
      class="d-flex justify-space-around pa-4 my-6"
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
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({ ytSearchResults: 'ytSearchResults' }),
    hasYtResults () {
      return this.ytSearchResults.length
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
