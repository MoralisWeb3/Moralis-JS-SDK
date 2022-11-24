"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Config = void 0;

var _cache = _interopRequireDefault(require("./cache"));

var _DatabaseController = _interopRequireDefault(require("./Controllers/DatabaseController"));

var _net = _interopRequireDefault(require("net"));

var _Definitions = require("./Options/Definitions");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A Config object provides information about how a specific app is
// configured.
// mount is the URL for the root of the API; includes http, domain, etc.
function removeTrailingSlash(str) {
  if (!str) {
    return str;
  }

  if (str.endsWith('/')) {
    str = str.substr(0, str.length - 1);
  }

  return str;
}

class Config {
  static get(applicationId, mount) {
    const cacheInfo = _cache.default.get(applicationId);

    if (!cacheInfo) {
      return;
    }

    const config = new Config();
    config.applicationId = applicationId;
    Object.keys(cacheInfo).forEach(key => {
      if (key == 'databaseController') {
        config.database = new _DatabaseController.default(cacheInfo.databaseController.adapter, config);
      } else {
        config[key] = cacheInfo[key];
      }
    });
    config.mount = removeTrailingSlash(mount);
    config.generateSessionExpiresAt = config.generateSessionExpiresAt.bind(config);
    config.generateEmailVerifyTokenExpiresAt = config.generateEmailVerifyTokenExpiresAt.bind(config);
    return config;
  }

  static put(serverConfiguration) {
    Config.validate(serverConfiguration);

    _cache.default.put(serverConfiguration.appId, serverConfiguration);

    Config.setupPasswordValidator(serverConfiguration.passwordPolicy);
    return serverConfiguration;
  }

  static validate({
    verifyUserEmails,
    userController,
    appName,
    publicServerURL,
    revokeSessionOnPasswordReset,
    expireInactiveSessions,
    sessionLength,
    defaultLimit,
    maxLimit,
    emailVerifyTokenValidityDuration,
    accountLockout,
    passwordPolicy,
    masterKeyIps,
    masterKey,
    readOnlyMasterKey,
    allowHeaders,
    idempotencyOptions,
    emailVerifyTokenReuseIfValid,
    fileUpload,
    pages,
    security,
    enforcePrivateUsers,
    schema,
    requestKeywordDenylist
  }) {
    if (masterKey === readOnlyMasterKey) {
      throw new Error('masterKey and readOnlyMasterKey should be different');
    }

    const emailAdapter = userController.adapter;

    if (verifyUserEmails) {
      this.validateEmailConfiguration({
        emailAdapter,
        appName,
        publicServerURL,
        emailVerifyTokenValidityDuration,
        emailVerifyTokenReuseIfValid
      });
    }

    this.validateAccountLockoutPolicy(accountLockout);
    this.validatePasswordPolicy(passwordPolicy);
    this.validateFileUploadOptions(fileUpload);

    if (typeof revokeSessionOnPasswordReset !== 'boolean') {
      throw 'revokeSessionOnPasswordReset must be a boolean value';
    }

    if (publicServerURL) {
      if (!publicServerURL.startsWith('http://') && !publicServerURL.startsWith('https://')) {
        throw 'publicServerURL should be a valid HTTPS URL starting with https://';
      }
    }

    this.validateSessionConfiguration(sessionLength, expireInactiveSessions);
    this.validateMasterKeyIps(masterKeyIps);
    this.validateDefaultLimit(defaultLimit);
    this.validateMaxLimit(maxLimit);
    this.validateAllowHeaders(allowHeaders);
    this.validateIdempotencyOptions(idempotencyOptions);
    this.validatePagesOptions(pages);
    this.validateSecurityOptions(security);
    this.validateSchemaOptions(schema);
    this.validateEnforcePrivateUsers(enforcePrivateUsers);
    this.validateRequestKeywordDenylist(requestKeywordDenylist);
  }

  static validateRequestKeywordDenylist(requestKeywordDenylist) {
    if (requestKeywordDenylist === undefined) {
      requestKeywordDenylist = requestKeywordDenylist.default;
    } else if (!Array.isArray(requestKeywordDenylist)) {
      throw 'Parse Server option requestKeywordDenylist must be an array.';
    }
  }

  static validateEnforcePrivateUsers(enforcePrivateUsers) {
    if (typeof enforcePrivateUsers !== 'boolean') {
      throw 'Parse Server option enforcePrivateUsers must be a boolean.';
    }
  }

  static validateSecurityOptions(security) {
    if (Object.prototype.toString.call(security) !== '[object Object]') {
      throw 'Parse Server option security must be an object.';
    }

    if (security.enableCheck === undefined) {
      security.enableCheck = _Definitions.SecurityOptions.enableCheck.default;
    } else if (!(0, _lodash.isBoolean)(security.enableCheck)) {
      throw 'Parse Server option security.enableCheck must be a boolean.';
    }

    if (security.enableCheckLog === undefined) {
      security.enableCheckLog = _Definitions.SecurityOptions.enableCheckLog.default;
    } else if (!(0, _lodash.isBoolean)(security.enableCheckLog)) {
      throw 'Parse Server option security.enableCheckLog must be a boolean.';
    }
  }

  static validateSchemaOptions(schema) {
    if (!schema) return;

    if (Object.prototype.toString.call(schema) !== '[object Object]') {
      throw 'Parse Server option schema must be an object.';
    }

    if (schema.definitions === undefined) {
      schema.definitions = _Definitions.SchemaOptions.definitions.default;
    } else if (!Array.isArray(schema.definitions)) {
      throw 'Parse Server option schema.definitions must be an array.';
    }

    if (schema.strict === undefined) {
      schema.strict = _Definitions.SchemaOptions.strict.default;
    } else if (!(0, _lodash.isBoolean)(schema.strict)) {
      throw 'Parse Server option schema.strict must be a boolean.';
    }

    if (schema.deleteExtraFields === undefined) {
      schema.deleteExtraFields = _Definitions.SchemaOptions.deleteExtraFields.default;
    } else if (!(0, _lodash.isBoolean)(schema.deleteExtraFields)) {
      throw 'Parse Server option schema.deleteExtraFields must be a boolean.';
    }

    if (schema.recreateModifiedFields === undefined) {
      schema.recreateModifiedFields = _Definitions.SchemaOptions.recreateModifiedFields.default;
    } else if (!(0, _lodash.isBoolean)(schema.recreateModifiedFields)) {
      throw 'Parse Server option schema.recreateModifiedFields must be a boolean.';
    }

    if (schema.lockSchemas === undefined) {
      schema.lockSchemas = _Definitions.SchemaOptions.lockSchemas.default;
    } else if (!(0, _lodash.isBoolean)(schema.lockSchemas)) {
      throw 'Parse Server option schema.lockSchemas must be a boolean.';
    }

    if (schema.beforeMigration === undefined) {
      schema.beforeMigration = null;
    } else if (schema.beforeMigration !== null && typeof schema.beforeMigration !== 'function') {
      throw 'Parse Server option schema.beforeMigration must be a function.';
    }

    if (schema.afterMigration === undefined) {
      schema.afterMigration = null;
    } else if (schema.afterMigration !== null && typeof schema.afterMigration !== 'function') {
      throw 'Parse Server option schema.afterMigration must be a function.';
    }
  }

  static validatePagesOptions(pages) {
    if (Object.prototype.toString.call(pages) !== '[object Object]') {
      throw 'Parse Server option pages must be an object.';
    }

    if (pages.enableRouter === undefined) {
      pages.enableRouter = _Definitions.PagesOptions.enableRouter.default;
    } else if (!(0, _lodash.isBoolean)(pages.enableRouter)) {
      throw 'Parse Server option pages.enableRouter must be a boolean.';
    }

    if (pages.enableLocalization === undefined) {
      pages.enableLocalization = _Definitions.PagesOptions.enableLocalization.default;
    } else if (!(0, _lodash.isBoolean)(pages.enableLocalization)) {
      throw 'Parse Server option pages.enableLocalization must be a boolean.';
    }

    if (pages.localizationJsonPath === undefined) {
      pages.localizationJsonPath = _Definitions.PagesOptions.localizationJsonPath.default;
    } else if (!(0, _lodash.isString)(pages.localizationJsonPath)) {
      throw 'Parse Server option pages.localizationJsonPath must be a string.';
    }

    if (pages.localizationFallbackLocale === undefined) {
      pages.localizationFallbackLocale = _Definitions.PagesOptions.localizationFallbackLocale.default;
    } else if (!(0, _lodash.isString)(pages.localizationFallbackLocale)) {
      throw 'Parse Server option pages.localizationFallbackLocale must be a string.';
    }

    if (pages.placeholders === undefined) {
      pages.placeholders = _Definitions.PagesOptions.placeholders.default;
    } else if (Object.prototype.toString.call(pages.placeholders) !== '[object Object]' && typeof pages.placeholders !== 'function') {
      throw 'Parse Server option pages.placeholders must be an object or a function.';
    }

    if (pages.forceRedirect === undefined) {
      pages.forceRedirect = _Definitions.PagesOptions.forceRedirect.default;
    } else if (!(0, _lodash.isBoolean)(pages.forceRedirect)) {
      throw 'Parse Server option pages.forceRedirect must be a boolean.';
    }

    if (pages.pagesPath === undefined) {
      pages.pagesPath = _Definitions.PagesOptions.pagesPath.default;
    } else if (!(0, _lodash.isString)(pages.pagesPath)) {
      throw 'Parse Server option pages.pagesPath must be a string.';
    }

    if (pages.pagesEndpoint === undefined) {
      pages.pagesEndpoint = _Definitions.PagesOptions.pagesEndpoint.default;
    } else if (!(0, _lodash.isString)(pages.pagesEndpoint)) {
      throw 'Parse Server option pages.pagesEndpoint must be a string.';
    }

    if (pages.customUrls === undefined) {
      pages.customUrls = _Definitions.PagesOptions.customUrls.default;
    } else if (Object.prototype.toString.call(pages.customUrls) !== '[object Object]') {
      throw 'Parse Server option pages.customUrls must be an object.';
    }

    if (pages.customRoutes === undefined) {
      pages.customRoutes = _Definitions.PagesOptions.customRoutes.default;
    } else if (!(pages.customRoutes instanceof Array)) {
      throw 'Parse Server option pages.customRoutes must be an array.';
    }
  }

  static validateIdempotencyOptions(idempotencyOptions) {
    if (!idempotencyOptions) {
      return;
    }

    if (idempotencyOptions.ttl === undefined) {
      idempotencyOptions.ttl = _Definitions.IdempotencyOptions.ttl.default;
    } else if (!isNaN(idempotencyOptions.ttl) && idempotencyOptions.ttl <= 0) {
      throw 'idempotency TTL value must be greater than 0 seconds';
    } else if (isNaN(idempotencyOptions.ttl)) {
      throw 'idempotency TTL value must be a number';
    }

    if (!idempotencyOptions.paths) {
      idempotencyOptions.paths = _Definitions.IdempotencyOptions.paths.default;
    } else if (!(idempotencyOptions.paths instanceof Array)) {
      throw 'idempotency paths must be of an array of strings';
    }
  }

  static validateAccountLockoutPolicy(accountLockout) {
    if (accountLockout) {
      if (typeof accountLockout.duration !== 'number' || accountLockout.duration <= 0 || accountLockout.duration > 99999) {
        throw 'Account lockout duration should be greater than 0 and less than 100000';
      }

      if (!Number.isInteger(accountLockout.threshold) || accountLockout.threshold < 1 || accountLockout.threshold > 999) {
        throw 'Account lockout threshold should be an integer greater than 0 and less than 1000';
      }

      if (accountLockout.unlockOnPasswordReset === undefined) {
        accountLockout.unlockOnPasswordReset = _Definitions.AccountLockoutOptions.unlockOnPasswordReset.default;
      } else if (!(0, _lodash.isBoolean)(accountLockout.unlockOnPasswordReset)) {
        throw 'Parse Server option accountLockout.unlockOnPasswordReset must be a boolean.';
      }
    }
  }

  static validatePasswordPolicy(passwordPolicy) {
    if (passwordPolicy) {
      if (passwordPolicy.maxPasswordAge !== undefined && (typeof passwordPolicy.maxPasswordAge !== 'number' || passwordPolicy.maxPasswordAge < 0)) {
        throw 'passwordPolicy.maxPasswordAge must be a positive number';
      }

      if (passwordPolicy.resetTokenValidityDuration !== undefined && (typeof passwordPolicy.resetTokenValidityDuration !== 'number' || passwordPolicy.resetTokenValidityDuration <= 0)) {
        throw 'passwordPolicy.resetTokenValidityDuration must be a positive number';
      }

      if (passwordPolicy.validatorPattern) {
        if (typeof passwordPolicy.validatorPattern === 'string') {
          passwordPolicy.validatorPattern = new RegExp(passwordPolicy.validatorPattern);
        } else if (!(passwordPolicy.validatorPattern instanceof RegExp)) {
          throw 'passwordPolicy.validatorPattern must be a regex string or RegExp object.';
        }
      }

      if (passwordPolicy.validatorCallback && typeof passwordPolicy.validatorCallback !== 'function') {
        throw 'passwordPolicy.validatorCallback must be a function.';
      }

      if (passwordPolicy.doNotAllowUsername && typeof passwordPolicy.doNotAllowUsername !== 'boolean') {
        throw 'passwordPolicy.doNotAllowUsername must be a boolean value.';
      }

      if (passwordPolicy.maxPasswordHistory && (!Number.isInteger(passwordPolicy.maxPasswordHistory) || passwordPolicy.maxPasswordHistory <= 0 || passwordPolicy.maxPasswordHistory > 20)) {
        throw 'passwordPolicy.maxPasswordHistory must be an integer ranging 0 - 20';
      }

      if (passwordPolicy.resetTokenReuseIfValid && typeof passwordPolicy.resetTokenReuseIfValid !== 'boolean') {
        throw 'resetTokenReuseIfValid must be a boolean value';
      }

      if (passwordPolicy.resetTokenReuseIfValid && !passwordPolicy.resetTokenValidityDuration) {
        throw 'You cannot use resetTokenReuseIfValid without resetTokenValidityDuration';
      }
    }
  } // if the passwordPolicy.validatorPattern is configured then setup a callback to process the pattern


  static setupPasswordValidator(passwordPolicy) {
    if (passwordPolicy && passwordPolicy.validatorPattern) {
      passwordPolicy.patternValidator = value => {
        return passwordPolicy.validatorPattern.test(value);
      };
    }
  }

  static validateEmailConfiguration({
    emailAdapter,
    appName,
    publicServerURL,
    emailVerifyTokenValidityDuration,
    emailVerifyTokenReuseIfValid
  }) {
    if (!emailAdapter) {
      throw 'An emailAdapter is required for e-mail verification and password resets.';
    }

    if (typeof appName !== 'string') {
      throw 'An app name is required for e-mail verification and password resets.';
    }

    if (typeof publicServerURL !== 'string') {
      throw 'A public server url is required for e-mail verification and password resets.';
    }

    if (emailVerifyTokenValidityDuration) {
      if (isNaN(emailVerifyTokenValidityDuration)) {
        throw 'Email verify token validity duration must be a valid number.';
      } else if (emailVerifyTokenValidityDuration <= 0) {
        throw 'Email verify token validity duration must be a value greater than 0.';
      }
    }

    if (emailVerifyTokenReuseIfValid && typeof emailVerifyTokenReuseIfValid !== 'boolean') {
      throw 'emailVerifyTokenReuseIfValid must be a boolean value';
    }

    if (emailVerifyTokenReuseIfValid && !emailVerifyTokenValidityDuration) {
      throw 'You cannot use emailVerifyTokenReuseIfValid without emailVerifyTokenValidityDuration';
    }
  }

  static validateFileUploadOptions(fileUpload) {
    try {
      if (fileUpload == null || typeof fileUpload !== 'object' || fileUpload instanceof Array) {
        throw 'fileUpload must be an object value.';
      }
    } catch (e) {
      if (e instanceof ReferenceError) {
        return;
      }

      throw e;
    }

    if (fileUpload.enableForAnonymousUser === undefined) {
      fileUpload.enableForAnonymousUser = _Definitions.FileUploadOptions.enableForAnonymousUser.default;
    } else if (typeof fileUpload.enableForAnonymousUser !== 'boolean') {
      throw 'fileUpload.enableForAnonymousUser must be a boolean value.';
    }

    if (fileUpload.enableForPublic === undefined) {
      fileUpload.enableForPublic = _Definitions.FileUploadOptions.enableForPublic.default;
    } else if (typeof fileUpload.enableForPublic !== 'boolean') {
      throw 'fileUpload.enableForPublic must be a boolean value.';
    }

    if (fileUpload.enableForAuthenticatedUser === undefined) {
      fileUpload.enableForAuthenticatedUser = _Definitions.FileUploadOptions.enableForAuthenticatedUser.default;
    } else if (typeof fileUpload.enableForAuthenticatedUser !== 'boolean') {
      throw 'fileUpload.enableForAuthenticatedUser must be a boolean value.';
    }
  }

  static validateMasterKeyIps(masterKeyIps) {
    for (const ip of masterKeyIps) {
      if (!_net.default.isIP(ip)) {
        throw `Invalid ip in masterKeyIps: ${ip}`;
      }
    }
  }

  get mount() {
    var mount = this._mount;

    if (this.publicServerURL) {
      mount = this.publicServerURL;
    }

    return mount;
  }

  set mount(newValue) {
    this._mount = newValue;
  }

  static validateSessionConfiguration(sessionLength, expireInactiveSessions) {
    if (expireInactiveSessions) {
      if (isNaN(sessionLength)) {
        throw 'Session length must be a valid number.';
      } else if (sessionLength <= 0) {
        throw 'Session length must be a value greater than 0.';
      }
    }
  }

  static validateDefaultLimit(defaultLimit) {
    if (defaultLimit == null) {
      defaultLimit = _Definitions.ParseServerOptions.defaultLimit.default;
    }

    if (typeof defaultLimit !== 'number') {
      throw 'Default limit must be a number.';
    }

    if (defaultLimit <= 0) {
      throw 'Default limit must be a value greater than 0.';
    }
  }

  static validateMaxLimit(maxLimit) {
    if (maxLimit <= 0) {
      throw 'Max limit must be a value greater than 0.';
    }
  }

  static validateAllowHeaders(allowHeaders) {
    if (![null, undefined].includes(allowHeaders)) {
      if (Array.isArray(allowHeaders)) {
        allowHeaders.forEach(header => {
          if (typeof header !== 'string') {
            throw 'Allow headers must only contain strings';
          } else if (!header.trim().length) {
            throw 'Allow headers must not contain empty strings';
          }
        });
      } else {
        throw 'Allow headers must be an array';
      }
    }
  }

  generateEmailVerifyTokenExpiresAt() {
    if (!this.verifyUserEmails || !this.emailVerifyTokenValidityDuration) {
      return undefined;
    }

    var now = new Date();
    return new Date(now.getTime() + this.emailVerifyTokenValidityDuration * 1000);
  }

  generatePasswordResetTokenExpiresAt() {
    if (!this.passwordPolicy || !this.passwordPolicy.resetTokenValidityDuration) {
      return undefined;
    }

    const now = new Date();
    return new Date(now.getTime() + this.passwordPolicy.resetTokenValidityDuration * 1000);
  }

  generateSessionExpiresAt() {
    if (!this.expireInactiveSessions) {
      return undefined;
    }

    var now = new Date();
    return new Date(now.getTime() + this.sessionLength * 1000);
  }

  get invalidLinkURL() {
    return this.customPages.invalidLink || `${this.publicServerURL}/apps/invalid_link.html`;
  }

  get invalidVerificationLinkURL() {
    return this.customPages.invalidVerificationLink || `${this.publicServerURL}/apps/invalid_verification_link.html`;
  }

  get linkSendSuccessURL() {
    return this.customPages.linkSendSuccess || `${this.publicServerURL}/apps/link_send_success.html`;
  }

  get linkSendFailURL() {
    return this.customPages.linkSendFail || `${this.publicServerURL}/apps/link_send_fail.html`;
  }

  get verifyEmailSuccessURL() {
    return this.customPages.verifyEmailSuccess || `${this.publicServerURL}/apps/verify_email_success.html`;
  }

  get choosePasswordURL() {
    return this.customPages.choosePassword || `${this.publicServerURL}/apps/choose_password`;
  }

  get requestResetPasswordURL() {
    return `${this.publicServerURL}/${this.pagesEndpoint}/${this.applicationId}/request_password_reset`;
  }

  get passwordResetSuccessURL() {
    return this.customPages.passwordResetSuccess || `${this.publicServerURL}/apps/password_reset_success.html`;
  }

  get parseFrameURL() {
    return this.customPages.parseFrameURL;
  }

  get verifyEmailURL() {
    return `${this.publicServerURL}/${this.pagesEndpoint}/${this.applicationId}/verify_email`;
  } // TODO: Remove this function once PagesRouter replaces the PublicAPIRouter;
  // the (default) endpoint has to be defined in PagesRouter only.


  get pagesEndpoint() {
    return this.pages && this.pages.enableRouter && this.pages.pagesEndpoint ? this.pages.pagesEndpoint : 'apps';
  }

}

exports.Config = Config;
var _default = Config;
exports.default = _default;
module.exports = Config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWcuanMiXSwibmFtZXMiOlsicmVtb3ZlVHJhaWxpbmdTbGFzaCIsInN0ciIsImVuZHNXaXRoIiwic3Vic3RyIiwibGVuZ3RoIiwiQ29uZmlnIiwiZ2V0IiwiYXBwbGljYXRpb25JZCIsIm1vdW50IiwiY2FjaGVJbmZvIiwiQXBwQ2FjaGUiLCJjb25maWciLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImRhdGFiYXNlIiwiRGF0YWJhc2VDb250cm9sbGVyIiwiZGF0YWJhc2VDb250cm9sbGVyIiwiYWRhcHRlciIsImdlbmVyYXRlU2Vzc2lvbkV4cGlyZXNBdCIsImJpbmQiLCJnZW5lcmF0ZUVtYWlsVmVyaWZ5VG9rZW5FeHBpcmVzQXQiLCJwdXQiLCJzZXJ2ZXJDb25maWd1cmF0aW9uIiwidmFsaWRhdGUiLCJhcHBJZCIsInNldHVwUGFzc3dvcmRWYWxpZGF0b3IiLCJwYXNzd29yZFBvbGljeSIsInZlcmlmeVVzZXJFbWFpbHMiLCJ1c2VyQ29udHJvbGxlciIsImFwcE5hbWUiLCJwdWJsaWNTZXJ2ZXJVUkwiLCJyZXZva2VTZXNzaW9uT25QYXNzd29yZFJlc2V0IiwiZXhwaXJlSW5hY3RpdmVTZXNzaW9ucyIsInNlc3Npb25MZW5ndGgiLCJkZWZhdWx0TGltaXQiLCJtYXhMaW1pdCIsImVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uIiwiYWNjb3VudExvY2tvdXQiLCJtYXN0ZXJLZXlJcHMiLCJtYXN0ZXJLZXkiLCJyZWFkT25seU1hc3RlcktleSIsImFsbG93SGVhZGVycyIsImlkZW1wb3RlbmN5T3B0aW9ucyIsImVtYWlsVmVyaWZ5VG9rZW5SZXVzZUlmVmFsaWQiLCJmaWxlVXBsb2FkIiwicGFnZXMiLCJzZWN1cml0eSIsImVuZm9yY2VQcml2YXRlVXNlcnMiLCJzY2hlbWEiLCJyZXF1ZXN0S2V5d29yZERlbnlsaXN0IiwiRXJyb3IiLCJlbWFpbEFkYXB0ZXIiLCJ2YWxpZGF0ZUVtYWlsQ29uZmlndXJhdGlvbiIsInZhbGlkYXRlQWNjb3VudExvY2tvdXRQb2xpY3kiLCJ2YWxpZGF0ZVBhc3N3b3JkUG9saWN5IiwidmFsaWRhdGVGaWxlVXBsb2FkT3B0aW9ucyIsInN0YXJ0c1dpdGgiLCJ2YWxpZGF0ZVNlc3Npb25Db25maWd1cmF0aW9uIiwidmFsaWRhdGVNYXN0ZXJLZXlJcHMiLCJ2YWxpZGF0ZURlZmF1bHRMaW1pdCIsInZhbGlkYXRlTWF4TGltaXQiLCJ2YWxpZGF0ZUFsbG93SGVhZGVycyIsInZhbGlkYXRlSWRlbXBvdGVuY3lPcHRpb25zIiwidmFsaWRhdGVQYWdlc09wdGlvbnMiLCJ2YWxpZGF0ZVNlY3VyaXR5T3B0aW9ucyIsInZhbGlkYXRlU2NoZW1hT3B0aW9ucyIsInZhbGlkYXRlRW5mb3JjZVByaXZhdGVVc2VycyIsInZhbGlkYXRlUmVxdWVzdEtleXdvcmREZW55bGlzdCIsInVuZGVmaW5lZCIsImRlZmF1bHQiLCJBcnJheSIsImlzQXJyYXkiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJlbmFibGVDaGVjayIsIlNlY3VyaXR5T3B0aW9ucyIsImVuYWJsZUNoZWNrTG9nIiwiZGVmaW5pdGlvbnMiLCJTY2hlbWFPcHRpb25zIiwic3RyaWN0IiwiZGVsZXRlRXh0cmFGaWVsZHMiLCJyZWNyZWF0ZU1vZGlmaWVkRmllbGRzIiwibG9ja1NjaGVtYXMiLCJiZWZvcmVNaWdyYXRpb24iLCJhZnRlck1pZ3JhdGlvbiIsImVuYWJsZVJvdXRlciIsIlBhZ2VzT3B0aW9ucyIsImVuYWJsZUxvY2FsaXphdGlvbiIsImxvY2FsaXphdGlvbkpzb25QYXRoIiwibG9jYWxpemF0aW9uRmFsbGJhY2tMb2NhbGUiLCJwbGFjZWhvbGRlcnMiLCJmb3JjZVJlZGlyZWN0IiwicGFnZXNQYXRoIiwicGFnZXNFbmRwb2ludCIsImN1c3RvbVVybHMiLCJjdXN0b21Sb3V0ZXMiLCJ0dGwiLCJJZGVtcG90ZW5jeU9wdGlvbnMiLCJpc05hTiIsInBhdGhzIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJ0aHJlc2hvbGQiLCJ1bmxvY2tPblBhc3N3b3JkUmVzZXQiLCJBY2NvdW50TG9ja291dE9wdGlvbnMiLCJtYXhQYXNzd29yZEFnZSIsInJlc2V0VG9rZW5WYWxpZGl0eUR1cmF0aW9uIiwidmFsaWRhdG9yUGF0dGVybiIsIlJlZ0V4cCIsInZhbGlkYXRvckNhbGxiYWNrIiwiZG9Ob3RBbGxvd1VzZXJuYW1lIiwibWF4UGFzc3dvcmRIaXN0b3J5IiwicmVzZXRUb2tlblJldXNlSWZWYWxpZCIsInBhdHRlcm5WYWxpZGF0b3IiLCJ2YWx1ZSIsInRlc3QiLCJlIiwiUmVmZXJlbmNlRXJyb3IiLCJlbmFibGVGb3JBbm9ueW1vdXNVc2VyIiwiRmlsZVVwbG9hZE9wdGlvbnMiLCJlbmFibGVGb3JQdWJsaWMiLCJlbmFibGVGb3JBdXRoZW50aWNhdGVkVXNlciIsImlwIiwibmV0IiwiaXNJUCIsIl9tb3VudCIsIm5ld1ZhbHVlIiwiUGFyc2VTZXJ2ZXJPcHRpb25zIiwiaW5jbHVkZXMiLCJoZWFkZXIiLCJ0cmltIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJnZW5lcmF0ZVBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyZXNBdCIsImludmFsaWRMaW5rVVJMIiwiY3VzdG9tUGFnZXMiLCJpbnZhbGlkTGluayIsImludmFsaWRWZXJpZmljYXRpb25MaW5rVVJMIiwiaW52YWxpZFZlcmlmaWNhdGlvbkxpbmsiLCJsaW5rU2VuZFN1Y2Nlc3NVUkwiLCJsaW5rU2VuZFN1Y2Nlc3MiLCJsaW5rU2VuZEZhaWxVUkwiLCJsaW5rU2VuZEZhaWwiLCJ2ZXJpZnlFbWFpbFN1Y2Nlc3NVUkwiLCJ2ZXJpZnlFbWFpbFN1Y2Nlc3MiLCJjaG9vc2VQYXNzd29yZFVSTCIsImNob29zZVBhc3N3b3JkIiwicmVxdWVzdFJlc2V0UGFzc3dvcmRVUkwiLCJwYXNzd29yZFJlc2V0U3VjY2Vzc1VSTCIsInBhc3N3b3JkUmVzZXRTdWNjZXNzIiwicGFyc2VGcmFtZVVSTCIsInZlcmlmeUVtYWlsVVJMIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJt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Z0UsYUFBYyxJQUFHLEtBQUt6RixhQUFjLHlCQUEzRTtBQUNEOztBQUUwQixNQUF2QmtKLHVCQUF1QixHQUFHO0FBQzVCLFdBQ0UsS0FBS2IsV0FBTCxDQUFpQmMsb0JBQWpCLElBQ0MsR0FBRSxLQUFLMUgsZUFBZ0IsbUNBRjFCO0FBSUQ7O0FBRWdCLE1BQWIySCxhQUFhLEdBQUc7QUFDbEIsV0FBTyxLQUFLZixXQUFMLENBQWlCZSxhQUF4QjtBQUNEOztBQUVpQixNQUFkQyxjQUFjLEdBQUc7QUFDbkIsV0FBUSxHQUFFLEtBQUs1SCxlQUFnQixJQUFHLEtBQUtnRSxhQUFjLElBQUcsS0FBS3pGLGFBQWMsZUFBM0U7QUFDRCxHQXpoQmlCLENBMmhCbEI7QUFDQTs7O0FBQ2lCLE1BQWJ5RixhQUFhLEdBQUc7QUFDbEIsV0FBTyxLQUFLakQsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV3lDLFlBQXpCLElBQXlDLEtBQUt6QyxLQUFMLENBQVdpRCxhQUFwRCxHQUNILEtBQUtqRCxLQUFMLENBQVdpRCxhQURSLEdBRUgsTUFGSjtBQUdEOztBQWppQmlCOzs7ZUFvaUJMM0YsTTs7QUFDZndKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpKLE1BQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQSBDb25maWcgb2JqZWN0IHByb3ZpZGVzIGluZm9ybWF0aW9uIGFib3V0IGhvdyBhIHNwZWNpZmljIGFwcCBpc1xuLy8gY29uZmlndXJlZC5cbi8vIG1vdW50IGlzIHRoZSBVUkwgZm9yIHRoZSByb290IG9mIHRoZSBBUEk7IGluY2x1ZGVzIGh0dHAsIGRvbWFpbiwgZXRjLlxuXG5pbXBvcnQgQXBwQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgRGF0YWJhc2VDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcnMvRGF0YWJhc2VDb250cm9sbGVyJztcbmltcG9ydCBuZXQgZnJvbSAnbmV0JztcbmltcG9ydCB7XG4gIElkZW1wb3RlbmN5T3B0aW9ucyxcbiAgRmlsZVVwbG9hZE9wdGlvbnMsXG4gIEFjY291bnRMb2Nrb3V0T3B0aW9ucyxcbiAgUGFnZXNPcHRpb25zLFxuICBTZWN1cml0eU9wdGlvbnMsXG4gIFNjaGVtYU9wdGlvbnMsXG4gIFBhcnNlU2VydmVyT3B0aW9ucyxcbn0gZnJvbSAnLi9PcHRpb25zL0RlZmluaXRpb25zJztcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiByZW1vdmVUcmFpbGluZ1NsYXNoKHN0cikge1xuICBpZiAoIXN0cikge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbiAgaWYgKHN0ci5lbmRzV2l0aCgnLycpKSB7XG4gICAgc3RyID0gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gIHN0YXRpYyBnZXQoYXBwbGljYXRpb25JZDogc3RyaW5nLCBtb3VudDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2FjaGVJbmZvID0gQXBwQ2FjaGUuZ2V0KGFwcGxpY2F0aW9uSWQpO1xuICAgIGlmICghY2FjaGVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICBjb25maWcuYXBwbGljYXRpb25JZCA9IGFwcGxpY2F0aW9uSWQ7XG4gICAgT2JqZWN0LmtleXMoY2FjaGVJbmZvKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09ICdkYXRhYmFzZUNvbnRyb2xsZXInKSB7XG4gICAgICAgIGNvbmZpZy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZUNvbnRyb2xsZXIoY2FjaGVJbmZvLmRhdGFiYXNlQ29udHJvbGxlci5hZGFwdGVyLCBjb25maWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnW2tleV0gPSBjYWNoZUluZm9ba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25maWcubW91bnQgPSByZW1vdmVUcmFpbGluZ1NsYXNoKG1vdW50KTtcbiAgICBjb25maWcuZ2VuZXJhdGVTZXNzaW9uRXhwaXJlc0F0ID0gY29uZmlnLmdlbmVyYXRlU2Vzc2lvbkV4cGlyZXNBdC5iaW5kKGNvbmZpZyk7XG4gICAgY29uZmlnLmdlbmVyYXRlRW1haWxWZXJpZnlUb2tlbkV4cGlyZXNBdCA9IGNvbmZpZy5nZW5lcmF0ZUVtYWlsVmVyaWZ5VG9rZW5FeHBpcmVzQXQuYmluZChcbiAgICAgIGNvbmZpZ1xuICAgICk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHN0YXRpYyBwdXQoc2VydmVyQ29uZmlndXJhdGlvbikge1xuICAgIENvbmZpZy52YWxpZGF0ZShzZXJ2ZXJDb25maWd1cmF0aW9uKTtcbiAgICBBcHBDYWNoZS5wdXQoc2VydmVyQ29uZmlndXJhdGlvbi5hcHBJZCwgc2VydmVyQ29uZmlndXJhdGlvbik7XG4gICAgQ29uZmlnLnNldHVwUGFzc3dvcmRWYWxpZGF0b3Ioc2VydmVyQ29uZmlndXJhdGlvbi5wYXNzd29yZFBvbGljeSk7XG4gICAgcmV0dXJuIHNlcnZlckNvbmZpZ3VyYXRpb247XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGUoe1xuICAgIHZlcmlmeVVzZXJFbWFpbHMsXG4gICAgdXNlckNvbnRyb2xsZXIsXG4gICAgYXBwTmFtZSxcbiAgICBwdWJsaWNTZXJ2ZXJVUkwsXG4gICAgcmV2b2tlU2Vzc2lvbk9uUGFzc3dvcmRSZXNldCxcbiAgICBleHBpcmVJbmFjdGl2ZVNlc3Npb25zLFxuICAgIHNlc3Npb25MZW5ndGgsXG4gICAgZGVmYXVsdExpbWl0LFxuICAgIG1heExpbWl0LFxuICAgIGVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uLFxuICAgIGFjY291bnRMb2Nrb3V0LFxuICAgIHBhc3N3b3JkUG9saWN5LFxuICAgIG1hc3RlcktleUlwcyxcbiAgICBtYXN0ZXJLZXksXG4gICAgcmVhZE9ubHlNYXN0ZXJLZXksXG4gICAgYWxsb3dIZWFkZXJzLFxuICAgIGlkZW1wb3RlbmN5T3B0aW9ucyxcbiAgICBlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkLFxuICAgIGZpbGVVcGxvYWQsXG4gICAgcGFnZXMsXG4gICAgc2VjdXJpdHksXG4gICAgZW5mb3JjZVByaXZhdGVVc2VycyxcbiAgICBzY2hlbWEsXG4gICAgcmVxdWVzdEtleXdvcmREZW55bGlzdCxcbiAgfSkge1xuICAgIGlmIChtYXN0ZXJLZXkgPT09IHJlYWRPbmx5TWFzdGVyS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hc3RlcktleSBhbmQgcmVhZE9ubHlNYXN0ZXJLZXkgc2hvdWxkIGJlIGRpZmZlcmVudCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGVtYWlsQWRhcHRlciA9IHVzZXJDb250cm9sbGVyLmFkYXB0ZXI7XG4gICAgaWYgKHZlcmlmeVVzZXJFbWFpbHMpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVFbWFpbENvbmZpZ3VyYXRpb24oe1xuICAgICAgICBlbWFpbEFkYXB0ZXIsXG4gICAgICAgIGFwcE5hbWUsXG4gICAgICAgIHB1YmxpY1NlcnZlclVSTCxcbiAgICAgICAgZW1haWxWZXJpZnlUb2tlblZhbGlkaXR5RHVyYXRpb24sXG4gICAgICAgIGVtYWlsVmVyaWZ5VG9rZW5SZXVzZUlmVmFsaWQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlQWNjb3VudExvY2tvdXRQb2xpY3koYWNjb3VudExvY2tvdXQpO1xuICAgIHRoaXMudmFsaWRhdGVQYXNzd29yZFBvbGljeShwYXNzd29yZFBvbGljeSk7XG4gICAgdGhpcy52YWxpZGF0ZUZpbGVVcGxvYWRPcHRpb25zKGZpbGVVcGxvYWQpO1xuXG4gICAgaWYgKHR5cGVvZiByZXZva2VTZXNzaW9uT25QYXNzd29yZFJlc2V0ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93ICdyZXZva2VTZXNzaW9uT25QYXNzd29yZFJlc2V0IG11c3QgYmUgYSBib29sZWFuIHZhbHVlJztcbiAgICB9XG5cbiAgICBpZiAocHVibGljU2VydmVyVVJMKSB7XG4gICAgICBpZiAoIXB1YmxpY1NlcnZlclVSTC5zdGFydHNXaXRoKCdodHRwOi8vJykgJiYgIXB1YmxpY1NlcnZlclVSTC5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICAgIHRocm93ICdwdWJsaWNTZXJ2ZXJVUkwgc2hvdWxkIGJlIGEgdmFsaWQgSFRUUFMgVVJMIHN0YXJ0aW5nIHdpdGggaHR0cHM6Ly8nO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZhbGlkYXRlU2Vzc2lvbkNvbmZpZ3VyYXRpb24oc2Vzc2lvbkxlbmd0aCwgZXhwaXJlSW5hY3RpdmVTZXNzaW9ucyk7XG4gICAgdGhpcy52YWxpZGF0ZU1hc3RlcktleUlwcyhtYXN0ZXJLZXlJcHMpO1xuICAgIHRoaXMudmFsaWRhdGVEZWZhdWx0TGltaXQoZGVmYXVsdExpbWl0KTtcbiAgICB0aGlzLnZhbGlkYXRlTWF4TGltaXQobWF4TGltaXQpO1xuICAgIHRoaXMudmFsaWRhdGVBbGxvd0hlYWRlcnMoYWxsb3dIZWFkZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlSWRlbXBvdGVuY3lPcHRpb25zKGlkZW1wb3RlbmN5T3B0aW9ucyk7XG4gICAgdGhpcy52YWxpZGF0ZVBhZ2VzT3B0aW9ucyhwYWdlcyk7XG4gICAgdGhpcy52YWxpZGF0ZVNlY3VyaXR5T3B0aW9ucyhzZWN1cml0eSk7XG4gICAgdGhpcy52YWxpZGF0ZVNjaGVtYU9wdGlvbnMoc2NoZW1hKTtcbiAgICB0aGlzLnZhbGlkYXRlRW5mb3JjZVByaXZhdGVVc2VycyhlbmZvcmNlUHJpdmF0ZVVzZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlUmVxdWVzdEtleXdvcmREZW55bGlzdChyZXF1ZXN0S2V5d29yZERlbnlsaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZVJlcXVlc3RLZXl3b3JkRGVueWxpc3QocmVxdWVzdEtleXdvcmREZW55bGlzdCkge1xuICAgIGlmIChyZXF1ZXN0S2V5d29yZERlbnlsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3RLZXl3b3JkRGVueWxpc3QgPSByZXF1ZXN0S2V5d29yZERlbnlsaXN0LmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShyZXF1ZXN0S2V5d29yZERlbnlsaXN0KSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gcmVxdWVzdEtleXdvcmREZW55bGlzdCBtdXN0IGJlIGFuIGFycmF5Lic7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlRW5mb3JjZVByaXZhdGVVc2VycyhlbmZvcmNlUHJpdmF0ZVVzZXJzKSB7XG4gICAgaWYgKHR5cGVvZiBlbmZvcmNlUHJpdmF0ZVVzZXJzICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIGVuZm9yY2VQcml2YXRlVXNlcnMgbXVzdCBiZSBhIGJvb2xlYW4uJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVTZWN1cml0eU9wdGlvbnMoc2VjdXJpdHkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlY3VyaXR5KSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNlY3VyaXR5IG11c3QgYmUgYW4gb2JqZWN0Lic7XG4gICAgfVxuICAgIGlmIChzZWN1cml0eS5lbmFibGVDaGVjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZWN1cml0eS5lbmFibGVDaGVjayA9IFNlY3VyaXR5T3B0aW9ucy5lbmFibGVDaGVjay5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzQm9vbGVhbihzZWN1cml0eS5lbmFibGVDaGVjaykpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNlY3VyaXR5LmVuYWJsZUNoZWNrIG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICAgIGlmIChzZWN1cml0eS5lbmFibGVDaGVja0xvZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZWN1cml0eS5lbmFibGVDaGVja0xvZyA9IFNlY3VyaXR5T3B0aW9ucy5lbmFibGVDaGVja0xvZy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzQm9vbGVhbihzZWN1cml0eS5lbmFibGVDaGVja0xvZykpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNlY3VyaXR5LmVuYWJsZUNoZWNrTG9nIG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlU2NoZW1hT3B0aW9ucyhzY2hlbWE6IFNjaGVtYU9wdGlvbnMpIHtcbiAgICBpZiAoIXNjaGVtYSkgcmV0dXJuO1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2NoZW1hKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNjaGVtYSBtdXN0IGJlIGFuIG9iamVjdC4nO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hLmRlZmluaXRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5kZWZpbml0aW9ucyA9IFNjaGVtYU9wdGlvbnMuZGVmaW5pdGlvbnMuZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYS5kZWZpbml0aW9ucykpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNjaGVtYS5kZWZpbml0aW9ucyBtdXN0IGJlIGFuIGFycmF5Lic7XG4gICAgfVxuICAgIGlmIChzY2hlbWEuc3RyaWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5zdHJpY3QgPSBTY2hlbWFPcHRpb25zLnN0cmljdC5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzQm9vbGVhbihzY2hlbWEuc3RyaWN0KSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gc2NoZW1hLnN0cmljdCBtdXN0IGJlIGEgYm9vbGVhbi4nO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hLmRlbGV0ZUV4dHJhRmllbGRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5kZWxldGVFeHRyYUZpZWxkcyA9IFNjaGVtYU9wdGlvbnMuZGVsZXRlRXh0cmFGaWVsZHMuZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKCFpc0Jvb2xlYW4oc2NoZW1hLmRlbGV0ZUV4dHJhRmllbGRzKSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gc2NoZW1hLmRlbGV0ZUV4dHJhRmllbGRzIG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICAgIGlmIChzY2hlbWEucmVjcmVhdGVNb2RpZmllZEZpZWxkcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzY2hlbWEucmVjcmVhdGVNb2RpZmllZEZpZWxkcyA9IFNjaGVtYU9wdGlvbnMucmVjcmVhdGVNb2RpZmllZEZpZWxkcy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzQm9vbGVhbihzY2hlbWEucmVjcmVhdGVNb2RpZmllZEZpZWxkcykpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHNjaGVtYS5yZWNyZWF0ZU1vZGlmaWVkRmllbGRzIG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICAgIGlmIChzY2hlbWEubG9ja1NjaGVtYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmxvY2tTY2hlbWFzID0gU2NoZW1hT3B0aW9ucy5sb2NrU2NoZW1hcy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzQm9vbGVhbihzY2hlbWEubG9ja1NjaGVtYXMpKSB7XG4gICAgICB0aHJvdyAnUGFyc2UgU2VydmVyIG9wdGlvbiBzY2hlbWEubG9ja1NjaGVtYXMgbXVzdCBiZSBhIGJvb2xlYW4uJztcbiAgICB9XG4gICAgaWYgKHNjaGVtYS5iZWZvcmVNaWdyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2NoZW1hLmJlZm9yZU1pZ3JhdGlvbiA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChzY2hlbWEuYmVmb3JlTWlncmF0aW9uICE9PSBudWxsICYmIHR5cGVvZiBzY2hlbWEuYmVmb3JlTWlncmF0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyAnUGFyc2UgU2VydmVyIG9wdGlvbiBzY2hlbWEuYmVmb3JlTWlncmF0aW9uIG11c3QgYmUgYSBmdW5jdGlvbi4nO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hLmFmdGVyTWlncmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjaGVtYS5hZnRlck1pZ3JhdGlvbiA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChzY2hlbWEuYWZ0ZXJNaWdyYXRpb24gIT09IG51bGwgJiYgdHlwZW9mIHNjaGVtYS5hZnRlck1pZ3JhdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gc2NoZW1hLmFmdGVyTWlncmF0aW9uIG11c3QgYmUgYSBmdW5jdGlvbi4nO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZVBhZ2VzT3B0aW9ucyhwYWdlcykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFnZXMpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gcGFnZXMgbXVzdCBiZSBhbiBvYmplY3QuJztcbiAgICB9XG4gICAgaWYgKHBhZ2VzLmVuYWJsZVJvdXRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYWdlcy5lbmFibGVSb3V0ZXIgPSBQYWdlc09wdGlvbnMuZW5hYmxlUm91dGVyLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICghaXNCb29sZWFuKHBhZ2VzLmVuYWJsZVJvdXRlcikpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHBhZ2VzLmVuYWJsZVJvdXRlciBtdXN0IGJlIGEgYm9vbGVhbi4nO1xuICAgIH1cbiAgICBpZiAocGFnZXMuZW5hYmxlTG9jYWxpemF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhZ2VzLmVuYWJsZUxvY2FsaXphdGlvbiA9IFBhZ2VzT3B0aW9ucy5lbmFibGVMb2NhbGl6YXRpb24uZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKCFpc0Jvb2xlYW4ocGFnZXMuZW5hYmxlTG9jYWxpemF0aW9uKSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gcGFnZXMuZW5hYmxlTG9jYWxpemF0aW9uIG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICAgIGlmIChwYWdlcy5sb2NhbGl6YXRpb25Kc29uUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYWdlcy5sb2NhbGl6YXRpb25Kc29uUGF0aCA9IFBhZ2VzT3B0aW9ucy5sb2NhbGl6YXRpb25Kc29uUGF0aC5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzU3RyaW5nKHBhZ2VzLmxvY2FsaXphdGlvbkpzb25QYXRoKSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gcGFnZXMubG9jYWxpemF0aW9uSnNvblBhdGggbXVzdCBiZSBhIHN0cmluZy4nO1xuICAgIH1cbiAgICBpZiAocGFnZXMubG9jYWxpemF0aW9uRmFsbGJhY2tMb2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFnZXMubG9jYWxpemF0aW9uRmFsbGJhY2tMb2NhbGUgPSBQYWdlc09wdGlvbnMubG9jYWxpemF0aW9uRmFsbGJhY2tMb2NhbGUuZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKCFpc1N0cmluZyhwYWdlcy5sb2NhbGl6YXRpb25GYWxsYmFja0xvY2FsZSkpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHBhZ2VzLmxvY2FsaXphdGlvbkZhbGxiYWNrTG9jYWxlIG11c3QgYmUgYSBzdHJpbmcuJztcbiAgICB9XG4gICAgaWYgKHBhZ2VzLnBsYWNlaG9sZGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYWdlcy5wbGFjZWhvbGRlcnMgPSBQYWdlc09wdGlvbnMucGxhY2Vob2xkZXJzLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwYWdlcy5wbGFjZWhvbGRlcnMpICE9PSAnW29iamVjdCBPYmplY3RdJyAmJlxuICAgICAgdHlwZW9mIHBhZ2VzLnBsYWNlaG9sZGVycyAhPT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gcGFnZXMucGxhY2Vob2xkZXJzIG11c3QgYmUgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24uJztcbiAgICB9XG4gICAgaWYgKHBhZ2VzLmZvcmNlUmVkaXJlY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFnZXMuZm9yY2VSZWRpcmVjdCA9IFBhZ2VzT3B0aW9ucy5mb3JjZVJlZGlyZWN0LmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICghaXNCb29sZWFuKHBhZ2VzLmZvcmNlUmVkaXJlY3QpKSB7XG4gICAgICB0aHJvdyAnUGFyc2UgU2VydmVyIG9wdGlvbiBwYWdlcy5mb3JjZVJlZGlyZWN0IG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgfVxuICAgIGlmIChwYWdlcy5wYWdlc1BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFnZXMucGFnZXNQYXRoID0gUGFnZXNPcHRpb25zLnBhZ2VzUGF0aC5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzU3RyaW5nKHBhZ2VzLnBhZ2VzUGF0aCkpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHBhZ2VzLnBhZ2VzUGF0aCBtdXN0IGJlIGEgc3RyaW5nLic7XG4gICAgfVxuICAgIGlmIChwYWdlcy5wYWdlc0VuZHBvaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhZ2VzLnBhZ2VzRW5kcG9pbnQgPSBQYWdlc09wdGlvbnMucGFnZXNFbmRwb2ludC5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIWlzU3RyaW5nKHBhZ2VzLnBhZ2VzRW5kcG9pbnQpKSB7XG4gICAgICB0aHJvdyAnUGFyc2UgU2VydmVyIG9wdGlvbiBwYWdlcy5wYWdlc0VuZHBvaW50IG11c3QgYmUgYSBzdHJpbmcuJztcbiAgICB9XG4gICAgaWYgKHBhZ2VzLmN1c3RvbVVybHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFnZXMuY3VzdG9tVXJscyA9IFBhZ2VzT3B0aW9ucy5jdXN0b21VcmxzLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFnZXMuY3VzdG9tVXJscykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICB0aHJvdyAnUGFyc2UgU2VydmVyIG9wdGlvbiBwYWdlcy5jdXN0b21VcmxzIG11c3QgYmUgYW4gb2JqZWN0Lic7XG4gICAgfVxuICAgIGlmIChwYWdlcy5jdXN0b21Sb3V0ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFnZXMuY3VzdG9tUm91dGVzID0gUGFnZXNPcHRpb25zLmN1c3RvbVJvdXRlcy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIShwYWdlcy5jdXN0b21Sb3V0ZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHRocm93ICdQYXJzZSBTZXJ2ZXIgb3B0aW9uIHBhZ2VzLmN1c3RvbVJvdXRlcyBtdXN0IGJlIGFuIGFycmF5Lic7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlSWRlbXBvdGVuY3lPcHRpb25zKGlkZW1wb3RlbmN5T3B0aW9ucykge1xuICAgIGlmICghaWRlbXBvdGVuY3lPcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpZGVtcG90ZW5jeU9wdGlvbnMudHRsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlkZW1wb3RlbmN5T3B0aW9ucy50dGwgPSBJZGVtcG90ZW5jeU9wdGlvbnMudHRsLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICghaXNOYU4oaWRlbXBvdGVuY3lPcHRpb25zLnR0bCkgJiYgaWRlbXBvdGVuY3lPcHRpb25zLnR0bCA8PSAwKSB7XG4gICAgICB0aHJvdyAnaWRlbXBvdGVuY3kgVFRMIHZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAgc2Vjb25kcyc7XG4gICAgfSBlbHNlIGlmIChpc05hTihpZGVtcG90ZW5jeU9wdGlvbnMudHRsKSkge1xuICAgICAgdGhyb3cgJ2lkZW1wb3RlbmN5IFRUTCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCFpZGVtcG90ZW5jeU9wdGlvbnMucGF0aHMpIHtcbiAgICAgIGlkZW1wb3RlbmN5T3B0aW9ucy5wYXRocyA9IElkZW1wb3RlbmN5T3B0aW9ucy5wYXRocy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIShpZGVtcG90ZW5jeU9wdGlvbnMucGF0aHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHRocm93ICdpZGVtcG90ZW5jeSBwYXRocyBtdXN0IGJlIG9mIGFuIGFycmF5IG9mIHN0cmluZ3MnO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZUFjY291bnRMb2Nrb3V0UG9saWN5KGFjY291bnRMb2Nrb3V0KSB7XG4gICAgaWYgKGFjY291bnRMb2Nrb3V0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBhY2NvdW50TG9ja291dC5kdXJhdGlvbiAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgYWNjb3VudExvY2tvdXQuZHVyYXRpb24gPD0gMCB8fFxuICAgICAgICBhY2NvdW50TG9ja291dC5kdXJhdGlvbiA+IDk5OTk5XG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgJ0FjY291bnQgbG9ja291dCBkdXJhdGlvbiBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIDAgYW5kIGxlc3MgdGhhbiAxMDAwMDAnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKGFjY291bnRMb2Nrb3V0LnRocmVzaG9sZCkgfHxcbiAgICAgICAgYWNjb3VudExvY2tvdXQudGhyZXNob2xkIDwgMSB8fFxuICAgICAgICBhY2NvdW50TG9ja291dC50aHJlc2hvbGQgPiA5OTlcbiAgICAgICkge1xuICAgICAgICB0aHJvdyAnQWNjb3VudCBsb2Nrb3V0IHRocmVzaG9sZCBzaG91bGQgYmUgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEwMDAnO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWNjb3VudExvY2tvdXQudW5sb2NrT25QYXNzd29yZFJlc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWNjb3VudExvY2tvdXQudW5sb2NrT25QYXNzd29yZFJlc2V0ID0gQWNjb3VudExvY2tvdXRPcHRpb25zLnVubG9ja09uUGFzc3dvcmRSZXNldC5kZWZhdWx0O1xuICAgICAgfSBlbHNlIGlmICghaXNCb29sZWFuKGFjY291bnRMb2Nrb3V0LnVubG9ja09uUGFzc3dvcmRSZXNldCkpIHtcbiAgICAgICAgdGhyb3cgJ1BhcnNlIFNlcnZlciBvcHRpb24gYWNjb3VudExvY2tvdXQudW5sb2NrT25QYXNzd29yZFJlc2V0IG11c3QgYmUgYSBib29sZWFuLic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlUGFzc3dvcmRQb2xpY3kocGFzc3dvcmRQb2xpY3kpIHtcbiAgICBpZiAocGFzc3dvcmRQb2xpY3kpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcGFzc3dvcmRQb2xpY3kubWF4UGFzc3dvcmRBZ2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAodHlwZW9mIHBhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkQWdlICE9PSAnbnVtYmVyJyB8fCBwYXNzd29yZFBvbGljeS5tYXhQYXNzd29yZEFnZSA8IDApXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgJ3Bhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkQWdlIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBhc3N3b3JkUG9saWN5LnJlc2V0VG9rZW5WYWxpZGl0eUR1cmF0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgKHR5cGVvZiBwYXNzd29yZFBvbGljeS5yZXNldFRva2VuVmFsaWRpdHlEdXJhdGlvbiAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICBwYXNzd29yZFBvbGljeS5yZXNldFRva2VuVmFsaWRpdHlEdXJhdGlvbiA8PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93ICdwYXNzd29yZFBvbGljeS5yZXNldFRva2VuVmFsaWRpdHlEdXJhdGlvbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJztcbiAgICAgIH1cblxuICAgICAgaWYgKHBhc3N3b3JkUG9saWN5LnZhbGlkYXRvclBhdHRlcm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXNzd29yZFBvbGljeS52YWxpZGF0b3JQYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHBhc3N3b3JkUG9saWN5LnZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKHBhc3N3b3JkUG9saWN5LnZhbGlkYXRvclBhdHRlcm4pO1xuICAgICAgICB9IGVsc2UgaWYgKCEocGFzc3dvcmRQb2xpY3kudmFsaWRhdG9yUGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICB0aHJvdyAncGFzc3dvcmRQb2xpY3kudmFsaWRhdG9yUGF0dGVybiBtdXN0IGJlIGEgcmVnZXggc3RyaW5nIG9yIFJlZ0V4cCBvYmplY3QuJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBhc3N3b3JkUG9saWN5LnZhbGlkYXRvckNhbGxiYWNrICYmXG4gICAgICAgIHR5cGVvZiBwYXNzd29yZFBvbGljeS52YWxpZGF0b3JDYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHRocm93ICdwYXNzd29yZFBvbGljeS52YWxpZGF0b3JDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJztcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBwYXNzd29yZFBvbGljeS5kb05vdEFsbG93VXNlcm5hbWUgJiZcbiAgICAgICAgdHlwZW9mIHBhc3N3b3JkUG9saWN5LmRvTm90QWxsb3dVc2VybmFtZSAhPT0gJ2Jvb2xlYW4nXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgJ3Bhc3N3b3JkUG9saWN5LmRvTm90QWxsb3dVc2VybmFtZSBtdXN0IGJlIGEgYm9vbGVhbiB2YWx1ZS4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkSGlzdG9yeSAmJlxuICAgICAgICAoIU51bWJlci5pc0ludGVnZXIocGFzc3dvcmRQb2xpY3kubWF4UGFzc3dvcmRIaXN0b3J5KSB8fFxuICAgICAgICAgIHBhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkSGlzdG9yeSA8PSAwIHx8XG4gICAgICAgICAgcGFzc3dvcmRQb2xpY3kubWF4UGFzc3dvcmRIaXN0b3J5ID4gMjApXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgJ3Bhc3N3b3JkUG9saWN5Lm1heFBhc3N3b3JkSGlzdG9yeSBtdXN0IGJlIGFuIGludGVnZXIgcmFuZ2luZyAwIC0gMjAnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBhc3N3b3JkUG9saWN5LnJlc2V0VG9rZW5SZXVzZUlmVmFsaWQgJiZcbiAgICAgICAgdHlwZW9mIHBhc3N3b3JkUG9saWN5LnJlc2V0VG9rZW5SZXVzZUlmVmFsaWQgIT09ICdib29sZWFuJ1xuICAgICAgKSB7XG4gICAgICAgIHRocm93ICdyZXNldFRva2VuUmV1c2VJZlZhbGlkIG11c3QgYmUgYSBib29sZWFuIHZhbHVlJztcbiAgICAgIH1cbiAgICAgIGlmIChwYXNzd29yZFBvbGljeS5yZXNldFRva2VuUmV1c2VJZlZhbGlkICYmICFwYXNzd29yZFBvbGljeS5yZXNldFRva2VuVmFsaWRpdHlEdXJhdGlvbikge1xuICAgICAgICB0aHJvdyAnWW91IGNhbm5vdCB1c2UgcmVzZXRUb2tlblJldXNlSWZWYWxpZCB3aXRob3V0IHJlc2V0VG9rZW5WYWxpZGl0eUR1cmF0aW9uJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGFzc3dvcmRQb2xpY3kudmFsaWRhdG9yUGF0dGVybiBpcyBjb25maWd1cmVkIHRoZW4gc2V0dXAgYSBjYWxsYmFjayB0byBwcm9jZXNzIHRoZSBwYXR0ZXJuXG4gIHN0YXRpYyBzZXR1cFBhc3N3b3JkVmFsaWRhdG9yKHBhc3N3b3JkUG9saWN5KSB7XG4gICAgaWYgKHBhc3N3b3JkUG9saWN5ICYmIHBhc3N3b3JkUG9saWN5LnZhbGlkYXRvclBhdHRlcm4pIHtcbiAgICAgIHBhc3N3b3JkUG9saWN5LnBhdHRlcm5WYWxpZGF0b3IgPSB2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiBwYXNzd29yZFBvbGljeS52YWxpZGF0b3JQYXR0ZXJuLnRlc3QodmFsdWUpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVFbWFpbENvbmZpZ3VyYXRpb24oe1xuICAgIGVtYWlsQWRhcHRlcixcbiAgICBhcHBOYW1lLFxuICAgIHB1YmxpY1NlcnZlclVSTCxcbiAgICBlbWFpbFZlcmlmeVRva2VuVmFsaWRpdHlEdXJhdGlvbixcbiAgICBlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkLFxuICB9KSB7XG4gICAgaWYgKCFlbWFpbEFkYXB0ZXIpIHtcbiAgICAgIHRocm93ICdBbiBlbWFpbEFkYXB0ZXIgaXMgcmVxdWlyZWQgZm9yIGUtbWFpbCB2ZXJpZmljYXRpb24gYW5kIHBhc3N3b3JkIHJlc2V0cy4nO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFwcE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyAnQW4gYXBwIG5hbWUgaXMgcmVxdWlyZWQgZm9yIGUtbWFpbCB2ZXJpZmljYXRpb24gYW5kIHBhc3N3b3JkIHJlc2V0cy4nO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHB1YmxpY1NlcnZlclVSTCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93ICdBIHB1YmxpYyBzZXJ2ZXIgdXJsIGlzIHJlcXVpcmVkIGZvciBlLW1haWwgdmVyaWZpY2F0aW9uIGFuZCBwYXNzd29yZCByZXNldHMuJztcbiAgICB9XG4gICAgaWYgKGVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uKSB7XG4gICAgICBpZiAoaXNOYU4oZW1haWxWZXJpZnlUb2tlblZhbGlkaXR5RHVyYXRpb24pKSB7XG4gICAgICAgIHRocm93ICdFbWFpbCB2ZXJpZnkgdG9rZW4gdmFsaWRpdHkgZHVyYXRpb24gbXVzdCBiZSBhIHZhbGlkIG51bWJlci4nO1xuICAgICAgfSBlbHNlIGlmIChlbWFpbFZlcmlmeVRva2VuVmFsaWRpdHlEdXJhdGlvbiA8PSAwKSB7XG4gICAgICAgIHRocm93ICdFbWFpbCB2ZXJpZnkgdG9rZW4gdmFsaWRpdHkgZHVyYXRpb24gbXVzdCBiZSBhIHZhbHVlIGdyZWF0ZXIgdGhhbiAwLic7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkICYmIHR5cGVvZiBlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93ICdlbWFpbFZlcmlmeVRva2VuUmV1c2VJZlZhbGlkIG11c3QgYmUgYSBib29sZWFuIHZhbHVlJztcbiAgICB9XG4gICAgaWYgKGVtYWlsVmVyaWZ5VG9rZW5SZXVzZUlmVmFsaWQgJiYgIWVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uKSB7XG4gICAgICB0aHJvdyAnWW91IGNhbm5vdCB1c2UgZW1haWxWZXJpZnlUb2tlblJldXNlSWZWYWxpZCB3aXRob3V0IGVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVGaWxlVXBsb2FkT3B0aW9ucyhmaWxlVXBsb2FkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChmaWxlVXBsb2FkID09IG51bGwgfHwgdHlwZW9mIGZpbGVVcGxvYWQgIT09ICdvYmplY3QnIHx8IGZpbGVVcGxvYWQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB0aHJvdyAnZmlsZVVwbG9hZCBtdXN0IGJlIGFuIG9iamVjdCB2YWx1ZS4nO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gICAgaWYgKGZpbGVVcGxvYWQuZW5hYmxlRm9yQW5vbnltb3VzVXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaWxlVXBsb2FkLmVuYWJsZUZvckFub255bW91c1VzZXIgPSBGaWxlVXBsb2FkT3B0aW9ucy5lbmFibGVGb3JBbm9ueW1vdXNVc2VyLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsZVVwbG9hZC5lbmFibGVGb3JBbm9ueW1vdXNVc2VyICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93ICdmaWxlVXBsb2FkLmVuYWJsZUZvckFub255bW91c1VzZXIgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWUuJztcbiAgICB9XG4gICAgaWYgKGZpbGVVcGxvYWQuZW5hYmxlRm9yUHVibGljID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbGVVcGxvYWQuZW5hYmxlRm9yUHVibGljID0gRmlsZVVwbG9hZE9wdGlvbnMuZW5hYmxlRm9yUHVibGljLmRlZmF1bHQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsZVVwbG9hZC5lbmFibGVGb3JQdWJsaWMgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgJ2ZpbGVVcGxvYWQuZW5hYmxlRm9yUHVibGljIG11c3QgYmUgYSBib29sZWFuIHZhbHVlLic7XG4gICAgfVxuICAgIGlmIChmaWxlVXBsb2FkLmVuYWJsZUZvckF1dGhlbnRpY2F0ZWRVc2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbGVVcGxvYWQuZW5hYmxlRm9yQXV0aGVudGljYXRlZFVzZXIgPSBGaWxlVXBsb2FkT3B0aW9ucy5lbmFibGVGb3JBdXRoZW50aWNhdGVkVXNlci5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbGVVcGxvYWQuZW5hYmxlRm9yQXV0aGVudGljYXRlZFVzZXIgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgJ2ZpbGVVcGxvYWQuZW5hYmxlRm9yQXV0aGVudGljYXRlZFVzZXIgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWUuJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVNYXN0ZXJLZXlJcHMobWFzdGVyS2V5SXBzKSB7XG4gICAgZm9yIChjb25zdCBpcCBvZiBtYXN0ZXJLZXlJcHMpIHtcbiAgICAgIGlmICghbmV0LmlzSVAoaXApKSB7XG4gICAgICAgIHRocm93IGBJbnZhbGlkIGlwIGluIG1hc3RlcktleUlwczogJHtpcH1gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBtb3VudCgpIHtcbiAgICB2YXIgbW91bnQgPSB0aGlzLl9tb3VudDtcbiAgICBpZiAodGhpcy5wdWJsaWNTZXJ2ZXJVUkwpIHtcbiAgICAgIG1vdW50ID0gdGhpcy5wdWJsaWNTZXJ2ZXJVUkw7XG4gICAgfVxuICAgIHJldHVybiBtb3VudDtcbiAgfVxuXG4gIHNldCBtb3VudChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX21vdW50ID0gbmV3VmFsdWU7XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVTZXNzaW9uQ29uZmlndXJhdGlvbihzZXNzaW9uTGVuZ3RoLCBleHBpcmVJbmFjdGl2ZVNlc3Npb25zKSB7XG4gICAgaWYgKGV4cGlyZUluYWN0aXZlU2Vzc2lvbnMpIHtcbiAgICAgIGlmIChpc05hTihzZXNzaW9uTGVuZ3RoKSkge1xuICAgICAgICB0aHJvdyAnU2Vzc2lvbiBsZW5ndGggbXVzdCBiZSBhIHZhbGlkIG51bWJlci4nO1xuICAgICAgfSBlbHNlIGlmIChzZXNzaW9uTGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhyb3cgJ1Nlc3Npb24gbGVuZ3RoIG11c3QgYmUgYSB2YWx1ZSBncmVhdGVyIHRoYW4gMC4nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZURlZmF1bHRMaW1pdChkZWZhdWx0TGltaXQpIHtcbiAgICBpZiAoZGVmYXVsdExpbWl0ID09IG51bGwpIHtcbiAgICAgIGRlZmF1bHRMaW1pdCA9IFBhcnNlU2VydmVyT3B0aW9ucy5kZWZhdWx0TGltaXQuZGVmYXVsdDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0TGltaXQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyAnRGVmYXVsdCBsaW1pdCBtdXN0IGJlIGEgbnVtYmVyLic7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0TGltaXQgPD0gMCkge1xuICAgICAgdGhyb3cgJ0RlZmF1bHQgbGltaXQgbXVzdCBiZSBhIHZhbHVlIGdyZWF0ZXIgdGhhbiAwLic7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlTWF4TGltaXQobWF4TGltaXQpIHtcbiAgICBpZiAobWF4TGltaXQgPD0gMCkge1xuICAgICAgdGhyb3cgJ01heCBsaW1pdCBtdXN0IGJlIGEgdmFsdWUgZ3JlYXRlciB0aGFuIDAuJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVBbGxvd0hlYWRlcnMoYWxsb3dIZWFkZXJzKSB7XG4gICAgaWYgKCFbbnVsbCwgdW5kZWZpbmVkXS5pbmNsdWRlcyhhbGxvd0hlYWRlcnMpKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhbGxvd0hlYWRlcnMpKSB7XG4gICAgICAgIGFsbG93SGVhZGVycy5mb3JFYWNoKGhlYWRlciA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyAnQWxsb3cgaGVhZGVycyBtdXN0IG9ubHkgY29udGFpbiBzdHJpbmdzJztcbiAgICAgICAgICB9IGVsc2UgaWYgKCFoZWFkZXIudHJpbSgpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgJ0FsbG93IGhlYWRlcnMgbXVzdCBub3QgY29udGFpbiBlbXB0eSBzdHJpbmdzJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgJ0FsbG93IGhlYWRlcnMgbXVzdCBiZSBhbiBhcnJheSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVFbWFpbFZlcmlmeVRva2VuRXhwaXJlc0F0KCkge1xuICAgIGlmICghdGhpcy52ZXJpZnlVc2VyRW1haWxzIHx8ICF0aGlzLmVtYWlsVmVyaWZ5VG9rZW5WYWxpZGl0eUR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gbmV3IERhdGUobm93LmdldFRpbWUoKSArIHRoaXMuZW1haWxWZXJpZnlUb2tlblZhbGlkaXR5RHVyYXRpb24gKiAxMDAwKTtcbiAgfVxuXG4gIGdlbmVyYXRlUGFzc3dvcmRSZXNldFRva2VuRXhwaXJlc0F0KCkge1xuICAgIGlmICghdGhpcy5wYXNzd29yZFBvbGljeSB8fCAhdGhpcy5wYXNzd29yZFBvbGljeS5yZXNldFRva2VuVmFsaWRpdHlEdXJhdGlvbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gbmV3IERhdGUobm93LmdldFRpbWUoKSArIHRoaXMucGFzc3dvcmRQb2xpY3kucmVzZXRUb2tlblZhbGlkaXR5RHVyYXRpb24gKiAxMDAwKTtcbiAgfVxuXG4gIGdlbmVyYXRlU2Vzc2lvbkV4cGlyZXNBdCgpIHtcbiAgICBpZiAoIXRoaXMuZXhwaXJlSW5hY3RpdmVTZXNzaW9ucykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgKyB0aGlzLnNlc3Npb25MZW5ndGggKiAxMDAwKTtcbiAgfVxuXG4gIGdldCBpbnZhbGlkTGlua1VSTCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXN0b21QYWdlcy5pbnZhbGlkTGluayB8fCBgJHt0aGlzLnB1YmxpY1NlcnZlclVSTH0vYXBwcy9pbnZhbGlkX2xpbmsuaHRtbGA7XG4gIH1cblxuICBnZXQgaW52YWxpZFZlcmlmaWNhdGlvbkxpbmtVUkwoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY3VzdG9tUGFnZXMuaW52YWxpZFZlcmlmaWNhdGlvbkxpbmsgfHxcbiAgICAgIGAke3RoaXMucHVibGljU2VydmVyVVJMfS9hcHBzL2ludmFsaWRfdmVyaWZpY2F0aW9uX2xpbmsuaHRtbGBcbiAgICApO1xuICB9XG5cbiAgZ2V0IGxpbmtTZW5kU3VjY2Vzc1VSTCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jdXN0b21QYWdlcy5saW5rU2VuZFN1Y2Nlc3MgfHwgYCR7dGhpcy5wdWJsaWNTZXJ2ZXJVUkx9L2FwcHMvbGlua19zZW5kX3N1Y2Nlc3MuaHRtbGBcbiAgICApO1xuICB9XG5cbiAgZ2V0IGxpbmtTZW5kRmFpbFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXN0b21QYWdlcy5saW5rU2VuZEZhaWwgfHwgYCR7dGhpcy5wdWJsaWNTZXJ2ZXJVUkx9L2FwcHMvbGlua19zZW5kX2ZhaWwuaHRtbGA7XG4gIH1cblxuICBnZXQgdmVyaWZ5RW1haWxTdWNjZXNzVVJMKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmN1c3RvbVBhZ2VzLnZlcmlmeUVtYWlsU3VjY2VzcyB8fFxuICAgICAgYCR7dGhpcy5wdWJsaWNTZXJ2ZXJVUkx9L2FwcHMvdmVyaWZ5X2VtYWlsX3N1Y2Nlc3MuaHRtbGBcbiAgICApO1xuICB9XG5cbiAgZ2V0IGNob29zZVBhc3N3b3JkVVJMKCkge1xuICAgIHJldHVybiB0aGlzLmN1c3RvbVBhZ2VzLmNob29zZVBhc3N3b3JkIHx8IGAke3RoaXMucHVibGljU2VydmVyVVJMfS9hcHBzL2Nob29zZV9wYXNzd29yZGA7XG4gIH1cblxuICBnZXQgcmVxdWVzdFJlc2V0UGFzc3dvcmRVUkwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMucHVibGljU2VydmVyVVJMfS8ke3RoaXMucGFnZXNFbmRwb2ludH0vJHt0aGlzLmFwcGxpY2F0aW9uSWR9L3JlcXVlc3RfcGFzc3dvcmRfcmVzZXRgO1xuICB9XG5cbiAgZ2V0IHBhc3N3b3JkUmVzZXRTdWNjZXNzVVJMKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmN1c3RvbVBhZ2VzLnBhc3N3b3JkUmVzZXRTdWNjZXNzIHx8XG4gICAgICBgJHt0aGlzLnB1YmxpY1NlcnZlclVSTH0vYXBwcy9wYXNzd29yZF9yZXNldF9zdWNjZXNzLmh0bWxgXG4gICAgKTtcbiAgfVxuXG4gIGdldCBwYXJzZUZyYW1lVVJMKCkge1xuICAgIHJldHVybiB0aGlzLmN1c3RvbVBhZ2VzLnBhcnNlRnJhbWVVUkw7XG4gIH1cblxuICBnZXQgdmVyaWZ5RW1haWxVUkwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMucHVibGljU2VydmVyVVJMfS8ke3RoaXMucGFnZXNFbmRwb2ludH0vJHt0aGlzLmFwcGxpY2F0aW9uSWR9L3ZlcmlmeV9lbWFpbGA7XG4gIH1cblxuICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBmdW5jdGlvbiBvbmNlIFBhZ2VzUm91dGVyIHJlcGxhY2VzIHRoZSBQdWJsaWNBUElSb3V0ZXI7XG4gIC8vIHRoZSAoZGVmYXVsdCkgZW5kcG9pbnQgaGFzIHRvIGJlIGRlZmluZWQgaW4gUGFnZXNSb3V0ZXIgb25seS5cbiAgZ2V0IHBhZ2VzRW5kcG9pbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgJiYgdGhpcy5wYWdlcy5lbmFibGVSb3V0ZXIgJiYgdGhpcy5wYWdlcy5wYWdlc0VuZHBvaW50XG4gICAgICA/IHRoaXMucGFnZXMucGFnZXNFbmRwb2ludFxuICAgICAgOiAnYXBwcyc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xubW9kdWxlLmV4cG9ydHMgPSBDb25maWc7XG4iXX0=