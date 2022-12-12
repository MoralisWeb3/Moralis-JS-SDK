"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9706],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>k});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var m=n.createContext({}),s=function(e){var t=n.useContext(m),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(m.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,m=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(r),k=a,f=d["".concat(m,".").concat(k)]||d[k]||u[k]||o;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1963:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={slug:"/moralisweb3/common-evm-utils/gettokentransfersrequest"},i=void 0,l={unversionedId:"moralisweb3/common-evm-utils/gettokentransfersrequest",id:"moralisweb3/common-evm-utils/gettokentransfersrequest",title:"gettokentransfersrequest",description:"moralis-monorepo / @moralisweb3/common-evm-utils / GetTokenTransfersRequest",source:"@site/docs/moralisweb3/common-evm-utils/gettokentransfersrequest.md",sourceDirName:"moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/gettokentransfersrequest",permalink:"/moralisweb3/common-evm-utils/gettokentransfersrequest",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/gettokentransfersrequest"}},m={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"chain",id:"chain",level:3},{value:"fromBlock",id:"fromblock",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"fromDate",id:"fromdate",level:3},{value:"limit",id:"limit",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"offset",id:"offset",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"subdomain",id:"subdomain",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"toBlock",id:"toblock",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"toDate",id:"todate",level:3}],p={toc:s};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / GetTokenTransfersRequest"),(0,a.kt)("h1",{id:"interface-gettokentransfersrequest"},"Interface: GetTokenTransfersRequest"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".GetTokenTransfersRequest"),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Camelize"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"Omit"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"RequestParams"),", ",(0,a.kt)("inlineCode",{parentName:"p"},'"chain"')," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"address"')," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"from_date"')," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"to_date"'),">",">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"GetTokenTransfersRequest"))))),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#address"},"address")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#chain"},"chain")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#fromblock"},"fromBlock")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#fromdate"},"fromDate")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#limit"},"limit")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#offset"},"offset")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#subdomain"},"subdomain")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#toblock"},"toBlock")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/moralisweb3/common-evm-utils/gettokentransfersrequest#todate"},"toDate"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"address"},"address"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"address"),": ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmaddressish"},(0,a.kt)("inlineCode",{parentName:"a"},"EvmAddressish"))),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"chain"},"chain"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"chain"),": ",(0,a.kt)("a",{parentName:"p",href:"/moralisweb3/common-evm-utils/index#evmchainish"},(0,a.kt)("inlineCode",{parentName:"a"},"EvmChainish"))),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"fromblock"},"fromBlock"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"fromBlock"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,"Camelize.fromBlock"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"fromdate"},"fromDate"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"fromDate"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"DateInput")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"limit"},"limit"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"limit"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,"Camelize.limit"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"offset"},"offset"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"offset"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,a.kt)("p",null,"Camelize.offset"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"subdomain"},"subdomain"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"subdomain"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,a.kt)("p",null,"Camelize.subdomain"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"toblock"},"toBlock"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"toBlock"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,a.kt)("p",null,"Camelize.toBlock"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"todate"},"toDate"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"toDate"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"DateInput")))}u.isMDXComponent=!0}}]);