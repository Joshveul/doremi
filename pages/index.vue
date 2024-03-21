<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <ItemList v-if="$store.state.ytSearchResults.length > 0" title="Current search results" :items="$store.state.ytSearchResults.slice(0, 15)" />
      <ItemList v-if="$store.state.storedSongs.length > 0" title="All-time history" source="storage" :items="$store.state.storedSongs.slice(0, 12)" />
      <ItemList v-if="userAddedSongs.count > 0" title="Previously added by you" :items="userAddedSongs.results.slice(0, 21)" source="storage" />
      <div style="height: 43px;" />
    </v-col>
  </v-row>
</template>

<script>
import ItemList from '~/components/ItemList.vue'

export default {
  components: {
    ItemList
  },
  data () {
    return {
      userAddedSongs: {
        count: 0,
        results: []
      }
    }
  },
  async mounted () {
    const result = await fetch('/api/getAddedSongs?userId=' + this.$store.state.userData._id)
    this.userAddedSongs = await result.json()
  }
}
</script>
