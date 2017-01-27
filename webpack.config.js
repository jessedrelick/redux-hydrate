var path = require('path')
var webpack = require('webpack')
var HOST = 'http://locahost:3000'

module.exports = {
	devtool: 'eval',
	entry: {
		vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-saga'],
		app: [
			'babel-polyfill',
			// `webpack-dev-server/client?${HOST}`, // WebpackDevServer host and port
			// 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			'./example/browser'
		]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: HOST + '/build/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: "vendor", minChunks: Infinity}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						//'react-hmre'
					]
				}
			}
		]
	}
}

