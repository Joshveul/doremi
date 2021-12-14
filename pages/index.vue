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
  }
}
</script>
