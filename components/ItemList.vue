<template>
  <v-container>
    <h4 v-if="title !== ''">
      {{ title }}
    </h4>
    <hooper style="height: auto;" :items-to-show="1.1">
      <slide>
        <song-list />
      </slide>
      <slide>
        <song-list />
      </slide>
      <slide>
        <song-list />
      </slide>
    </hooper>
  </v-container>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import SongList from '~/components/SongList.vue'
import 'hooper/dist/hooper.css'

export default {
  components: {
    Hooper,
    Slide,
    SongList
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.hooper-track {
  padding-left: 0 !important;
}
</style>
