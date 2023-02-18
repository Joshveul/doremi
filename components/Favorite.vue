<template>
  <v-btn
    icon
    class="ml-auto mt-2 mr-2"
    :disabled="processing"
    @click="isInFavorites ? removeFromFavorites() : addToFavorites()"
  >
    <v-icon
      v-if="!processing"
      :color="isInFavorites ? 'amber' : ''"
    >
      {{ isInFavorites ? 'mdi-star' : 'mdi-star-outline' }}
    </v-icon>
    <v-progress-circular
      v-if="processing"
      indeterminate
      color="primary"
    />
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    songId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      processing: false
    }
  },
  computed: {
    ...mapState(['userFavorites']),
    isInFavorites () {
      return this.userFavorites.includes(this.songId)
    }
  },
  methods: {
    async addToFavorites () {
      this.processing = true
      await this.$store.dispatch('addSongToFavorites', this.songId)
      this.processing = false
    },
    async removeFromFavorites () {
      this.processing = true
      await this.$store.dispatch('removeSongFromFavorites', this.songId)
      this.processing = false
    }
  }
}
</script>
