<template>
  <v-list three-line>
    <song-item
      v-for="(item, i) in items"
      :key="i"
      :item="item"
    />
  </v-list>
</template>

<script>
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
  }
}
</script>
