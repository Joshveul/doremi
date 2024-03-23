<template>
  <v-app id="default">
    <v-app-bar app>
      <search-input class="flex-grow-1" />
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/settings">
            <v-list-item-title>App Settings</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <bottom-navigation />
    <div v-if="settings.includes('debug')" class="status-bar" :class="{ 'connected': connected }">
      {{ connectionStatusMessage }} {{ socketId }}
    </div>
    <song-options />
    <selected-session-dialog />
    <song-queue />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import BottomNavigation from '~/components/BottomNavigation.vue'
import SelectedSessionDialog from '~/components/sessions/SelectedSessionDialog.vue'
import SongOptions from '~/components/SongOptions.vue'
import SearchInput from '~/components/SearchInput.vue'
import SongQueue from '~/components/SongQueue.vue'

export default {
  name: 'NoPlayer',
  components: {
    BottomNavigation,
    SongOptions,
    SearchInput,
    SelectedSessionDialog,
    SongQueue
  },
  middleware: ['auth'],
  computed: {
    ...mapState(['connected', 'socketId', 'settings']),
    connectionStatusMessage () {
      return this.connected ? 'Connected' : 'Disconnected'
    }
  }
}
</script>

<style scoped>
.status-bar {
  /* height: 5px; */
  min-height: 5px;
  background-color: red;
  width: 100vw;
  z-index: 4;
  position: fixed;
  bottom: 0;
}

.connected {
  background-color: green;
}
</style>
