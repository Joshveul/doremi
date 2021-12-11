<template>
  <v-layout column justify-center align-center>
    <v-app-bar
      app
    >
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Doremi</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-flex xs12 sm8 md6>
      <SearchInput />
    </v-flex>
  </v-layout>
</template>

<script>
import SearchInput from '~/components/SearchInput.vue'

export default {
  components: {
    SearchInput
  },
  layout: 'backArrow',
  transition: 'slide'
}
</script>
