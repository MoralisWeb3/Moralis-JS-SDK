/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import decode from './decode';
import encode from './encode';
import CoreManager from './CoreManager';
import CryptoController from './CryptoController';
import InstallationController from './InstallationController';
import * as ParseOp from './ParseOp';
import RESTController from './RESTController';
import MoralisWeb3 from './MoralisWeb3';

/**
 * Contains all Moralis API classes and functions.
 *
 * @static
 * @global
 * @class
 * @hideconstructor
 */
class Moralis extends MoralisWeb3 {
  /**
   * Call this method to initialize all moralis instances (Moralis, Web3Api, plugins).
   *
   * @param {object} options Your Moralis Application ID and Server URL. Moralis.start({serverUrl,appId})
   * @static
   */
  static async start(options) {
    const { appId, serverUrl, plugins } = options;
    if (!serverUrl) {
      throw new Error(`Moralis.start failed: serverUrl is required`);
    }
    if (!appId) {
      throw new Error(`Moralis.start failed: appId is required`);
    }
    this.initialize(appId);
    this.serverURL = serverUrl;
    this.Web3API.initialize(serverUrl);
    await this.initPlugins(plugins);
  }

  /**
   * Call this method first to set up your authentication tokens for Moralis.
   *
   * @param {string} applicationId Your Moralis Application ID.
   * @param {string} [javaScriptKey] Your Moralis JavaScript Key (Not needed for moralis-server)
   * @param {string} [masterKey] Your Moralis Master Key. (Node.js only!)
   * @static
   */
  static initialize(applicationId: string, javaScriptKey: string) {
    if (
      process.env.PARSE_BUILD === 'browser' &&
      CoreManager.get('IS_NODE') &&
      !process.env.SERVER_RENDERING
    ) {
      /* eslint-disable no-console */
      console.log(
        "It looks like you're using the browser version of the SDK in a " +
          "node.js environment. You should require('parse/node') instead."
      );
      /* eslint-enable no-console */
    }
    Moralis._initialize(applicationId, javaScriptKey);
  }

  static _initialize(applicationId: string, javaScriptKey: string, masterKey: string) {
    CoreManager.set('APPLICATION_ID', applicationId);
    CoreManager.set('JAVASCRIPT_KEY', javaScriptKey);
    CoreManager.set('MASTER_KEY', masterKey);
    CoreManager.set('USE_MASTER_KEY', false);
  }

  /**
   * Call this method to set your AsyncStorage engine
   * Starting Parse@1.11, the ParseSDK do not provide a React AsyncStorage as the ReactNative module
   * is not provided at a stable path and changes over versions.
   *
   * @param {AsyncStorage} storage a react native async storage.
   * @static
   */
  static setAsyncStorage(storage: any) {
    CoreManager.setAsyncStorage(storage);
  }

  /**
   * Call this method to set your LocalDatastoreStorage engine
   * If using React-Native use {@link Moralis.setAsyncStorage Moralis.setAsyncStorage()}
   *
   * @param {LocalDatastoreController} controller a data storage.
   * @static
   */
  static setLocalDatastoreController(controller: any) {
    CoreManager.setLocalDatastoreController(controller);
  }

  /**
   * @member {string} Moralis.applicationId
   * @static
   */
  static set applicationId(value) {
    CoreManager.set('APPLICATION_ID', value);
  }

  static get applicationId() {
    return CoreManager.get('APPLICATION_ID');
  }

  /**
   * @member {string} Moralis.javaScriptKey
   * @static
   */
  static set javaScriptKey(value) {
    CoreManager.set('JAVASCRIPT_KEY', value);
  }
  static get javaScriptKey() {
    return CoreManager.get('JAVASCRIPT_KEY');
  }

  /**
   * @member {string} Moralis.masterKey
   * @static
   */
  static set masterKey(value) {
    CoreManager.set('MASTER_KEY', value);
  }
  static get masterKey() {
    return CoreManager.get('MASTER_KEY');
  }

  /**
   * @member {string} Moralis.serverURL
   * @static
   */
  static set serverURL(value) {
    CoreManager.set('SERVER_URL', value);
  }
  static get serverURL() {
    return CoreManager.get('SERVER_URL');
  }

  /**
   * @member {string} Moralis.serverAuthToken
   * @static
   */
  static set serverAuthToken(value) {
    CoreManager.set('SERVER_AUTH_TOKEN', value);
  }
  static get serverAuthToken() {
    return CoreManager.get('SERVER_AUTH_TOKEN');
  }

  /**
   * @member {string} Moralis.serverAuthType
   * @static
   */
  static set serverAuthType(value) {
    CoreManager.set('SERVER_AUTH_TYPE', value);
  }
  static get serverAuthType() {
    return CoreManager.get('SERVER_AUTH_TYPE');
  }

  /**
   * @member {string} Moralis.liveQueryServerURL
   * @static
   */
  static set liveQueryServerURL(value) {
    CoreManager.set('LIVEQUERY_SERVER_URL', value);
  }
  static get liveQueryServerURL() {
    return CoreManager.get('LIVEQUERY_SERVER_URL');
  }

  /**
   * @member {string} Moralis.encryptedUser
   * @static
   */
  static set encryptedUser(value) {
    CoreManager.set('ENCRYPTED_USER', value);
  }
  static get encryptedUser() {
    return CoreManager.get('ENCRYPTED_USER');
  }

  /**
   * @member {string} Moralis.secret
   * @static
   */
  static set secret(value) {
    CoreManager.set('ENCRYPTED_KEY', value);
  }
  static get secret() {
    return CoreManager.get('ENCRYPTED_KEY');
  }

  /**
   * @member {boolean} Moralis.idempotency
   * @static
   */
  static set idempotency(value) {
    CoreManager.set('IDEMPOTENCY', value);
  }
  static get idempotency() {
    return CoreManager.get('IDEMPOTENCY');
  }
}

Moralis.ACL = require('./ParseACL').default;
Moralis.Analytics = require('./Analytics');
Moralis.AnonymousUtils = require('./AnonymousUtils').default;
Moralis.Cloud = require('./Cloud');
Moralis.CLP = require('./ParseCLP').default;
Moralis.CoreManager = require('./CoreManager');
Moralis.Config = require('./ParseConfig').default;
Moralis.Error = require('./ParseError').default;
Moralis.FacebookUtils = require('./FacebookUtils').default;
Moralis.File = require('./ParseFile').default;
Moralis.GeoPoint = require('./ParseGeoPoint').default;
Moralis.Polygon = require('./ParsePolygon').default;
Moralis.Installation = require('./ParseInstallation').default;
Moralis.LocalDatastore = require('./LocalDatastore');
Moralis.Object = require('./ParseObject').default;
Moralis.Op = {
  Set: ParseOp.SetOp,
  Unset: ParseOp.UnsetOp,
  Increment: ParseOp.IncrementOp,
  Add: ParseOp.AddOp,
  Remove: ParseOp.RemoveOp,
  AddUnique: ParseOp.AddUniqueOp,
  Relation: ParseOp.RelationOp,
};

Moralis.Web3API = require('./MoralisWeb3Api').default;
Moralis.Push = require('./Push');
Moralis.Query = require('./ParseQuery').default;
Moralis.Relation = require('./ParseRelation').default;
Moralis.Role = require('./ParseRole').default;
Moralis.Schema = require('./ParseSchema').default;
Moralis.Session = require('./ParseSession').default;
Moralis.Storage = require('./Storage');
Moralis.User = require('./ParseUser').default;
Moralis.LiveQuery = require('./ParseLiveQuery').default;
Moralis.LiveQueryClient = require('./LiveQueryClient').default;
Moralis.Web3 = Moralis;
Moralis.Units = require('./UnitConvert');
// Moralis.Web3 = require('./MoralisWeb3').default;
Moralis.Elrond = require('./MoralisErd').default;
Moralis.Erd = Moralis.Elrond;
Moralis.Dot = require('./MoralisDot').default;
Moralis.UI = require('./MoralisUI').default;

Moralis._request = function (...args) {
  return CoreManager.getRESTController().request.apply(null, args);
};
Moralis._ajax = function (...args) {
  return CoreManager.getRESTController().ajax.apply(null, args);
};
// We attempt to match the signatures of the legacy versions of these methods
Moralis._decode = function (_, value) {
  return decode(value);
};
Moralis._encode = function (value, _, disallowObjects) {
  return encode(value, disallowObjects);
};
Moralis._getInstallationId = function () {
  return CoreManager.getInstallationController().currentInstallationId();
};
/**
 * Enable pinning in your application.
 * This must be called before your application can use pinning.
 *
 * @static
 */
Moralis.enableLocalDatastore = function () {
  Moralis.LocalDatastore.isEnabled = true;
};
/**
 * Flag that indicates whether Local Datastore is enabled.
 *
 * @static
 * @returns {boolean}
 */
Moralis.isLocalDatastoreEnabled = function () {
  return Moralis.LocalDatastore.isEnabled;
};
/**
 * Gets all contents from Local Datastore
 *
 * <pre>
 * await Moralis.dumpLocalDatastore();
 * </pre>
 *
 * @static
 * @returns {object}
 */
Moralis.dumpLocalDatastore = function () {
  if (!Moralis.LocalDatastore.isEnabled) {
    console.log('Moralis.enableLocalDatastore() must be called first'); // eslint-disable-line no-console
    return Promise.resolve({});
  }
  return Moralis.LocalDatastore._getAllContents();
};

/**
 * Enable the current user encryption.
 * This must be called before login any user.
 *
 * @static
 */
Moralis.enableEncryptedUser = function () {
  Moralis.encryptedUser = true;
};

/**
 * Flag that indicates whether Encrypted User is enabled.
 *
 * @static
 * @returns {boolean}
 */
Moralis.isEncryptedUserEnabled = function () {
  return Moralis.encryptedUser;
};

CoreManager.setCryptoController(CryptoController);
CoreManager.setInstallationController(InstallationController);
CoreManager.setRESTController(RESTController);

if (process.env.PARSE_BUILD === 'node') {
  Moralis.initialize = Moralis._initialize;
  Moralis.Cloud = Moralis.Cloud || {};
  Moralis.Cloud.useMasterKey = function () {
    CoreManager.set('USE_MASTER_KEY', true);
  };
  Moralis.Hooks = require('./ParseHooks');
}

// For legacy requires, of the form `var Moralis = require('moralis').Moralis`
Moralis.Moralis = Moralis;

module.exports = Moralis;
