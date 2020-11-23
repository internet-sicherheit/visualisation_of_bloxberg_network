(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{11:function(e,t,n){e.exports=n(20)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(9),c=n.n(a),s=(n(16),n(3)),l=n(4),i=n(6),u=n(5),p=(n(17),n(1)),g=(n(18),n(10)),d=n(2),f=n.n(d),h=n(7),m=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){return Object(s.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"getData",value:function(){var e=Object(h.a)(f.a.mark((function e(t,n,r){var o,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getContractList(t,n);case 2:return o=e.sent,console.log("Get contractlist:"),console.log(o),e.next=7,this.getTransactionFromContractList(o);case 7:return a=e.sent,console.log("Get transactionlist from contractlist:"),console.log(a),e.abrupt("return",a);case 11:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getContractList",value:function(){var e=Object(h.a)(f.a.mark((function e(t,n){var r,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page="+t+"&offset="+n,e.next=3,fetch(r).then((function(e){return e.json()}));case 3:return o=e.sent,e.abrupt("return",o.result);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getTransactionList",value:function(){var e=Object(h.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address="+t,e.next=3,fetch(n).then((function(e){return e.json()}));case 3:return r=e.sent,console.log("getTransactionList: "+r),e.abrupt("return",null);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTransactionFromContractList",value:function(){var e=Object(h.a)(f.a.mark((function e(t){var n,r,o,a,c,s,l,i,u,p,d,h,m;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=0,o=Object(g.a)(t),e.prev=3,o.s();case 5:if((a=o.n()).done){e.next=22;break}return c=a.value,s="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=",s+=c.Address,e.next=11,fetch(s).then((function(e){return e.json()}));case 11:for(l=e.sent,i=Object.keys(l.result).length,u=l.result,p=0;p<i;p++){for(0===n.length&&n.push({source:u[p].from,target:u[p].to,type:"contract"}),d=0,h=0;h<n.length;h++)n[h].source===u[p].from&&n[h].target===u[p].to&&(d=1);0===d&&""!==u[p].to&&n.push({source:u[p].from,target:u[p].to,type:"contract"})}r++,console.log(n),m=Math.round(100*r/t.length*100)/100,document.getElementById("progress").innerHTML=m+"%",document.getElementById("progress").style.width=m+"%";case 20:e.next=5;break;case 22:e.next=27;break;case 24:e.prev=24,e.t0=e.catch(3),o.e(e.t0);case 27:return e.prev=27,o.f(),e.finish(27);case 30:return e.abrupt("return",n);case 31:case"end":return e.stop()}}),e,null,[[3,24,27,30]])})));return function(t){return e.apply(this,arguments)}}()},{key:"parseHTTPResponse",value:function(e){console.log("parseHTTPresponse");for(var t=[],n=Object.keys(e).length,r=e,o=0;o<n;o++){0===t.length&&t.push({source:r[o].from,target:r[o].to});for(var a=0,c=0;c<t.length;c++)t[c].source===r[o].from&&t[c].target===r[o].to&&(a=1);0===a&&""!==r[o].to&&t.push({source:r[o].from,target:r[o].to})}return t}}]),n}(o.a.Component),v=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).responseObject=null,console.log("Consturctor."),console.log(e),r.responseObject=new m,r}return Object(l.a)(n,[{key:"createGraph",value:function(e){console.log("create graph:");var t=e;console.log("links"),console.log(t);var n={};t.forEach((function(e){e.source=n[e.source]||(n[e.source]={source:e.source}),e.target=n[e.target]||(n[e.target]={target:e.target,type:e.type})})),console.log(n),document.getElementById("container").innerHTML="";var r=p.select("#container").append("svg").attr("width",1700).attr("height",650).call(p.behavior.zoom().on("zoom",(function(){r.attr("transform","translate("+p.event.translate+") scale("+p.event.scale+")")}))).append("g"),o=p.layout.force().size([1700,650]).nodes(p.values(n)).links(t).on("tick",(function(e){c.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).call(o.drag),a.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y}))})).linkDistance(300).charge((function(e){var t=-200;return 0===e.index&&(t*=2.5),t})).start(),a=r.selectAll(".link").data(t).enter().append("line").attr("class","link"),c=r.selectAll(".node").data(o.nodes()).enter().append("circle").style("fill",(function(e){if("contract"===e.type)return"orange"})).attr("class","node").attr("r",8.5).on("click",(function(e){p.event.stopImmediatePropagation(),"undefined"===typeof e.source?document.getElementById("info").innerHTML="<a href='https://blockexplorer.bloxberg.org/address/"+e.target+"' target='_blank'>"+e.target+"</a>":document.getElementById("info").innerHTML="<a href='https://blockexplorer.bloxberg.org/address/"+e.source+"' target='_blank'>"+e.source+"</a>"}));console.log("graph drawed.")}},{key:"showLoader",value:function(){document.getElementById("info").innerHTML="<br/>",document.getElementById("container").style.visibility="hidden",document.getElementById("progressbar").style.visibility="visible"}},{key:"hideLoader",value:function(){document.getElementById("container").style.visibility="visible",document.getElementById("progressbar").style.visibility="hidden",document.getElementById("progress").style.width="0%",document.getElementById("progress").innerHTML="0%"}},{key:"componentWillMount",value:function(){console.log("Component will mount.")}},{key:"componentDidMount",value:function(){var e=this;console.log("Component did mount."),this.showLoader(),this.responseObject.getData(this.props.page,this.props.offset,this.props.stage).then((function(t){e.hideLoader(),e.createGraph(t)}))}},{key:"componentWillUpdate",value:function(e){var t=this;console.log("Component will update."),this.showLoader(),this.responseObject.getData(e.page,e.offset,e.stage).then((function(e){t.hideLoader(),t.createGraph(e)}))}},{key:"componentDidUpdate",value:function(){console.log("Component did update.")}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{id:"progressbar"},o.a.createElement("div",{id:"progress"})),o.a.createElement("div",{id:"container"}))}}]),n}(o.a.Component),y=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={page:0,offset:0,stage:0},e}return Object(l.a)(n,[{key:"render",value:function(){for(var e=this,t=0!==this.state.page?o.a.createElement(v,{page:this.state.page,offset:this.state.offset,stage:this.state.stage}):null,n=[],r=1;r<=100;r++)n.push(o.a.createElement("option",{key:r,value:r},r));for(var a=[],c=1;c<=1800;c++)a.push(o.a.createElement("option",{key:c,value:c},c));for(var s=[],l=1;l<=5;l++)s.push(o.a.createElement("option",{key:l,value:l},l));return o.a.createElement("div",{className:"App"},o.a.createElement("h1",{className:"title"},"Visualisation of Bloxsberg-Network"),o.a.createElement("div",{id:"input"},o.a.createElement("label",null,"Page:"),o.a.createElement("select",{id:"page_selection",defaultValue:2},n),o.a.createElement("label",null,"Offset:"),o.a.createElement("select",{id:"offset_selection",defaultValue:1},a),o.a.createElement("label",null,"Stage:"),o.a.createElement("select",{id:"stage_selection",defaultValue:1},s),o.a.createElement("input",{type:"submit",id:"button",value:"Start",onClick:function(){var t=document.getElementById("page_selection").value,n=document.getElementById("offset_selection").value,r=document.getElementById("stage_selection").value;console.log("page -> "+t),console.log("offset -> "+n),console.log("stage -> "+r),e.setState({page:t,offset:n,stage:r})}})),o.a.createElement("div",{id:"info"}),o.a.createElement("div",{id:"graph_box"},t))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.2f9af63d.chunk.js.map