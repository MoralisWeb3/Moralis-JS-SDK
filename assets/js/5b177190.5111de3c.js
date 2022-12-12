"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6616],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var m=n.createContext({}),s=function(e){var t=n.useContext(m),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(m.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,m=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=s(r),d=i,f=u["".concat(m,".").concat(d)]||u[d]||c[d]||a;return r?n.createElement(f,l(l({ref:t},p),{},{components:r})):n.createElement(f,l({ref:t},p))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=u;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<a;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9367:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var n=r(7462),i=(r(7294),r(3905));const a={slug:"/moralisweb3/common-evm-utils/getnftlowestpricerequest"},l=void 0,o={unversionedId:"moralisweb3/common-evm-utils/getnftlowestpricerequest",id:"moralisweb3/common-evm-utils/getnftlowestpricerequest",title:"getnftlowestpricerequest",description:"moralis-monorepo / @moralisweb3/common-evm-utils / GetNFTLowestPriceRequest",source:"@site/docs/moralisweb3/common-evm-utils/getnftlowestpricerequest.md",sourceDirName:"moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/getnftlowestpricerequest",permalink:"/moralisweb3/common-evm-utils/getnftlowestpricerequest",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/getnftlowestpricerequest"}},m={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"chain",id:"chain",level:3},{value:"days",id:"days",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"marketplace",id:"marketplace",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"providerUrl",id:"providerurl",level:3},{value:"Inherited from",id:"inherited-from-2",level:4}],p={toc:s};function c(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,i.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / GetNFTLowestPriceRequest"),(0,i.kt)("h1",{id:"interface-getnftlowestpricerequest"},"Interface: GetNFTLowestPriceRequest"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".GetNFTLowestPriceRequest"),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"Camelize"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"Omit"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"RequestParams"),", ",(0,i.kt)("inlineCode",{parentName:"p"},'"chain"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"address"'),">",">"),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"GetNFTLowestPriceRequest"))))),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftlowestpricerequest#address"},"address")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftlowestpricerequest#chain"},"chain")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftlowestpricerequest#days"},"days")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftlowestpricerequest#marketplace"},"marketplace")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftlowestpricerequest#providerurl"},"providerUrl"))),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"address"},"address"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"address"),": ",(0,i.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmAddressish"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"chain"},"chain"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"chain"),": ",(0,i.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmchainish"},(0,i.kt)("inlineCode",{parentName:"a"},"EvmChainish"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"days"},"days"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"days"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"Camelize.days"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"marketplace"},"marketplace"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"marketplace"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"opensea"')),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,"Camelize.marketplace"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"providerurl"},"providerUrl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"providerUrl"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,"Camelize.providerUrl"))}c.isMDXComponent=!0}}]);