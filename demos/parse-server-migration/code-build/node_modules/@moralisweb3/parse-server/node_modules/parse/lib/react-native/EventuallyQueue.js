var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseObject = _interopRequireDefault(require("./ParseObject"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

var _Storage = _interopRequireDefault(require("./Storage"));

var QUEUE_KEY = 'Parse/Eventually/Queue';
var queueCache = [];
var dirtyCache = true;
var polling = undefined;
var EventuallyQueue = {
  save: function (object) {
    var serverOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('save', object, serverOptions);
  },
  destroy: function (object) {
    var serverOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('destroy', object, serverOptions);
  },
  generateQueueId: function (action, object) {
    object._getId();

    var className = object.className,
        id = object.id,
        _localId = object._localId;

    var uniqueId = object.get('hash') || _localId;

    return [action, className, id, uniqueId].join('_');
  },
  enqueue: function (action, object, serverOptions) {
    var queueData, queueId, index, prop;
    return _regenerator.default.async(function (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _regenerator.default.awrap(this.getQueue());

          case 2:
            queueData = _context.sent;
            queueId = this.generateQueueId(action, object);
            index = this.queueItemExists(queueData, queueId);

            if (index > -1) {
              for (prop in queueData[index].object) {
                if (typeof object.get(prop) === 'undefined') {
                  object.set(prop, queueData[index].object[prop]);
                }
              }
            } else {
              index = queueData.length;
            }

            queueData[index] = {
              queueId: queueId,
              action: action,
              object: object.toJSON(),
              serverOptions: serverOptions,
              id: object.id,
              className: object.className,
              hash: object.get('hash'),
              createdAt: new Date()
            };
            return _context.abrupt("return", this.setQueue(queueData));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, null, Promise);
  },
  store: function (data) {
    return _Storage.default.setItemAsync(QUEUE_KEY, JSON.stringify(data));
  },
  load: function () {
    return _Storage.default.getItemAsync(QUEUE_KEY);
  },
  getQueue: function () {
    return _regenerator.default.async(function (_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!dirtyCache) {
              _context2.next = 10;
              break;
            }

            _context2.t0 = JSON;
            _context2.next = 4;
            return _regenerator.default.awrap(this.load());

          case 4:
            _context2.t1 = _context2.sent;

            if (_context2.t1) {
              _context2.next = 7;
              break;
            }

            _context2.t1 = '[]';

          case 7:
            _context2.t2 = _context2.t1;
            queueCache = _context2.t0.parse.call(_context2.t0, _context2.t2);
            dirtyCache = false;

          case 10:
            return _context2.abrupt("return", queueCache);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this, null, Promise);
  },
  setQueue: function (queue) {
    queueCache = queue;
    return this.store(queueCache);
  },
  remove: function (queueId) {
    var queueData, index;
    return _regenerator.default.async(function (_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _regenerator.default.awrap(this.getQueue());

          case 2:
            queueData = _context3.sent;
            index = this.queueItemExists(queueData, queueId);

            if (!(index > -1)) {
              _context3.next = 8;
              break;
            }

            queueData.splice(index, 1);
            _context3.next = 8;
            return _regenerator.default.awrap(this.setQueue(queueData));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this, null, Promise);
  },
  clear: function () {
    queueCache = [];
    return this.store([]);
  },
  queueItemExists: function (queue, queueId) {
    return queue.findIndex(function (data) {
      return data.queueId === queueId;
    });
  },
  length: function () {
    var queueData;
    return _regenerator.default.async(function (_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _regenerator.default.awrap(this.getQueue());

          case 2:
            queueData = _context4.sent;
            return _context4.abrupt("return", queueData.length);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this, null, Promise);
  },
  sendQueue: function () {
    var queue, queueData, i, queueObject, id, hash, className, ObjectType;
    return _regenerator.default.async(function (_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _regenerator.default.awrap(this.getQueue());

          case 2:
            queue = _context5.sent;
            queueData = (0, _toConsumableArray2.default)(queue);

            if (!(queueData.length === 0)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", false);

          case 6:
            i = 0;

          case 7:
            if (!(i < queueData.length)) {
              _context5.next = 26;
              break;
            }

            queueObject = queueData[i];
            id = queueObject.id, hash = queueObject.hash, className = queueObject.className;
            ObjectType = _ParseObject.default.extend(className);

            if (!id) {
              _context5.next = 16;
              break;
            }

            _context5.next = 14;
            return _regenerator.default.awrap(this.process.byId(ObjectType, queueObject));

          case 14:
            _context5.next = 23;
            break;

          case 16:
            if (!hash) {
              _context5.next = 21;
              break;
            }

            _context5.next = 19;
            return _regenerator.default.awrap(this.process.byHash(ObjectType, queueObject));

          case 19:
            _context5.next = 23;
            break;

          case 21:
            _context5.next = 23;
            return _regenerator.default.awrap(this.process.create(ObjectType, queueObject));

          case 23:
            i += 1;
            _context5.next = 7;
            break;

          case 26:
            return _context5.abrupt("return", true);

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this, null, Promise);
  },
  sendQueueCallback: function (object, queueObject) {
    return _regenerator.default.async(function (_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (object) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", this.remove(queueObject.queueId));

          case 2:
            _context6.t0 = queueObject.action;
            _context6.next = _context6.t0 === 'save' ? 5 : _context6.t0 === 'destroy' ? 20 : 33;
            break;

          case 5:
            if (!(typeof object.updatedAt !== 'undefined' && object.updatedAt > new Date(queueObject.object.createdAt))) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", this.remove(queueObject.queueId));

          case 7:
            _context6.prev = 7;
            _context6.next = 10;
            return _regenerator.default.awrap(object.save(queueObject.object, queueObject.serverOptions));

          case 10:
            _context6.next = 12;
            return _regenerator.default.awrap(this.remove(queueObject.queueId));

          case 12:
            _context6.next = 19;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t1 = _context6["catch"](7);

            if (!(_context6.t1.message !== 'XMLHttpRequest failed: "Unable to connect to the Parse API"')) {
              _context6.next = 19;
              break;
            }

            _context6.next = 19;
            return _regenerator.default.awrap(this.remove(queueObject.queueId));

          case 19:
            return _context6.abrupt("break", 33);

          case 20:
            _context6.prev = 20;
            _context6.next = 23;
            return _regenerator.default.awrap(object.destroy(queueObject.serverOptions));

          case 23:
            _context6.next = 25;
            return _regenerator.default.awrap(this.remove(queueObject.queueId));

          case 25:
            _context6.next = 32;
            break;

          case 27:
            _context6.prev = 27;
            _context6.t2 = _context6["catch"](20);

            if (!(_context6.t2.message !== 'XMLHttpRequest failed: "Unable to connect to the Parse API"')) {
              _context6.next = 32;
              break;
            }

            _context6.next = 32;
            return _regenerator.default.awrap(this.remove(queueObject.queueId));

          case 32:
            return _context6.abrupt("break", 33);

          case 33:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this, [[7, 14], [20, 27]], Promise);
  },
  poll: function () {
    var _this = this;

    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    if (polling) {
      return;
    }

    polling = setInterval(function () {
      var RESTController = _CoreManager.default.getRESTController();

      RESTController.request('GET', 'health').then(function (_ref) {
        var status = _ref.status;

        if (status === 'ok') {
          _this.stopPoll();

          return _this.sendQueue();
        }
      }).catch(function (e) {
        return e;
      });
    }, ms);
  },
  stopPoll: function () {
    clearInterval(polling);
    polling = undefined;
  },
  isPolling: function () {
    return !!polling;
  },
  _setPolling: function (flag) {
    polling = flag;
  },
  process: {
    create: function (ObjectType, queueObject) {
      var object = new ObjectType();
      return EventuallyQueue.sendQueueCallback(object, queueObject);
    },
    byId: function (ObjectType, queueObject) {
      var sessionToken, query, results;
      return _regenerator.default.async(function (_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              sessionToken = queueObject.serverOptions.sessionToken;
              query = new _ParseQuery.default(ObjectType);
              query.equalTo('objectId', queueObject.id);
              _context7.next = 5;
              return _regenerator.default.awrap(query.find({
                sessionToken: sessionToken
              }));

            case 5:
              results = _context7.sent;
              return _context7.abrupt("return", EventuallyQueue.sendQueueCallback(results[0], queueObject));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, null, Promise);
    },
    byHash: function (ObjectType, queueObject) {
      var sessionToken, query, results;
      return _regenerator.default.async(function (_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              sessionToken = queueObject.serverOptions.sessionToken;
              query = new _ParseQuery.default(ObjectType);
              query.equalTo('hash', queueObject.hash);
              _context8.next = 5;
              return _regenerator.default.awrap(query.find({
                sessionToken: sessionToken
              }));

            case 5:
              results = _context8.sent;

              if (!(results.length > 0)) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", EventuallyQueue.sendQueueCallback(results[0], queueObject));

            case 8:
              return _context8.abrupt("return", EventuallyQueue.process.create(ObjectType, queueObject));

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, null, Promise);
    }
  }
};
module.exports = EventuallyQueue;