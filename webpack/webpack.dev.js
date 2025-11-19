const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    host: 'dev.xianqu.cn',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/admin': {
        target: 'http://43.142.101.81:8001',
        pathRewrite: {'^/admin' : '/admin'},
        changeOrigin: true
      },
    }
  },
});
