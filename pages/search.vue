<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <search-results />
    </v-flex>
  </v-layout>
</template>

<script>
import SearchResults from '~/components/SearchResults.vue'

export default {
  components: { SearchResults },
  layout: 'backArrow'
}
</script>
