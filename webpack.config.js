const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const api = require('./api');

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
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
                        loader: 'babel-loader',
                        options: { presets: ['es2015'] }
                    }
                ]
            },
            {
                test: /\.(jpg|json|png)$/,
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
            appMountId: 'app',
            headHtmlSnippet: `
                <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
                <script src="https://rawgit.com/feiss/aframe-environment-component/master/dist/aframe-environment-component.min.js"></script>
            `
        })
    ],
    devServer: {
        // setup: app => {
        //     api(app);
        // }
    }
};

module.exports = config;
