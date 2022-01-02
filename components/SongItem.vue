<template>
  <v-list-item
    :key="item.title"
    class="song-item"
    ripple
    @click="onClick"
  >
    <v-img max-width="120" class="mr-2" :src="item.thumbnail" />

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
    source: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default () {
        return { videoId: '', title: '', artist: '', thumbnail: '', channel: '', duration: '' }
      }
    }
  },
  methods: {
    onClick () {
      this.$store.commit('setSelectedSong', { ...this.item, source: this.source })
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
