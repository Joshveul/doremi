<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 v-if="userName !== ''">
        Welcome, {{ userName }}
      </h3>
      <ItemList v-if="$store.state.storedSongs.length > 0" title="A window to the past" source="storage" :items="$store.state.storedSongs" />
      <!-- <ItemList
        title="Current search results"
        :items="$store.state.ytSearchResults"
      />
      <ItemList
        title="From past sessions"
        :items="$store.state.ytSearchResults"
      /> -->
      <ItemList v-if="$store.state.ytSearchResults.length > 0" title="Current search results" :items="$store.state.ytSearchResults" />
    </v-col>
  </v-row>
</template>

<script>
import ItemList from '~/components/ItemList.vue'

export default {
  components: {
    ItemList
  },
  computed: {
    userName () {
      return this.$store.state.userData.name
    }
  }
}
</script>
