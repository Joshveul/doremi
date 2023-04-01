import { initApp } from '~/modules/utils'

window.onNuxtReady((context) => {
  const userData = context.$cookies.get('user')
  if (userData || context.$router.currentRoute.name === 'player') {
    initApp(context)
  }
})
