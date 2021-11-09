import jquery from 'jquery';
import 'jquery.easing';

let _mainController = (function ($, jQuery) {
    //虚拟滚动控制器
    let _mainController = function () {
        var self = this
        //当前所有的视图
        this.views = []
        //当前滚动条高度
        this.scroHeight = 0
        //当前屏幕的高度
        this.screenHeight = 0
        //当前屏幕的宽度
        this.screenWidth = 0
        //当前视图
        this.currentView = null
        //惯性动画计时器
        this.throwTimer = null
        //当前拖动状态
        this.isTouching = false;
        //拖拽距离
        this.realData = 0;

        //速度阻力
        this.spd = 1.07

        //初始化
        this.init = function (_views) {
            this.views = _views
            this.initViews();
            self.resize();
            //开始触摸
            document.addEventListener('touchstart', function (touchEvent) {
                self.isTouching = true;
                self.realData = 0;

                if (typeof window.cancelAnimationFrame !== "undefined") {
                    window.cancelAnimationFrame(self.throwTimer);
                } else {
                    window.clearInterval(self.throwTimer)
                }
                var firstPlace = window.tc.nowPosition.y
                var firstscPlace = self.scroHeight
                self.triggerAllStart()
                var realData = self.realData = self.compScroll(
                    firstPlace,
                    firstscPlace,
                    window.tc.nowPosition.y
                )
                window.requestAnimationFrame(function () {
                    self.triggerAllScroll(realData, firstPlace)
                });

                //触摸移动
                window.tc.addTMoveFunc('mcMove', function () {

                    var realData = self.realData = self.compScroll(
                        firstPlace,
                        firstscPlace,
                        window.tc.nowPosition.y
                    )
                    window.requestAnimationFrame(function () {
                        self.triggerAllScroll(realData, firstPlace)
                    });

                })
                //结束触摸
                window.tc.addTUpFunc('mcUp', function () {
                    window.tc.removeTMRFunc('mcMove')
                    window.tc.removeTURFunc('mcUp')
                    var realData = self.compScroll(
                        firstPlace,
                        firstscPlace,
                        window.tc.nowPosition.y
                    )
                    window.requestAnimationFrame(function () {
                        self.triggerAllScroll(realData, firstPlace)
                    });
                    var np = window.tc.nowPosition.y
                    var scpd = window.tc.moveSpeed.y

                    if (scpd !== 0) {

                        var comput = function () {
                            scpd = scpd / self.spd
                            np = np - scpd
                            if (Math.abs(scpd) < 0.05) {
                                if (typeof window.cancelAnimationFrame !== "undefined") {
                                    window.cancelAnimationFrame(self.throwTimer);
                                } else {
                                    window.clearInterval(self.throwTimer)
                                }
                                return
                            } else {
                                self.isTouching = false;
                            }

                            var realData = self.realData = self.compScroll(firstPlace, firstscPlace, np)
                            self.triggerAllScroll(realData, firstPlace)
                            if (typeof window.requestAnimationFrame !== "undefined") {
                                self.throwTimer = window.requestAnimationFrame(function () {
                                    comput();
                                });
                            }
                        }

                        if (typeof window.requestAnimationFrame !== "undefined") {
                            self.throwTimer = window.requestAnimationFrame(function () {
                                comput();
                            });
                        } else {

                            self.throwTimer = setInterval(function () {
                                comput();
                            }, 20)
                        }
                    } else {
                        self.isTouching = false;
                    }
                })
            })
            this.start()
        }

        this.initViews = function () {
            for (var i = 0; i < this.views.length; i++) {
                var item = this.views[i];

                item._mainController = self;
            }
        }

        //开始
        this.start = function () {
            this.currentView = this.views[0]
            this.currentView.show()
        }

        //获得上一个画面
        this.getPrev = function (_this) {
            var last = null;
            for (var i = 0; i < this.views.length; i++) {
                var item = this.views[i];
                if (item === _this) {
                    break;
                }
                last = item;
            }

            return last;
        }

        //获得下一个画面
        this.getNext = function (_this) {
            var next = null;
            for (var i = 0; i < this.views.length; i++) {
                var item = this.views[i];
                if (item === _this) {
                    if (typeof this.views[i + 1] !== 'undefined') {
                        next = this.views[i + 1]
                    } else {
                        next = null;
                    }
                    break;
                }
            }

            return next;
        }

        //运动计算函数
        //当前监听的目标数值
        //-----------------
        //当前监听目标数值起始点
        //当前监听目标数值的结束点
        //-----------------
        //当前被计算的开始点
        //当前被计算的结束点
        //----------------
        //输出当前被计算数值所处的位置
        this.nc = function (_now, _tNs, _tNn, _objStart, _objEnd) {
            var nowPrecent = (_now - _tNs) / (_tNn - _tNs);
            if (nowPrecent > 1) {
                nowPrecent = 1;
            }
            if (nowPrecent < 0) {
                nowPrecent = 0;
            }
            return _objStart + (_objEnd - _objStart) * (1 - nowPrecent);
        }

        //将视图显示在上面
        this.showFromTop = function (_view) {
            if (_view.isShow === 0) {
                _view.top = -this.screenHeight;
                _view.startRelData = self.realData;
                _view.showFromTop();
            }
        }

        //将视图显示在下面
        this.showFromBottom = function (_view) {
            if (_view.isShow === 0) {
                _view.top = this.screenHeight;
                _view.startRelData = self.realData;
                _view.showFromButton();
            }
        }

        //直接显示视图
        this.showView = function (_view, _from) {
            if (_view.isShow === 0) {
                if (_view.startRelData === 0) {
                    _view.startRelData = self.realData;
                }
                if (_from === 'fromPrev') {
                    _view.vScroHeight = 0;
                    _view.vRelScroHeight = 0;
                    _view.startVTop = 0;
                } else {
                    _view.startVTop = _view.vScroHeight;
                }
                _view.show();
            }
        }

        //隐藏视图
        this.hideView = function (_view) {
            if (_view.isShow === 1) {
                _view['hasShown']
                _view.hide();
            }
        }

        //计算滚动
        this.compScroll = function (_firstPlace, _firstscPlace, _my) {
            self.scroHeight = _firstscPlace + (_firstPlace - _my)

            //这里先注销掉，看之后会不会有什么问题
            ////如果是滚动条总数超出了显示范围
            //if (self.scroHeight <= 0) {
            //    //在这里想办法让它停止下来
            //    var override = self.scroHeight
            //    self.scroHeight = 0
            //    var ret = _my - _firstPlace + override
            //    if (ret > 0) {
            //        return -ret
            //    } else {
            //        return ret
            //    }
            //}

            return _firstPlace - _my
        }

        //触发所有视图告知即将开始滚动
        this.triggerAllStart = function () {
            for (var i = 0; i < this.views.length; i++) {
                var item = this.views[i]
                item.startRelData = 0;
                if (this.views[i].isShow) {
                    this.views[i].startTop = this.views[i].top
                }
                this.views[i].startVTop = this.views[i].vScroHeight
            }
        }

        //触发所有的视图，告知它们现在在移动
        this.lastReData = 0;
        this.triggerAllScroll = function (_realData, _startPoint) {
            for (var i = 0; i < self.views.length; i++) {
                var item = self.views[i]
                if (item.isShow) {
                    //如果没有被锁定位置就移动它
                    if (!item.isLocked) {
                        item.top = item.startTop - _realData
                        if (item.top > 0 && item === self.views[0]) {
                            item.top = 0
                        }

                    }
                    if (item.top < -self.screenHeight) {
                        item.top = -self.screenHeight
                        item.dispUpCall()
                    }
                    if (item.top > self.screenHeight) {
                        item.top = self.screenHeight
                        item.dispDownCall()
                    }
                    item.relPosition = ((item.top / self.screenHeight) * 100)

                    if (item.start) {
                        if (item.startRelData === 0) {
                            item.vScroHeight = item.startVTop - _realData;
                        } else {
                            var newstartPoint = _startPoint - item.startRelData;
                            var newRelData = newstartPoint - (_startPoint - _realData)
                            item.vScroHeight = item.startVTop - newRelData;
                        }
                        item.vRelScroHeight = Math.abs((item.vScroHeight / self.screenHeight) * 100)
                        //算出当前动画进度
                        if (item.view.type === 'ani-image') {
                            item.view.progress = -((item.vScroHeight / item.view.moveSfPX) / (item.view.totalHeight / item.view.sfHeight - item.view.cutFr)) * 100;
                        }
                        //如果虚拟高度超出范围就停止
                        //这是超出往上的
                        if (item.vScroHeight > 0) {
                            item.vScroHeight = 0
                            item.vRelScroHeight = 0
                        }

                        //if (item.$vnode.data.ref === 'into') {
                        //    console.log(item.startRelData);
                        //}


                        item.scrolling(self.scroHeight, item.top, _realData)
                    }


                }
            }
            this.lastReData = _realData;
        }

        this.resize = function () {
            this.screenHeight = $(window).height()
            this.screenWidth = $(window).width()
            for (var i = 0; i < self.views.length; i++) {
                var item = self.views[i];
                item.height = self.screenHeight;
                item.width = self.screenWidth;
                //如果是动图就计算高度
                if (item.view.type === 'ani-image') {
                    //先算出单贞高度和当前屏幕的比例
                    item.view.scale = item.view.sfHeight / self.screenHeight;
                    //算出当前应该展示的高度
                    item.view.currHeight = item.view.sfHeight / item.view.scale;
                    //算出当前应该展示的宽度
                    item.view.currTotalWidth = item.view.totalWidth / item.view.scale;
                    //算出当前总高度
                    item.view.currTotalHeight = item.view.totalHeight / item.view.scale;
                    //算出总贞数
                    item.view.totalFrames = Number((item.view.totalHeight / item.view.sfHeight).toFixed(0));
                }
                item.resize();
            }
        }

        $(window).resize(function () {
            self.resize()
        })
    }

    return _mainController;
})(jquery, jquery)
export default _mainController;