<template>
  <div class='footerContainer' >
      <p><span>{{ftext[lang]}}</span></p>
      Powered By ThreeJs,Vuejs  
  </div>
</template>

<script>
export default {
    name:'reFooter',
    data(){
        return{
            lang:0,
            ftext:['点击访问手机版','Click Here To Visit Mobile Version']
        }
    }
}
</script>

<style lang='stylus' scoped >
    .footerContainer
        position:fixed
        bottom:20px
        left:0px
        width:100%
        text-align:center
        color:#fff
        z-index :10
        font-size:14px

        span
            cursor:pointer

        p
            margin-bottom :20px
</style>