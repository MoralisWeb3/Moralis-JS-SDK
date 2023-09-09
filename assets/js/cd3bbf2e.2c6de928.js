"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[77586],{3905:(e,t,l)=>{l.d(t,{Zo:()=>m,kt:()=>d});var a=l(67294);function r(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function n(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,a)}return l}function o(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?n(Object(l),!0).forEach((function(t){r(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):n(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function i(e,t){if(null==e)return{};var l,a,r=function(e,t){if(null==e)return{};var l,a,r={},n=Object.keys(e);for(a=0;a<n.length;a++)l=n[a],t.indexOf(l)>=0||(r[l]=e[l]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)l=n[a],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(r[l]=e[l])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),l=t;return e&&(l="function"==typeof e?e(t):o(o({},t),e)),l},m=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var l=e.components,r=e.mdxType,n=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=p(l),d=r,k=u["".concat(s,".").concat(d)]||u[d]||c[d]||n;return l?a.createElement(k,o(o({ref:t},m),{},{components:l})):a.createElement(k,o({ref:t},m))}));function d(e,t){var l=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=l.length,o=new Array(n);o[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var p=2;p<n;p++)o[p]=l[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,l)}u.displayName="MDXCreateElement"},84394:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>n,metadata:()=>i,toc:()=>p});var a=l(87462),r=(l(67294),l(3905));const n={slug:"/moralisweb3/common-sol-utils/solsplnativeprice",title:"Class: SolSPLNativePrice",sidebar_label:"SolSPLNativePrice"},o=void 0,i={unversionedId:"api/moralisweb3/common-sol-utils/solsplnativeprice",id:"api/moralisweb3/common-sol-utils/solsplnativeprice",title:"Class: SolSPLNativePrice",description:"moralis-monorepo / @moralisweb3/common-sol-utils / SolSPLNativePrice",source:"@site/docs/api/moralisweb3/common-sol-utils/solsplnativeprice.md",sourceDirName:"api/moralisweb3/common-sol-utils",slug:"/moralisweb3/common-sol-utils/solsplnativeprice",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-sol-utils/solsplnativeprice",title:"Class: SolSPLNativePrice",sidebar_label:"SolSPLNativePrice"},sidebar:"sidebar",previous:{title:"SolNetworkResolver",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solnetworkresolver"},next:{title:"SolSPLNativePriceInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativepriceinput"}},s={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Properties",id:"properties-1",level:2},{value:"decimals",id:"decimals",level:3},{value:"name",id:"name",level:3},{value:"symbol",id:"symbol",level:3},{value:"value",id:"value",level:3}],m={toc:p};function c(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index"},"@moralisweb3/common-sol-utils")," / SolSPLNativePrice"),(0,r.kt)("h1",{id:"class-solsplnativeprice"},"Class: SolSPLNativePrice"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index"},"@moralisweb3/common-sol-utils"),".SolSPLNativePrice"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#create"},"create")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#fromjson"},"fromJSON")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#tojson"},"toJSON"))),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#decimals"},"decimals")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#name"},"name")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#symbol"},"symbol")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice#value"},"value"))),(0,r.kt)("h2",{id:"methods-1"},"Methods"),(0,r.kt)("h3",{id:"create"},"create"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"create"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePrice"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"input")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativepriceinput"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePriceInput"))," ","|"," ",(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePrice")))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePrice"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"fromjson"},"fromJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePrice"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"json")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativepricejson"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePriceJSON")))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativeprice"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePrice"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tojson"},"toJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativepricejson"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePriceJSON"))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solsplnativepricejson"},(0,r.kt)("inlineCode",{parentName:"a"},"SolSPLNativePriceJSON"))),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"decimals"},"decimals"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"decimals"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"name"},"name"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"name"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"symbol"},"symbol"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"symbol"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"value"},"value"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"value"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")))}c.isMDXComponent=!0}}]);