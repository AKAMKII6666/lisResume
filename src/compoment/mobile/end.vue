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
		<img class="endImg" src="~comImg/end.gif" />
		<div class="bg">
			<div class="ba">京ICP备2022032913号-1</div>
			<div class="ba">
				<a
					href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011402013386"
					target="_blank"
					>北京公安备案号:11011402013386</a
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "end",
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
			background_color: "rgb(17,17,17)",
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
				console.log("画面6隐藏");
				this.display = "none";
				//指示是否显示
				this.isShow = 0;
				this.start = false;
			}
		},
		//显示
		show() {
			if (this.isShow === 0) {
				console.log("画面6显示");
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
		next(_type) {},
		//滚动时的回调函数“钩子”
		scrolling() {
			//如果被标记的虚拟高度大于或等于当时显示时的虚拟高度，就拉起上个画面
			if (Math.abs(this.prevVscroll) >= Math.abs(this.vScroHeight)) {
				console.log(this.prevVscroll);
				this.prev();
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

<style lang="stylus" scoped>
 .mainContainer.works
   .endImg
     margin: auto
     height: 100%
     background-size: contain
     background-position: center
     background-repeat: no-repeat

.bg
  position:fixed
  z-index 999
  bottom:0
  width:100%
  text-align:center
  color:#fff
  font-size:.01rem

  .ba
    font-size:.01rem
    color:#fff

    a
      color:#fff
</style>
