"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getPushStatus = getPushStatus;
exports.send = send;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Contains functions to deal with Push in Parse.
 *
 * @class Parse.Push
 * @static
 * @hideconstructor
 */

/**
 * Sends a push notification.
 * **Available in Cloud Code only.**
 *
 * See {@link https://docs.parseplatform.org/js/guide/#push-notifications Push Notification Guide}
 *
 * @function send
 * @name Parse.Push.send
 * @param {object} data -  The data of the push notification. Valid fields
 * are:
 *   <ol>
 *     <li>channels - An Array of channels to push to.</li>
 *     <li>push_time - A Date object for when to send the push.</li>
 *     <li>expiration_time -  A Date object for when to expire
 *         the push.</li>
 *     <li>expiration_interval - The seconds from now to expire the push.</li>
 *     <li>where - A Parse.Query over Parse.Installation that is used to match
 *         a set of installations to push to.</li>
 *     <li>data - The data to send as part of the push.</li>
 *   <ol>
 * @param {object} options Valid options
 * are:<ul>
 *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
 *     be used for this request.
 * </ul>
 * @returns {Promise} A promise that is fulfilled when the push request
 *     completes.
 */


function send(data
/*: PushData*/
)
/*: Promise*/
{
  var options
  /*:: ?: FullOptions*/
  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (data.where && data.where instanceof _ParseQuery.default) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && (0, _typeof2.default)(data.push_time) === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && (0, _typeof2.default)(data.expiration_time) === 'object') {
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
/**
 * Gets push status by Id
 *
 * @function getPushStatus
 * @name Parse.Push.getPushStatus
 * @param {string} pushStatusId The Id of Push Status.
 * @param {object} options Valid options
 * are:<ul>
 *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
 *     be used for this request.
 * </ul>
 * @returns {Parse.Object} Status of Push.
 */


function getPushStatus(pushStatusId
/*: string*/
)
/*: Promise<string>*/
{
  var options
  /*:: ?: FullOptions*/
  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  send: function (data
  /*: PushData*/
  , options
  /*:: ?: FullOptions*/
  ) {
    return _CoreManager.default.getRESTController().request('POST', 'push', data, options);
  }
};

_CoreManager.default.setPushController(DefaultController);