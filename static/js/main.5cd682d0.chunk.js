(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{141:function(e,t,s){},142:function(e,t,s){},436:function(e,t,s){"use strict";s.r(t);var a=s(2),n=s(4),i=s.n(n),r=s(24),c=s.n(r),o=(s(141),s(13)),l=s.n(o),d=s(31),h=s(9),u=s(10),p=s(6),j=s(12),b=s(11),v=(s(142),s(81));s(143);v.a.initializeApp({apiKey:"AIzaSyAzlS4G0_AilAhMaLg1-Kqq5p6dEqI_2MU",authDomain:"info-442-1602963873043.firebaseapp.com",databaseURL:"https://info-442-1602963873043.firebaseio.com",projectId:"info-442-1602963873043",storageBucket:"info-442-1602963873043.appspot.com",messagingSenderId:"1017087285302",appId:"1:1017087285302:web:0a2d9a875812a2ecffe097",measurementId:"G-CDH98XSBFG"});var g=v.a.database(),x=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){return Object(h.a)(this,s),t.call(this,e)}return Object(u.a)(s,[{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Where2Test"}),Object(a.jsx)("p",{className:"Descr",children:"We have created this web app to make finding a COVID-19 testing center easier and more accessible for local Seattle people. Please fill out a few questions to find out where the closest COVID-19 testing center is that best fits your needs."}),Object(a.jsx)("p",{className:"Descr disclaimer",children:"At this moment, this app can only locate testing centers in the Seattle area, and we only support valid Washington addresses."}),Object(a.jsx)("button",{onClick:this.props.goNext,type:"button",className:"Start-btn",children:"START"}),Object(a.jsx)("footer",{children:Object(a.jsxs)("div",{children:["Icons made by ",Object(a.jsx)("a",{href:"https://smashicons.com/",title:"Smashicons",children:"Smashicons"})," from ",Object(a.jsx)("a",{href:"https://www.flaticon.com/",title:"Flaticon",children:"www.flaticon.com"})]})})]})}}]),s}(n.Component),m=s(134),f=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(h.a)(this,s),(a=t.call(this,e)).handleChange=function(e){a.setState(Object(m.a)({},e.target.name,e.target.value))},a.state={address:"",city:"",stateName:"",zip:""},a.canGoNext=a.canGoNext.bind(Object(p.a)(a)),a.handleChange=a.handleChange.bind(Object(p.a)(a)),a.checkValidLocation=a.checkValidLocation.bind(Object(p.a)(a)),a}return Object(u.a)(s,[{key:"componentWillMount",value:function(){var e=this.props.getCurrentResponse();null===e&&0===e.length||this.setState({address:e.address,city:e.city,stateName:e.stateName,zip:e.zip})}},{key:"canGoNext",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t="".concat(this.state.address,", ",this.state.city," ",this.state.stateName," ",this.state.zip),s={address:this.state.address,city:this.state.city,stateName:this.state.stateName,zip:this.state.zip},!this.checkFields()){e.next=10;break}return e.next=6,this.checkValidLocation(t);case 6:e.sent&&(this.props.saveResponse(s),this.props.goNext()),e.next=11;break;case 10:alert("Please enter a valid address. Note: We currently only support Washington addresses.");case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"checkFields",value:function(){var e=this.state,t=e.address,s=e.city,a=e.stateName,n=e.zip;return void 0!==t&&t.length>0&&void 0!==s&&s.length>0&&void 0!==a&&("wa"===a.toLowerCase()||"washington"===a.toLowerCase())&&void 0!==n&&n.length>4}},{key:"checkValidLocation",value:function(e){var t=[];t.push(e);var s=new window.google.maps.DistanceMatrixService;return new Promise((function(e,a){s.getDistanceMatrix({origins:t,destinations:["Seattle, WA, USA"],travelMode:window.google.maps.TravelMode.DRIVING,unitSystem:window.google.maps.UnitSystem.IMPERIAL},(function(t,s){var n=t.originAddresses[0].includes("WA");s===window.google.maps.DistanceMatrixStatus.OK&&n?e(!0):(alert("Invalid Address"),a(!1))}))}))}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"Question-page",children:[Object(a.jsxs)("div",{className:"Question",children:[Object(a.jsxs)("p",{className:"Q L",children:["Please enter a location.",Object(a.jsx)("span",{className:"required",children:"*"})]}),Object(a.jsx)("div",{className:"Location-form",children:Object(a.jsxs)("form",{className:"Full-address",children:[Object(a.jsxs)("div",{className:"Address-field",children:[Object(a.jsx)("label",{for:"Address",children:"ADDRESS"}),Object(a.jsx)("input",{onChange:this.handleChange,type:"text",id:"Address",name:"address",value:this.state.address})]}),Object(a.jsxs)("div",{className:"City-field",children:[Object(a.jsx)("label",{for:"City",children:"CITY"}),Object(a.jsx)("input",{onChange:this.handleChange,type:"text",id:"City",name:"city",value:this.state.city})]}),Object(a.jsxs)("div",{className:"State-field",children:[Object(a.jsx)("label",{for:"State",children:"STATE"}),Object(a.jsx)("input",{onChange:this.handleChange,type:"text",id:"State",name:"stateName",value:this.state.stateName})]}),Object(a.jsxs)("div",{className:"Zip-field",children:[Object(a.jsx)("label",{for:"Zip",children:"ZIP"}),Object(a.jsx)("input",{onChange:this.handleChange,type:"text",id:"Zip",name:"zip",value:this.state.zip})]})]})})]}),Object(a.jsx)("div",{className:"Nav-Buttons-One",children:Object(a.jsx)("button",{onClick:this.canGoNext,type:"button",className:"Nav-btn",disabled:this.props.nextDisabled,children:"NEXT"})})]})}}]),s}(n.Component),O=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(h.a)(this,s),(a=t.call(this,e)).handleCheck=function(e){a.setState({checked:e.target.value}),a.props.saveResponse(e.target.value)},a.state={checked:""},a.handleCheck=a.handleCheck.bind(Object(p.a)(a)),a.canGoNext=a.canGoNext.bind(Object(p.a)(a)),a}return Object(u.a)(s,[{key:"componentWillMount",value:function(){var e=this.props.getCurrentResponse();this.setState({checked:e})}},{key:"canGoNext",value:function(){"Yes"!==this.state.checked&&"No"!==this.state.checked?alert("Please make a selection"):(this.props.saveResponse(this.state.checked),this.props.goNext())}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"Question-page",children:[Object(a.jsxs)("div",{className:"Question",children:[Object(a.jsxs)("p",{className:"Q",children:[this.props.questionText,Object(a.jsx)("span",{className:"required",children:"*"})]}),Object(a.jsxs)("div",{className:"Checkboxes",children:[Object(a.jsxs)("div",{className:"CB",children:[Object(a.jsx)("input",{type:"radio",id:"Yes",name:"Yes",value:"Yes",className:"Box",checked:"Yes"===this.state.checked,onChange:this.handleCheck}),Object(a.jsx)("label",{for:"Yes",children:"Yes"})]}),Object(a.jsxs)("div",{className:"CB",children:[Object(a.jsx)("input",{type:"radio",id:"No",name:"No",value:"No",className:"Box",checked:"No"===this.state.checked,onChange:this.handleCheck}),Object(a.jsx)("label",{for:"No",children:"No"})]})]})]}),Object(a.jsxs)("div",{className:"Nav-Buttons",children:[Object(a.jsx)("button",{onClick:this.props.goBack,type:"button",className:"Nav-btn",children:"BACK"}),Object(a.jsx)("button",{onClick:this.canGoNext,type:"button",className:"Nav-btn",disabled:this.props.nextDisabled,children:this.props.lastQuestion?"SUBMIT":"NEXT"})]})]})}}]),s}(n.Component),N=(s(145),function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){return Object(h.a)(this,s),t.call(this,e)}return Object(u.a)(s,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"Loading-page",children:[Object(a.jsx)("p",{className:"Error-message",children:"Please wait a moment while we retrieve your results."}),Object(a.jsx)("div",{class:"loader"})]})}}]),s}(n.Component)),y=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){return Object(h.a)(this,s),t.call(this,e)}return Object(u.a)(s,[{key:"componentWillMount",value:function(){this.props.computeResults()}},{key:"render",value:function(){for(var e=this.props.results,t=(this.props.lastUpdated,[]),s=0;s<e.length;s++){var n=[];for(var i in e[s].criteriaAvailable)n.push(Object(a.jsxs)("p",{className:"Criteria",children:[Object(a.jsx)("span",{className:"Checkmark",children:"\u2713 "}),e[s].criteriaAvailable[i]]}));for(var i in e[s].criteriaNotAvailable)n.push(Object(a.jsxs)("p",{className:"Criteria",children:[Object(a.jsx)("span",{className:"x-mark",children:"\u2717 "}),e[s].criteriaNotAvailable[i]]}));t.push(Object(a.jsx)("div",{className:"Result-section-flexbox",children:Object(a.jsxs)("div",{className:"Single-result-flexbox",children:[Object(a.jsxs)("div",{className:"Result-card",children:[Object(a.jsx)("p",{className:"Testing-center",children:Object(a.jsx)("a",{className:"black-link",href:e[s].websiteUrl,target:"_blank",children:e[s].name})}),Object(a.jsx)("p",{className:"Testing-center-address",children:Object(a.jsx)("a",{href:"http://maps.google.com/?q="+e[s].address,target:"_blank",children:e[s].address})}),Object(a.jsx)("p",{className:"Testing-center-hours",children:e[s].hoursOfOperation}),Object(a.jsxs)("div",{className:"Card-bottom",children:[Object(a.jsx)("div",{children:Object(a.jsx)("p",{className:"Testing-phone",children:Object(a.jsx)("a",{href:"tel:"+e[s].phone,target:"_blank",children:e[s].phone})})}),Object(a.jsx)("div",{children:Object(a.jsx)("p",{className:"Testing-distance",children:e[s].distanceAway+" mi"})})]})]}),Object(a.jsx)("div",{className:"Criteria-checklist",children:n})]})},s))}return this.props.results.length>0&&this.props.lastUpdated.length>0?Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{className:"Result-intro",children:"Here are the testing centers you should go to based on your selections:"}),Object(a.jsxs)("p",{className:"Result-explanation",children:["They are filtered based on your preferences and ordered based on closest distance to: ",Object(a.jsx)("span",{className:"Result-address",children:this.props.originAddress}),". Please make sure this is the address you intended."]}),Object(a.jsxs)("p",{className:"Result-explanation last-updated",children:["Testing center information last updated on: ",Object(a.jsx)("span",{className:"updated-date",children:this.props.lastUpdated[0]})]})]}),Object(a.jsx)("div",{children:t}),Object(a.jsx)("div",{children:Object(a.jsx)("p",{className:"end-note",children:"Refresh the page to take the survey again."})})]}):Object(a.jsx)(N,{})}}]),s}(n.Component),k=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){return Object(h.a)(this,s),t.call(this,e)}return Object(u.a)(s,[{key:"render",value:function(){return Object(a.jsx)("div",{children:Object(a.jsx)("p",{className:"Error-message",children:"We are unable to retrieve your results right now. Please refresh the page and try again."})})}}]),s}(n.Component),C=function(e){Object(j.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(h.a)(this,s),(a=t.call(this,e)).saveResponse=function(e){var t=a.state.responses;t[a.state.pageIndex-1]=e,a.setState({responses:t})},a.state={questions:[],responses:[],pageIndex:0,originAddress:"",testingCenters:[],results:[],lastUpdated:[],resultsError:!1,nextDisabled:!1},a.getSurveyQuestions=a.getSurveyQuestions.bind(Object(p.a)(a)),a.getTestingCenters=a.getTestingCenters.bind(Object(p.a)(a)),a.getCurrentResponse=a.getCurrentResponse.bind(Object(p.a)(a)),a.goNext=a.goNext.bind(Object(p.a)(a)),a.saveResponse=a.saveResponse.bind(Object(p.a)(a)),a.goBack=a.goBack.bind(Object(p.a)(a)),a.computeResults=a.computeResults.bind(Object(p.a)(a)),a.getLastUpdated=a.getLastUpdated.bind(Object(p.a)(a)),a}return Object(u.a)(s,[{key:"componentWillMount",value:function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getSurveyQuestions();case 2:return e.next=4,this.getTestingCenters();case 4:return e.next=6,this.getLastUpdated();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getLastUpdated",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],g.ref("lastUpdated").on("value",(function(e){e.val().forEach((function(e){t.push(e.lastUpdated)}))})),this.setState({lastUpdated:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getSurveyQuestions",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,s,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=g.ref("surveyQuestions"),s=[],a=[],t.on("value",(function(e){e.val().forEach((function(e){s.push(e),a.push("No response")}))})),this.setState({questions:s,responses:a});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getTestingCenters",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],g.ref("testingSites").on("value",(function(e){e.val().forEach((function(e){t.push(e)}))})),this.setState({testingCenters:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getCurrentResponse",value:function(){return this.state.responses[this.state.pageIndex-1]}},{key:"goNext",value:function(){var e=this;!1===this.state.nextDisabled&&(this.setState({pageIndex:this.state.pageIndex+1,nextDisabled:!0}),setTimeout((function(){e.setState({nextDisabled:!1})}),1e3))}},{key:"goBack",value:function(){this.setState({pageIndex:this.state.pageIndex-1})}},{key:"computeResults",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,s,a,n,i,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.testingCenters,s="Yes"===this.state.responses[1],a="Yes"===this.state.responses[2],n="Yes"===this.state.responses[3],t.length<1&&console.log("Error retrieving testing centers"),t.forEach((function(e){var t=0,i=[],r=[];!0===e.free?(i.push("Free testing available"),!0===s&&t++):r.push("No free testing"),!0===e.driveThrough?(i.push("Drive through option"),!0===a&&t++):r.push("No drive through option"),!0===e.translator?(i.push("Translator available"),!0===n&&t++):r.push("No translator option"),e.criteriaMet=t,e.criteriaAvailable=i,e.criteriaNotAvailable=r})),(i=[]).push("".concat(this.state.responses[0].address,", ",this.state.responses[0].city,", ",this.state.responses[0].stateName," ",this.state.responses[0].zip)),r=[],t.forEach((function(e){r.push(e.address)})),(new window.google.maps.DistanceMatrixService).getDistanceMatrix({origins:i,destinations:r,travelMode:window.google.maps.TravelMode.DRIVING,unitSystem:window.google.maps.UnitSystem.IMPERIAL},function(e,s){if(s!==window.google.maps.DistanceMatrixStatus.OK)console.log("Error: ",s),this.setState({resultsError:!0});else{var a=e.rows[0].elements,n=e.originAddresses[0];console.log(n);for(var i=0;i<a.length;i++){var r=a[i];if(void 0==r.distance)this.setState({resultsError:!0});else{var c=r.distance.text.split(" "),o=parseFloat(c[0]);t[i].distanceAway=o}}t.sort((function(e,t){return t.criteriaMet-e.criteriaMet||e.distanceAway-t.distanceAway})),console.log(t),this.setState({originAddress:n,results:t})}}.bind(this));case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=this.state,t=e.pageIndex,s=e.questions,n=e.resultsError,i=[],r=1;r<s.length;r++)i.push(Object(a.jsx)(O,{lastQuestion:r===s.length-1,goNext:this.goNext,saveResponse:this.saveResponse,goBack:this.goBack,questionText:s[r].question,getCurrentResponse:this.getCurrentResponse,nextDisabled:this.state.nextDisabled},r));return n?Object(a.jsx)(k,{}):Object(a.jsxs)("div",{className:"App",children:[0===t?Object(a.jsx)(x,{goNext:this.goNext}):null,1===t?Object(a.jsx)(f,{goNext:this.goNext,saveResponse:this.saveResponse,getCurrentResponse:this.getCurrentResponse,nextDisabled:this.state.disabled}):null,2===t?i[0]:null,3===t?i[1]:null,4===t?i[2]:null,5===t?Object(a.jsx)(y,{computeResults:this.computeResults,originAddress:this.state.originAddress,results:this.state.results,lastUpdated:this.state.lastUpdated}):null]})}}]),s}(n.Component),w=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,437)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;s(e),a(e),n(e),i(e),r(e)}))};c.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(C,{})}),document.getElementById("root")),w()}},[[436,1,2]]]);
//# sourceMappingURL=main.5cd682d0.chunk.js.map