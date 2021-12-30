<script>
export default {
  name: 'MarqueeText',
  props: {
    duration: {
      type: Number,
      default: 0.5
    },
    repeat: {
      type: Number,
      default: 5,
      validator (val) {
        return val > 0
      }
    },
    paused: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    return h('div', { class: 'wrap' }, [
      h('div', {
        class: [
          this.paused
            ? 'paused'
            : undefined,
          'content'
        ]
      }, Array(this.repeat).fill(
        h('div', {
          class: 'text',
          style: {
            animationDuration: `${this.duration}s`,
            animationDirection: this.reverse
              ? 'reverse'
              : undefined
          }
        }, this.$slots.default)
      ))
    ])
  }
}
</script>

<style scoped>
.wrap {
  overflow: hidden;
}

.content {
  width: 100000px;
}

.text {
  animation-name: animation;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
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
