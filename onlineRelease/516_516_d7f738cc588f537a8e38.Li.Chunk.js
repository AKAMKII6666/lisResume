"use strict";(self.webpackChunkmr=self.webpackChunkmr||[]).push([[516],{7131:function(t,n,o){o.r(n);n.default=function(t){this.parent=t.parent,this.option={messagePadding:10};var n={e:null,topMove:-50,m:"[blank]",time:8e3,style:"",borderColor:"",closeBut:null,closeBtn:!0};this.logArray=[],this.write=function(t){var o=JSON.parse(JSON.stringify(n));this.config="string"==typeof t?$.extend(!0,o,{m:t}):$.extend(!0,o,t),this.config.e?this.elementsPrint():this.print()},this.elementsPrint=function(){for(var t=$(this.config.e),n=0;n<t.length;n++){var o=t[n],e=this.createHtmlElements();e.appendTo("body"),$(o).height()>e.height()?e.css("top",$(o).offset().top+($(o).height()/2-e.height()/2)+"px"):e.css("top",$(o).offset().top+"px"),$(o).width()>e.width()?e.css("left",$(o).offset().left+($(o).width()/2-e.width()/2)+"px"):e.css("left",$(o).offset().left+"px"),e.animate({top:$(e).offset().top+this.config.topMove,opacity:0},{duration:this.config.time,easing:"easeOutBack",step:function(){},complete:function(){$(this).remove()}})}},this.print=function(){var t=this,n={htmlElement:"",timeOutInterval:null,setPosition:function(){t.printPosition.call(this,t)},setStartPosition:function(){t.printSetStartPosition.call(this,t)},startTimeOut:function(){t.printStartTimeOut.call(this,t)}};if(this.logArray.push(n),n.htmlElement=this.createHtmlElements(),n.htmlElement.appendTo("body"),t.config.closeBtn){n.closeBut=$("<div class='arrow-console-close' title='关闭' ></div>").appendTo("body");t=this;n.closeBut.click((function(){clearInterval(n.timeOutInterval),t.closeItem.call(n,t,n,t)}))}n.setStartPosition(),this.position(),n.startTimeOut()},this.printPosition=function(t){this.removeFlg||$(this.htmlElement).stop();for(var n=!1,o=0,e=0;e<t.logArray.length;e++)t.logArray[e]==this&&(n=!0),n&&(o+=$(t.logArray[e].htmlElement).outerHeight()+t.option.messagePadding);!function(t){$(t.htmlElement).animate({top:$(window).height()-o,left:0},{duration:300,easing:"easeOutBack",step:function(){t.closeBut&&($(t.closeBut).css("top",$(this).position().top+5),$(t.closeBut).css("left",$(this).position().left+$(this).outerWidth()-$(t.closeBut).width()-5))},complete:function(){t.closeBut&&($(t.closeBut).css("top",$(this).position().top+5),$(t.closeBut).css("left",$(this).position().left+$(this).outerWidth()-$(t.closeBut).width()-5),"0"===$(t.closeBut).css("opacity")&&$(t.closeBut).animate({opacity:1},200))}})}(this)},this.printSetStartPosition=function(t){$(this.htmlElement).css("top",$(window).height()-$(this.htmlElement).height()-t.option.messagePadding+"px"),$(this.htmlElement).css("left","-"+($(this.htmlElement).width()+Number($(this.htmlElement).css("border-left-width").replace("px",""))+Number($(this.htmlElement).css("border-right-width").replace("px","")))+"px"),this.closeBut&&$(this.closeBut).css("opacity",0)},this.printStartTimeOut=function(t){var n=this,o=t;this.timeOutInterval=setTimeout((function(){o.closeItem.call(n,t,n,o)}),t.config.time)},this.closeItem=function(t,n,o){n.removeFlg=!0;var e=n.htmlElement,i=n.closeBut;if($(i).fadeOut(200,(function(){$(i).remove()})),$(e).animate({left:-$(e).outerWidth()},{duration:400,easing:"easeOutBack",step:function(){},complete:function(){$(e).remove()}}),void 0!==t.logArray&&void 0!==t.logArray.length){for(var s=[],c=0;c<o.logArray.length;c++)o.logArray[c]!==n&&s.push(o.logArray[c]);o.logArray=s}t.position()},this.position=function(){for(var t=0;t<this.logArray.length;t++)this.logArray[t].setPosition()},this.createHtmlElements=function(){if(this.config.e)return $('<div class="arrow-print-element" style='+this.config.style+" ></div>").append(this.config.m);var t="";return""!=this.config.borderColor&&(t=";border-color:"+this.config.borderColor),$('<div class="arrow-print-item" style='+this.config.style+t+" ></div>").append(this.config.m)}}},6284:function(t,n,o){o.r(n),o.d(n,{default:function(){return r}});var e=o.p+"src/common/audio/beepclear.wav?_v=1667121042054",i=o.p+"src/common/audio/buttonclick.wav?_v=1667121042054",s=o.p+"src/common/audio/buttonclickrelease.wav?_v=1667121042054",c=o.p+"src/common/audio/buttonrollover.wav?_v=1667121042054",a=o.p+"src/common/audio/csgo_ui_contract_type1.wav?_v=1667121042054",r=function(){var t=this;this.audios={},"undefined"==typeof webkitAudioContext?this.auContext=new AudioContext:this.auContext=new webkitAudioContext,this.sMap={beepclear:e,buttonclick:i,buttonclickrelease:s,buttonrollover:c,csgo_ui_contract_type1:a},this.play=function(n){var o=null;if(void 0===this.audios[n]){var e=new XMLHttpRequest;e.open("GET",t.sMap[n],!0),e.responseType="arraybuffer",e.onload=function(){t.auContext.decodeAudioData(e.response,(function(e){o=e,t.audios[n]=e;var i=t.auContext.createBufferSource();i.buffer=o,i.loop=!1,i.connect(t.auContext.destination),i.start(0)}),(function(t){}))},e.send()}else{o=t.audios[n];var i=this.auContext.createBufferSource();i.buffer=o,i.connect(t.auContext.destination),i.start(0)}},this.playBtnOver=function(){this.play("buttonrollover")},this.playBtnClick=function(){this.play("buttonclick")},this.playbeepclear=function(){this.play("beepclear")},this.playbuttonclickrelease=function(){this.play("buttonclickrelease")},this.playcsgo_ui_contract_type1=function(){this.play("csgo_ui_contract_type1")}}},5643:function(t,n,o){o.r(n);n.default=function(t){var n=this;this.screenState="H",n.isMobile=!1,/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(n.isMobile=!0),n.getScreenState=function(){n.isMobile&&(180!==window.orientation&&0!==window.orientation||(n.screenState="V"),90!==window.orientation&&-90!==window.orientation||(n.screenState="H"))},n.getScreenState();var o={title:"没有标题",content:"<div>没有内容</div>",container:"body",position:{x:"conter",y:"conter"},size:{width:600,height:"auto"},buttons:{mode:"none",yesCall:function(){},noCall:function(){},arr:[]},background:{enabled:!0},style:"",classAdd:"",closeCall:function(){},isNoCloseBtn:!1};this.config=$.extend(!0,o,t),this.open=function(t){n.createMainPanel(),n.createContent(),n.resize(),n.bindEvent(),$(window).resize(n.resize),void 0!==t&&t()},this.bindEvent=function(){this.title.mousedown((function(){var t=mControl.nowPosition.x-n.content.offset().left,o=mControl.nowPosition.y-n.content.offset().top;mControl.addMouseMoveFunc("windowMove",(function(){var e={x:mControl.nowPosition.x-t,y:mControl.nowPosition.y-o-$(window).scrollTop()};n.checkBorder(e,"y")&&n.content.css("top",e.y+"px"),n.checkBorder(e,"x")&&n.content.css("left",e.x+"px")})),mControl.addMouseUpFunc("windowUp",(function(){mControl.removeMMRFunc("windowMove"),mControl.removeMURFunc("windowUp")}))})),this.closeBtn.mousedown((function(t){t.stopPropagation()})),this.closeBtn.click((function(){n.close()})),!0===n.config.isNoCloseBtn&&this.closeBtn.hide(),"none"!==n.config.buttons.mode&&"free"!==n.config.buttons.mode&&(n.buttonYes.click((function(){n.config.buttons.yesCall(),n.close()})),"yesno"===n.config.buttons.mode&&n.buttonCancle.click((function(){n.config.buttons.noCall(),n.close()})))},this.checkBorder=function(t,o){var e=!0;return"x"===o?(t.x<=0&&(n.content.css("left","0px"),e=!1),t.x+n.content.width()>$(window).width()&&(n.content.css("left",$(window).width()-n.content.width()+"px"),e=!1)):(t.y<=0&&(n.content.css("top","0px"),e=!1),t.y+n.content.height()>$(window).height()&&(n.content.css("top",$(window).height()-n.content.height()+"px"),e=!1)),e},this.createMainPanel=function(){this.background=$("<div class='b-window-background' ></div>").appendTo(n.config.container),this.content=$("<div class='b-ballWindow' >    <div class='b-title' >        <label></label>        <span>这是标题</span>    </div>    <div class='b-window-container' ></div></div>").appendTo(n.config.container),this.title=this.content.find(".b-title"),this.contentContainer=this.content.find(".b-window-container"),this.closeBtn=this.content.find(".b-title > label"),this.titleText=this.content.find(".b-title > span"),this.background.css("opacity","0"),this.content.css("opacity","0"),""!==n.config.style&&this.contentContainer.attr("style",n.config.style),""!==n.config.classAdd&&this.contentContainer.addClass(n.config.classAdd),this.createButtons(),!1===this.config.background.enabled&&this.background.hide()},this.createButtons=function(){if("none"!==n.config.buttons.mode&&"free"!==n.config.buttons.mode&&(n.buttonContainer=$("<div class='b-w-buttonContainer' ></div>").appendTo(n.content),"yes"===n.config.buttons.mode&&(n.buttonYes=$("<button class='b-w-b n-button' >确&nbsp;定</button>").appendTo(n.buttonContainer)),"yesno"===n.config.buttons.mode&&(n.buttonCancle=$("<button class='b-w-b n-button'  >取&nbsp;消</button>&nbsp;&nbsp;").appendTo(n.buttonContainer),n.buttonYes=$("<button class='b-w-b n-button' >确&nbsp;定</button>").appendTo(n.buttonContainer),"V"!==n.screenState&&n.buttonYes.css("margin-left","50px")),n.buttonYes.focus()),"free"===n.config.buttons.mode){n.buttonContainer=$("<div class='b-w-buttonContainer' ></div>").appendTo(n.content);for(var t=0;t<n.config.buttons.arr.length;t++){var o=n.config.buttons.arr[t],e=$("<button class='b-w-b n-button'  >"+o.name+"</button>&nbsp;&nbsp;").appendTo(n.buttonContainer);t!==n.config.buttons.arr.length-1&&e.css("margin-right","50px"),function(t,n){n.click((function(){t.callBack()}))}(o,e)}}},this.createContent=function(){$(n.config.content).appendTo(n.contentContainer),this.titleText.html(n.config.title),"tips"===n.config.position.x?("auto"!==n.config.size.width&&n.content.width(n.config.size.width),"auto"!==n.config.size.height&&n.contentContainer.height(n.config.size.height),n.background.hide(),n.content.css("top",$(window).height()-n.content.height()+"px"),n.content.css("left",$(window).width()),n.contentContainer.css("background-color","#e8ecdc"),n.content.css("box-shadow","0px 0px 400px rgba(0,0,0,0.2)"),n.content.animate({left:$(window).width()-n.content.outerWidth(),opacity:1},{duration:500,easing:"easeOutBack"})):"V"===n.screenState?(n.background.animate({opacity:.2},200),n.content.css("top",$(window).height()+"px"),n.content.height()>$(window).height()?(n.content.animate({top:0,opacity:1},350),n.contentContainer.css("overflow","auto")):n.content.animate({top:$(window).height()-n.content.height(),opacity:1},350)):(n.background.animate({opacity:.45},200),n.content.animate({opacity:1},350))},this.resize=function(){if(n.getScreenState(),"V"===n.screenState){if(n.content.width("100%"),n.contentContainer.height("auto"),n.content.css("top",$(window).height()-n.content.height()+"px"),n.content.css("left",0),n.content.height()>$(window).height()){n.content.css("top","0px");var t=0;void 0!==n.buttonContainer&&(t=n.buttonContainer.outerHeight()),n.contentContainer.height($(window).height()-n.title.outerHeight()-t)}"yesno"===n.config.buttons.mode&&n.buttonCancle.css("margin-left","")}else"auto"!==n.config.size.width&&n.content.width(n.config.size.width),"auto"!==n.config.size.height&&n.contentContainer.height(n.config.size.height),"tips"===n.config.position.x?(n.content.css("top",$(window).height()-n.content.height()+"px"),n.content.css("left",$(window).width()-n.content.width()+"px")):("center"===o.position.y?n.content.css("top",$(window).height()/2-n.content.height()/2):n.content.css("top",n.config.position.y),"center"===n.config.position.x?n.content.css("left",$(window).width()/2-n.content.width()/2):n.content.css("left",n.config.position.x)),"yesno"===n.config.buttons.mode&&n.buttonCancle.css("margin-left","50px");n.background.height($(window).height())},this.close=function(){this.background.animate({opacity:0},200),"V"===n.screenState?this.content.animate({opacity:0,top:$(window).height()},400,(function(){n.content.remove(),n.background.remove(),n.config.closeCall(),$(window).unbind("resize",n.resize)})):this.content.animate({opacity:0},350,(function(){n.content.remove(),n.background.remove(),n.config.closeCall(),$(window).unbind("resize",n.resize)}))}}}}]);