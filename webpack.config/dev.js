const path = require("path");
const mainConfig = require("./webpack.config.js");
const merge = require("webpack-merge");
const webpack = require("webpack");

var devConfig = {
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../buildSrc"),
	},
	devtool: "eval-source-map",
	devServer: {
		contentBase: "./bildSrc",
		open: true,
		port: 9000,
		hot: true,
		host: "0.0.0.0",
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			/**
			 * 这里定义的环境变量可以直接在业务代码里拿到，
			 * 属于是webpack直接打印上去的，
			 * 并不是写在业务代码逻辑里的。
			 */
			SYS_MODE: JSON.stringify("dev"),
		}),
	],
	/**
	 * 开启延迟编译
	 * 开启延迟编译后，所有异步模块只会在访问时被编译，首次编译将会只编译主干.
	 * 目前只是实验性功能，还不是正式版本，dev用用就好了
	 */
	experiments: {
		lazyCompilation: true,
	},
	/*
    让一些产物优化的功能在开发模式下关闭，减少资源消耗
    */
	optimization: {
		//这个是指检测模块重复打包的问题
		//在开发模式下可以不用关心模块重复打包的问题
		removeAvailableModules: false,
		//检测是否有空分支，这里为true的话，空分支将被移除
		//但是开发模式下可以不用移除空分支,少了这部分操作，wp的运行效率会变快
		removeEmptyChunks: false,
		//保持默认值或 false，关闭代码分包；
		splitChunks: false,
		//保持默认值或 false，关闭代码压缩；
		minimize: false,
		//保持默认值或 false，关闭模块合并；
		concatenateModules: false,
		//保持默认值或 false，关闭 Tree-shaking 功能；
		usedExports: false,
	},
};

module.exports = merge.merge(mainConfig, devConfig);
