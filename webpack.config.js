var webpack = require("webpack");
var path = require("path");
module.exports = {
	context: __dirname,
	entry: {
        "app": "./app/app.js",
        "index": "./index/index.js"
    },
	output: {
		path: path.join(__dirname, "assets"),
		publicPath: "assets/", // relative path for github pages
		filename: "[name].js", // no hash in main.js because index.html is a static page
		chunkFilename: "[hash]/js/[id].js"
	},
	recordsOutputPath: path.join(__dirname, "records.json"),
	module: {
		loaders: [
			{ test: /\.json$/,   loader: "json-loader" },
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.css$/,    loader: "style-loader!css-loader" },
			{ test: /\.less$/,   loader: "style-loader!css-loader!less-loader" },
			{ test: /\.jade$/,   loader: "jade-loader?self" },
			{ test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },
		],
		preLoaders: [
			{
				test: /\.js$/,
				include: pathToRegExp(path.join(__dirname, "app")),
				loader: "jshint-loader"
			}
		]
	},
	resolve: {
		fallback: path.join(__dirname, "bower_components")
	},
	amd: { jQuery: true },
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 })
	],
	fakeUpdateVersion: 0
};
function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }
