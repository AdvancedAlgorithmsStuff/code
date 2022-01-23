(window.webpackJsonp=window.webpackJsonp||[]).push([[9,3,4],{266:function(t,e,n){var content=n(275);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("32c52bf2",content,!0,{sourceMap:!1})},271:function(t,e,n){var content=n(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("0cc03581",content,!0,{sourceMap:!1})},274:function(t,e,n){"use strict";n(266)},275:function(t,e,n){var r=n(60)(!1);r.push([t.i,".draggableSurface[data-v-aaed3eb8]{position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%}",""]),t.exports=r},276:function(t,e,n){"use strict";n.r(e);var r=n(2).a.extend({name:"DraggableComponent",data:function(){return{moveSubscribe:!1}},methods:{onDragStart:function(){this.moveSubscribe=!0,window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},onMouseMove:function(t){if(this.moveSubscribe){var e=function(t,e,n){return Math.min(Math.max(t,e),n)},n=this.$refs.surface,r=n.getBoundingClientRect(),o=e((t.clientX-r.left)/n.clientWidth,0,1),c=e((t.clientY-r.top)/n.clientHeight,0,1);this.$emit("newLocation",{x:t.clientX,y:t.clientY,percentX:o,percentY:c})}},onMouseUp:function(t){this.onMouseMove(t),this.moveSubscribe=!1}}}),o=(n(274),n(50)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"surface",staticClass:"draggableSurface",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.onDragStart.apply(null,arguments)}}})}),[],!1,null,"aaed3eb8",null);e.default=component.exports},279:function(t,e,n){"use strict";n(271)},280:function(t,e,n){var r=n(60)(!1);r.push([t.i,".playbackControlsComponent[data-v-26d10e61]{display:inline-flex;flex-direction:column;max-width:100%;width:700px}.playbackControlsComponent .markerRow[data-v-26d10e61]{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.playbackControlsComponent .markerRow .marker[data-v-26d10e61]{display:flex;justify-content:space-between;flex-shrink:1;flex-basis:0}.playbackControlsComponent .markerRow .marker p[data-v-26d10e61]{display:inline-block}.playbackControlsComponent .statusRow[data-v-26d10e61]{display:inline-block;align-self:center}.playbackControlsComponent .progressWrapper[data-v-26d10e61]{display:block;width:100%;position:relative}.playbackControlsComponent .progressWrapper .progressRow[data-v-26d10e61]{display:flex;flex-direction:row;width:100%}.playbackControlsComponent .progressWrapper .progressRow .progressCell[data-v-26d10e61]{display:block;flex-shrink:1;flex-basis:0}.playbackControlsComponent .progressWrapper .progressRow .progressCell input[type=range][data-v-26d10e61]{display:block;width:100%}.playbackControlsComponent .progressWrapper .chapterTitles[data-v-26d10e61]{display:flex;flex-direction:row}.playbackControlsComponent .progressWrapper .chapterTitles p.title[data-v-26d10e61]{flex-shrink:1;flex-basis:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.playbackControlsComponent .controlsRow[data-v-26d10e61]{display:inline-flex;flex-direction:row;align-items:center;justify-content:space-around}",""]),t.exports=r},284:function(t,e,n){"use strict";n.r(e);var r=n(21),o=(n(11),n(51),n(63),n(2).a.extend({name:"PlaybackControls",data:function(){return{symbols:{START:"⏮",BACK:"⏪",PLAY:"▶",PAUSE:"⏸",FORWARD:"⏩",END:"⏭"},value:0,isPlaying:!1,speed:1,timerInterval:void 0,shifting:!1}},watch:{value:function(){this.$emit("playbackProgress",this.value)},max:function(){this.value=this.max,this.isPlaying=!1,this.$emit("playbackProgress",this.value)}},computed:{max:function(){return this.chapters.map((function(t){return t.steps})).reduce((function(t,e){return t+e}),0)}},props:{chapters:{required:!0,type:Array,default:function(){return[]}}},methods:{startOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e},endOfChapter:function(t){"object"===Object(r.a)(t)&&(t=this.chapters.indexOf(t));for(var e=0,i=0;i<t;i++)e+=this.chapters[i].steps;return e+=this.chapters[t].steps},nextStep:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=function(t,e){return(t%e+e)%e};this.value=e(this.value+t,this.max+1)},nextSpeed:function(){var t=this;if(this.shifting)return this.prevSpeed();!function(){switch(t.speed){case 1:return t.speed=2;case 2:return t.speed=4;case 4:return t.speed=8;case 8:return t.speed=16;case 16:return t.speed=32;case 32:return t.speed=.25;case.25:return t.speed=.5;case.5:t.speed=1}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},prevSpeed:function(){var t=this;!function(){switch(t.speed){case 1:return t.speed=.5;case 2:return t.speed=1;case 4:return t.speed=2;case 8:return t.speed=4;case 16:return t.speed=8;case 32:return t.speed=16;case.25:return t.speed=32;case.5:t.speed=.25}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},togglePlayPause:function(){this.isPlaying?this.stopPlayback():this.startPlayback()},startPlayback:function(){var t=this;this.timerInterval||(this.timerInterval=setInterval((function(){t.isPlaying&&t.nextStep()}),1/this.speed*1e3)),this.isPlaying=!0},stopPlayback:function(){this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=void 0,this.isPlaying=!1},step:function(t){this.isPlaying&&this.stopPlayback(),this.nextStep(t)},skipStart:function(){this.isPlaying&&this.stopPlayback(),this.value=0},skipEnd:function(){this.isPlaying&&this.stopPlayback(),this.value=this.max},updateValue:function(t,e){this.value=t.target.value},progressJump:function(data){this.value=Math.round(data.percentX*this.max)},onKeyDown:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1},onKeyUp:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1}},mounted:function(){this.value=this.max,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},destroyed:function(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.stopPlayback()}})),c=o,l=(n(279),n(50)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"playbackControlsComponent"},[n("div",{staticClass:"markerRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"marker",style:{"flex-grow":e.steps}},[0==r?n("p",[t._v(t._s(0))]):n("p"),t._v(" "),n("p",[t._v(t._s(t.endOfChapter(e)))])])})),0),t._v(" "),n("div",{staticClass:"statusRow"},[n("p",[t._v("Step: "+t._s(t.value))])]),t._v(" "),n("div",{staticClass:"progressWrapper js"},[n("div",{staticClass:"progressRowWrapper"},[n("div",{staticClass:"progressRow"},t._l(t.chapters,(function(e,r){return n("div",{key:r,staticClass:"progressCell",style:{"flex-grow":e.steps}},[n("input",{ref:"progress",refInFor:!0,staticClass:"progressBar",class:{active:t.value>=t.startOfChapter(e)&&(t.value<t.endOfChapter(e)||r==t.chapters.length-1)},style:{"--min":t.startOfChapter(e),"--max":t.endOfChapter(e),"--val":t.value},attrs:{tabindex:"-1",type:"range",step:"1",min:t.startOfChapter(e),max:t.endOfChapter(e)},domProps:{value:t.value},on:{input:t.updateValue}})])})),0),t._v(" "),n("Draggable",{on:{newLocation:t.progressJump}})],1),t._v(" "),n("div",{staticClass:"chapterTitles"},t._l(t.chapters,(function(e,r){return n("p",{key:r,staticClass:"title",style:{"flex-grow":e.steps}},[t._v("\n                "+t._s(e.name)+"\n            ")])})),0)]),t._v(" "),n("div",{staticClass:"controlsRow"},[n("button",{on:{click:function(e){return e.preventDefault(),t.skipStart.apply(null,arguments)}}},[t._v(t._s(t.symbols.START))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(-1)}}},[t._v(t._s(t.symbols.BACK))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.togglePlayPause.apply(null,arguments)}}},[t._v(t._s(t.isPlaying?t.symbols.PAUSE:t.symbols.PLAY))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(1)}}},[t._v(t._s(t.symbols.FORWARD))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.skipEnd.apply(null,arguments)}}},[t._v(t._s(t.symbols.END))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.nextSpeed.apply(null,arguments)}}},[t._v("(x"+t._s(t.speed)+" speed)")])])])}),[],!1,null,"26d10e61",null);e.default=component.exports;installComponents(component,{Draggable:n(276).default})},289:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(76),n(135),n(51),n(43),n(40),n(11),n(26),n(191),n(64),n(65);var r=function(t,e){return function(n,r,o){var c=o.baseStringProp,l=o.ignoreZero,d=o.prefix,f=o.middle,m=o.extra,v=o.allMiddle,h=o.rankdir,y=[],_={},title=null,w={},k="rank=LR; constraint=false;\n",C=null!=m?m:{},x=[],L=n,M={},A=function(t,e,n,r){var label=r.label,o=r.color,c=[];return label&&c.push('label="'.concat(label,'"')),o&&c.push("color=".concat(o)),"".concat(t,' [shape=point, style=invis, width=0, height=0, label=""]\n').concat(e," -> ").concat(t,"[arrowhead=none, headclip=false, ").concat(c.join(","),', label=""]\n ').concat(t," -> ").concat(n," [tailclip=false, constrain=false,").concat(c.join(","),"]")},P=function(t,e,n){var label=n.label,r=n.color,o=[];return label&&o.push('label="'.concat(label,'"')),r&&o.push("color=".concat(r)),"".concat(t," -> ").concat(e," [").concat(o.join(","),"]")},S=function(){T=k+"\n"+y.join("\n")+"\n"+Object.keys(_).map((function(a){return O(a,_[a][0],_[a][1])})).join("\n")+"\n"+Object.keys(M).map((function(a){return M[a].getCalculated()})).join("\n")+"\n"+(title?'labelloc="t";\nlabel="'.concat(title,'";'):"")},R=function(){k="rank=LR; constraint=false;\n"+(c?c+"\n":"")+"".concat(h?"rankdir=".concat(h,";"):"","\n")+e.map((function(a){return"".concat(null!=d?d:"").concat(a,' [label="').concat(a).concat(C[a]?":".concat(C[a]):"",'"]')})).join("\n")+Object.keys(L).map((function(a){var s=a.split("-");return{o:s[0],d:s[1],cap:L[a]}})).filter((function(a){return!(l&&0==a.cap)})).map((function(a){var t,e;return v||x.includes("".concat(a.o,"_").concat(a.d))?A("".concat(f,"_").concat(a.o,"_").concat(a.d),"".concat(null!=d?d:"").concat(a.o),"".concat(null!=d?d:"").concat(a.d),{label:"".concat(a.cap),color:null!==(t=w["".concat(a.o,"_").concat(a.d)])&&void 0!==t?t:r}):P("".concat(null!=d?d:"").concat(a.o),"".concat(null!=d?d:"").concat(a.d),{label:"".concat(a.cap),color:null!==(e=w["".concat(a.o,"_").concat(a.d)])&&void 0!==e?e:r})})).join("\n"),S()};R();var T=k,j=function(){return t.push(T)},O=function(t,e,n){return"".concat(t,' [shape=record, label="{').concat(e,"|").concat(n,'}"]')};return{linkGraph:function(t,e){M[t]=e,S()},removeLinkGraph:function(t){delete M[t],S()},updateGraph:function(t){L=t,R()},getBaseString:function(){return k},addMiddle:function(s){x.push(s),R()},removeMiddle:function(s){x=x.filter((function(a){return a!=s})),R()},mapColors:function(t){w=t(w),R()},dropVars:function(){_={},S()},stepAction:function(e){t.push("".concat(T,'\n_tempAction [shape=plaintext, label="').concat(e,'"]'))},arrayToList:function(s){return"".concat(s.join("|"))},updateBaseString:R,getCalculated:function(){return T},stepNothing:j,addToList:function(t,e){y.push(t),S(),e&&j()},popList:function(t){y.pop(),S(),t&&j()},createArrow:P,removeVar:function(t){delete _[t],S()},setVar:function(t,e){_[t]&&(_[t][1]=e,S())},updateTitle:function(t){title=t,S()},createVar:function(t,e,n){_[t]=[e,n],S()},createMiddleArrow:A,dicToList:function(s){return"".concat(Object.keys(s).map((function(a){return"".concat(a,": ").concat(s[a])})).join("|"))},setColor:function(t,e){w[t]=e,R()},deleteColor:function(t){delete w[t],R()},updateExtra:function(t){C=t,R()}}}}},290:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(126);var o=n(142),c=n(97);function l(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},311:function(t,e,n){var content=n(326);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("3675998e",content,!0,{sourceMap:!1})},325:function(t,e,n){"use strict";n(311)},326:function(t,e,n){var r=n(60)(!1);r.push([t.i,"table[data-v-230d4796]{border-collapse:collapse}td[data-v-230d4796],th[data-v-230d4796]{border:1px solid #000}",""]),t.exports=r},330:function(t,e,n){"use strict";n.r(e);n(28),n(32),n(45),n(46);var r=n(22),o=n(128),c=n(8),l=n(290),d=(n(193),n(11),n(291),n(29),n(293),n(294),n(295),n(296),n(297),n(298),n(299),n(300),n(301),n(302),n(303),n(304),n(305),n(306),n(307),n(308),n(30),n(44),n(281),n(42),n(76),n(51),n(267),n(26),n(191),n(40),n(282),n(35),n(289));function f(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var v=n(2).a.extend({data:function(){return{itemListRaw:[{origin:"s",destination:"t",capacity:"10"}],errorMsg:!1,steps:[],chapters:[],smart:""}},mounted:function(){var t=this;this.$nextTick((function(){t.itemListRaw=Object(l.a)(t.itemListRaw),t.calculate(),t.renderDiagramStep(t.steps.length-1)}))},methods:{renderDiagramStep:function(t){var e=this;return Object(c.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.steps[t]){n.next=3;break}return n.next=3,e.$renderDiagram(e.steps[t],{parentElement:e.$refs.diagram,replaceContents:!0});case 3:case"end":return n.stop()}}),n)})))()},addItem:function(){this.itemListRaw.push({origin:"",destination:"",capacity:"0"})},removeItem:function(){this.itemListRaw.splice(-1)},calculate:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,c,l,m,v,h,y,_,w,k,C,x,L,M,base,A,P,s,S,R;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.errorMsg=!1,n=new Set,c=f(t.itemList);try{for(c.s();!(l=c.n()).done;)m=l.value,n.add(m.origin),n.add(m.destination)}catch(t){c.e(t)}finally{c.f()}if(n.has("t")&&n.has("s")){e.next=7;break}return t.errorMsg="A s and t node are needed",e.abrupt("return");case 7:(v=Array.from(n)).sort(),h=[],y=Object(d.a)(h,v),_=[{name:"Initial",steps:1}],w={},k={},C={},x=f(t.itemList);try{for(x.s();!(L=x.n()).done;)M=L.value,w["".concat(M.origin,"-").concat(M.destination)]=M.capacity,k["".concat(M.origin,"-").concat(M.destination)]=0,C["".concat(M.origin,"-").concat(M.destination)]=M.capacity}catch(t){x.e(t)}finally{x.f()}base=y(C,"GREY",{middle:"gm",rankdir:"LR"}),A=y(w,"RED",{middle:"rm"}),P=y(k,"green",{middle:"fm"}),(s=base).updateTitle("Default graph"),s.stepNothing(),s.linkGraph("residual",A),s.linkGraph("flow",P),S=function(){s.updateTitle("Currently Searching");var q=["s"],t=new Set(q),e={};for(s.createVar("_q","Queue","s"),s.createVar("_v","Visited","s"),s.createVar("_parent","Parent",""),s.stepAction("Check if the Queue is not empty");0!==q.length;){var n=q,r=Object(o.a)(n),c=r[0];q=r.slice(1),s.createVar("_top","Value",c),s.setVar("_q",s.arrayToList(q)),s.addToList(s.createArrow("_q","_top",{}),!0),s.popList();var l,d=f(v);try{for(d.s();!(l=d.n()).done;){var m=l.value;s.createVar("_item","Item",m),s.addToList(s.createArrow(c,m,{label:"Searching"})),w["".concat(c,"-").concat(m)]&&(A.addMiddle("".concat(c,"_").concat(m)),s.addToList(s.createArrow(c,"rm_".concat(c,"_").concat(m),{label:"Check if > 0"}))),s.addToList(s.createArrow(m,"_v",{label:"Check if visited"}),!0),w["".concat(c,"-").concat(m)]>0&&!t.has(m)&&(q.push(m),s.setVar("_q",s.arrayToList(q)),t.add(m),s.setVar("_v",s.arrayToList(Array.from(t))),e[m]=c,s.setVar("_parent",s.dicToList(e))),s.popList(),w["".concat(c,"-").concat(m)]&&(s.popList(),A.removeMiddle("".concat(c,"_").concat(m))),s.popList(!0)}}catch(t){d.e(t)}finally{d.f()}s.removeVar("_item"),s.stepAction("Check if the Queue is not empty")}return s.popList(),s.removeVar("_v"),s.removeVar("_q"),s.createVar("_b",'Search reached \\"t\\"',t.has("t")),_.push({name:"Search",steps:h.length-_.map((function(a){return a.steps})).reduce((function(a,b){return a+b}))}),[t.has("t"),e]},R=function(){var t,e,n,o,c,l,d,f=0;s.createVar("_mxFlow","Max Flow",f);var m=S(),v=Object(r.a)(m,2),b=v[0],y=v[1];s.updateTitle("Current step: Ford Fulkerson");var x="",u="";for(console.log(b,y),s.stepAction('Check if search found \\"t\\"');b;){var L=Number.POSITIVE_INFINITY;for(s.createVar("_bt","Bottleneck",Number.MAX_VALUE),s.stepAction("Update residual graph"),x="t";"s"!=x;x=y[x])u=y[x],s.createVar("_temp","Temp",(null!==(t=C["".concat(u,"-").concat(x)])&&void 0!==t?t:0)-(null!==(e=k["".concat(u,"-").concat(x)])&&void 0!==e?e:0)),C["".concat(u,"-").concat(x)]&&(s.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("gm_".concat(u,"_").concat(x),"_temp",{label:"+"}))),k["".concat(u,"-").concat(x)]&&(P.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("fm_".concat(u,"_").concat(x),"_temp",{label:"-"}))),A.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("_temp","rm_".concat(u,"_").concat(x),{}),!0),w["".concat(u,"-").concat(x)]=(null!==(n=C["".concat(u,"-").concat(x)])&&void 0!==n?n:0)-(null!==(o=k["".concat(u,"-").concat(x)])&&void 0!==o?o:0),w["".concat(x,"-").concat(u)]=null!==(c=k["".concat(u,"-").concat(x)])&&void 0!==c?c:0,A.removeMiddle("".concat(u,"_").concat(x)),C["".concat(u,"-").concat(x)]&&(s.popList(),s.removeMiddle("".concat(u,"_").concat(x))),k["".concat(u,"-").concat(x)]&&(s.popList(),P.removeMiddle("".concat(u,"_").concat(x))),s.popList(),s.removeVar("_temp"),A.updateGraph(w),P.updateGraph(k),k["".concat(u,"-").concat(x)]?(A.addMiddle("".concat(x,"_").concat(u)),P.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("fm_".concat(u,"_").concat(x),"rm_".concat(x,"_").concat(u),{}),!0),A.removeMiddle("".concat(x,"_").concat(u)),P.removeMiddle("".concat(u,"_").concat(x))):(s.createVar("_temp","Temp",0),A.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("_temp","rm_".concat(u,"_").concat(x),{}),!0),A.removeMiddle("".concat(x,"_").concat(u))),s.popList(),s.removeVar("_temp"),s.addToList(s.createArrow("_bt","_bt",{label:"min"})),A.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow("rm_".concat(u,"_").concat(x),"_bt",{label:"min"}),!0),A.removeMiddle("".concat(u,"_").concat(x)),L=Math.min(L,w["".concat(u,"-").concat(x)]),s.setVar("_bt",L),s.popList(),s.popList(!0);for(s.stepAction("Update Flow graph"),x="t";"s"!=x;x=y[x]){u=y[x],s.addMiddle("".concat(u,"_").concat(x)),s.addToList(s.createArrow(u,"gm_".concat(u,"_").concat(x),{label:"Check if > 0"}),!0),s.removeMiddle("".concat(u,"_").concat(x)),s.popList();var M="";P.addMiddle("".concat(u,"_").concat(x)),C["".concat(u,"-").concat(x)]>0?(k["".concat(u,"-").concat(x)]=(null!==(l=k["".concat(u,"-").concat(x)])&&void 0!==l?l:0)+L,M=s.createArrow("_bt","fm_".concat(u,"_").concat(x),{label:"+"})):(k["".concat(u,"-").concat(x)]=(null!==(d=k["".concat(u,"-").concat(x)])&&void 0!==d?d:0)-L,M=s.createArrow("_bt","fm_".concat(u,"_").concat(x),{label:"-"})),P.updateGraph(k),s.addToList(M,!0),P.removeMiddle("".concat(u,"_").concat(x)),s.popList()}f+=L,s.setVar("_mxFlow",f),_.push({name:"Ford Fulkerson",steps:h.length-_.map((function(a){return a.steps})).reduce((function(a,b){return a+b}))});var R=S(),T=Object(r.a)(R,2);b=T[0],y=T[1],s.updateTitle("Current step: Ford Fulkerson"),s.stepAction('Check if search found \\"t\\"')}return f}(),s.dropVars(),s.createVar("_mx","Max Flow",R),s.removeLinkGraph("residual"),s.updateTitle("Result"),s.stepNothing(),_.push({name:"Result",steps:1}),console.log(_),t.steps=h,t.chapters=_;case 37:case"end":return e.stop()}}),e)})))()},smartInsert:function(){var t=this.smart.split(",");3==t.length&&(this.itemListRaw.push({origin:t[0],destination:t[1],capacity:t[2]}),this.smart="")}},computed:{itemList:function(){return this.itemListRaw.map((function(a){return{origin:a.origin.trim(),destination:a.destination.trim(),capacity:Number(a.capacity)}})).filter((function(a){return a.origin&&a.destination&&!isNaN(a.capacity)}))}},watch:{itemList:function(){this.calculate()}}}),h=(n(325),n(50)),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",[t._m(0),t._v(" "),t._l(this.itemListRaw,(function(e,r){return n("tr",{key:r},[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.origin,expression:"item.origin"}],domProps:{value:e.origin},on:{input:function(n){n.target.composing||t.$set(e,"origin",n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.destination,expression:"item.destination"}],domProps:{value:e.destination},on:{input:function(n){n.target.composing||t.$set(e,"destination",n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.capacity,expression:"item.capacity"}],domProps:{value:e.capacity},on:{input:function(n){n.target.composing||t.$set(e,"capacity",n.target.value)}}})])])}))],2),t._v(" "),n("button",{on:{click:t.addItem}},[t._v("Add Item")]),t._v(" "),n("button",{on:{click:t.removeItem}},[t._v("Remove Item")]),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.smart,expression:"smart"}],domProps:{value:t.smart},on:{input:function(e){e.target.composing||(t.smart=e.target.value)}}}),n("button",{on:{click:t.smartInsert}},[t._v("Insert")]),t._v(" "),n("transition",{attrs:{name:"fade"}},[this.errorMsg?n("div",[t._v("\n            "+t._s(this.errorMsg)+"\n        ")]):n("div",[n("ChapterPlaybackControls",{attrs:{chapters:this.chapters},on:{playbackProgress:this.renderDiagramStep}}),t._v(" "),n("div",{ref:"diagram"})],1)])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v("\n                Origin\n            ")]),t._v(" "),n("th",[t._v("\n                Destination\n            ")]),t._v(" "),n("th",[t._v("\n                Capacity\n            ")])])}],!1,null,"230d4796",null);e.default=component.exports;installComponents(component,{ChapterPlaybackControls:n(284).default})}}]);