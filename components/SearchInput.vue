<template>
  <v-form>
    <v-flex xs12>
      <v-autocomplete
        v-model="searchString"
        :disabled="isUpdating"
        :items="people"
        solo
        chips
        color="orange"
        label="Search"
        item-text="name"
        item-value="name"
        multiple
        clearable
        :append-icon-cb="helo"
        :open-on-click="false"
      >
        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-title>
              Search for your favorite
              <strong>Product</strong>
            </v-list-tile-title>
          </v-list-tile>
        </template>

        <template
          slot="selection"
          slot-scope="data"
        >
          <v-chip
            :selected="data.selected"
            close
            class="chip--select-multi"
            @input="data.parent.selectItem(data.item)"
          >
            <v-avatar>
              <img :src="data.item.avatar">
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template
          slot="item"
          slot-scope="data"
        >
          <!--                   <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template> -->
          <template>
            <v-list-tile-avatar :tile="data.item.group=='Products'" :size="data.item.group=='Products'?50:40">
              <img :src="data.item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name" />
              <v-list-tile-sub-title v-if="data.item.group=='Products'" v-html="data.item.seller" />
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>
    </v-flex>
  </v-form>
</template>

<script>
export default {
  data () {
    const srcs = {
      1: 'https://lorempixel.com/400/200/',
      2: 'https://lorempixel.com/400/200/',
      3: 'https://lorempixel.com/400/200/',
      4: 'https://lorempixel.com/400/200/',
      5: 'https://lorempixel.com/400/200/'
    }

    return {
      searchString: '',
      isUpdating: false,
      people: [
        { header: 'Sellers' },
        { name: 'Sandra Adams', group: 'Sellers', avatar: srcs[1] },
        { name: 'Willy Wonka', group: 'Sellers', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Sellers', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Sellers', avatar: srcs[2] },
        { divider: true },
        { header: 'Products' },
        { name: 'Remote V12X32', group: 'Products', seller: 'Arnold Systems', avatar: srcs[4] },
        { name: 'Crunchy tab', group: 'Products', seller: 'Willy Wonka', avatar: srcs[5] },
        { name: 'Love potion (potent)', group: 'Products', seller: 'Severus Snape', avatar: srcs[1] },
        { name: 'Mechanical Kitty', group: 'Products', seller: 'Me Me', avatar: srcs[3] }
      ],
      title: 'The summer breeze'
    }
  },

  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }
  },
  methods: {
    helo () {
      console.log(this.searchString)
    }
  }
}
</script>
