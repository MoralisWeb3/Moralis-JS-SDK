"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[18421],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>d});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var m=n.createContext({}),s=function(e){var r=n.useContext(m),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=s(e.components);return n.createElement(m.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},c=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,m=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(t),d=o,v=c["".concat(m,".").concat(d)]||c[d]||p[d]||i;return t?n.createElement(v,a(a({ref:r},u),{},{components:t})):n.createElement(v,a({ref:r},u))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=c;var l={};for(var m in r)hasOwnProperty.call(r,m)&&(l[m]=r[m]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var s=2;s<i;s++)a[s]=t[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}c.displayName="MDXCreateElement"},75301:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>m,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=t(87462),o=(t(67294),t(3905));const i={slug:"/moralisweb3/common-evm-utils/resolvedomainrequest",title:"Interface: ResolveDomainRequest",sidebar_label:"ResolveDomainRequest"},a=void 0,l={unversionedId:"api/moralisweb3/common-evm-utils/resolvedomainrequest",id:"api/moralisweb3/common-evm-utils/resolvedomainrequest",title:"Interface: ResolveDomainRequest",description:"moralis-monorepo / @moralisweb3/common-evm-utils / ResolveDomainRequest",source:"@site/docs/api/moralisweb3/common-evm-utils/resolvedomainrequest.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/resolvedomainrequest",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/resolvedomainrequest",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/resolvedomainrequest",title:"Interface: ResolveDomainRequest",sidebar_label:"ResolveDomainRequest"},sidebar:"sidebar",previous:{title:"ResolveAddressToDomainOperationRequestJSON",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/resolveaddresstodomainoperationrequestjson"},next:{title:"ResolveDomainResponseAdapter",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/resolvedomainresponseadapter"}},m={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"currency",id:"currency",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"domain",id:"domain",level:3},{value:"Inherited from",id:"inherited-from-1",level:4}],u={toc:s};function p(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / ResolveDomainRequest"),(0,o.kt)("h1",{id:"interface-resolvedomainrequest"},"Interface: ResolveDomainRequest"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".ResolveDomainRequest"),(0,o.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"Camelize"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"RequestParams"),">"),(0,o.kt)("p",{parentName:"li"},"\u21b3 ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"},"ResolveDomainRequest"))))),(0,o.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,o.kt)("h3",{id:"properties"},"Properties"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/resolvedomainrequest#currency"},"currency")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/resolvedomainrequest#domain"},"domain"))),(0,o.kt)("h2",{id:"properties-1"},"Properties"),(0,o.kt)("h3",{id:"currency"},"currency"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"currency"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,o.kt)("inlineCode",{parentName:"p"},'"eth"')," ","|"," ",(0,o.kt)("inlineCode",{parentName:"p"},'"0x1"')),(0,o.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,o.kt)("p",null,"Camelize.currency"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"domain"},"domain"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"domain"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,o.kt)("p",null,"Camelize.domain"))}p.isMDXComponent=!0}}]);