(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{11:function(e,t,n){e.exports=n(20)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),c=n.n(o),s=(n(16),n(2)),l=n(3),i=n(5),u=n(4),p=(n(17),n(6)),f=(n(18),n(10)),g=n(1),d=n.n(g),h=n(7),m=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){return Object(s.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"getData",value:function(){var e=Object(h.a)(d.a.mark((function e(t,n,a){var r,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getContractList(t,n);case 2:return r=e.sent,console.log("Get contractlist:"),console.log(r),e.next=7,this.getTransactionFromContractList(r);case 7:return o=e.sent,console.log("Get transactionlist from contractlist:"),console.log(o),e.abrupt("return",o);case 11:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"getContractList",value:function(){var e=Object(h.a)(d.a.mark((function e(t,n){var a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page="+t+"&offset="+n,e.next=3,fetch(a).then((function(e){return e.json()}));case 3:return r=e.sent,e.abrupt("return",r.result);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getTransactionList",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address="+t,e.next=3,fetch(n).then((function(e){return e.json()}));case 3:return a=e.sent,console.log("getTransactionList: "+a),e.abrupt("return",null);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTransactionFromContractList",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var n,a,r,o,c,s,l,i,u,p,g;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],a=Object(f.a)(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=17;break}return o=r.value,c="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=",c+=o.Address,e.next=10,fetch(c).then((function(e){return e.json()}));case 10:for(s=e.sent,l=Object.keys(s.result).length,i=s.result,u=0;u<l;u++){for(0===n.length&&n.push({source:i[u].from,target:i[u].to,type:"contract"}),p=0,g=0;g<n.length;g++)n[g].source===i[u].from&&n[g].target===i[u].to&&(p=1);0===p&&""!==i[u].to&&n.push({source:i[u].from,target:i[u].to,type:"contract"})}console.log(n);case 15:e.next=4;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(2),a.e(e.t0);case 22:return e.prev=22,a.f(),e.finish(22);case 25:return e.abrupt("return",n);case 26:case"end":return e.stop()}}),e,null,[[2,19,22,25]])})));return function(t){return e.apply(this,arguments)}}()},{key:"parseHTTPResponse",value:function(e){console.log("parseHTTPresponse");for(var t=[],n=Object.keys(e).length,a=e,r=0;r<n;r++){0===t.length&&t.push({source:a[r].from,target:a[r].to});for(var o=0,c=0;c<t.length;c++)t[c].source===a[r].from&&t[c].target===a[r].to&&(o=1);0===o&&""!==a[r].to&&t.push({source:a[r].from,target:a[r].to})}return t}}]),n}(r.a.Component),v=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).responseObject=null,console.log("Consturctor."),console.log(e),a.responseObject=new m,a}return Object(l.a)(n,[{key:"createGraph",value:function(e){console.log("create graph:");var t=e;console.log("links"),console.log(t);var n={};t.forEach((function(e){e.source=n[e.source]||(n[e.source]={source:e.source}),e.target=n[e.target]||(n[e.target]={target:e.target,type:e.type})})),console.log(n),document.getElementById("container").innerHTML="";var a=p.select("#container").append("svg").attr("width",1920).attr("height",1080),r=p.layout.force().size([1920,1080]).nodes(p.values(n)).links(t).on("tick",(function(e){c.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).call(r.drag),o.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y}))})).linkDistance(300).charge((function(e){var t=-200;return 0===e.index&&(t*=2.5),t})).start(),o=a.selectAll(".link").data(t).enter().append("line").attr("class","link"),c=a.selectAll(".node").data(r.nodes()).enter().append("circle").style("fill",(function(e){if("contract"===e.type)return"orange"})).attr("class","node").attr("r",9.6).on("click",(function(e){"undefined"===typeof e.source?document.getElementById("info").innerHTML=e.target:document.getElementById("info").innerHTML=e.source}));console.log("graph drawed.")}},{key:"showLoader",value:function(){document.getElementById("container").style.visibility="hidden",document.getElementById("loader").style.visibility="visable",document.getElementById("loader").style.height="100px",document.getElementById("loader").style.width="100px"}},{key:"hideLoader",value:function(){document.getElementById("container").style.visibility="visable",document.getElementById("loader").style.visibility="hidden",document.getElementById("loader").style.height="0px",document.getElementById("loader").style.width="0px"}},{key:"componentWillMount",value:function(){console.log("Component will mount.")}},{key:"componentDidMount",value:function(){var e=this;console.log("Component did mount."),this.responseObject.getData(this.props.page,this.props.offset,this.props.stage).then((function(t){e.createGraph(t)}))}},{key:"componentWillUpdate",value:function(e){var t=this;console.log("Component will update."),this.responseObject.getData(e.page,e.offset,e.stage).then((function(e){t.createGraph(e)}))}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"info"}),r.a.createElement("div",{id:"container"}))}}]),n}(r.a.Component),y=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={page:0,offset:0,stage:0},e}return Object(l.a)(n,[{key:"render",value:function(){for(var e=this,t=0!==this.state.page?r.a.createElement(v,{page:this.state.page,offset:this.state.offset,stage:this.state.stage}):null,n=[],a=1;a<=100;a++)n.push(r.a.createElement("option",{key:a,value:a},a));for(var o=[],c=1;c<=1800;c++)o.push(r.a.createElement("option",{key:c,value:c},c));for(var s=[],l=1;l<=5;l++)s.push(r.a.createElement("option",{key:l,value:l},l));return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"title"},"Visualisation of Bloxsberg-Network"),r.a.createElement("div",{id:"input"},r.a.createElement("label",null,"Page:"),r.a.createElement("select",{id:"page_selection",defaultValue:2},n),r.a.createElement("label",null,"Offset:"),r.a.createElement("select",{id:"offset_selection",defaultValue:1},o),r.a.createElement("label",null,"Stage:"),r.a.createElement("select",{id:"stage_selection",defaultValue:1},s),r.a.createElement("input",{type:"submit",id:"button",value:"Start",onClick:function(){var t=document.getElementById("page_selection").value,n=document.getElementById("offset_selection").value,a=document.getElementById("stage_selection").value;console.log("page -> "+t),console.log("offset -> "+n),console.log("stage -> "+a),e.setState({page:t,offset:n,stage:a})}})),r.a.createElement("div",{id:"graph_box"},t))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.916efb8e.chunk.js.map