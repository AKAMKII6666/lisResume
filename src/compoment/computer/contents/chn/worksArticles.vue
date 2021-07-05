<template>
  <div class="mainContent">
    <div class="mc-worksList">
      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-icon zebra"></div>
          <div class="mcwit-t">Zebra Tool</div>
        </div>
        <div class="mcw-content">
          类JqueryDOM操作工具编写于2013年多个模块可拆分，体积小巧，当时编写此工具的原因有两个，一个是为了锻炼自己的JS底层代码能力，第二个是为了解决当时项目有人认为Jquery网络请求开销太大需要另寻解决方案。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">SliderBar</div>
        </div>
        <div class="mcw-content">
          用于动态调整数值的Jquery插件，曾用在腾讯的iData交叉分析功能中
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">BigTable</div>
        </div>
        <div class="mcw-content">
          用于展示巨量数据的表格控件曾用在腾讯的iData交叉分析功能中
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">EprTable</div>
        </div>
        <div class="mcw-content">
          用于进行常规数据展示的表格控件，支持分页，首列固定，各种排序等功能，曾用于腾讯的《EPR》（易点）报表项目中。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">ArrowJS</div>
        </div>
        <div class="mcw-content">
          用于构建纯前端应用的框架。在使用该框架进行应用开发的过程中，可以使用框架自带的管理器通过几个按钮就能配置发布，多配置发布，增量发布，代码压缩，合并，拆分打包等功能，框架本身集成了原创的MVVM引擎。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">ArrowMVVM</div>
        </div>
        <div class="mcw-content">
          一个轻便简单的MVVM引擎，支持单独运行以及配合ArrowJS框架构建应用。ARROWJS框架的整体思路源于腾讯工作时期参与的数据魔盒项目，当时在数据魔盒项目组使用的便是ArrowJS框架的前身。离职后用空余时间完善框架。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">FreeLayOut</div>
        </div>
        <div class="mcw-content">
          一个用于报表发布平台或内容发布平台的模板编辑器组件。曾在腾讯用于EPR报表平台。
        </div>
      </div>

      <div class="wcw-item">
        <div class="mcw-i-title">
          <div class="mcwit-t">BALL Game</div>
        </div>
        <div class="mcw-content">
          一个用于研究webgl2D渲染的小游戏业余时间开发
        </div>
      </div>
    </div>

    <table class="articleList">
      <tr>
        <td class="al-title">文章列表</td>
      </tr>
      <tr>
        <td><a>[WEB APP]如何将HTML5站点打包至手机App系列之IOS版</a></td>
      </tr>
      <tr>
        <td><a>[原创]关于布局编辑器的一切</a></td>
      </tr>
      <tr>
        <td><a>[原创]异形雷达图制作全过程</a></td>
      </tr>
      <tr>
        <td><a>交叉多维分析-用大数据的方式展示并分析数据</a></td>
      </tr>
      <tr>
        <td><a>【原创】 web 前端动画全解读 - ①</a></td>
      </tr>
      <tr>
        <td><a>【原创】 web 前端动画全解读 - ② - webGL动画</a></td>
      </tr>
      <tr>
        <td><a>【原创】 ZebraTool - 小型类jQueryJavascript框架</a></td>
      </tr>
      <tr>
        <td>
          <a>【原创】Web前端封装控件step by step （1）- 闭包 和dom元素冒泡</a>
        </td>
      </tr>
      <tr>
        <td>
          <a
            >【原创】Web前端封装控件step by step （2）- “表格内容修改”的功能解析
          </a>
        </td>
      </tr>
      <tr>
        <td>
          <a>【原创】Web前端封装控件step by step （3）- 使用构造器封装控件</a>
        </td>
      </tr>
      <tr>
        <td>
          <a
            >【原创】Web前端封装控件step by step （4）- 完结篇 -
            编写jquery插件</a
          >
        </td>
      </tr>
      <tr>
        <td><a>【原创】前端必须掌握的技能：使用photoshop切图</a></td>
      </tr>
      <tr>
        <td><a>【原创翻译】使用webpack创建一个工作流</a></td>
      </tr>
      <tr>
        <td><a>Data More 数据魔盒 前端开发平台</a></td>
      </tr>
      <tr>
        <td><a>EprGrid - epr报表系统表格独立版示例代码以及使用说明</a></td>
      </tr>
      <tr>
        <td><a>iSliderBar- 用于idata的滑动选择值控件[api] - 原创</a></td>
      </tr>
      <tr>
        <td><a>可以容纳十万级数据展示的web表格之运行原理 【原创】 </a></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'worksAndArticles',
  }
</script>

<style>
</style>