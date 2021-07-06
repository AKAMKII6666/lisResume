/*!
 * ajaxProxy.js
 * (c) 2014-2021 bobliao
 * Released under the MIT License.
 */
var _ajaxProxy = function (_config) {

    var self = this;
    var config = {};
    this.config = $.extend(true, config, _config);
    this.common = null;
    this.parent = null;

    this.account = null;

    //ajax请求链接
    this.ajaxPort = '//192.168.0.8:2333/';

    //调试环境
    if (process.env.NODE_ENV === 'development') {
        this.ajaxPort = '//192.168.0.8:2333/';
    }

    //发布环境
    if (process.env.NODE_ENV === 'production') {
        this.ajaxPort = '//192.168.0.8:2333/';
    }


    //初始化
    this.init = function (_common, _parent) {
        this.common = _common;
        this.parent = _parent;
    }

    //检查登陆情况
    this.getIsLogin = function (_loginedCallBack, _unLoginCall) {
        if (self.account === null) {
            _unLoginCall();
        } else {
            _loginedCallBack();
        }
    }

    //获取登陆账号
    this.getLoginAccount = function () {
        return this.account;
    }

    //服务器状态处理器
    this.stateProcresser = function (_data) {
        var isShowLogin = false;

        //if(_data.state === "500"){
        //	self.common.console.write('服务器内部错误！');
        //	return;
        //}


        return _data
    }

    /**
     * POST请求
     * @param {请求接口名称} _name 
     * @param {请求参数，必须为json格式} _params 
     * @param {放在url上的参数} _urlPar 
     * @param {请求成功后的数据格式} _datatType 
     * @returns 返回一个Promise对象参数为.then(_data, _status, _xhr,_ajaxObj)
     * @error .catch(_xmlHr, _msg, _obj, _params)
     */
    this.post = function (_name, _params, _urlPar, _datatType) {
        return new Promise(function (resolve, reject) {
            var ajaxObj = this.postAction(_name, _params, function (_data, _status, _xhr) {
                resolve(_data, _status, _xhr, ajaxObj);
            }, function (_xmlHr, _msg, _obj, _params) {
                reject(_xmlHr, _msg, _obj, _params);
                throw new Error(_msg);
            }, _urlPar, _datatType);
        });
    }

    /**
     * GET请求
     * @param {请求接口名称} _name 
     * @param {请求参数，必须为json格式} _params 
     * @param {放在url上的参数} _urlPar 
     * @param {请求成功后的数据格式} _datatType 
     * @returns 返回一个Promise对象参数为.then(_data, _status, _xhr,_ajaxObj)
     * @error .catch(_xmlHr, _msg, _obj, _params)
     */
    this.get = function (_name, _params, _urlPar, _datatType) {
        return new Promise(function (resolve, reject) {
            var ajaxObj = this.getAction(_name, _params, function (_data, _status, _xhr) {
                resolve(_data, _status, _xhr, ajaxObj);
            }, function (_xmlHr, _msg, _obj, _params) {
                reject(_xmlHr, _msg, _obj, _params);
                throw new Error(_msg);
            }, _urlPar, _datatType);
        });
    }

    //系统专用ajaxPost
    /**
     * 
     * @param {请求接口名称} _name 
     * @param {请求参数，必须为json格式} _params 
     * @param {成功请求后的回调函数} _succCall 
     * @param {请求失败后的回调函数}} _faiCall 
     * @param {放在url上的参数} _urlPar 
     * @param {请求成功后的数据格式} _datatType 
     * @returns  返回ajax对象
     */
    this.postAction = function (_name, _params, _succCall, _faiCall, _urlPar, _datatType) {
        if (typeof _urlPar === 'undefined') {
            _urlPar = "";
        }
        if (typeof _datatType === 'undefined') {
            _datatType = "JSON";
        }
        var params = {
            url: this.ajaxPort + self.ajaxCGI[_name] + _urlPar,
            type: 'POST',
            data: _params,
            cache: false,
            dataType: _datatType,
            success: function (_data, _status, _xhr) {
                _succCall(self.stateProcresser(_data), _status, _xhr);
            },
            error: _faiCall
        }
        return this.arrowAjax(params);
    }

    //系统专用ajaxGet
    /**
     * 
     * @param {请求接口名称} _name 
     * @param {请求参数，必须为json格式} _params 
     * @param {成功请求后的回调函数} _succCall 
     * @param {请求失败后的回调函数}} _faiCall 
     * @param {放在url上的参数} _urlPar 
     * @param {请求成功后的数据格式} _datatType 
     * @returns 返回ajax对象
     */
    this.getAction = function (_name, _params, _succCall, _faiCall, _urlPar, _datatType) {
        if (typeof _urlPar === 'undefined') {
            _urlPar = "";
        }
        if (typeof _datatType === 'undefined') {
            _datatType = "JSON";
        }
        var params = {
            url: this.ajaxPort + self.ajaxCGI[_name] + _urlPar,
            type: 'GET',
            data: _params,
            cache: false,
            dataType: _datatType,
            success: function (_data, _status, _xhr) {
                _succCall(self.stateProcresser(_data), _status, _xhr);
            },
            error: _faiCall
        }
        return this.arrowAjax(params);
    }



    //ajax请求堆
    this.ajaxArr = [];
    //ajax请求方法
    /**
     * 
     * @param {参数} _params 
     * @returns 返回ajax对象 
     */
    this.arrowAjax = function (_params) {
        //创建ajax参数集
        var ajaxItem = self.makeAjaxItem(_params);
        if (!ajaxItem) { return };
        var aParams = {
            url: _params.url,
            type: _params.type,
            data: _params.data,
            cache: _params.cache,
            dataType: _params.dataType,
            xhrFields: { withCredentials: true },
            success: function (data, status, xhr) {
                _params.success(data, status, xhr);
            },
            error: function (xmlHr, msg, obj) {
                self.makeError(xmlHr, msg, obj, _params);
            },
            fail: function (xmlHr, msg, obj) {
                self.makeError(xmlHr, msg, obj, _params);
            }
        };
        if (typeof _params.contentType !== 'undefined') {
            aParams.contentType = _params.contentType;
        }
        if (typeof _params.headers !== 'undefined') {
            aParams.headers = _params.headers;
        }
        ajaxItem.ajax = $.ajax(aParams).fail(function (xmlHr, msg, obj) {
            self.makeError(xmlHr, msg, obj, _params);
        });

        this.ajaxArr.push(ajaxItem);
        return ajaxItem.ajax;
    }

    //创建ajax错误
    self.makeError = function (xmlHr, msg, obj, params) {
        //如果使用调试码开启了调试模式
        if (process.env.NODE_ENV === 'development') {
            console.log(msg);
            self.common.console.write(msg);
            if (params.error) {
                params.error(xmlHr, msg, obj, params);
            }
        }
    }

    //创建ajax参数集
    self.makeAjaxItem = function (params) {
        //间隔时间
        //默认为1秒内连续触发5次就拒绝。
        if (!params.delay) {
            params.delay = 1000;
        }
        if (!params.times) {
            params.times = 2;
        }
        var times = 0;
        //url,type,data,cache,dataType,success,error
        for (var i = 0; i < this.ajaxArr.length; i++) {
            if (params.url === this.ajaxArr[i].params.url && params.data === this.ajaxArr[i].params.data && ((+new Date) - this.ajaxArr[i].time) < params.delay) {
                times++;
            }
        }
        if (times > params.times) {
            window.sys.write({ str: '手速很快哦，但是也要注意休息啊呀！~', e: $(window) });
            return false;
        }

        var ajaxItem = { ajax: null, params: params, time: (+new Date) };
        return ajaxItem;
    }

    //往接口配置中增加接口配置
    /**
     * 
     * @param {新的接口} _options 
     */
    this.addCGI = function (_options) {
        for (var i in _options) {
            this.ajaxCGI[i] = _options[i];
        }
    }

    //ajax接口配置
    this.ajaxCGI = {
        cgi: 'cgi'
    }


}

export default _ajaxProxy;