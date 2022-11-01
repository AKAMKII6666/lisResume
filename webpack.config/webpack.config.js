const path = require("path");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const threadLoader = require("thread-loader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin");

threadLoader.warmup(
	{
		// 可传入上述 thread-loader 参数
		workers: 2,
		workerParallelJobs: 50,
	},
	[
		// 子进程中需要预加载的 node 模块
		"babel-loader",
	]
);

/**
 * 给资源文件加上版本号
 */
const Version = +new Date();
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log(__dirname);
console.log(path.resolve(__dirname, "../src/common/models"));
console.log("+++++++++++++++++++++++++++++++++++++++");

/**
 * 配置threadLoader
 */
let threadLoaderConfig = {
	loader: "thread-loader",
	options: {
		workers: 2,
		workerParallelJobs: 50,
	},
};

//属于webpack的主配置文件了
//其它的配置文件都需要混合主配置文件的
const mainConfig = {
	entry: ["babel-polyfill", "./src/main.js"],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: "/node_modules/",
				use: [
					threadLoaderConfig,
					{
						loader: "babel-loader",
						options: {
							presets: [["@babel/preset-env", { targets: "ie>5" }]],
						},
					},
				],
			},
			{
				test: /\.styl(us)?$/,
				use: ["vue-style-loader", "css-loader", "postcss-loader", "stylus-loader"],
			},
			{
				test: /\.css$/,
				/**
				 * threadLoaderConfig
				 * thread-loader 和 MiniCssExtractPlugin放一起会出问题
				 * 找了资料也没有用，现在把thread-loader先去
				 */
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				loader: "url-loader",
				options: {
					name: "[path][name].[ext]?_v=" + Version,
					limit: 10240,
					esModule: false,
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.(obj|fbx|wav|mp4)$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]?_v=" + Version,
				},
			},
			{
				test: /\.json$/,
				type: "javascript/auto",
				use: [
					{
						loader: "file-loader",
						options: {
							name() {
								return "[path][name]." + Version + ".[ext]";
							},
						},
					},
					/* { */
					/* 	// 传入示例 Loader 的绝对路径 */
					/* 	loader: path.resolve(__dirname, "../webpackLoaderSrc/jsonLoader.js"), */
					/* }, */
				],
			},
		],
	},
	plugins: [
		// 需要使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独文件
		// 才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 规则
		new MiniCssExtractPlugin(),
		new vueLoaderPlugin(),
		new htmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CleanWebpackPlugin(),
		/**
		 * 增加环境变量
		 */
		//new webpack.DefinePlugin({
		//    /**
		//     * 这里定义的环境变量可以直接在业务代码里拿到，
		//     * 属于是webpack直接打印上去的，
		//     * 并不是写在业务代码逻辑里的。
		//     */
		//'SYS_MODE': JSON.stringify(process.env.SYS_MODE)
		//}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			/**
			 * 使用css压缩
			 */
			new CssMinimizerPlugin(),
			/**
			 * 使用Html压缩
			 */
			new HtmlMinimizerWebpackPlugin({
				minimizerOptions: {
					// 折叠 Boolean 型属性
					collapseBooleanAttributes: true,
					// 使用精简 `doctype` 定义
					useShortDoctype: true,
				},
			}),
		],
	},
	resolve: {
		//路径别名配置
		alias: {
			vue: "vue/dist/vue.js",
			"@": path.resolve(__dirname, "../src"),
			models: path.resolve(__dirname, "../src/common/models"),
			publicModels: path.resolve(__dirname, "../src/common/models"),
			common: path.resolve(__dirname, "../src/common"),
			comImg: path.resolve(__dirname, "../src/common/images"),
		},
	},
	cache: {
		type: "filesystem",
	},
};

module.exports = mainConfig;
