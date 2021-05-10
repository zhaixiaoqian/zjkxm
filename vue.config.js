const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
const name = 'zdk' // page title
const port = process.env.port || process.env.npm_config_port || 8088 // dev port
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://124.196.7.84:20001/mwm/api', // 代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                logLevel: 'debug', // 打印真实路径
                timeout: 5000, // 设置超时时间
                pathRewrite: {
                    '^/api': '' // 重写接口路径
                }
            }
        }
    },
}