"use strict";
(() => {
var exports = {};
exports.id = 493;
exports.ids = [493];
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

/***/ 1751:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);

const future = new Date();
future.setDate(future.getDate() + 30);
const DOMAIN = process.env.APP_DOMAIN;
const STATEMENT = "Please sign this message to confirm your identity.";
const URI = process.env.NEXTAUTH_URL;
const EXPIRATION_TIME = future.toISOString();
const TIMEOUT = 15;
async function handler(req, res) {
    const { address , chain , network  } = req.body;
    await moralis__WEBPACK_IMPORTED_MODULE_0__/* ["default"].start */ .Z.start({
        apiKey: process.env.MORALIS_API_KEY
    });
    try {
        if (!DOMAIN || !URI) {
            throw new Error("Please add APP_DOMAIN in the .env.local");
        }
        const message = await moralis__WEBPACK_IMPORTED_MODULE_0__/* ["default"].Auth.requestMessage */ .Z.Auth.requestMessage({
            address,
            chain,
            network,
            domain: DOMAIN,
            statement: STATEMENT,
            uri: URI,
            expirationTime: EXPIRATION_TIME,
            timeout: TIMEOUT
        });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [234,924], () => (__webpack_exec__(1751)));
module.exports = __webpack_exports__;

})();