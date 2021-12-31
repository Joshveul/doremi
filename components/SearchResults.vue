<template>
  <v-list three-line>
    <song-item
      v-for="(item, i) in ytSearchResults"
      :key="i"
      :item="item"
    />
    <v-card
      v-if="hasYtResults"
      class="d-flex justify-space-around mt-2"
      flat
    >
      <v-progress-circular
        v-intersect="{
          handler: onIntersect,
          threshold: 1
        }"
        indeterminate
        color="primary"
      />
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
  computed: {
    ...mapState({ ytSearchResults: 'ytSearchResults' }),
    hasYtResults () {
      return this.ytSearchResults.length
    }
  },
  methods: {
    onIntersect () {
      if (this.hasYtResults) {
        this.$store.dispatch('fetchNextYouTubePage')
      }
    }
  }
}
</script>
