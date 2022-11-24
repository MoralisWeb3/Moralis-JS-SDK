"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UsersRouter = void 0;

var _node = _interopRequireDefault(require("parse/node"));

var _Config = _interopRequireDefault(require("../Config"));

var _AccountLockout = _interopRequireDefault(require("../AccountLockout"));

var _ClassesRouter = _interopRequireDefault(require("./ClassesRouter"));

var _rest = _interopRequireDefault(require("../rest"));

var _Auth = _interopRequireDefault(require("../Auth"));

var _password = _interopRequireDefault(require("../password"));

var _triggers = require("../triggers");

var _middlewares = require("../middlewares");

var _RestWrite = _interopRequireDefault(require("../RestWrite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UsersRouter extends _ClassesRouter.default {
  className() {
    return '_User';
  }
  /**
   * Removes all "_" prefixed properties from an object, except "__type"
   * @param {Object} obj An object.
   */


  static removeHiddenProperties(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Regexp comes from Parse.Object.prototype.validate
        if (key !== '__type' && !/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
          delete obj[key];
        }
      }
    }
  }
  /**
   * After retrieving a user directly from the database, we need to remove the
   * password from the object (for security), and fix an issue some SDKs have
   * with null values
   */


  _sanitizeAuthData(user) {
    delete user.password; // Sometimes the authData still has null on that keys
    // https://github.com/parse-community/parse-server/issues/935

    if (user.authData) {
      Object.keys(user.authData).forEach(provider => {
        if (user.authData[provider] === null) {
          delete user.authData[provider];
        }
      });

      if (Object.keys(user.authData).length == 0) {
        delete user.authData;
      }
    }
  }
  /**
   * Validates a password request in login and verifyPassword
   * @param {Object} req The request
   * @returns {Object} User object
   * @private
   */


  _authenticateUserFromRequest(req) {
    return new Promise((resolve, reject) => {
      // Use query parameters instead if provided in url
      let payload = req.body;

      if (!payload.username && req.query && req.query.username || !payload.email && req.query && req.query.email) {
        payload = req.query;
      }

      const {
        username,
        email,
        password
      } = payload; // TODO: use the right error codes / descriptions.

      if (!username && !email) {
        throw new _node.default.Error(_node.default.Error.USERNAME_MISSING, 'username/email is required.');
      }

      if (!password) {
        throw new _node.default.Error(_node.default.Error.PASSWORD_MISSING, 'password is required.');
      }

      if (typeof password !== 'string' || email && typeof email !== 'string' || username && typeof username !== 'string') {
        throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Invalid username/password.');
      }

      let user;
      let isValidPassword = false;
      let query;

      if (email && username) {
        query = {
          email,
          username
        };
      } else if (email) {
        query = {
          email
        };
      } else {
        query = {
          $or: [{
            username
          }, {
            email: username
          }]
        };
      }

      return req.config.database.find('_User', query).then(results => {
        if (!results.length) {
          throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Invalid username/password.');
        }

        if (results.length > 1) {
          // corner case where user1 has username == user2 email
          req.config.loggerController.warn("There is a user which email is the same as another user's username, logging in based on username");
          user = results.filter(user => user.username === username)[0];
        } else {
          user = results[0];
        }

        return _password.default.compare(password, user.password);
      }).then(correct => {
        isValidPassword = correct;
        const accountLockoutPolicy = new _AccountLockout.default(user, req.config);
        return accountLockoutPolicy.handleLoginAttempt(isValidPassword);
      }).then(() => {
        if (!isValidPassword) {
          throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Invalid username/password.');
        } // Ensure the user isn't locked out
        // A locked out user won't be able to login
        // To lock a user out, just set the ACL to `masterKey` only  ({}).
        // Empty ACL is OK


        if (!req.auth.isMaster && user.ACL && Object.keys(user.ACL).length == 0) {
          throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Invalid username/password.');
        }

        if (req.config.verifyUserEmails && req.config.preventLoginWithUnverifiedEmail && !user.emailVerified) {
          throw new _node.default.Error(_node.default.Error.EMAIL_NOT_FOUND, 'User email is not verified.');
        }

        this._sanitizeAuthData(user);

        return resolve(user);
      }).catch(error => {
        return reject(error);
      });
    });
  }

  handleMe(req) {
    if (!req.info || !req.info.sessionToken) {
      throw new _node.default.Error(_node.default.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
    }

    const sessionToken = req.info.sessionToken;
    return _rest.default.find(req.config, _Auth.default.master(req.config), '_Session', {
      sessionToken
    }, {
      include: 'user'
    }, req.info.clientSDK, req.info.context).then(response => {
      if (!response.results || response.results.length == 0 || !response.results[0].user) {
        throw new _node.default.Error(_node.default.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
      } else {
        const user = response.results[0].user; // Send token back on the login, because SDKs expect that.

        user.sessionToken = sessionToken; // Remove hidden properties.

        UsersRouter.removeHiddenProperties(user);
        return {
          response: user
        };
      }
    });
  }

  async handleLogIn(req) {
    const user = await this._authenticateUserFromRequest(req); // handle password expiry policy

    if (req.config.passwordPolicy && req.config.passwordPolicy.maxPasswordAge) {
      let changedAt = user._password_changed_at;

      if (!changedAt) {
        // password was created before expiry policy was enabled.
        // simply update _User object so that it will start enforcing from now
        changedAt = new Date();
        req.config.database.update('_User', {
          username: user.username
        }, {
          _password_changed_at: _node.default._encode(changedAt)
        });
      } else {
        // check whether the password has expired
        if (changedAt.__type == 'Date') {
          changedAt = new Date(changedAt.iso);
        } // Calculate the expiry time.


        const expiresAt = new Date(changedAt.getTime() + 86400000 * req.config.passwordPolicy.maxPasswordAge);
        if (expiresAt < new Date()) // fail of current time is past password expiry time
          throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'Your password has expired. Please reset your password.');
      }
    } // Remove hidden properties.


    UsersRouter.removeHiddenProperties(user);
    req.config.filesController.expandFilesInObject(req.config, user); // Before login trigger; throws if failure

    await (0, _triggers.maybeRunTrigger)(_triggers.Types.beforeLogin, req.auth, _node.default.User.fromJSON(Object.assign({
      className: '_User'
    }, user)), null, req.config);

    const {
      sessionData,
      createSession
    } = _RestWrite.default.createSession(req.config, {
      userId: user.objectId,
      createdWith: {
        action: 'login',
        authProvider: 'password'
      },
      installationId: req.info.installationId
    });

    user.sessionToken = sessionData.sessionToken;
    await createSession();

    const afterLoginUser = _node.default.User.fromJSON(Object.assign({
      className: '_User'
    }, user));

    (0, _triggers.maybeRunTrigger)(_triggers.Types.afterLogin, _objectSpread(_objectSpread({}, req.auth), {}, {
      user: afterLoginUser
    }), afterLoginUser, null, req.config);
    return {
      response: user
    };
  }
  /**
   * This allows master-key clients to create user sessions without access to
   * user credentials. This enables systems that can authenticate access another
   * way (API key, app administrators) to act on a user's behalf.
   *
   * We create a new session rather than looking for an existing session; we
   * want this to work in situations where the user is logged out on all
   * devices, since this can be used by automated systems acting on the user's
   * behalf.
   *
   * For the moment, we're omitting event hooks and lockout checks, since
   * immediate use cases suggest /loginAs could be used for semantically
   * different reasons from /login
   */


  async handleLogInAs(req) {
    if (!req.auth.isMaster) {
      throw new _node.default.Error(_node.default.Error.OPERATION_FORBIDDEN, 'master key is required');
    }

    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      throw new _node.default.Error(_node.default.Error.INVALID_VALUE, 'userId must not be empty, null, or undefined');
    }

    const queryResults = await req.config.database.find('_User', {
      objectId: userId
    });
    const user = queryResults[0];

    if (!user) {
      throw new _node.default.Error(_node.default.Error.OBJECT_NOT_FOUND, 'user not found');
    }

    this._sanitizeAuthData(user);

    const {
      sessionData,
      createSession
    } = _RestWrite.default.createSession(req.config, {
      userId,
      createdWith: {
        action: 'login',
        authProvider: 'masterkey'
      },
      installationId: req.info.installationId
    });

    user.sessionToken = sessionData.sessionToken;
    await createSession();
    return {
      response: user
    };
  }

  handleVerifyPassword(req) {
    return this._authenticateUserFromRequest(req).then(user => {
      // Remove hidden properties.
      UsersRouter.removeHiddenProperties(user);
      return {
        response: user
      };
    }).catch(error => {
      throw error;
    });
  }

  handleLogOut(req) {
    const success = {
      response: {}
    };

    if (req.info && req.info.sessionToken) {
      return _rest.default.find(req.config, _Auth.default.master(req.config), '_Session', {
        sessionToken: req.info.sessionToken
      }, undefined, req.info.clientSDK, req.info.context).then(records => {
        if (records.results && records.results.length) {
          return _rest.default.del(req.config, _Auth.default.master(req.config), '_Session', records.results[0].objectId, req.info.context).then(() => {
            this._runAfterLogoutTrigger(req, records.results[0]);

            return Promise.resolve(success);
          });
        }

        return Promise.resolve(success);
      });
    }

    return Promise.resolve(success);
  }

  _runAfterLogoutTrigger(req, session) {
    // After logout trigger
    (0, _triggers.maybeRunTrigger)(_triggers.Types.afterLogout, req.auth, _node.default.Session.fromJSON(Object.assign({
      className: '_Session'
    }, session)), null, req.config);
  }

  _throwOnBadEmailConfig(req) {
    try {
      _Config.default.validateEmailConfiguration({
        emailAdapter: req.config.userController.adapter,
        appName: req.config.appName,
        publicServerURL: req.config.publicServerURL,
        emailVerifyTokenValidityDuration: req.config.emailVerifyTokenValidityDuration,
        emailVerifyTokenReuseIfValid: req.config.emailVerifyTokenReuseIfValid
      });
    } catch (e) {
      if (typeof e === 'string') {
        // Maybe we need a Bad Configuration error, but the SDKs won't understand it. For now, Internal Server Error.
        throw new _node.default.Error(_node.default.Error.INTERNAL_SERVER_ERROR, 'An appName, publicServerURL, and emailAdapter are required for password reset and email verification functionality.');
      } else {
        throw e;
      }
    }
  }

  handleResetRequest(req) {
    this._throwOnBadEmailConfig(req);

    const {
      email
    } = req.body;

    if (!email) {
      throw new _node.default.Error(_node.default.Error.EMAIL_MISSING, 'you must provide an email');
    }

    if (typeof email !== 'string') {
      throw new _node.default.Error(_node.default.Error.INVALID_EMAIL_ADDRESS, 'you must provide a valid email string');
    }

    const userController = req.config.userController;
    return userController.sendPasswordResetEmail(email).then(() => {
      return Promise.resolve({
        response: {}
      });
    }, err => {
      if (err.code === _node.default.Error.OBJECT_NOT_FOUND) {
        // Return success so that this endpoint can't
        // be used to enumerate valid emails
        return Promise.resolve({
          response: {}
        });
      } else {
        throw err;
      }
    });
  }

  handleVerificationEmailRequest(req) {
    this._throwOnBadEmailConfig(req);

    const {
      email
    } = req.body;

    if (!email) {
      throw new _node.default.Error(_node.default.Error.EMAIL_MISSING, 'you must provide an email');
    }

    if (typeof email !== 'string') {
      throw new _node.default.Error(_node.default.Error.INVALID_EMAIL_ADDRESS, 'you must provide a valid email string');
    }

    return req.config.database.find('_User', {
      email: email
    }).then(results => {
      if (!results.length || results.length < 1) {
        throw new _node.default.Error(_node.default.Error.EMAIL_NOT_FOUND, `No user found with email ${email}`);
      }

      const user = results[0]; // remove password field, messes with saving on postgres

      delete user.password;

      if (user.emailVerified) {
        throw new _node.default.Error(_node.default.Error.OTHER_CAUSE, `Email ${email} is already verified.`);
      }

      const userController = req.config.userController;
      return userController.regenerateEmailVerifyToken(user).then(() => {
        userController.sendVerificationEmail(user);
        return {
          response: {}
        };
      });
    });
  }

  mountRoutes() {
    this.route('GET', '/users', req => {
      return this.handleFind(req);
    });
    this.route('POST', '/users', _middlewares.promiseEnsureIdempotency, req => {
      return this.handleCreate(req);
    });
    this.route('GET', '/users/me', req => {
      return this.handleMe(req);
    });
    this.route('GET', '/users/:objectId', req => {
      return this.handleGet(req);
    });
    this.route('PUT', '/users/:objectId', _middlewares.promiseEnsureIdempotency, req => {
      return this.handleUpdate(req);
    });
    this.route('DELETE', '/users/:objectId', req => {
      return this.handleDelete(req);
    });
    this.route('GET', '/login', req => {
      return this.handleLogIn(req);
    });
    this.route('POST', '/login', req => {
      return this.handleLogIn(req);
    });
    this.route('POST', '/loginAs', req => {
      return this.handleLogInAs(req);
    });
    this.route('POST', '/logout', req => {
      return this.handleLogOut(req);
    });
    this.route('POST', '/requestPasswordReset', req => {
      return this.handleResetRequest(req);
    });
    this.route('POST', '/verificationEmailRequest', req => {
      return this.handleVerificationEmailRequest(req);
    });
    this.route('GET', '/verifyPassword', req => {
      return this.handleVerifyPassword(req);
    });
  }

}

exports.UsersRouter = UsersRouter;
var _default = UsersRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Sb3V0ZXJzL1VzZXJzUm91dGVyLmpzIl0sIm5hbWVzIjpbIlVzZXJzUm91dGVyIiwiQ2xhc3Nlc1JvdXRlciIsImNsYXNzTmFtZSIsInJlbW92ZUhpZGRlblByb3BlcnRpZXMiLCJvYmoiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJ0ZXN0IiwiX3Nhbml0aXplQXV0aERhdGEiLCJ1c2VyIiwicGFzc3dvcmQiLCJhdXRoRGF0YSIsImtleXMiLCJmb3JFYWNoIiwicHJvdmlkZXIiLCJsZW5ndGgiLCJfYXV0aGVudGljYXRlVXNlckZyb21SZXF1ZXN0IiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYXlsb2FkIiwiYm9keSIsInVzZXJuYW1lIiwicXVlcnkiLCJlbWFpbCIsIlBhcnNlIiwiRXJyb3IiLCJVU0VSTkFNRV9NSVNTSU5HIiwiUEFTU1dPUkRfTUlTU0lORyIsIk9CSkVDVF9OT1RfRk9VTkQiLCJpc1ZhbGlkUGFzc3dvcmQiLCIkb3IiLCJjb25maWciLCJkYXRhYmFzZSIsImZpbmQiLCJ0aGVuIiwicmVzdWx0cyIsImxvZ2dlckNvbnRyb2xsZXIiLCJ3YXJuIiwiZmlsdGVyIiwicGFzc3dvcmRDcnlwdG8iLCJjb21wYXJlIiwiY29ycmVjdCIsImFjY291bnRMb2Nrb3V0UG9saWN5IiwiQWNjb3VudExvY2tvdXQiLCJoYW5kbGVMb2dpbkF0dGVtcHQiLCJhdXRoIiwiaXNNYXN0ZXIiLCJBQ0wiLCJ2ZXJpZnlVc2VyRW1haWxzIiwicHJldmVudExvZ2luV2l0aFVudmVyaWZpZWRFbWFpbCIsImVtYWlsVmVyaWZpZWQiLCJFTUFJTF9OT1RfRk9VTkQiLCJjYXRjaCIsImVycm9yIiwiaGFuZGxlTWUiLCJpbmZvIiwic2Vzc2lvblRva2VuIiwiSU5WQUxJRF9TRVNTSU9OX1RPS0VOIiwicmVzdCIsIkF1dGgiLCJtYXN0ZXIiLCJpbmNsdWRlIiwiY2xpZW50U0RLIiwiY29udGV4dCIsInJlc3BvbnNlIiwiaGFuZGxlTG9nSW4iLCJwYXNzd29yZFBvbGljeSIsIm1heFBhc3N3b3JkQWdlIiwiY2hhbmdlZEF0IiwiX3Bhc3N3b3JkX2NoYW5nZWRfYXQiLCJEYXRlIiwidXBkYXRlIiwiX2VuY29kZSIsIl9fdHlwZSIsImlzbyIsImV4cGlyZXNBdCIsImdldFRpbWUiLCJmaWxlc0NvbnRyb2xsZXIiLCJleHBhbmRGaWxlc0luT2JqZWN0IiwiVHJpZ2dlclR5cGVzIiwiYmVmb3JlTG9naW4iLCJVc2VyIiwiZnJvbUpTT04iLCJhc3NpZ24iLCJzZXNzaW9uRGF0YSIsImNyZWF0ZVNlc3Npb24iLCJSZXN0V3JpdGUiLCJ1c2VySWQiLCJvYmplY3RJZCIsImNyZWF0ZWRXaXRoIiwiYWN0aW9uIiwiYXV0aFByb3ZpZGVyIiwiaW5zdGFsbGF0aW9uSWQiLCJhZnRlckxvZ2luVXNlciIsImFmdGVyTG9naW4iLCJoYW5kbGVMb2dJbkFzIiwiT1BFUkFUSU9OX0ZPUkJJRERFTiIsIklOVkFMSURfVkFMVUUiLCJxdWVyeVJlc3VsdHMiLCJoYW5kbGVWZXJpZnlQYXNzd29yZCIsImhhbmRsZUxvZ091dCIsInN1Y2Nlc3MiLCJ1bmRlZmluZWQiLCJyZWNvcmRzIiwiZGVsIiwiX3J1bkFmdGVyTG9nb3V0VHJpZ2dlciIsInNlc3Npb24iLCJhZnRlckxvZ291dCIsIlNlc3Npb24iLCJfdGhyb3dPbkJhZEVtYWlsQ29uZmlnIiwiQ29uZmlnIiwidmFsaWRhdGVFbWFpbENvbmZpZ3VyYXRpb24iLCJlbWFpbEFkYXB0ZXIiLCJ1c2VyQ29udHJvbGxlciIsImFkYXB0ZXIiLCJhcHBOYW1lIiwicHVibGljU2VydmVyVVJMIiwiZW1haWxWZXJpZnlUb2tlblZhbGlkaXR5RHVyYXRpb24iLCJlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkIiwiZSIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImhhbmRsZVJlc2V0UmVxdWVzdCIsIkVNQUlMX01JU1NJTkciLCJJTlZBTElEX0VNQUlMX0FERFJFU1MiLCJzZW5kUGFzc3dvcmRSZXNldEVtYWlsIiwiZXJyIiwiY29kZSIsImhhbmRsZVZlcmlmaWNhdGlvbkVtYWlsUmVxdWVzdCIsIk9USEVSX0NBVVNFIiwicmVnZW5lcmF0ZUVtYWlsVmVyaWZ5VG9rZW4iLCJzZW5kVmVyaWZpY2F0aW9uRW1haWwiLCJtb3VudFJvdXRlcyIsInJvdXRlIiwiaGFuZGxlRmluZCIsInByb21pc2VFbnN1cmVJZGVtcG90ZW5jeSIsImhhbmRsZUNyZWF0ZSIsImhhbmRsZUdldCIsImhhbmRsZVVwZGF0ZSIsImhhbmRsZURlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRU8sTUFBTUEsV0FBTixTQUEwQkMsc0JBQTFCLENBQXdDO0FBQzdDQyxFQUFBQSxTQUFTLEdBQUc7QUFDVixXQUFPLE9BQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFDK0IsU0FBdEJDLHNCQUFzQixDQUFDQyxHQUFELEVBQU07QUFDakMsU0FBSyxJQUFJQyxHQUFULElBQWdCRCxHQUFoQixFQUFxQjtBQUNuQixVQUFJRSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ0wsR0FBckMsRUFBMENDLEdBQTFDLENBQUosRUFBb0Q7QUFDbEQ7QUFDQSxZQUFJQSxHQUFHLEtBQUssUUFBUixJQUFvQixDQUFDLDBCQUEwQkssSUFBMUIsQ0FBK0JMLEdBQS9CLENBQXpCLEVBQThEO0FBQzVELGlCQUFPRCxHQUFHLENBQUNDLEdBQUQsQ0FBVjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VNLEVBQUFBLGlCQUFpQixDQUFDQyxJQUFELEVBQU87QUFDdEIsV0FBT0EsSUFBSSxDQUFDQyxRQUFaLENBRHNCLENBR3RCO0FBQ0E7O0FBQ0EsUUFBSUQsSUFBSSxDQUFDRSxRQUFULEVBQW1CO0FBQ2pCUixN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QUwsQ0FBb0NoSCxHQUFwQyxDQUFQO0FBQ0QsS0FGRDtBQUdBLFNBQUtxSCxLQUFMLENBQVcsS0FBWCxFQUFrQixpQkFBbEIsRUFBcUNySCxHQUFHLElBQUk7QUFDMUMsYUFBTyxLQUFLb0Ysb0JBQUwsQ0FBMEJwRixHQUExQixDQUFQO0FBQ0QsS0FGRDtBQUdEOztBQWxlNEM7OztlQXFlaENwQixXIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlc2UgbWV0aG9kcyBoYW5kbGUgdGhlIFVzZXItcmVsYXRlZCByb3V0ZXMuXG5cbmltcG9ydCBQYXJzZSBmcm9tICdwYXJzZS9ub2RlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vQ29uZmlnJztcbmltcG9ydCBBY2NvdW50TG9ja291dCBmcm9tICcuLi9BY2NvdW50TG9ja291dCc7XG5pbXBvcnQgQ2xhc3Nlc1JvdXRlciBmcm9tICcuL0NsYXNzZXNSb3V0ZXInO1xuaW1wb3J0IHJlc3QgZnJvbSAnLi4vcmVzdCc7XG5pbXBvcnQgQXV0aCBmcm9tICcuLi9BdXRoJztcbmltcG9ydCBwYXNzd29yZENyeXB0byBmcm9tICcuLi9wYXNzd29yZCc7XG5pbXBvcnQgeyBtYXliZVJ1blRyaWdnZXIsIFR5cGVzIGFzIFRyaWdnZXJUeXBlcyB9IGZyb20gJy4uL3RyaWdnZXJzJztcbmltcG9ydCB7IHByb21pc2VFbnN1cmVJZGVtcG90ZW5jeSB9IGZyb20gJy4uL21pZGRsZXdhcmVzJztcbmltcG9ydCBSZXN0V3JpdGUgZnJvbSAnLi4vUmVzdFdyaXRlJztcblxuZXhwb3J0IGNsYXNzIFVzZXJzUm91dGVyIGV4dGVuZHMgQ2xhc3Nlc1JvdXRlciB7XG4gIGNsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gJ19Vc2VyJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBcIl9cIiBwcmVmaXhlZCBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LCBleGNlcHQgXCJfX3R5cGVcIlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyByZW1vdmVIaWRkZW5Qcm9wZXJ0aWVzKG9iaikge1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIC8vIFJlZ2V4cCBjb21lcyBmcm9tIFBhcnNlLk9iamVjdC5wcm90b3R5cGUudmFsaWRhdGVcbiAgICAgICAgaWYgKGtleSAhPT0gJ19fdHlwZScgJiYgIS9eW0EtWmEtel1bMC05QS1aYS16X10qJC8udGVzdChrZXkpKSB7XG4gICAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHJldHJpZXZpbmcgYSB1c2VyIGRpcmVjdGx5IGZyb20gdGhlIGRhdGFiYXNlLCB3ZSBuZWVkIHRvIHJlbW92ZSB0aGVcbiAgICogcGFzc3dvcmQgZnJvbSB0aGUgb2JqZWN0IChmb3Igc2VjdXJpdHkpLCBhbmQgZml4IGFuIGlzc3VlIHNvbWUgU0RLcyBoYXZlXG4gICAqIHdpdGggbnVsbCB2YWx1ZXNcbiAgICovXG4gIF9zYW5pdGl6ZUF1dGhEYXRhKHVzZXIpIHtcbiAgICBkZWxldGUgdXNlci5wYXNzd29yZDtcblxuICAgIC8vIFNvbWV0aW1lcyB0aGUgYXV0aERhdGEgc3RpbGwgaGFzIG51bGwgb24gdGhhdCBrZXlzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BhcnNlLWNvbW11bml0eS9wYXJzZS1zZXJ2ZXIvaXNzdWVzLzkzNVxuICAgIGlmICh1c2VyLmF1dGhEYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyh1c2VyLmF1dGhEYXRhKS5mb3JFYWNoKHByb3ZpZGVyID0+IHtcbiAgICAgICAgaWYgKHVzZXIuYXV0aERhdGFbcHJvdmlkZXJdID09PSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIHVzZXIuYXV0aERhdGFbcHJvdmlkZXJdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh1c2VyLmF1dGhEYXRhKS5sZW5ndGggPT0gMCkge1xuICAgICAgICBkZWxldGUgdXNlci5hdXRoRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIGEgcGFzc3dvcmQgcmVxdWVzdCBpbiBsb2dpbiBhbmQgdmVyaWZ5UGFzc3dvcmRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcSBUaGUgcmVxdWVzdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBVc2VyIG9iamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2F1dGhlbnRpY2F0ZVVzZXJGcm9tUmVxdWVzdChyZXEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gVXNlIHF1ZXJ5IHBhcmFtZXRlcnMgaW5zdGVhZCBpZiBwcm92aWRlZCBpbiB1cmxcbiAgICAgIGxldCBwYXlsb2FkID0gcmVxLmJvZHk7XG4gICAgICBpZiAoXG4gICAgICAgICghcGF5bG9hZC51c2VybmFtZSAmJiByZXEucXVlcnkgJiYgcmVxLnF1ZXJ5LnVzZXJuYW1lKSB8fFxuICAgICAgICAoIXBheWxvYWQuZW1haWwgJiYgcmVxLnF1ZXJ5ICYmIHJlcS5xdWVyeS5lbWFpbClcbiAgICAgICkge1xuICAgICAgICBwYXlsb2FkID0gcmVxLnF1ZXJ5O1xuICAgICAgfVxuICAgICAgY29uc3QgeyB1c2VybmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSBwYXlsb2FkO1xuXG4gICAgICAvLyBUT0RPOiB1c2UgdGhlIHJpZ2h0IGVycm9yIGNvZGVzIC8gZGVzY3JpcHRpb25zLlxuICAgICAgaWYgKCF1c2VybmFtZSAmJiAhZW1haWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLlVTRVJOQU1FX01JU1NJTkcsICd1c2VybmFtZS9lbWFpbCBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmICghcGFzc3dvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLlBBU1NXT1JEX01JU1NJTkcsICdwYXNzd29yZCBpcyByZXF1aXJlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHBhc3N3b3JkICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAoZW1haWwgJiYgdHlwZW9mIGVtYWlsICE9PSAnc3RyaW5nJykgfHxcbiAgICAgICAgKHVzZXJuYW1lICYmIHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLk9CSkVDVF9OT1RfRk9VTkQsICdJbnZhbGlkIHVzZXJuYW1lL3Bhc3N3b3JkLicpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXNlcjtcbiAgICAgIGxldCBpc1ZhbGlkUGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgIGxldCBxdWVyeTtcbiAgICAgIGlmIChlbWFpbCAmJiB1c2VybmFtZSkge1xuICAgICAgICBxdWVyeSA9IHsgZW1haWwsIHVzZXJuYW1lIH07XG4gICAgICB9IGVsc2UgaWYgKGVtYWlsKSB7XG4gICAgICAgIHF1ZXJ5ID0geyBlbWFpbCB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnkgPSB7ICRvcjogW3sgdXNlcm5hbWUgfSwgeyBlbWFpbDogdXNlcm5hbWUgfV0gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXEuY29uZmlnLmRhdGFiYXNlXG4gICAgICAgIC5maW5kKCdfVXNlcicsIHF1ZXJ5KVxuICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ0ludmFsaWQgdXNlcm5hbWUvcGFzc3dvcmQuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gY29ybmVyIGNhc2Ugd2hlcmUgdXNlcjEgaGFzIHVzZXJuYW1lID09IHVzZXIyIGVtYWlsXG4gICAgICAgICAgICByZXEuY29uZmlnLmxvZ2dlckNvbnRyb2xsZXIud2FybihcbiAgICAgICAgICAgICAgXCJUaGVyZSBpcyBhIHVzZXIgd2hpY2ggZW1haWwgaXMgdGhlIHNhbWUgYXMgYW5vdGhlciB1c2VyJ3MgdXNlcm5hbWUsIGxvZ2dpbmcgaW4gYmFzZWQgb24gdXNlcm5hbWVcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVzZXIgPSByZXN1bHRzLmZpbHRlcih1c2VyID0+IHVzZXIudXNlcm5hbWUgPT09IHVzZXJuYW1lKVswXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlciA9IHJlc3VsdHNbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHBhc3N3b3JkQ3J5cHRvLmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjb3JyZWN0ID0+IHtcbiAgICAgICAgICBpc1ZhbGlkUGFzc3dvcmQgPSBjb3JyZWN0O1xuICAgICAgICAgIGNvbnN0IGFjY291bnRMb2Nrb3V0UG9saWN5ID0gbmV3IEFjY291bnRMb2Nrb3V0KHVzZXIsIHJlcS5jb25maWcpO1xuICAgICAgICAgIHJldHVybiBhY2NvdW50TG9ja291dFBvbGljeS5oYW5kbGVMb2dpbkF0dGVtcHQoaXNWYWxpZFBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlmICghaXNWYWxpZFBhc3N3b3JkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ0ludmFsaWQgdXNlcm5hbWUvcGFzc3dvcmQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEVuc3VyZSB0aGUgdXNlciBpc24ndCBsb2NrZWQgb3V0XG4gICAgICAgICAgLy8gQSBsb2NrZWQgb3V0IHVzZXIgd29uJ3QgYmUgYWJsZSB0byBsb2dpblxuICAgICAgICAgIC8vIFRvIGxvY2sgYSB1c2VyIG91dCwganVzdCBzZXQgdGhlIEFDTCB0byBgbWFzdGVyS2V5YCBvbmx5ICAoe30pLlxuICAgICAgICAgIC8vIEVtcHR5IEFDTCBpcyBPS1xuICAgICAgICAgIGlmICghcmVxLmF1dGguaXNNYXN0ZXIgJiYgdXNlci5BQ0wgJiYgT2JqZWN0LmtleXModXNlci5BQ0wpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ0ludmFsaWQgdXNlcm5hbWUvcGFzc3dvcmQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlcS5jb25maWcudmVyaWZ5VXNlckVtYWlscyAmJlxuICAgICAgICAgICAgcmVxLmNvbmZpZy5wcmV2ZW50TG9naW5XaXRoVW52ZXJpZmllZEVtYWlsICYmXG4gICAgICAgICAgICAhdXNlci5lbWFpbFZlcmlmaWVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuRU1BSUxfTk9UX0ZPVU5ELCAnVXNlciBlbWFpbCBpcyBub3QgdmVyaWZpZWQuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fc2FuaXRpemVBdXRoRGF0YSh1c2VyKTtcblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHVzZXIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1lKHJlcSkge1xuICAgIGlmICghcmVxLmluZm8gfHwgIXJlcS5pbmZvLnNlc3Npb25Ub2tlbikge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLklOVkFMSURfU0VTU0lPTl9UT0tFTiwgJ0ludmFsaWQgc2Vzc2lvbiB0b2tlbicpO1xuICAgIH1cbiAgICBjb25zdCBzZXNzaW9uVG9rZW4gPSByZXEuaW5mby5zZXNzaW9uVG9rZW47XG4gICAgcmV0dXJuIHJlc3RcbiAgICAgIC5maW5kKFxuICAgICAgICByZXEuY29uZmlnLFxuICAgICAgICBBdXRoLm1hc3RlcihyZXEuY29uZmlnKSxcbiAgICAgICAgJ19TZXNzaW9uJyxcbiAgICAgICAgeyBzZXNzaW9uVG9rZW4gfSxcbiAgICAgICAgeyBpbmNsdWRlOiAndXNlcicgfSxcbiAgICAgICAgcmVxLmluZm8uY2xpZW50U0RLLFxuICAgICAgICByZXEuaW5mby5jb250ZXh0XG4gICAgICApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2UucmVzdWx0cyB8fCByZXNwb25zZS5yZXN1bHRzLmxlbmd0aCA9PSAwIHx8ICFyZXNwb25zZS5yZXN1bHRzWzBdLnVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuSU5WQUxJRF9TRVNTSU9OX1RPS0VOLCAnSW52YWxpZCBzZXNzaW9uIHRva2VuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IHJlc3BvbnNlLnJlc3VsdHNbMF0udXNlcjtcbiAgICAgICAgICAvLyBTZW5kIHRva2VuIGJhY2sgb24gdGhlIGxvZ2luLCBiZWNhdXNlIFNES3MgZXhwZWN0IHRoYXQuXG4gICAgICAgICAgdXNlci5zZXNzaW9uVG9rZW4gPSBzZXNzaW9uVG9rZW47XG5cbiAgICAgICAgICAvLyBSZW1vdmUgaGlkZGVuIHByb3BlcnRpZXMuXG4gICAgICAgICAgVXNlcnNSb3V0ZXIucmVtb3ZlSGlkZGVuUHJvcGVydGllcyh1c2VyKTtcblxuICAgICAgICAgIHJldHVybiB7IHJlc3BvbnNlOiB1c2VyIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlTG9nSW4ocmVxKSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuX2F1dGhlbnRpY2F0ZVVzZXJGcm9tUmVxdWVzdChyZXEpO1xuXG4gICAgLy8gaGFuZGxlIHBhc3N3b3JkIGV4cGlyeSBwb2xpY3lcbiAgICBpZiAocmVxLmNvbmZpZy5wYXNzd29yZFBvbGljeSAmJiByZXEuY29uZmlnLnBhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkQWdlKSB7XG4gICAgICBsZXQgY2hhbmdlZEF0ID0gdXNlci5fcGFzc3dvcmRfY2hhbmdlZF9hdDtcblxuICAgICAgaWYgKCFjaGFuZ2VkQXQpIHtcbiAgICAgICAgLy8gcGFzc3dvcmQgd2FzIGNyZWF0ZWQgYmVmb3JlIGV4cGlyeSBwb2xpY3kgd2FzIGVuYWJsZWQuXG4gICAgICAgIC8vIHNpbXBseSB1cGRhdGUgX1VzZXIgb2JqZWN0IHNvIHRoYXQgaXQgd2lsbCBzdGFydCBlbmZvcmNpbmcgZnJvbSBub3dcbiAgICAgICAgY2hhbmdlZEF0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVxLmNvbmZpZy5kYXRhYmFzZS51cGRhdGUoXG4gICAgICAgICAgJ19Vc2VyJyxcbiAgICAgICAgICB7IHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lIH0sXG4gICAgICAgICAgeyBfcGFzc3dvcmRfY2hhbmdlZF9hdDogUGFyc2UuX2VuY29kZShjaGFuZ2VkQXQpIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHBhc3N3b3JkIGhhcyBleHBpcmVkXG4gICAgICAgIGlmIChjaGFuZ2VkQXQuX190eXBlID09ICdEYXRlJykge1xuICAgICAgICAgIGNoYW5nZWRBdCA9IG5ldyBEYXRlKGNoYW5nZWRBdC5pc28pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZXhwaXJ5IHRpbWUuXG4gICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IG5ldyBEYXRlKFxuICAgICAgICAgIGNoYW5nZWRBdC5nZXRUaW1lKCkgKyA4NjQwMDAwMCAqIHJlcS5jb25maWcucGFzc3dvcmRQb2xpY3kubWF4UGFzc3dvcmRBZ2VcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGV4cGlyZXNBdCA8IG5ldyBEYXRlKCkpXG4gICAgICAgICAgLy8gZmFpbCBvZiBjdXJyZW50IHRpbWUgaXMgcGFzdCBwYXNzd29yZCBleHBpcnkgdGltZVxuICAgICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICAgIFBhcnNlLkVycm9yLk9CSkVDVF9OT1RfRk9VTkQsXG4gICAgICAgICAgICAnWW91ciBwYXNzd29yZCBoYXMgZXhwaXJlZC4gUGxlYXNlIHJlc2V0IHlvdXIgcGFzc3dvcmQuJ1xuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICAgIFVzZXJzUm91dGVyLnJlbW92ZUhpZGRlblByb3BlcnRpZXModXNlcik7XG5cbiAgICByZXEuY29uZmlnLmZpbGVzQ29udHJvbGxlci5leHBhbmRGaWxlc0luT2JqZWN0KHJlcS5jb25maWcsIHVzZXIpO1xuXG4gICAgLy8gQmVmb3JlIGxvZ2luIHRyaWdnZXI7IHRocm93cyBpZiBmYWlsdXJlXG4gICAgYXdhaXQgbWF5YmVSdW5UcmlnZ2VyKFxuICAgICAgVHJpZ2dlclR5cGVzLmJlZm9yZUxvZ2luLFxuICAgICAgcmVxLmF1dGgsXG4gICAgICBQYXJzZS5Vc2VyLmZyb21KU09OKE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6ICdfVXNlcicgfSwgdXNlcikpLFxuICAgICAgbnVsbCxcbiAgICAgIHJlcS5jb25maWdcbiAgICApO1xuXG4gICAgY29uc3QgeyBzZXNzaW9uRGF0YSwgY3JlYXRlU2Vzc2lvbiB9ID0gUmVzdFdyaXRlLmNyZWF0ZVNlc3Npb24ocmVxLmNvbmZpZywge1xuICAgICAgdXNlcklkOiB1c2VyLm9iamVjdElkLFxuICAgICAgY3JlYXRlZFdpdGg6IHtcbiAgICAgICAgYWN0aW9uOiAnbG9naW4nLFxuICAgICAgICBhdXRoUHJvdmlkZXI6ICdwYXNzd29yZCcsXG4gICAgICB9LFxuICAgICAgaW5zdGFsbGF0aW9uSWQ6IHJlcS5pbmZvLmluc3RhbGxhdGlvbklkLFxuICAgIH0pO1xuXG4gICAgdXNlci5zZXNzaW9uVG9rZW4gPSBzZXNzaW9uRGF0YS5zZXNzaW9uVG9rZW47XG5cbiAgICBhd2FpdCBjcmVhdGVTZXNzaW9uKCk7XG5cbiAgICBjb25zdCBhZnRlckxvZ2luVXNlciA9IFBhcnNlLlVzZXIuZnJvbUpTT04oT2JqZWN0LmFzc2lnbih7IGNsYXNzTmFtZTogJ19Vc2VyJyB9LCB1c2VyKSk7XG4gICAgbWF5YmVSdW5UcmlnZ2VyKFxuICAgICAgVHJpZ2dlclR5cGVzLmFmdGVyTG9naW4sXG4gICAgICB7IC4uLnJlcS5hdXRoLCB1c2VyOiBhZnRlckxvZ2luVXNlciB9LFxuICAgICAgYWZ0ZXJMb2dpblVzZXIsXG4gICAgICBudWxsLFxuICAgICAgcmVxLmNvbmZpZ1xuICAgICk7XG5cbiAgICByZXR1cm4geyByZXNwb25zZTogdXNlciB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgYWxsb3dzIG1hc3Rlci1rZXkgY2xpZW50cyB0byBjcmVhdGUgdXNlciBzZXNzaW9ucyB3aXRob3V0IGFjY2VzcyB0b1xuICAgKiB1c2VyIGNyZWRlbnRpYWxzLiBUaGlzIGVuYWJsZXMgc3lzdGVtcyB0aGF0IGNhbiBhdXRoZW50aWNhdGUgYWNjZXNzIGFub3RoZXJcbiAgICogd2F5IChBUEkga2V5LCBhcHAgYWRtaW5pc3RyYXRvcnMpIHRvIGFjdCBvbiBhIHVzZXIncyBiZWhhbGYuXG4gICAqXG4gICAqIFdlIGNyZWF0ZSBhIG5ldyBzZXNzaW9uIHJhdGhlciB0aGFuIGxvb2tpbmcgZm9yIGFuIGV4aXN0aW5nIHNlc3Npb247IHdlXG4gICAqIHdhbnQgdGhpcyB0byB3b3JrIGluIHNpdHVhdGlvbnMgd2hlcmUgdGhlIHVzZXIgaXMgbG9nZ2VkIG91dCBvbiBhbGxcbiAgICogZGV2aWNlcywgc2luY2UgdGhpcyBjYW4gYmUgdXNlZCBieSBhdXRvbWF0ZWQgc3lzdGVtcyBhY3Rpbmcgb24gdGhlIHVzZXInc1xuICAgKiBiZWhhbGYuXG4gICAqXG4gICAqIEZvciB0aGUgbW9tZW50LCB3ZSdyZSBvbWl0dGluZyBldmVudCBob29rcyBhbmQgbG9ja291dCBjaGVja3MsIHNpbmNlXG4gICAqIGltbWVkaWF0ZSB1c2UgY2FzZXMgc3VnZ2VzdCAvbG9naW5BcyBjb3VsZCBiZSB1c2VkIGZvciBzZW1hbnRpY2FsbHlcbiAgICogZGlmZmVyZW50IHJlYXNvbnMgZnJvbSAvbG9naW5cbiAgICovXG4gIGFzeW5jIGhhbmRsZUxvZ0luQXMocmVxKSB7XG4gICAgaWYgKCFyZXEuYXV0aC5pc01hc3Rlcikge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLk9QRVJBVElPTl9GT1JCSURERU4sICdtYXN0ZXIga2V5IGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gcmVxLmJvZHkudXNlcklkIHx8IHJlcS5xdWVyeS51c2VySWQ7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9WQUxVRSxcbiAgICAgICAgJ3VzZXJJZCBtdXN0IG5vdCBiZSBlbXB0eSwgbnVsbCwgb3IgdW5kZWZpbmVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBhd2FpdCByZXEuY29uZmlnLmRhdGFiYXNlLmZpbmQoJ19Vc2VyJywgeyBvYmplY3RJZDogdXNlcklkIH0pO1xuICAgIGNvbnN0IHVzZXIgPSBxdWVyeVJlc3VsdHNbMF07XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCwgJ3VzZXIgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2FuaXRpemVBdXRoRGF0YSh1c2VyKTtcblxuICAgIGNvbnN0IHsgc2Vzc2lvbkRhdGEsIGNyZWF0ZVNlc3Npb24gfSA9IFJlc3RXcml0ZS5jcmVhdGVTZXNzaW9uKHJlcS5jb25maWcsIHtcbiAgICAgIHVzZXJJZCxcbiAgICAgIGNyZWF0ZWRXaXRoOiB7XG4gICAgICAgIGFjdGlvbjogJ2xvZ2luJyxcbiAgICAgICAgYXV0aFByb3ZpZGVyOiAnbWFzdGVya2V5JyxcbiAgICAgIH0sXG4gICAgICBpbnN0YWxsYXRpb25JZDogcmVxLmluZm8uaW5zdGFsbGF0aW9uSWQsXG4gICAgfSk7XG5cbiAgICB1c2VyLnNlc3Npb25Ub2tlbiA9IHNlc3Npb25EYXRhLnNlc3Npb25Ub2tlbjtcblxuICAgIGF3YWl0IGNyZWF0ZVNlc3Npb24oKTtcblxuICAgIHJldHVybiB7IHJlc3BvbnNlOiB1c2VyIH07XG4gIH1cblxuICBoYW5kbGVWZXJpZnlQYXNzd29yZChyZXEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0aGVudGljYXRlVXNlckZyb21SZXF1ZXN0KHJlcSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAvLyBSZW1vdmUgaGlkZGVuIHByb3BlcnRpZXMuXG4gICAgICAgIFVzZXJzUm91dGVyLnJlbW92ZUhpZGRlblByb3BlcnRpZXModXNlcik7XG5cbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHVzZXIgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTG9nT3V0KHJlcSkge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB7IHJlc3BvbnNlOiB7fSB9O1xuICAgIGlmIChyZXEuaW5mbyAmJiByZXEuaW5mby5zZXNzaW9uVG9rZW4pIHtcbiAgICAgIHJldHVybiByZXN0XG4gICAgICAgIC5maW5kKFxuICAgICAgICAgIHJlcS5jb25maWcsXG4gICAgICAgICAgQXV0aC5tYXN0ZXIocmVxLmNvbmZpZyksXG4gICAgICAgICAgJ19TZXNzaW9uJyxcbiAgICAgICAgICB7IHNlc3Npb25Ub2tlbjogcmVxLmluZm8uc2Vzc2lvblRva2VuIH0sXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHJlcS5pbmZvLmNsaWVudFNESyxcbiAgICAgICAgICByZXEuaW5mby5jb250ZXh0XG4gICAgICAgIClcbiAgICAgICAgLnRoZW4ocmVjb3JkcyA9PiB7XG4gICAgICAgICAgaWYgKHJlY29yZHMucmVzdWx0cyAmJiByZWNvcmRzLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdFxuICAgICAgICAgICAgICAuZGVsKFxuICAgICAgICAgICAgICAgIHJlcS5jb25maWcsXG4gICAgICAgICAgICAgICAgQXV0aC5tYXN0ZXIocmVxLmNvbmZpZyksXG4gICAgICAgICAgICAgICAgJ19TZXNzaW9uJyxcbiAgICAgICAgICAgICAgICByZWNvcmRzLnJlc3VsdHNbMF0ub2JqZWN0SWQsXG4gICAgICAgICAgICAgICAgcmVxLmluZm8uY29udGV4dFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ydW5BZnRlckxvZ291dFRyaWdnZXIocmVxLCByZWNvcmRzLnJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdWNjZXNzKTtcbiAgfVxuXG4gIF9ydW5BZnRlckxvZ291dFRyaWdnZXIocmVxLCBzZXNzaW9uKSB7XG4gICAgLy8gQWZ0ZXIgbG9nb3V0IHRyaWdnZXJcbiAgICBtYXliZVJ1blRyaWdnZXIoXG4gICAgICBUcmlnZ2VyVHlwZXMuYWZ0ZXJMb2dvdXQsXG4gICAgICByZXEuYXV0aCxcbiAgICAgIFBhcnNlLlNlc3Npb24uZnJvbUpTT04oT2JqZWN0LmFzc2lnbih7IGNsYXNzTmFtZTogJ19TZXNzaW9uJyB9LCBzZXNzaW9uKSksXG4gICAgICBudWxsLFxuICAgICAgcmVxLmNvbmZpZ1xuICAgICk7XG4gIH1cblxuICBfdGhyb3dPbkJhZEVtYWlsQ29uZmlnKHJlcSkge1xuICAgIHRyeSB7XG4gICAgICBDb25maWcudmFsaWRhdGVFbWFpbENvbmZpZ3VyYXRpb24oe1xuICAgICAgICBlbWFpbEFkYXB0ZXI6IHJlcS5jb25maWcudXNlckNvbnRyb2xsZXIuYWRhcHRlcixcbiAgICAgICAgYXBwTmFtZTogcmVxLmNvbmZpZy5hcHBOYW1lLFxuICAgICAgICBwdWJsaWNTZXJ2ZXJVUkw6IHJlcS5jb25maWcucHVibGljU2VydmVyVVJMLFxuICAgICAgICBlbWFpbFZlcmlmeVRva2VuVmFsaWRpdHlEdXJhdGlvbjogcmVxLmNvbmZpZy5lbWFpbFZlcmlmeVRva2VuVmFsaWRpdHlEdXJhdGlvbixcbiAgICAgICAgZW1haWxWZXJpZnlUb2tlblJldXNlSWZWYWxpZDogcmVxLmNvbmZpZy5lbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBNYXliZSB3ZSBuZWVkIGEgQmFkIENvbmZpZ3VyYXRpb24gZXJyb3IsIGJ1dCB0aGUgU0RLcyB3b24ndCB1bmRlcnN0YW5kIGl0LiBGb3Igbm93LCBJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuXG4gICAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgICBQYXJzZS5FcnJvci5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgJ0FuIGFwcE5hbWUsIHB1YmxpY1NlcnZlclVSTCwgYW5kIGVtYWlsQWRhcHRlciBhcmUgcmVxdWlyZWQgZm9yIHBhc3N3b3JkIHJlc2V0IGFuZCBlbWFpbCB2ZXJpZmljYXRpb24gZnVuY3Rpb25hbGl0eS4nXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2V0UmVxdWVzdChyZXEpIHtcbiAgICB0aGlzLl90aHJvd09uQmFkRW1haWxDb25maWcocmVxKTtcblxuICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgIGlmICghZW1haWwpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihQYXJzZS5FcnJvci5FTUFJTF9NSVNTSU5HLCAneW91IG11c3QgcHJvdmlkZSBhbiBlbWFpbCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVtYWlsICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFxuICAgICAgICBQYXJzZS5FcnJvci5JTlZBTElEX0VNQUlMX0FERFJFU1MsXG4gICAgICAgICd5b3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgZW1haWwgc3RyaW5nJ1xuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdXNlckNvbnRyb2xsZXIgPSByZXEuY29uZmlnLnVzZXJDb250cm9sbGVyO1xuICAgIHJldHVybiB1c2VyQ29udHJvbGxlci5zZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsKS50aGVuKFxuICAgICAgKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICByZXNwb25zZToge30sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gUGFyc2UuRXJyb3IuT0JKRUNUX05PVF9GT1VORCkge1xuICAgICAgICAgIC8vIFJldHVybiBzdWNjZXNzIHNvIHRoYXQgdGhpcyBlbmRwb2ludCBjYW4ndFxuICAgICAgICAgIC8vIGJlIHVzZWQgdG8gZW51bWVyYXRlIHZhbGlkIGVtYWlsc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBoYW5kbGVWZXJpZmljYXRpb25FbWFpbFJlcXVlc3QocmVxKSB7XG4gICAgdGhpcy5fdGhyb3dPbkJhZEVtYWlsQ29uZmlnKHJlcSk7XG5cbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIWVtYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuRU1BSUxfTUlTU0lORywgJ3lvdSBtdXN0IHByb3ZpZGUgYW4gZW1haWwnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbWFpbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZS5FcnJvcihcbiAgICAgICAgUGFyc2UuRXJyb3IuSU5WQUxJRF9FTUFJTF9BRERSRVNTLFxuICAgICAgICAneW91IG11c3QgcHJvdmlkZSBhIHZhbGlkIGVtYWlsIHN0cmluZydcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcS5jb25maWcuZGF0YWJhc2UuZmluZCgnX1VzZXInLCB7IGVtYWlsOiBlbWFpbCB9KS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgaWYgKCFyZXN1bHRzLmxlbmd0aCB8fCByZXN1bHRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlLkVycm9yKFBhcnNlLkVycm9yLkVNQUlMX05PVF9GT1VORCwgYE5vIHVzZXIgZm91bmQgd2l0aCBlbWFpbCAke2VtYWlsfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgdXNlciA9IHJlc3VsdHNbMF07XG5cbiAgICAgIC8vIHJlbW92ZSBwYXNzd29yZCBmaWVsZCwgbWVzc2VzIHdpdGggc2F2aW5nIG9uIHBvc3RncmVzXG4gICAgICBkZWxldGUgdXNlci5wYXNzd29yZDtcblxuICAgICAgaWYgKHVzZXIuZW1haWxWZXJpZmllZCkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2UuRXJyb3IoUGFyc2UuRXJyb3IuT1RIRVJfQ0FVU0UsIGBFbWFpbCAke2VtYWlsfSBpcyBhbHJlYWR5IHZlcmlmaWVkLmApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyQ29udHJvbGxlciA9IHJlcS5jb25maWcudXNlckNvbnRyb2xsZXI7XG4gICAgICByZXR1cm4gdXNlckNvbnRyb2xsZXIucmVnZW5lcmF0ZUVtYWlsVmVyaWZ5VG9rZW4odXNlcikudGhlbigoKSA9PiB7XG4gICAgICAgIHVzZXJDb250cm9sbGVyLnNlbmRWZXJpZmljYXRpb25FbWFpbCh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2U6IHt9IH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdW50Um91dGVzKCkge1xuICAgIHRoaXMucm91dGUoJ0dFVCcsICcvdXNlcnMnLCByZXEgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRmluZChyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ1BPU1QnLCAnL3VzZXJzJywgcHJvbWlzZUVuc3VyZUlkZW1wb3RlbmN5LCByZXEgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlQ3JlYXRlKHJlcSk7XG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZSgnR0VUJywgJy91c2Vycy9tZScsIHJlcSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVNZShyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ0dFVCcsICcvdXNlcnMvOm9iamVjdElkJywgcmVxID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUdldChyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ1BVVCcsICcvdXNlcnMvOm9iamVjdElkJywgcHJvbWlzZUVuc3VyZUlkZW1wb3RlbmN5LCByZXEgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVXBkYXRlKHJlcSk7XG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZSgnREVMRVRFJywgJy91c2Vycy86b2JqZWN0SWQnLCByZXEgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRGVsZXRlKHJlcSk7XG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZSgnR0VUJywgJy9sb2dpbicsIHJlcSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVMb2dJbihyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ1BPU1QnLCAnL2xvZ2luJywgcmVxID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUxvZ0luKHJlcSk7XG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZSgnUE9TVCcsICcvbG9naW5BcycsIHJlcSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVMb2dJbkFzKHJlcSk7XG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZSgnUE9TVCcsICcvbG9nb3V0JywgcmVxID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUxvZ091dChyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ1BPU1QnLCAnL3JlcXVlc3RQYXNzd29yZFJlc2V0JywgcmVxID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc2V0UmVxdWVzdChyZXEpO1xuICAgIH0pO1xuICAgIHRoaXMucm91dGUoJ1BPU1QnLCAnL3ZlcmlmaWNhdGlvbkVtYWlsUmVxdWVzdCcsIHJlcSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVWZXJpZmljYXRpb25FbWFpbFJlcXVlc3QocmVxKTtcbiAgICB9KTtcbiAgICB0aGlzLnJvdXRlKCdHRVQnLCAnL3ZlcmlmeVBhc3N3b3JkJywgcmVxID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVZlcmlmeVBhc3N3b3JkKHJlcSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcnNSb3V0ZXI7XG4iXX0=