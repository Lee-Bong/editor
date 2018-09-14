const { NODE_ENV } = process.env;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  baseUrl: NODE_ENV === 'production' ? 'https://static.seeyouyima.com/bfe/we/' : '/',
  productionSourceMap: false,
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin/, to: '/admin.html' },
        { from: /^\/view/, to: '/view.html' },
      ],
    },
    proxy: {
      '/api': {
        target: 'https://test-bfe.meiyou.com',
        changeOrigin: true,
      },
    },
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
      chunks: ['chunk-vendors', 'chunk-common', 'admin'],
    },
    view: {
      entry: 'src/pages/view/main.js',
      template: 'public/view.html',
      filename: 'view.html',
      chunks: ['chunk-vendors', 'chunk-common', 'view'],
    },
  },
};


module.exports = config;
