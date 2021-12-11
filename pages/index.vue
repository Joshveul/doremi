<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <ItemList title="Favorites" />
      <ItemList title="Favorites" />
      <ItemList title="Favorites" />
    </v-col>
  </v-row>
</template>

<script>
import ItemList from '~/components/ItemList.vue'
export default {
  components: {
    ItemList
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementsByClassName('v-main')[0].style.padding = '56px 0px 118px 0px'
    })
  }
}
</script>
