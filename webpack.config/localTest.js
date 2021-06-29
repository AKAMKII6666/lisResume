const path = require('path');
const mainConfig = require('./webpack.config.js');
const merge = require('webpack-merge');


var devConfig = {
    mode:'production',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../localTest')
    }
}

module.exports = merge.merge(mainConfig,devConfig);