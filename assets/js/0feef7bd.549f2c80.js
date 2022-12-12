"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2822],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>u});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),m=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=m(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=m(r),u=o,f=d["".concat(p,".").concat(u)]||d[u]||c[u]||a;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function u(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var m=2;m<a;m++)l[m]=r[m];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9916:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>m});var n=r(7462),o=(r(7294),r(3905));const a={slug:"/moralisweb3/common-core/axiosretryconfig"},l=void 0,i={unversionedId:"moralisweb3/common-core/axiosretryconfig",id:"moralisweb3/common-core/axiosretryconfig",title:"axiosretryconfig",description:"moralis-monorepo / @moralisweb3/common-core / AxiosRetryConfig",source:"@site/docs/moralisweb3/common-core/axiosretryconfig.md",sourceDirName:"moralisweb3/common-core",slug:"/moralisweb3/common-core/axiosretryconfig",permalink:"/moralisweb3/common-core/axiosretryconfig",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-core/axiosretryconfig"}},p={},m=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"allowedMethods",id:"allowedmethods",level:3},{value:"allowedResponseStatuses",id:"allowedresponsestatuses",level:3},{value:"beforeRetry",id:"beforeretry",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"maxAttempts",id:"maxattempts",level:3}],s={toc:m};function c(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/nodejs-sdk-references"},"moralis-monorepo")," / ",(0,o.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/index"},"@moralisweb3/common-core")," / AxiosRetryConfig"),(0,o.kt)("h1",{id:"interface-axiosretryconfig"},"Interface: AxiosRetryConfig"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/moralisweb3/common-core/index"},"@moralisweb3/common-core"),".AxiosRetryConfig"),(0,o.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,o.kt)("h3",{id:"properties"},"Properties"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/axiosretryconfig#allowedmethods"},"allowedMethods")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/axiosretryconfig#allowedresponsestatuses"},"allowedResponseStatuses")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/axiosretryconfig#beforeretry"},"beforeRetry")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/moralisweb3/common-core/axiosretryconfig#maxattempts"},"maxAttempts"))),(0,o.kt)("h2",{id:"properties-1"},"Properties"),(0,o.kt)("h3",{id:"allowedmethods"},"allowedMethods"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"allowedMethods"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"allowedresponsestatuses"},"allowedResponseStatuses"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"allowedResponseStatuses"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"beforeretry"},"beforeRetry"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"beforeRetry"),": (",(0,o.kt)("inlineCode",{parentName:"p"},"attempt"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"error"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"AxiosError"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"any"),">",") => ",(0,o.kt)("inlineCode",{parentName:"p"},"void")),(0,o.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,o.kt)("p",null,"\u25b8 (",(0,o.kt)("inlineCode",{parentName:"p"},"attempt"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"error"),"): ",(0,o.kt)("inlineCode",{parentName:"p"},"void")),(0,o.kt)("h5",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"attempt")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"number"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"error")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"AxiosError"),"<",(0,o.kt)("inlineCode",{parentName:"td"},"unknown"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"any"),">")))),(0,o.kt)("h5",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"void")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"maxattempts"},"maxAttempts"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"maxAttempts"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")))}c.isMDXComponent=!0}}]);