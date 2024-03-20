<template>
  <v-container>
    <session-list :items="items" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SessionList from '~/components/sessions/SessionList.vue'

export default {
  components: {
    SessionList
  },
  computed: {
    ...mapState(['sessions']),
    items () {
      return [
        { header: 'Past Karaoke Nights' },
        ...this.previousSessions
      ]
    },
    currentSession () {
      return this.sessions.find(session => session.sessionEndDate === null) || { title: 'No current session' }
    },
    previousSessions () {
      return this.sessions.filter(session => session.sessionEndDate !== null)
    }
  }
}
</script>
