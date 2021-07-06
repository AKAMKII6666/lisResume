//导入vue
import Vue from 'vue';
import Router from 'vue-router';
//电脑端
//import App from './App.com.vue';
//移动端
import App from './App.mob.vue';
import 'babel-polyfill';
//导入公用组件
import jquery from 'jquery';
import 'jquery.easing';
import common from 'common/common.js';

/**
 * 初始化系统
 */
let initSys = function () {
    window.jquery = jquery;
    window.$ = jquery;
    window.sys = new common();
    //公用函数加载成功
    window.sys.init(function () {
        //完成公用组件的载入
        //console.write('系统已经载入完成.');
        $(window).resize(function () {
            sys.console.position();
        });
    });

    //配置发布后屏蔽vue-devTools
    let isDev_mode = true;
    //判断当前环境是否为生产环境
    if (process.env.NODE_ENV === 'production') {
        isDev_mode = false;
    }
    Vue.config.debug = isDev_mode;
    Vue.config.devtools = isDev_mode;
    Vue.config.productionTip = isDev_mode;


    //解决重复路由的问题
    const originalPush = Router.prototype.push;

    Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    Vue.use(Router);
    new Vue({
        el: '#app',
        components: {
            App: App
        },
        template: "<App/>"
    });
}

//适配高底浏览器
var userAgent = navigator.userAgent;
window.isOldBrowser = false;
//如果是
//下面这个是微信内置浏览器的判断
//Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6303004c)
if (userAgent.indexOf('MSIE') !== -1 || (!!window.ActiveXObject || "ActiveXObject" in window) || userAgent.indexOf("WindowsWechat") !== -1) {
    window.isOldBrowser = true;
    console.log("老式浏览器.");
    require(['common/scripts/jquery-lowVersion.js'], function (_jquery) {
        window.jquery = _jquery.default;
        window.$ = _jquery.default;
        initSys();
    });
} else {
    console.log("现代浏览器.");
    initSys();
}






