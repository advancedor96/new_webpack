const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs-extra')


console.log('打包pro');

fs.removeSync('dist/public') 
fs.mkdir('dist/public', ()=>{})
fs.mkdir('dist/public/source', ()=>{})

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist/public'),
    },
    context: resolve(__dirname, 'public'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'          //-- post css 會加 css 修正
                ],
            },
            {
                test: /\.(png|gif|jpg|svg|eot|woff(2)?|ttf)?$/,
                use: 'url-loader?name=source/[name]-[hash].[ext]',
            }
        ]
    },
    plugins: [
		new webpack.optimize.UglifyJsPlugin({       // 把 打包檔 minify 的plugin
		beautify: false,
		mangle: {
				screw_ie8: true,
				keep_fnames: true
		},
		compress: {
				screw_ie8: true
		},
		comments: false
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.NamedModulesPlugin()
	]
}