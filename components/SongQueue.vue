<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card
      v-touch="{
        down: () => swipeDown()
      }"
      class="d-flex flex-column"
    >
      <v-toolbar
        class="header-bar bg bg-gradient"
        dark
        max-height="15vh"
      >
        <v-btn
          icon
          dark
          @click="isOpen = !isOpen"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Song Queue</v-toolbar-title>
      </v-toolbar>
      <v-container style="max-height: 35vh;">
        <player />
        <v-divider />
        <v-container class="py-1 d-flex justify-space-between">
          <div class="justify-start">
            <v-icon size="18">
              mdi-playlist-play
            </v-icon>
            <span class="text-caption">
              {{ queue.length }} song{{ queue.length !== 1 ? 's' : '' }} in queue
            </span>
          </div>
          <div class="d-flex align-center justify-end">
            <v-icon size="15">
              mdi-timer-outline
            </v-icon>
            <span class="text-caption">
              {{ listDuration }}
            </span>
          </div>
        </v-container>
        <v-divider />
      </v-container>
      <v-card-text
        ref="queueContent"
        class="queue-content px-0"
        style="max-height: 50vh;"
      >
        <sortable-container
          ref="sortContainer"
          v-scroll.self="onScroll"
          :items="queue"
          class="sort-container"
          style="max-height: 54vh; overflow: scroll;"
          @sort-start="sortStart"
          @sort-end="sortEnd"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import SortableContainer from '~/components/sortable/SortableContainer.vue'
import Player from '~/components/player/Player.vue'
import { convertSecondsToTime } from '~/modules/utils'

export default {
  components: {
    SortableContainer,
    Player
  },
  data () {
    return {
      scrollPosition: 0,
      sorting: false,
      swiping: false
    }
  },
  computed: {
    ...mapState({
      queueOpen: 'queueOpen',
      queue: 'queue',
      queueState: 'queueState'
    }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setQueueOpen', newValue)
      },
      get () {
        return this.queueOpen
      }
    },
    listDuration () {
      return convertSecondsToTime(this.queueState.time)
    }
  },
  methods: {
    swipeDown () {
      if (this.sorting === false && this.scrollPosition === 0) {
        this.isOpen = false
      }
    },
    onScroll (e) {
      this.scrollPosition = e.target.scrollTop
    },
    sortStart () {
      this.sorting = true
    },
    sortEnd () {
      this.sorting = false
    }
  }
}
</script>
