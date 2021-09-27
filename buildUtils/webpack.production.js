const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	output: {
		filename: 'bundle.main.[contenthash:8].js',
		chunkFilename: 'bundle.[name].[contenthash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				include: /(src)/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
			},
		],
	},
	plugins: [
		new ProgressBarPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				aggrid: {
					test: /[\\/]node_modules[\\/](@ag-grid.*)[\\/]/,
					name: 'aggrid',
					chunks: 'all',
				},
				acejs: {
					test: /[\\/]node_modules[\\/](brace.*)(react-ace)(ace-builds)[\\/]/,
					name: 'acejs',
					chunks: 'all',
				},
				commons: {
					test: /[\\/]node_modules[\\/](!brace.*)(!react-ace)(!ace-builds)(!@ag-grid.*)[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
