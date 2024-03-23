<template>
  <div>
    <span class="subtitle-1">Favorites</span>
    <v-divider class="my-1" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <song-list :items="userFavorites" source="stored" />
        <div v-if="userFavorites.length === 0">
          <p class="text-center">
            Who turned off the mic?
          </p>
          <h5 class="text-center">
            Your favorite songs list is empty!
          </h5>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SongList from '~/components/SongList.vue'

export default {
  components: {
    SongList
  },
  computed: {
    ...mapGetters({ userFavorites: 'getFavoritesList' })
  }
}
</script>
