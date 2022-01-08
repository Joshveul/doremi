<script>
export default {
  name: 'MarqueeText',
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 100
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      paused: true,
      repeat: 1
    }
  },
  computed: {
    duration () {
      if (this.paused) {
        return 0
      }
      return 150
    }
  },
  watch: {
    text () {
      this.repeat = 1
      this.paused = true
      const textEl = this.$el.querySelector('.text')
      textEl.classList.remove('text')
      this.calculateValues()
      textEl.classList.add('text')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calculateValues()
    })
  },
  methods: {
    calculateValues () {
      setTimeout(() => {
        const wrapper = this.$el.querySelector('.content')
        if (wrapper.offsetWidth < wrapper.scrollWidth) {
          this.repeat = 20
          this.paused = false
        } else {
          this.paused = true
        }
      }, 100)
    }
  },
  render (h) {
    return h('div', { class: 'wrap', style: `maxWidth: ${this.maxWidth + 21}px` }, [
      h('div', {
        class: [
          this.paused
            ? 'paused'
            : undefined,
          'content'
        ],
        style: `width: ${this.maxWidth}px`
      }, [
        h('div', {
          class: 'text',
          style: {
            animationDuration: `${this.duration}s`,
            animationDirection: this.reverse
              ? 'reverse'
              : undefined
          }
        }, (this.text + '⠀').repeat(this.repeat))
      ])
    ])
  }
}
</script>

<style scoped>
.wrap {
  overflow: hidden;
}

.text {
  animation-name: animation;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  white-space: nowrap;
  float: left;
}

.paused .text {
  animation-play-state: paused;
}

@keyframes animation {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
