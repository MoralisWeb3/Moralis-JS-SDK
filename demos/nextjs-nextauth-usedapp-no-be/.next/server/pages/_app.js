"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "@usedapp/core"
var core_ = __webpack_require__(9439);
;// CONCATENATED MODULE: external "ethers"
const external_ethers_namespaceObject = require("ethers");
;// CONCATENATED MODULE: ./pages/_app.tsx





const config = {
    readOnlyChainId: core_.Mainnet.chainId,
    readOnlyUrls: {
        [core_.Mainnet.chainId]: (0,external_ethers_namespaceObject.getDefaultProvider)("mainnet")
    },
    autoConnect: true
};
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(core_.DAppProvider, {
        config: config,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.SessionProvider, {
            session: pageProps.session,
            refetchInterval: 0,
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 9439:
/***/ ((module) => {

module.exports = require("@usedapp/core");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2572));
module.exports = __webpack_exports__;

})();