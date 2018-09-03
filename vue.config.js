module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://test-bfe.meiyou.com',
        changeOrigin: true,
      },
    },
  },
};
