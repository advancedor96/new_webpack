const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');
console.log('打包dev');

fs.removeSync('dist/public') 
fs.mkdir('dist/public', ()=>{})
fs.mkdir('dist/public/source', ()=>{})

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:9487',
        'webpack/hot/only-dev-server', //-- react 的 hotreload
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist/public'),
    },
    context: resolve(__dirname, 'public'),
    devServer: {
        port: 9487,
        host: '0.0.0.0',
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/public',
        hot: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            // },  
            {
                test: /\.(js|jsx)$/, 
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'          //-- post css 會加 css 修正
                ],
            },
            {
                test: /\.scss$/, //-- 可以直接用scss... 但不知道跟 css 另外打包的 plugin 會不會衝到，要再研究，先不用
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|gif|jpg|svg|eot|woff(2)?|ttf)?$/,
                use: 'url-loader?name=source/[name]-[hash].[ext]',
            }
        ],
    },
    plugins: [    
      new webpack.HotModuleReplacementPlugin(), //-- react 的 hotreload plugin
      new webpack.NamedModulesPlugin()
    ],
}
