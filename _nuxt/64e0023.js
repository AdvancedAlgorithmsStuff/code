(window.webpackJsonp=window.webpackJsonp||[]).push([[10,4,5],{268:function(t,e,n){"use strict";var r=n(12),o=n(1),c=n(3),l=n(104),m=n(19),d=n(15),h=n(193),v=n(43),f=n(106),x=n(194),y=n(4),w=n(77).f,_=n(35).f,k=n(17).f,C=n(273),L=n(269).trim,I="Number",N=o.Number,R=N.prototype,T=o.TypeError,P=c("".slice),S=c("".charCodeAt),W=function(t){var e=x(t,"number");return"bigint"==typeof e?e:D(e)},D=function(t){var e,n,r,o,c,l,m,code,d=x(t,"number");if(f(d))throw T("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=L(d),43===(e=S(d,0))||45===e){if(88===(n=S(d,2))||120===n)return NaN}else if(48===e){switch(S(d,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+d}for(l=(c=P(d,2)).length,m=0;m<l;m++)if((code=S(c,m))<48||code>o)return NaN;return parseInt(c,r)}return+d};if(l(I,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var M,A=function(t){var e=arguments.length<1?0:N(W(t)),n=this;return v(R,n)&&y((function(){C(n)}))?h(Object(e),n,A):e},E=r?w(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),O=0;E.length>O;O++)d(N,M=E[O])&&!d(A,M)&&k(A,M,_(N,M));A.prototype=R,R.constructor=A,m(o,I,A)}},269:function(t,e,n){var r=n(3),o=n(23),c=n(13),l=n(270),m=r("".replace),d="["+l+"]",h=RegExp("^"+d+d+"*"),v=RegExp(d+d+"*$"),f=function(t){return function(e){var n=c(o(e));return 1&t&&(n=m(n,h,"")),2&t&&(n=m(n,v,"")),n}};t.exports={start:f(1),end:f(2),trim:f(3)}},270:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},271:function(t,e,n){var content=n(277);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("32c52bf2",content,!0,{sourceMap:!1})},273:function(t,e,n){var r=n(3);t.exports=r(1..valueOf)},274:function(t,e,n){var content=n(285);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("0cc03581",content,!0,{sourceMap:!1})},276:function(t,e,n){"use strict";n(271)},277:function(t,e,n){var r=n(59)(!1);r.push([t.i,".draggableSurface[data-v-aaed3eb8]{position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%}",""]),t.exports=r},281:function(t,e,n){"use strict";n.r(e);var r=n(2).a.extend({name:"DraggableComponent",data:function(){return{moveSubscribe:!1}},methods:{onDragStart:function(){this.moveSubscribe=!0,window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},onMouseMove:function(t){if(this.moveSubscribe){var e=function(t,e,n){return Math.min(Math.max(t,e),n)},n=this.$refs.surface,r=n.getBoundingClientRect(),o=e((t.clientX-r.left)/n.clientWidth,0,1),c=e((t.clientY-r.top)/n.clientHeight,0,1);this.$emit("newLocation",{x:t.clientX,y:t.clientY,percentX:o,percentY:c})}},onMouseUp:function(t){this.onMouseMove(t),this.moveSubscribe=!1}}}),o=(n(276),n(50)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"surface",staticClass:"draggableSurface",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.onDragStart.apply(null,arguments)}}})}),[],!1,null,"aaed3eb8",null);e.default=component.exports},284:function(t,e,n){"use strict";n(274)},285:function(t,e,n){var r=n(59)(!1);r.push([t.i,".playbackControlsComponent[data-v-26d10e61]{display:inline-flex;flex-direction:column;max-width:100%;width:700px}.playbackControlsComponent .markerRow[data-v-26d10e61]{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.playbackControlsComponent .markerRow .marker[data-v-26d10e61]{display:flex;justify-content:space-between;flex-shrink:1;flex-basis:0}.playbackControlsComponent .markerRow .marker p[data-v-26d10e61]{display:inline-block}.playbackControlsComponent .statusRow[data-v-26d10e61]{display:inline-block;align-self:center}.playbackControlsComponent .progressWrapper[data-v-26d10e61]{display:block;width:100%;position:relative}.playbackControlsComponent .progressWrapper .progressRow[data-v-26d10e61]{display:flex;flex-direction:row;width:100%}.playbackControlsComponent .progressWrapper .progressRow .progressCell[data-v-26d10e61]{display:block;flex-shrink:1;flex-basis:0}.playbackControlsComponent .progressWrapper .progressRow .progressCell input[type=range][data-v-26d10e61]{display:block;width:100%}.playbackControlsComponent .progressWrapper .chapterTitles[data-v-26d10e61]{display:flex;flex-direction:row}.playbackControlsComponent .progressWrapper .chapterTitles p.title[data-v-26d10e61]{flex-shrink:1;flex-basis:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.playbackControlsComponent .controlsRow[data-v-26d10e61]{display:inline-flex;flex-direction:row;align-items:center;justify-content:space-around}",""]),t.exports=r},286:function(t,e,n){var r=n(6),o=n(287),c=n(107);r({target:"Array",proto:!0},{fill:o}),c("fill")},287:function(t,e,n){"use strict";var r=n(30),o=n(79),c=n(37);t.exports=function(t){for(var e=r(this),n=c(e),l=arguments.length,m=o(l>1?arguments[1]:void 0,n),d=l>2?arguments[2]:void 0,h=void 0===d?n:o(d,n);h>m;)e[m++]=t;return e}},288:function(t,e,n){"use strict";n.r(e);var r=n(21),o=(n(11),n(51),n(62),n(2).a.extend({name:"PlaybackControls",data:function(){return{symbols:{START:"⏮",BACK:"⏪",PLAY:"▶",PAUSE:"⏸",FORWARD:"⏩",END:"⏭"},value:0,isPlaying:!1,speed:1,timerInterval:void 0,shifting:!1}},watch:{value:function(){this.$emit("playbackProgress",this.value)},max:function(){this.value=this.max,this.isPlaying=!1,this.$emit("playbackProgress",this.value)}},computed:{max:function(){return this.chapters.map((function(t){return t.steps})).reduce((function(t,e){return t+e}),0)}},props:{chapters:{required:!0,type:Array,default:function(){return[]}}},methods:{startOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e},endOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e+=this.chapters[t].steps},nextStep:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=function(t,e){return(t%e+e)%e};this.value=e(this.value+t,this.max+1)},nextSpeed:function(){var t=this;if(this.shifting)return this.prevSpeed();!function(){switch(t.speed){case 1:return t.speed=2;case 2:return t.speed=4;case 4:return t.speed=8;case 8:return t.speed=16;case 16:return t.speed=32;case 32:return t.speed=.25;case.25:return t.speed=.5;case.5:t.speed=1}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},prevSpeed:function(){var t=this;!function(){switch(t.speed){case 1:return t.speed=.5;case 2:return t.speed=1;case 4:return t.speed=2;case 8:return t.speed=4;case 16:return t.speed=8;case 32:return t.speed=16;case.25:return t.speed=32;case.5:t.speed=.25}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},togglePlayPause:function(){this.isPlaying?this.stopPlayback():this.startPlayback()},startPlayback:function(){var t=this;this.timerInterval||(this.timerInterval=setInterval((function(){t.isPlaying&&t.nextStep()}),1/this.speed*1e3)),this.isPlaying=!0},stopPlayback:function(){this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=void 0,this.isPlaying=!1},step:function(t){this.isPlaying&&this.stopPlayback(),this.nextStep(t)},skipStart:function(){this.isPlaying&&this.stopPlayback(),this.value=0},skipEnd:function(){this.isPlaying&&this.stopPlayback(),this.value=this.max},updateValue:function(t,e){this.value=t.target.value},progressJump:function(data){this.value=Math.round(data.percentX*this.max)},onKeyDown:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1},onKeyUp:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1}},mounted:function(){this.value=this.max,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},destroyed:function(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.stopPlayback()}})),c=o,l=(n(284),n(50)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"playbackControlsComponent"},[n("div",{staticClass:"markerRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"marker",style:{"flex-grow":e.steps}},[0==r?n("p",[t._v(t._s(0))]):n("p"),t._v(" "),n("p",[t._v(t._s(t.endOfChapter(e)))])])})),0),t._v(" "),n("div",{staticClass:"statusRow"},[n("p",[t._v("Step: "+t._s(t.value))])]),t._v(" "),n("div",{staticClass:"progressWrapper js"},[n("div",{staticClass:"progressRowWrapper"},[n("div",{staticClass:"progressRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"progressCell",style:{"flex-grow":e.steps}},[n("input",{ref:"progress",refInFor:!0,staticClass:"progressBar",class:{active:t.value>=t.startOfChapter(e)&&(t.value<t.endOfChapter(e)||r==t.chapters.length-1)},style:{"--min":t.startOfChapter(e),"--max":t.endOfChapter(e),"--val":t.value},attrs:{tabindex:"-1",type:"range",step:"1",min:t.startOfChapter(e),max:t.endOfChapter(e)},domProps:{value:t.value},on:{input:t.updateValue}})])})),0),t._v(" "),n("Draggable",{on:{newLocation:t.progressJump}})],1),t._v(" "),n("div",{staticClass:"chapterTitles"},t._l(t.chapters,(function(e,r){return n("p",{key:r,staticClass:"title",style:{"flex-grow":e.steps}},[t._v("\n                "+t._s(e.name)+"\n            ")])})),0)]),t._v(" "),n("div",{staticClass:"controlsRow"},[n("button",{on:{click:function(e){return e.preventDefault(),t.skipStart.apply(null,arguments)}}},[t._v(t._s(t.symbols.START))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(-1)}}},[t._v(t._s(t.symbols.BACK))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.togglePlayPause.apply(null,arguments)}}},[t._v(t._s(t.isPlaying?t.symbols.PAUSE:t.symbols.PLAY))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(1)}}},[t._v(t._s(t.symbols.FORWARD))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.skipEnd.apply(null,arguments)}}},[t._v(t._s(t.symbols.END))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.nextSpeed.apply(null,arguments)}}},[t._v("(x"+t._s(t.speed)+" speed)")])])])}),[],!1,null,"26d10e61",null);e.default=component.exports;installComponents(component,{Draggable:n(281).default})},319:function(t,e,n){var content=n(337);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("fed9d5ec",content,!0,{sourceMap:!1})},336:function(t,e,n){"use strict";n(319)},337:function(t,e,n){var r=n(59)(!1);r.push([t.i,"table[data-v-7f175864]{border-collapse:collapse}.a td[data-v-7f175864],td[data-v-7f175864],th[data-v-7f175864]{border:1px solid #000}.a td[data-v-7f175864]{padding:5px}",""]),t.exports=r},347:function(t,e,n){"use strict";n.r(e);var r=n(22),o=n(8),c=(n(36),n(51),n(268),n(195),n(286),n(76),n(2).a.extend({name:"KnapsackPage",data:function(){return{itemListRaw:[["5","1"],["10","1"],["12","5"],["12","6"]],bottUp:1,threeD:0,maxWeightRaw:3,maxVolumeRaw:3,m:[],m3:[],steps:[],chapter1Length:0}},watch:{itemList:function(){this.calculate()},itemListRaw:function(){this.calculate()},maxWeightRaw:function(){this.calculate()},maxWeight:function(){this.calculate()},maxVolumeRaw:function(){this.calculate()},maxVolume:function(){this.calculate()},bottUp:function(){this.calculate()}},computed:{itemList:function(){return this.itemListRaw.map((function(a){return[Number(a[0]),Number(a[1]),a[2],Number(a[3])]}))},maxWeight:function(){return Number(this.maxWeightRaw)},maxVolume:function(){return Number(this.maxVolumeRaw)}},methods:{addItem:function(){this.itemListRaw.push(["","","",""])},removeItem:function(){this.itemListRaw.splice(-1)},renderCurrentStep:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e.calculate(),!e.steps[t]){n.next=4;break}return n.next=4,e.$renderDiagram(e.steps[t],{parentElement:e.$refs.diagram,replaceContents:!0});case 4:case"end":return n.stop()}}),n)})))()},calculate3D:function(){var t=this,e=Array(this.itemList.length).fill(0).map((function(a){return Array(t.maxWeight+1).fill(0).map((function(a){return Array(t.maxVolume+1).fill(null)}))}));!function n(r,o,c){return-1==r||c<=0||o<=0?0:null!=e[r][o][c]?e[r][o][c]:o<t.itemList[r][1]&&c<t.itemList[r][3]?(e[r][o][c]=n(r-1,o,c),e[r][o][c]):(e[r][o][c]=Math.max(n(r-1,o,c),t.itemList[r][0]+n(r-1,o-t.itemList[r][1],c-t.itemList[r][3])),e[r][o][c])}(this.itemList.length-1,this.maxWeight,this.maxVolume),this.m3=e},calculate:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,i,o,c,l,m,s,d,h,v,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.threeD){e.next=2;break}return e.abrupt("return",t.calculate3D());case 2:for(n=Array(t.itemList.length+1).fill(0).map((function(e){return Array(t.maxWeight+1).fill(0)})),i=0;i<t.maxWeightRaw+1;i++)n[0][i]=0;o=[],l=function(t,e,n){return"".concat(t,' [label="{').concat(e,"|").concat(n,'}"]')},m=function(){for(var e=1;e<n.length;e++)for(var r=c(e-1),o=1;o<t.maxWeight+1;o++){var l=t.itemList[e-1];if(r.stepNoT("item:w","cw","Check if it's bigger",'cw [label="Current Weight: '.concat(o,'"]')),o<l[1])r.stepNoT("item:w","cw","It's bigger",'cw [label="Current Weight: '.concat(o,'"]')),r.step([e-1,o],[e,o],"Set the value"),n[e][o]=n[e-1][o],(r=c(e-1)).stepNoMsg();else{r.stepNoT("item:w","cw","It's smaller",'cw [label="Current Weight: '.concat(o,'"]'));var m=n[e-1][o];r.updateTemp('v1 [label="{m[y-1, x] | '.concat(m,'}"]')),r.stepS(!0,[e-1,o],"v1","Get value");var d=l[0]+n[e-1][o-l[1]];r.updateTemp('v2 [label="{sum|'.concat(d,'}"]')),r.stepNoTs(["item:v","table:t".concat(o-l[1]).concat(e-1)],["v2","v2"],["sum","sum"]);var h=Math.max(m,d);r.updateTemp('max [label="{max|'.concat(h,'}"]')),r.stepNoTs(["v1","v2"],["max","max"],["max","max"]),n[e][o]=h,(r=c(e-1)).updateTemp('max [label="{max|'.concat(h,'}"]')),r.stepS(!1,[e,o],"max","Set Value"),r.resetTemp()}}},s=(c=function(e){var c='node [shape=record]\n table [label="';c+="{";for(var l=0;l<t.itemList.length+2;l++)c+=0==l?"Weight":l>1?"| ".concat(l-1," Items (").concat(t.itemList[l-2][2],")"):"| 0 Items ";c+="}";for(var m=0;m<t.maxWeight+1;m++){c+="|{";for(var d=0;d<t.itemList.length+2;d++)if(0!=d){var h=n[d-1][m];c+=d>0?"|<t".concat(m).concat(d-1,">").concat(h):"<t".concat(m).concat(d-1,">").concat(h)}else c+=d>0?"|".concat(m):"".concat(m);c+="}"}c+='"]';var v=void 0!==e?"".concat(c,'\nitem [label="{ item | {Value | Weight} | {<v>').concat(t.itemList[e][0],"|<w>").concat(t.itemList[e][1],'}}"]'):c,f=v;return{step:function(t,e,n){var c=Object(r.a)(t,2),l=c[0],m=c[1],d=Object(r.a)(e,2),h=d[0],v=d[1];o.push("".concat(f,"\ntable:t").concat(m).concat(l," -> table:t").concat(v).concat(h,' [label="').concat(n,'"]'))},stepS:function(t,e,n,c,l){var m=Object(r.a)(e,2),d=m[0],h=m[1],v=f;l&&(v=f+"\n"+l),t?o.push("".concat(v,"\ntable:t").concat(h).concat(d," -> ").concat(n,' [label="').concat(c,'"]')):o.push("".concat(v,"\n").concat(n," -> table:t").concat(h).concat(d,' [label="').concat(c,'"]'))},stepNoMsg:function(){return o.push(f)},stepNoT:function(t,e,n,r){var c=f;r&&(c=f+"\n"+r),o.push("".concat(c,"\n").concat(t," -> ").concat(e,' [label="').concat(n,'"]'))},resetTemp:function(){return f=v},updateTemp:function(t){return f+="\n"+t},stepNoTs:function(t,e,n,r){var c=f;for(var l in r&&(c=f+"\n"+r),t)c+="\n".concat(t[l]," -> ").concat(e[l],' [label="').concat(n[l],'"]');o.push(c)}}})(),d=function e(r,o){if(0==r)return 0;var m=n[r][o];if(s=c(),0==m){s.step([r,o],[r,o],"It's calculate it's value");var d=t.itemList[r-1];if((s=c(r-1)).updateTemp(l("w","Weight",o)),s.stepNoT("item:w","w","Check if it's bigger!"),d[1]>o)s.step([r,o],[r-1,o],"Calculate the best value that fit's in the bag"),m=e(r-1,o),s.step([r-1,o],[r,o],"Set as the optimal value");else{s.stepNoTs(["table:t".concat(o).concat(r),"item:w"],["table:t".concat(o-d[1]).concat(r-1),"table:t".concat(o-d[1]).concat(r-1)],["It's calculate it's value","Based on it's weight"]);var h=e(r-1,o-d[1]);(s=c(r-1)).updateTemp(l("sum","Sum",d[0]+h)),s.stepNoTs(["item:v","table:t".concat(o-d[1]).concat(r-1)],["sum","sum"],["Sum","Sum"]),s.step([r,o],[r-1,o],"It's calculate it's value");var v=e(r-1,o);(s=c(r-1)).updateTemp(l("sum","Sum",d[0]+h)),m=Math.max(v,d[0]+h),s.updateTemp(l("max","Max",m)),s.stepNoTs(["sum","table:t".concat(o).concat(r-1)],["max","max"],["Max","Max"]),s.stepS(!1,[r,o],"max","Set Value")}}return n[r][o]=m,(s=c()).stepNoMsg(),m},1==t.bottUp?m():d(t.itemList.length,t.maxWeight),t.chapter1Length=o.length,s=c(),h=t.itemList.length,v=t.maxWeight,f=[],s.updateTemp(l("result","Result Items","{".concat(f.map((function(a){return"Item: ".concat(t.itemList[a][2])})),"}"))),s.updateTemp(l("li","Look Index",h)),s.updateTemp(l("lw","Look Weight",v)),s.stepNoMsg();case 20:if(s.stepNoT("li","li","Check if it' not 0"),0!=h){e.next=25;break}return s.stepNoT("li","li","It's 0"),e.abrupt("break",35);case 25:s.step([h-1,v],[h,v],"Check if bigger or equals to"),n[h][v]<=n[h-1][v]?s.step([h-1,v],[h,v],"It's bigger do nothing"):(f.push(h-1),s.resetTemp(),s.updateTemp(l("result","Result Items","{".concat(f.map((function(a){return"Item: ".concat(t.itemList[a][2])})),"}"))),s.updateTemp(l("li","Look Index",h)),s.updateTemp(l("lw","Look Weight",v)),s.stepNoT("li","result","Get the current item add it to the result list"),s=c(h-1),v-=t.itemList[h-1][1],s.updateTemp(l("result","Result Items","{".concat(f.map((function(a){return"Item: ".concat(t.itemList[a][2])})),"}"))),s.updateTemp(l("li","Look Index",h)),s.updateTemp(l("lw","Look Weight",v)),s.stepNoT("item:w","lw","Subtract"),s=c()),s.resetTemp(),h-=1,s.updateTemp(l("result","Result Items","{".concat(f.map((function(a){return"Item: ".concat(t.itemList[a][2])})),"}"))),s.updateTemp(l("li","Look Index",h)),s.updateTemp(l("lw","Look Weight",v)),s.stepNoT("li","li","-1"),e.next=20;break;case 35:o.push("node [shape=record]\n".concat(l("a","Result Items","{".concat(f.map((function(a){return"Item: ".concat(t.itemList[a][2])})),"}")),"\n").concat(l("b","Max Value",n[t.itemList.length][t.maxWeight]))),t.steps=o,t.m=n;case 38:case"end":return e.stop()}}),e)})))()}}})),l=(n(336),n(50)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",[n("thead",[t._m(0),t._v(" "),n("tr",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Value")]),t._v(" "),n("th",[t._v("Weight")]),t._v(" "),t.threeD?n("div",[t._v("\n                    Volume\n                ")]):t._e()])]),t._v(" "),n("tbody",t._l(this.itemListRaw,(function(e,r){return n("tr",{key:r},[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[2],expression:"item[2]"}],domProps:{value:e[2]},on:{input:function(n){n.target.composing||t.$set(e,2,n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[0],expression:"item[0]"}],attrs:{type:"number"},domProps:{value:e[0]},on:{input:function(n){n.target.composing||t.$set(e,0,n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[1],expression:"item[1]"}],attrs:{type:"number"},domProps:{value:e[1]},on:{input:function(n){n.target.composing||t.$set(e,1,n.target.value)}}})]),t._v(" "),t.threeD?n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[3],expression:"item[3]"}],attrs:{type:"number"},domProps:{value:e[3]},on:{input:function(n){n.target.composing||t.$set(e,3,n.target.value)}}})]):t._e()])})),0)]),t._v(" "),n("br"),t._v(" "),n("p",[n("button",{on:{click:this.addItem}},[t._v("Add Item")]),t._v(" "),n("button",{on:{click:this.removeItem}},[t._v("Remove Item")])]),t._v(" "),n("p",[n("label",{attrs:{for:"bottom-up"}},[t._v("\n            Bottom Up?\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.bottUp,expression:"bottUp"}],attrs:{id:"bottom-up",type:"checkbox"},domProps:{checked:Array.isArray(t.bottUp)?t._i(t.bottUp,null)>-1:t.bottUp},on:{change:function(e){var n=t.bottUp,r=e.target,o=!!r.checked;if(Array.isArray(n)){var c=t._i(n,null);r.checked?c<0&&(t.bottUp=n.concat([null])):c>-1&&(t.bottUp=n.slice(0,c).concat(n.slice(c+1)))}else t.bottUp=o}}})]),t._v(" "),n("p",[n("label",{attrs:{for:"bottom-up"}},[t._v("\n            3d?\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.threeD,expression:"threeD"}],attrs:{id:"bottom-up",type:"checkbox"},domProps:{checked:Array.isArray(t.threeD)?t._i(t.threeD,null)>-1:t.threeD},on:{change:function(e){var n=t.threeD,r=e.target,o=!!r.checked;if(Array.isArray(n)){var c=t._i(n,null);r.checked?c<0&&(t.threeD=n.concat([null])):c>-1&&(t.threeD=n.slice(0,c).concat(n.slice(c+1)))}else t.threeD=o}}})]),t._v(" "),n("p",[n("label",{attrs:{for:"max-w"}},[t._v("\n            Max Weight\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.maxWeightRaw,expression:"maxWeightRaw"}],attrs:{id:"max-w",type:"number"},domProps:{value:t.maxWeightRaw},on:{input:function(e){e.target.composing||(t.maxWeightRaw=e.target.value)}}})]),t._v(" "),t.threeD?n("p",[n("label",{attrs:{for:"max-w"}},[t._v("\n            Max Volume\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.maxVolumeRaw,expression:"maxVolumeRaw"}],attrs:{id:"max-w",type:"number"},domProps:{value:t.maxVolumeRaw},on:{input:function(e){e.target.composing||(t.maxVolumeRaw=e.target.value)}}})]):t._e(),t._v(" "),n("br"),t._v(" "),t.threeD?n("div",t._l(this.m3,(function(e,r){return n("table",{key:r+"t",staticClass:"a"},[n("thead",[n("tr",[t._m(1,!0),t._v(" "),t._l(e[0],(function(e,i){return n("th",{key:i},[t._v("\n                        "+t._s(i)+"\n                    ")])}))],2)]),t._v(" "),t._l(e,(function(e,i){return n("tr",{key:"l"+i},[n("td",[t._v("\n                    "+t._s(i)+"\n                ")]),t._v(" "),t._l(e,(function(e,a){return n("td",{key:"c"+i+a},[t._v("\n                    "+t._s(0==i||0==a?0:e)+"\n                ")])}))],2)}))],2)})),0):n("div",[n("transition",{attrs:{name:"fade"}},[this.chapter1Length>0?n("div",[n("ChapterPlaybackControls",{attrs:{chapters:[{name:"Building Matrix",steps:this.chapter1Length},{name:"Finding Optimal Solution",steps:this.steps.length-this.chapter1Length-1}]},on:{playbackProgress:t.renderCurrentStep}}),t._v(" "),n("br"),n("br"),t._v(" "),n("div",{ref:"diagram"})],1):n("div",[n("pre",[t._v("Please enter some values!")])])])],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",{attrs:{colspan:"2"}},[t._v("Items")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("th",[n("table",[n("tr",[n("td",[t._v("Volume")])]),t._v(" "),n("tr",[n("td",[t._v("Weight")]),t._v(" "),n("td",[t._v("/")])])])])}],!1,null,"7f175864",null);e.default=component.exports;installComponents(component,{ChapterPlaybackControls:n(288).default})}}]);