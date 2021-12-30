<template>
  <v-container>
    <span class="subtitle-1">My songs</span>
    <v-divider class="my-1" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <song-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongList from '~/components/SongList.vue'
export default {
  components: {
    SongList
  }
}
</script>
