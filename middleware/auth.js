export default function (context) {
  // Add the userAgent property to the context
  if (!context.app.$cookies.get('username')) {
    return context.redirect('/welcome')
  }
}
