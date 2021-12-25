<template>
  <div
    ref="marqueeParent"
    class="marquee-parent"
  >
    <div
      v-show="!isOverflowing"
      ref="marqueeChild"
      class="marquee-child"
    >
      {{ text }}
    </div>
    <dynamic-marquee
      v-show="isOverflowing"
      class="marquee-child"
      direction="row"
      reverse
      :speed="{type: 'pps', number: 40}"
      style="height: 20px;"
      :repeat="false"
    >
      {{ text }}
    </dynamic-marquee>
  </div>
</template>

<script>
import DynamicMarquee from 'vue-dynamic-marquee'

export default {
  components: { DynamicMarquee },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOverflowing: false
    }
  },
  watch: {
    text () {
      this.isOverflowing = this.isTextOverflowing(this.$refs.marqueeChild)
    }
  },
  mounted () {
    const availableSpace = document.body.clientWidth - 74 - 140 - 23 + 'px'
    this.$refs.marqueeParent.style.width = availableSpace
    this.$refs.marqueeChild.style.width = availableSpace
    this.isTextOverflowing(this.$refs.marqueeChild)
  },
  methods: {
    isTextOverflowing (element) {
      setTimeout(() => {
        const overflowX = element.offsetWidth < element.scrollWidth
        const overflowY = element.offsetHeight < element.scrollHeight
        this.isOverflowing = (overflowX || overflowY)
      }, 100)
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

<style>
.marquee-parent {
  overflow: hidden;
}

.marquee-child {
  display: inline-block;
  white-space: nowrap;
}
</style>
