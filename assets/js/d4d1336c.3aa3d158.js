"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[18165],{3905:(t,e,a)=>{a.d(e,{Zo:()=>u,kt:()=>d});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),l=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):o(o({},e),t)),a},u=function(t){var e=l(t.components);return n.createElement(p.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},c=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,i=t.originalType,p=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),c=l(a),d=r,b=c["".concat(p,".").concat(d)]||c[d]||m[d]||i;return a?n.createElement(b,o(o({ref:e},u),{},{components:a})):n.createElement(b,o({ref:e},u))}));function d(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=a.length,o=new Array(i);o[0]=c;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s.mdxType="string"==typeof t?t:r,o[1]=s;for(var l=2;l<i;l++)o[l]=a[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},88757:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=a(87462),r=(a(67294),a(3905));const i={slug:"/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",title:"Interface: AptosSubmitTransactionRequestInput",sidebar_label:"AptosSubmitTransactionRequestInput"},o=void 0,s={unversionedId:"api/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",id:"api/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",title:"Interface: AptosSubmitTransactionRequestInput",description:"moralis-monorepo / @moralisweb3/common-aptos-utils / AptosSubmitTransactionRequestInput",source:"@site/docs/api/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput.md",sourceDirName:"api/moralisweb3/common-aptos-utils",slug:"/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",permalink:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput",title:"Interface: AptosSubmitTransactionRequestInput",sidebar_label:"AptosSubmitTransactionRequestInput"},sidebar:"sidebar",previous:{title:"AptosSubmitTransactionRequest",permalink:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequest"},next:{title:"AptosSubmitTransactionRequestJSON",permalink:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestjson"}},p={},l=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"expirationTimestampSecs",id:"expirationtimestampsecs",level:3},{value:"gasUnitPrice",id:"gasunitprice",level:3},{value:"maxGasAmount",id:"maxgasamount",level:3},{value:"payload",id:"payload",level:3},{value:"sender",id:"sender",level:3},{value:"sequenceNumber",id:"sequencenumber",level:3},{value:"signature",id:"signature",level:3}],u={toc:l};function m(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index"},"@moralisweb3/common-aptos-utils")," / AptosSubmitTransactionRequestInput"),(0,r.kt)("h1",{id:"interface-aptossubmittransactionrequestinput"},"Interface: AptosSubmitTransactionRequestInput"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index"},"@moralisweb3/common-aptos-utils"),".AptosSubmitTransactionRequestInput"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#expirationtimestampsecs"},"expirationTimestampSecs")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#gasunitprice"},"gasUnitPrice")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#maxgasamount"},"maxGasAmount")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#payload"},"payload")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#sender"},"sender")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#sequencenumber"},"sequenceNumber")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/aptossubmittransactionrequestinput#signature"},"signature"))),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"expirationtimestampsecs"},"expirationTimestampSecs"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"expirationTimestampSecs"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"gasunitprice"},"gasUnitPrice"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"gasUnitPrice"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"maxgasamount"},"maxGasAmount"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"maxGasAmount"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"payload"},"payload"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"payload"),": ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index#aptossubmittransactionrequestpayloadinput"},(0,r.kt)("inlineCode",{parentName:"a"},"AptosSubmitTransactionRequestPayloadInput"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index#aptossubmittransactionrequestpayloadvalue"},(0,r.kt)("inlineCode",{parentName:"a"},"AptosSubmitTransactionRequestPayloadValue"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"sender"},"sender"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"sender"),": ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index#aptosaddressinput"},(0,r.kt)("inlineCode",{parentName:"a"},"AptosAddressInput"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"sequencenumber"},"sequenceNumber"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"sequenceNumber"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"signature"},"signature"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"signature"),": ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index#aptossubmittransactionrequestsignatureinput"},(0,r.kt)("inlineCode",{parentName:"a"},"AptosSubmitTransactionRequestSignatureInput"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-aptos-utils/index#aptossubmittransactionrequestsignaturevalue"},(0,r.kt)("inlineCode",{parentName:"a"},"AptosSubmitTransactionRequestSignatureValue"))))}m.isMDXComponent=!0}}]);