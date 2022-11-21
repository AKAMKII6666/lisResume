<template>
	<div class="c-content" ref="content" @mouseover="mOver()">
		<div class="title" ref="viewTitle">
			<span></span>
			<label>{{ current.name[lang] }}</label>
			<a @click="close()">r</a>
		</div>
		<div class="viewScroller" ref="viewScroller">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import Router from "vue-router";

/**
 * 这里之前是在打包的时候直接封装进来的，也就是和main直接封装在一块儿的
 * 现在改成异步调用，因为这样的话可以节省一些main.js的大小
 * 因为现在的服务器带宽确实不是很大，所以采取了这样的策略
 */
const smallRouter = new Router({
	routes: [
		{
			path: "/chn/about",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/about.vue"], _reslove);
				});
			},
		},
		{
			path: "/chn/employment_record",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/employmentRecord.vue"], _reslove);
				});
			},
		},
		{
			path: "/chn/my_skills",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/mySkills.vue"], _reslove);
				});
			},
		},
		{
			path: "/chn/persional_infomation",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/persionalInfomation.vue"], _reslove);
				});
			},
		},
		{
			path: "/chn/Qualifications",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/qualifications.vue"], _reslove);
				});
			},
		},
		{
			path: "/chn/works_articles",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/chn/worksArticles.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/about",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/about.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/employment_record",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/employmentRecord.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/my_skills",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/mySkills.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/persional_infomation",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/persionalInfomation.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/Qualifications",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/qualifications.vue"], _reslove);
				});
			},
		},
		{
			path: "/eng/works_articles",
			component: function () {
				return new Promise(function (_reslove, _reject) {
					require(["./contents/eng/worksArticles.vue"], _reslove);
				});
			},
		},
	],
});

let HasRedirect = false;
smallRouter.afterEach(function (to, from, next) {
	if (!HasRedirect) {
		window.__initPath = to.fullPath;
	}
});

export default {
	name: "contentsViewer",
	router: smallRouter,
	mounted() {
		var _self = this;
		$(window).resize(function () {
			_self.resize();
		});
		this.resize();
	},
	data() {
		return {
			lang: window.sys.langConfig,
			current: {
				name: ["", ""],
				sence: "",
				path: "",
			},
		};
	},
	watch: {
		lang: {
			handler(nval, oval) {
				this.$router.push("/" + window.sys.langList[this.lang].tag + this.current.path);
			},
		},
	},
	methods: {
		resize() {
			var rHeight = $(this.$refs.viewTitle).outerHeight();
			$(this.$refs.viewScroller).height($(window).height() - rHeight - 50);
		},
		redirct(_item) {
			window.sys.playBtnClick();
			HasRedirect = true;
			var content = this.$refs.content;
			var _self = this;
			var showContent = function () {
				_self.current = _item;
				_self.$router.push("/" + window.sys.langList[_self.lang].tag + _item.path);
				$(content).animate({ right: 0, opacity: 1 }, 400, function () {});
			};

			if ($(content).css("display") === "none") {
				$(content).show();
				$(content).css("right", -$(content).outerWidth() / 10);
				$(content).css("opacity", "0");
				showContent();
			} else {
				$(content).animate(
					{ right: -$(content).outerWidth() / 10, opacity: 0 },
					{
						duration: 100,
						easing: "easeOutBack",
						step: function () {},
						complete: function () {
							showContent();
						},
					}
				);
			}
		},
		hide(_callBack) {
			var content = this.$refs.content;
			if ($(content).css("display") !== "none") {
				window.sys.playbuttonclickrelease();
				this.$router.push("/");

				$(content).animate(
					{ right: -$(content).outerWidth() / 10, opacity: 0 },
					{
						duration: 400,
						easing: "easeOutBack",
						step: function () {},
						complete: function () {
							$(content).css("display", "none");
							_callBack();
						},
					}
				);
			}
		},
		mOver() {
			this.$emit("mOver", {});
		},
		close() {
			this.$emit("contentClose", {});
		},
	},
};
</script>

<style lang="stylus">
div.c-content
  overflow: hidden
  position: fixed
  right: 0px
  top: 0px
  z-index: 10
  width: 66.8%
  height: 100%
  text-align: left
  font-weight: 100
  background-color: rgba(0, 0, 0, 0.7)
  display: none

  .title
    overflow: hidden
    color: #fff
    border-bottom: .214286rem solid #fff
    margin-left: 4.285714rem
    margin-top: 2.857143rem
    height: 5rem
    line-height: 5rem

    span
      display: inline-block
      width: 1rem
      height: 1rem
      background-color: #fff

    label
      font-size: 3.085714rem
      display: inline-block
      margin-left: 1.857143rem

    a
      font-size: 3.085714rem
      display: inline-block
      float: right
      color: #fff
      cursor: pointer
      font-family: 'Webdings'
      margin-right: 1.428571rem

div.mainContent
  overflow: hidden
  color: #fff

  table.perTable
    margin: 4.285714rem 0px 0px 0px
    font-size: 2.357143rem
    text-indent: 3.642857rem

    .avator
      width: 32.142857rem
      height: 32.142857rem
      background-position: center center
      background-repeat: no-repeat
      background-size: cover
      overflow: hidden
      background-image: url('comImg/avator.jpg')

  table.skillsTable
    float: left
    display: inline-block
    margin: 1.428571rem 7.142857rem 0px 0px

    tr
      td
        padding: 0px 2.142857rem
        font-size: 1.542857rem
        line-height: 4.285714rem
        height: 4.285714rem

      .ssTitle
        font-size: 3.085714rem
        line-height: 4.285714rem
        height: 4.285714rem
        background-color: rgba(0, 0, 0, 0.5)

div.viewScroller
  overflow: auto
  display: block
  margin-left: 4.285714rem

div.mc-worksList
  overflow: hidden

  .wcw-item
    overflow: hidden
    width: 22.428571rem
    padding: .714286rem
    background-color: rgba(31, 21, 72, 0.46)
    float: left
    display: inline-block
    margin: 1.428571rem

    .mcw-i-title
      overflow: hidden
      line-height: 4.571429rem

      .mcwit-icon
        width: 4.571429rem
        height: 4.571429rem
        background-repeat: no-repeat
        background-size: contain
        background-position: center center
        float: left
        display: inline-block

      .zebra
        background-image: url('comImg/ZebraLogo.png')

      .mcwit-t
        font-size: 3.085714rem
        float: left
        display: inline-block

    .mcw-content
      line-height: 2.142857rem
      min-height: 14.285714rem
      text-indent: 2.857143rem

table.articleList
  tr
    td
      line-height: 1.571429rem

      a
        font-size: 1rem
        color: #fff

    .al-title
      font-size: 2.142857rem
      line-height: 2.857143rem

table.wk-table
  width: 100%
  border-left: 1px solid #eee
  border-top: 1px solid #eee
  margin: 1.428571rem 0px 1.428571rem 0px
  background-color: rgba(16, 12, 38, 0.35)

  tr
    td
      text-align: left
      font-size: 2.142857rem
      border-right: 1px solid #eee
      border-bottom: 1px solid #eee
      padding: .714286rem
      line-height: 3.571429rem

      p
        text-indent: 2.142857rem

  &:hover
    background-color: rgba(106, 93, 176, 0.35)

  &.b
    background-color: rgba(201, 116, 29, 0.35)

table.t-abme
  margin: 2.857143rem auto auto auto

  tr
    td
      font-size: 2.142857rem
      color: #fff
      height: 2.857143rem
      line: height 2.857143rem
      text-align: left

      &.ab-title
        font-size: 5.142857rem
        height: 6.357143rem
        line-height: 6.357143rem
</style>
