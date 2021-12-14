<template>
  <autocomplete
    class="flex-grow-1"
    :search="search"
    placeholder="Search"
    aria-label="Search"
  >
    <template #result="{ result, props }">
      <li
        v-bind="props"
        class="autocomplete-result wiki-result"
      >
        <div class="wiki-title">
          {{ result.title }}
        </div>
        <div class="wiki-snippet">
          {{ result.artist }}
        </div>
      </li>
    </template>
  </autocomplete>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  components: { Autocomplete },
  data () {
    return {
      searchString: '',
      isUpdating: false,
      items: [
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#1F7087',
          sqThumb: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        }
      ]
    }
  },
  methods: {
    search (input) {
      if (input.length < 1) { return [] }
      return this.items.filter((item) => {
        return item.title.toLowerCase()
          .includes(input.toLowerCase())
      })
    }
  }
}
</script>
<style>
.autocomplete-input {
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  background-color: initial;
}

.autocomplete-input:focus,
.autocomplete-input[aria-expanded=true] {
  border-color: initial;
  background-color: initial;
  box-shadow: none;
}

.wiki-result {
  border-top: 1px solid #eee;
  padding: 16px;
  background: transparent;
}

.wiki-title {
  font-size: 20px;
  margin-bottom: 8px;
}

.wiki-snippet {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

.autocomplete .autocomplete-result-list {
  padding-left: 0;
}
</style>
