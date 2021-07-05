<template>
  <div class="totalContainer">
    <end ref="end"></end>
    <skills ref="skills"></skills>
    <tele-animation ref="teleAnimation"></tele-animation>
    <work-record ref="workRecord"></work-record>
    <works ref="works"></works>
    <persional-infomation ref="persionalInfomation"></persional-infomation>
    <lang-switcher ref="langSwitcher" @changeLang="changeLang"></lang-switcher>
    <into ref="into"></into>
    <table class="hInfo">
      <tr>
        <td>请使用竖屏浏览简历.</td>
      </tr>
    </table>
  </div>
</template>
<script>
  //引入全局css
  import 'common/common.styl'
  import langSwitcher from './compoment/mobile/langSwitcher.vue'
  import end from './compoment/mobile/end.vue'
  import workRecord from './compoment/mobile/workRecord.vue'
  import works from './compoment/mobile/works.vue'
  import teleAnimation from './compoment/mobile/teleAnimation.vue'
  import skills from './compoment/mobile/skills.vue'
  import persionalInfomation from './compoment/mobile/persionalInfomation.vue'
  import into from './compoment/mobile/into.vue'
  //导入触摸控制器
  import 'common/com/touchController.js'
  import _mainController from './compoment/mobile/maincontroller.js'
  import _mobileAdp from './common/com/mobileAdp.js'

  //初始化分辨率适配
  let mobileAdp = new _mobileAdp({
    fontSize: 200,
    designWidth: 1176,
    designHeight: 2400,
    //横屏回调函数
    hCallBack: function () {},
    //竖屏回调函数
    vCallBack: function () {},
  })
  mobileAdp.init()

  export default {
    name: 'App',
    mounted() {
      var mainController = new _mainController()
      //初始化的时候把视图传进去以便计算
      mainController.init([
        this.$refs.into,
        this.$refs.persionalInfomation,
        this.$refs.skills,
        this.$refs.teleAnimation,
        this.$refs.works,
        this.$refs.workRecord,
        this.$refs.end,
      ])
      var showEdHinfo = false
      mobileAdp.hCallBack = function () {
        $('.hInfo').show()
        showEdHinfo = true
      }

      mobileAdp.vCallBack = function () {
        if (showEdHinfo) {
          window.location.reload()
        }
      }

      if (mobileAdp.state === 'h') {
        $('.hInfo').show()
        showEdHinfo = true
      }

      var lanText = {
        title: ['来自廖力的信息：', 'Message From Li:'],
        content: [
          '<div>您会邀请我参与面试吗?</div>',
          '<div>Will you invite me to participant interview?</div>',
        ],
        yBtn: ['会', 'Yes'],
        nBtn: ['不会', 'No'],
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
      }

      setTimeout(function () {
        var w = new window.sys.window({
          //标题
          title: lanText.title[sys.langConfig],
          //内容
          content: lanText.content[sys.langConfig],
          //放置的容器
          container: 'body',
          //位置
          position: {
            x: 'center',
            y: 'center',
          },
          buttons: {
            mode: 'free',
            arr: [
              {
                name: lanText.yBtn[sys.langConfig],
                callBack: function () {
                  alt(lanText.alt1[sys.langConfig])
                  w.close()
                },
              },
              {
                name: lanText.nBtn[sys.langConfig],
                callBack: function () {
                  alt(lanText.alt2[sys.langConfig])
                  w.close()
                },
              },
            ],
          },
          //关闭回调
          closeCall: function () {},
        })

        w.open()
      }, 5 * 60 * 1000)
    },
    components: {
      into: into,
      langSwitcher: langSwitcher,
      persionalInfomation: persionalInfomation,
      skills: skills,
      teleAnimation: teleAnimation,
      works: works,
      workRecord: workRecord,
      end: end,
    },
    methods: {
      changeLang(_item) {
        for (var i in this.$refs) {
          this.$refs[i].lang = _item.id
        }
      },
    },
  }
</script>

<style lang='stylus' >
  html, body
    overflow: hidden
    -webkit-overflow-scrolling: touch
    background-color: #fff
    -webkit-text-size-adjust: none

  .mainContainer
    background-color: #fff
    position: absolute
    width: 100%

  .hInfo
    display: none
    width: 100%
    height: 100%
    background-color: #454545
    text-align: center
    line-height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: 999
    color: #fff
    font-size: 0.3rem /* 60px -> .3rem */
</style>