<template>
  <v-list-item
    :key="title"
    class="song-item"
    ripple
    @click="onClick"
  >
    <v-img max-width="120" class="mr-2" :src="thumbnail" />

    <v-list-item-content>
      <v-list-item-title v-text="title" />
      <v-list-item-subtitle v-text="artist" />
      <v-list-item-subtitle v-text="artist" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick () {
      this.$store.commit('setSelectedSong', {
        title: this.title,
        thumbnail: this.thumbnail,
        artist: this.artist
      })
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
