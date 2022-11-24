"use strict";

var _keysInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/keys");

var _idbKeyval = require("idb-keyval");
/**
 * @flow
 */


try {
  var ParseStore = (0, _idbKeyval.createStore)('parseDB', 'parseStore');
  var IndexedDBStorageController = {
    async: 1,
    getItemAsync: function (path
    /*: string*/
    ) {
      return (0, _idbKeyval.get)(path, ParseStore);
    },
    setItemAsync: function (path
    /*: string*/
    , value
    /*: string*/
    ) {
      return (0, _idbKeyval.set)(path, value, ParseStore);
    },
    removeItemAsync: function (path
    /*: string*/
    ) {
      return (0, _idbKeyval.del)(path, ParseStore);
    },
    getAllKeysAsync: function () {
      return (0, _keysInstanceProperty(_idbKeyval))(ParseStore);
    },
    clear: function () {
      return (0, _idbKeyval.clear)(ParseStore);
    }
  };
  module.exports = IndexedDBStorageController;
} catch (e) {// IndexedDB not supported
}