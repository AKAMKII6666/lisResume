<template>
	<table
		class="menu-container"
		:style="{ marginTop: moveDetal.y / 14 + 'rem', marginLeft: moveDetal.x / 14 + 'rem' }"
		@click="hideContent()"
	>
		<tr>
			<td valign="middle">
				<div class="title">
					{{ this.title[lang] }}
				</div>
				<div class="menus">
					<div
						v-for="(item, index) in menuItem"
						:key="index"
						:style="{
							textShadow:
								moveShadow.x / 14 +
								'rem ' +
								moveShadow.y / 14 +
								'rem .714286rem rgba(0,0,0,0.8)',
						}"
						:class="[item.selected ? 'selected' : '']"
					>
						<div
							class="totalCover"
							@mouseover="menuOver(item)"
							@click="switchContent($event, item)"
						></div>
						<div class="cover">{{ item.name[lang] }}</div>
						{{ item.name[lang] }}
					</div>
				</div>
			</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: "reMenu",
	data() {
		return {
			lang: 0,
			title: ["廖力简历", "Li's Resume"],
			menuItem: [
				{
					name: ["个人信息", "Persional Infomation"],
					sence: "dog",
					path: "/persional_infomation",
					selected: false,
				},
				{
					name: ["技能介绍", "My Skills"],
					sence: "tools",
					path: "/my_skills",
					selected: false,
				},
				{
					name: ["作品及文章", "Works & Articles"],
					sence: "books",
					path: "/works_articles",
					selected: false,
				},
				{
					name: ["工作履历", "Employment Record"],
					sence: "scrow",
					path: "/employment_record",
					selected: false,
				},
				{
					name: ["教育经历", "Qualifications"],
					sence: "banboo",
					path: "/qualifications",
					selected: false,
				},
				{
					name: ["关于本简历", "About"],
					sence: "guitar",
					path: "/about",
					selected: false,
				},
			],
			moveDetal: {
				x: 0,
				y: 0,
			},
			moveShadow: {
				x: 0,
				y: 0,
			},
		};
	},
	watch: {
		lang: {
			handler(nval, oval) {
				//已经实现自动切换
				//此处不需要做任何处理
			},
		},
	},
	methods: {
		trigger() {
			var path = window.__initPath.split("/");
			for (var i = 0; i < this.menuItem.length; i++) {
				if ("/" + path[2] === this.menuItem[i].path) {
					this.switchContent({}, this.menuItem[i]);
					return;
				}
			}
		},
		moveMenu(_center, _cursor) {
			var movePosition = {
				x: (_center.x - _cursor.x) / 30,
				y: (_center.y - _cursor.y) / 30,
			};
			this.moveDetal = movePosition;

			var moveShadow = {
				x: (_center.x - _cursor.x) / 220,
				y: (_center.y - _cursor.y) / 220,
			};
			this.moveShadow = moveShadow;
		},
		menuOut() {
			for (var i = 0; i < this.menuItem.length; i++) {
				if (this.menuItem[i].selected === true) {
					this.$emit("menuOver", this.menuItem[i]);
					return;
				}
			}
		},
		menuOver(_item) {
			window.sys.playBtnOver();
			this.$emit("menuOver", _item);
		},
		switchContent(_e, _item) {
			for (var i = 0; i < this.menuItem.length; i++) {
				this.menuItem[i].selected = false;
			}
			_item.selected = true;
			this.$emit("switchContent", _item);
			if (typeof _e.preventDefault !== "undefined" || typeof _e.stopPropagation !== "undefined") {
				_e.stopPropagation();
				_e.preventDefault();
			} else if (typeof window.event !== "undefined") {
				if (typeof window.event.returnValue !== "undefined") {
					window.event.returnValue = false;
				}
				if (typeof window.event.cancelBubble !== "undefined") {
					window.event.cancelBubble();
				}
			}
		},
		hideContent(_e) {
			for (var i = 0; i < this.menuItem.length; i++) {
				this.menuItem[i].selected = false;
			}
			this.$emit("hideContent", {});
		},
	},
};
</script>

<style lang="stylus" scoped>
.menu-container
  position: fixed
  left: 0px
  top: 0px
  z-index: 9
  width: 34.2%
  height: 100%
  text-align: center
  font-weight: 100

.title
  font-size: 6.342857rem
  line-height: 12.857143rem
  height: 12.857143rem
  color: #fff
  letter-spacing: .714286rem
  text-shadow: 0px 0px 1.428571rem rgba(0, 0, 0, 0.8)
  min-width: 28.428571rem
  font-weight: 100

.menus
  width: 28.428571rem
  margin: auto
  overflow: hidden

  div
    font-size: 2.657143rem
    color: #fff
    text-align: left
    line-height: 4.285714rem
    cursor: pointer
    font-weight: 100
    margin: 10px 0px
    text-shadow: -.285714rem .285714rem .714286rem rgb(0 0 0 / 50%)
    transition: all 0.4s
    transition-property: all
    transition-duration: 0.4s
    transition-timing-function: cubic-bezier(0.01, 0.76, 0.67, 0.96)
    transition-delay: 0s

    .cover
      position: absolute
      white-space: nowrap
      background-color: #fff
      color: #454545
      width: 0px
      transition: all 0.4s
      transition-property: all
      transition-duration: 0.4s
      transition-timing-function: cubic-bezier(0.01, 0.76, 0.67, 0.96)
      transition-delay: 0s
      margin: auto
      text-shadow: none
      box-shadow: -.285714rem .285714rem 0px rgba(0, 0, 0, 0.5)

    .totalCover
      z-index: 1
      position: absolute
      width: 28.571429rem
      height: 4.285714rem
      background-color: #fff
      opacity: 0
      margin: auto

    &:hover
      text-indent: 1.428571rem

  .selected
    .cover
      width: 28.571429rem
      text-indent: 1.428571rem
</style>
