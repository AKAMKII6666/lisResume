const path = require('path');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 * 给资源文件加上版本号
 */
const Version = (+new Date);
console.log('+++++++++++++++++++++++++++++++++++++++')
console.log(__dirname)
console.log(path.resolve(__dirname, '../src/common/models'))
console.log('+++++++++++++++++++++++++++++++++++++++')


//属于webpack的主配置文件了
//其它的配置文件都需要混合主配置文件的
const mainConfig = {
    entry: ["babel-polyfill", './src/main.js'],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie>5" }]
                        ]
                    }
                }
            }, {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]?_v=' + Version,
                    limit: 10240,
                    esModule: false
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.(obj|fbx|wav|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?_v=' + Version,
                }
            }, {
                test: /\.json$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name() {
                        return '[path][name].' + Version + '.[ext]'
                    },
                },
            }
        ]
    },
    plugins: [
        new vueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        //路径别名配置
        alias: {
            "vue": 'vue/dist/vue.js',
            "@": path.resolve(__dirname, "../src"),
            "models": path.resolve(__dirname, '../src/common/models'),
            "publicModels": path.resolve(__dirname, '../src/common/models'),
            "common": path.resolve(__dirname, '../src/common'),
            "comImg": path.resolve(__dirname, '../src/common/images')
        }
    }
}

module.exports = mainConfig;