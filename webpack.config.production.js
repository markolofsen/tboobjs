const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker  = require('webpack-bundle-tracker');

const PUBLIC_URL = 'https://tenerifebook.com/';
// const PUBLIC_URL = 'http://127.0.0.1:8000/';
const PUBLIC_PATH = PUBLIC_URL+'media/reactjs/';

module.exports = {
	devtool: 'source-map',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.[hash].js',
		publicPath: PUBLIC_PATH,
	},
	resolve: {
		extensions: [
			'.js',
			'.json',
			'.jsx',
			'.scss',
			'.css',
			// '.svg'
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compressor: {
				screw_ie8: true,
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html'}),
		new ExtractTextPlugin({filename: 'index.[hash].css', allChunks: true}),
		new BundleTracker({filename: './dist/webpack-stats.json'})
	],
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader',
				// include: [path.join(__dirname, 'src/assets/'), path.join(__dirname, 'src/style/')]
				include: path.join(__dirname, 'src/assets/')
			}, {
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}, {
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
				// query: {
				//   cacheDirectory: true,
				//   presets: ['react', 'es2015']
				// }
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'})
			},
			// {
			// 	test: /\.css$/,
			// 	loader: 'style-loader!css-loader?module=true&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
			// 	exclude: /semantic/
			// },
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
		]
	}
};
