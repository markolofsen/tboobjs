const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const detect = require('detect-port');
const portfinder = require('portfinder');
var BundleTracker  = require('webpack-bundle-tracker');

const DEFAULT_PORT = 3000;
const PUBLIC_URL = 'https://tenerifebook.com/';
const PUBLIC_PATH = PUBLIC_URL;


const config = port => ({
	devtool: 'cheap-module-source-map',
	entry: {
		main: './src/index'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.[hash].js',
		// publicPath: 'http://localhost:3000/'
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
	// node: {
	//     fs: 'empty',
	//     net: 'empty',
	//     tls: 'empty',
	//     module: 'empty',
	// },
	devServer: {
		port,
		hot: true,
		historyApiFallback: true,
		stats: 'errors-only',
		clientLogLevel: 'error',
		// host: '0.0.0.0',
        // disableHostCheck: true,
		// publicPath: PUBLIC_PATH,
		inline: true,
		// stats: { colors: true },
		headers: { 'Access-Control-Allow-Origin': '*' },
		open: PUBLIC_URL
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html'}),
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
				use: ['style-loader?sourceMap', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass-loader']
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
});

module.exports = detect(DEFAULT_PORT).then(port => {
	if (port === DEFAULT_PORT) {
		return config(DEFAULT_PORT);
	}

	return portfinder.getPortPromise().then(port => config(port));
});
