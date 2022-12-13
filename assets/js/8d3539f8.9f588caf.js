"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6197],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>d});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},l=Object.keys(e);for(o=0;o<l.length;o++)r=l[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)r=l[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=o.createContext({}),p=function(e){var t=o.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},m=function(e){var t=p(e.components);return o.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(r),d=n,f=c["".concat(i,".").concat(d)]||c[d]||u[d]||l;return r?o.createElement(f,a(a({ref:t},m),{},{components:r})):o.createElement(f,a({ref:t},m))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,a=new Array(l);a[0]=c;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,a[1]=s;for(var p=2;p<l;p++)a[p]=r[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}c.displayName="MDXCreateElement"},2572:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var o=r(7462),n=(r(7294),r(3905));const l={slug:"/moralisweb3/common-sol-utils/getsplrequest",title:"Interface: GetSPLRequest",sidebar_label:"GetSPLRequest"},a=void 0,s={unversionedId:"api/moralisweb3/common-sol-utils/getsplrequest",id:"api/moralisweb3/common-sol-utils/getsplrequest",title:"Interface: GetSPLRequest",description:"moralis-monorepo / @moralisweb3/common-sol-utils / GetSPLRequest",source:"@site/docs/api/moralisweb3/common-sol-utils/getsplrequest.md",sourceDirName:"api/moralisweb3/common-sol-utils",slug:"/moralisweb3/common-sol-utils/getsplrequest",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/getsplrequest",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-sol-utils/getsplrequest",title:"Interface: GetSPLRequest",sidebar_label:"GetSPLRequest"},sidebar:"sidebar",previous:{title:"GetSPLJSONResponse",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/getspljsonresponse"},next:{title:"GetSPLResponseAdapter",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/getsplresponseadapter"}},i={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"network",id:"network",level:3}],m={toc:p};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index"},"@moralisweb3/common-sol-utils")," / GetSPLRequest"),(0,n.kt)("h1",{id:"interface-getsplrequest"},"Interface: GetSPLRequest"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index"},"@moralisweb3/common-sol-utils"),".GetSPLRequest"),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"Camelize"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"Omit"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"PathParams"),", ",(0,n.kt)("inlineCode",{parentName:"p"},'"network"')," ","|"," ",(0,n.kt)("inlineCode",{parentName:"p"},'"address"'),">",">"),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"GetSPLRequest"))))),(0,n.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/getsplrequest#address"},"address")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/getsplrequest#network"},"network"))),(0,n.kt)("h2",{id:"properties-1"},"Properties"),(0,n.kt)("h3",{id:"address"},"address"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"address"),": ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index#soladdressish"},(0,n.kt)("inlineCode",{parentName:"a"},"SolAddressish"))),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"network"},"network"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"network"),": ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/index#solnetworkish"},(0,n.kt)("inlineCode",{parentName:"a"},"SolNetworkish"))))}u.isMDXComponent=!0}}]);