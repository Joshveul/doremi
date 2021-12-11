<template>
  <v-layout ref="overflow" class="marquee-overflow">
    <slot />
  </v-layout>
</template>

<script>
export default {

  mounted () {
    this.$nextTick(() => {
      const element = this.$refs.overflow

      if (this.isElementOverflowing(element)) {
        this.wrapContentsInMarquee(element)
      }
    })
  },
  methods: {
    isElementOverflowing (element) {
      const overflowX = element.offsetWidth < element.scrollWidth
      const overflowY = element.offsetHeight < element.scrollHeight

      return (overflowX || overflowY)
    },
    wrapContentsInMarquee (element) {
      const marquee = document.createElement('marquee')
      const contents = element.innerText

      marquee.innerText = contents
      element.innerHTML = ''
      element.appendChild(marquee)
    }
  }
}
</script>

<style scoped>
.marquee-overflow {
  white-space: nowrap;
  max-width: 15em;
  overflow: hidden;
}
</style>
