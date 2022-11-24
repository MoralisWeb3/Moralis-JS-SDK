"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseObject = _interopRequireDefault(require("./ParseObject"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

var _Storage = _interopRequireDefault(require("./Storage"));
/**
 * https://github.com/francimedia/parse-js-local-storage
 *
 * @flow
 */


var QUEUE_KEY = 'Parse/Eventually/Queue';
var queueCache = [];
var dirtyCache = true;
var polling = undefined;
/**
 * Provides utility functions to queue objects that will be
 * saved to the server at a later date.
 *
 * @class Parse.EventuallyQueue
 * @static
 */

var EventuallyQueue = {
  /**
   * Add object to queue with save operation.
   *
   * @function save
   * @name Parse.EventuallyQueue.save
   * @param {ParseObject} object Parse.Object to be saved eventually
   * @param {object} [serverOptions] See {@link https://parseplatform.org/Parse-SDK-JS/api/master/Parse.Object.html#save Parse.Object.save} options.
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @see Parse.Object#saveEventually
   */
  save: function (object
  /*: ParseObject*/
  )
  /*: Promise*/
  {
    var serverOptions
    /*: SaveOptions*/
    = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('save', object, serverOptions);
  },

  /**
   * Add object to queue with save operation.
   *
   * @function destroy
   * @name Parse.EventuallyQueue.destroy
   * @param {ParseObject} object Parse.Object to be destroyed eventually
   * @param {object} [serverOptions] See {@link https://parseplatform.org/Parse-SDK-JS/api/master/Parse.Object.html#destroy Parse.Object.destroy} options
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @see Parse.Object#destroyEventually
   */
  destroy: function (object
  /*: ParseObject*/
  )
  /*: Promise*/
  {
    var serverOptions
    /*: RequestOptions*/
    = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('destroy', object, serverOptions);
  },

  /**
   * Generate unique identifier to avoid duplicates and maintain previous state.
   *
   * @param {string} action save / destroy
   * @param {object} object Parse.Object to be queued
   * @returns {string}
   * @static
   * @ignore
   */
  generateQueueId: function (action
  /*: string*/
  , object
  /*: ParseObject*/
  )
  /*: string*/
  {
    object._getId();

    var className = object.className,
        id = object.id,
        _localId = object._localId;

    var uniqueId = object.get('hash') || _localId;

    return [action, className, id, uniqueId].join('_');
  },

  /**
   * Build queue object and add to queue.
   *
   * @param {string} action save / destroy
   * @param {object} object Parse.Object to be queued
   * @param {object} [serverOptions]
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @ignore
   */
  enqueue: function (action
  /*: string*/
  , object
  /*: ParseObject*/
  , serverOptions
  /*: SaveOptions | RequestOptions*/
  )
  /*: Promise*/
  {
    var _this = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var queueData, queueId, index, prop;
      return _regenerator.default.wrap(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getQueue();

            case 2:
              queueData = _context.sent;
              queueId = _this.generateQueueId(action, object);
              index = _this.queueItemExists(queueData, queueId);

              if (index > -1) {
                // Add cached values to new object if they don't exist
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
              return _context.abrupt("return", _this.setQueue(queueData));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  store: function (data) {
    return _Storage.default.setItemAsync(QUEUE_KEY, (0, _stringify.default)(data));
  },
  load: function () {
    return _Storage.default.getItemAsync(QUEUE_KEY);
  },

  /**
   * Sets the in-memory queue from local storage and returns.
   *
   * @function getQueue
   * @name Parse.EventuallyQueue.getQueue
   * @returns {Promise<Array>}
   * @static
   */
  getQueue: function ()
  /*: Promise<Array>*/
  {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!dirtyCache) {
                _context2.next = 10;
                break;
              }

              _context2.t0 = JSON;
              _context2.next = 4;
              return _this2.load();

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
      }, _callee2);
    }))();
  },

  /**
   * Saves the queue to local storage
   *
   * @param {Queue} queue Queue containing Parse.Object data.
   * @returns {Promise} A promise that is fulfilled when queue is stored.
   * @static
   * @ignore
   */
  setQueue: function (queue
  /*: Queue*/
  )
  /*: Promise<void>*/
  {
    queueCache = queue;
    return this.store(queueCache);
  },

  /**
   * Removes Parse.Object data from queue.
   *
   * @param {string} queueId Unique identifier for Parse.Object data.
   * @returns {Promise} A promise that is fulfilled when queue is stored.
   * @static
   * @ignore
   */
  remove: function (queueId
  /*: string*/
  )
  /*: Promise<void>*/
  {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var queueData, index;
      return _regenerator.default.wrap(function (_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this3.getQueue();

            case 2:
              queueData = _context3.sent;
              index = _this3.queueItemExists(queueData, queueId);

              if (!(index > -1)) {
                _context3.next = 8;
                break;
              }

              (0, _splice.default)(queueData).call(queueData, index, 1);
              _context3.next = 8;
              return _this3.setQueue(queueData);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * Removes all objects from queue.
   *
   * @function clear
   * @name Parse.EventuallyQueue.clear
   * @returns {Promise} A promise that is fulfilled when queue is cleared.
   * @static
   */
  clear: function ()
  /*: Promise*/
  {
    queueCache = [];
    return this.store([]);
  },

  /**
   * Return the index of a queueId in the queue. Returns -1 if not found.
   *
   * @param {Queue} queue Queue containing Parse.Object data.
   * @param {string} queueId Unique identifier for Parse.Object data.
   * @returns {number}
   * @static
   * @ignore
   */
  queueItemExists: function (queue
  /*: Queue*/
  , queueId
  /*: string*/
  )
  /*: number*/
  {
    return (0, _findIndex.default)(queue).call(queue, function (data) {
      return data.queueId === queueId;
    });
  },

  /**
   * Return the number of objects in the queue.
   *
   * @function length
   * @name Parse.EventuallyQueue.length
   * @returns {number}
   * @static
   */
  length: function ()
  /*: number*/
  {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
      var queueData;
      return _regenerator.default.wrap(function (_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this4.getQueue();

            case 2:
              queueData = _context4.sent;
              return _context4.abrupt("return", queueData.length);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },

  /**
   * Sends the queue to the server.
   *
   * @function sendQueue
   * @name Parse.EventuallyQueue.sendQueue
   * @returns {Promise<boolean>} Returns true if queue was sent successfully.
   * @static
   */
  sendQueue: function ()
  /*: Promise<boolean>*/
  {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
      var queue, queueData, i, queueObject, id, hash, className, ObjectType;
      return _regenerator.default.wrap(function (_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this5.getQueue();

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
              return _this5.process.byId(ObjectType, queueObject);

            case 14:
              _context5.next = 23;
              break;

            case 16:
              if (!hash) {
                _context5.next = 21;
                break;
              }

              _context5.next = 19;
              return _this5.process.byHash(ObjectType, queueObject);

            case 19:
              _context5.next = 23;
              break;

            case 21:
              _context5.next = 23;
              return _this5.process.create(ObjectType, queueObject);

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
      }, _callee5);
    }))();
  },

  /**
   * Build queue object and add to queue.
   *
   * @param {ParseObject} object Parse.Object to be processed
   * @param {QueueObject} queueObject Parse.Object data from the queue
   * @returns {Promise} A promise that is fulfilled when operation is performed.
   * @static
   * @ignore
   */
  sendQueueCallback: function (object
  /*: ParseObject*/
  , queueObject
  /*: QueueObject*/
  )
  /*: Promise<void>*/
  {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
      return _regenerator.default.wrap(function (_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (object) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", _this6.remove(queueObject.queueId));

            case 2:
              _context6.t0 = queueObject.action;
              _context6.next = _context6.t0 === 'save' ? 5 : _context6.t0 === 'destroy' ? 20 : 33;
              break;

            case 5:
              if (!(typeof object.updatedAt !== 'undefined' && object.updatedAt > new Date(queueObject.object.createdAt))) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", _this6.remove(queueObject.queueId));

            case 7:
              _context6.prev = 7;
              _context6.next = 10;
              return object.save(queueObject.object, queueObject.serverOptions);

            case 10:
              _context6.next = 12;
              return _this6.remove(queueObject.queueId);

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
              return _this6.remove(queueObject.queueId);

            case 19:
              return _context6.abrupt("break", 33);

            case 20:
              _context6.prev = 20;
              _context6.next = 23;
              return object.destroy(queueObject.serverOptions);

            case 23:
              _context6.next = 25;
              return _this6.remove(queueObject.queueId);

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
              return _this6.remove(queueObject.queueId);

            case 32:
              return _context6.abrupt("break", 33);

            case 33:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[7, 14], [20, 27]]);
    }))();
  },

  /**
   * Start polling server for network connection.
   * Will send queue if connection is established.
   *
   * @function poll
   * @name Parse.EventuallyQueue.poll
   * @param [ms] Milliseconds to ping the server. Default 2000ms
   * @static
   */
  poll: function () {
    var _this7 = this;

    var ms
    /*: number*/
    = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    if (polling) {
      return;
    }

    polling = (0, _setInterval2.default)(function () {
      var RESTController = _CoreManager.default.getRESTController();

      RESTController.request('GET', 'health').then(function (_ref) {
        var status = _ref.status;

        if (status === 'ok') {
          _this7.stopPoll();

          return _this7.sendQueue();
        }
      }).catch(function (e) {
        return e;
      });
    }, ms);
  },

  /**
   * Turns off polling.
   *
   * @function stopPoll
   * @name Parse.EventuallyQueue.stopPoll
   * @static
   */
  stopPoll: function () {
    clearInterval(polling);
    polling = undefined;
  },

  /**
   * Return true if pinging the server.
   *
   * @function isPolling
   * @name Parse.EventuallyQueue.isPolling
   * @returns {boolean}
   * @static
   */
  isPolling: function ()
  /*: boolean*/
  {
    return !!polling;
  },
  _setPolling: function (flag
  /*: boolean*/
  ) {
    polling = flag;
  },
  process: {
    create: function (ObjectType, queueObject) {
      var object = new ObjectType();
      return EventuallyQueue.sendQueueCallback(object, queueObject);
    },
    byId: function (ObjectType, queueObject) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var sessionToken, query, results;
        return _regenerator.default.wrap(function (_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                sessionToken = queueObject.serverOptions.sessionToken;
                query = new _ParseQuery.default(ObjectType);
                query.equalTo('objectId', queueObject.id);
                _context7.next = 5;
                return (0, _find.default)(query).call(query, {
                  sessionToken: sessionToken
                });

              case 5:
                results = _context7.sent;
                return _context7.abrupt("return", EventuallyQueue.sendQueueCallback(results[0], queueObject));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    byHash: function (ObjectType, queueObject) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var sessionToken, query, results;
        return _regenerator.default.wrap(function (_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                sessionToken = queueObject.serverOptions.sessionToken;
                query = new _ParseQuery.default(ObjectType);
                query.equalTo('hash', queueObject.hash);
                _context8.next = 5;
                return (0, _find.default)(query).call(query, {
                  sessionToken: sessionToken
                });

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
        }, _callee8);
      }))();
    }
  }
};
module.exports = EventuallyQueue;