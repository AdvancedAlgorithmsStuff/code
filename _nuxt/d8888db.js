(window.webpackJsonp=window.webpackJsonp||[]).push([[8,3,4],{266:function(t,e,n){var content=n(275);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("32c52bf2",content,!0,{sourceMap:!1})},267:function(t,e,n){"use strict";var r=n(12),o=n(1),c=n(3),l=n(105),m=n(19),f=n(15),v=n(190),d=n(41),h=n(106),y=n(192),x=n(4),w=n(77).f,_=n(34).f,k=n(17).f,C=n(273),I=n(268).trim,T="Number",N=o.Number,P=N.prototype,S=o.TypeError,R=c("".slice),L=c("".charCodeAt),W=function(t){var e=y(t,"number");return"bigint"==typeof e?e:E(e)},E=function(t){var e,n,r,o,c,l,m,code,f=y(t,"number");if(h(f))throw S("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=I(f),43===(e=L(f,0))||45===e){if(88===(n=L(f,2))||120===n)return NaN}else if(48===e){switch(L(f,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+f}for(l=(c=R(f,2)).length,m=0;m<l;m++)if((code=L(c,m))<48||code>o)return NaN;return parseInt(c,r)}return+f};if(l(T,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var M,A=function(t){var e=arguments.length<1?0:N(W(t)),n=this;return d(P,n)&&x((function(){C(n)}))?v(Object(e),n,A):e},O=r?w(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),U=0;O.length>U;U++)f(N,M=O[U])&&!f(A,M)&&k(A,M,_(N,M));A.prototype=P,P.constructor=A,m(o,T,A)}},268:function(t,e,n){var r=n(3),o=n(23),c=n(13),l=n(269),m=r("".replace),f="["+l+"]",v=RegExp("^"+f+f+"*"),d=RegExp(f+f+"*$"),h=function(t){return function(e){var n=c(o(e));return 1&t&&(n=m(n,v,"")),2&t&&(n=m(n,d,"")),n}};t.exports={start:h(1),end:h(2),trim:h(3)}},269:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},271:function(t,e,n){var content=n(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("0cc03581",content,!0,{sourceMap:!1})},273:function(t,e,n){var r=n(3);t.exports=r(1..valueOf)},274:function(t,e,n){"use strict";n(266)},275:function(t,e,n){var r=n(60)(!1);r.push([t.i,".draggableSurface[data-v-aaed3eb8]{position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%}",""]),t.exports=r},276:function(t,e,n){"use strict";n.r(e);var r=n(2).a.extend({name:"DraggableComponent",data:function(){return{moveSubscribe:!1}},methods:{onDragStart:function(){this.moveSubscribe=!0,window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},onMouseMove:function(t){if(this.moveSubscribe){var e=function(t,e,n){return Math.min(Math.max(t,e),n)},n=this.$refs.surface,r=n.getBoundingClientRect(),o=e((t.clientX-r.left)/n.clientWidth,0,1),c=e((t.clientY-r.top)/n.clientHeight,0,1);this.$emit("newLocation",{x:t.clientX,y:t.clientY,percentX:o,percentY:c})}},onMouseUp:function(t){this.onMouseMove(t),this.moveSubscribe=!1}}}),o=(n(274),n(50)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"surface",staticClass:"draggableSurface",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.onDragStart.apply(null,arguments)}}})}),[],!1,null,"aaed3eb8",null);e.default=component.exports},279:function(t,e,n){"use strict";n(271)},280:function(t,e,n){var r=n(60)(!1);r.push([t.i,".playbackControlsComponent[data-v-26d10e61]{display:inline-flex;flex-direction:column;max-width:100%;width:700px}.playbackControlsComponent .markerRow[data-v-26d10e61]{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.playbackControlsComponent .markerRow .marker[data-v-26d10e61]{display:flex;justify-content:space-between;flex-shrink:1;flex-basis:0}.playbackControlsComponent .markerRow .marker p[data-v-26d10e61]{display:inline-block}.playbackControlsComponent .statusRow[data-v-26d10e61]{display:inline-block;align-self:center}.playbackControlsComponent .progressWrapper[data-v-26d10e61]{display:block;width:100%;position:relative}.playbackControlsComponent .progressWrapper .progressRow[data-v-26d10e61]{display:flex;flex-direction:row;width:100%}.playbackControlsComponent .progressWrapper .progressRow .progressCell[data-v-26d10e61]{display:block;flex-shrink:1;flex-basis:0}.playbackControlsComponent .progressWrapper .progressRow .progressCell input[type=range][data-v-26d10e61]{display:block;width:100%}.playbackControlsComponent .progressWrapper .chapterTitles[data-v-26d10e61]{display:flex;flex-direction:row}.playbackControlsComponent .progressWrapper .chapterTitles p.title[data-v-26d10e61]{flex-shrink:1;flex-basis:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.playbackControlsComponent .controlsRow[data-v-26d10e61]{display:inline-flex;flex-direction:row;align-items:center;justify-content:space-around}",""]),t.exports=r},281:function(t,e,n){"use strict";var r=n(6),o=n(3),c=n(59),l=n(27),m=n(36),f=n(13),v=n(4),d=n(194),h=n(137),y=n(285),x=n(286),w=n(79),_=n(287),k=[],C=o(k.sort),I=o(k.push),T=v((function(){k.sort(void 0)})),N=v((function(){k.sort(null)})),P=h("sort"),S=!v((function(){if(w)return w<70;if(!(y&&y>3)){if(x)return!0;if(_)return _<603;var code,t,e,n,r="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)k.push({k:t+n,v:e})}for(k.sort((function(a,b){return b.v-a.v})),n=0;n<k.length;n++)t=k[n].k.charAt(0),r.charAt(r.length-1)!==t&&(r+=t);return"DGBEFHACIJK"!==r}}));r({target:"Array",proto:!0,forced:T||!N||!P||!S},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(S)return void 0===t?C(e):C(e,t);var n,r,o=[],v=m(e);for(r=0;r<v;r++)r in e&&I(o,e[r]);for(d(o,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:f(e)>f(n)?1:-1}}(t)),n=o.length,r=0;r<n;)e[r]=o[r++];for(;r<v;)delete e[r++];return e}})},284:function(t,e,n){"use strict";n.r(e);var r=n(21),o=(n(11),n(51),n(63),n(2).a.extend({name:"PlaybackControls",data:function(){return{symbols:{START:"⏮",BACK:"⏪",PLAY:"▶",PAUSE:"⏸",FORWARD:"⏩",END:"⏭"},value:0,isPlaying:!1,speed:1,timerInterval:void 0,shifting:!1}},watch:{value:function(){this.$emit("playbackProgress",this.value)},max:function(){this.value=this.max,this.isPlaying=!1,this.$emit("playbackProgress",this.value)}},computed:{max:function(){return this.chapters.map((function(t){return t.steps})).reduce((function(t,e){return t+e}),0)}},props:{chapters:{required:!0,type:Array,default:function(){return[]}}},methods:{startOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e},endOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e+=this.chapters[t].steps},nextStep:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=function(t,e){return(t%e+e)%e};this.value=e(this.value+t,this.max+1)},nextSpeed:function(){var t=this;if(this.shifting)return this.prevSpeed();!function(){switch(t.speed){case 1:return t.speed=2;case 2:return t.speed=4;case 4:return t.speed=8;case 8:return t.speed=16;case 16:return t.speed=32;case 32:return t.speed=.25;case.25:return t.speed=.5;case.5:t.speed=1}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},prevSpeed:function(){var t=this;!function(){switch(t.speed){case 1:return t.speed=.5;case 2:return t.speed=1;case 4:return t.speed=2;case 8:return t.speed=4;case 16:return t.speed=8;case 32:return t.speed=16;case.25:return t.speed=32;case.5:t.speed=.25}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},togglePlayPause:function(){this.isPlaying?this.stopPlayback():this.startPlayback()},startPlayback:function(){var t=this;this.timerInterval||(this.timerInterval=setInterval((function(){t.isPlaying&&t.nextStep()}),1/this.speed*1e3)),this.isPlaying=!0},stopPlayback:function(){this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=void 0,this.isPlaying=!1},step:function(t){this.isPlaying&&this.stopPlayback(),this.nextStep(t)},skipStart:function(){this.isPlaying&&this.stopPlayback(),this.value=0},skipEnd:function(){this.isPlaying&&this.stopPlayback(),this.value=this.max},updateValue:function(t,e){this.value=t.target.value},progressJump:function(data){this.value=Math.round(data.percentX*this.max)},onKeyDown:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1},onKeyUp:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1}},mounted:function(){this.value=this.max,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},destroyed:function(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.stopPlayback()}})),c=o,l=(n(279),n(50)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"playbackControlsComponent"},[n("div",{staticClass:"markerRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"marker",style:{"flex-grow":e.steps}},[0==r?n("p",[t._v(t._s(0))]):n("p"),t._v(" "),n("p",[t._v(t._s(t.endOfChapter(e)))])])})),0),t._v(" "),n("div",{staticClass:"statusRow"},[n("p",[t._v("Step: "+t._s(t.value))])]),t._v(" "),n("div",{staticClass:"progressWrapper js"},[n("div",{staticClass:"progressRowWrapper"},[n("div",{staticClass:"progressRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"progressCell",style:{"flex-grow":e.steps}},[n("input",{ref:"progress",refInFor:!0,staticClass:"progressBar",class:{active:t.value>=t.startOfChapter(e)&&(t.value<t.endOfChapter(e)||r==t.chapters.length-1)},style:{"--min":t.startOfChapter(e),"--max":t.endOfChapter(e),"--val":t.value},attrs:{tabindex:"-1",type:"range",step:"1",min:t.startOfChapter(e),max:t.endOfChapter(e)},domProps:{value:t.value},on:{input:t.updateValue}})])})),0),t._v(" "),n("Draggable",{on:{newLocation:t.progressJump}})],1),t._v(" "),n("div",{staticClass:"chapterTitles"},t._l(t.chapters,(function(e,r){return n("p",{key:r,staticClass:"title",style:{"flex-grow":e.steps}},[t._v("\n                "+t._s(e.name)+"\n            ")])})),0)]),t._v(" "),n("div",{staticClass:"controlsRow"},[n("button",{on:{click:function(e){return e.preventDefault(),t.skipStart.apply(null,arguments)}}},[t._v(t._s(t.symbols.START))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(-1)}}},[t._v(t._s(t.symbols.BACK))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.togglePlayPause.apply(null,arguments)}}},[t._v(t._s(t.isPlaying?t.symbols.PAUSE:t.symbols.PLAY))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(1)}}},[t._v(t._s(t.symbols.FORWARD))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.skipEnd.apply(null,arguments)}}},[t._v(t._s(t.symbols.END))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.nextSpeed.apply(null,arguments)}}},[t._v("(x"+t._s(t.speed)+" speed)")])])])}),[],!1,null,"26d10e61",null);e.default=component.exports;installComponents(component,{Draggable:n(276).default})},285:function(t,e,n){var r=n(62).match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},286:function(t,e,n){var r=n(62);t.exports=/MSIE|Trident/.test(r)},287:function(t,e,n){var r=n(62).match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},310:function(t,e,n){var content=n(324);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("866c1af8",content,!0,{sourceMap:!1})},321:function(t,e,n){var r=n(6),o=n(322),c=n(109);r({target:"Array",proto:!0},{fill:o}),c("fill")},322:function(t,e,n){"use strict";var r=n(27),o=n(82),c=n(36);t.exports=function(t){for(var e=r(this),n=c(e),l=arguments.length,m=o(l>1?arguments[1]:void 0,n),f=l>2?arguments[2]:void 0,v=void 0===f?n:o(f,n);v>m;)e[m++]=t;return e}},323:function(t,e,n){"use strict";n(310)},324:function(t,e,n){var r=n(60)(!1);r.push([t.i,"table[data-v-a68120ae]{border-collapse:collapse}td[data-v-a68120ae],th[data-v-a68120ae]{border:1px solid #000}",""]),t.exports=r},329:function(t,e,n){"use strict";n.r(e);var r=n(22),o=n(8),c=(n(35),n(51),n(267),n(281),n(193),n(321),n(76),n(2).a.extend({name:"KnapsackPage",data:function(){return{itemListRaw:[["5","1"],["10","1"],["12","5"],["12","6"]],bottUp:1,maxWeightRaw:3,m:[],steps:[],chapter1Length:0}},watch:{itemList:function(){this.calculate()},maxWeight:function(){this.calculate()},bottUp:function(){this.calculate()}},computed:{itemList:function(){var s=this.itemListRaw.map((function(a){return a.map((function(a){return Number(a)}))}));return s.sort((function(a,b){return a[1]-b[1]})),s},maxWeight:function(){return Number(this.maxWeightRaw)}},methods:{addItem:function(){this.itemListRaw.push(["",""])},removeItem:function(){this.itemListRaw.splice(-1)},renderCurrentStep:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e.calculate(),!e.steps[t]){n.next=4;break}return n.next=4,e.$renderDiagram(e.steps[t],{parentElement:e.$refs.diagram,replaceContents:!0});case 4:case"end":return n.stop()}}),n)})))()},calculate:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,i,o,c,l,m,s,f,v,d,h;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=Array(t.itemList.length+1).fill(0).map((function(e){return Array(t.maxWeight+1).fill(0)})),i=0;i<t.maxWeightRaw+1;i++)n[0][i]=0;o=[],l=function(t,e,n){return"".concat(t,' [label="{').concat(e,"|").concat(n,'}"]')},m=function(){for(var e=1;e<n.length;e++)for(var r=c(e-1),o=1;o<t.maxWeight+1;o++){var l=t.itemList[e-1];if(r.stepNoT("item:w","cw","Check if it's bigger",'cw [label="Current Weight: '.concat(o,'"]')),o<l[1])r.stepNoT("item:w","cw","It's bigger",'cw [label="Current Weight: '.concat(o,'"]')),r.step([e-1,o],[e,o],"Set the value"),n[e][o]=n[e-1][o],(r=c(e-1)).stepNoMsg();else{r.stepNoT("item:w","cw","It's smaller",'cw [label="Current Weight: '.concat(o,'"]'));var m=n[e-1][o];r.updateTemp('v1 [label="{m[y-1, x] | '.concat(m,'}"]')),r.stepS(!0,[e-1,o],"v1","Get value");var f=l[0]+n[e-1][o-l[1]];r.updateTemp('v2 [label="{sum|'.concat(f,'}"]')),r.stepNoTs(["item:v","table:t".concat(o-l[1]).concat(e-1)],["v2","v2"],["sum","sum"]);var v=Math.max(m,f);r.updateTemp('max [label="{max|'.concat(v,'}"]')),r.stepNoTs(["v1","v2"],["max","max"],["max","max"]),n[e][o]=v,(r=c(e-1)).updateTemp('max [label="{max|'.concat(v,'}"]')),r.stepS(!1,[e,o],"max","Set Value"),r.resetTemp()}}},s=(c=function(e){var c='node [shape=record]\n table [label="';c+="{";for(var l=0;l<t.itemList.length+1;l++)c+=l>0?"|Nr. Item: ".concat(l):" / ";c+="}";for(var m=0;m<t.maxWeight+1;m++){c+="|{";for(var f=0;f<t.itemList.length+1;f++){var v=n[f][m];c+=f>0?"|<t".concat(m).concat(f,">").concat(v):"<t".concat(m).concat(f,">").concat(v)}c+="}"}c+='"]';var d=void 0!==e?"".concat(c,'\nitem [label="{ item | {Value | Weight} | {<v>').concat(t.itemList[e][0],"|<w>").concat(t.itemList[e][1],'}}"]'):c,h=d;return{step:function(t,e,n){var c=Object(r.a)(t,2),l=c[0],m=c[1],f=Object(r.a)(e,2),v=f[0],d=f[1];o.push("".concat(h,"\ntable:t").concat(m).concat(l," -> table:t").concat(d).concat(v,' [label="').concat(n,'"]'))},stepS:function(t,e,n,c,l){var m=Object(r.a)(e,2),f=m[0],v=m[1],d=h;l&&(d=h+"\n"+l),t?o.push("".concat(d,"\ntable:t").concat(v).concat(f," -> ").concat(n,' [label="').concat(c,'"]')):o.push("".concat(d,"\n").concat(n," -> table:t").concat(v).concat(f,' [label="').concat(c,'"]'))},stepNoMsg:function(){return o.push(h)},stepNoT:function(t,e,n,r){var c=h;r&&(c=h+"\n"+r),o.push("".concat(c,"\n").concat(t," -> ").concat(e,' [label="').concat(n,'"]'))},resetTemp:function(){return h=d},updateTemp:function(t){return h+="\n"+t},stepNoTs:function(t,e,n,r){var c=h;for(var l in r&&(c=h+"\n"+r),t)c+="\n".concat(t[l]," -> ").concat(e[l],' [label="').concat(n[l],'"]');o.push(c)}}})(),f=function e(r,o){if(0==r)return 0;var m=n[r][o];if(s=c(),0==m){s.step([r,o],[r,o],"It's calculate it's value");var f=t.itemList[r-1];if((s=c(r-1)).updateTemp(l("w","Weight",o)),s.stepNoT("item:w","w","Check if it's bigger!"),f[1]>o)s.step([r,o],[r-1,o],"Calculate the best value that fit's in the bag"),m=e(r-1,o),s.step([r-1,o],[r,o],"Set as the optimal value");else{s.stepNoTs(["table:t".concat(o).concat(r),"item:w"],["table:t".concat(o-f[1]).concat(r-1),"table:t".concat(o-f[1]).concat(r-1)],["It's calculate it's value","Based on it's weight"]);var v=e(r-1,o-f[1]);(s=c(r-1)).updateTemp(l("sum","Sum",f[0]+v)),s.stepNoTs(["item:v","table:t".concat(o-f[1]).concat(r-1)],["sum","sum"],["Sum","Sum"]),s.step([r,o],[r-1,o],"It's calculate it's value");var d=e(r-1,o);(s=c(r-1)).updateTemp(l("sum","Sum",f[0]+v)),m=Math.max(d,f[0]+v),s.updateTemp(l("max","Max",m)),s.stepNoTs(["sum","table:t".concat(o).concat(r-1)],["max","max"],["Max","Max"]),s.stepS(!1,[r,o],"max","Set Value")}}return n[r][o]=m,(s=c()).stepNoMsg(),m},1==t.bottUp?m():f(t.itemList.length,t.maxWeight),t.chapter1Length=o.length,s=c(),v=t.itemList.length,d=t.maxWeight,h=[],s.updateTemp(l("result","Result Items","{".concat(h.map((function(a){return"Item: ".concat(a+1)})),"}"))),s.updateTemp(l("li","Look Index",v)),s.updateTemp(l("lw","Look Weight",d)),s.stepNoMsg();case 18:if(s.stepNoT("li","li","Check if it' not 0"),0!=v){e.next=23;break}return s.stepNoT("li","li","It's 0"),e.abrupt("break",33);case 23:s.step([v-1,d],[v,d],"Check if bigger or equals to"),n[v][d]<=n[v-1][d]?s.step([v-1,d],[v,d],"It's bigger do nothing"):(h.push(v-1),s.resetTemp(),s.updateTemp(l("result","Result Items","{".concat(h.map((function(a){return"Item: ".concat(a+1)})),"}"))),s.updateTemp(l("li","Look Index",v)),s.updateTemp(l("lw","Look Weight",d)),s.stepNoT("li","result","Get the current item add it to the result list"),s=c(v-1),d-=t.itemList[v-1][1],s.updateTemp(l("result","Result Items","{".concat(h.map((function(a){return"Item: ".concat(a+1)})),"}"))),s.updateTemp(l("li","Look Index",v)),s.updateTemp(l("lw","Look Weight",d)),s.stepNoT("item:w","lw","Subtract"),s=c()),s.resetTemp(),v-=1,s.updateTemp(l("result","Result Items","{".concat(h.map((function(a){return"Item: ".concat(a+1)})),"}"))),s.updateTemp(l("li","Look Index",v)),s.updateTemp(l("lw","Look Weight",d)),s.stepNoT("li","li","-1"),e.next=18;break;case 33:o.push("node [shape=record]\n".concat(l("a","Result Items","{".concat(h.map((function(a){return"Item: ".concat(a+1)})),"}")),"\n").concat(l("b","Max Value",n[t.itemList.length][t.maxWeight]))),t.steps=o,t.m=n;case 36:case"end":return e.stop()}}),e)})))()}}})),l=(n(323),n(50)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",[t._m(0),t._v(" "),n("tbody",t._l(this.itemListRaw,(function(e,r){return n("tr",{key:r},[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[0],expression:"item[0]"}],attrs:{type:"number"},domProps:{value:e[0]},on:{input:function(n){n.target.composing||t.$set(e,0,n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e[1],expression:"item[1]"}],attrs:{type:"number"},domProps:{value:e[1]},on:{input:function(n){n.target.composing||t.$set(e,1,n.target.value)}}})])])})),0)]),t._v(" "),n("br"),t._v(" "),n("table",[t._m(1),t._v(" "),n("tbody",t._l(this.itemList,(function(e,r){return n("tr",{key:r},[n("td",[t._v("\n                    "+t._s(r+1)+"\n                ")]),t._v(" "),n("td",[t._v("\n                    "+t._s(e[0])+"\n                ")]),t._v(" "),n("td",[t._v("\n                    "+t._s(e[1])+"\n                ")])])})),0)]),t._v(" "),n("p",[n("button",{on:{click:this.addItem}},[t._v("Add Item")]),t._v(" "),n("button",{on:{click:this.removeItem}},[t._v("Remove Item")])]),t._v(" "),n("p",[n("label",{attrs:{for:"bottom-up"}},[t._v("\n            Bottom Up?\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.bottUp,expression:"bottUp"}],attrs:{id:"bottom-up",type:"checkbox"},domProps:{checked:Array.isArray(t.bottUp)?t._i(t.bottUp,null)>-1:t.bottUp},on:{change:function(e){var n=t.bottUp,r=e.target,o=!!r.checked;if(Array.isArray(n)){var c=t._i(n,null);r.checked?c<0&&(t.bottUp=n.concat([null])):c>-1&&(t.bottUp=n.slice(0,c).concat(n.slice(c+1)))}else t.bottUp=o}}})]),t._v(" "),n("p",[n("label",{attrs:{for:"max-w"}},[t._v("\n            Max Weight\n        ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.maxWeightRaw,expression:"maxWeightRaw"}],attrs:{id:"max-w",type:"number"},domProps:{value:t.maxWeightRaw},on:{input:function(e){e.target.composing||(t.maxWeightRaw=e.target.value)}}})]),t._v(" "),n("br"),t._v(" "),n("transition",{attrs:{name:"fade"}},[this.chapter1Length>0?n("div",[n("ChapterPlaybackControls",{attrs:{chapters:[{name:"Building Matrix",steps:this.chapter1Length},{name:"Finding Optimal Solution",steps:this.steps.length-this.chapter1Length-1}]},on:{playbackProgress:t.renderCurrentStep}}),t._v(" "),n("br"),n("br"),t._v(" "),n("div",{ref:"diagram"})],1):n("div",[n("pre",[t._v("Please enter some values!")])])])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{colspan:"2"}},[t._v("Items")])]),t._v(" "),n("tr",[n("th",[t._v("Value")]),t._v(" "),n("th",[t._v("Weight")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{colspan:"3"}},[t._v("Sorted items")])]),t._v(" "),n("tr",[n("th",[t._v("Item number")]),t._v(" "),n("th",[t._v("Value")]),t._v(" "),n("th",[t._v("Weight")])])])}],!1,null,"a68120ae",null);e.default=component.exports;installComponents(component,{ChapterPlaybackControls:n(284).default})}}]);