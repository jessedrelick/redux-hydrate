var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var entryFile = './src/browser'

// Standard development
//{ test: /\.css$/, loader: "style-loader!css-loader" },
let app = [
	'webpack-hot-middleware/client',
	entryFile
]

// If building assets for CDN, use ExtractTextPlugin to extract all CSS instead
if (process.env.NODE_ENV === 'production') {
	app = [
		entryFile
	]
}

let config = {
	devtool: 'eval',
	entry: {
		vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-saga', 'redux-hydration', 'window-or-global'],
		app
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: "/build/"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: "vendor", minChunks: Infinity}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new CleanWebpackPlugin(['build']),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: ['es2015', 'react']
				}
			}
		]
	}
}

if (process.env.NODE_ENV !== 'production') {
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config