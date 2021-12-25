import Vue from 'vue'
import TextMarquee from 'vue-text-marquee'

const components = {
  TextMarquee
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
