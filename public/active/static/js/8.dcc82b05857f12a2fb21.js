webpackJsonp([8],{532:function(t,e,i){function n(t){i(792),i(791)}var a=i(220)(i(714),i(835),n,"data-v-7f2badaf",null);t.exports=a.exports},569:function(t,e,i){t.exports={default:i(600),__esModule:!0}},591:function(t,e,i){t.exports={default:i(641),__esModule:!0}},600:function(t,e,i){i(602),t.exports=i(27).Object.keys},601:function(t,e,i){var n=i(55),a=i(27),r=i(61);t.exports=function(t,e){var i=(a.Object||{})[t]||Object[t],o={};o[t]=e(i),n(n.S+n.F*r(function(){i(1)}),"Object",o)}},602:function(t,e,i){var n=i(146),a=i(70);i(601)("keys",function(){return function(t){return a(n(t))}})},617:function(t,e,i){"use strict";i.d(e,"a",function(){return r});var n=i(591),a=i.n(n),r=function(){return{"reserve.dates":[{required:!0,validator:function(t,e,i){var n=!0,r=!1,o=void 0;try{for(var l,s=a()(e);!(n=(l=s.next()).done);n=!0){var c=l.value,u=[];if(!c.begin&&u.push("\u5f00\u59cb"),!c.end&&u.push("\u7ed3\u675f"),u.length)return i(new Error("\u9884\u7ea6"+u.join("\u3001")+"\u65e5\u671f\u4e0d\u80fd\u4e3a\u7a7a"))}}catch(t){r=!0,o=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw o}}i()}}],"reserve.times":[{required:!0,validator:function(t,e,i){for(var n=0;n<e.length;n++){var a=e[n],r=e[n-1],o=[];if(!a.begin&&o.push("\u5f00\u59cb\u65f6\u95f4"),!a.end&&o.push("\u7ed3\u675f\u65f6\u95f4"),a.num<1&&o.push("\u6570\u91cf"),o.length)return i(new Error("\u9884\u7ea6"+o.join("\u3001")+"\u4e0d\u80fd\u4e3a\u7a7a"));if(a.begin.getTime()>=a.end.getTime())return i(new Error("\u7b2c"+(n+1)+"\u65f6\u95f4\u6bb5\u5f00\u59cb\u65f6\u95f4\u5fc5\u987b\u5c0f\u4e8e\u7ed3\u675f\u65f6\u95f4"));if(r&&r.end.getTime()>=a.begin.getTime())return i(new Error("\u7b2c"+n+"\u3001"+(n+1)+"\u65f6\u95f4\u6bb5\u4e0d\u80fd\u91cd\u5408"))}i()}}],"reserve.sms":[{required:!0,message:"\u9884\u7ea6\u77ed\u4fe1\u6587\u6848\u4e0d\u80fd\u4e3a\u7a7a"}]}}},624:function(t,e,i){"use strict";var n=i(630),a=i(627);e.a={meiyifen:n.a,meijie:a.a}},625:function(t,e,i){"use strict";var n=i(591),a=i.n(n),r={label:"\u5012\u8ba1\u65f6\u62bd\u5956-\u65e5\u5386\u6548\u679c",value:"countdownCalendar",model:function(){return{rule:{path:"",left:"",top:"",width:"",height:""},record:{path:"",left:"",top:"",width:"",height:""},timeBox:{left:"",top:""},timeNums:[],colon:{path:"",width:"",height:""},btn:{path:"",left:"",top:"",width:"",height:""},btnGray:{path:""},period:{path:"",left:"",top:"",width:"",height:""},scroll:{left:"",top:"",phoneColor:"",color:"",bgColor:""},copyright:{path:"",left:"",top:"",width:""},lotteryDialog:{prizeDialog:[],otherDialog:[]}}},rules:function(){return{"rule.path":[{required:!0,message:"\u6d3b\u52a8\u89c4\u5219\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"record.path":[{required:!0,message:"\u4e2d\u5956\u8bb0\u5f55\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"colon.path":[{required:!0,message:"\u5012\u8ba1\u65f6\u5192\u53f7\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"btn.path":[{required:!0,message:"\u5f00\u59cb\u62bd\u5956\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"btnGray.path":[{required:!0,message:"\u5f00\u59cb\u62bd\u5956\u7070\u8272\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"period.path":[{required:!0,message:"\u5f00\u62a2\u65f6\u95f4\u6bb5\u4e0d\u80fd\u4e3a\u7a7a"}],"copyright.path":[{required:!0,message:"\u6700\u7ec8\u89e3\u91ca\u6743\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],timeNums:[{required:!0,validator:function(t,e,i){var n=!0,r=!1,o=void 0;try{for(var l,s=a()(e);!(n=(l=s.next()).done);n=!0){if(""===l.value.path){i(new Error("\u5012\u8ba1\u65f6\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"));break}}}catch(t){r=!0,o=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw o}}i()}}]}}};e.a={config:r,content:function(){return i.e(14).then(i.bind(null,672))},preview:function(){return i.e(20).then(i.bind(null,674))},detail:function(){return i.e(30).then(i.bind(null,673))}}},626:function(t,e,i){"use strict";var n={label:"\u4e0b\u8f7d\u9875",value:"download",model:function(){return{downloadBtn:{path:"",left:"",top:"",width:"",height:""}}},rules:function(){return{"downloadBtn.path":[{required:!0,message:"\u6309\u94ae\u4e0d\u80fd\u4e3a\u7a7a"}]}}};e.a={config:n,content:function(){return i.e(18).then(i.bind(null,675))},preview:function(){return i.e(22).then(i.bind(null,677))},detail:function(){return i.e(29).then(i.bind(null,676))}}},627:function(t,e,i){"use strict";var n=i(653),a=(i.n(n),i(625)),r=i(626),o=i(628),l=i(629);e.a=[a.a,r.a,o.a,l.a]},628:function(t,e,i){"use strict";var n={label:"\u5927\u8f6c\u76d8",value:"lottery",model:function(){return{rotateType:"A",rule:{path:"",left:"",top:"",width:"",height:""},record:{path:"",left:"",top:"",width:"",height:""},plateBg:{path:"",left:"",top:"",width:"",height:""},plate:{path:"",left:"",top:"",width:"",height:"",piece:8},startBtn:{path:"",left:"",top:"",width:"",height:""},pointer:{path:"",left:"",top:"",width:"",height:"",initialAngle:""},times:{left:"",bottom:"",color:""},footer:{path:"",left:"",top:"",height:""},scroll:{top:"",color:"",bgColor:""},copyright:{path:"",left:"",top:"",width:""},lotteryDialog:{prizeDialog:[],otherDialog:[]}}},rules:function(){return{"rule.path":[{required:!0,message:"\u6d3b\u52a8\u89c4\u5219\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"record.path":[{required:!0,message:"\u6211\u7684\u4e2d\u5956\u8bb0\u5f55\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"plateBg.path":[{required:!0,message:"\u8f6c\u76d8\u80cc\u666f\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"plate.path":[{required:!0,message:"\u8f6c\u76d8\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"startBtn.path":[{required:!0,message:"\u5f00\u59cb\u62bd\u5956\u6309\u94ae\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"pointer.path":[{required:!0,message:"\u8f6c\u76d8\u6307\u9488\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}],"copyright.path":[{required:!0,message:"\u6700\u7ec8\u89e3\u91ca\u6743\u56fe\u7247\u4e0d\u80fd\u4e3a\u7a7a"}]}}};e.a={config:n,content:function(){return i.e(15).then(i.bind(null,678))},preview:function(){return i.e(19).then(i.bind(null,680))},detail:function(){return i.e(28).then(i.bind(null,679))}}},629:function(t,e,i){"use strict";var n={label:"\u6ce8\u518c\u8868\u5355",value:"registerForm",model:function(){return{left:0,top:0,iconColor:"",sendCodeBtn:{color:"",bgColor:""},button:{path:"",top:0,width:0,height:0,toPage:""}}},rules:function(){return{"sendCodeBtn.bgColor":[{required:!0,message:"\u53d1\u9001\u9a8c\u8bc1\u7801\u80cc\u666f\u4e0d\u80fd\u4e3a\u7a7a"}],"button.path":[{required:!0,message:"\u6ce8\u518c\u6309\u94ae\u4e0d\u80fd\u4e3a\u7a7a"}],"button.toPage":[{required:!0,message:"\u6ce8\u518c\u6210\u529f\u540e\u8df3\u8f6c\u9875\u9762\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a"}]}}};e.a={config:n,content:function(){return i.e(17).then(i.bind(null,681))},preview:function(){return i.e(26).then(i.bind(null,683))},detail:function(){return i.e(27).then(i.bind(null,682))}}},630:function(t,e,i){"use strict";var n=i(631),a=i(632);e.a=[n.a,a.a]},631:function(t,e,i){"use strict";var n=i(94),a=i.n(n),r=i(617),o={label:"\u8df3\u8f6c\u9884\u7ea6",value:"reserveButton",model:function(){return{path:"",link:"",width:0,height:0,left:0,top:0,reserve:{dates:[],times:[],sms:""}}},rules:function(){return a()({path:[{required:!0,message:"\u9884\u7ea6\u6309\u94ae\u4e0d\u80fd\u4e3a\u7a7a"}]},i.i(r.a)())}};e.a={config:o,content:function(){return i.e(16).then(i.bind(null,684))},preview:function(){return i.e(24).then(i.bind(null,686))},detail:function(){return i.e(25).then(i.bind(null,685))}}},632:function(t,e,i){"use strict";var n=i(94),a=i.n(n),r=i(617),o={label:"\u8868\u5355\u9884\u7ea6",value:"reserveForm",model:function(){return{left:0,top:0,icon:{color:""},categories:[],button:{path:"",left:0,top:0,width:0,height:0},reserve:{dates:[],times:[],sms:""}}},rules:function(){return a()({"title.text":[{required:!0,message:"\u8868\u5355\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a"}],"button.path":[{required:!0,message:"\u9884\u7ea6\u6309\u94ae\u4e0d\u80fd\u4e3a\u7a7a"}],"title.bgcolor":[{required:!0,message:"\u8868\u5355\u6807\u9898\u80cc\u666f\u8272\u4e0d\u80fd\u4e3a\u7a7a"}],"icon.color":[{required:!0,message:"\u8868\u5355\u56fe\u6807\u989c\u8272\u4e0d\u80fd\u4e3a\u7a7a"}],categories:[{required:!0,message:"\u5546\u54c1\u54c1\u7c7b\u4e0d\u80fd\u4e3a\u7a7a"}]},i.i(r.a)())}};e.a={config:o,content:function(){return i.e(13).then(i.bind(null,687))},preview:function(){return i.e(21).then(i.bind(null,689))},detail:function(){return i.e(23).then(i.bind(null,688))}}},633:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{images:{type:Array,required:!0}},data:function(){return{scale:.5}}}},641:function(t,e,i){i(148),i(147),t.exports=i(643)},643:function(t,e,i){var n=i(36),a=i(227);t.exports=i(27).getIterator=function(t){var e=a(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return n(e.call(t))}},645:function(t,e,i){e=t.exports=i(528)(!1),e.push([t.i,'@font-face{font-family:iconfont;src:url("//at.alicdn.com/t/font_364678_vwn5plnyivz5xw29.eot");src:url("//at.alicdn.com/t/font_364678_vwn5plnyivz5xw29.eot?#iefix") format("embedded-opentype"),url("//at.alicdn.com/t/font_364678_vwn5plnyivz5xw29.woff") format("woff"),url("//at.alicdn.com/t/font_364678_vwn5plnyivz5xw29.ttf") format("truetype"),url("//at.alicdn.com/t/font_364678_vwn5plnyivz5xw29.svg#iconfont") format("svg")}.iconfont{font-family:iconfont!important;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}h3,li,p,ul{padding:0;margin:0}ul{list-style:none}em{font-style:normal}.clearfix{zoom:1}.clearfix:before{display:block;content:""}.clearfix:after{display:table;clear:both;content:""}.fl{float:left}.fr{float:right}.text-center{text-align:center}.relative{position:relative}.activity,.activity-preview{position:relative;height:100%}.activity-preview{width:100%;left:0;top:0}.wrapper{position:absolute;width:100%;height:100%}.position-btn{display:flex;flex-direction:column;justify-content:space-between}.position-btn li{margin-bottom:10px}.position-btn .label{padding-left:30px;padding-right:10px;text-align:center;display:inline-block;color:#666}',""])},646:function(t,e,i){e=t.exports=i(528)(!1),e.push([t.i,".preview[data-v-0d720d7c]{position:relative;width:750px;margin:0 auto;box-shadow:0 0 10px rgba(0,0,0,.2);zoom:.5}.bg img[data-v-0d720d7c]{width:100%;display:block}.main[data-v-0d720d7c]{position:absolute;width:100%;height:100%;left:0;top:0}",""])},653:function(t,e,i){var n=i(645);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(529)("ff7349b6",n,!0)},654:function(t,e,i){var n=i(646);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(529)("3ed441ec",n,!0)},660:function(t,e,i){function n(t){i(654)}var a=i(220)(i(633),i(666),n,"data-v-0d720d7c",null);t.exports=a.exports},666:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"preview"},[t._l(t.images,function(t){return i("div",{staticClass:"bg"},[i("img",{attrs:{src:t.path}})])}),t._v(" "),i("div",{staticClass:"main"},[t._t("default")],2)],2)},staticRenderFns:[]}},714:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(94),a=i.n(n),r=i(569),o=i.n(r),l=i(660),s=i.n(l),c=i(624),u={},p={};o()(c.a).forEach(function(t){c.a[t].forEach(function(t){u[t.config.value+"Detail"]=function(){return{component:t.detail()}},p[t.config.value+"Preview"]=function(){return{component:t.preview()}}})}),e.default={data:function(){return{activity:null}},components:a()({Preview:s.a},u,p),created:function(){var t=this;this.$api.activityDetail(this.$route.params.id).then(function(e){t.activity=e.data.activity})}}},753:function(t,e,i){e=t.exports=i(528)(!1),e.push([t.i,'.activity-detail .el-form-item{margin-bottom:0}.activity-detail .multiple-rows{line-height:28px;padding:5px 0}.activity-detail .el-form-item__label{color:#999;font-size:16px;padding-right:30px}.activity-detail .el-form-item__content{font-size:16px}.activity-detail .group-data{box-shadow:0 0 6px rgba(0,0,0,.2);border-radius:5px;margin:20px 15px 20px 0;padding:20px 0}.activity-detail .group-data .group-title{padding-left:20px;font-size:18px;margin-bottom:10px}.activity-detail .group-data .group-title:before{content:" ";display:inline-block;width:8px;height:8px;background-color:#f09636;border-radius:50%;vertical-align:middle;margin-right:15px}',""])},754:function(t,e,i){e=t.exports=i(528)(!1),e.push([t.i,'.activity-detail[data-v-7f2badaf]{padding:15px 30px}.share-icon[data-v-7f2badaf]{margin-top:12px}.share-icon img[data-v-7f2badaf]{width:100px;height:100px;display:block}.title[data-v-7f2badaf]{height:43px;line-height:43px;font-size:24px;font-weight:700;position:relative;text-align:center;margin-bottom:50px}.title[data-v-7f2badaf]:before{content:" ";display:block;position:absolute;left:0;top:21px;width:100%;height:1px;background-color:#f9d5af;z-index:0}.title span[data-v-7f2badaf]{position:relative;display:inline-block;background-color:#f9d5af;z-index:1;padding:0 20px;border-radius:6px}',""])},791:function(t,e,i){var n=i(753);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(529)("b66d0a3e",n,!0)},792:function(t,e,i){var n=i(754);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(529)("6dba9389",n,!0)},835:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.activity?i("div",{staticClass:"activity-detail"},[i("el-row",[i("el-col",{staticClass:"title"},[i("span",[t._v(t._s(t.activity.title))])]),t._v(" "),i("el-col",{attrs:{span:14}},[i("el-form",{attrs:{"label-width":"180px"}},[i("el-form-item",{attrs:{label:"\u6d3b\u52a8\u6807\u9898"}},[i("div",[t._v(t._s(t.activity.title))])]),t._v(" "),i("el-form-item",{attrs:{label:"\u94fe\u63a5\u751f\u6548\u65f6\u95f4\u6bb5"}},[i("div",[t._v(t._s(t.activity.beginTime)+" - "+t._s(t.activity.endTime))])]),t._v(" "),t.activity.pageData.share.enable?i("div",{staticClass:"group-data share-data"},[i("div",{staticClass:"group-title"},[t._v("\u5206\u4eab\u4fe1\u606f")]),t._v(" "),i("el-form-item",{attrs:{label:"\u5206\u4eab\u6807\u9898"}},[i("div",[t._v(t._s(t.activity.pageData.share.title))])]),t._v(" "),i("el-form-item",{attrs:{label:"\u5206\u4eab\u94fe\u63a5"}},[i("div",[t._v(t._s(t.activity.pageData.share.link))])]),t._v(" "),i("el-form-item",{attrs:{label:"\u5206\u4eab\u63cf\u8ff0"}},[i("div",[t._v(t._s(t.activity.pageData.share.desc))])]),t._v(" "),i("el-form-item",{attrs:{label:"\u5206\u4eab\u56fe\u6807"}},[i("div",{staticClass:"share-icon"},[i("img",{staticClass:"shareIcon",attrs:{src:t.activity.pageData.share.icon.path}})])])],1):t._e(),t._v(" "),t.activity.pageData.template.type?i(t.activity.pageData.template.type+"Detail",{tag:"component",attrs:{data:t.activity.pageData.template.data}}):t._e()],1)],1),t._v(" "),i("el-col",{attrs:{span:9,offset:1}},[i("preview",{attrs:{images:t.activity.pageData.images}},[t.activity.pageData.template.type?i(t.activity.pageData.template.type+"Preview",{tag:"component",attrs:{data:t.activity.pageData.template.data}}):t._e()],1)],1)],1)],1):t._e()},staticRenderFns:[]}}});