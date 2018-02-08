const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const api = require('./api');

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|json|png|svg)$/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            title: 'Vue Template',
            appMountId: 'app'
        })
    ],
    devServer: {
        disableHostCheck: true
    }
};

module.exports = config;
