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
          <v-img :src="thumbnail" />
        </v-avatar>
        <div class="">
          <v-card-title class="px-0">
            <marquee-text
              :text="selectedSong.title"
              :max-width="maxTextSpace"
            />
          </v-card-title>
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
        @click="addToQueue"
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
        @click="playNext"
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
import MarqueeText from '~/components/MarqueeText.vue'

export default {
  components: { MarqueeText },
  data () {
    return {
      maxTextSpace: 193
    }
  },
  computed: {
    ...mapState({ songOptionsOpen: 'songOptionsOpen', selectedSong: 'selectedSong' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setSongOptionsOpen', newValue)
      },
      get () { return this.songOptionsOpen }
    },
    thumbnail () {
      return decodeURIComponent(this.selectedSong.thumbnail)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maxTextSpace = document.body.clientWidth - 205
    })
  },
  methods: {
    addToQueue () {
      this.$store.dispatch('addToQueue', { item: this.selectedSong })
      this.isOpen = false
    },
    playNext () {
      this.$store.dispatch('addToQueue', { item: this.selectedSong, playNext: true })
      this.isOpen = false
    }
  }
}
</script>
