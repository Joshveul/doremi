<template>
  <slick-item :disabled="simple" :index="index">
    <v-list-item :key="item.title" class="px-2">
      <v-icon v-if="!simple" v-handle class="pr-1 handle">
        mdi-drag-horizontal-variant
      </v-icon>
      <v-img :src="thumbnail" max-width="100" />
      <v-list-item-content class="ml-2 item-content">
        <v-list-item-title>{{ item.title }}{{ item.playing ? ' (playing)' : '' }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.artist }}</v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-icon size="15">
            mdi-timer-outline
          </v-icon>
          <span>
            {{ item.duration }}
          </span>
          <!-- <v-icon size="15" :class="addedBy === 'Addie' ? 'blue--text text--lighten-2' : ''"> -->
          <v-icon size="15">
            mdi-account
          </v-icon>
          {{ addedBy }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-icon v-if="!simple" class="mr-1" @click="removeDialogOpen = true">
        mdi-playlist-remove
      </v-icon>
      <v-overlay transition="scroll-x-transition" :absolute="true" :opacity=".8" :value="processing">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center pb-0" cols="12" style="color: peachpuff;">
            {{ processingText }}
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-progress-linear v-model="downloadProgress" color="blue lighten-2" rounded height="6" />
          </v-col>
        </v-row>
      </v-overlay>
    </v-list-item>
    <v-dialog v-model="removeDialogOpen" max-width="290">
      <v-card>
        <v-card-title class="text-h6">
          Confirm
        </v-card-title>
        <v-card-text>Do you want to remove this song from the queue?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="removeDialogOpen = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="removeFromQueue">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </slick-item>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import { SlickItem, HandleDirective } from 'vue-slicksort'
export default {
  components: {
    SlickItem
  },
  directives: {
    handle: HandleDirective
  },
  props: {
    simple: {
      type: Boolean
    },
    divider: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      colors,
      removeDialogOpen: false
    }
  },
  computed: {
    lineClamp () {
      return this.simple ? 2 : 0
    },
    thumbnail () {
      return decodeURIComponent(this.item.thumbnail)
    },
    downloading () {
      return this.item.downloading
    },
    encoding () {
      return this.item.encoding
    },
    processing () {
      return false
      // return this.item.processing
    },
    downloadProgress () {
      return this.item.processingProgress
    },
    addedBy () {
      if (typeof this.item.username !== 'undefined') {
        return this.item.username.name
      }
      return 'Loading...'
    },
    processingText () {
      if (this.item.downloading) {
        return 'Downloading...'
      }
      if (this.item.encoding) {
        return 'Encoding...'
      }
      return 'Preparing...'
    }
  },
  methods: {
    removeFromQueue () {
      this.$store.dispatch('removeFromQueue', { item: this.item, index: this.index })
      this.removeDialogOpen = false
    }
  }
}
</script>

<style scoped>
.handle {
  height: 55px;
  width: 30px;
  z-index: 6;
}
</style>
