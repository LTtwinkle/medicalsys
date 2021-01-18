module.exports = {
  outputDir: 'dist',
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://172.20.10.5:3000', //对应自己的接口
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   },
}