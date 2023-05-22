<template>
	<div
		class="mainContainer guitar-ani"
		ref="mainContainer"
		:style="{
			top: top + 'px',
			display: display,
			height: height + 'px',
			backgroundColor: background_color,
		}"
	>
		<canvas
			class="ani-canvas"
			:style="{
				backgroundColor: background_color,
			}"
			ref="canvas"
		></canvas>
		<div class="mcmain2" ref="mcmain2"></div>
		<div class="mcmain1" ref="mcmain1"></div>
		<div class="loadding">正在载入资源..</div>
	</div>
</template>

<script>
import imgPath from "comImg/hand_total.png";

var img = new Image();
img.src = imgPath;
let context = null;
let imgDataArr = [];

let timeouter;
let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
let isiOS = !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/);

let draw = function (_view) {
	//安卓可以将图片缓存为imageData加速渲染
	if (isAndroid) {
		androidAnimate(_view);
	}
	//ios如果将图片缓存为imagedata 的话会导致内存溢出
	//ios safari 可以直接用图片做渲染，不用缓存也很快
	if (isiOS) {
		iosAnimate(_view);
	}
};

let iosAnimate = function (_view) {
	/**
	 * 图片在电脑端会载入不全，但是手机端可以完全载入这些图片内容
	 * 这个目前不需要解决，因为在电脑端是不用看手机端的内容的
	 */
	if (hasLoaded && context !== null) {
		requestAnimationFrame(function () {
			context.clearRect(0, 0, _view.view.currTotalWidth, _view.view.currHeight);
			context.drawImage(
				img,
				(_view.width - _view.view.currTotalWidth) / 2,
				-(_view.view.currHeight * -_view.view.currFrame),
				_view.view.currTotalWidth,
				_view.view.currTotalHeight
			);
		});
		if ($(".loadding").css("display") !== "none") {
			$(".loadding").hide();
			$(".mcmain2").fadeIn(600);
			$(".mcmain1").fadeIn(600);
		}
	} else {
		if (typeof timeouter === "undefined") {
			timeouter = setTimeout(function () {
				draw(_view);
			}, 100);
		}
	}
};

let androidAnimate = function (_view) {
	/**
	 * 图片在电脑端会载入不全，但是手机端可以完全载入这些图片内容
	 * 这个目前不需要解决，因为在电脑端是不用看手机端的内容的
	 */
	if (hasLoaded && context !== null) {
		if (imgDataArr.length === 0) {
			for (var i = 0; i < _view.view.totalFrames; i++) {
				context.clearRect(0, 0, _view.view.currTotalWidth, _view.view.currHeight);
				context.drawImage(
					img,
					(_view.width - _view.view.currTotalWidth) / 2,
					-(_view.view.currHeight * i),
					_view.view.currTotalWidth,
					_view.view.currTotalHeight
				);
				imgDataArr.push(
					context.getImageData(
						(_view.width - _view.view.currTotalWidth) / 2,
						0,
						_view.view.currTotalWidth,
						_view.view.currHeight
					)
				);
			}

			if ($(".loadding").css("display") !== "none") {
				$(".loadding").hide();
				$(".mcmain2").fadeIn(600);
				$(".mcmain1").fadeIn(600);
			}
			window.imgDataArr = imgDataArr;
			context.putImageData(
				imgDataArr[-_view.view.currFrame],
				(_view.width - _view.view.currTotalWidth) / 2,
				0
			);
		} else {
			requestAnimationFrame(function () {
				context.clearRect(0, 0, _view.view.currTotalWidth, _view.view.currHeight);
				context.putImageData(
					imgDataArr[-_view.view.currFrame],
					(_view.width - _view.view.currTotalWidth) / 2,
					0
				);
			});
		}
	} else {
		if (typeof timeouter === "undefined") {
			timeouter = setTimeout(function () {
				draw(_view);
			}, 100);
		}
	}
};

let hasLoaded = false;
img.onload = function () {
	hasLoaded = true;
	setTimeout(function () {
		$(window).resize();
	}, 1);
};
export default {
	name: "into",
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
			//背景颜色
			background_color: "#2a2a2a",
			lastRdata: 0,
			//视图特性
			view: {
				//动画图片
				type: "ani-image",
				//总高度
				totalHeight: 55632,
				//总宽度
				totalWidth: 350,
				//单贞高度
				sfHeight: 520,
				//总贞数
				totalFrames: 0,
				//当前贞
				currFrame: 0,
				//几像素移动一贞
				moveSfPX: 10,
				//当前展示高度
				currHeight: 0,
				//当前贞高度
				currFrHeight: 0,
				//当前总高度
				currTotalHeight: 0,
				//当前总宽度
				currTotalWidth: 0,
				//缩放比例
				scale: 0,
				//丢弃贞
				cutFr: 20,
				//当前动画进度 百分比
				progress: 0,
			},
		};
	},
	mounted() {
		//初始化canvas
		var canvas = this.$refs.canvas;
		context = canvas.getContext("2d", { willReadFrequently: true });
	},
	methods: {
		//隐藏
		hide() {
			if (this.isShow === 1) {
				console.log("画面1隐藏");
				this.display = "none";
				//指示是否显示
				this.isShow = 0;
				this.start = false;
			}
		},
		//显示
		show() {
			if (this.isShow === 0) {
				console.log("画面1显示");
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
		resize() {
			this.$refs.canvas.width = this.width;
			this.$refs.canvas.height = this.height;

			var self = this;
			draw(self);
		},
		showFromTop() {},
		showFromButton() {},
		//发起上一个视图显示
		prev() {},
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
			//这是超出往下的
			var tHeight = this.view.totalFrames * this.view.moveSfPX;
			if (Math.abs(this.vScroHeight) > tHeight) {
				this.vScroHeight = -tHeight;
				this.vRelScroHeight = (this.vScroHeight / this.height) * 100;
			}

			this.height = this._mainController.nc(
				this.view.progress,
				50,
				100,
				0,
				this._mainController.screenHeight
			);

			//给界面上的元素计算动画
			if (typeof this.m1Height === "undefined") {
				this.m1Height = $(this.$refs.mcmain1).height();
			}
			$(this.$refs.mcmain1).height(
				this._mainController.nc(this.view.progress, 0, 30, 0, this.m1Height)
			);

			//给界面上的元素计算动画
			if (typeof this.m2Height === "undefined") {
				this.m2Height = $(this.$refs.mcmain2).height();
			}
			$(this.$refs.mcmain2).height(
				this._mainController.nc(this.view.progress, 0, 30, 0, this.m2Height)
			);

			//算出当前是第几帧
			this.view.currFrame = Number((this.vScroHeight / this.view.moveSfPX).toString().split(".")[0]);
			if (Math.abs(this.view.currFrame) > this.view.totalFrames - this.view.cutFr) {
				this.view.currFrame = -this.view.totalFrames + this.view.cutFr;
			}
			//算出当前图片的展示高度
			this.view.currFrHeight = this.view.currFrame * this.view.currHeight;

			//如果当前视图动画进度大于等于50%
			//就拉起下一个话面
			if (Math.abs(this.view.progress) >= 50) {
				this.next("show");
			} else {
				this.next("hide");
			}
			//动画播完就结束这个话面了，下次话面出现需要下一个画面的调起
			if (Math.abs(this.view.progress) >= 100) {
				this._mainController.hideView(this);
				var next = this._mainController.getNext(this);
				if (next.prevVscroll === 0) {
					next.prevVscroll = next.vScroHeight;
				}
			}

			//console.log(this.vScroHeight)

			var self = this;
			draw(self);
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
.mainContainer
  position: relative

  .loadding
    font-size: 0.24rem /* 48px -> .24rem */
    margin-top: 1rem /* 200px -> 1rem */
    position: absolute
    z-index: 1
    text-align: center
    color: #fff
    width: 100%

  &.guitar-ani
    background-color: #fff

  .mcmain1
    display: none
    background-image: url('comImg/main_1.gif')
    background-position: center bottom
    background-repeat: no-repeat
    background-size: 2.43rem auto
    position: absolute
    top: 0
    margin: auto
    width: 100%
    height: 5rem /* 1000px -> 5rem */
    z-index: 1

  .mcmain2
    display: none
    background-image: url('comImg/main_2.gif')
    background-position: center top
    background-repeat: no-repeat
    background-size: 2.43rem auto
    position: absolute
    bottom: 0
    margin: auto
    width: 100%
    height: 4rem /* 800px -> 4rem */
    z-index: 1
</style>
