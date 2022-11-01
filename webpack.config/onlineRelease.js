const path = require("path");
const mainConfig = require("./webpack.config.js");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * 给打包的主/分支文件加上版本号
 */
const Version = +new Date();

var devConfig = {
	mode: "production",
	output: {
		/**
		 * 配置主文件的文件名，加上版本号
		 */
		filename: "[name]_[contenthash].Li.MainFile.js",
		/**
		 * 配置异步请求的文件名，也就是分支文件名，并加上版本号
		 */
		chunkFilename: "[name]_[id]_[contenthash].Li.Chunk.js",
		path: path.resolve(__dirname, "../onlineRelease"),
	},
	optimization: {
		minimize: true,
		//使用 Tree-Shaking 删除多余模块导出
		usedExports: true,
		//开启小模块的合并功能
		concatenateModules: true,

		/**
		 * 使用Terser
		 */
		minimizer: [
			new TerserPlugin({
				//用于配置需要压缩什么文件
				test: /\.m?js(\?.*)?$/i,
				//并行数量
				parallel: 5, // number | boolean,
			}),
		],
		/**
		 * 使用UglifyJs
		 */
		//minimizer: [
		//	new UglifyJsPlugin({
		//		test: /\.js(\?.*)?$/i,
		//		uglifyOptions: {
		//			compress: {
		//				drop_debugger: true,
		//				drop_console: true,
		//			},
		//			mangle: true,
		//			warnings: false,
		//		},
		//	}),
		//],

		/**
		 * 手动配置chunk的分包处理
		 */
		splitChunks: {
			cacheGroups: {
				default: {
					idHint: "",
					reuseExistingChunk: true,
					minChunks: 2,
					priority: -20,
				},
				defaultVendors: {
					idHint: "vendors",
					//复用其他chunk内已拥有的模块
					reuseExistingChunk: true,
					test: /[\\/]node_modules[\\/]/i,
					priority: -10,
				},
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			/**
			 * 这里定义的环境变量可以直接在业务代码里拿到，
			 * 属于是webpack直接打印上去的，
			 * 并不是写在业务代码逻辑里的。
			 */
			SYS_MODE: JSON.stringify("rel"),
		}),
	],
	cache: {
		/**
		 * 开启持久化缓存，节省打包时间
		 */
		type: "filesystem",
	},
};

module.exports = merge.merge(mainConfig, devConfig);
