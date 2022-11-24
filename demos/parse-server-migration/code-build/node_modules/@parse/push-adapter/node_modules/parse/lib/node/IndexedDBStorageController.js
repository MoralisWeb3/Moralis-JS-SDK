"use strict";

var _idbKeyval = require("idb-keyval");
/**
 * @flow
 */


try {
  const ParseStore = (0, _idbKeyval.createStore)('parseDB', 'parseStore');
  module.exports = {
    async: 1,

    getItemAsync(path
    /*: string*/
    ) {
      return (0, _idbKeyval.get)(path, ParseStore);
    },

    setItemAsync(path
    /*: string*/
    , value
    /*: string*/
    ) {
      return (0, _idbKeyval.set)(path, value, ParseStore);
    },

    removeItemAsync(path
    /*: string*/
    ) {
      return (0, _idbKeyval.del)(path, ParseStore);
    },

    getAllKeysAsync() {
      return (0, _idbKeyval.keys)(ParseStore);
    },

    clear() {
      return (0, _idbKeyval.clear)(ParseStore);
    }

  };
} catch (e) {// IndexedDB not supported
}