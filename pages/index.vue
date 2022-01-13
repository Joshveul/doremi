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
        title="Some of your favorites"
        :items="$store.state.ytSearchResults"
      />
      <ItemList
        title="From past sessions"
        :items="$store.state.ytSearchResults"
      />
      <ItemList
        title="Played in previous sessions with you"
        :items="$store.state.ytSearchResults"
      />
    </v-col>
  </v-row>
</template>

<script>
import ItemList from '~/components/ItemList.vue'

export default {
  components: {
    ItemList
  },
  layout: 'default',
  mounted () {
    this.socket = this.$nuxtSocket({
      name: 'main'
    })
    /* Listen for events: */
    console.log(this.socket)
    this.socket.on('connect', (msg, cb) => {
      console.log('connected' + msg)
    })
    this.socket
      .on('progress', (msg, cb) => {
        console.log(msg)
      })

      .on('mongoStream', (msg, cb) => {
        console.log('From mongo:', msg)
      })
    this.socket.emit('fn3', { id: 'abc123' })
  }
}
</script>
