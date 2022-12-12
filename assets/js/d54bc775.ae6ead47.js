"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[97],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),m=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=m(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=m(r),f=a,d=u["".concat(s,".").concat(f)]||u[f]||p[f]||i;return r?n.createElement(d,o(o({ref:t},c),{},{components:r})):n.createElement(d,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var m=2;m<i;m++)o[m]=r[m];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3772:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>m});var n=r(7462),a=(r(7294),r(3905));const i={slug:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest"},o=void 0,l={unversionedId:"moralisweb3/common-evm-utils/getnftcontracttransfersrequest",id:"moralisweb3/common-evm-utils/getnftcontracttransfersrequest",title:"getnftcontracttransfersrequest",description:"moralis-monorepo / @moralisweb3/common-evm-utils / GetNFTContractTransfersRequest",source:"@site/docs/moralisweb3/common-evm-utils/getnftcontracttransfersrequest.md",sourceDirName:"moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest",permalink:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest"}},s={},m=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"chain",id:"chain",level:3},{value:"cursor",id:"cursor",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"format",id:"format",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"limit",id:"limit",level:3},{value:"Inherited from",id:"inherited-from-2",level:4}],c={toc:m};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / GetNFTContractTransfersRequest"),(0,a.kt)("h1",{id:"interface-getnftcontracttransfersrequest"},"Interface: GetNFTContractTransfersRequest"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".GetNFTContractTransfersRequest"),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Camelize"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"Omit"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"RequestParams"),", ",(0,a.kt)("inlineCode",{parentName:"p"},'"chain"')," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"address"'),">",">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"GetNFTContractTransfersRequest"))))),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest#address"},"address")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest#chain"},"chain")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest#cursor"},"cursor")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest#format"},"format")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/getnftcontracttransfersrequest#limit"},"limit"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"address"},"address"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"address"),": ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,a.kt)("inlineCode",{parentName:"a"},"EvmAddressish"))),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"chain"},"chain"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"chain"),": ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmchainish"},(0,a.kt)("inlineCode",{parentName:"a"},"EvmChainish"))),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"cursor"},"cursor"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"cursor"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,"Camelize.cursor"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"format"},"format"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"format"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"hex"')," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"decimal"')),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,"Camelize.format"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"limit"},"limit"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"limit"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,a.kt)("p",null,"Camelize.limit"))}p.isMDXComponent=!0}}]);