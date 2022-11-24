var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitServerChanges = commitServerChanges;
exports.defaultState = defaultState;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.popPendingState = popPendingState;
exports.pushPendingState = pushPendingState;
exports.setPendingOp = setPendingOp;
exports.setServerData = setServerData;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _encode = _interopRequireDefault(require("./encode"));

var _ParseFile = _interopRequireDefault(require("./ParseFile"));

var _ParseObject = _interopRequireDefault(require("./ParseObject"));

var _ParseRelation = _interopRequireDefault(require("./ParseRelation"));

var _TaskQueue = _interopRequireDefault(require("./TaskQueue"));

var _ParseOp = require("./ParseOp");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function defaultState() {
  return {
    serverData: {},
    pendingOps: [{}],
    objectCache: {},
    tasks: new _TaskQueue.default(),
    existed: false
  };
}

function setServerData(serverData, attributes) {
  for (var _attr in attributes) {
    if (typeof attributes[_attr] !== 'undefined') {
      serverData[_attr] = attributes[_attr];
    } else {
      delete serverData[_attr];
    }
  }
}

function setPendingOp(pendingOps, attr, op) {
  var last = pendingOps.length - 1;

  if (op) {
    pendingOps[last][attr] = op;
  } else {
    delete pendingOps[last][attr];
  }
}

function pushPendingState(pendingOps) {
  pendingOps.push({});
}

function popPendingState(pendingOps) {
  var first = pendingOps.shift();

  if (!pendingOps.length) {
    pendingOps[0] = {};
  }

  return first;
}

function mergeFirstPendingState(pendingOps) {
  var first = popPendingState(pendingOps);
  var next = pendingOps[0];

  for (var _attr2 in first) {
    if (next[_attr2] && first[_attr2]) {
      var merged = next[_attr2].mergeWith(first[_attr2]);

      if (merged) {
        next[_attr2] = merged;
      }
    } else {
      next[_attr2] = first[_attr2];
    }
  }
}

function estimateAttribute(serverData, pendingOps, className, id, attr) {
  var value = serverData[attr];

  for (var i = 0; i < pendingOps.length; i++) {
    if (pendingOps[i][attr]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          value = pendingOps[i][attr].applyTo(value, {
            className: className,
            id: id
          }, attr);
        }
      } else {
        value = pendingOps[i][attr].applyTo(value);
      }
    }
  }

  return value;
}

function estimateAttributes(serverData, pendingOps, className, id) {
  var data = {};

  for (var attr in serverData) {
    data[attr] = serverData[attr];
  }

  for (var i = 0; i < pendingOps.length; i++) {
    for (attr in pendingOps[i]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          data[attr] = pendingOps[i][attr].applyTo(data[attr], {
            className: className,
            id: id
          }, attr);
        }
      } else {
        if (attr.includes('.')) {
          var fields = attr.split('.');
          var first = fields[0];
          var last = fields[fields.length - 1];
          data[first] = _objectSpread({}, serverData[first]);

          var object = _objectSpread({}, data);

          for (var _i = 0; _i < fields.length - 1; _i++) {
            var key = fields[_i];

            if (!(key in object)) {
              object[key] = {};
            }

            object = object[key];
          }

          object[last] = pendingOps[i][attr].applyTo(object[last]);
        } else {
          data[attr] = pendingOps[i][attr].applyTo(data[attr]);
        }
      }
    }
  }

  return data;
}

function nestedSet(obj, key, value) {
  var path = key.split('.');

  for (var i = 0; i < path.length - 1; i++) {
    if (!(path[i] in obj)) obj[path[i]] = {};
    obj = obj[path[i]];
  }

  if (typeof value === 'undefined') {
    delete obj[path[path.length - 1]];
  } else {
    obj[path[path.length - 1]] = value;
  }
}

function commitServerChanges(serverData, objectCache, changes) {
  for (var _attr3 in changes) {
    var val = changes[_attr3];
    nestedSet(serverData, _attr3, val);

    if (val && typeof val === 'object' && !(val instanceof _ParseObject.default) && !(val instanceof _ParseFile.default) && !(val instanceof _ParseRelation.default)) {
      var json = (0, _encode.default)(val, false, true);
      objectCache[_attr3] = JSON.stringify(json);
    }
  }
}