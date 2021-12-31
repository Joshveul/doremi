<template>
  <v-text-field
    ref="searchBox"
    v-model="searchModel"
    class="flex-grow-1"
    placeholder="Search"
    aria-label="Search"
    clearable
    prepend-icon="mdi-magnify"
    solo
    flat
    hide-details
    background-color="transparent"
    type="search"
    @focus="navigateToSearch"
    @blur="unfocus"
    @keyup.enter="search"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  props: {
    focused: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchString: '',
      newSearchQuery: true
    }
  },
  computed: {
    ...mapState({ searchTerm: 'searchTerm' }),
    searchModel: {
      set (newValue) {
        this.$store.commit('setSearchTerm', newValue)
      },
      get () { return this.searchTerm }
    },
    inSearchPage () {
      return this.$router.currentRoute.name === 'search'
    }
  },
  watch: {
    searchModel (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.newSearchQuery = true
      }
    }
  },
  mounted () {
    if (this.inSearchPage) {
      this.$refs.searchBox.$el.querySelector('input').focus()
    }
  },
  methods: {
    navigateToSearch () {
      this.$emit('focus')
      if (this.$router.currentRoute.name !== 'search') {
        this.$router.push('/search')
      }
    },
    unfocus () {
      this.$emit('blur')
    },
    search () {
      if (this.newSearchQuery === true) {
        this.newSearchQuery = false
        this.$store.dispatch('searchYoutube', this.searchModel)
      }
      this.$el.querySelector('input[type="search"]').blur()
    },
    getResultValue (result) {
      return result.title
    },
    selected (result) {
      if (typeof result !== 'object') {
        return
      }
      this.$store.commit('setSelectedSong', result)
      this.$store.commit('setSongOptionsOpen', true)
    }
  }
}
</script>
