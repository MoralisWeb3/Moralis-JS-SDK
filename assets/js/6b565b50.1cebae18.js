"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5335],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=m(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,v=u["".concat(o,".").concat(d)]||u[d]||c[d]||i;return n?a.createElement(v,l(l({ref:t},p),{},{components:n})):a.createElement(v,l({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var m={};for(var o in t)hasOwnProperty.call(t,o)&&(m[o]=t[o]);m.originalType=e,m.mdxType="string"==typeof e?e:r,l[1]=m;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7906:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>m,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={slug:"/moralisweb3/common-evm-utils/evmeventinput"},l=void 0,m={unversionedId:"moralisweb3/common-evm-utils/evmeventinput",id:"moralisweb3/common-evm-utils/evmeventinput",title:"evmeventinput",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmEventInput",source:"@site/docs/moralisweb3/common-evm-utils/evmeventinput.md",sourceDirName:"moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmeventinput",permalink:"/moralisweb3/common-evm-utils/evmeventinput",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmeventinput"},sidebar:"sidebar",previous:{title:"evmeventdata",permalink:"/moralisweb3/common-evm-utils/evmeventdata"},next:{title:"evmnative",permalink:"/moralisweb3/common-evm-utils/evmnative"}},o={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"blockHash",id:"blockhash",level:3},{value:"blockNumber",id:"blocknumber",level:3},{value:"blockTimestamp",id:"blocktimestamp",level:3},{value:"chain",id:"chain",level:3},{value:"data",id:"data",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"transactionHash",id:"transactionhash",level:3}],p={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmEventInput"),(0,r.kt)("h1",{id:"interface-evmeventinput"},"Interface: EvmEventInput"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmEventInput"),(0,r.kt)("p",null,"This can be any object with valid event data."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Example"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'const transactionInput = {\nchain: 1,\naddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",\nblockHash: "0x1bb168d2725d15b12604c92a83c529617cd54a415c5d610a687f7859d45f9ea5",\nblockNumber: "14327217",\nblockTimestamp: "2022-03-05T13:45:42.000Z",\ntransactionHash: "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5",\ndata: {\n to: "0x54e41aa7ac19efd71d19a3ca6b8a6c0154fe3afb",\n from: "0x21f510cc9f81df4e4d2c705e672761cf487cdc5a",\n value: "878000000",\n},\n}\n')),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#address"},"address")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#blockhash"},"blockHash")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#blocknumber"},"blockNumber")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#blocktimestamp"},"blockTimestamp")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#chain"},"chain")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#data"},"data")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/evmeventinput#transactionhash"},"transactionHash"))),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"address"},"address"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"address"),": ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmAddressish"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"blockhash"},"blockHash"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"blockHash"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"blocknumber"},"blockNumber"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"blockNumber"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"BigNumberish")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"blocktimestamp"},"blockTimestamp"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"blockTimestamp"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"DateInput")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"chain"},"chain"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"chain"),": ",(0,r.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmchainish"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmChainish"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"data"},"data"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"data"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"from?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmAddressish")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"to?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmAddressish")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/moralisweb3/common-evm-utils/index#evmnativeish"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmNativeish")))))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"transactionhash"},"transactionHash"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"transactionHash"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")))}c.isMDXComponent=!0}}]);