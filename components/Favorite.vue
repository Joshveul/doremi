<template>
  <v-btn
    icon
    class="ml-auto mt-2 mr-2"
    @click="addToFavorites"
  >
    <v-icon>mdi-star-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    async addToFavorites (songId) {
      const favoriteReq = await fetch('/api/addFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: this.userData._id,
          songId
        })
      })
      if (favoriteReq.ok) {
        const result = await favoriteReq.json()
        console.log(result)
        return result
      }
    }
  }
}
</script>
