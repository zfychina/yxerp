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
  publicPath: './',
  devServer: {
    host:'localhost',
    port:8081,
    https:false,
    open:false,
  },

}
