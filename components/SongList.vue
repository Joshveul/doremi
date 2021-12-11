<template>
  <v-list three-line>
    <song-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :sq-thumb="item.sqThumb"
      :title="item.title"
      :artist="item.artist"
    />
  </v-list>
</template>

<script>
import SongItem from '~/components/SongItem.vue'

export default {
  components: {
    SongItem
  },
  data: () => ({
    items: [
      {
        color: '#1F7087',
        sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People'
      },
      {
        color: '#1F7087',
        sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People'
      },
      {
        color: '#1F7087',
        sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People'
      }
    ]
  })
}
</script>
