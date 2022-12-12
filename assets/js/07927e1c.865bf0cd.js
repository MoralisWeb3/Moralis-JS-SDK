"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5270],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>c});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),s=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),u=s(a),c=r,k=u["".concat(i,".").concat(c)]||u[c]||d[c]||o;return a?n.createElement(k,l(l({ref:t},m),{},{components:a})):n.createElement(k,l({ref:t},m))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=u;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var s=2;s<o;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2250:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=a(7462),r=(a(7294),a(3905));const o={slug:"/moralisweb3/common-core/paginatedresponseadapter"},l=void 0,p={unversionedId:"moralisweb3/common-core/paginatedresponseadapter",id:"moralisweb3/common-core/paginatedresponseadapter",title:"paginatedresponseadapter",description:"moralis-monorepo / @moralisweb3/common-core / PaginatedResponseAdapter",source:"@site/docs/moralisweb3/common-core/paginatedresponseadapter.md",sourceDirName:"moralisweb3/common-core",slug:"/moralisweb3/common-core/paginatedresponseadapter",permalink:"/moralisweb3/common-core/paginatedresponseadapter",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-core/paginatedresponseadapter"}},i={},s=[{value:"Type parameters",id:"type-parameters",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Methods",id:"methods-1",level:2},{value:"hasNext",id:"hasnext",level:3},{value:"Returns",id:"returns",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Properties",id:"properties-1",level:2},{value:"next",id:"next",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Returns",id:"returns-2",level:5},{value:"pagination",id:"pagination",level:3},{value:"Accessors",id:"accessors-1",level:2},{value:"raw",id:"raw",level:3},{value:"Returns",id:"returns-3",level:4},{value:"result",id:"result",level:3},{value:"Returns",id:"returns-4",level:4}],m={toc:s};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/index"},"@moralisweb3/common-core")," / PaginatedResponseAdapter"),(0,r.kt)("h1",{id:"class-paginatedresponseadapterresult-jsonresult"},"Class: PaginatedResponseAdapter<Result, JSONResult",">"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/index"},"@moralisweb3/common-core"),".PaginatedResponseAdapter"),(0,r.kt)("h2",{id:"type-parameters"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Result"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"JSONResult"))))),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"constructors"},"Constructors"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#constructor"},"constructor"))),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#hasnext"},"hasNext")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#tojson"},"toJSON"))),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#next"},"next")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#pagination"},"pagination"))),(0,r.kt)("h3",{id:"accessors"},"Accessors"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#raw"},"raw")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/paginatedresponseadapter#result"},"result"))),(0,r.kt)("h2",{id:"constructors-1"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new PaginatedResponseAdapter"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Result"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">","(",(0,r.kt)("inlineCode",{parentName:"p"},"pagination"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"jsonResponse"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"getResult"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"nextHandler"),")"),(0,r.kt)("h4",{id:"type-parameters-1"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Result"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"JSONResult"))))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"pagination")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-core/pagination"},(0,r.kt)("inlineCode",{parentName:"a"},"Pagination")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"jsonResponse")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-core/paginatedjsonresponse"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedJSONResponse")),"<",(0,r.kt)("inlineCode",{parentName:"td"},"JSONResult"),">")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"getResult")),(0,r.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,r.kt)("inlineCode",{parentName:"td"},"Result"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"nextHandler")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"undefined")," ","|"," () => ",(0,r.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-core/paginatedresponseadapter"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedResponseAdapter")),"<",(0,r.kt)("inlineCode",{parentName:"td"},"Result"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"JSONResult"),">",">")))),(0,r.kt)("h2",{id:"methods-1"},"Methods"),(0,r.kt)("h3",{id:"hasnext"},"hasNext"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"hasNext"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tojson"},"toJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedjsonresponse"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedJSONResponse")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">"),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedjsonresponse"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedJSONResponse")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">"),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"next"},"next"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"next"),": () => ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedresponseadapter"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedResponseAdapter")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Result"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">",">"),(0,r.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,r.kt)("p",null,"\u25b8 (): ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedresponseadapter"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedResponseAdapter")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Result"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">",">"),(0,r.kt)("h5",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedresponseadapter"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedResponseAdapter")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Result"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">",">"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"pagination"},"pagination"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"pagination"),": ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/pagination"},(0,r.kt)("inlineCode",{parentName:"a"},"Pagination"))),(0,r.kt)("h2",{id:"accessors-1"},"Accessors"),(0,r.kt)("h3",{id:"raw"},"raw"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"get")," ",(0,r.kt)("strong",{parentName:"p"},"raw"),"(): ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedjsonresponse"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedJSONResponse")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">"),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/paginatedjsonresponse"},(0,r.kt)("inlineCode",{parentName:"a"},"PaginatedJSONResponse")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"JSONResult"),">"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"result"},"result"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"get")," ",(0,r.kt)("strong",{parentName:"p"},"result"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"Result")),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Result")))}d.isMDXComponent=!0}}]);