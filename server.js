import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config'
import Express from 'express'

const app = new Express()
const PORT = 3000

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	//hot: true,
	historyApiFallback: true
}).listen(PORT, 'localhost', (err, result) => {
	if (err) {
		return console.log(err)
	}
	console.log(`Hosting site at localhost:${PORT}`)
})
