<template>
  <v-container>
    <session-list :items="items" />
  </v-container>
</template>

<script>
import SessionList from '~/components/sessions/SessionList.vue'

export default {
  components: {
    SessionList
  },
  data: () => ({
    items: [
      { header: 'Current Session' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Josh, Addie',
        subtitle: '24 total songs'
      },
      { header: 'Other Sessions' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Lespanish',
        subtitle: 'Addie, Josh, Memo, Dahyana, Karen'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Good Bois',
        subtitle: 'Addie, Irvin, Daniel'
      }
    ]
  })
}
</script>
