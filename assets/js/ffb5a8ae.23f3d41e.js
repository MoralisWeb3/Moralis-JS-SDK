"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7441],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>u});var l=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,l,n=function(e,t){if(null==e)return{};var a,l,n={},o=Object.keys(e);for(l=0;l<o.length;l++)a=o[l],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)a=o[l],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var m=l.createContext({}),p=function(e){var t=l.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=p(e.components);return l.createElement(m.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},d=l.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,m=e.parentName,s=r(e,["components","mdxType","originalType","parentName"]),d=p(a),u=n,v=d["".concat(m,".").concat(u)]||d[u]||k[u]||o;return a?l.createElement(v,i(i({ref:t},s),{},{components:a})):l.createElement(v,i({ref:t},s))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var r={};for(var m in t)hasOwnProperty.call(t,m)&&(r[m]=t[m]);r.originalType=e,r.mdxType="string"==typeof e?e:n,i[1]=r;for(var p=2;p<o;p++)i[p]=a[p];return l.createElement.apply(null,i)}return l.createElement.apply(null,a)}d.displayName="MDXCreateElement"},69053:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>k,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var l=a(87462),n=(a(67294),a(3905));const o={slug:"/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",title:"Class: EvmWalletProfitabilityTokenData",sidebar_label:"EvmWalletProfitabilityTokenData"},i=void 0,r={unversionedId:"api/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",id:"api/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",title:"Class: EvmWalletProfitabilityTokenData",description:"moralis-monorepo / @moralisweb3/common-evm-utils / EvmWalletProfitabilityTokenData",source:"@site/docs/api/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata.md",sourceDirName:"api/moralisweb3/common-evm-utils",slug:"/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata",title:"Class: EvmWalletProfitabilityTokenData",sidebar_label:"EvmWalletProfitabilityTokenData"},sidebar:"sidebar",previous:{title:"EvmWalletProfitabilityResponseJSON",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilityresponsejson"},next:{title:"EvmWalletProfitabilityTokenDataInput",permalink:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendatainput"}},m={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Methods",id:"methods",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods-1",level:2},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"fromJSON",id:"fromjson",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"toJSON",id:"tojson",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Properties",id:"properties-1",level:2},{value:"avgBuyPriceUsd",id:"avgbuypriceusd",level:3},{value:"avgCostOfQuantitySold",id:"avgcostofquantitysold",level:3},{value:"avgSellPriceUsd",id:"avgsellpriceusd",level:3},{value:"countOfTrades",id:"countoftrades",level:3},{value:"decimals",id:"decimals",level:3},{value:"logo",id:"logo",level:3},{value:"logoHash",id:"logohash",level:3},{value:"name",id:"name",level:3},{value:"possibleSpam",id:"possiblespam",level:3},{value:"realizedProfitPercentage",id:"realizedprofitpercentage",level:3},{value:"realizedProfitUsd",id:"realizedprofitusd",level:3},{value:"symbol",id:"symbol",level:3},{value:"thumbnail",id:"thumbnail",level:3},{value:"tokenAddress",id:"tokenaddress",level:3},{value:"totalBuys",id:"totalbuys",level:3},{value:"totalSells",id:"totalsells",level:3},{value:"totalSoldUsd",id:"totalsoldusd",level:3},{value:"totalTokensBought",id:"totaltokensbought",level:3},{value:"totalTokensSold",id:"totaltokenssold",level:3},{value:"totalUsdInvested",id:"totalusdinvested",level:3}],s={toc:p};function k(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,l.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils")," / EvmWalletProfitabilityTokenData"),(0,n.kt)("h1",{id:"class-evmwalletprofitabilitytokendata"},"Class: EvmWalletProfitabilityTokenData"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/index"},"@moralisweb3/common-evm-utils"),".EvmWalletProfitabilityTokenData"),(0,n.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,n.kt)("h3",{id:"methods"},"Methods"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#create"},"create")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#fromjson"},"fromJSON")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#tojson"},"toJSON"))),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#avgbuypriceusd"},"avgBuyPriceUsd")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#avgcostofquantitysold"},"avgCostOfQuantitySold")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#avgsellpriceusd"},"avgSellPriceUsd")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#countoftrades"},"countOfTrades")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#decimals"},"decimals")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#logo"},"logo")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#logohash"},"logoHash")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#name"},"name")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#possiblespam"},"possibleSpam")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#realizedprofitpercentage"},"realizedProfitPercentage")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#realizedprofitusd"},"realizedProfitUsd")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#symbol"},"symbol")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#thumbnail"},"thumbnail")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#tokenaddress"},"tokenAddress")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totalbuys"},"totalBuys")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totalsells"},"totalSells")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totalsoldusd"},"totalSoldUsd")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totaltokensbought"},"totalTokensBought")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totaltokenssold"},"totalTokensSold")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata#totalusdinvested"},"totalUsdInvested"))),(0,n.kt)("h2",{id:"methods-1"},"Methods"),(0,n.kt)("h3",{id:"create"},"create"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"create"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"input"),"): ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenData"))),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"input")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendatainput"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenDataInput"))," ","|"," ",(0,n.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenData")))))),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenData"))),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"fromjson"},"fromJSON"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"json"),"): ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenData"))),(0,n.kt)("h4",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"json")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendatajson"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenDataJSON")))))),(0,n.kt)("h4",{id:"returns-1"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendata"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenData"))),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"tojson"},"toJSON"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendatajson"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenDataJSON"))),(0,n.kt)("h4",{id:"returns-2"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmwalletprofitabilitytokendatajson"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmWalletProfitabilityTokenDataJSON"))),(0,n.kt)("h2",{id:"properties-1"},"Properties"),(0,n.kt)("h3",{id:"avgbuypriceusd"},"avgBuyPriceUsd"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"avgBuyPriceUsd"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Average buy price in USD."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"avgcostofquantitysold"},"avgCostOfQuantitySold"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"avgCostOfQuantitySold"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Average cost of sold quantity."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"avgsellpriceusd"},"avgSellPriceUsd"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"avgSellPriceUsd"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Average sell price in USD."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"countoftrades"},"countOfTrades"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"countOfTrades"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Count of trades for the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"decimals"},"decimals"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"decimals"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Decimals of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"logo"},"logo"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"logo"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Logo URL of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"logohash"},"logoHash"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"logoHash"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Logo hash of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"name"},"name"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"name"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Name of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"possiblespam"},"possibleSpam"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"possibleSpam"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"boolean")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Indicates whether the token is possibly spam."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"realizedprofitpercentage"},"realizedProfitPercentage"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"realizedProfitPercentage"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Realized profit percentage for the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"realizedprofitusd"},"realizedProfitUsd"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"realizedProfitUsd"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Realized profit in USD for the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"symbol"},"symbol"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"symbol"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Symbol of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"thumbnail"},"thumbnail"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"thumbnail"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Thumbnail image URL of the token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"tokenaddress"},"tokenAddress"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"tokenAddress"),": ",(0,n.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-evm-utils/evmaddress"},(0,n.kt)("inlineCode",{parentName:"a"},"EvmAddress"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"The address of the traded token."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totalbuys"},"totalBuys"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalBuys"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total number of buys."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totalsells"},"totalSells"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalSells"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total number of sells."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totalsoldusd"},"totalSoldUsd"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalSoldUsd"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total USD received from selling tokens."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totaltokensbought"},"totalTokensBought"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalTokensBought"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total tokens bought."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totaltokenssold"},"totalTokensSold"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalTokensSold"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total tokens sold."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"totalusdinvested"},"totalUsdInvested"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"totalUsdInvested"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,n.kt)("p",null,"Total USD invested."))}k.isMDXComponent=!0}}]);