<template>
  <v-container>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="userData.avatar" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userData.name }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-door</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' }
    ]
  }),
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    logout () {
      this.$cookies.remove('user')
      this.$router.push('welcome')
    }
  }
}
</script>
