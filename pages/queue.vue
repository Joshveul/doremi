<template>
  <div>
    <SlickList v-model="items" lock-axis="y" tag="ul">
      <SlickItem v-for="(item, index) in items" :key="index" :index="index" tag="li">
        {{ item }}
      </SlickItem>
    </SlickList>
  </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'

export default {
  components: {
    SlickItem,
    SlickList
  },
  data () {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementsByClassName('v-main')[0].style.padding = '56px 0px 118px 0px'
    })
  }
}
</script>
