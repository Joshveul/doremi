<template>
  <v-bottom-sheet v-model="isOpen">
    <v-card>
      <v-img height="100" class="white--text darker-image" :src="thumbnail">
        <v-card-title>
          <marquee-text :text="selectedSong.title" :max-width="maxTextSpace" />
        </v-card-title>
        <v-card-subtitle class="pt-0">
          {{ selectedSong.artist }}
        </v-card-subtitle>
      </v-img>
    </v-card>
    <v-list dense>
      <v-list-item @click="addToQueue">
        <v-list-item-icon>
          <v-icon>mdi-playlist-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Add to queue
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="playNext">
        <v-list-item-icon>
          <v-icon>mdi-playlist-play</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Play next
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-show="'id' in selectedSong" class="my-2" />
      <favorite v-show="'id' in selectedSong" :show-text="true" :song-id="selectedSong.id" />
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from 'vuex'
// import MarqueeText from '~/components/MarqueeText.vue'
// import Favorite from '~/components/Favorite.vue'

export default {
  // components: { MarqueeText, Favorite },
  data () {
    return {
      maxTextSpace: 193
    }
  },
  computed: {
    ...mapState({
      songOptionsOpen: 'songOptionsOpen',
      selectedSong: 'selectedSong',
      userData: 'userData'
    }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setSongOptionsOpen', newValue)
      },
      get () {
        return this.songOptionsOpen
      }
    },
    thumbnail () {
      return decodeURIComponent(this.selectedSong.thumbnail)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maxTextSpace = document.body.clientWidth
    })
  },
  methods: {
    addToQueue () {
      this.$store.dispatch('addToQueue', { item: this.selectedSong })
      this.isOpen = false
    },
    playNext () {
      this.$store.dispatch('addToQueue', {
        item: this.selectedSong,
        playNext: true
      })
      this.isOpen = false
    }
  }
}
</script>
<style>
.darker-image .v-image__image {
  filter: brightness(25%);
}
</style>
