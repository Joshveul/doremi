<template>
  <v-list-item v-if="showText" @click="isInFavorites ? removeFromFavorites() : addToFavorites()">
    <v-list-item-icon>
      <v-icon
        v-if="!processing"
        :color="isInFavorites ? 'red' : ''"
      >
        {{ isInFavorites ? 'mdi-heart' : 'mdi-heart-outline' }}
      </v-icon>
      <v-progress-circular
        v-if="processing"
        indeterminate
        color="primary"
      />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ buttonText }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-btn
    v-else
    icon
    class="ml-auto mt-2 mr-2"
    :disabled="processing"
    @click="isInFavorites ? removeFromFavorites() : addToFavorites()"
  >
    <v-icon
      v-if="!processing"
      :color="isInFavorites ? 'red' : ''"
    >
      {{ isInFavorites ? 'mdi-heart' : 'mdi-heart-outline' }}
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
    },
    showText: {
      type: Boolean,
      default: false
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
    },
    buttonText () {
      return this.isInFavorites ? 'Remove from favorites' : 'Add to favorites'
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
