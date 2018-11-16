const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: 'url-loader',
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    mode: 'development',
    resolve: {},
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9001,
        compress: true,
        open: true
    }
}


