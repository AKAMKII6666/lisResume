<template>
  <div
    class="mainContainer works"
    ref="mainContainer"
    :style="{
      top: top + 'px',
      display: display,
      height: height + 'px',
      backgroundColor: background_color,
    }"
  >
    <div class="title">
      <span></span>
      <label>作品及文章</label>
    </div>
    <div class="mc-worksList">
      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">Zebra Tool</div>
        </div>
        <div class="mcw-content">
          类JqueryDOM操作工具编写于2013年多个模块可拆分，体积小巧，当时编写此工具的原因有两个，一个是为了锻炼自己的JS底层代码能力，第二个是为了解决当时项目有人认为Jquery网络请求开销太大需要另寻解决方案。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">SliderBar</div>
        </div>
        <div class="mcw-content">
          用于动态调整数值的Jquery插件，曾用在腾讯的iData交叉分析功能中
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">BigTable</div>
        </div>
        <div class="mcw-content">
          用于展示巨量数据的表格控件曾用在腾讯的iData交叉分析功能中
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">EprTable</div>
        </div>
        <div class="mcw-content">
          用于进行常规数据展示的表格控件，支持分页，首列固定，各种排序等功能，曾用于腾讯的《EPR》（易点）报表项目中。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">ArrowJS</div>
        </div>
        <div class="mcw-content">
          用于构建纯前端应用的框架。在使用该框架进行应用开发的过程中，可以使用框架自带的管理器通过几个按钮就能配置发布，多配置发布，增量发布，代码压缩，合并，拆分打包等功能，框架本身集成了原创的MVVM引擎。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">ArrowMVVM</div>
        </div>
        <div class="mcw-content">
          一个轻便简单的MVVM引擎，支持单独运行以及配合ArrowJS框架构建应用。ARROWJS框架的整体思路源于腾讯工作时期参与的数据魔盒项目，当时在数据魔盒项目组使用的便是ArrowJS框架的前身。离职后用空余时间完善框架。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">FreeLayOut</div>
        </div>
        <div class="mcw-content">
          一个用于报表发布平台或内容发布平台的模板编辑器组件。曾在腾讯用于EPR报表平台。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">BALL Game</div>
        </div>
        <div class="mcw-content">
          一个用于研究webgl2D渲染的小游戏业余时间开发
        </div>
      </div>
    </div>
    <div class="acCon">
      <table class="articleList">
        <tr>
          <td class="al-title">文章列表</td>
        </tr>
        <tr>
          <td><a>[WEB APP]如何将HTML5站点打包至手机App系列之IOS版</a></td>
        </tr>
        <tr>
          <td><a>[原创]关于布局编辑器的一切</a></td>
        </tr>
        <tr>
          <td><a>[原创]异形雷达图制作全过程</a></td>
        </tr>
        <tr>
          <td><a>交叉多维分析-用大数据的方式展示并分析数据</a></td>
        </tr>
        <tr>
          <td><a>【原创】 web 前端动画全解读 - ①</a></td>
        </tr>
        <tr>
          <td><a>【原创】 web 前端动画全解读 - ② - webGL动画</a></td>
        </tr>
        <tr>
          <td><a>【原创】 ZebraTool - 小型类jQueryJavascript框架</a></td>
        </tr>
        <tr>
          <td>
            <a>【原创】Web前端封装控件step by step （1）- 闭包 和dom元素冒泡</a>
          </td>
        </tr>
        <tr>
          <td>
            <a
              >【原创】Web前端封装控件step by step （2）-
              “表格内容修改”的功能解析
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a>【原创】Web前端封装控件step by step （3）- 使用构造器封装控件</a>
          </td>
        </tr>
        <tr>
          <td>
            <a
              >【原创】Web前端封装控件step by step （4）- 完结篇 -
              编写jquery插件</a
            >
          </td>
        </tr>
        <tr>
          <td><a>【原创】前端必须掌握的技能：使用photoshop切图</a></td>
        </tr>
        <tr>
          <td><a>【原创翻译】使用webpack创建一个工作流</a></td>
        </tr>
        <tr>
          <td><a>Data More 数据魔盒 前端开发平台</a></td>
        </tr>
        <tr>
          <td><a>EprGrid - epr报表系统表格独立版示例代码以及使用说明</a></td>
        </tr>
        <tr>
          <td><a>iSliderBar- 用于idata的滑动选择值控件[api] - 原创</a></td>
        </tr>
        <tr>
          <td><a>可以容纳十万级数据展示的web表格之运行原理 【原创】 </a></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'works',
    data() {
      return {
        //用于过度的计算距离
        startRelData: 0,
        //开始移动时的高度
        startTop: 0,
        //开始移动时的虚拟高度
        startVTop: 0,
        //高度
        top: 0,
        //是否已经展示
        isShow: 0,
        //是否锁定位置
        isLocked: true,
        //当前相对位置
        //百分比
        //正数是往上滑动
        //负数是往下滑动
        relPosition: 0,
        //虚拟高度
        vScroHeight: 0,
        //虚拟相对高度
        //百分比
        //正数是往上滑动
        //负数是往下滑动
        vRelScroHeight: 0,
        //指示内容的开始/停止
        start: false,
        //是否显示
        display: 'none',
        //高度
        height: 0,
        //宽度
        width: 0,
        //高度
        kHeight: 0,
        //调起上一个的相对滚动值
        prevVscroll: 0,
        //背景颜色
        background_color: 'rgb(17,17,17)',
        lastRdata: 0,
        //视图特性
        view: {
          //一般页面
          type: 'n-page',
        },
      }
    },
    methods: {
      //隐藏
      hide() {
        if (this.isShow === 1) {
          console.log('画面5隐藏')
          this.display = 'none'
          //指示是否显示
          this.isShow = 0
          this.start = false
        }
      },
      //显示
      show() {
        if (this.isShow === 0) {
          console.log('画面5显示')
          this.display = 'block'
          //指示是否显示
          this.isShow = 1
          //指示是否锁定物理位置
          this.isLocked = true
          //指示是否开始内容滚动
          this.start = true
        }
      },
      resize() {},
      showFromTop() {},
      showFromButton() {},
      //发起上一个视图显示
      prev() {
        var prev = this._mainController.getPrev(this)
        this._mainController.showView(prev, 'fromNext')
      },
      //发起下一个视图显示
      next(_type) {
        if (_type === 'show') {
          var next = this._mainController.getNext(this)
          this._mainController.showView(next, 'fromPrev')
        } else {
          var next = this._mainController.getNext(this)
          this._mainController.hideView(next, 'fromPrev')
        }
      },
      //滚动时的回调函数“钩子”
      scrolling() {
        //如果被标记的虚拟高度大于或等于当时显示时的虚拟高度，就拉起上个画面
        if (Math.abs(this.prevVscroll) >= Math.abs(this.vScroHeight)) {
          this.prev()
        }

        var r = this._mainController.nc(this.vRelScroHeight, 20, 100, 17, 66)
        var g = this._mainController.nc(this.vRelScroHeight, 20, 100, 17, 66)
        var b = this._mainController.nc(this.vRelScroHeight, 20, 100, 17, 67)

        this.background_color = 'rgb(' + r + ',' + g + ',' + b + ')'
        $('html,body').css(
          'background-color',
          'rgb(' + r + ',' + g + ',' + b + ')'
        )

        $(this.$refs.mainContainer).css(
          'top',
          this._mainController.nc(
            this.vRelScroHeight,
            0,
            100,
            0,
            this._mainController.screenHeight
          )
        )

        if (this.vRelScroHeight >= 100) {
          var cT = Math.abs(this.vScroHeight) - this._mainController.screenHeight
          $(this.$refs.mainContainer).scrollTop(cT)

          if ($(this.$refs.mainContainer).scrollTop() - 500 < cT - 500 - 10) {
            this.next('show')
            if (typeof this._vs_s === 'undefined') {
              this._vs_s = this.vRelScroHeight
            }
            $(this.$refs.mainContainer).css(
              'top',
              this._mainController.nc(
                this.vRelScroHeight,
                this._vs_s,
                this._vs_s + 100,
                -this._mainController.screenHeight,
                0
              )
            )

            //停止这个画面的计算
            if (this.vRelScroHeight >= this._vs_s + 100) {
              this._mainController.hideView(this)
              var next = this._mainController.getNext(this)
              if (next.prevVscroll === 0) {
                next.prevVscroll = next.vScroHeight
              }
            }
          } else {
            this.next('hide')
          }
        }

        var worksArr = $('.wcw-item')
        var start = 50
        var end = 100
        for (var i = 0; i < worksArr.length; i++) {
          var item = worksArr[i]
          $(item).css(
            'transform',
            'translate(0,' +
              this._mainController.nc(
                this.vRelScroHeight,
                ((i + 1) * start) / 3,
                ((i + 1) * end) / 3,
                0,
                50
              ) +
              '%)'
          )
          $(item).css(
            'opacity',
            this._mainController.nc(
              this.vRelScroHeight,
              ((i + 1) * start) / 3,
              ((i + 1) * end) / 3,
              100,
              0
            ) / 100
          )
        }
      },
      //向上滚出画面时的回调
      dispUpCall() {
        console.log('当前视图离开话面')
      },
      //向下滚出话面时的回调
      dispDownCall() {},
    },
  }
</script>

<style lang="stylus" >
  ::-webkit-scrollbar
    width: 0
    height: 0

  ::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 0.25rem rgba(67, 67, 67, 1)
    border-radius: 0px
    background-color: rgba(0, 0, 0, 0)

  ::-webkit-scrollbar-thumb
    border-radius: 0
    -webkit-box-shadow: inset 0 0 0.25rem rgba(0, 0, 0, 0.4)
    background: rgba(0, 0, 0, 0.8)

    &:hover
      border-radius: 0.25rem
      -webkit-box-shadow: inset 0 0 0.25rem rgba(0, 0, 0, 0.6)
      background: rgba(0, 0, 0, 0.6)

  .mainContainer.works
    background-size: 100% auto
    background-image: url('comImg/worksBack.png')
    background-position: bottom
    background-repeat: no-repeat
    overflow-y: auto
    -webkit-overflow-scrolling: touch

    .title
      overflow: hidden
      line-height: 0.55rem /* 110px -> .55rem */
      height: 0.55rem /* 110px -> .55rem */
      color: #ce9225
      border-bottom: 3px dashed #ce9225
      margin: 0.28rem 0px 0px 0.29rem /* 58px -> .29rem */

      span
        height: 0.55rem /* 110px -> .55rem */
        width: 0.335rem /* 67px -> .335rem */
        background-image: url('comImg/ap_logo.png')
        background-size: contain
        background-position: center
        background-repeat: no-repeat
        overflow: hidden
        display: inline-block
        float: left

      label
        font-size: 0.36rem /* 72px -> .36rem */
        display: inline-block
        float: left
        margin-left: 0.075rem /* 15px -> .075rem */

    .mc-worksList
      overflow: hidden
      width: auto
      padding-bottom: 0.5rem /* 100px -> .5rem */
      margin: 0.28rem 0px 0px 0.29rem /* 58px -> .29rem */

      .wcw-item
        overflow: hidden
        border: 3px dashed #ce9225
        margin-top: 0.4rem /* 80px -> .4rem */
        color: #ce9225
        padding: 0.175rem /* 35px -> .175rem */

        .mcw-i-title
          line-height: 0.685rem /* 137px -> .685rem */
          height: 0.685rem /* 137px -> .685rem */
          font-size: 0.36rem /* 72px -> .36rem */

        .mcw-content
          font-size: 0.18rem /* 36px -> .18rem */
          text-indent: 0.18rem /* 36px -> .18rem */

    .acCon
      overflow: hidden
      padding: 0.28rem 0px 1rem /* 200px -> 1rem */ 0.29rem /* 58px -> .29rem */

    .articleList
      width: 100%
      border: 3px dashed #ce9225
      margin-top: 0.4rem /* 80px -> .4rem */

      tr
        td
          color: #ce9225
          line-height: 0.4rem /* 80px -> .4rem */
          font-size: 0.18rem /* 36px -> .18rem */
          text-indent: 30px
          padding: 0px 0.2rem /* 40px -> .2rem */

          a
            color: #ce9225
            font-size: 0.18rem /* 36px -> .18rem */

          &.al-title
            font-size: 0.36rem /* 72px -> .36rem */
            height: 0.685rem /* 137px -> .685rem */
            border-bottom: 3px dashed #ce9225
</style> 