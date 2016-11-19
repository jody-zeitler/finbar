const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'react-hot-loader/patch',
		path.resolve(__dirname, 'src/index')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin()
	],
	target: 'web',
	devtool: 'eval-sourcemap',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 9000,
		inline: true,
		hot: true
	}
};
