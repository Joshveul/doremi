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
        class="header-bar"
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
        <v-toolbar-title>Song Queue</v-toolbar-title>
      </v-toolbar>
      <v-card-text
        ref="queueContent"
        class="queue-content px-0"
      >
        <sortable-container
          ref="sortContainer"
          v-scroll.self="onScroll"
          class="sort-container"
          style="max-height: 90vh; overflow: scroll;"
          @sort-start="sortStart"
          @sort-end="sortEnd"
        >
          <sortable-item :divider="false" :index="0" />
          <sortable-item :index="1" />
          <sortable-item :index="2" />
          <sortable-item :index="3" />
          <sortable-item :index="4" />
          <sortable-item :index="5" />
          <sortable-item :index="6" />
          <sortable-item :index="7" />
          <sortable-item :index="8" />
          <sortable-item :index="9" />
          <sortable-item :index="10" />
          <sortable-item :index="11" />
          <sortable-item :index="12" />
        </sortable-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import SortableItem from '~/components/sortable/SortableItem.vue'
import SortableContainer from '~/components/sortable/SortableContainer.vue'

export default {
  components: {
    SortableItem,
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
    ...mapState({ queueOpen: 'queueOpen' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setQueueOpen', newValue)
      },
      get () { return this.queueOpen }
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   console.log(this.$refs)
    //   const availableSpace = document.body.clientHeight - 56 + 'px'
    //   this.$refs.queueContent.style.height = availableSpace
    // })
  },
  methods: {
    swipeDown () {
      if (this.sorting === false && this.scrollPosition === 0) {
        this.isOpen = false
      }
    },
    onScroll (e) {
      console.log('scroll')
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

<style scoped>
/* .queue-content {
  height: 300px;
  top: 56px;
  position: absolute;
}

.header-bar {
  position: fixed;
  width: 100%;
}

.sort-container {
  overflow: scroll;
  top: 200px;
  position: revert;
  height: 200px;
} */
</style>
