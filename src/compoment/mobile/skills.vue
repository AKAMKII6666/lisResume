<template>
	<div
		class="c-outside-c"
		:style="{
			height: height + 'px',
			backgroundColor: background_color,
		}"
	>
		<div
			class="c-outside"
			:style="{
				height: height + 'px',
				backgroundColor: background_color,
			}"
		>
			<div
				class="mainContainer sks"
				ref="mainContainer"
				:style="{
					top: top + 'px',
					display: display,
					height: height + 'px',
					backgroundColor: background_color,
				}"
			>
				<table class="scWindow" ref="scWindow">
					<tr>
						<td>
							<!--WEB前端技术栈-->
							<div class="skillsContainer" ref="sk1">
								<div class="skillsTitle">
									<span>技能介绍</span>
									<label>WEB前端技术栈</label>
								</div>
								<table class="skillsTable">
									<tr>
										<td>
											Reactjs + Razzle + i18n + web3js
											+ TypeScript
										</td>
										<td class="dw">熟练</td>
									</tr>
									<tr>
										<td>web3js</td>
										<td class="dw">熟练</td>
									</tr>
									<tr>
										<td>wagmi</td>
										<td class="dw">了解</td>
									</tr>
									<tr>
										<td>RainbowKit</td>
										<td class="dw">了解</td>
									</tr>
									<tr>
										<td>VUE + WEBPACK</td>
										<td class="dw">熟练</td>
									</tr>
									<tr>
										<td>NODEJS & NPM</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>REQUIREJS</td>
										<td>精通</td>
									</tr>
									<tr>
										<td>JQUERY</td>
										<td>精通</td>
									</tr>
									<tr>
										<td>GIT</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>ELECTRON</td>
										<td>精通</td>
									</tr>
									<tr>
										<td>EXPRESS</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>D3JS</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>WEBGL</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>ThreeJs</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>HIGHCHARTS</td>
										<td>精通</td>
									</tr>
									<tr>
										<td>ASP.NET MVC</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>PHP</td>
										<td>了解</td>
									</tr>
								</table>
							</div>
							<!--WEB前端技术栈-->

							<!--后端技术栈-->
							<div class="skillsContainer" ref="sk2">
								<div class="skillsTitle">
									<span>技能介绍</span>
									<label>后端技术栈</label>
								</div>
								<table class="skillsTable">
									<tr>
										<td>.Net C#</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>NODEJS</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>MYSQL</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>ORACLE</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>SQLLITE</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>SQLSERVER</td>
										<td>熟练</td>
									</tr>
									<tr>
										<td>DOCKER/Radius</td>
										<td>了解</td>
									</tr>
								</table>
							</div>
							<!--后端技术栈-->

							<!--能力总览-->
							<div class="skillsContainer" ref="sk3">
								<div class="skillsTitle">
									<span>技能介绍</span>
									<label>能力总览</label>
								</div>
								<table class="skillsTable tot">
									<tr>
										<td>
											Reactjs + Razzle + i18n +web3js
											+ ts
											工作流搭建，生产环境建设及兼容性调整。
										</td>
									</tr>
									<tr>
										<td>
											VUE + WEBPACK
											工作流搭建，生产环境建设及兼容性调整。
										</td>
									</tr>
									<tr>
										<td>
											HTML CSS
											重构及各种老旧浏览器或手机端兼容性适配。
										</td>
									</tr>
									<tr>
										<td>
											2D 及 3D
											图形展示，有大数据图形数据分析系统建设的经验。
										</td>
									</tr>
									<tr>
										<td>有适配各种移动端分辨率的能力。</td>
									</tr>
									<tr>
										<td>
											熟练设计小中大型项目程序架构的能力。
										</td>
									</tr>
									<tr>
										<td>有ELECTRON构建桌面应用的能力。</td>
									</tr>
									<tr>
										<td>
											有构建VUE/REQUIREJS/JQUERY/NODEJS公用组件的能力及文档能力。
										</td>
									</tr>
									<tr>
										<td>有前WEB页面访问速度优化的能力。</td>
									</tr>
									<tr>
										<td>
											有美术设计能力，有PHOTOSHOP/Axure使用能力。
										</td>
									</tr>
									<tr>
										<td>有交互设计能力。</td>
									</tr>
									<tr>
										<td>GIT代码及主/分支管理的能力。</td>
									</tr>
									<tr>
										<td>
											有技术自我学习能力，例如上面列表中列出“了解”的技术，都是有全面学习过，但是没机会使用的技术。
										</td>
									</tr>
								</table>
							</div>
							<!--能力总览-->
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "skills",
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
			background_color: "#000",
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
				console.log("画面3隐藏");
				this.display = "none";
				//指示是否显示
				this.isShow = 0;
				this.start = false;
			}
		},
		//显示
		show() {
			if (this.isShow === 0) {
				console.log("画面3显示");
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

			//停止这个画面的计算
			if (this.vRelScroHeight >= 530) {
				this._mainController.hideView(this);
				var next = this._mainController.getNext(this);
				if (next.prevVscroll === 0) {
					next.prevVscroll = next.vScroHeight;
				}
			}

			//拉起下一个话面
			if (this.vRelScroHeight >= 420) {
				this.next("show");
				$(this.$refs.scWindow).width(this._mainController.screenWidth);
				$(this.$refs.scWindow).height(this._mainController.screenHeight);
				var width = (this._mainController.screenWidth * 4) / 0.6938775510204082;
				var height = this._mainController.screenHeight * 4 * 0.685;
				var top = this._mainController.screenHeight / 2 - height / 2;
				var left = this._mainController.screenWidth / 2 - width / 2;
				$(this.$refs.mainContainer).height(
					this._mainController.nc(
						this.vRelScroHeight,
						420,
						520,
						height,
						this._mainController.screenHeight
					)
				);
				$(this.$refs.mainContainer).width(
					this._mainController.nc(
						this.vRelScroHeight,
						420,
						520,
						width,
						this._mainController.screenWidth
					)
				);

				$(this.$refs.mainContainer).css(
					"top",
					this._mainController.nc(this.vRelScroHeight, 420, 520, top, 0)
				);
				$(this.$refs.mainContainer).css(
					"left",
					this._mainController.nc(this.vRelScroHeight, 420, 520, left, 0)
				);

				//开始关闭画面
				$(this.$refs.mainContainer).css(
					"transform",
					"scale(" + this._mainController.nc(this.vRelScroHeight, 420, 520, 0.15, 1) + ")"
				);
			} else {
				this.next("hide");
				$(this.$refs.mainContainer).height(this._mainController.screenHeight);
				$(this.$refs.mainContainer).css("width", "");

				$(this.$refs.mainContainer).css("top", 0);
				$(this.$refs.mainContainer).css("left", 0);

				$(this.$refs.mainContainer).css(
					"transform",
					"scale(" + this._mainController.nc(this.vRelScroHeight, 5, 55, 1, 1.5) + ")"
				);
			}

			if (this.vRelScroHeight >= 55 && this.vRelScroHeight <= 105) {
				$(this.$refs.scWindow).css(
					"top",
					this._mainController.nc(this.vRelScroHeight, 55, 105, -100, 0) + "%"
				);
			}

			//“前端技术栈”的计算逻辑
			if (this.vRelScroHeight >= 105 && this.vRelScroHeight <= 200) {
				$(this.$refs.sk1).show();
				if (this.vRelScroHeight >= 105 && this.vRelScroHeight <= 140) {
					$(this.$refs.scWindow).css(
						"top",
						this._mainController.nc(this.vRelScroHeight, 105, 140, 0, -100) + "%"
					);
				}
				if (this.vRelScroHeight >= 150 && this.vRelScroHeight <= 200) {
					$(this.$refs.scWindow).css(
						"left",
						this._mainController.nc(this.vRelScroHeight, 150, 200, -100, 0) + "%"
					);
				}
			} else {
				$(this.$refs.sk1).hide();
			}

			//“后端技术栈”的计算逻辑
			if (this.vRelScroHeight >= 200 && this.vRelScroHeight <= 300) {
				$(this.$refs.sk2).show();
				if (this.vRelScroHeight >= 200 && this.vRelScroHeight <= 240) {
					$(this.$refs.scWindow).css(
						"left",
						this._mainController.nc(this.vRelScroHeight, 200, 240, 0, -100) + "%"
					);
				}
				if (this.vRelScroHeight >= 260 && this.vRelScroHeight <= 300) {
					$(this.$refs.scWindow).css(
						"left",
						this._mainController.nc(this.vRelScroHeight, 260, 300, -100, 0) + "%"
					);
				}
			} else {
				$(this.$refs.sk2).hide();
			}

			//“能力总览”的计算逻辑
			if (this.vRelScroHeight >= 300 && this.vRelScroHeight <= 460) {
				$(this.$refs.sk3).show();
				if (this.vRelScroHeight >= 300 && this.vRelScroHeight <= 340) {
					$(this.$refs.scWindow).css(
						"left",
						this._mainController.nc(this.vRelScroHeight, 300, 340, 0, -100) + "%"
					);
				}
				if (this.vRelScroHeight >= 340 && this.vRelScroHeight <= 400) {
					$(this.$refs.scWindow).css(
						"left",
						this._mainController.nc(this.vRelScroHeight, 340, 400, -100, 0) + "%"
					);
				}
			} else {
				$(this.$refs.sk3).hide();
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
.c-outside-c
  width: 100%
  height: 100%
  overflow: hidden
  position: absolute
  top: 0
  left: 0

.c-outside
  width: 100%
  height: 100%
  overflow: hidden
  position: relative
  top: 0
  left: 0

.mainContainer.sks
  position: absolute
  background-size: cover
  background-image: url('comImg/sc1Backgroundw.png')
  background-position: center
  background-repeat: no-repeat

  .scWindow
    width: 100%
    height: 100%
    background-size: 100% 100%
    background-image: url('comImg/sc1window.png')
    background-position: center
    background-repeat: no-repeat
    position: absolute

    .skillsContainer
      overflow: hidden
      width: 5.535rem /* 767px -> 3.835rem */;
      margin: auto;

      .skillsTitle
        font-size: 0.36rem /* 72px -> .36rem */
        color: #52b32b
        line-height: 0.485rem /* 97px -> .485rem */
        height: 0.485rem /* 97px -> .485rem */
        border-bottom: 0.035rem solid #52b32b

        span
          float: left
          display: inline-block
          font-size: 0.36rem /* 72px -> .36rem */

        label
          float: right
          display: inline-block
          font-size: 0.24rem /* 48px -> .24rem */

      .skillsTable
        width: 100%

        tr
          td
            height: 0.415rem /* 83px -> .415rem */
            font-size: 0.18rem /* 36px -> .18rem */
            color: #52b32b
            text-align: left

            &.dw
              width: 0.52rem /* 104px -> .52rem */

        &.tot
          width: 100%
          text-indent: 0.185rem /* 37px -> .185rem */
</style>
