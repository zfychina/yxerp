module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'store': '@/store',
        'views': '@/views',
        'network': '@/network',
        'utils': '@/utils',
      }
    },

  },
  publicPath: './'
}