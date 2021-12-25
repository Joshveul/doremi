<template>
  <slick-list
    v-model="taskList"
    lock-axis="y"
    use-drag-handle
    helper-class="helper-class"
    @sort-start="sortStart"
    @sort-end="sortEnd"
  >
    <slot />
  </slick-list>
</template>
<script>
import colors from 'vuetify/es5/util/colors'
import { SlickList } from 'vue-slicksort'
export default {
  components: {
    SlickList
  },
  data () {
    return {
      colors,
      taskList: []
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
