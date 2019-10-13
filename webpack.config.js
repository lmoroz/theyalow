const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: { player: './src/player.js' },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build/'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        watchContentBase: true,
        compress: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: './assets',
            },
            {
                from: './src/demo-mobile.html',
                to: './demo-mobile.html',
            },
            {
                from: './src/demo-default.html',
                to: './demo-default.html',
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            }
        ],
    },
};
