<template>
  <v-dialog
    v-model="isOpen"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card
      v-touch="{
        down: () => swipe()
      }"
    >
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="isOpen = !isOpen"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-scroll.self="onScroll"
      >
        <v-container>
          <h4>
            Singers
          </h4>
          <div class="d-flex flex-wrap">
            <v-chip
              v-for="user in selectedSession.users"
              :key="user._id"
              class="mx-1 mt-4 pa-2"
            >
              <v-img :src="user.avatar" height="22" width="22" class="mr-2" />
              {{ user.name }}
            </v-chip>
          </div>
        </v-container>
        <item-list title="Songs" :long-list="true" :items="items" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import ItemList from '~/components/ItemList.vue'

export default {
  components: { ItemList },
  props: {
    title: {
      type: String,
      default: 'Session Details'
    }
  },
  data () {
    return {
      scrollPosition: 0
    }
  },
  computed: {
    ...mapState({ selectedSession: 'selectedSession', selectedSessionOpen: 'selectedSessionOpen' }),
    isOpen: {
      set (newValue) {
        this.$store.commit('setSelectedSessionOpen', newValue)
      },
      get () { return this.selectedSessionOpen }
    },
    items () {
      return this.selectedSession.playlist
    }
  },
  methods: {
    swipe () {
      if (this.scrollPosition === 0) {
        this.isOpen = !this.isOpen
      }
    },
    onScroll (e) {
      this.scrollPosition = e.target.scrollTop
    }
  }
}
</script>
