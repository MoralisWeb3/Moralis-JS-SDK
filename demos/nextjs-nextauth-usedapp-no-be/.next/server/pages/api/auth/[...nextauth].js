"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 1541:
/***/ ((module) => {

module.exports = require("@ethersproject/address");

/***/ }),

/***/ 954:
/***/ ((module) => {

module.exports = require("@ethersproject/transactions");

/***/ }),

/***/ 5753:
/***/ ((module) => {

module.exports = require("@xstate/fsm");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth/providers/credentials"
const credentials_namespaceObject = require("next-auth/providers/credentials");
var credentials_default = /*#__PURE__*/__webpack_require__.n(credentials_namespaceObject);
// EXTERNAL MODULE: ../../packages/moralis/lib/index.js
var lib = __webpack_require__(924);
;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].ts



// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
    providers: [
        credentials_default()({
            name: "MoralisAuth",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0"
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0"
                }
            },
            async authorize (credentials) {
                try {
                    const { message , signature  } = credentials;
                    await lib/* default.start */.Z.start({
                        apiKey: process.env.MORALIS_API_KEY
                    });
                    const { address , profileId , expirationTime , uri  } = (await lib/* default.Auth.verify */.Z.Auth.verify({
                        message,
                        signature,
                        network: "evm"
                    })).raw;
                    const nextAuthUrl = process.env.NEXTAUTH_URL;
                    if (uri !== nextAuthUrl) {
                        return null;
                    }
                    const user = {
                        address,
                        profileId,
                        expirationTime,
                        signature
                    };
                    return user;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    return null;
                }
            }
        }), 
    ],
    callbacks: {
        async jwt ({ token , user  }) {
            user && (token.user = user);
            return token;
        },
        async session ({ session , token  }) {
            session.expires = token.user.expirationTime;
            session.user = token.user;
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    }
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [234,924], () => (__webpack_exec__(409)));
module.exports = __webpack_exports__;

})();