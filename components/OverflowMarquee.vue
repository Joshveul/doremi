<template>
  <div ref="marqueeParent" class="marquee-parent">
    <span ref="marqueeChild" class="marquee-child" :class="{'marquee': isOverflowing}">{{ text }}<span /></span>
  </div>
</template>

<script>
export default {
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
      this.isOverflowing = this.isTextOverflowing(this.$refs.overflow)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const availableSpace = document.body.clientWidth - 74 - 140 - 23 + 'px'
      this.$refs.marqueeParent.style.width = availableSpace
      this.$refs.marqueeChild.style.width = availableSpace
      this.isOverflowing = this.isTextOverflowing(this.$refs.marqueeChild)
    })
  },
  methods: {
    isTextOverflowing (element) {
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

<style>
.marquee-parent {
  overflow: hidden;
}

.marquee-child {
  display: inline-block;
  white-space: nowrap;
}

.marquee {
  animation-name: bounce;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes bounce {
  0% { transform: translateX(5%); }
  50% { transform: translateX(-200%); }
  100% { transform: translateX(5%); }
}

</style>
