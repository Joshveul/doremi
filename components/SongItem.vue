<template>
  <v-list-item
    :key="item.title"
    class="song-item"
    ripple
    @click="onClick"
  >
    <v-img max-width="120" class="mr-2" :src="item.thumbnails[0].url" />

    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
      <v-list-item-subtitle v-text="item.artist" />
      <v-list-item-subtitle v-text="item.duration" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return { videoId: 'BP7ji1dQ-lA', title: 'WHEN WE WERE YOUNG - Adele (KARAOKE PIANO VERSION)', artist: 'WHEN WE WERE YOUNG - Adele (KARAOKE PIANO VERSION)', thumbnails: [{ url: 'https://i.ytimg.com/vi/BP7ji1dQ-lA/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBqQf3TRLZMykoCqnIHWy7BSi0yrA', width: 480, height: 270 }], channel: 'CoversPH', duration: '5:14' }
      }
    }
  },
  methods: {
    onClick () {
      this.$store.commit('setSelectedSong', this.item)
      this.$store.commit('setSongOptionsOpen', true)
    }
  }
}
</script>

<style scoped>
.song-item {
  cursor: pointer;
}
</style>
