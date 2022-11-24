var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPushStatus = getPushStatus;
exports.send = send;

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

function send(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (data.where && data.where instanceof _ParseQuery.default) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && typeof data.push_time === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && typeof data.expiration_time === 'object') {
    data.expiration_time = data.expiration_time.toJSON();
  }

  if (data.expiration_time && data.expiration_interval) {
    throw new Error('expiration_time and expiration_interval cannot both be set.');
  }

  var pushOptions = {
    useMasterKey: true
  };

  if (options.hasOwnProperty('useMasterKey')) {
    pushOptions.useMasterKey = options.useMasterKey;
  }

  return _CoreManager.default.getPushController().send(data, pushOptions);
}

function getPushStatus(pushStatusId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var pushOptions = {
    useMasterKey: true
  };

  if (options.hasOwnProperty('useMasterKey')) {
    pushOptions.useMasterKey = options.useMasterKey;
  }

  var query = new _ParseQuery.default('_PushStatus');
  return query.get(pushStatusId, pushOptions);
}

var DefaultController = {
  send: function (data, options) {
    return _CoreManager.default.getRESTController().request('POST', 'push', data, options);
  }
};

_CoreManager.default.setPushController(DefaultController);