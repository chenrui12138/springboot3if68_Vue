// var webpack = require('webpack');
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
function publicPath(){
    if (process.env.NODE_ENV == 'production') {
        return "././";
    } else {
        return "/";
    }
}
// vue.config.js
module.exports = {
    // publicPath:"././",
    publicPath: publicPath(),
    // 国际化配置 使用其它语言，默认情况下中文语言包依旧是被引入的
    configureWebpack: {
        // plugins: [
        //     new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
        // ]
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
lintOnSave: false,
    devServer: {
        //指定使用一个 host。 localhost，
        host: "0.0.0.0",
        //指定端口
        port: 8080,
        // 开启热更新
        hot: true,
        // 是否开启https模式
        https: false,
        // 请求代理服务器
        proxy: {
            //带上api前缀的
            '/springboot3if68': {
                //代理目标地址
                target: 'http://localhost:8081/springboot3if68/',
                changeOrigin: true,
                secure: false,
                // 在发出请求后将/api替换为''空值，这样不影响接口请求
                pathRewrite: {
                    '^/springboot3if68': ''
                }
            }
        }
    },
chainWebpack(config) {
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
