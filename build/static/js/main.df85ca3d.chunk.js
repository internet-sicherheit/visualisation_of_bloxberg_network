(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{117:function(e,t,n){},118:function(e,t,n){},207:function(e,t,n){},217:function(e,t,n){e.exports=n(509)},222:function(e,t,n){},223:function(e,t,n){},236:function(e,t){},245:function(e,t){},263:function(e,t){},265:function(e,t){},282:function(e,t){},283:function(e,t){},348:function(e,t){},350:function(e,t){},359:function(e,t){},361:function(e,t){},386:function(e,t){},388:function(e,t){},389:function(e,t){},395:function(e,t){},397:function(e,t){},410:function(e,t){},422:function(e,t){},425:function(e,t){},430:function(e,t){},441:function(e,t){},444:function(e,t){},501:function(e,t){},509:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(210),s=n.n(o),c=(n(222),n(3)),i=n(4),l=n(9),u=n(8),d=n(77),p=n(15),f=(n(223),n(117),n(118),n(11)),h=n.n(f),m=n(20),g=function e(t,n,a,r){Object(c.a)(this,e),this.type=null,this.name=null,this.address=null,this.isVerified=null,this.transactionList=null,this.type=t,this.name=n,this.address=a,this.isVerified=r,this.transactionList=[]},b=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).Web3Url=null,n.URLTransactionList=null,n.URLTransactionInfo=null,n.addressManager=null,n.addressLookUpMap=null,n.web3Url="https://core.bloxberg.org/",n.URLTransactionList="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=",n.URLTransactionInfo="https://blockexplorer.bloxberg.org/api/api?module=transaction&action=gettxinfo&txhash=",n.URLContractSourceCode="https://blockexplorer.bloxberg.org/api/api?module=contract&action=getsourcecode&address=",n.addressManager=null,n.addressLookUpMap=new Map,n}return Object(i.a)(a,[{key:"fetchData",value:function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(this.convertTime(1559567750)),e.next=3,this.initAddressManager(t);case 3:return this.addressManager=e.sent,e.next=6,this.saveTransactions(t);case 6:return e.abrupt("return",this.addressManager);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"initAddressManager",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a,r,o,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=null,e.next=3,this.isContract(t);case 3:return a=e.sent,e.next=6,this.isVerifiedContract(t);case 6:return r=e.sent,e.next=9,this.getContractName(t);case 9:return o=e.sent,e.next=12,this.getAccountName(t);case 12:return s=e.sent,console.log(a),console.log(r),console.log(o),console.log(s),console.log(t),a?(n=new g("Contract",o,t,r),this.addressLookUpMap.set(t,o)):(n=new g("Account",s,t,null),this.addressLookUpMap.set(t,s)),e.abrupt("return",n);case 20:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getAccountName",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a,r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://blockexplorer.bloxberg.org/address/"+t+"/transactions");case 2:return n=e.sent,e.next=5,n.text();case 5:return a=e.sent,'<strong class="mr-4 mb-2 text-dark" title="[a-zA-Z0-9. ]*">',r=a.match('<strong class="mr-4 mb-2 text-dark" title="[a-zA-Z0-9. ]*">'),o=null,null!==r&&(o=r[0].substring(43,r[0].length-2)),e.abrupt("return",o);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTransactions",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.URLTransactionList+t).then((function(e){return e.json()}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTransactionInfo",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.URLTransactionInfo+t).then((function(e){return e.json()}));case 2:return n=e.sent,console.log(n),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"lookUpName",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!==typeof(n=this.addressLookUpMap.get(t))){e.next=18;break}return e.next=4,this.isContract(t);case 4:if(!e.sent){e.next=13;break}return e.next=8,this.getContractName(t);case 8:a=e.sent,n=null!==a?a:t,this.addressLookUpMap.set(t,n),e.next=18;break;case 13:return e.next=15,this.getAccountName(t);case 15:r=e.sent,n=null!==r?r:t,this.addressLookUpMap.set(t,n);case 18:return e.abrupt("return",n);case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"saveTransactions",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a,r,o,s,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getTransactions(t);case 2:n=e.sent,a=Object.keys(n.result).length,r=n.result,o=0;case 6:if(!(o<a)){e.next=18;break}return e.next=9,this.lookUpName(r[o].from);case 9:return s=e.sent,e.next=12,this.lookUpName(r[o].to);case 12:c=e.sent,console.log("from: "+s+", to: "+c),this.addressManager.transactionList.push({from:s,to:c,time:this.convertTime(parseInt(r[o].timeStamp)),input:r[o].input});case 15:o++,e.next=6;break;case 18:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isContract",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var a,r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=!0,""!==t){e.next=5;break}a=!1,e.next=11;break;case 5:return r=n(119),o=new r(new r.providers.HttpProvider(this.web3Url)),e.next=9,o.eth.getCode(t);case 9:"0x"===e.sent&&(a=!1);case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isVerifiedContract",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!0,e.next=3,fetch(this.URLContractSourceCode+t).then((function(e){return e.json()}));case 3:return"undefined"===typeof e.sent.result[0].ContractName&&(n=!1),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getContractName",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.URLContractSourceCode+t).then((function(e){return e.json()}));case 2:return n=e.sent,a=n.result[0].ContractName,e.abrupt("return","undefined"!==typeof a?a:null);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"convertTime",value:function(e){var t=new Date(1e3*e);return(t.getDate()<10?"0"+t.getDate():t.getDate())+"."+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"."+t.getFullYear()+", "+(t.getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}},{key:"test",value:function(){var e=new(n(496))([{type:"event",name:"ISCC",inputs:[{type:"address",name:"actor",internalType:"address",indexed:!0},{type:"bytes",name:"iscc",internalType:"bytes",indexed:!1},{type:"bytes",name:"tophash",internalType:"bytes",indexed:!1}],anonymous:!1},{type:"function",stateMutability:"nonpayable",outputs:[],name:"declare",inputs:[{type:"bytes",name:"iscc",internalType:"bytes"},{type:"bytes",name:"tophash",internalType:"bytes"}]}]).decodeData("0x989cda35000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002400f71201ad85f5a189102b2a76b05434d95a204f077f99ee368d213022628ba1e4fa568600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002022628ba1e4fa56864075e614b5930086944d530ec775adfcc5191ed8e4b38cc6");console.log(e);var t=[0,247,18,1,173,133,245,161,137,16,43,42,118,176,84,52,217,90,32,79,7,127,153,238,54,141,33,48,34,98,139,161,228,250,86,134],a=n(504),r="C23456789rB1ZEFGTtYiAaVvMmHUPWXKDNbcdefghLjkSnopRqsJuQwxyz";r=a.indexCharset(r),console.log(a.encode(247,r));for(var o="",s=0;s<t.length;s++)console.log(s),0!==s&&s%8==0&&(o+="-"),o+=a.encode(t[s],r);console.log("String"),console.log(o),console.log(this.byteToHex(t))}},{key:"byteToHex",value:function(e){return Array.from(e,(function(e){return("0"+(255&e).toString(16)).slice(-2)})).join("")}}]),a}(r.a.Component),v=n(28),y=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).htmlCode="",a.responseObject=null,console.log("Consturctor:"),console.log(e),a.responseObject=new b,a}return Object(i.a)(n,[{key:"renderData",value:function(e){var t=!0===e.isVerified?"verified":"not verified",n=e.transactionList;console.log("Transactions"),console.log(n),document.getElementById("type").innerHTML=e.type,document.getElementById("name").innerHTML=e.name,document.getElementById("address").innerHTML=e.address,document.getElementById("verified").innerHTML=t,null===e.name?document.getElementById("name").style.visibility="hidden":document.getElementById("name").style.visibility="visible",null===e.isVerified?document.getElementById("verified").style.visibility="hidden":document.getElementById("verified").style.visibility="visible";var a=this.getTableHeadlines(n);this.addToHTMLCode('<table class="table" style="table-layout:fixed; word-wrap:break-word;"><thead class="thead-dark"><tr>'),this.addToHTMLCode('<th scope="col">#</th>');for(var r=0;r<a.length;r++)this.addToHTMLCode('<th scope="col">'+a[r]+"</th>");this.addToHTMLCode("</tr></thead><tbody>");for(var o=0;o<n.length;o++)this.addToHTMLCode('<tr><th scope="row">'+(o+1)+"</th><td>"+n[o].from+"</td><td>"+n[o].to+"</td><td>"+n[o].time+"</td><td>"+n[o].input+"</td></tr>");this.addToHTMLCode("</tbody></table>"),document.getElementById("table").innerHTML=this.htmlCode}},{key:"addToHTMLCode",value:function(e){this.htmlCode=this.htmlCode+e}},{key:"getTableHeadlines",value:function(e){var t=[];return Object.keys(e[0]).forEach((function(e){t.push(e)})),t}},{key:"scrollAnimation",value:function(){document.getElementById("type").scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}},{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){var e=this;this.responseObject.fetchData(this.props.address).then((function(t){e.renderData(t),e.scrollAnimation()}))}},{key:"componentWillUpdate",value:function(e){var t=this;this.responseObject.fetchData(e.address).then((function(e){t.renderData(e),t.scrollAnimation()}))}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",{className:"TableCreator"},r.a.createElement("h2",{id:"type"}),r.a.createElement("p",{id:"name"}),r.a.createElement("p",{id:"address"}),r.a.createElement("p",{id:"verified"}),r.a.createElement("div",{id:"table"}))}}]),n}(a.Component),k=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={address:null},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=null!==this.state.address?r.a.createElement(y,{address:this.state.address}):null;return r.a.createElement("div",{className:"AddressViewer"},r.a.createElement("div",{id:"banner"},r.a.createElement("h1",{className:"title"},"Address Viewer")),r.a.createElement("div",{id:"searchbar"},r.a.createElement("div",{id:"address_input"},r.a.createElement("div",{class:"input-group mb-3"},r.a.createElement("input",{type:"text",id:"input",class:"form-control",placeholder:"Enter address...","aria-label":"Enter address...","aria-describedby":"button-addon2"}),r.a.createElement("div",{class:"input-group-append"},r.a.createElement("button",{class:"btn btn-outline-secondary",type:"button",id:"button-addon2",onClick:function(){var t=document.getElementById("input").value;""!=t?t.match("^0x[a-fA-F0-9]{40}$")?(console.log("address -> "+t),e.setState({address:t})):window.alert("Invalid address."):window.alert("Inputfield is empty.")}},"Search"))))),r.a.createElement("div",{id:"table_box"},t))}}]),n}(a.Component),x=(n(207),n(78)),E=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).transactionMap=null,n.tempMap=null,n.transactionMap=new Map,n.tempMap=new Map,n}return Object(i.a)(a,[{key:"getData",value:function(){var e=Object(m.a)(h.a.mark((function e(t,n,a){var r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setLoadingbar(0),this.transactionMap=new Map,this.tempMap=new Map,console.log("Function - getContractList(page, offsett):"),e.next=6,this.getContractList(t,n);case 6:return r=e.sent,console.log("CONTRACTLIST:"),console.log(r),console.log("Function - getTransactionFromContractList(contractList):"),e.next=12,this.getTransactionFromContractList(r);case 12:return console.log("TRANSACTIONMAP BEFORE DEEEP SEARCH:"),console.log(this.transactionMap),console.log("Function - deepSearch(depth, round):"),e.next=17,this.copyMap(this.transactionMap);case 17:if(this.tempMap=e.sent,0==a){e.next=28;break}o=1;case 20:if(!(o<=a)){e.next=26;break}return e.next=23,this.deepSearch(a,o);case 23:o++,e.next=20;break;case 26:console.log("TRANSACTIONMAP AFTER DEEEP SEARCH:"),console.log(this.transactionMap);case 28:return document.getElementById("loading_informaiton").innerHTML="Loading...",e.abrupt("return",this.convertMapToArray(this.transactionMap));case 30:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"getContractList",value:function(){var e=Object(m.a)(h.a.mark((function e(t,n){var a,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page="+t+"&offset="+n,e.next=3,fetch(a).then((function(e){return e.json()}));case 3:return r=e.sent,e.abrupt("return",r.result);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getTransactionFromContractList",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var n,a,r,o,s,c,i,l,u,d;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Searching for contract transactions:"),n=1,a=Object(x.a)(t),e.prev=3,a.s();case 5:if((r=a.n()).done){e.next=41;break}return o=r.value,s="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=",s+=o.Address,e.next=11,fetch(s).then((function(e){return e.json()}));case 11:c=e.sent,i=Object.keys(c.result).length,l=c.result,console.log("   Recived "+i+" Transaction entries."),u=0;case 16:if(!(u<i)){e.next=36;break}if(""===l[u].from||""===l[u].to||this.mapContains(this.transactionMap,l[u].from,l[u].to)){e.next=33;break}return e.t0=this.transactionMap,e.t1=l[u].from+l[u].to,e.t2=l[u].from,e.t3=l[u].to,e.next=24,this.isContract(l[u].from);case 24:if(!e.sent){e.next=28;break}e.t4="Contract",e.next=29;break;case 28:e.t4="Account";case 29:e.t5=e.t4,e.t6={source:e.t2,target:e.t3,sourceType:e.t5,targetType:"Contract"},e.t0.set.call(e.t0,e.t1,e.t6),console.log("      Transaction entry number "+(u+1)+" added.");case 33:u++,e.next=16;break;case 36:d=Math.round(100*n/t.length*100)/100,this.setLoadingbar(d),n++;case 39:e.next=5;break;case 41:e.next=46;break;case 43:e.prev=43,e.t7=e.catch(3),a.e(e.t7);case 46:return e.prev=46,a.f(),e.finish(46);case 49:this.setLoadingbar(0);case 50:case"end":return e.stop()}}),e,this,[[3,43,46,49]])})));return function(t){return e.apply(this,arguments)}}()},{key:"deepSearch",value:function(){var e=Object(m.a)(h.a.mark((function e(t,n){var a,r,o,s,c,i,l,u,d,p,f,m,g;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=this.copyMap(this.tempMap),this.tempMap=new Map,r=1,console.log("DEEP SEARCH ROUND "+n+"/"+t),o=Object(x.a)(a),e.prev=5,o.s();case 7:if((s=o.n()).done){e.next=81;break}return c=s.value,console.log("   Look up for map entry "+r+" of "+a.size),document.getElementById("loading_informaiton").innerHTML="Address look up ("+r+"/"+a.size+")<br>Depth search level ("+n+"/"+t+")",i="https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=",i+=c[1].source,console.log("      Searching transactions for address "+c[1].source+" ..."),e.next=16,fetch(i).then((function(e){return e.json()}));case 16:l=e.sent,u=Object.keys(l.result).length,d=l.result,console.log("         Recived "+u+" Transaction entries."),p=1,f=0;case 22:if(!(f<u)){e.next=76;break}if(d[f].to!==c[1].source&&(m=d[f].from,d[f].from=d[f].to,d[f].to=m),""===d[f].from||""===d[f].to||this.mapContains(this.transactionMap,d[f].from,d[f].to)){e.next=72;break}return e.t0=this.transactionMap,e.t1=d[f].from+d[f].to,e.t2=d[f].from,e.t3=d[f].to,e.next=31,this.isContract(d[f].from);case 31:if(!e.sent){e.next=35;break}e.t4="Contract",e.next=36;break;case 35:e.t4="Account";case 36:return e.t5=e.t4,e.next=39,this.isContract(d[f].to);case 39:if(!e.sent){e.next=43;break}e.t6="Contract",e.next=44;break;case 43:e.t6="Account";case 44:return e.t7=e.t6,e.t8={source:e.t2,target:e.t3,sourceType:e.t5,targetType:e.t7},e.t0.set.call(e.t0,e.t1,e.t8),e.t9=this.tempMap,e.t10=d[f].from+d[f].to,e.t11=d[f].from,e.t12=d[f].to,e.next=53,this.isContract(d[f].from);case 53:if(!e.sent){e.next=57;break}e.t13="Contract",e.next=58;break;case 57:e.t13="Account";case 58:return e.t14=e.t13,e.next=61,this.isContract(d[f].to);case 61:if(!e.sent){e.next=65;break}e.t15="Contract",e.next=66;break;case 65:e.t15="Account";case 66:e.t16=e.t15,e.t17={source:e.t11,target:e.t12,sourceType:e.t14,targetType:e.t16},e.t9.set.call(e.t9,e.t10,e.t17),console.log("            Transaction entry number "+p+" added."),g=Math.round(100*p/u*100)/100,this.setLoadingbar(g);case 72:p++;case 73:f++,e.next=22;break;case 76:p=1,r++,this.setLoadingbar(0);case 79:e.next=7;break;case 81:e.next=86;break;case 83:e.prev=83,e.t18=e.catch(5),o.e(e.t18);case 86:return e.prev=86,o.f(),e.finish(86);case 89:console.log("----- MAP for round "+n+" -----"),console.log(a),console.log("---------------------------");case 92:case"end":return e.stop()}}),e,this,[[5,83,86,89]])})));return function(t,n){return e.apply(this,arguments)}}()},{key:"isContract",value:function(){var e=Object(m.a)(h.a.mark((function e(t){var a,r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=!0,r=n(119),o=new r(new r.providers.HttpProvider("https://core.bloxberg.org/")),e.next=5,o.eth.getCode(t);case 5:return"0x"===e.sent&&(a=!1),e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"convertMapToArray",value:function(e){var t=new Array;return e.forEach((function(e,n){t.push({source:e.source,target:e.target,sourceType:e.sourceType,targetType:e.targetType})})),t}},{key:"copyMap",value:function(e){var t,n=new Map,a=Object(x.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n.set(r[1].source+r[1].target,{source:r[1].source,target:r[1].target,sourceType:r[1].sourceType,targetType:r[1].targetType})}}catch(o){a.e(o)}finally{a.f()}return n}},{key:"mapContains",value:function(e,t,n){return e.has(t+n)||e.has(n+t)}},{key:"setLoadingbar",value:function(e){document.getElementById("progress").style.width=e+"%",document.getElementById("progress").innerHTML=e+"%"}}]),a}(r.a.Component),w=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).responseObject=null,a.zoomEnable=!0,console.log("Consturctor:"),console.log(e),a.responseObject=new E,a}return Object(i.a)(n,[{key:"createGraph",value:function(e){console.log("Function - createGraph():");var t=window.innerHeight-document.getElementById("address_information").offsetHeight;document.getElementById("graph_box").style.height=t+"px";var n=t,a=window.innerWidth;console.log("PROMISE:"),console.log(e);var r=e;console.log("LINKS:"),console.log(r);var o={};r.forEach((function(e){e.source=o[e.source]||(o[e.source]={nodeAddress:e.source,source:e.source,target:e.target,typeSource:e.sourceType,typeTarget:e.targetType}),e.target=o[e.target]||(o[e.target]={nodeAddress:e.target,source:e.source,target:e.target,typeSource:e.sourceType,typeTarget:e.targetType})})),console.log("NODES:"),console.log(o);var s=document.getElementById("address_information").offsetWidth-2,c=n-20,i=v.behavior.zoom().on("zoom",(function(){l.attr("transform","translate("+v.event.translate+") scale("+v.event.scale+")")}));document.getElementById("container").innerHTML="";var l=v.select("#container").append("svg").attr("width",s).attr("height",c).style("cursor","move").call(i).append("g"),u=v.layout.force().size([s,c]).nodes(v.values(o)).links(r).on("tick",(function(e){p.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).call(u.drag),d.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y}))})).linkDistance(300).charge((function(e){var t=-200;return 0===e.index&&(t*=2.5),t})).start(),d=l.selectAll(".link").data(r).enter().append("line").attr("class","link"),p=l.selectAll(".node").data(u.nodes()).enter().append("circle").style("cursor","auto").style("fill",(function(e){return e.nodeAddress===e.source&&"Contract"===e.typeSource||e.nodeAddress===e.target&&"Contract"===e.typeTarget?"orange":void 0})).attr("class","node").attr("r",.005*a).on("click",(function(e){console.log(e),e.nodeAddress===e.source&&(document.getElementById("address_information").innerHTML=" <p class='labels'>Type:</p><p class='values'>"+e.typeSource+"</p><p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/"+e.source+"' target='_blank'>"+e.source+"</a></p>"),e.nodeAddress===e.target&&(document.getElementById("address_information").innerHTML=" <p class='labels'>Type:</p><p class='values'>"+e.typeTarget+"</p><p class='labels'>Address:</p><p class='values'><a href='https://blockexplorer.bloxberg.org/address/"+e.target+"' target='_blank'>"+e.target+"</a></p>")})).on("mousedown",(function(e){console.log("----- Node Information -----"),console.log("nodeAddress: "+e.nodeAddress),console.log("source: "+e.source),console.log("target: "+e.target),console.log("typeSource:   "+e.typeSource),console.log("typeTarget:   "+e.typeTarget),this.zoomEnable=!1,v.select("#container").select("svg").call(v.behavior.zoom().on("zoom",null))})).on("mouseup",(function(){this.zoomEnable=!0,v.select("#container").select("svg").call(i)})).on("focus",(function(){v.select(this).style("border-color","red")}));console.log("Graph drawed.")}},{key:"timeStap",value:function(){return Math.floor(Date.now())}},{key:"calculationTime",value:function(e,t){console.log("Graph created in "+(t-e)/1e3+" seconds.")}},{key:"showLoader",value:function(){document.getElementById("address_information").innerHTML="Select a node for node information.",document.getElementById("address_information").style.visibility="hidden",document.getElementById("container").style.visibility="hidden",document.getElementById("loader").style.visibility="visible"}},{key:"hideLoader",value:function(){document.getElementById("address_information").style.visibility="visible",document.getElementById("container").style.visibility="visible",document.getElementById("loader").style.visibility="hidden",document.getElementById("progress").style.width="0%",document.getElementById("progress").innerHTML="0%"}},{key:"scrollAnimation",value:function(){document.getElementById("address_information").scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}},{key:"widthResizeListener",value:function(){window.onresize=function(){document.getElementsByTagName("svg")[0].style.width=document.getElementById("address_information").offsetWidth-2}}},{key:"componentWillMount",value:function(){console.log("Component will mount.")}},{key:"componentDidMount",value:function(){var e=this;console.log("Component did mount.");var t=this.timeStap();this.showLoader(),this.responseObject.getData(this.props.page,this.props.offset,this.props.depth).then((function(n){e.hideLoader(),e.createGraph(n);var a=e.timeStap();e.calculationTime(t,a),e.scrollAnimation(),e.widthResizeListener()}))}},{key:"componentWillUpdate",value:function(e){var t=this;console.log("Component will update.");var n=this.timeStap();this.showLoader(),this.responseObject.getData(e.page,e.offset,e.depth).then((function(e){t.hideLoader(),t.createGraph(e);var a=t.timeStap();t.calculationTime(n,a),t.scrollAnimation(),t.widthResizeListener()}))}},{key:"componentDidUpdate",value:function(){console.log("Component did update.")}},{key:"render",value:function(){return r.a.createElement("div",{id:"container"})}}]),n}(a.Component),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={page:0,offset:0,depth:0},e}return Object(i.a)(n,[{key:"render",value:function(){for(var e=this,t=0!==this.state.page?r.a.createElement(w,{page:this.state.page,offset:this.state.offset,depth:this.state.depth}):null,n=[],a=1;a<=100;a++)n.push(r.a.createElement("option",{key:a,value:a},a));for(var o=[],s=1;s<=1800;s++)o.push(r.a.createElement("option",{key:s,value:s},s));for(var c=[],i=0;i<=5;i++)c.push(r.a.createElement("option",{key:i,value:i},i));return r.a.createElement("div",{className:"VBN"},r.a.createElement("div",{id:"banner"},r.a.createElement("h1",{className:"title"},"Visualisation of Bloxberg-Network")),r.a.createElement("div",{id:"site_informaiton"},r.a.createElement("p",null,"This website will produce a force directed d3 graph, that will visualizise the Bloxberg Network",r.a.createElement("br",null),"by using the ",r.a.createElement("a",{href:"https://blockexplorer.bloxberg.org/api_docs",target:"_blank"},"Bloxberg RPC API")," and the ",r.a.createElement("a",{href:"https://web3js.readthedocs.io/en/v1.3.0/",target:"_blank"},"Web3")," framework for JavaScript.")),r.a.createElement("div",{id:"values_informaiton"},r.a.createElement("p",{id:"text"},r.a.createElement("b",null,"Page")," represents the page number to be used for pagination."),r.a.createElement("p",{id:"text"},r.a.createElement("b",null,"Offset")," represents the maximum number of records to return when paginating."),r.a.createElement("p",{id:"text"},r.a.createElement("b",null,"Depth")," represents how deep the http requests will search into to network.")),r.a.createElement("div",{id:"control"},r.a.createElement("label",null,"Page:"),r.a.createElement("select",{id:"page_selection",defaultValue:2},n),r.a.createElement("label",null,"Offset:"),r.a.createElement("select",{id:"offset_selection",defaultValue:1},o),r.a.createElement("label",null,"Depth:"),r.a.createElement("select",{id:"depth_selection",defaultValue:0},c),r.a.createElement("input",{type:"submit",id:"button",value:"Create Graph",onClick:function(){var t=document.getElementById("page_selection").value,n=document.getElementById("offset_selection").value,a=document.getElementById("depth_selection").value;console.log("page -> "+t),console.log("offset -> "+n),console.log("depth -> "+a),e.setState({page:t,offset:n,depth:a})}})),r.a.createElement("div",{id:"loader",style:{visibility:"visable"}},r.a.createElement("div",{id:"progressbar"},r.a.createElement("div",{id:"progress"}),r.a.createElement("p",{id:"loading_informaiton"},"Loading..."))),r.a.createElement("div",{id:"address_information"},r.a.createElement("p",{class:"labels"},"Select a node for node information.")),r.a.createElement("div",{id:"graph_box"},t))}}]),n}(a.Component),M=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("div",{id:"navigation"},r.a.createElement("ul",{id:"nav-links"},r.a.createElement(d.b,{to:"/AddressViewer",class:"link"},r.a.createElement("li",null,"AddressViewer")),r.a.createElement(d.b,{to:"/VBN",class:"link"},r.a.createElement("li",null,"VBN")))),r.a.createElement(p.c,null,r.a.createElement(p.a,{path:"/AddressViewer",exact:!0,component:k}),r.a.createElement(p.a,{path:"/VBN",exact:!0,component:T}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[217,1,2]]]);
//# sourceMappingURL=main.df85ca3d.chunk.js.map