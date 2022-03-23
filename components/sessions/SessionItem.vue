<template>
  <v-list-item ripple @click="openSessionDialog">
    <v-list-item-avatar>
      <v-img :src="item.avatar" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          avatar: '',
          title: '',
          subtitle: ''
        }
      }
    }
  },
  methods: {
    openSessionDialog () {
      this.$store.commit('setSelectedSession', this.item)
      this.$store.commit('setSelectedSessionOpen', true)
    }
  }
}
</script>
