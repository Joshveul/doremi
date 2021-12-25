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
        <div class="flex-grow-1">
          <dynamic-marquee
            direction="row"
            reverse
            :speed="{type: 'pps', number: 40}"
            style="height: 50px;"
            class="text-h6 pt-3 pr-3"
          >
            {{ selectedSong.title }}
          </dynamic-marquee>
          <v-card-subtitle
            class="pl-0 pt-0"
            v-text="selectedSong.artist"
          />
        </div>
        <v-btn
          icon
          class="ml-auto mt-2 mr-2"
        >
          <v-icon>mdi-star-outline</v-icon>
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
import DynamicMarquee from 'vue-dynamic-marquee'

export default {
  components: { DynamicMarquee },
  computed: {
    ...mapState({ songOptionsOpen: 'songOptionsOpen', selectedSong: 'selectedSong' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setSongOptionsOpen', newValue)
      },
      get () { return this.songOptionsOpen }
    }
  }
}
</script>
