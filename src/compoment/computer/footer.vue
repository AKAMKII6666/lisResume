<template>
  <div class="footerContainer">
    <div class="qrcode">
      <p>
        <img src="~comImg/mobile_link.png" />
      </p>
      <div>{{ qtext[lang] }}</div>
    </div>

    <p>
      <span @click="showQrcode($event)">{{ ftext[lang] }}</span>
    </p>
    Powered By ThreeJs,Vuejs
  </div>
</template>

<script>
  export default {
    name: 'reFooter',
    data() {
      return {
        lang: 0,
        ftext: ['点击访问手机版', 'Click Here To Visit Mobile Version'],
        qtext: ['扫描访问手机端', 'Use Ur Phone Scan Here'],
      }
    },
    methods: {
      showQrcode(_e) {
        _e.stopPropagation()
        var disp = function () {
          $('.qrcode').hide()
          $(document).unbind('click', disp)
        }

        if ($('.qrcode').css('display') === 'none') {
          $('.qrcode').show()
          $('.qrcode').css(
            'top',
            $(window).height() / 2 - $('.qrcode').height() / 2 + 'px'
          )
          $('.qrcode').css(
            'left',
            $(window).width() / 2 - $('.qrcode').width() / 2 + 'px'
          )
          $(document).click(disp)
        } else {
          $('.qrcode').hide()
        }
      },
    },
  }
</script>

<style lang='stylus' scoped >
  .footerContainer
    position: fixed
    bottom: 20px
    left: 0px
    width: 100%
    text-align: center
    color: #fff
    z-index: 10
    font-size: 14px

    span
      cursor: pointer

    p
      margin-bottom: 20px

    .qrcode
      display: none
      width: 367px
      overflow: hidden
      position: fixed
      top: 0px
      left: 0px
      background-color: #fff
      padding-bottom: 45px
      padding-top: 45px
      border-radius: 20px

      p
        text-align: center

        img
          margin: auto

      div
        font-size: 24px
        margin-top: 10px
        text-align: center
        color: #454545
</style>