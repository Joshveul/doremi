<template>
  <v-bottom-sheet v-model="isOpen">
    <v-sheet
      class="pa-4"
    >
      <v-card
        :color="selectedSong.color"
        class="d-flex mb-4"
      >
        <v-avatar
          class="ma-3"
          size="105"
          tile
        >
          <v-img :src="selectedSong.sqThumb" />
        </v-avatar>
        <div>
          <v-card-title
            class="pl-0"
            v-text="selectedSong.title"
          />
          <v-card-subtitle
            class="pl-0"
            v-text="selectedSong.artist"
          />
        </div>
        <v-btn
          icon
          class="ml-auto mt-2 mr-2"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </v-card>
      <v-btn
        class="my-5"
        block
        large
        color="primary"
        @click="isOpen = !isOpen"
      >
        <v-icon left>
          mdi-playlist-plus
        </v-icon>
        Add to queue
      </v-btn>
      <v-btn
        class="my-2 text-left"
        block
        text
        @click="isOpen = !isOpen"
      >
        <v-icon left>
          mdi-playlist-play
        </v-icon>
        Play next
      </v-btn>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ songOptionsOpen: 'songOptionsOpen', selectedSong: 'selectedSong' }),
    isOpen: {
      get () {
        return this.songOptionsOpen
      },
      set (newValue) {
        this.$store.commit('setSongOptionsOpen', newValue)
      }
    }
  }
}
</script>
