<template>
	<div>
		<div class="backgrounds app" data-s="app" data-m="app" data-set="spinleft"></div>
		<div class="backgrounds dog" data-s="dog" data-m="Dog" data-set="move"></div>
		<div class="backgrounds guitar" data-s="guitar" data-m="Guitar" data-set="move"></div>
		<div class="backgrounds tools" data-s="tools" data-m="Tools" data-set="move"></div>
		<div class="backgrounds scrow" data-s="scrow" data-m="Screw" data-set="spin"></div>
		<div class="backgrounds banboo" data-s="banboo" data-m="banboo" data-set="move"></div>
		<div class="backgrounds books" data-s="books" data-m="Boooks" data-set="moveV"></div>
		<lang-switcher ref="relangSwitcherMenu" @changeLang="changeLang"></lang-switcher>
		<re-menu
			ref="reMenu"
			@menuOver="menuOver"
			@switchContent="switchContent"
			@hideContent="hideContent"
		></re-menu>
		<re-footer ref="reFooter"></re-footer>
		<contents-viewer ref="contentsviewer" @mOver="mOver" @contentClose="contentClose"></contents-viewer>
	</div>
</template>

<script>
import _mobileAdp from "./common/com/mobileAdp.js";
//初始化手机端/电脑端选择器
import _mobileSwitcher from "./common/com/mobileSwitcher.js";
if (process.env.NODE_ENV === "production") {
	var mobileSwitcher = new _mobileSwitcher({
		mobileLink: "/mobile/",
		pcLink: "/pc/",
		isMobileInv: false,
	});
	mobileSwitcher.init();
}

//引入全局css
import "common/common.styl";
import langSwitcher from "./compoment/computer/langSwitcher.vue";
import reMenu from "./compoment/computer/reMenu.vue";
import reFooter from "./compoment/computer/footer.vue";
import contentsViewer from "./compoment/computer/contentsViewer.vue";

//场景处理器
const senceProsesser = require("common/models/senceProsesser.js").default.senceProsesser;

//初始化分辨率适配
let mobileAdp = new _mobileAdp({
	fontSize: 14,
	designWidth: 1920,
	designHeight: 1080,
	//横屏回调函数
	hCallBack: function () {},
	//竖屏回调函数
	vCallBack: function () {},
});
mobileAdp.init();

var computerUi = {
	name: "App",
	//组件挂载成功时执行
	mounted() {
		var selfApp = this;
		senceProsesser(selfApp);
		if (window.navigator.language === "zh" || window.navigator.language == "zh-CN") {
			selfApp.changeLang(window.sys.langList[0]);
			var r = function () {
				console.write("系统已经为您选择了中文作为浏览语言..");
				$(document).unbind("click", r);
			};
			$(document).click(r);
		} else {
			selfApp.changeLang(window.sys.langList[1]);
			var r = function () {
				console.write("System Using ENGLISH to show contents");
				$(document).unbind("click", r);
			};
			$(document).click(r);
		}
		var k = function () {
			console.write("感谢您浏览我的简历！");

			if (window.isOldBrowser) {
				setTimeout(function () {
					console.write(
						"您的浏览器无法展示3D场景，建议更换成Chrome浏览器或者Edge浏览器!"
					);
				}, 1000);
			} else {
				if (window.gCardLevel === "mid" || window.gCardLevel === "low") {
					setTimeout(function () {
						console.write("点击右上角的按钮可以配置3D背景的质量!");
					}, 2000);
				}
			}
			$(document).unbind("click", k);
		};
		$(document).click(k);

		//如果当前页面不是/ 说明用户想访问其它页面
		if (window.__initPath !== "/") {
			this.tirggerMenu();
		}

		var lanText = {
			title: ["来自廖力的信息：", "Message From Li:"],
			content: [
				"<div>您会邀请我参与面试吗?</div>",
				"<div>Will you invite me to participant interview?</div>",
			],
			yBtn: ["会", "Yes"],
			nBtn: ["不会", "No"],
			alt1: [
				`
				<div>请联系我，我将安排行程参与面试:</div>
				<div>Tel:18681449125</div>
				<div>qq:281191341</div>
				`,
				`
				<div>Please contact me, I will arrange the schedule to participate in the interview:</div>
				<div>Tel:18681449125</div>
				<div>qq:281191341</div>
				`,
			],
			alt2: [
				`感谢您花时间阅读我的简历，我会更加努力，将来有机会再合作!`,
				`Thank you for taking the time to read my resume, I will work harder and have the opportunity to cooperate again in the future!`,
			],
		};

		//一旦挂载成功后，就可以开始计时，如果浏览超过十分钟就弹出对话框
		setTimeout(function () {
			var w = new window.sys.window({
				//标题
				title: lanText.title[sys.langConfig],
				//内容
				content: lanText.content[sys.langConfig],
				//放置的容器
				container: "body",
				//位置
				position: {
					x: "center",
					y: "center",
				},
				buttons: {
					mode: "free",
					arr: [
						{
							name: lanText.yBtn[sys.langConfig],
							callBack: function () {
								alt(lanText.alt1[sys.langConfig]);
								w.close();
							},
						},
						{
							name: lanText.nBtn[sys.langConfig],
							callBack: function () {
								alt(lanText.alt2[sys.langConfig]);
								w.close();
							},
						},
					],
				},
				//关闭回调
				closeCall: function () {},
			});

			w.open();
		}, 10 * 60 * 1000);
	},
	components: {
		langSwitcher: langSwitcher,
		reMenu: reMenu,
		reFooter: reFooter,
		contentsViewer: contentsViewer,
	},
	methods: {
		tirggerMenu() {
			this.$refs.reMenu.trigger();
		},
		changeLang(_item) {
			for (var i in this.$refs) {
				this.$refs[i].lang = _item.id;
			}
		},
		menuMove(_center, _cursor) {
			//this.$refs.reMenu.moveMenu(_center,_cursor);
			try {
				if (window.movmentStart) {
					if (typeof window.player.camera !== "undefined") {
						if (typeof window.player.cameraPosition === "undefined") {
							window.player.cameraPosition = {
								x: window.player.camera.position.x,
								y: window.player.camera.position.y,
								z: window.player.camera.position.z,
								mx: window.player.scene.children[2].rotation.x,
								my: window.player.scene.children[2].rotation.y,
								mz: window.player.scene.children[2].rotation.z,
							};
						}

						if (window.currentSence.movement === "move") {
							window.player.camera.position.x =
								window.player.cameraPosition.x +
								(_cursor.x - _center.x) / 4000;
							window.player.camera.position.y =
								window.player.cameraPosition.y +
								(_center.y - _cursor.y) / 4000;
							window.player.scene.children[2].rotation.y =
								window.player.cameraPosition.my +
								(_cursor.x - _center.x) / 4000;
							window.player.scene.children[2].rotation.x =
								window.player.cameraPosition.mx +
								(_center.y - _cursor.y) / 4000;
						}

						if (window.currentSence.movement === "moveV") {
							window.player.scene.children[2].rotation.z =
								window.player.cameraPosition.mz +
								(_cursor.x - _center.x) / 3000;
						}
					}
				}
			} catch (_e) {}
		},
		menuOver(_item) {
			if (window.currentSence.name === _item.sence) {
				return;
			}
			window.movmentStart = false;
			window.currentSence.stop();
			window.currentSence.hide();
			window.sences[_item.sence].show();

			if (typeof window.loadTimmer !== "undefined") {
				clearTimeout(window.loadTimmer);
			}
			window.loadTimmer = setTimeout(function () {
				if (
					window.sences[_item.sence].player === null &&
					typeof window.sences[_item.sence].loadState === "undefined"
				) {
					window.sences[_item.sence].loadState = "loadding";
					window.sences[_item.sence].loadFunc();
				}
				window.movmentStart = true;
			}, 1000);
		},
		switchContent(_item) {
			this.$refs.contentsviewer.redirct(_item);
		},
		hideContent() {
			this.$refs.contentsviewer.hide(function () {});
		},
		mOver() {
			this.$refs.reMenu.menuOut();
		},
		contentClose() {
			this.$refs.reMenu.hideContent();
		},
	},
};

export default computerUi;
</script>

<style lang="stylus" scoped>
canvas
  position: absolute
  width: 100%
  height: 100%

div.backgrounds
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  overflow: hidden
  position: absolute
  width: 100%
  height: 100%
  top: 0px
  left: 0px
  display: none

  &.app
    background-image: url('comImg/app_bk.jpg')
    background-color: #292929

  &.dog
    background-image: url('comImg/Dog_bk.jpg')
    background-color: #a26e46

  &.guitar
    background-image: url('comImg/Guitar_bk.jpg')
    background-color: #05050f

  &.tools
    background-image: url('comImg/Tools_bk.jpg')
    background-color: #1c5e90

  &.scrow
    background-image: url('comImg/Scrow_bk.jpg')
    background-color: #374b6c

  &.banboo
    background-image: url('comImg/Banboo_bk.jpg')
    background-color: #d6d6d6

  &.books
    background-image: url('comImg/Books_bk.jpg')
    background-color: #424242
</style>
