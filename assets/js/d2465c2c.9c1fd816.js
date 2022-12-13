"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8893],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=p(r),m=o,k=c["".concat(s,".").concat(m)]||c[m]||u[m]||a;return r?n.createElement(k,l(l({ref:t},d),{},{components:r})):n.createElement(k,l({ref:t},d))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},657:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={},l=void 0,i={unversionedId:"demos/parse-server-migration",id:"demos/parse-server-migration",title:"parse-server-migration",description:"Download",source:"@site/docs/demos/parse-server-migration.md",sourceDirName:"demos",slug:"/demos/parse-server-migration",permalink:"/Moralis-JS-SDK/demos/parse-server-migration",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"parse-server-migration-react-client",permalink:"/Moralis-JS-SDK/demos/parse-server-migration-react-client"},next:{title:"parse-server",permalink:"/Moralis-JS-SDK/demos/parse-server"}},s={},p=[{value:"Getting started locally",id:"getting-started-locally",level:2},{value:"Run your dapp",id:"run-your-dapp",level:3},{value:"Run mongo-db",id:"run-mongo-db",level:2},{value:"Run redis",id:"run-redis",level:2},{value:"Remote deployment",id:"remote-deployment",level:2},{value:"AWS Elastic Beanstalk",id:"aws-elastic-beanstalk",level:3}],d={toc:p};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://moralisweb3.github.io/Moralis-JS-SDK/downloads/parse-server-migration.zip"},"Download")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos/parse-server-migration"},"View code")),(0,o.kt)("hr",null),(0,o.kt)("p",null,"This demo project contains a parse-server backend to migrate from a hosted server on Moralis to a self-hosted server, using parse-server."),(0,o.kt)("h2",{id:"getting-started-locally"},"Getting started locally"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Copy/download this project"),(0,o.kt)("li",{parentName:"ol"},"Make sure to have ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"npm")," insalled"),(0,o.kt)("li",{parentName:"ol"},"Setup mongo-db and redis locally (see below)"),(0,o.kt)("li",{parentName:"ol"},"Install all dependencies via ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn install")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"npm install")," "),(0,o.kt)("li",{parentName:"ol"},"Copy ",(0,o.kt)("inlineCode",{parentName:"li"},".env.example")," to ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," and fill in the values")),(0,o.kt)("h3",{id:"run-your-dapp"},"Run your dapp"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn dev")," to run the server locally")),(0,o.kt)("p",null,"Now your app is running locally on ",(0,o.kt)("inlineCode",{parentName:"p"},"localhost:1337/server")," (or any other port/endpoint you set in ",(0,o.kt)("inlineCode",{parentName:"p"},".env"),")"),(0,o.kt)("p",null,"Note: by default the cloud-code is referenced in build/cloud, so make sure to run ",(0,o.kt)("inlineCode",{parentName:"p"},"yarn build")," before running the server. Or change the location of the cloud code."),(0,o.kt)("h2",{id:"run-mongo-db"},"Run mongo-db"),(0,o.kt)("p",null,"In order to run a server instance of parse-server, you will need to setup a mongo-db instance. For more information you can see ",(0,o.kt)("a",{parentName:"p",href:"https://www.mongodb.com/docs/manual/installation/"},"https://www.mongodb.com/docs/manual/installation/")),(0,o.kt)("p",null,"For local development, you can use the mongo-db-runner (see ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/mongodb-js/runner"},"https://github.com/mongodb-js/runner"),"). ",(0,o.kt)("strong",{parentName:"p"},"This should only be used for local development"),". To start this run:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yarn dev:db-start\n")),(0,o.kt)("p",null,"And to stop it, run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yarn dev:db-stop\n")),(0,o.kt)("p",null,"Make sure to set the ",(0,o.kt)("inlineCode",{parentName:"p"},"DATABASE_URI")," in your ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file"),(0,o.kt)("h2",{id:"run-redis"},"Run redis"),(0,o.kt)("p",null,"For rate-limiting, we are using a redis instance. In order for this to work, you will need to setup redis instance. For more information you can see ",(0,o.kt)("a",{parentName:"p",href:"https://redis.io/docs/getting-started/"},"https://redis.io/docs/getting-started/")),(0,o.kt)("p",null,"For local development you will need to install redis on your local machine, and start the service. Make sure to set the ",(0,o.kt)("inlineCode",{parentName:"p"},"REDIS_CONNECTION_STRING")," in your ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file"),(0,o.kt)("h2",{id:"remote-deployment"},"Remote deployment"),(0,o.kt)("h3",{id:"aws-elastic-beanstalk"},"AWS Elastic Beanstalk"),(0,o.kt)("p",null,"Follow the steps in the documentation:\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.moralis.io/docs/deploy-to-production#aws-elastic-beanstalk"},"https://docs.moralis.io/docs/deploy-to-production#aws-elastic-beanstalk")))}u.isMDXComponent=!0}}]);