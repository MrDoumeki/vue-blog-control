const path = require('path')
module.exports = {
  // 文件路径解析
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/common.less')]
    }
  },
  // 跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  publicPath: './'
}
