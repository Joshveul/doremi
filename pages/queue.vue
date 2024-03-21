<template>
  <div>
    <player />
    <v-divider />
    <div class="py-1 d-flex justify-space-between">
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
    </div>
    <v-divider />
    <v-card-text
      ref="queueContent"
      class="queue-content px-0"
      :style="{ height: listHeight + 'px' }"
    >
      <sortable-container
        ref="sortContainer"
        v-scroll.self="onScroll"
        :items="queue"
        class="sort-container"
        :style="{ overflow: sorting ? 'hidden': 'scroll', height: listHeight + 'px' }"
        @sort-start="sortStart"
        @sort-end="sortEnd"
      />
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SortableContainer from '~/components/sortable/SortableContainer.vue'
import Player from '~/components/player/Player.vue'
import { convertSecondsToTime, convertTimeToSeconds } from '~/modules/utils'

export default {
  components: {
    SortableContainer,
    Player
  },
  data () {
    return {
      scrollPosition: 0,
      sorting: false,
      swiping: false,
      wheelOpt: false,
      wheelEvent: 'wheel',
      listHeight: 50
    }
  },
  computed: {
    ...mapState({
      queueOpen: 'queueOpen',
      queue: 'queue'
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
      let duration = 0
      this.queue.forEach((element) => {
        duration += convertTimeToSeconds(element.duration)
      })
      return convertSecondsToTime(duration)
    }
  },
  mounted () {
    document.addEventListener('touchmove', (e) => {
      if (this.sorting) {
        e.preventDefault()
      }
    }, { passive: false })
    this.listHeight = document.body.clientHeight - 326 - 33
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
