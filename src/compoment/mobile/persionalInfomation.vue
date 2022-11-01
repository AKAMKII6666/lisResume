<template>
	<div
		class="mainContainer ps"
		ref="mainContainer"
		:style="{
			top: top + 'px',
			display: display,
			height: height + 'px',
			backgroundColor: background_color,
		}"
	>
		<div class="avatorContainer">
			<div class="avator a1" ref="avator1"></div>
			<div class="avator a2" ref="avator2"></div>
		</div>

		<div class="title" ref="helloLabel">您好！</div>
		<div class="cont" ref="nameLabel">我叫廖力</div>
		<div class="cont" ref="ageLabel">今年33岁</div>
		<div class="cont" ref="expLabel">已有十年WEB前端方面的工作经验</div>
		<div class="cont" ref="exp2Label">曾在腾讯取得过T3.1职称</div>
		<div class="cont" ref="fromLabel">我来自湖南，郴州</div>
		<div class="cont" ref="placeLabel">目前在北京/北七家</div>
		<div class="cont" ref="toLabel">期望在北京工作</div>
		<div class="cont" ref="telLabel">这是我的联系方式:18681449125</div>
	</div>
</template>

<script>
export default {
	name: "persionalInfomation",
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
			isLocked: false,
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
			display: "none",
			//高度
			height: 0,
			//宽度
			width: 0,
			//高度
			kHeight: 0,
			//调起上一个的相对滚动值
			prevVscroll: 0,
			//背景颜色
			background_color: "#e5e5e5",
			lastRdata: 0,
			//视图特性
			view: {
				//一般页面
				type: "n-page",
			},
		};
	},
	methods: {
		//隐藏
		hide() {
			if (this.isShow === 1) {
				console.log("画面2隐藏");
				this.display = "none";
				//指示是否显示
				this.isShow = 0;
				this.start = false;
			}
		},
		//显示
		show() {
			if (this.isShow === 0) {
				console.log("画面2显示");
				this.top = 0;
				this.display = "block";
				//指示是否显示
				this.isShow = 1;
				//指示是否锁定物理位置
				this.isLocked = true;
				//指示是否开始内容滚动
				this.start = true;
			}
		},
		resize() {},
		showFromTop() {},
		showFromButton() {},
		//发起上一个视图显示
		prev() {
			var prev = this._mainController.getPrev(this);
			this._mainController.showView(prev, "fromNext");
		},
		//发起下一个视图显示
		next(_type) {
			if (_type === "show") {
				var next = this._mainController.getNext(this);
				this._mainController.showView(next, "fromPrev");
			} else {
				var next = this._mainController.getNext(this);
				this._mainController.hideView(next, "fromPrev");
			}
		},
		//滚动时的回调函数“钩子”
		scrolling() {
			//如果被标记的虚拟高度大于或等于当时显示时的虚拟高度，就拉起上个画面
			if (Math.abs(this.prevVscroll) >= Math.abs(this.vScroHeight)) {
				this.prev();
			}

			if (this.vRelScroHeight >= 210) {
				this._mainController.hideView(this);
				var next = this._mainController.getNext(this);
				if (next.prevVscroll === 0) {
					next.prevVscroll = next.vScroHeight;
				}
			}

			//缓动标题
			$(this.$refs.helloLabel).css(
				"transform",
				"translate(0," +
					this._mainController.nc(this.vRelScroHeight, 5, 50, 0, 700) +
					"%) scale(" +
					this._mainController.nc(this.vRelScroHeight, 5, 50, 1, 3) +
					")"
			);

			$(this.$refs.helloLabel).css(
				"opacity",
				this._mainController.nc(this.vRelScroHeight, 5, 50, 100, 0) / 100
			);
			var arr = [
				this.$refs.nameLabel,
				this.$refs.ageLabel,
				this.$refs.expLabel,
				this.$refs.exp2Label,
				this.$refs.fromLabel,
				this.$refs.placeLabel,
				this.$refs.toLabel,
				this.$refs.telLabel,
			];

			//让其它所有内容项目依次出现
			var start = 25;
			var end = 35;
			for (var i = 0; i < arr.length; i++) {
				$(arr[i]).css(
					"transform",
					"translate(0," +
						this._mainController.nc(
							this.vRelScroHeight,
							start + i * 4,
							end + i * 4,
							0,
							100
						) +
						"%)"
				);
				$(arr[i]).css(
					"opacity",
					this._mainController.nc(
						this.vRelScroHeight,
						start + i * 4,
						end + i * 4,
						100,
						0
					) / 100
				);
			}

			//如果当前视图动画进度大于等于50%
			//就拉起下一个话面
			if (this.vRelScroHeight >= 105) {
				this.next("show");
			} else {
				this.next("hide");
			}

			//画面卷过105就调起下一个画面
			if (this.vRelScroHeight >= 105) {
				//82,179,43
				//介绍文本的颜色从 67 67 67 变换到  82,179,43
				var r = this._mainController.nc(this.vRelScroHeight, 110, 160, 82, 67).toFixed(0);
				var g = this._mainController.nc(this.vRelScroHeight, 110, 160, 179, 67).toFixed(0);
				var b = this._mainController.nc(this.vRelScroHeight, 110, 160, 43, 67).toFixed(0);
				//介绍文本的颜色进行字体样式过度
				for (var i = 0; i < arr.length; i++) {
					$(arr[i]).css("color", "rgb(" + r + "," + g + "," + b + ")");
				}

				//标题的颜色从27，27，27 过度到  82,179,43
				r = this._mainController.nc(this.vRelScroHeight, 110, 160, 82, 27).toFixed(0);
				g = this._mainController.nc(this.vRelScroHeight, 110, 160, 179, 27).toFixed(0);
				b = this._mainController.nc(this.vRelScroHeight, 110, 160, 43, 27).toFixed(0);
				$(this.$refs.helloLabel).css("color", "rgb(" + r + "," + g + "," + b + ")");

				//背景的透明度从1变成0
				var opacity = this._mainController.nc(this.vRelScroHeight, 110, 115, 0, 1);
				$(this.$refs.mainContainer).css(
					"background-color",
					"rgba(229,229,229," + opacity + ")"
				);

				//整体大小可以从1变换到0.7
				$(this.$refs.mainContainer).css(
					"transform",
					"scale(" + this._mainController.nc(this.vRelScroHeight, 110, 160, 0.75, 1) + ")"
				);

				//变换头像  两个头想切换变化
				//背景的透明度从1变成0
				opacity = this._mainController.nc(this.vRelScroHeight, 110, 115, 0, 1);
				var opacity2 = this._mainController.nc(this.vRelScroHeight, 110, 115, 1, 0);
				$(this.$refs.avator1).css("opacity", opacity);
				$(this.$refs.avator2).css("opacity", opacity2);

				$(this.$refs.mainContainer).css(
					"top",
					this._mainController.nc(this.vRelScroHeight, 160, 210, -100, 0) + "%"
				);
			}
		},
		//向上滚出画面时的回调
		dispUpCall() {
			console.log("当前视图离开话面");
		},
		//向下滚出话面时的回调
		dispDownCall() {},
	},
};
</script>

<style lang="stylus">
.mainContainer.ps
  background-color: #e5e5e5

  .avatorContainer
    height: 6.865rem /* 1373px -> 6.865rem */
    width: 100%
    overflow: hidden
    margin: auto
    position: relative

    .avator
      height: 6.865rem /* 1373px -> 6.865rem */
      width: 100%
      background-repeat: no-repeat
      background-size: contain
      background-position: center
      margin: auto
      position: absolute
      top: 0px
      left: 0px

      &.a1
        background-image: url('comImg/avator.png')

      &.a2
        background-image: url('comImg/avator_px.png')
        opacity: 0

  .title
    margin-top: 0.515rem /* 103px -> .515rem */
    color: #1b1b1b
    font-size: 0.5rem /* 100px -> .5rem */
    line-height: 0.605rem /* 121px -> .605rem */
    text-align: center
    transform: translate(0, 150%)
    opacity: 0

  .cont
    color: #434343
    font-size: 0.3rem /* 60px -> .3rem */
    line-height: 0.45rem /* 90px -> .45rem */
    text-indent: 0.295rem /* 59px -> .295rem */
</style>
