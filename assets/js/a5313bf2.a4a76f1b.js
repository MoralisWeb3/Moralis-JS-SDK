"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[45183],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>c});var a=r(67294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,l=function(e,t){if(null==e)return{};var r,a,l={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var s=a.createContext({}),m=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=m(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,l=e.mdxType,n=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),k=m(r),c=l,u=k["".concat(s,".").concat(c)]||k[c]||d[c]||n;return r?a.createElement(u,o(o({ref:t},p),{},{components:r})):a.createElement(u,o({ref:t},p))}));function c(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var n=r.length,o=new Array(n);o[0]=k;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:l,o[1]=i;for(var m=2;m<n;m++)o[m]=r[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},8954:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>i,toc:()=>m});var a=r(87462),l=(r(67294),r(3905));const n={slug:"/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",title:"Interface: EvmWalletHistoryErc20TransferJSON",sidebar_label:"EvmWalletHistoryErc20TransferJSON"},o=void 0,i={unversionedId:"api/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",id:"api/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",title:"Interface: EvmWalletHistoryErc20TransferJSON",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmWalletHistoryErc20TransferJSON",source:"@site/docs/api/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson",title:"Interface: EvmWalletHistoryErc20TransferJSON",sidebar_label:"EvmWalletHistoryErc20TransferJSON"},sidebar:"sidebar",previous:{title:"EvmWalletHistoryErc20TransferInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferinput"},next:{title:"EvmWalletHistoryInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryinput"}},s={},m=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"block_timestamp",id:"block_timestamp",level:3},{value:"from_address",id:"from_address",level:3},{value:"from_address_label",id:"from_address_label",level:3},{value:"log_index",id:"log_index",level:3},{value:"possible_spam",id:"possible_spam",level:3},{value:"to_address",id:"to_address",level:3},{value:"to_address_label",id:"to_address_label",level:3},{value:"token_decimals",id:"token_decimals",level:3},{value:"token_logo",id:"token_logo",level:3},{value:"token_name",id:"token_name",level:3},{value:"token_symbol",id:"token_symbol",level:3},{value:"value",id:"value",level:3},{value:"value_formatted",id:"value_formatted",level:3},{value:"verified_contract",id:"verified_contract",level:3}],p={toc:m};function d(e){let{components:t,...r}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,l.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmWalletHistoryErc20TransferJSON"),(0,l.kt)("h1",{id:"interface-evmwallethistoryerc20transferjson"},"Interface: EvmWalletHistoryErc20TransferJSON"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmWalletHistoryErc20TransferJSON"),(0,l.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,l.kt)("h3",{id:"properties"},"Properties"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#address"},"address")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#block_timestamp"},"block","_","timestamp")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#from_address"},"from","_","address")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#from_address_label"},"from","_","address","_","label")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#log_index"},"log","_","index")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#possible_spam"},"possible","_","spam")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#to_address"},"to","_","address")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#to_address_label"},"to","_","address","_","label")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#token_decimals"},"token","_","decimals")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#token_logo"},"token","_","logo")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#token_name"},"token","_","name")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#token_symbol"},"token","_","symbol")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#value"},"value")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#value_formatted"},"value","_","formatted")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwallethistoryerc20transferjson#verified_contract"},"verified","_","contract"))),(0,l.kt)("h2",{id:"properties-1"},"Properties"),(0,l.kt)("h3",{id:"address"},"address"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"address"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"block_timestamp"},"block","_","timestamp"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"block","_","timestamp"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"from_address"},"from","_","address"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"from","_","address"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"from_address_label"},"from","_","address","_","label"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"from","_","address","_","label"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"log_index"},"log","_","index"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"log","_","index"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"number")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"possible_spam"},"possible","_","spam"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"possible","_","spam"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"boolean")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"to_address"},"to","_","address"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"to","_","address"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"to_address_label"},"to","_","address","_","label"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"to","_","address","_","label"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"token_decimals"},"token","_","decimals"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"token","_","decimals"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"token_logo"},"token","_","logo"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"token","_","logo"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"token_name"},"token","_","name"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"token","_","name"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"token_symbol"},"token","_","symbol"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"token","_","symbol"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"value"},"value"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"value"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"value_formatted"},"value","_","formatted"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"value","_","formatted"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"verified_contract"},"verified","_","contract"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,l.kt)("strong",{parentName:"p"},"verified","_","contract"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"boolean")))}d.isMDXComponent=!0}}]);