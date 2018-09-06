module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.94.138.247:9040',
        changeOrigin: true,
      },
    },
  },
  // build的时候开启
  // baseUrl: 'https://static.seeyouyima.com/bfe/we/',
};
