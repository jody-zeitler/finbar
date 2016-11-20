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
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true
						}
					}
				]
			},
			{
				test: /\.ya?ml$/,
				exclude: /node_modules/,
				use: [
					'json-loader',
					'yaml-loader'
				]
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
