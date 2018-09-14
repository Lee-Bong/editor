const { NODE_ENV } = process.env;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  baseUrl: NODE_ENV === 'production' ? 'https://static.seeyouyima.com/bfe/we/' : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://test-bfe.meiyou.com',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
};

module.exports = config;
