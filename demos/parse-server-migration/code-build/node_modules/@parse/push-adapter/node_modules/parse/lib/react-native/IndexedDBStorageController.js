var _idbKeyval = require("idb-keyval");

try {
  var ParseStore = (0, _idbKeyval.createStore)('parseDB', 'parseStore');
  var IndexedDBStorageController = {
    async: 1,
    getItemAsync: function (path) {
      return (0, _idbKeyval.get)(path, ParseStore);
    },
    setItemAsync: function (path, value) {
      return (0, _idbKeyval.set)(path, value, ParseStore);
    },
    removeItemAsync: function (path) {
      return (0, _idbKeyval.del)(path, ParseStore);
    },
    getAllKeysAsync: function () {
      return (0, _idbKeyval.keys)(ParseStore);
    },
    clear: function () {
      return (0, _idbKeyval.clear)(ParseStore);
    }
  };
  module.exports = IndexedDBStorageController;
} catch (e) {}