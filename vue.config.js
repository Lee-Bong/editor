const { NODE_ENV } = process.env;

const config = {
  productionSourceMap: false,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://47.94.138.247:9040',
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (NODE_ENV === 'production') {
  config.api = 'https://bfe.meiyou.com/we';
  config.baseUrl = 'https://static.seeyouyima.com/bfe/we/';
} else {
  config.api = 'https://test-bfe.meiyou.com/we';
}

module.exports = config;