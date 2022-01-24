(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{272:function(t,e,n){var content=n(279);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("4fffb91f",content,!0,{sourceMap:!1})},278:function(t,e,n){"use strict";n(272)},279:function(t,e,n){var r=n(59)(!1);r.push([t.i,".playbackControlsComponent[data-v-df4c20f8]{display:inline-flex;flex-direction:column;width:500px}.playbackControlsComponent .statusRow[data-v-df4c20f8]{display:inline-flex;flex-direction:row;align-items:center;justify-content:space-between}.playbackControlsComponent .statusRow p[data-v-df4c20f8]{display:inline-block}.playbackControlsComponent .progressRow[data-v-df4c20f8]{width:100%}.playbackControlsComponent .progressRow input[type=range][data-v-df4c20f8]{display:block;width:100%}.playbackControlsComponent .controlsRow[data-v-df4c20f8]{display:inline-flex;flex-direction:row;align-items:center;justify-content:space-around}",""]),t.exports=r},280:function(t,e,n){"use strict";n.r(e);n(268),n(11),n(78),n(62);var r=n(2).a.extend({name:"PlaybackControls",data:function(){return{symbols:{START:"⏮",BACK:"⏪",PLAY:"▶",PAUSE:"⏸",FORWARD:"⏩",END:"⏭"},speed:1,value:0,isPlaying:!1,timerInterval:void 0,shifting:!1}},watch:{value:function(){this.$emit("playbackProgress",this.value)},max:function(){this.value=this.max,this.isPlaying=!1,this.$emit("playbackProgress",this.value)}},props:{max:{type:Number,required:!0}},methods:{nextStep:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=function(t,e){return(t%e+e)%e};this.value=e(parseInt(this.value.toString())+t,this.max+1),console.log(this.value)},nextSpeed:function(){var t=this;if(this.shifting)return this.prevSpeed();!function(){switch(t.speed){case 1:return t.speed=2;case 2:return t.speed=4;case 4:return t.speed=8;case 8:return t.speed=16;case 16:return t.speed=32;case 32:return t.speed=.25;case.25:return t.speed=.5;case.5:t.speed=1}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},prevSpeed:function(){var t=this;!function(){switch(t.speed){case 1:return t.speed=.5;case 2:return t.speed=1;case 4:return t.speed=2;case 8:return t.speed=4;case 16:return t.speed=8;case 32:return t.speed=16;case.25:return t.speed=32;case.5:t.speed=.25}}(),this.isPlaying&&(this.stopPlayback(),this.startPlayback())},togglePlayPause:function(){this.isPlaying?this.stopPlayback():this.startPlayback()},startPlayback:function(){var t=this;this.timerInterval||(this.timerInterval=setInterval((function(){t.isPlaying&&t.nextStep()}),1/this.speed*1e3)),this.isPlaying=!0},stopPlayback:function(){this.timerInterval&&clearInterval(this.timerInterval),this.timerInterval=void 0,this.isPlaying=!1},step:function(t){this.isPlaying&&this.stopPlayback(),this.nextStep(t)},skipStart:function(){this.isPlaying&&this.stopPlayback(),this.value=0},skipEnd:function(){this.isPlaying&&this.stopPlayback(),this.value=this.max},updateValue:function(t){this.value=parseInt(t.target.value)},onKeyDown:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1},onKeyUp:function(t){t.shiftKey?this.shifting=!0:this.shifting=!1}},mounted:function(){this.value=this.max,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},destroyed:function(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.stopPlayback()}}),o=r,c=(n(278),n(50)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"playbackControlsComponent"},[n("div",{staticClass:"statusRow"},[n("p",[t._v("0")]),t._v(" "),n("p",[t._v("Step: "+t._s(t.value))]),t._v(" "),n("p",[t._v(t._s(t.max))])]),t._v(" "),n("div",{staticClass:"progressRow js"},[n("input",{ref:"progress",staticClass:"active",style:{"--min":0,"--max":t.max,"--val":t.value},attrs:{type:"range",step:"1",min:"0",max:t.max},domProps:{value:t.value},on:{input:t.updateValue}})]),t._v(" "),n("div",{staticClass:"controlsRow"},[n("button",{on:{click:function(e){return e.preventDefault(),t.skipStart.apply(null,arguments)}}},[t._v(t._s(t.symbols.START))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(-1)}}},[t._v(t._s(t.symbols.BACK))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.togglePlayPause.apply(null,arguments)}}},[t._v(t._s(t.isPlaying?t.symbols.PAUSE:t.symbols.PLAY))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.step(1)}}},[t._v(t._s(t.symbols.FORWARD))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.skipEnd.apply(null,arguments)}}},[t._v(t._s(t.symbols.END))]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.nextSpeed.apply(null,arguments)}}},[t._v("(x"+t._s(t.speed)+" speed)")])])])}),[],!1,null,"df4c20f8",null);e.default=component.exports},307:function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return l}));var r=n(282),o=(n(76),n(135),n(51),n(40),n(42),n(11),n(25),n(192),n(63),n(64),n(34),n(268),function(t,e){return function(n,o,c){var l=c.baseStringProp,d=c.ignoreZero,f=c.prefix,v=c.middle,h=c.extra,m=c.allMiddle,y=c.rankdir,k=c.pos,_=c.yOffset,w=c.variablePos,x=c.forceVariablePos,P=c.moveVariableDirection,S=[],C={},title=null,A={},L="",j=null!=h?h:{},I=[],R=n,E={},T=function(t,e,n,r){var label=r.label,o=r.color,c=[];return label&&c.push('label="'.concat(label,'"')),o&&c.push("color=".concat(o)),"".concat(t,' [shape=point, style=invis, width=0, height=0, label=""]\n').concat(e," -> ").concat(t,"[arrowhead=none, headclip=false, ").concat(c.join(","),', label=""]\n ').concat(t," -> ").concat(n," [tailclip=false, constrain=false,").concat(c.join(","),"]")},V=function(t,e,n){var label=n.label,r=n.color,o=[];return label&&o.push('label="'.concat(label,'"')),r&&o.push("color=".concat(r)),"".concat(t," -> ").concat(e," [").concat(o.join(","),"]")},N=function(){$=0,D=L+"\n"+S.join("\n")+"\n"+Object.keys(C).map((function(a){return K(a,C[a][0],C[a][1])})).join("\n")+"\n"+Object.keys(E).map((function(a){return E[a].getCalculated()})).join("\n")+"\n"+(title?'labelloc="t";\nlabel="'.concat(title,'";'):"")},O=function(){L=(l?l+"\n":"")+"".concat(y?"rankdir=".concat(y,";"):"","\n")+e.map((function(a){return"".concat(null!=f?f:"").concat(a,' [label="').concat(a).concat(j[a]?":".concat(j[a]):"",'"').concat(k&&k[a]?', pos="'.concat(k[a][0],",").concat(k[a][1]+(null!=_?_:0),'!"'):"","]")})).join("\n")+Object.keys(R).map((function(a){var s=a.split("-");return{o:s[0],d:s[1],cap:R[a]}})).filter((function(a){return!(d&&0==a.cap)})).map((function(a){var t,e;return m||I.includes("".concat(a.o,"_").concat(a.d))?T("".concat(v,"_").concat(a.o,"_").concat(a.d),"".concat(null!=f?f:"").concat(a.o),"".concat(null!=f?f:"").concat(a.d),{label:"".concat(a.cap),color:null!==(t=A["".concat(a.o,"_").concat(a.d)])&&void 0!==t?t:o}):V("".concat(null!=f?f:"").concat(a.o),"".concat(null!=f?f:"").concat(a.d),{label:"".concat(a.cap),color:null!==(e=A["".concat(a.o,"_").concat(a.d)])&&void 0!==e?e:o})})).join("\n"),N()};O();var D=L,M=function(){return t.push(D)},$=0,K=function(t,e,n){var o=Object(r.a)(null!=w?w:[0,0]);"down"==P?o[1]+=$:o[0]+=$;var s="".concat(t,' [shape=record, label="{').concat(e,"|").concat(n,'}"').concat(w?',pos="'.concat(o[0],",").concat(o[1]).concat(x?"!":"",'"'):"","]");return $++,s};return{linkGraph:function(t,e){E[t]=e,N()},removeLinkGraph:function(t){delete E[t],N()},updateGraph:function(t){R=t,O()},getBaseString:function(){return L},addMiddle:function(s){I.push(s),O()},removeMiddle:function(s){I=I.filter((function(a){return a!=s})),O()},mapColors:function(t){A=t(A),O()},dropVars:function(){C={},N()},stepAction:function(e){t.push("".concat(D,'\n_tempAction [shape=plaintext, label="').concat(e,'"]'))},arrayToList:function(s){return"".concat(s.join("|"))},updateBaseString:O,getCalculated:function(){return D},stepNothing:M,addToList:function(t,e){S.push(t),N(),e&&M()},popList:function(t){S.pop(),N(),t&&M()},createArrow:V,removeVar:function(t){delete C[t],N()},setVar:function(t,e){C[t]&&(C[t][1]=e,N())},updateTitle:function(t){title=t,N()},createVar:function(t,e,n){C[t]=[e,n],N()},createMiddleArrow:T,dicToList:function(s){return"".concat(Object.keys(s).map((function(a){return"".concat(a,": ").concat(s[a])})).join("|"))},setColor:function(t,e){A[t]=e,O()},deleteColor:function(t){delete A[t],O()},updateExtra:function(t){j=t,O()}}}}),c=function(t){var e={};return t.forEach((function(a){return e["".concat(a.origin,"-").concat(a.destination)]=Number(a.capacity)})),e},l=function(t){var e={};return t.forEach((function(a){return e["".concat(a.origin,"-").concat(a.destination)]=a.capacity})),e}},318:function(t,e,n){var content=n(335);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("0242739c",content,!0,{sourceMap:!1})},334:function(t,e,n){"use strict";n(318)},335:function(t,e,n){var r=n(59)(!1);r.push([t.i,"table[data-v-2e295f2e]{border-collapse:collapse}td[data-v-2e295f2e],th[data-v-2e295f2e]{border:1px solid #000}",""]),t.exports=r},345:function(t,e,n){"use strict";n.r(e);n(27),n(32),n(45),n(46);var r=n(128),o=n(8),c=(n(36),n(25),n(192),n(195),n(11),n(289),n(28),n(290),n(291),n(292),n(293),n(294),n(295),n(296),n(297),n(298),n(299),n(300),n(301),n(302),n(303),n(304),n(305),n(29),n(44),n(306),n(34),n(268),n(76),n(51),n(41),n(63),n(42),n(40),n(64),n(283),n(2)),l=n(307);function d(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var v=c.a.extend({data:function(){return{itemListRaw:[],errorMsg:!1,steps:[],smart:""}},methods:{smartInsert:function(){var t=this.smart.split(",");3==t.length&&(this.itemListRaw.push({origin:t[0],destination:t[1],capacity:t[2]}),this.smart="")},renderDiagramStep:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.steps[t]){n.next=5;break}return n.next=3,e.$renderDiagram(e.steps[t],{parentElement:e.$refs.diagram,replaceContents:!0});case 3:e.$refs.end.scrollIntoView(),console.log(e.$refs.end.scrollTo);case 5:case"end":return n.stop()}}),n)})))()},addItem:function(){this.itemListRaw.push({origin:"",destination:"",capacity:"0"})},removeItem:function(){this.itemListRaw.splice(-1)},calculate:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,c,f,v,h,m,y,k,_,w,x,P,S,s,C,A,L,j,I,R,E,a,T,V,b,N,O,D,M,$;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("test"),t.errorMsg=!1,n=new Set,o={},c={},f=d(t.itemList),e.prev=6,f.s();case 8:if((v=f.n()).done){e.next=18;break}if(h=v.value,n.add(h.origin),n.add(h.destination),null!=h.origin&&null!=h.destination){e.next=14;break}return e.abrupt("return");case 14:c[h.origin]?c[h.origin].add(h.destination):c[h.origin]=new Set([h.destination]),o[h.destination]?o[h.destination].add(h.origin):o[h.destination]=new Set([h.origin]);case 16:e.next=8;break;case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(6),f.e(e.t0);case 23:return e.prev=23,f.f(),e.finish(23);case 26:if(n.has("t")&&n.has("s")){e.next=29;break}return t.errorMsg="A s and t node are needed",e.abrupt("return");case 29:(m=Array.from(n)).sort(),y={},m.forEach((function(a){return y[a]=Number.POSITIVE_INFINITY})),y.s=0,k=[],_=Object(l.c)(k,m),w={},x=d(t.itemList);try{for(x.s();!(P=x.n()).done;)S=P.value,w["".concat(S.origin,"-").concat(S.destination)]=S.capacity}catch(t){x.e(t)}finally{x.f()}(s=_(w,"black",{extra:y,rankdir:"LR"})).updateTitle("Origin graph"),C="s",A=["s"],L=new Set,j=new Set,s.createVar("_current","Current","s"),s.createVar("_selected","Selected","s"),s.createVar("_options","Options",""),s.stepNothing(),s.updateTitle("Find the values");case 50:0,s.stepAction("Add the possible values form ".concat(C)),I=d(c[C]);try{for(I.s();!(R=I.n()).done;)E=R.value,A.includes(E)||(s.setColor("".concat(C,"_").concat(E),"red"),L.add([C,E]))}catch(t){I.e(t)}finally{I.f()}(a=Array.from(L)).sort((function(a,b){return y[a[0]]+w["".concat(a[0],"-").concat(a[1])]-(y[b[0]]+w["".concat(b[0],"-").concat(b[1])])})),s.setVar("_options",s.arrayToList(a.map((function(a){return"".concat(a[0]," to ").concat(a[1])})))),s.stepNothing();case 58:if(s.stepAction("Check the next best connection"),T=a,V=Object(r.a)(T),b=V[0],N=V.slice(1),a=N,s.setVar("_options",s.arrayToList(a.map((function(a){return"".concat(a[0]," to ").concat(a[1])})))),s.setColor("".concat(b[0],"_").concat(b[1]),"green"),s.stepAction("Using ".concat(b[0]," to ").concat(b[1])),j.add("".concat(b[0],"-").concat(b[1])),y[b[0]]+w["".concat(b[0],"-").concat(b[1])]<y[b[1]]&&(y[b[1]]=y[b[0]]+w["".concat(b[0],"-").concat(b[1])],a.sort((function(a,b){return y[a[0]]+w["".concat(a[0],"-").concat(a[1])]-(y[b[0]]+w["".concat(b[0],"-").concat(b[1])])})),s.updateExtra(y),s.setVar("_options",s.arrayToList(a.map((function(a){return"".concat(a[0]," to ").concat(a[1])})))),s.stepAction("Update value")),!A.includes(b[1])){e.next=78;break}if(0!=a.length){e.next=75;break}return s.stepAction("No Solution found"),t.steps=k,t.renderDiagramStep(t.steps.length-1),e.abrupt("return");case 75:s.stepAction("Continue checking");case 76:e.next=87;break;case 78:return A.push(b[1]),C=b[1],s.setVar("_selected",s.arrayToList(A)),s.setVar("_current",C),s.addToList(s.createArrow("_options","_current",{label:"Set ".concat(C," as current")})),s.addToList(s.createArrow("_options","_selected",{label:"Add ".concat(C," to selected")}),!0),s.popList(),s.popList(),e.abrupt("break",89);case 87:e.next=58;break;case 89:if(L=new Set(a),"t"!=C){e.next=93;break}return s.stepAction("Solution found!"),e.abrupt("break",95);case 93:e.next=50;break;case 95:s.dropVars(),s.setVar("_current","t"),s.stepAction("Find the shortest path"),O="t",C="t",s.updateTitle("Find the shortest path");case 101:if("s"!=C){e.next=104;break}return e.abrupt("break",133);case 104:D=d(o[C]),e.prev=105,D.s();case 107:if((M=D.n()).done){e.next=119;break}if($=M.value,!A.includes($)){e.next=117;break}if(!j.has("".concat($,"-").concat(C))){e.next=117;break}if(y[C]-w["".concat($,"-").concat(C)]!=y[$]){e.next=117;break}return s.setColor("".concat($,"_").concat(C),"blue"),C=$,s.setVar("_current",C),s.stepNothing(),e.abrupt("break",119);case 117:e.next=107;break;case 119:e.next=124;break;case 121:e.prev=121,e.t1=e.catch(105),D.e(e.t1);case 124:return e.prev=124,D.f(),e.finish(124);case 127:if(C!=O){e.next=130;break}return s.stepAction("Something went wrong"),e.abrupt("break",133);case 130:O=C,e.next=101;break;case 133:s.updateTitle("Solution"),s.dropVars(),s.stepNothing(),s.mapColors((function(t){var e={};return Object.keys(t).filter((function(e){return"blue"==t[e]})).forEach((function(t){return e[t]="blue"})),e})),s.stepNothing(),t.steps=k,t.renderDiagramStep(t.steps.length-1);case 140:case"end":return e.stop()}}),e,null,[[6,20,23,26],[105,121,124,127]])})))()}},computed:{itemList:function(){return this.itemListRaw.map((function(a){return{origin:a.origin.trim(),destination:a.destination.trim(),capacity:Number(a.capacity)}})).filter((function(a){return a.origin&&a.destination&&!isNaN(a.capacity)}))}},watch:{itemList:function(){this.calculate()},itemListRaw:function(){this.calculate()}}}),h=(n(334),n(50)),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",[t._m(0),t._v(" "),t._l(this.itemListRaw,(function(e,r){return n("tr",{key:r},[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.origin,expression:"item.origin"}],domProps:{value:e.origin},on:{input:function(n){n.target.composing||t.$set(e,"origin",n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.destination,expression:"item.destination"}],domProps:{value:e.destination},on:{input:function(n){n.target.composing||t.$set(e,"destination",n.target.value)}}})]),t._v(" "),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.capacity,expression:"item.capacity"}],domProps:{value:e.capacity},on:{input:function(n){n.target.composing||t.$set(e,"capacity",n.target.value)}}})])])}))],2),t._v(" "),n("button",{on:{click:t.addItem}},[t._v("Add Item")]),t._v(" "),n("button",{on:{click:t.removeItem}},[t._v("Remove Item")]),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.smart,expression:"smart"}],domProps:{value:t.smart},on:{input:function(e){e.target.composing||(t.smart=e.target.value)}}}),n("button",{on:{click:t.smartInsert}},[t._v("Insert")]),t._v(" "),n("transition",{attrs:{name:"fade"}},[this.errorMsg?n("div",[t._v("\n            "+t._s(this.errorMsg)+"\n        ")]):n("div",[n("PlaybackControls",{attrs:{max:this.steps.length-1},on:{playbackProgress:this.renderDiagramStep}}),t._v(" "),n("div",{ref:"diagram"}),t._v(" "),n("div",{ref:"end"})],1)])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v("\n                Origin\n            ")]),t._v(" "),n("th",[t._v("\n                Destination\n            ")]),t._v(" "),n("th",[t._v("\n                Length\n            ")])])}],!1,null,"2e295f2e",null);e.default=component.exports;installComponents(component,{PlaybackControls:n(280).default})}}]);