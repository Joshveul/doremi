<template>
  <v-container>
    <v-list>
      <v-subheader>Account</v-subheader>

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="userData.avatar || '/img/listening.png'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="userData.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list nav>
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon>mdi-door</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { terminateCurrentSession } from '~/modules/utils'
export default {
  layout: 'default',
  data: () => ({
    terminateDialog: {
      value: false
    }
  }),
  computed: {
    ...mapState(['userData'])
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
