module.exports = {
  outputDir: 'dist',
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://10.20.176.197:3000', //对应自己的接口
        target: 'http://10.20.167.172:3000', //对应自己的接口
        // target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   },
}