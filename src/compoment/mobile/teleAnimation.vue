<template>
  <div
    class="c-outside"
    :style="{
      height: height + 'px',
      backgroundColor: background_color,
    }"
  >
    <div
      class="mainContainer tele"
      ref="mainContainer"
      :style="{
        top: top + 'px',
        display: display,
        height: height + 'px',
        backgroundColor: background_color,
      }"
    >
      <div class="selfdis" ref="selfdis"></div>

      <div class="scan" ref="scan"></div>
    </div>
  </div>
</template>

<script>
  import w95png from 'comImg/win95.png'
  export default {
    name: 'teleAnimation',
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
        background_color: 'transparent',
        showTimes: 0,
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
          console.log('画面4隐藏')
          this.display = 'none'
          //指示是否显示
          this.isShow = 0
          this.start = false
        }
      },
      //显示
      show() {
        if (this.isShow === 0) {
          this.showTimes = this.showTimes + 1
          console.log('画面4显示')
          this.display = 'block'
          //指示是否显示
          this.isShow = 1
          //指示是否锁定物理位置
          this.isLocked = true
          //指示是否开始内容滚动
          this.start = true

          if (this.showTimes >= 5) {
            $(this.$refs.selfdis).css('background-image', 'url("' + w95png + '")')
          }
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
        //停止这个画面的计算
        if (this.vRelScroHeight >= 200) {
          this._mainController.hideView(this)
          var next = this._mainController.getNext(this)
          if (next.prevVscroll === 0) {
            next.prevVscroll = next.vScroHeight
          }
        }

        $(this.$refs.mainContainer).css(
          'transform',
          'scale(' +
            this._mainController.nc(this.vRelScroHeight, 0, 100, 1, 4) +
            ')'
        )

        if (this.vRelScroHeight >= 0 && this.vRelScroHeight <= 20) {
          $(this.$refs.scan).css(
            'opacity',
            this._mainController.nc(this.vRelScroHeight, 0, 20, 0.8, 0)
          )
        }

        if (this.vRelScroHeight >= 50 && this.vRelScroHeight <= 100) {
          $(this.$refs.scan).css(
            'opacity',
            this._mainController.nc(this.vRelScroHeight, 20, 100, 0.1, 0.8)
          )
        }

        $(this.$refs.selfdis).css(
          'opacity',
          this._mainController.nc(this.vRelScroHeight, 50, 100, 1, 0)
        )

        if (this.vRelScroHeight >= 80) {
          this.next('show')
          $(this.$refs.mainContainer).css(
            'top',
            this._mainController.nc(
              this.vRelScroHeight,
              100,
              200,
              -this._mainController.screenHeight,
              0
            )
          )
        } else {
          this.next('hide')
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
  .mainContainer.tele
    background-size: cover
    background-image: url('comImg/screen.png')
    background-position: center
    background-repeat: no-repeat
    position: absolute

    div.scan
      height: 100%
      width: 100%
      background-size: cover
      background-image: url('comImg/screen_scan.png')
      background-position: center
      background-repeat: no-repeat
      position: absolute

    div.selfdis
      height: 100%
      width: 100%
      background-size: cover
      background-image: url('comImg/screen_self_dis.png')
      background-position: center
      background-repeat: no-repeat
      position: absolute
</style>