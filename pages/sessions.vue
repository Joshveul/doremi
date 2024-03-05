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
        avatar: '/img/group.png',
        title: 'Josh, Addie',
        subtitle: '24 total songs'
      },
      { header: 'Other Sessions' },
      {
        avatar: '/img/group.png',
        title: 'Lespanish',
        subtitle: 'Addie, Josh, Memo, Dahyana, Karen'
      },
      { divider: true, inset: true },
      {
        avatar: '/img/group.png',
        title: 'Good Bois',
        subtitle: 'Addie, Irvin, Daniel'
      }
    ]
  })
}
</script>
