"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.WalletConnectEvent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/defineProperty"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/freeze"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _verifyChainId = _interopRequireDefault(require("./utils/verifyChainId"));

var _AbstractWeb3Connector = _interopRequireDefault(require("./AbstractWeb3Connector"));

var _MoralisRpcs = require("./MoralisRpcs");

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = _Reflect$construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
} // import WalletConnectProvider from "@walletconnect/web3-provider";


var WalletConnectEvent = (0, _freeze.default)({
  ACCOUNTS_CHANGED: "accountsChanged",
  CHAIN_CHANGED: "chainChanged",
  DISCONNECT: "disconnect"
});
/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v1
 * // TODO: support WalletConnect v2
 */

exports.WalletConnectEvent = WalletConnectEvent;

var WalletConnectWeb3Connector = /*#__PURE__*/function (_AbstractWeb3Connecto) {
  (0, _inherits2.default)(WalletConnectWeb3Connector, _AbstractWeb3Connecto);

  var _super = _createSuper(WalletConnectWeb3Connector);

  function WalletConnectWeb3Connector() {
    var _context;

    var _this;

    (0, _classCallCheck2.default)(this, WalletConnectWeb3Connector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, (0, _concat.default)(_context = [this]).call(_context, args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", "WalletConnect");
    return _this;
  }

  (0, _createClass2.default)(WalletConnectWeb3Connector, [{
    key: "activate",
    value: function () {
      var _activate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _ref,
            providedChainId,
            mobileLinks,
            WalletConnectProvider,
            config,
            _require,
            accounts,
            account,
            chainId,
            verifiedChainId,
            _args = arguments;

        return _regenerator.default.wrap(function (_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, providedChainId = _ref.chainId, mobileLinks = _ref.mobileLinks;
                _context2.prev = 1;
                _context2.next = 4;
                return this.deactivate();

              case 4:
                _context2.next = 8;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](1);

              case 8:
                if (this.provider) {
                  _context2.next = 14;
                  break;
                }

                config = {
                  rpc: (0, _MoralisRpcs.getMoralisRpcs)("WalletConnect"),
                  chainId: providedChainId,
                  qrcodeModalOptions: {
                    mobileLinks: mobileLinks
                  }
                };

                try {
                  WalletConnectProvider = (_require = require("@walletconnect/web3-provider")) === null || _require === void 0 ? void 0 : _require.default;
                } catch (error) {// Do nothing. User might not need walletconnect
                }

                if (WalletConnectProvider) {
                  _context2.next = 13;
                  break;
                }

                throw new Error('Cannot enable WalletConnect: dependency "@walletconnect/web3-provider" is missing');

              case 13:
                if (typeof WalletConnectProvider === "function") {
                  this.provider = new WalletConnectProvider(config);
                } else {
                  this.provider = new window.WalletConnectProvider(config);
                }

              case 14:
                if (this.provider) {
                  _context2.next = 16;
                  break;
                }

                throw new Error("Could not connect with WalletConnect, error in connecting to provider");

              case 16:
                _context2.next = 18;
                return this.provider.enable();

              case 18:
                accounts = _context2.sent;
                account = accounts[0].toLowerCase();
                chainId = this.provider.chainId;
                verifiedChainId = (0, _verifyChainId.default)(chainId);
                this.account = account;
                this.chainId = verifiedChainId;
                this.subscribeToEvents(this.provider);
                return _context2.abrupt("return", {
                  provider: this.provider,
                  account: account,
                  chainId: verifiedChainId
                });

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      return function () {
        return _activate.apply(this, arguments);
      };
    }()
  }, {
    key: "deactivate",
    value: function () {
      var _deactivate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function (_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.unsubscribeToEvents(this.provider);

                try {
                  if (window) {
                    window.localStorage.removeItem("walletconnect");
                  }
                } catch (error) {// Do nothing
                }

                this.account = null;
                this.chainId = null;
                _context3.next = 6;
                return this.provider.disconnect();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      return function () {
        return _deactivate.apply(this, arguments);
      };
    }()
  }]);
  return WalletConnectWeb3Connector;
}(_AbstractWeb3Connector.default);

var _default = WalletConnectWeb3Connector;
exports.default = _default;