webpackJsonp([1],{121:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=n(0),a=n.n(o),i=n(45),c=n(44),s=(n.n(c),n(126)),l=n(127),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=function(e){var t=e.component,n=r(e,["component"]);return a.a.createElement(i.Route,u({},n,{render:function(){return document.querySelector(".mdl-layout__drawer")&&(document.querySelector(".mdl-layout__obfuscator").classList.remove("is-visible"),document.querySelector(".mdl-layout__drawer").classList.remove("is-visible")),a.a.createElement(t,null)}}))},d=function(){return a.a.createElement(i.HashRouter,null,a.a.createElement(c.Layout,{fixedHeader:!0},a.a.createElement(c.Header,{title:"PWA"}),a.a.createElement(c.Drawer,{title:"PWA"},a.a.createElement(c.Navigation,null,a.a.createElement(i.Link,{to:"/"},"Home"),a.a.createElement(i.Link,{to:"/about"},"About"))),a.a.createElement(c.Content,null,a.a.createElement(p,{exact:!0,path:"/",component:l.a}),a.a.createElement(p,{path:"/about",component:s.a}))))};t.a=d;!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(p,"RouteHideDrawer","/Users/tim.berman/projects/react-pwa/src/App.js"),__REACT_HOT_LOADER__.register(d,"default","/Users/tim.berman/projects/react-pwa/src/App.js"))}()},123:function(e,t){function n(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}function r(e){if(e||(e={}),n()){var t=navigator.serviceWorker.register("sw.js"),r=function(e){function t(){switch(i.state){case"redundant":o("onUpdateFailed"),i.onstatechange=null;break;case"installing":r||o("onUpdating");break;case"installed":a||o("onUpdateReady");break;case"activated":o("onUpdated"),i.onstatechange=null}}function n(){switch(i.state){case"redundant":i.onstatechange=null;break;case"installing":case"installed":break;case"activated":o("onInstalled"),i.onstatechange=null}}var r,a,i=e.installing||e.waiting;if(i&&!i.onstatechange){var c;e.active?(t(),c=t):(n(),c=n),r=!0,e.waiting&&(a=!0),i.onstatechange=c}},o=function(t){"function"==typeof e[t]&&e[t]({source:"ServiceWorker"})};return void t.then(function(e){e&&(r(e),e.onupdatefound=function(){r(e)})}).catch(function(e){return o("onError"),Promise.reject(e)})}if(window.applicationCache){var a=function(){var e=document.createElement("iframe");e.src="appcache/manifest.html",e.style.display="none",i=e,document.body.appendChild(e)};return void("complete"===document.readyState?setTimeout(a):window.addEventListener("load",a))}}function o(e,t){if(n())return void navigator.serviceWorker.getRegistration().then(function(n){if(!n||!n.waiting)return void(t&&t());n.waiting.postMessage({action:"skipWaiting"}),e&&e()})}function a(){if(n()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),i)try{i.contentWindow.applicationCache.update()}catch(e){}}var i;t.install=r,t.applyUpdate=o,t.update=a},124:function(e,t,n){e.exports=n(223)},125:function(e,t,n){var r=n(131);"string"==typeof r&&(r=[[e.i,r,""]]);n(119)(r,{});r.locals&&(e.exports=r.locals)},126:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(44),i=(n.n(a),n(45)),c=function(){return o.a.createElement(a.Card,{shadow:0,style:{textAlign:"center"}},o.a.createElement(a.CardTitle,{style:{margin:"auto"}},"PWA"),o.a.createElement(a.CardText,null,"About this Application"),o.a.createElement(a.CardActions,{border:!0},o.a.createElement(i.Link,{to:"/"},o.a.createElement(a.Button,{colored:!0},"OK"))))};t.a=c;!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(c,"default","/Users/tim.berman/projects/react-pwa/src/components/About.js")}()},127:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=function(){return o.a.createElement("h1",null,"Home Page")};t.a=a;!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(a,"default","/Users/tim.berman/projects/react-pwa/src/components/Home.js")}()},128:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(124),o=(n.n(r),n(0)),a=n.n(o),i=n(10),c=(n.n(i),n(121)),s=n(125),l=(n.n(s),n(123)),u=(n.n(l),document.getElementById("root"));n.i(i.render)(a.a.createElement(r.AppContainer,null,a.a.createElement(c.a,null)),u),n.i(l.install)({onUpdateReady:function(){return n.i(l.applyUpdate)()}});!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(u,"rootEl","/Users/tim.berman/projects/react-pwa/src/index.js")}()},131:function(e,t,n){t=e.exports=n(73)(),t.push([e.i,".mdl-layout__drawer-button{background:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M0 0h24v24h-24z' fill='none'/%3E %3Cpath d='M3 18h18v-2h-18v2zm0-5h18v-2h-18v2zm0-7v2h18v-2h-18z' fill='%23FFFFFF'/%3E %3C/svg%3E\") 50% no-repeat}.mdl-layout__drawer-button .material-icons{display:none}.mdl-layout__content{display:flex;justify-content:center;align-items:center}",""])},221:function(e,t,n){"use strict";e.exports=n(222)},222:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),s=c.Component,l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){return this.props.component?c.createElement(this.props.component,this.props.props):c.Children.only(this.props.children)}}]),t}(s);e.exports=l},223:function(e,t,n){"use strict";e.exports=n(224)},224:function(e,t,n){"use strict";e.exports.AppContainer=n(221)}},[128]);