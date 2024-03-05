<template>
  <v-list-item ripple @click="openSessionDialog">
    <v-list-item-avatar>
      <v-img :src="typeof item.avatar !== 'undefined' ? item.avatar : '/img/group.png'" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>Created by {{ typeof item.users !== 'undefined' ? item.users[0].name : '' }}</v-list-item-title>
      <v-list-item-subtitle>Started: {{ item.sessionStartDate }}</v-list-item-subtitle>
      <v-list-item-subtitle>Ended: {{ item.sessionEndDate !== null ? item.sessionEndDate : 'ongoing' }}</v-list-item-subtitle>
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
      this.$store.commit('setSelectedSession', this.session)
      this.$store.commit('setSelectedSessionOpen', true)
    }
  }
}
</script>
