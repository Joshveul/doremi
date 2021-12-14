<template>
  <div>
    Playing next
    <v-divider class="my-2" />
    <sortable-container
      class="sort-container"
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
  </div>
</template>

<script>
import SortableItem from '~/components/sortable/SortableItem.vue'
import SortableContainer from '~/components/sortable/SortableContainer.vue'

export default {
  components: {
    SortableItem,
    SortableContainer
  },
  data () {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementsByClassName('v-main')[0].style.padding = '56px 0px 118px 0px'
      document.getElementsByClassName('sort-container')[0].style.maxHeight = window.innerHeight - 265 + 'px'
      document.getElementsByClassName('sort-container')[0].style.overflow = 'scroll'
    })
  }
}
</script>

<style scoped>
.sort-container::after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 90%);
  width: 100%;
  height: 4em;
}
</style>
