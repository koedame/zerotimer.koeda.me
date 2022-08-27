export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ゼロ秒思考タイマー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'ゼロ秒思考に特化したタイマーです。1分経過ごとに音で知らせてくれるので集中してゼロ秒思考術に取り組むことが可能です。',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'ゼロ秒思考タイマー',
      lang: 'ja',
      icons: ['pwa-192x192.png', 'pwa-512x512.png', 'apple-touch-icon-180x180.png'],
    },

    icon: {
      iconFileName: 'icon.png',
    },
    meta: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      name: 'ゼロ秒思考タイマー',
    },

    // workbox options
    // Doc: https://pwa.nuxtjs.org/modules/workbox.html#options
    workbox: {
      // 開発環境で挙動を確認したい場合は有効にする
      // dev: (environment == 'development'),
      // オフラインですべての機能が動くのでtrue
      offline: true,
      // なんとなくtrue
      skipWaiting: true,
      // なんとなくtrue
      clientsClaim: true,
      // 不要
      // offlinePage: '/offline.html'
      // オフラインで動くが、最新版が反映されやすくするためNetworkFirstを設定
      offlineStrategy: 'NetworkFirst',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
