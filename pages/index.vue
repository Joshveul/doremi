<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <ItemList
        title="Popular"
        source="storage"
        :items="$store.state.storedSongs"
      />
      <!-- <ItemList
        title="Current search results"
        :items="$store.state.ytSearchResults"
      />
      <ItemList
        title="From past sessions"
        :items="$store.state.ytSearchResults"
      />
      <ItemList
        title="Played in previous sessions with you"
        :items="$store.state.ytSearchResults"
      /> -->
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
