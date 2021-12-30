<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <marquee-text>Test</marquee-text>
      <search-results />
    </v-flex>
  </v-layout>
</template>

<script>
import SearchResults from '~/components/SearchResults.vue'
import MarqueeText from '~/components/MarqueeText.vue'

export default {
  components: { SearchResults, MarqueeText },
  layout: 'backArrow'
}
</script>
