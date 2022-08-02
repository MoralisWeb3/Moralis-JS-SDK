exports.id = 349;
exports.ids = [349];
exports.modules = {

/***/ 8201:
/***/ ((module) => {

// Exports
module.exports = {
	"auth": "Authentication_auth__4xb4p",
	"title": "Authentication_title__5R5br",
	"options": "Authentication_options__5SFXl"
};


/***/ }),

/***/ 1159:
/***/ ((module) => {

// Exports
module.exports = {
	"profile": "Profile_profile__Kwnc_"
};


/***/ }),

/***/ 7349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "W": () => (/* reexport */ AuthPage_AuthPage),
  "Y": () => (/* reexport */ UserPage_UserPage)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./app/components/elements/index.ts + 5 modules
var components_elements = __webpack_require__(5395);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./app/utils/apiPost.ts

const apiPost = async (endpoint, params)=>{
    const result = await external_axios_default().post(`/api${endpoint}`, params, {
        headers: {
            "content-type": "application/json"
        }
    });
    return result.data;
};
/* harmony default export */ const utils_apiPost = (apiPost);

// EXTERNAL MODULE: ./app/components/modules/Authentication/Authentication.module.css
var Authentication_module = __webpack_require__(8201);
var Authentication_module_default = /*#__PURE__*/__webpack_require__.n(Authentication_module);
// EXTERNAL MODULE: external "@usedapp/core"
var core_ = __webpack_require__(9439);
;// CONCATENATED MODULE: ./app/components/modules/Authentication/Authentication.tsx








const wallets = [
    {
        name: "Metamask",
        logoPath: "/assets/wallets/metamask.svg"
    },
    {
        name: "Coinbase Wallet",
        logoPath: "/assets/wallets/coinbase.svg",
        disabled: true
    },
    {
        name: "WalletConnect",
        logoPath: "/assets/wallets/walletconnect.svg"
    },
    {
        name: "Injected",
        logoPath: "/assets/wallets/eth.svg"
    }, 
];
const Authentication = ()=>{
    const { account , activateBrowserWallet , chainId , library  } = (0,core_.useEthers)();
    const { 0: isConnecting , 1: setIsConnecting  } = (0,external_react_.useState)(false);
    const { push  } = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        if (isConnecting === false || !account || !chainId) {
            return;
        }
        const handleAuth = async ()=>{
            const userData = {
                address: account,
                chain: chainId,
                network: "evm"
            };
            const { message  } = await utils_apiPost("/auth/request-message", userData);
            const signature = await library?.getSigner(account).signMessage(message);
            try {
                await (0,react_.signIn)("credentials", {
                    message,
                    signature,
                    redirect: false
                });
                setIsConnecting(false);
                // redirects to main page
                push("/");
            } catch (e) {
                return;
            }
        };
        handleAuth();
    }, [
        account,
        chainId,
        isConnecting,
        library,
        push
    ]);
    const handleConnect = async (disabled)=>{
        if (disabled) {
            alert("Setup it first in the Authentication.tsx");
            return;
        }
        try {
            if (!account) {
                activateBrowserWallet();
            }
            setIsConnecting(true);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Authentication_module_default()).auth,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: (Authentication_module_default()).title,
                children: "Web3 Authentication"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Authentication_module_default()).options,
                children: wallets.map(({ name , logoPath , disabled  })=>/*#__PURE__*/ jsx_runtime_.jsx(components_elements/* Option */.Wx, {
                        disabled: disabled,
                        logoPath: logoPath,
                        name: name,
                        onClick: ()=>handleConnect(disabled)
                    }, name))
            })
        ]
    });
};
/* harmony default export */ const Authentication_Authentication = (Authentication);

;// CONCATENATED MODULE: ./app/components/modules/Authentication/index.ts


// EXTERNAL MODULE: ./app/components/modules/Header/index.ts + 1 modules
var Header = __webpack_require__(3897);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./app/components/modules/WalletInfo/WalletInfo.tsx







const WalletInfo = ()=>{
    const { data , status  } = useSession();
    const { chainId , deactivate  } = useEthers();
    const handleDisconnect = async ()=>{
        deactivate();
        await signOut({
            callbackUrl: "/signin"
        });
    };
    return /*#__PURE__*/ _jsx("div", {
        className: styles.walletInfo__wrapper,
        children: status === "authenticated" ? /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.wallet,
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: styles.walletInfo,
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    children: /*#__PURE__*/ _jsx("span", {
                                        children: chainId || "no network"
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: `${styles.status} ${status == "authenticated" ? styles.active : styles.nonActive}`
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    children: getEllipsisTxt(data?.user.address)
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            className: styles.disconnectButton,
                            onClick: handleDisconnect,
                            children: "Disconnect"
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx(Image, {
                    src: "/assets/mage.svg",
                    width: 34,
                    height: 34,
                    alt: "profile"
                })
            ]
        }) : /*#__PURE__*/ _jsx(Link, {
            href: "/signin",
            children: /*#__PURE__*/ _jsx("a", {
                className: styles.authenticate,
                children: "Authenticate"
            })
        })
    });
};
/* harmony default export */ const WalletInfo_WalletInfo = ((/* unused pure expression or super */ null && (WalletInfo)));

;// CONCATENATED MODULE: ./app/components/modules/WalletInfo/index.ts


// EXTERNAL MODULE: ./app/components/modules/Profile/Profile.module.css
var Profile_module = __webpack_require__(1159);
var Profile_module_default = /*#__PURE__*/__webpack_require__.n(Profile_module);
;// CONCATENATED MODULE: ./app/components/modules/Profile/Profile.tsx




const Profile = ()=>{
    const { data  } = (0,react_.useSession)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Profile_module_default()).profile,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: "/assets/mage.svg",
                width: 46,
                height: 46,
                alt: "profile"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                children: data?.user.address
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Profile ID: ",
                    data?.user.profileId
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Session Expiration Time: ",
                    data?.user.expirationTime
                ]
            })
        ]
    });
};
/* harmony default export */ const Profile_Profile = (Profile);

;// CONCATENATED MODULE: ./app/components/modules/Profile/index.ts


;// CONCATENATED MODULE: ./app/components/modules/index.ts





;// CONCATENATED MODULE: ./app/components/templates/UserPage/UserPage.tsx



const UserPage = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Profile_Profile, {});
};
/* harmony default export */ const UserPage_UserPage = (UserPage);

;// CONCATENATED MODULE: ./app/components/templates/UserPage/index.ts


;// CONCATENATED MODULE: ./app/components/templates/AuthPage/AuthPage.tsx


const AuthPage = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Authentication_Authentication, {});
};
/* harmony default export */ const AuthPage_AuthPage = (AuthPage);

;// CONCATENATED MODULE: ./app/components/templates/AuthPage/index.ts


;// CONCATENATED MODULE: ./app/components/templates/index.ts




/***/ })

};
;