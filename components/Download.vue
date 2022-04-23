<template>
  <v-btn
    icon
    class="ml-auto mt-2 mr-2"
    @click="validateAndAdd()"
  >
    <v-icon>mdi-download</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'
import { downloadVideo } from '~/modules/utils'
export default {
  props: {
    songId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    validateAndAdd () {
      this.addToFavorites(this.songId)
    },
    triggerDownload (songId) {

    }
  }
}
</script>
