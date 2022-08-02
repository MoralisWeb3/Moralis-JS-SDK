(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[950],{7069:function(a,b,c){"use strict";c.d(b,{h:function(){return h}});var d=c(5893),e=c(9008),f=c.n(e),g=function(){return(0,d.jsxs)(f(),{children:[(0,d.jsx)("title",{children:"Moralis Demo NextJS with NextAuth"}),(0,d.jsx)("meta",{name:"description",content:"Moralis Demo NextJS with NextAuth"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]})},h=g},5395:function(a,b,c){"use strict";c.d(b,{h_:function(){return k.h},wp:function(){return s},Wx:function(){return j}});var d=c(5893),e=c(5675),f=c.n(e),g=c(5390),h=c.n(g),i=function(a){var b=a.name,c=a.logoPath,e=a.onClick,g=a.disabled;return(0,d.jsxs)("div",{className:"".concat(h().option," ").concat(g&&h().disabled),onClick:e,children:[(0,d.jsxs)("div",{className:h().info,children:[(0,d.jsx)(f(),{src:c,alt:b,width:40,height:40}),(0,d.jsx)("span",{className:h().name,children:b})]}),(0,d.jsx)(f(),{src:"/assets/chevronRight.svg",alt:"chevronRight",width:24,height:24})]})},j=i,k=c(7069),l=c(1664),m=c.n(l),n=c(1163),o=c(9818),p=c.n(o),q=[{href:"/",name:"User"},{href:"/private",name:"Private Page"},],r=function(){var a=(0,n.useRouter)().pathname;return(0,d.jsx)("div",{className:p().nav,children:q.map(function(b){var c=b.href,e=b.name;return(0,d.jsx)(m(),{href:c,children:(0,d.jsxs)("a",{className:"".concat(p().tab," ").concat(c===a?p().active:null),children:[" ",e]})},e)})})},s=r},3555:function(a,b,c){"use strict";c.d(b,{g:function(){return l}});var d=c(5893),e=c(3897),f=c(5675),g=c.n(f),h=c(6692),i=c.n(h),j=[{name:"Forum",href:"https://moralis.io/"},{name:"Discord",href:"https://moralis.io/joindiscord/"},{name:"Docs",href:"https://docs.moralis.io/introduction/readme"},{name:"Blog",href:"https://moralis.io/blog/"},{name:"Youtube",href:"https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw"},],k=function(a){var b=a.children;return(0,d.jsxs)("div",{className:i().container,children:[(0,d.jsx)(e.h,{}),(0,d.jsx)("main",{className:i().main,children:b}),(0,d.jsxs)("footer",{className:i().footer,children:[(0,d.jsx)("div",{className:i().links,children:j.map(function(a){var b=a.href,c=a.name;return(0,d.jsx)("a",{href:b,target:"_blank",rel:"noopener noreferrer",className:i().link,children:c},c)})}),(0,d.jsx)("a",{href:"https://moralis.io/",target:"_blank",rel:"noopener noreferrer",children:(0,d.jsx)(g(),{src:"/assets/poweredByMoralis.svg",alt:"Powered By Moralis Logo",width:173,height:28})})]})]})},l=k},3897:function(a,b,c){"use strict";c.d(b,{h:function(){return p}});var d=c(5893),e=c(5395),f=c(5152),g=c.n(f),h=c(5675),i=c.n(h),j=c(1664),k=c.n(j),l=c(9865),m=c.n(l),n=g()(function(){return c.e(534).then(c.bind(c,534))},{loadableGenerated:{webpack:function(){return[534]}},ssr:!1}),o=function(){return(0,d.jsx)("header",{className:m().header__wrapper,children:(0,d.jsxs)("nav",{className:m().nav,children:[(0,d.jsx)(k(),{href:"/",children:(0,d.jsx)("a",{children:(0,d.jsx)(i(),{alt:"Moralis-Logo-LightBG",className:m().logo,height:30,src:"/Moralis-Logo-LightBG.svg",width:125})})}),(0,d.jsx)(e.wp,{}),(0,d.jsx)(n,{})]})})},p=o},534:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return r}});var d=c(8788),e=c(4051),f=c.n(e),g=c(5893),h=function(a){var b=arguments.length>1&& void 0!==arguments[1]?arguments[1]:6;return a?"".concat(a.slice(0,b),"...").concat(a.slice(a.length-b)):""},i=c(3299),j=c(5675),k=c.n(j),l=c(1664),m=c.n(l),n=c(8624),o=c.n(n),p=c(7295),q=function(){var a,b=(0,i.useSession)(),c=b.data,e=b.status,j=(0,p.K)(),l=j.chainId,n=j.deactivate,q=(a=(0,d.Z)(f().mark(function a(){return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n(),a.next=3,(0,i.signOut)({callbackUrl:"/signin"});case 3:case"end":return a.stop()}},a)})),function(){return a.apply(this,arguments)});return(0,g.jsx)("div",{className:o().walletInfo__wrapper,children:"authenticated"===e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{className:o().wallet,children:[(0,g.jsxs)("div",{className:o().walletInfo,children:[(0,g.jsx)("div",{children:(0,g.jsx)("span",{children:l||"no network"})}),(0,g.jsx)("div",{className:"".concat(o().status," ").concat("authenticated"==e?o().active:o().nonActive)}),(0,g.jsx)("span",{children:h(null==c?void 0:c.user.address)})]}),(0,g.jsx)("button",{className:o().disconnectButton,onClick:q,children:"Disconnect"})]}),(0,g.jsx)(k(),{src:"/assets/mage.svg",width:34,height:34,alt:"profile"})]}):(0,g.jsx)(m(),{href:"/signin",children:(0,g.jsx)("a",{className:o().authenticate,children:"Authenticate"})})})},r=q},2567:function(a,b,c){"use strict";c.d(b,{W:function(){return F},Y:function(){return D}});var d,e=c(5893),f=c(7294),g=c(8788),h=c(4051),i=c.n(h),j=c(5395),k=c(3299),l=c(1163),m=c(9644),n=c.n(m),o=(d=(0,g.Z)(i().mark(function a(b,c){var d;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n().post("/api".concat(b),c,{headers:{"content-type":"application/json"}});case 2:return d=a.sent,a.abrupt("return",d.data);case 4:case"end":return a.stop()}},a)})),function(a,b){return d.apply(this,arguments)}),p=o,q=c(4364),r=c.n(q),s=c(7295),t=[{name:"Metamask",logoPath:"/assets/wallets/metamask.svg"},{name:"Coinbase Wallet",logoPath:"/assets/wallets/coinbase.svg",disabled:!0},{name:"WalletConnect",logoPath:"/assets/wallets/walletconnect.svg"},{name:"Injected",logoPath:"/assets/wallets/eth.svg"},],u=function(){var a,b=(0,s.K)(),c=b.account,d=b.activateBrowserWallet,h=b.chainId,m=b.library,n=(0,f.useState)(!1),o=n[0],q=n[1],u=(0,l.useRouter)().push;(0,f.useEffect)(function(){var a;!1!==o&&c&&h&&(a=(0,g.Z)(i().mark(function a(){var b,d,e;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b={address:c,chain:h,network:"evm"},a.next=3,p("/auth/request-message",b);case 3:return d=a.sent.message,a.next=6,null==m?void 0:m.getSigner(c).signMessage(d);case 6:return e=a.sent,a.prev=7,a.next=10,(0,k.signIn)("credentials",{message:d,signature:e,redirect:!1});case 10:q(!1),u("/"),a.next=17;break;case 14:return a.prev=14,a.t0=a.catch(7),a.abrupt("return");case 17:case"end":return a.stop()}},a,null,[[7,14]])})),function(){return a.apply(this,arguments)})()},[c,h,o,m,u]);var v=(a=(0,g.Z)(i().mark(function a(b){return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!b){a.next=3;break}return alert("Setup it first in the Authentication.tsx"),a.abrupt("return");case 3:try{c||d(),q(!0)}catch(e){console.error(e)}case 4:case"end":return a.stop()}},a)})),function(b){return a.apply(this,arguments)});return(0,e.jsxs)("div",{className:r().auth,children:[(0,e.jsx)("h3",{className:r().title,children:"Web3 Authentication"}),(0,e.jsx)("div",{className:r().options,children:t.map(function(a){var b=a.name,c=a.logoPath,d=a.disabled;return(0,e.jsx)(j.Wx,{disabled:d,logoPath:c,name:b,onClick:function(){return v(d)}},b)})})]})},v=u;c(3897),c(534);var w=c(5675),x=c.n(w),y=c(9153),z=c.n(y),A=function(){var a=(0,k.useSession)().data;return(0,e.jsxs)("div",{className:z().profile,children:[(0,e.jsx)(x(),{src:"/assets/mage.svg",width:46,height:46,alt:"profile"}),(0,e.jsx)("h4",{children:null==a?void 0:a.user.address}),(0,e.jsxs)("p",{children:["Profile ID: ",null==a?void 0:a.user.profileId]}),(0,e.jsxs)("p",{children:["Session Expiration Time: ",null==a?void 0:a.user.expirationTime]})]})},B=A,C=function(){return(0,e.jsx)(B,{})},D=C,E=function(){return(0,e.jsx)(v,{})},F=E},9818:function(a){a.exports={nav:"Navbar_nav__rKVy1",tab:"Navbar_tab__B69sr",active:"Navbar_active__tcmKY"}},5390:function(a){a.exports={option:"Option_option__8_CNM",disabled:"Option_disabled__5OOVw",info:"Option_info__bEhBH",name:"Option_name__kQOPQ"}},6692:function(a){a.exports={main:"Default_main__GFtQ8",container:"Default_container__pFZPW",footer:"Default_footer__GIca_",links:"Default_links__mM2mN",link:"Default_link__IxJaZ"}},4364:function(a){a.exports={auth:"Authentication_auth__4xb4p",title:"Authentication_title__5R5br",options:"Authentication_options__5SFXl"}},9865:function(a){a.exports={header__wrapper:"Header_header__wrapper__tt7qX",nav:"Header_nav___5aPN",logo:"Header_logo__B3chz"}},9153:function(a){a.exports={profile:"Profile_profile__Kwnc_"}},8624:function(a){a.exports={walletInfo__wrapper:"WalletInfo_walletInfo__wrapper__7UhWO",wallet:"WalletInfo_wallet__lF3CK",walletInfo:"WalletInfo_walletInfo__50jYD",status:"WalletInfo_status__DGWmK",active:"WalletInfo_active__tC7fb",nonActive:"WalletInfo_nonActive__ah_u6",disconnectButton:"WalletInfo_disconnectButton__kIxkC",authenticate:"WalletInfo_authenticate__aeC7h"}}}])