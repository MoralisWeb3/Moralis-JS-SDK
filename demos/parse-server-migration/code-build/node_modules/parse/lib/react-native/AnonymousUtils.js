var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParseUser = _interopRequireDefault(require("./ParseUser"));

var uuidv4 = require('./uuid');

var registered = false;
var AnonymousUtils = {
  isLinked: function (user) {
    var provider = this._getAuthProvider();

    return user._isLinked(provider.getAuthType());
  },
  logIn: function (options) {
    var provider = this._getAuthProvider();

    return _ParseUser.default.logInWith(provider.getAuthType(), provider.getAuthData(), options);
  },
  link: function (user, options) {
    var provider = this._getAuthProvider();

    return user.linkWith(provider.getAuthType(), provider.getAuthData(), options);
  },
  isRegistered: function () {
    return registered;
  },
  _getAuthProvider: function () {
    var provider = {
      restoreAuthentication: function () {
        return true;
      },
      getAuthType: function () {
        return 'anonymous';
      },
      getAuthData: function () {
        return {
          authData: {
            id: uuidv4()
          }
        };
      }
    };

    if (!registered) {
      _ParseUser.default._registerAuthenticationProvider(provider);

      registered = true;
    }

    return provider;
  }
};
var _default = AnonymousUtils;
exports.default = _default;