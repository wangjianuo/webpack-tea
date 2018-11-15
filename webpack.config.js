const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
    mode: 'development',
    resolve: {},
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9001,
        compress: true,// 服务器压缩
        open: true,// 自动打开浏览器
        // hot:true//热更新
    }
}


