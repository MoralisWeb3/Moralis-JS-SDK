"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[844],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),k=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):m(m({},t),e)),a},p=function(e){var t=k(e.components);return n.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=k(a),d=r,u=c["".concat(i,".").concat(d)]||c[d]||s[d]||o;return a?n.createElement(u,m(m({ref:t},p),{},{components:a})):n.createElement(u,m({ref:t},p))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,m=new Array(o);m[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,m[1]=l;for(var k=2;k<o;k++)m[k]=a[k];return n.createElement.apply(null,m)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},47553:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>m,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>k});var n=a(87462),r=(a(67294),a(3905));const o={slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",title:"Class: EvmMarketDataERC20TokenItem",sidebar_label:"EvmMarketDataERC20TokenItem"},m=void 0,l={unversionedId:"api/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",id:"api/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",title:"Class: EvmMarketDataERC20TokenItem",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmMarketDataERC20TokenItem",source:"@site/docs/api/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem",title:"Class: EvmMarketDataERC20TokenItem",sidebar_label:"EvmMarketDataERC20TokenItem"},sidebar:"sidebar",previous:{title:"EvmInternalTransactionInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evminternaltransactioninput"},next:{title:"EvmMarketDataERC20TokenItemInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokeniteminput"}},i={},k=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Properties",id:"properties-1",level:2},{value:"contractAddress",id:"contractaddress",level:3},{value:"marketCapUsd",id:"marketcapusd",level:3},{value:"price24hPercentChange",id:"price24hpercentchange",level:3},{value:"price7dPercentChange",id:"price7dpercentchange",level:3},{value:"priceUsd",id:"priceusd",level:3},{value:"rank",id:"rank",level:3},{value:"tokenDecimals",id:"tokendecimals",level:3},{value:"tokenLogo",id:"tokenlogo",level:3},{value:"tokenName",id:"tokenname",level:3},{value:"tokenSymbol",id:"tokensymbol",level:3}],p={toc:k};function s(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmMarketDataERC20TokenItem"),(0,r.kt)("h1",{id:"class-evmmarketdataerc20tokenitem"},"Class: EvmMarketDataERC20TokenItem"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmMarketDataERC20TokenItem"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#create"},"create")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#fromjson"},"fromJSON")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#tojson"},"toJSON"))),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#contractaddress"},"contractAddress")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#marketcapusd"},"marketCapUsd")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#price24hpercentchange"},"price24hPercentChange")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#price7dpercentchange"},"price7dPercentChange")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#priceusd"},"priceUsd")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#rank"},"rank")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#tokendecimals"},"tokenDecimals")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#tokenlogo"},"tokenLogo")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#tokenname"},"tokenName")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem#tokensymbol"},"tokenSymbol"))),(0,r.kt)("h2",{id:"methods-1"},"Methods"),(0,r.kt)("h3",{id:"create"},"create"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"create"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"input")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokeniteminput"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItemInput"))," ","|"," ",(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem")))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"fromjson"},"fromJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,r.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"json")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitemjson"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItemJSON")))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitem"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItem"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tojson"},"toJSON"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitemjson"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItemJSON"))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmmarketdataerc20tokenitemjson"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmMarketDataERC20TokenItemJSON"))),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"contractaddress"},"contractAddress"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"contractAddress"),": ",(0,r.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmaddress"},(0,r.kt)("inlineCode",{parentName:"a"},"EvmAddress"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The contract address"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"marketcapusd"},"marketCapUsd"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"marketCapUsd"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The market cap in USD"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"price24hpercentchange"},"price24hPercentChange"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"price24hPercentChange"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The price change in the last 24h"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"price7dpercentchange"},"price7dPercentChange"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"price7dPercentChange"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The price change in the last 7d"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"priceusd"},"priceUsd"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"priceUsd"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The price in USD"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"rank"},"rank"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"rank"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The rank"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tokendecimals"},"tokenDecimals"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"tokenDecimals"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The token decimals"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tokenlogo"},"tokenLogo"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"tokenLogo"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The token image"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tokenname"},"tokenName"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"tokenName"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The token name"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tokensymbol"},"tokenSymbol"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"tokenSymbol"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,r.kt)("p",null,"The token symbol"))}s.isMDXComponent=!0}}]);