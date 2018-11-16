const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PUBLIC_PATH = '/';


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        // publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader'
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: 'url-loader',
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                },
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
        }),
        new ExtractTextWebpackPlugin('css/index.css'),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'template'),//静态资源目录源地址
            to: path.resolve(__dirname, 'dist') //目标地址，相对于output的path目录
        }]),
    ],
    mode: 'development',
    resolve: {},
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 9001,
        compress: true,
        open: true
    },
    devtool: 'eval-source-map'
}


