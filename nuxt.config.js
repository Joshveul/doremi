import colors from 'vuetify/es5/util/colors'

const host = process.env.HOST

if (process.env.MODE === 'offline') {
  // eslint-disable-next-line no-console
  console.info('Development MODE is set to OFFLINE, conections to YouTube and MongoDB will be mocked')
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - doremi',
    title: 'doremi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/register-components.js' }
    { src: '~/plugins/vue-player.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-socket-io',
    'cookie-universal-nuxt',
    '~/modules/mongodb.js'
  ],
  io: {
    // module options
    sockets: [{
      name: 'main',
      default: true,
      path: '/',
      url: `http://${host}:3000/`
    }]
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  serverMiddleware: [
    {
      path: '/api/download',
      handler: '~/api/download.js'
    },
    {
      path: '/api/search',
      handler: '~/api/search.js'
    },
    {
      path: '/api/suggestions',
      handler: '~/api/suggestions.js'
    },
    {
      path: '/api/getSong',
      handler: '~/api/getSong.js'
    },
    {
      path: '/api/getUser',
      handler: '~/api/getUser.js'
    },
    {
      path: '/api/postUser',
      handler: '~/api/postUser.js'
    },
    {
      path: '/api/appState',
      handler: '~/api/appState.js'
    },
    {
      path: '/api/addFavorite',
      handler: '~/api/addFavorite.js'
    }
  ],
  server: {
    host // default: localhost
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
