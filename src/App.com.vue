<template>
  <div>
    <div
      class="backgrounds app"
      data-s="app"
      data-m="app"
      data-set="spinleft"
    ></div>
    <div
      class="backgrounds dog"
      data-s="dog"
      data-m="Dog"
      data-set="move"
    ></div>
    <div
      class="backgrounds guitar"
      data-s="guitar"
      data-m="Guitar"
      data-set="move"
    ></div>
    <div
      class="backgrounds tools"
      data-s="tools"
      data-m="Tools"
      data-set="move"
    ></div>
    <div
      class="backgrounds scrow"
      data-s="scrow"
      data-m="Screw"
      data-set="spin"
    ></div>
    <div
      class="backgrounds banboo"
      data-s="banboo"
      data-m="banboo"
      data-set="move"
    ></div>
    <div
      class="backgrounds books"
      data-s="books"
      data-m="Boooks"
      data-set="moveV"
    ></div>
    <lang-switcher
      ref="relangSwitcherMenu"
      @changeLang="changeLang"
    ></lang-switcher>
    <re-menu
      ref="reMenu"
      @menuOver="menuOver"
      @switchContent="switchContent"
      @hideContent="hideContent"
    ></re-menu>
    <re-footer ref="reFooter"></re-footer>
    <contents-viewer
      ref="contentsviewer"
      @mOver="mOver"
      @contentClose="contentClose"
    ></contents-viewer>
  </div>
</template>

<script>
  //引入全局css
  import 'common/common.styl'
  import langSwitcher from './compoment/computer/langSwitcher.vue'
  import reMenu from './compoment/computer/reMenu.vue'
  import reFooter from './compoment/computer/footer.vue'
  import contentsViewer from './compoment/computer/contentsViewer.vue'

  //场景处理器
  const senceProsesser = require('common/models/senceProsesser.js').default
    .senceProsesser

  var computerUi = {
    name: 'App',
    //组件创建成功时执行
    mounted() {
      var selfApp = this
      senceProsesser(selfApp)
      if (
        window.navigator.language === 'zh' ||
        window.navigator.language == 'zh-CN'
      ) {
        selfApp.changeLang(window.sys.langList[0])
        console.write('系统已经为您选择了中文作为浏览语言..')
      } else {
        selfApp.changeLang(window.sys.langList[1])
        console.write('System Using ENGLISH..')
      }
      console.write('感谢您浏览我的简历！')

      //如果当前页面不是/ 说明用户想访问其它页面
      if (window.__initPath !== '/') {
        this.tirggerMenu()
      }
    },
    components: {
      langSwitcher: langSwitcher,
      reMenu: reMenu,
      reFooter: reFooter,
      contentsViewer: contentsViewer,
    },
    methods: {
      tirggerMenu() {
        this.$refs.reMenu.trigger()
      },
      changeLang(_item) {
        for (var i in this.$refs) {
          this.$refs[i].lang = _item.id
        }
      },
      menuMove(_center, _cursor) {
        //this.$refs.reMenu.moveMenu(_center,_cursor);
        try {
          if (window.movmentStart) {
            if (typeof window.player.camera !== 'undefined') {
              if (typeof window.player.cameraPosition === 'undefined') {
                window.player.cameraPosition = {
                  x: window.player.camera.position.x,
                  y: window.player.camera.position.y,
                  z: window.player.camera.position.z,
                  mx: window.player.scene.children[2].rotation.x,
                  my: window.player.scene.children[2].rotation.y,
                  mz: window.player.scene.children[2].rotation.z,
                }
              }

              if (window.currentSence.movement === 'move') {
                window.player.camera.position.x =
                  window.player.cameraPosition.x + (_cursor.x - _center.x) / 4000
                window.player.camera.position.y =
                  window.player.cameraPosition.y + (_center.y - _cursor.y) / 4000
                window.player.scene.children[2].rotation.y =
                  window.player.cameraPosition.my + (_cursor.x - _center.x) / 4000
                window.player.scene.children[2].rotation.x =
                  window.player.cameraPosition.mx + (_center.y - _cursor.y) / 4000
              }

              if (window.currentSence.movement === 'moveV') {
                window.player.scene.children[2].rotation.z =
                  window.player.cameraPosition.mz + (_cursor.x - _center.x) / 3000
              }
            }
          }
        } catch (_e) {}
      },
      menuOver(_item) {
        if (window.currentSence.name === _item.sence) {
          return
        }
        window.movmentStart = false
        window.currentSence.stop()
        window.currentSence.hide()
        window.sences[_item.sence].show()

        if (typeof window.loadTimmer !== 'undefined') {
          clearTimeout(window.loadTimmer)
        }
        window.loadTimmer = setTimeout(function () {
          if (
            window.sences[_item.sence].player === null &&
            typeof window.sences[_item.sence].loadState === 'undefined'
          ) {
            window.sences[_item.sence].loadState = 'loadding'
            window.sences[_item.sence].loadFunc()
          }
          window.movmentStart = true
        }, 1000)
      },
      switchContent(_item) {
        this.$refs.contentsviewer.redirct(_item)
      },
      hideContent() {
        this.$refs.contentsviewer.hide(function () {})
      },
      mOver() {
        this.$refs.reMenu.menuOut()
      },
      contentClose() {
        this.$refs.reMenu.hideContent()
      },
    },
  }

  export default computerUi
</script>

<style lang='stylus' scoped >
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






