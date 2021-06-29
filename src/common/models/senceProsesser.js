import app from 'models/publish/app.json';
import Dog from 'models/publish/Dog.json';
import Tools from 'models/publish/Tools.json';
import Books from 'models/publish/Boooks.json';
import banboo from 'models/publish/banboo.json';
import Screw from 'models/publish/Screw.json';
import Guitar from 'models/publish/Guitar.json';

//场景处理器
export default {senceProsesser:function(_selfApp){
        window.gCardLevel = 'mid';
        window.movmentStart = true;
        if(!window.isOldBrowser){
            //判断显卡型号
            var canvas = document.createElement('canvas');
            var gl = canvas.getContext('experimental-webgl');
            var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            var gCardInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            //如果包括了NVIDIA 960  /970  980  1060  1070 1080  2060 2070 2080 3060 3070 3080 3090
            if(  
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("960") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("1060") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("2060") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("3060") !== -1 ) 
            ){
                window.gCardLevel = 'high';
            }

            if(  
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("970") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("980") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("1070") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("1080") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("2070") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("2080") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("3070") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("3080") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("3090") !== -1 ) ||
                ( gCardInfo.indexOf("NVIDIA") !== -1 &&  gCardInfo.indexOf("TITAN") !== -1 )
            ){
                window.gCardLevel = 'ultra';
            }
            $(canvas).remove();
        }



        window.currentSence = null;
        window.sences = {};
        var elems = $('.backgrounds');
        for(var i=0;i<elems.length;i++){
            var item = $(elems[i]);
            window.sences[item.attr('data-s')] = {
                name:item.attr('data-s'),
                image:item,
                movement:item.attr('data-set'),
                model:'src/common/models/publish/'+item.attr('data-m')+'.json',
                player:null,
                loadFunc:function(){},
                show:function(){
                    window.currentSence = this;
                    window.player =  this.player;
                    if(this.player === null){
                        this.image.fadeIn();
                    }else{
                        var ss= this;
                        window.player.setSize( $(window).width(), $(window).height() );
                        window.player.scene = window.player.setPrf(window.player.scene);
                        ss.player.play();
                        $(this.player.dom).fadeIn(function(){});
                    }
                },
                hide:function(){
                    if(this.player === null){
                        this.image.fadeOut();
                    }else{
                        this.player.stop();
                        $(this.player.dom).fadeOut();
                    }
                },
                stop:function(){
                    if(this.player === null){
                        this.image.stop();
                    }else{
                        $(this.player.dom).stop();
                    }
                }
            };
        }
        //如果不是老浏览器就把webgl加载进来
        //老浏览器就不要搞这些了
        if(!window.isOldBrowser){
            require(['three','models/publish/js/app.js','models/publish/js/VRButton.js'],function(_three,_APP,_VRButton){
                var THREE = window.THREE = _three; // Used by APP Scripts.
                var VRButton =  window.VRButton = _VRButton.VRButton; // Used by APP Scripts.
                var APP = window.APP = _APP.APP;
                ////创建3D场景
                var loader = new THREE.FileLoader();
                //异步加载模型 
                //异步先把模型都加载好，没加载好的显示一张背景图片
                for(var i in window.sences){
                    var item = window.sences[i];
                    (function(_item){
                        _item.loadFunc = function(){
                            if(!window.isOldBrowser){
                                loader.load( _item.model, function ( text ) {
                                    var player = new APP.Player();
                                        player.load( JSON.parse( text ) );
                                        player.setSize( window.innerWidth, window.innerHeight );
                                        player.animateCall = function(){
                                            $(_item.player.dom).children().height($(window).height());
                                            $(_item.player.dom).children().width($(window).width());
                                            if(window.movmentStart){
                                                if(window.currentSence.movement === 'spin'){
                                                    if(typeof window.player !== 'undefined' && window.player !== null){
                                                        window.player.scene.children[2].rotation.y -= 0.001;
                                                    }
                                                }
                                                if(window.currentSence.movement === 'spinleft'){
                                                    if(typeof window.player !== 'undefined' && window.player !== null){
                                                        window.player.scene.children[2].rotation.y += 0.001;
                                                    }
                                                }
                                            }
                                        };
                                        $(player.dom).hide();
                                        document.body.appendChild( player.dom );
                                        _item.player = player;
                                        if(window.currentSence === _item){
                                            _item.image.fadeOut(2000);
                                            $(_item.player.dom).fadeIn(2000);
                                            _item.player.play();
                                            window.player =  _item.player;
                                            window.player.setSize( window.innerWidth, window.innerHeight );
                                            window.player.scene = window.player.setPrf(window.player.scene);
                                        }
                                        window.addEventListener( 'resize', function () {
                                            player.setSize( window.innerWidth, window.innerHeight );
                                        });
                                    
                                });
                            }
                        }
                    })(item);
                }
                window.sences.app.loadFunc();
            });
        }
        //默认显示第一个
        window.sences.app.show();
        $(document).mousemove(function(){
            var center = {x:$(window).width()/2,y:$(window).height()/2};
            var cursor = window.mControl.nowPosition;
            _selfApp.menuMove(center,cursor);
        });
    }
};