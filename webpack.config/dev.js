const path = require('path');
const mainConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require('webpack');


var devConfig = {
    mode:'development',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../buildSrc')
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./bildSrc',
        open:true,
        port:9000,
        hot:true,
        host: "0.0.0.0"
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge.merge(mainConfig,devConfig);