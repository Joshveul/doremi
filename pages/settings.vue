<template>
  <v-container>
    <v-list nav>
      <v-subheader>Account</v-subheader>

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="userData.avatar || '/img/listening.png'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="userData.name" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list flat subheader three-line>
      <v-subheader>Interface</v-subheader>

      <v-list-item-group v-model="settings" multiple active-class="">
        <v-list-item value="queueInNavigation">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Show Queue in bottom navigation</v-list-item-title>
              <v-list-item-subtitle>
                The queue will be available as an additional item in the bottom navigation
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item value="removeKaraokeSearch">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Search non-karaoke videos</v-list-item-title>
              <v-list-item-subtitle>
                Allow searching for videos without the keyword "karaoke" in it
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div v-if="userData.name.match(/(Irvin|Josh|Addie)/)">
      <v-divider />
      <v-list nav dense>
        <v-subheader>Advanced</v-subheader>
        <v-list-item @click="confirmTerminateSession()">
          <v-list-item-icon>
            <v-icon color="red">
              mdi-close-octagon
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>End Karaoke for the Day</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-dialog v-model="terminateDialog.value" max-width="600">
        <v-card>
          <v-toolbar class="text-h6" color="error" dark>
            End karaoke for the day?
          </v-toolbar>
          <v-card-text>
            <div class="pt-5 text-subtitle-1">
              Are you sure you want to terminate the current karaoke for everyone?
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="terminateSession()">
              Yes, we're done.
            </v-btn>
            <v-btn color="primary" @click="terminateDialog.value = false">
              No, we're still singing!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { terminateCurrentSession } from '~/modules/utils'
export default {
  layout: 'noPlayer',
  data: () => ({
    setCount: 0, // used to prevent settings from being set on first load and store an empty array
    terminateDialog: {
      value: false
    }
  }),
  computed: {
    ...mapState(['userData']),
    settings: {
      get () {
        return this.$store.state.settings
      },
      set (val) {
        if (this.setCount === 0) {
          this.setCount++
          return
        }
        this.$store.commit('setSettings', val)
        localStorage.setItem('settings', JSON.stringify(val))
      }
    }
  },
  mounted () {
    this.settings = this.settings || []
  },
  methods: {
    logout () {
      this.$cookies.remove('user')
      this.$router.push('welcome')
    },
    confirmTerminateSession () {
      this.terminateDialog.value = true
    },
    async terminateSession () {
      if (await terminateCurrentSession(this.userData._id)) {
        this.terminateDialog.value = false
        this.logout()
      }
    }
  }
}
</script>
