<template>
  <div>
    <span class="subtitle-1">Archive</span>
    <v-divider class="my-1 pb-4" />
    <div v-if="previousSessions.length === 0">
      <p class="text-center">
        The archive is empty
      </p>
      <h5 class="text-center">
        Seems like tonight is the first night!
      </h5>
    </div>
    <session-list v-else :items="items" />
  </div>
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
