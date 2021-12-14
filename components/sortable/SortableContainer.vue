<template>
  <slick-list
    v-model="taskList"
    lock-axis="y"
    use-drag-handle
    helper-class="helper-class"
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
  computed: {
  }
}
</script>
<style>
.helper-class {
  font-family: Roboto, sans-serif;
  line-height: 24px;
  height: 100%;
}

.helper-class .item-content {
  margin-left: 10px;
}

.helper-class .v-image {
  margin-left: 2px;
}

.helper-class .v-icon.mdi-playlist-remove {
  display: none;
}
</style>
