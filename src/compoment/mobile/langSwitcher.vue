<template>
  <div class="container">
    <span class="langChoose" v-for="(item, index) in langList" :key="index">
      <span v-if="index != 0">|</span>
      <label @click="switchLang(item)">{{ item.name }}</label>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'langSwitcher',
    data() {
      return {
        lang: window.sys.langConfig,
        langList: window.sys.langList,
      }
    },
    methods: {
      switchLang(_item) {
        this.lang = _item.id
        window.sys.langConfig = _item.id
        this.$emit('changeLang', _item)
      },
    },
  }
</script>

<style lang='stylus' scoped >
  .container
    display: none
    overflow: hidden
    padding-top: 0.15rem /* 30px -> .15rem */
    position: absolute
    top: -0.5rem /* -100px -> -0.5rem */
    z-index: 10
    width: 100%
    text-align: right

    .langChoose
      overflow: hidden
      font-size: 0.18rem /* 36px -> .18rem */
      margin: auto
      display: inline-block
      color: #fff
      margin-right: 0.1rem /* 20px -> .1rem */

      span
        overflow: hidden
        margin-left: 0.125rem /* 25px -> .125rem */
        display: inline-block

      label
        overflow: hidden
        cursor: pointer
        display: inline-block
</style>