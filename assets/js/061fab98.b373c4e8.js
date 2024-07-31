"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[65966],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var a=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,i=function(e,t){if(null==e)return{};var r,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var m=a.createContext({}),p=function(e){var t=a.useContext(m),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return a.createElement(m.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,i=e.mdxType,n=e.originalType,m=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(r),d=i,k=u["".concat(m,".").concat(d)]||u[d]||c[d]||n;return r?a.createElement(k,l(l({ref:t},s),{},{components:r})):a.createElement(k,l({ref:t},s))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=r.length,l=new Array(n);l[0]=u;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<n;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},81066:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>c,frontMatter:()=>n,metadata:()=>o,toc:()=>p});var a=r(87462),i=(r(67294),r(3905));const n={slug:"/moralisweb3/common-evm-utils/evmgetpairprice",title:"Class: EvmGetPairPrice",sidebar_label:"EvmGetPairPrice"},l=void 0,o={unversionedId:"api/moralisweb3/common-evm-utils/evmgetpairprice",id:"api/moralisweb3/common-evm-utils/evmgetpairprice",title:"Class: EvmGetPairPrice",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmGetPairPrice",source:"@site/docs/api/moralisweb3/common-evm-utils/evmgetpairprice.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmgetpairprice",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmgetpairprice",title:"Class: EvmGetPairPrice",sidebar_label:"EvmGetPairPrice"},sidebar:"sidebar",previous:{title:"EvmGetNFTTradesMarketplaceEnum",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetnfttradesmarketplaceenum"},next:{title:"EvmGetPairPriceInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairpriceinput"}},m={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Properties",id:"properties-1",level:2},{value:"baseToken",id:"basetoken",level:3},{value:"exchange",id:"exchange",level:3},{value:"pairAddress",id:"pairaddress",level:3},{value:"pairLabel",id:"pairlabel",level:3},{value:"priceUsd",id:"priceusd",level:3},{value:"quotePrice",id:"quoteprice",level:3},{value:"quoteToken",id:"quotetoken",level:3}],s={toc:p};function c(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmGetPairPrice"),(0,i.kt)("h1",{id:"class-evmgetpairprice"},"Class: EvmGetPairPrice"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmGetPairPrice"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#create"},"create")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#fromjson"},"fromJSON")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#tojson"},"toJSON"))),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#basetoken"},"baseToken")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#exchange"},"exchange")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#pairaddress"},"pairAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#pairlabel"},"pairLabel")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#priceusd"},"priceUsd")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#quoteprice"},"quotePrice")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice#quotetoken"},"quoteToken"))),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"create"},"create"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"create"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPrice"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"input")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairpriceinput"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPriceInput"))," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPrice")))))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPrice"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromjson"},"fromJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPrice"))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"json")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairpricejson"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPriceJSON")))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairprice"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPrice"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tojson"},"toJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairpricejson"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPriceJSON"))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmgetpairpricejson"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmGetPairPriceJSON"))),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"basetoken"},"baseToken"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"baseToken"),": ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmerc20metadata"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmErc20Metadata"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"exchange"},"exchange"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"exchange"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pairaddress"},"pairAddress"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"pairAddress"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pairlabel"},"pairLabel"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"pairLabel"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"priceusd"},"priceUsd"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"priceUsd"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"quoteprice"},"quotePrice"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"quotePrice"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"quotetoken"},"quoteToken"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"quoteToken"),": ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmerc20metadata"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmErc20Metadata"))))}c.isMDXComponent=!0}}]);