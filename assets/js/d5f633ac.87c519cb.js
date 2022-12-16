"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6727],{3905:(e,n,a)=>{a.d(n,{Zo:()=>m,kt:()=>k});var t=a(7294);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function r(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=t.createContext({}),p=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):r(r({},n),e)),a},m=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=p(a),k=i,N=d["".concat(s,".").concat(k)]||d[k]||u[k]||l;return a?t.createElement(N,r(r({ref:n},m),{},{components:a})):t.createElement(N,r({ref:n},m))}));function k(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=d;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<l;p++)r[p]=a[p];return t.createElement.apply(null,r)}return t.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2863:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var t=a(7462),i=(a(7294),a(3905));const l={slug:"/moralisweb3/common-auth-utils/index",title:"Module: @moralisweb3/common-auth-utils",sidebar_label:"@moralisweb3/common-auth-utils"},r=void 0,o={unversionedId:"api/moralisweb3/common-auth-utils/index",id:"api/moralisweb3/common-auth-utils/index",title:"Module: @moralisweb3/common-auth-utils",description:"moralis-monorepo / @moralisweb3/common-auth-utils",source:"@site/docs/api/moralisweb3/common-auth-utils/index.md",sourceDirName:"api/moralisweb3/common-auth-utils",slug:"/moralisweb3/common-auth-utils/index",permalink:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index",draft:!1,tags:[],version:"current",frontMatter:{slug:"/moralisweb3/common-auth-utils/index",title:"Module: @moralisweb3/common-auth-utils",sidebar_label:"@moralisweb3/common-auth-utils"},sidebar:"sidebar",previous:{title:"SolNetworkResolver",permalink:"/Moralis-JS-SDK/moralisweb3/common-sol-utils/solnetworkresolver"},next:{title:"@moralisweb3/common-auth-utils",permalink:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index"}},s={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Type Aliases",id:"type-aliases",level:3},{value:"Interfaces",id:"interfaces",level:3},{value:"Variables",id:"variables",level:3},{value:"Type Aliases",id:"type-aliases-1",level:2},{value:"RequestChallengeEvmJSONRequest",id:"requestchallengeevmjsonrequest",level:3},{value:"RequestChallengeEvmJSONResponse",id:"requestchallengeevmjsonresponse",level:3},{value:"RequestChallengeEvmResponse",id:"requestchallengeevmresponse",level:3},{value:"RequestChallengeSolanaJSONRequest",id:"requestchallengesolanajsonrequest",level:3},{value:"RequestChallengeSolanaJSONResponse",id:"requestchallengesolanajsonresponse",level:3},{value:"RequestChallengeSolanaResponse",id:"requestchallengesolanaresponse",level:3},{value:"VerifyChallengeEvmJSONRequest",id:"verifychallengeevmjsonrequest",level:3},{value:"VerifyChallengeEvmJSONResponse",id:"verifychallengeevmjsonresponse",level:3},{value:"VerifyChallengeEvmResponse",id:"verifychallengeevmresponse",level:3},{value:"VerifyChallengeSolanaJSONRequest",id:"verifychallengesolanajsonrequest",level:3},{value:"VerifyChallengeSolanaJSONResponse",id:"verifychallengesolanajsonresponse",level:3},{value:"VerifyChallengeSolanaResponse",id:"verifychallengesolanaresponse",level:3},{value:"Variables",id:"variables-1",level:2},{value:"operations",id:"operations",level:3},{value:"requestChallengeEvmOperation",id:"requestchallengeevmoperation",level:3},{value:"requestChallengeSolanaOperation",id:"requestchallengesolanaoperation",level:3},{value:"verifyChallengeEvmOperation",id:"verifychallengeevmoperation",level:3},{value:"verifyChallengeSolanaOperation",id:"verifychallengesolanaoperation",level:3}],m={toc:p};function u(e){let{components:n,...a}=e;return(0,i.kt)("wrapper",(0,t.Z)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/modules"},"moralis-monorepo")," / @moralisweb3/common-auth-utils"),(0,i.kt)("h1",{id:"module-moralisweb3common-auth-utils"},"Module: @moralisweb3/common-auth-utils"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"type-aliases"},"Type Aliases"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmjsonrequest"},"RequestChallengeEvmJSONRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmjsonresponse"},"RequestChallengeEvmJSONResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmresponse"},"RequestChallengeEvmResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanajsonrequest"},"RequestChallengeSolanaJSONRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanajsonresponse"},"RequestChallengeSolanaJSONResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanaresponse"},"RequestChallengeSolanaResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmjsonrequest"},"VerifyChallengeEvmJSONRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmjsonresponse"},"VerifyChallengeEvmJSONResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmresponse"},"VerifyChallengeEvmResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanajsonrequest"},"VerifyChallengeSolanaJSONRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanajsonresponse"},"VerifyChallengeSolanaJSONResponse")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanaresponse"},"VerifyChallengeSolanaResponse"))),(0,i.kt)("h3",{id:"interfaces"},"Interfaces"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengeevmrequest"},"RequestChallengeEvmRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengeevmresponseadapter"},"RequestChallengeEvmResponseAdapter")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengesolanarequest"},"RequestChallengeSolanaRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengesolanaresponseadapter"},"RequestChallengeSolanaResponseAdapter")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengeevmrequest"},"VerifyChallengeEvmRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengeevmresponseadapter"},"VerifyChallengeEvmResponseAdapter")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengesolanarequest"},"VerifyChallengeSolanaRequest")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengesolanaresponseadapter"},"VerifyChallengeSolanaResponseAdapter"))),(0,i.kt)("h3",{id:"variables"},"Variables"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#operations"},"operations")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmoperation"},"requestChallengeEvmOperation")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanaoperation"},"requestChallengeSolanaOperation")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmoperation"},"verifyChallengeEvmOperation")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanaoperation"},"verifyChallengeSolanaOperation"))),(0,i.kt)("h2",{id:"type-aliases-1"},"Type Aliases"),(0,i.kt)("h3",{id:"requestchallengeevmjsonrequest"},"RequestChallengeEvmJSONRequest"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeEvmJSONRequest"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"serializeRequest"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengeevmjsonresponse"},"RequestChallengeEvmJSONResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeEvmJSONResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SuccessResponse")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengeevmresponse"},"RequestChallengeEvmResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeEvmResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"deserializeResponse"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengesolanajsonrequest"},"RequestChallengeSolanaJSONRequest"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeSolanaJSONRequest"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"serializeRequest"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengesolanajsonresponse"},"RequestChallengeSolanaJSONResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeSolanaJSONResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SuccessResponse")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengesolanaresponse"},"RequestChallengeSolanaResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"RequestChallengeSolanaResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"deserializeResponse"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengeevmjsonrequest"},"VerifyChallengeEvmJSONRequest"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeEvmJSONRequest"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"serializeRequest"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengeevmjsonresponse"},"VerifyChallengeEvmJSONResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeEvmJSONResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SuccessResponse")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengeevmresponse"},"VerifyChallengeEvmResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeEvmResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"deserializeResponse"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengesolanajsonrequest"},"VerifyChallengeSolanaJSONRequest"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeSolanaJSONRequest"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"serializeRequest"),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengesolanajsonresponse"},"VerifyChallengeSolanaJSONResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeSolanaJSONResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SuccessResponse")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengesolanaresponse"},"VerifyChallengeSolanaResponse"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"VerifyChallengeSolanaResponse"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,i.kt)("inlineCode",{parentName:"p"},"deserializeResponse"),">"),(0,i.kt)("h2",{id:"variables-1"},"Variables"),(0,i.kt)("h3",{id:"operations"},"operations"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"operations"),": (",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengesolanarequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeSolanaRequest")),", { ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.message; ",(0,i.kt)("inlineCode",{parentName:"p"},"signature"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.signature }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SolAddress")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Date")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"nonce"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Date")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] ; ",(0,i.kt)("inlineCode",{parentName:"p"},"solNetwork"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"SolNetwork")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"version"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"network"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"mainnet"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"testnet"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"devnet"')," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"nonce"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] ; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"version"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }",">"," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengesolanarequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeSolanaRequest")),", { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.domain; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"DateInput")," = request.expirationTime; ",(0,i.kt)("inlineCode",{parentName:"p"},"network"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"mainnet"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"devnet"')," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"DateInput")," = request.notBefore; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] = request.resources; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.statement; ",(0,i.kt)("inlineCode",{parentName:"p"},"timeout"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," = request.timeout; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.uri }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }",">"," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengeevmrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeEvmRequest")),", { ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.message; ",(0,i.kt)("inlineCode",{parentName:"p"},"signature"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.signature }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"EvmAddress")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"chain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"EvmChain")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Date")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"nonce"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Date")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] ; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"version"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"chainId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"1"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"5"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"25"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"56"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"97"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"137"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"250"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"338"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"1337"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"43113"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"43114"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"80001"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"11155111"')," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"nonce"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] ; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement?"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"version"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }",">"," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengeevmrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeEvmRequest")),", { ",(0,i.kt)("inlineCode",{parentName:"p"},"address"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"chainId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"domain"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.domain; ",(0,i.kt)("inlineCode",{parentName:"p"},"expirationTime"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"DateInput")," = request.expirationTime; ",(0,i.kt)("inlineCode",{parentName:"p"},"notBefore"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"DateInput")," = request.notBefore; ",(0,i.kt)("inlineCode",{parentName:"p"},"resources"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[] = request.resources; ",(0,i.kt)("inlineCode",{parentName:"p"},"statement"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.statement; ",(0,i.kt)("inlineCode",{parentName:"p"},"timeout"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," = request.timeout; ",(0,i.kt)("inlineCode",{parentName:"p"},"uri"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = request.uri }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }, { ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ; ",(0,i.kt)("inlineCode",{parentName:"p"},"profileId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"  }",">",")[]"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengeevmoperation"},"requestChallengeEvmOperation"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"requestChallengeEvmOperation"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengeevmrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeEvmRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmjsonrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeEvmJSONRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeEvmResponse")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengeevmjsonresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeEvmJSONResponse")),">"),(0,i.kt)("p",null,"The back channel challenge containing the id to store on the api and the message to be signed by the user"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"requestchallengesolanaoperation"},"requestChallengeSolanaOperation"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"requestChallengeSolanaOperation"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/requestchallengesolanarequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeSolanaRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanajsonrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeSolanaJSONRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanaresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeSolanaResponse")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#requestchallengesolanajsonresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"RequestChallengeSolanaJSONResponse")),">"),(0,i.kt)("p",null,"The back channel challenge containing the id to store on the api and the message to be signed by the user"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengeevmoperation"},"verifyChallengeEvmOperation"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"verifyChallengeEvmOperation"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengeevmrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeEvmRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmjsonrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeEvmJSONRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeEvmResponse")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengeevmjsonresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeEvmJSONResponse")),">"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"verifychallengesolanaoperation"},"verifyChallengeSolanaOperation"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"verifyChallengeSolanaOperation"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),"<",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/verifychallengesolanarequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeSolanaRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanajsonrequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeSolanaJSONRequest")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanaresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeSolanaResponse")),", ",(0,i.kt)("a",{parentName:"p",href:"/Moralis-JS-SDK/moralisweb3/common-auth-utils/index#verifychallengesolanajsonresponse"},(0,i.kt)("inlineCode",{parentName:"a"},"VerifyChallengeSolanaJSONResponse")),">"))}u.isMDXComponent=!0}}]);