const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json', 'scss'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: 'postcss-loader' },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: 'postcss-loader' },
                    { loader: "less-loader" }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    { loader: 'postcss-loader' },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,
                            outputPath: 'images',
                            name: '[name].[ext]',
                            publicPath: '../images'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 公用模块抽离
                common: {
                    chunks: 'async',
                    minSize: 0, // 大于0个字节
                    minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数
                },
                // 第三方库抽离
                vendor: {
                    priority: 1, // 权重
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0, // 大于0个字节
                    minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/index.hbs',
            filename: 'index.hbs'
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: '[name].css?v=[contenthash:8]'  // use contenthash *
        }),
    ],
    node: { 
        fs: 'empty' 
    }
};