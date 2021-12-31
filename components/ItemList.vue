<template>
  <v-container>
    <h4 v-if="title !== ''">
      {{ title }}
    </h4>
    <hooper style="height: auto;" :items-to-show="1.1">
      <slide v-for="(e, i) in splitItems" :key="i">
        <song-list :items="e" />
      </slide>
    </hooper>
  </v-container>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import SongList from '~/components/SongList.vue'
import 'hooper/dist/hooper.css'

export default {
  components: {
    Hooper,
    Slide,
    SongList
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return [{ videoId: 'BP7ji1dQ-lA', title: 'WHEN WE WERE YOUNG - Adele (KARAOKE PIANO VERSION)', artist: 'WHEN WE WERE YOUNG - Adele (KARAOKE PIANO VERSION)', thumbnails: [{ url: 'https://i.ytimg.com/vi/BP7ji1dQ-lA/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBqQf3TRLZMykoCqnIHWy7BSi0yrA', width: 480, height: 270 }], channel: 'CoversPH', duration: '5:14' }, { videoId: 'l3iEnBThkIc', title: 'All I Want For Christmas Is You - Mariah Carey (Karaoke Songs With Lyrics - Original Key)', artist: 'All I Want For Christmas Is You - Mariah Carey (Karaoke Songs With Lyrics - Original Key)', thumbnails: [{ url: 'https://i.ytimg.com/vi/l3iEnBThkIc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA0DJrDcxzN6nJEGlKFTJzrO3xONw', width: 360, height: 202 }, { url: 'https://i.ytimg.com/vi/l3iEnBThkIc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAKkzFamW5PHu8c8WSknPw_pi6TcQ', width: 720, height: 404 }], channel: 'Musisi Karaoke', duration: '4:32' }, { videoId: 'B3O1OlTWXSA', title: 'Rolling in The Deep - Adele (Karaoke Songs With Lyrics - Original Key)', artist: 'Rolling in The Deep - Adele (Karaoke Songs With Lyrics - Original Key)', thumbnails: [{ url: 'https://i.ytimg.com/vi/B3O1OlTWXSA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCQlxiJ3tFB-1J16jv6iqmPqEAGDw', width: 360, height: 202 }, { url: 'https://i.ytimg.com/vi/B3O1OlTWXSA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCdqG_7BzZ1qG2zgfs7rBQJvp6hUw', width: 720, height: 404 }], channel: 'Musisi Karaoke', duration: '4:22' }, { videoId: 'M7Qg5H0luo0', title: 'Easy On Me - Adele (Karaoke Songs With Lyrics - Original Key)', artist: 'Easy On Me - Adele (Karaoke Songs With Lyrics - Original Key)', thumbnails: [{ url: 'https://i.ytimg.com/vi/M7Qg5H0luo0/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLActPy255Jzh8IR3HODEkJAByf3dw', width: 360, height: 202 }, { url: 'https://i.ytimg.com/vi/M7Qg5H0luo0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD9roMMXijsjKlZMbk6R5Ya8p9fNw', width: 720, height: 404 }], channel: 'Musisi Karaoke', duration: '5:06' }, { videoId: 'ogdzXS1cJV0', title: 'Nena â€¢ 99 Luftballons â€¢ Karaoke', artist: 'Nena â€¢ 99 Luftballons â€¢ Karaoke', thumbnails: [{ url: 'https://i.ytimg.com/vi/ogdzXS1cJV0/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDh8U_tgzaPd_BA8VQlwJc5nLhOfA', width: 480, height: 270 }], channel: 'Lugn', duration: '4:04' }, { videoId: 'ifCAfAzOBJM', title: 'Let It Go (Idina Menzel)', artist: 'Frozen', thumbnails: [{ url: 'https://i.ytimg.com/vi/ifCAfAzOBJM/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLChjceM5R_QQ2Br6GxDXIyCDJXJzQ', width: 360, height: 202 }, { url: 'https://i.ytimg.com/vi/ifCAfAzOBJM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCyb2e3dq2z1XPyIkT0FIrJE62qeQ', width: 720, height: 404 }], channel: 'Sing King', duration: '3:59' }, { videoId: 'QjvzCTqkBDQ', title: 'Paul McCartney Carpool Karaoke', artist: 'Paul McCartney Carpool Karaoke', thumbnails: [{ url: 'https://i.ytimg.com/vi/QjvzCTqkBDQ/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDi2R41K5nyxQbJeUGTOxl9z20RaA', width: 480, height: 270 }], channel: 'The Late Late Show with James Corden', duration: '23:43' }]
      }
    },
    listSize: {
      type: Number,
      default: 3
    }
  },
  computed: {
    splitItems () {
      const result = this.items.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / this.listSize)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])
      return result
    }
  }
}
</script>

<style>
.hooper-track {
  padding-left: 0 !important;
}
</style>
