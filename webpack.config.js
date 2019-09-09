const path = require('path');

module.exports = {
	target: 'node',
	devtool: 'inline-source-map',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.ts', '.js', '.json' ]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: "commonjs2"
	}
};
