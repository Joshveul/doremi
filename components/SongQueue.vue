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
        max-height="100px"
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
      <v-card-text
        ref="queueContent"
        class="queue-content px-0"
      >
        <sortable-container
          ref="sortContainer"
          v-scroll.self="onScroll"
          :items="queue"
          class="sort-container"
          style="max-height: 90vh; overflow: scroll;"
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

export default {
  components: {
    SortableContainer
  },
  data () {
    return {
      scrollPosition: 0,
      sorting: false,
      swiping: false
    }
  },
  computed: {
    ...mapState({ queueOpen: 'queueOpen', queue: 'queue' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setQueueOpen', newValue)
      },
      get () { return this.queueOpen }
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
