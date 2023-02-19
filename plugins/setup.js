import { initApp } from '~/modules/utils'

window.onNuxtReady((context) => {
  const userData = context.$cookies.get('user')
  if (userData) {
    initApp(context)
  }
})
