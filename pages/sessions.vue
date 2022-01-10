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
        title: 'Josh',
        subtitle: '<span class="text--primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: '<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
      }
    ]
  })
}
</script>
