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
    resolve: {}
}