<template>
  <v-list three-line>
    <template v-for="(item, index) in items">
      <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />

      <v-divider v-else-if="item.divider" :key="index" :inset="item.inset" />

      <session-item v-else :key="item.title" :item="item" />
    </template>
  </v-list>
</template>

<script>
import SessionItem from '~/components/sessions/SessionItem.vue'

export default {
  components: { SessionItem },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
