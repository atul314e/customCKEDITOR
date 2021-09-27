const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { InjectManifest } = require('workbox-webpack-plugin');

const modeConfig = (mode) => require(`./buildUtils/webpack.${mode}`);

const getIncludeDirs = () => [path.join(__dirname, 'src')];

const getPlugins = (analyze) => {
	const plugins = [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: ['favicon', 'svg'].map((file) => ({
				from: path.join(__dirname, `public/${file}`),
				to: path.join(__dirname, `dist/${file}`),
			})),
		}),
		// ___ANTD___ specific
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es-us/),
		new InjectManifest({
			swSrc: './src/service-worker.js',
			swDest: 'service-worker.js',
			dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
			exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
			// Bump up the default maximum size (2mb) that's precached,
			// to make lazy-loading failure scenarios less likely.
			// See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
			maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
		}),
	];

	if (analyze) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
};

module.exports = (props) => {
	let mode = 'production';
	if (props?.development) {
		mode = 'development';
	}

	return merge(
		{
			entry: path.join(__dirname, 'src/components/index.tsx'),
			output: {
				path: path.join(__dirname, '/dist'),
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						include: getIncludeDirs(),
						exclude: /(node_modules)/,
						loader: 'babel-loader',
					},
					{
						test: /\.(svg|jpg|gif)$/,
						exclude: /(node_modules)/,
						use: 'file-loader',
					},
					{
						test: /\.svg$/,
						include: /(node_modules)/,
						use: [
							{
								loader: 'svg-url-loader',
								options: {
									limit: 10000,
								},
							},
						],
					},
					{
						test: /\.(ts|tsx)$/,
						include: getIncludeDirs(),
						loader: 'ts-loader',
					},
					{
						test: /\.(png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
						use: 'url-loader?limit=100000',
					},
				],
			},
			plugins: getPlugins(props.analyze),
			resolve: {
				alias: {
					assets: path.resolve(__dirname, 'src/assets/'),
					pages: path.resolve(__dirname, 'src/pages/'),
					components: path.resolve(__dirname, 'src/components/'),
					hooks: path.resolve(__dirname, 'src/hooks/'),
					lib: path.resolve(__dirname, 'src/lib/'),
					styles: path.resolve(__dirname, 'src/styles/'),
					utils: path.resolve(__dirname, 'src/utils/'),
					logics: path.resolve(__dirname, 'src/logics/'),
					actions: path.resolve(__dirname, 'src/actions/'),
					client: path.resolve(__dirname, 'src/client/'),
					configs: path.resolve(__dirname, 'src/configs/'),
					store: path.resolve(__dirname, 'src/store/'),
					constants: path.resolve(__dirname, 'src/constants/'),
				},
				extensions: ['.tsx', '.ts', '.js', '.json', '.svg'],
			},
			target: 'web',
		},
		modeConfig(mode),
	);
};
