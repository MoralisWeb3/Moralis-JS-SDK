"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[57819],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>v});var a=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=a.createContext({}),l=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):m(m({},t),e)),r},p=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=l(r),v=o,u=c["".concat(s,".").concat(v)]||c[v]||k[v]||n;return r?a.createElement(u,m(m({ref:t},p),{},{components:r})):a.createElement(u,m({ref:t},p))}));function v(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,m=new Array(n);m[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,m[1]=i;for(var l=2;l<n;l++)m[l]=r[l];return a.createElement.apply(null,m)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},15458:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>m,default:()=>k,frontMatter:()=>n,metadata:()=>i,toc:()=>l});var a=r(87462),o=(r(67294),r(3905));const n={slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",title:"Class: EvmMarketDataERC20TokensByPriceMovers",sidebar_label:"EvmMarketDataERC20TokensByPriceMovers"},m=void 0,i={unversionedId:"api/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",id:"api/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",title:"Class: EvmMarketDataERC20TokensByPriceMovers",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmMarketDataERC20TokensByPriceMovers",source:"@site/docs/api/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers",title:"Class: EvmMarketDataERC20TokensByPriceMovers",sidebar_label:"EvmMarketDataERC20TokensByPriceMovers"},sidebar:"sidebar",previous:{title:"EvmMarketDataERC20TokenItemJSON",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitemjson"},next:{title:"EvmMarketDataERC20TokensByPriceMoversInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemoversinput"}},s={},l=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Properties",id:"properties-1",level:2},{value:"gainers",id:"gainers",level:3},{value:"losers",id:"losers",level:3}],p={toc:l};function k(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmMarketDataERC20TokensByPriceMovers"),(0,o.kt)("h1",{id:"class-evmmarketdataerc20tokensbypricemovers"},"Class: EvmMarketDataERC20TokensByPriceMovers"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmMarketDataERC20TokensByPriceMovers"),(0,o.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,o.kt)("h3",{id:"methods"},"Methods"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers#create"},"create")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers#fromjson"},"fromJSON")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers#tojson"},"toJSON"))),(0,o.kt)("h3",{id:"properties"},"Properties"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers#gainers"},"gainers")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers#losers"},"losers"))),(0,o.kt)("h2",{id:"methods-1"},"Methods"),(0,o.kt)("h3",{id:"create"},"create"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,o.kt)("strong",{parentName:"p"},"create"),"(",(0,o.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMovers"))),(0,o.kt)("h4",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"input")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemoversinput"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMoversInput"))," ","|"," ",(0,o.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMovers")))))),(0,o.kt)("h4",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMovers"))),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"fromjson"},"fromJSON"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,o.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,o.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMovers"))),(0,o.kt)("h4",{id:"parameters-1"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"json")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemoversjson"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMoversJSON")))))),(0,o.kt)("h4",{id:"returns-1"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemovers"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMovers"))),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"tojson"},"toJSON"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemoversjson"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMoversJSON"))),(0,o.kt)("h4",{id:"returns-2"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokensbypricemoversjson"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokensByPriceMoversJSON"))),(0,o.kt)("h2",{id:"properties-1"},"Properties"),(0,o.kt)("h3",{id:"gainers"},"gainers"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,o.kt)("strong",{parentName:"p"},"gainers"),": ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem")),"[]"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"losers"},"losers"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,o.kt)("strong",{parentName:"p"},"losers"),": ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,o.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem")),"[]"))}k.isMDXComponent=!0}}]);