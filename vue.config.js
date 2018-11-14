const { NODE_ENV } = process.env;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  baseUrl: NODE_ENV === 'production' ? 'https://static.seeyouyima.com/bfe/we/' : '/we',
  productionSourceMap: false,
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/we\/admin/, to: '/we/admin.html' },
        { from: /^\/we\/view/, to: '/we/view.html' },
      ],
    },
    // proxy: {
    //   '/gaApi': {
    //     target: 'https://test-ga.seeyouyima.com',
    //     changeOrigin: true,
    //     // secure: false,
    //   },
    // },
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
    ],
  },
  pages: {
    admin: {
      entry: 'src/pages/admin/main.js',
      template: 'public/admin.html',
      filename: 'admin.html',
      chunks: ['chunk-vendors', 'chunk-admin-vendors', 'chunk-common', 'admin'],
    },
    view: {
      entry: 'src/pages/view/main.js',
      template: 'public/view.html',
      filename: 'view.html',
      chunks: ['chunk-vendors', 'chunk-view-vendors', 'chunk-common', 'view'],
    },
  },

  chainWebpack: (cfg) => {
    const options = module.exports;
    const { pages } = options;
    const pageKeys = Object.keys(pages);

    // Long-term caching

    const IS_VENDOR = /[\\/]node_modules[\\/]/;

    cfg.optimization
      .splitChunks({
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            priority: -10,
            chunks: 'initial',
            minChunks: 2,
            test: IS_VENDOR,
            enforce: true,
          },
          ...pageKeys.map(key => ({
            name: `chunk-${key}-vendors`,
            priority: -11,
            chunks: chunk => chunk.name === key,
            test: IS_VENDOR,
            enforce: true,
          })),
          common: {
            name: 'chunk-common',
            priority: -20,
            chunks: 'initial',
            minChunks: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      });
  },
};


module.exports = config;
