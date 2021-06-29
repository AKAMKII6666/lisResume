<template>
  <div class="container">
    <div class="langChoose" v-for="(item, index) in langList" :key="index">
      <span v-if="index != 0">|</span>
      <label @click="switchLang(item)" @mouseover="overMouse()">{{
        item.name
      }}</label>
    </div>
    <div class="preforList" v-if="!isLowLevelBrowser">
      <span>{{ pText[lang] }}</span>
      <label v-for="(item, index) in preforList" :key="index"
        ><span v-if="index != 0">|</span>
        <label @click="switchPrf(item)" @mouseover="overMouse()">{{
          item.text[lang]
        }}</label></label
      >
    </div>
    <div class="preforList" v-else>{{ pLowText[lang] }}</div>
  </div>
</template>

<script>
  export default {
    name: 'langSwitcher',
    data() {
      return {
        isLowLevelBrowser: window.isOldBrowser,
        lang: window.sys.langConfig,
        langList: window.sys.langList,
        pText: ['性能设置：', 'Proforamce：'],
        pLowText: [
          '请更换浏览器为Chrome或者Edge使3D场景可见。',
          'Pls Change Your Borswer To Chrome OR Edge For View The 3D Scene.',
        ],
        preforList: [
          {
            name: 'low',
            text: ['低', 'Low'],
          },
          {
            name: 'mid',
            text: ['中', 'Mid'],
          },
          {
            name: 'high',
            text: ['高', 'High'],
          },
          {
            name: 'ultra',
            text: ['极致', 'Ultra'],
          },
        ],
      }
    },
    methods: {
      switchLang(_item) {
        window.sys.playcsgo_ui_contract_type1()
        this.lang = _item.id
        window.sys.langConfig = _item.id
        this.$emit('changeLang', _item)
      },
      switchPrf(_item) {
        window.sys.playcsgo_ui_contract_type1()
        window.gCardLevel = _item.name
        if (typeof window.player !== 'undefined' && window.player !== null) {
          window.player.setSize($(window).width(), $(window).height())
          window.player.scene = window.player.setPrf(window.player.scene)
        }
      },
      overMouse() {
        window.sys.playBtnOver()
      },
    },
  }
</script>

<style lang='stylus' scoped >
  .container
    overflow: hidden
    padding: 20px
    position: absolute
    z-index: 10
    width: 100%

    .langChoose
      font-size: 16px
      float: left
      display: inline-block
      color: #fff

      span
        margin-left: 5px

      label
        cursor: pointer

    .preforList
      float: right
      display: inline-block
      color: #fff
      margin-right: 100px

      span
        margin-left: 5px

      label
        cursor: pointer
</style>