const cdnPath = 'https://bfe.meiyou.com/we/';
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
    baseUrl: 'https://static.seeyouyima.com/bfe/we/',
};