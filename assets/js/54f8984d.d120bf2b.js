"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8461],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=o.createContext({}),p=function(e){var t=o.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return o.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),d=n,b=u["".concat(i,".").concat(d)]||u[d]||m[d]||a;return r?o.createElement(b,l(l({ref:t},c),{},{components:r})):o.createElement(b,l({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var p=2;p<a;p++)l[p]=r[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2856:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var o=r(7462),n=(r(7294),r(3905));const a={slug:"/moralisweb3/common-evm-utils/getblockresponseadapter",title:"Interface: GetBlockResponseAdapter",sidebar_label:"GetBlockResponseAdapter"},l=void 0,s={unversionedId:"api/moralisweb3/common-evm-utils/getblockresponseadapter",id:"api/moralisweb3/common-evm-utils/getblockresponseadapter",title:"Interface: GetBlockResponseAdapter",description:"moralis-monorepo / @moralisweb3/common-evm-utils / GetBlockResponseAdapter",source:"@site/docs/api/moralisweb3/common-evm-utils/getblockresponseadapter.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/getblockresponseadapter",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/getblockresponseadapter",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/getblockresponseadapter",title:"Interface: GetBlockResponseAdapter",sidebar_label:"GetBlockResponseAdapter"},sidebar:"sidebar",previous:{title:"GetBlockRequest",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/getblockrequest"},next:{title:"GetContractEventsRequest",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/getcontracteventsrequest"}},i={},p=[{value:"Hierarchy",id:"hierarchy",level:2}],c={toc:p};function m(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / GetBlockResponseAdapter"),(0,n.kt)("h1",{id:"interface-getblockresponseadapter"},"Interface: GetBlockResponseAdapter"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".GetBlockResponseAdapter"),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"ResponseAdapter"),"<",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#getblockresponse"},(0,n.kt)("inlineCode",{parentName:"a"},"GetBlockResponse")),", ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index#getblockjsonresponse"},(0,n.kt)("inlineCode",{parentName:"a"},"GetBlockJSONResponse")),">"),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"GetBlockResponseAdapter"))))))}m.isMDXComponent=!0}}]);