<template>
  <v-list-item
    :key="title"
    class="song-item"
    ripple
    @click="onClick"
  >
    <v-list-item-avatar rounded="lg" size="60">
      <v-img :src="sqThumb" />
    </v-list-item-avatar>

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
    sqThumb: {
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
        sqThumb: this.sqThumb,
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
