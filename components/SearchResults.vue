<template>
  <v-list three-line>
    <song-item
      v-for="(item, i) in ytSearchResults"
      :key="i"
      :color="item.color"
      :thumbnail="item.thumbnail"
      :title="item.title"
      :artist="item.artist"
    />
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
    ...mapState({ ytSearchResults: 'searchResults' })
  }
}
</script>
