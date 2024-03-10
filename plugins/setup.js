import { initApp } from '~/modules/utils'

window.onNuxtReady((context) => {
  const userData = context.$cookies.get('user')
  if (userData || context.$router.currentRoute.name === 'player') {
    initApp(context)
  }
  window.onpopstate = () => {
    context.$store.commit('setQueueOpen', false)
  }
  window.onbeforeunload = () => {
    return 'Are you sure you want to leave?'
  }
})
