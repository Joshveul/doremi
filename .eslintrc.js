module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    quotes: ['error', 'single'],
    // we use 2 spaces to indent our code
    indent: [1, 2, { SwitchCase: 1 }],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error']
  }
}
