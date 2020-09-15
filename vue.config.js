const port = 9529 // dev port
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    publicPath:'/',
    outputDir:'dist',
    assetsDir:'assets',
    lintOnSave:false,
    productionSourceMap:false,
    devServer: {
        port: port,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        proxy: {
          [process.env.VUE_APP_BASE_API]: {
            target:"http://localhost:3004/api",
            changeOrigin: true,
            pathRewrite: {
              ['^' + process.env.VUE_APP_BASE_API]: ''
            }
          },
        },
    }, 

      configureWebpack: {
        name: '迁移科技',
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
      },

      chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
          item
            .use('sass-resources-loader')
            .loader('sass-resources-loader')
            .options({
              resources: [ './src/styles/index.scss']
            })
            .end()
        })

        config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()

      }
  }