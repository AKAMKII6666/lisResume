const path = require('path');
const mainConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
/**
 * 给打包的主/分支文件加上版本号
 */
const Version = (+new Date);

var devConfig = {
    mode: 'production',
    output: {
        /**
         * 配置主文件的文件名，加上版本号
         */
        filename: '[name].Li.' + Version + '.js',
        /**
         * 配置异步请求的文件名，也就是分支文件名，并加上版本号
         */
        chunkFilename: '[id].Li.' + Version + '.js',
        path: path.resolve(__dirname, '../localTest')
    }
}

module.exports = merge.merge(mainConfig, devConfig);