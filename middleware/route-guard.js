export default function ({ app }) {
  app.router.beforeResolve((to, from, next) => {
    console.log(app.router)
    if (app.store.state.queueOpen) {
      app.store.commit('setQueueOpen', false)
      return false
    }
    next()
  })
}
