export default function (context) {
  // Add the userAgent property to the context
  const userData = context.app.$cookies.get('user')
  if (!userData) {
    return context.redirect('/welcome')
  } else {
    context.store.commit('setUser', userData)
  }
}
