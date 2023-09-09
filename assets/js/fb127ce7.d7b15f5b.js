"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[75227],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var m=n.createContext({}),s=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=s(e.components);return n.createElement(m.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=s(a),u=r,v=d["".concat(m,".").concat(u)]||d[u]||c[u]||i;return a?n.createElement(v,l(l({ref:t},p),{},{components:a})):n.createElement(v,l({ref:t},p))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},77419:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var n=a(87462),r=(a(67294),a(3905));const i={slug:"/moralisweb3/common-evm-utils/evmchainlist",title:"Class: EvmChainList",sidebar_label:"EvmChainList"},l=void 0,o={unversionedId:"api/moralisweb3/common-evm-utils/evmchainlist",id:"api/moralisweb3/common-evm-utils/evmchainlist",title:"Class: EvmChainList",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmChainList",source:"@site/docs/api/moralisweb3/common-evm-utils/evmchainlist.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmchainlist",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainlist",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmchainlist",title:"Class: EvmChainList",sidebar_label:"EvmChainList"},sidebar:"sidebar",previous:{title:"EvmChainFeature",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainfeature"},next:{title:"EvmChainListDataEntry",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainlistdataentry"}},m={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3}],p={toc:s};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmChainList"),(0,r.kt)("h1",{id:"class-evmchainlist"},"Class: EvmChainList"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmChainList"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainlist#create"},"create")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainlist#fromjson"},"fromJSON"))),(0,r.kt)("h3",{id:"constructors"},"Constructors"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmchainlist#constructor"},"constructor"))),(0,r.kt)("h2",{id:"methods-1"},"Methods"),(0,r.kt)("h3",{id:"create"},"create"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"create"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#evmchainlistvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainListValue"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"input")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},'"eth"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"polygon"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"fantom"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"palm"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x1"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x5"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0xaa36a7"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x89"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x13881"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x38"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x61"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0xa86a"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0xfa"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x19"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0x2a15c308d"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"0xa4b1"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"goerli"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"sepolia"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"mumbai"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"bsc"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"bsc testnet"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"avalanche"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"cronos"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"arbitrum"'))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#evmchainlistvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainListValue"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"fromjson"},"fromJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#evmchainlistvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainListValue"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"json")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#evmchainlistjson"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainListJSON")))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#evmchainlistvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainListValue"))),(0,r.kt)("h2",{id:"constructors-1"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new EvmChainList"),"()"))}c.isMDXComponent=!0}}]);