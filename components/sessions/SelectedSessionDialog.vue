<template>
  <v-dialog
    id="test"
    v-model="isOpen"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card
      v-touch="{
        down: () => swipe()
      }"
    >
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="isOpen = !isOpen"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-scroll.self="onScroll"
      >
        <song-list />
        <song-list />
        <song-list />
        <song-list />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import SongList from '~/components/SongList.vue'

export default {
  components: { SongList },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      scrollPosition: 0
    }
  },
  computed: {
    ...mapState({ selectedSession: 'selectedSession', selectedSessionOpen: 'selectedSessionOpen' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setSelectedSessionOpen', newValue)
      },
      get () { return this.selectedSessionOpen }
    }
  },
  methods: {
    swipe () {
      if (this.scrollPosition === 0) {
        this.isOpen = !this.isOpen
      }
    },
    onScroll (e) {
      this.scrollPosition = e.target.scrollTop
    }
  }
}
</script>
