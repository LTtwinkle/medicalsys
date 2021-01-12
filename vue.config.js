module.exports = {
  outputDir: 'dist',
  publicPath: './', // 设置打包文件相对路径
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   },
}