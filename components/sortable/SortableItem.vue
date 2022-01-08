<template>
  <slick-item
    :disabled="simple"
    :index="index"
  >
    <v-list-item
      :key="item.title"
      class="px-2"
    >
      <v-icon
        v-if="!simple"
        v-handle
        class="pr-1 handle"
      >
        mdi-drag-horizontal-variant
      </v-icon>
      <v-img :src="thumbnail" max-width="100" />
      <v-list-item-content class="ml-2 item-content">
        <v-list-item-title v-text="item.title" />
        <v-list-item-subtitle v-text="item.artist" />
        <v-list-item-subtitle v-text="`Added by: ${item.user}`" />
      </v-list-item-content>
      <v-icon
        v-if="!simple"
        class="mr-1"
        @click="remove = true"
      >
        mdi-playlist-remove
      </v-icon>
      <v-overlay
        transition="scroll-x-transition"
        :absolute="true"
        :opacity=".8"
        :value="localData.downloading"
      >
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center pb-0"
            cols="12"
          >
            Downloading...
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
          >
            <v-progress-linear
              color="blue lighten-2"
              indeterminate
              rounded
              height="6"
            />
          </v-col>
        </v-row>
      </v-overlay>
    </v-list-item>
    <v-dialog
      v-model="remove"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h6">
          Confirm
        </v-card-title>
        <v-card-text>Do you want to remove this song from the queue?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="remove = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="remove = false"
          >
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
      remove: false,
      localData: this.item
    }
  },
  computed: {
    lineClamp () {
      return this.simple ? 2 : 0
    },
    thumbnail () {
      return decodeURIComponent(this.item.thumbnail)
    },
    isDownloading () {
      return this.localData.downloading
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
