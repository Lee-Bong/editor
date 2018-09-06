const { NODE_ENV } = process.env;

const config = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.94.138.247:9040',
        changeOrigin: true,
      },
    },
  },
};

if (NODE_ENV === 'production') {
  config.baseUrl = 'https://static.seeyouyima.com/bfe/we/'
}

module.exports = config;