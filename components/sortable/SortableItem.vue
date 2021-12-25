<template>
  <slick-item
    :disabled="simple"
    :index="index"
  >
    <v-list-item
      :key="title"
      class="px-2"
    >
      <v-icon
        v-if="!simple"
        v-handle
        class="pr-1 handle"
      >
        mdi-drag-horizontal-variant
      </v-icon>
      <v-img :src="videoThumb" max-width="100" />
      <v-list-item-content class="ml-2 item-content">
        <v-list-item-title v-text="title" />
        <v-list-item-subtitle v-text="artist" />
        <v-list-item-subtitle v-text="`Added by: ${user}`" />
      </v-list-item-content>
      <v-icon
        v-if="!simple"
        class="mr-1"
        @click="remove = true"
      >
        mdi-playlist-remove
      </v-icon>
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
    title: {
      type: String,
      default: 'A very long song name'
    },
    artist: {
      type: String,
      default: 'Foster and the people'
    },
    user: {
      type: String,
      default: 'default user'
    },
    videoThumb: {
      type: String,
      default: 'https://i.ytimg.com/vi/3TgvznbMnHA/hq720_live.jpg?sqp=CJzH040G-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAftxCXOxJjJBMTWYGNjrg8eEJSLg'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      colors,
      remove: false
    }
  },
  computed: {
    lineClamp () {
      return this.simple ? 2 : 0
    }
  }
}
</script>

<style scoped>
.handle {
  height: 55px;
  width: 30px;
}
</style>
