<template>
  <slick-list
    v-model="list"
    lock-axis="y"
    use-drag-handle
    helper-class="helper-class"
    @sort-start="sortStart"
    @sort-end="sortEnd"
  >
    <sortable-item v-for="(e, i) in queue" :key="i.videoId" :item="e" :divider="i !== 0" :index="i" />
  </slick-list>
</template>
<script>
import { mapState } from 'vuex'
import { SlickList } from 'vue-slicksort'
import SortableItem from '~/components/sortable/SortableItem.vue'

export default {
  components: {
    SlickList,
    SortableItem
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapState(['queue']),
    list: {
      set (queue) {
        this.$store.dispatch('updateQueue', queue)
      },
      get () {
        return this.items
      }
    }
  },
  methods: {
    sortStart () {
      this.$emit('sort-start')
    },
    sortEnd () {
      this.$emit('sort-end')
    }
  }
}
</script>
<style>
.helper-class {
  font-family: Roboto, sans-serif;
  line-height: 24px;
  height: 100%;
  z-index: 210;
  left: 0 !important;
  background-color: wheat;
}

.helper-class .v-list-item {
  padding-left: 6px;
  padding-right: 0;
}

.helper-class .item-content {
  margin-left: 8px;
}

.helper-class .v-image {
  margin-left: 2px;
}

.helper-class .v-icon.mdi-drag-horizontal-variant {
  left: 0;
}

.helper-class .v-icon.mdi-playlist-remove {
  display: none;
}
</style>
