"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _Object$keys2 = require("@babel/runtime-corejs3/core-js-stable/object/keys");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

function ownKeys(object, enumerableOnly) {
  var keys = _Object$keys2(object);

  if (_Object$getOwnPropertySymbols) {
    var symbols = _Object$getOwnPropertySymbols(object);

    enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) {
      return _Object$getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var _context8, _context9;

    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? _forEachInstanceProperty2(_context8 = ownKeys(Object(source), !0)).call(_context8, function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context9 = ownKeys(Object(source))).call(_context9, function (key) {
      _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

var ParseError = require('./ParseError').default;

var XHR = null;

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

/*:: type Base64 = { base64: string };*/

/*:: type Uri = { uri: string };*/

/*:: type FileData = Array<number> | Base64 | Blob | Uri;*/

/*:: export type FileSource =
  | {
      format: 'file',
      file: Blob,
      type: string,
    }
  | {
      format: 'base64',
      base64: string,
      type: string,
    }
  | {
      format: 'uri',
      uri: string,
      type: string,
    };*/
var base64Regex = new RegExp('([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))', 'i');
var dataUriRegex = new RegExp("^data:([a-zA-Z]+\\/[-a-zA-Z0-9+.]+(;[a-z-]+=[a-zA-Z0-9+.-]+)?)?(;base64)?,(".concat(base64Regex.source, ")*$"), 'i');

function b64Digit(number
/*: number*/
)
/*: string*/
{
  if (number < 26) {
    return String.fromCharCode(65 + number);
  }

  if (number < 52) {
    return String.fromCharCode(97 + (number - 26));
  }

  if (number < 62) {
    return String.fromCharCode(48 + (number - 52));
  }

  if (number === 62) {
    return '+';
  }

  if (number === 63) {
    return '/';
  }

  throw new TypeError('Tried to encode large digit ' + number + ' in base64.');
}
/**
 * A Parse.File is a local representation of a file that is saved to the Parse
 * cloud.
 *
 * @alias Parse.File
 */


var ParseFile = /*#__PURE__*/function () {
  /**
   * @param name {String} The file's name. This will be prefixed by a unique
   *     value once the file has finished saving. The file name must begin with
   *     an alphanumeric character, and consist of alphanumeric characters,
   *     periods, spaces, underscores, or dashes.
   * @param data {Array} The data for the file, as either:
   *     1. an Array of byte value Numbers, or
   *     2. an Object like { base64: "..." } with a base64-encoded String.
   *     3. an Object like { uri: "..." } with a uri String.
   *     4. a File object selected with a file upload control. (3) only works
   *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
   *        For example:
   * <pre>
   * var fileUploadControl = $("#profilePhotoFileUpload")[0];
   * if (fileUploadControl.files.length > 0) {
   *   var file = fileUploadControl.files[0];
   *   var name = "photo.jpg";
   *   var parseFile = new Parse.File(name, file);
   *   parseFile.save().then(function() {
   *     // The file has been saved to Parse.
   *   }, function(error) {
   *     // The file either could not be read, or could not be saved to Parse.
   *   });
   * }</pre>
   * @param type {String} Optional Content-Type header to use for the file. If
   *     this is omitted, the content type will be inferred from the name's
   *     extension.
   * @param metadata {Object} Optional key value pairs to be stored with file object
   * @param tags {Object} Optional key value pairs to be stored with file object
   */
  function ParseFile(name
  /*: string*/
  , data
  /*:: ?: FileData*/
  , type
  /*:: ?: string*/
  , metadata
  /*:: ?: Object*/
  , tags
  /*:: ?: Object*/
  ) {
    (0, _classCallCheck2.default)(this, ParseFile);
    (0, _defineProperty2.default)(this, "_name", void 0);
    (0, _defineProperty2.default)(this, "_url", void 0);
    (0, _defineProperty2.default)(this, "_source", void 0);
    (0, _defineProperty2.default)(this, "_previousSave", void 0);
    (0, _defineProperty2.default)(this, "_data", void 0);
    (0, _defineProperty2.default)(this, "_requestTask", void 0);
    (0, _defineProperty2.default)(this, "_metadata", void 0);
    (0, _defineProperty2.default)(this, "_tags", void 0);
    var specifiedType = type || '';
    this._name = name;
    this._metadata = metadata || {};
    this._tags = tags || {};

    if (data !== undefined) {
      if ((0, _isArray.default)(data)) {
        this._data = ParseFile.encodeBase64(data);
        this._source = {
          format: 'base64',
          base64: this._data,
          type: specifiedType
        };
      } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
        this._source = {
          format: 'file',
          file: data,
          type: specifiedType
        };
      } else if (data && typeof data.uri === 'string' && data.uri !== undefined) {
        this._source = {
          format: 'uri',
          uri: data.uri,
          type: specifiedType
        };
      } else if (data && typeof data.base64 === 'string') {
        var _context, _context2, _context3; // Check if data URI or base64 string is valid


        var validationRegex = new RegExp(base64Regex.source + '|' + dataUriRegex.source, 'i');

        if (!validationRegex.test(data.base64)) {
          throw new Error('Cannot create a Parse.File without valid data URIs or base64 encoded data.');
        }

        var base64 = (0, _slice.default)(_context = data.base64.split(',')).call(_context, -1)[0];

        var _type = specifiedType || (0, _slice.default)(_context2 = (0, _slice.default)(_context3 = data.base64.split(';')).call(_context3, 0, 1)[0].split(':')).call(_context2, 1, 2)[0] || ''; // https://tools.ietf.org/html/rfc2397
        // If <mediatype> is omitted, it defaults to text/plain;charset=US-ASCII.
        // As a shorthand, "text/plain" can be omitted but the charset parameter supplied.


        if (dataUriRegex.test(data.base64)) {
          _type = _type || 'text/plain';
        }

        this._source = {
          format: 'base64',
          base64: base64,
          type: _type
        };
      } else {
        throw new TypeError('Cannot create a Parse.File with that data.');
      }
    }
  }
  /**
   * Return the data for the file, downloading it if not already present.
   * Data is present if initialized with Byte Array, Base64 or Saved with Uri.
   * Data is cleared if saved with File object selected with a file upload control
   *
   * @returns {Promise} Promise that is resolve with base64 data
   */


  (0, _createClass2.default)(ParseFile, [{
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        var options, controller, result;
        return _regenerator.default.wrap(function (_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._data) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", this._data);

              case 2:
                if (this._url) {
                  _context4.next = 4;
                  break;
                }

                throw new Error('Cannot retrieve data for unsaved ParseFile.');

              case 4:
                options = {
                  requestTask: function (task) {
                    return _this._requestTask = task;
                  }
                };
                controller = _CoreManager.default.getFileController();
                _context4.next = 8;
                return controller.download(this._url, options);

              case 8:
                result = _context4.sent;
                this._data = result.base64;
                return _context4.abrupt("return", this._data);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee, this);
      }));

      return function () {
        return _getData.apply(this, arguments);
      };
    }()
    /**
     * Gets the name of the file. Before save is called, this is the filename
     * given by the user. After save is called, that name gets prefixed with a
     * unique identifier.
     *
     * @returns {string}
     */

  }, {
    key: "name",
    value: function ()
    /*: string*/
    {
      return this._name;
    }
    /**
     * Gets the url of the file. It is only available after you save the file or
     * after you get the file from a Parse.Object.
     *
     * @param {object} options An object to specify url options
     * @returns {string}
     */

  }, {
    key: "url",
    value: function (options
    /*:: ?: { forceSecure?: boolean }*/
    )
    /*: ?string*/
    {
      options = options || {};

      if (!this._url) {
        return;
      }

      if (options.forceSecure) {
        return this._url.replace(/^http:\/\//i, 'https://');
      } else {
        return this._url;
      }
    }
    /**
     * Gets the metadata of the file.
     *
     * @returns {object}
     */

  }, {
    key: "metadata",
    value: function ()
    /*: Object*/
    {
      return this._metadata;
    }
    /**
     * Gets the tags of the file.
     *
     * @returns {object}
     */

  }, {
    key: "tags",
    value: function ()
    /*: Object*/
    {
      return this._tags;
    }
    /**
     * Saves the file to the Parse cloud.
     *
     * @param {object} options
     *  * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *     behalf of a specific user.
     *   <li>progress: In Browser only, callback for upload progress. For example:
     * <pre>
     * let parseFile = new Parse.File(name, file);
     * parseFile.save({
     *   progress: (progressValue, loaded, total, { type }) => {
     *     if (type === "upload" && progressValue !== null) {
     *       // Update the UI using progressValue
     *     }
     *   }
     * });
     * </pre>
     * </ul>
     * @returns {Promise} Promise that is resolved when the save finishes.
     */

  }, {
    key: "save",
    value: function (options
    /*:: ?: FullOptions*/
    ) {
      var _this2 = this;

      options = options || {};

      options.requestTask = function (task) {
        return _this2._requestTask = task;
      };

      options.metadata = this._metadata;
      options.tags = this._tags;

      var controller = _CoreManager.default.getFileController();

      if (!this._previousSave) {
        if (this._source.format === 'file') {
          this._previousSave = controller.saveFile(this._name, this._source, options).then(function (res) {
            _this2._name = res.name;
            _this2._url = res.url;
            _this2._data = null;
            _this2._requestTask = null;
            return _this2;
          });
        } else if (this._source.format === 'uri') {
          this._previousSave = controller.download(this._source.uri, options).then(function (result) {
            if (!(result && result.base64)) {
              return {};
            }

            var newSource = {
              format: 'base64',
              base64: result.base64,
              type: result.contentType
            };
            _this2._data = result.base64;
            _this2._requestTask = null;
            return controller.saveBase64(_this2._name, newSource, options);
          }).then(function (res) {
            _this2._name = res.name;
            _this2._url = res.url;
            _this2._requestTask = null;
            return _this2;
          });
        } else {
          this._previousSave = controller.saveBase64(this._name, this._source, options).then(function (res) {
            _this2._name = res.name;
            _this2._url = res.url;
            _this2._requestTask = null;
            return _this2;
          });
        }
      }

      if (this._previousSave) {
        return this._previousSave;
      }
    }
    /**
     * Aborts the request if it has already been sent.
     */

  }, {
    key: "cancel",
    value: function () {
      if (this._requestTask && typeof this._requestTask.abort === 'function') {
        this._requestTask.abort();
      }

      this._requestTask = null;
    }
    /**
     * Deletes the file from the Parse cloud.
     * In Cloud Code and Node only with Master Key.
     *
     * @param {object} options
     *  * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     * <pre>
     * @returns {Promise} Promise that is resolved when the delete finishes.
     */

  }, {
    key: "destroy",
    value: function () {
      var _this3 = this;

      var options
      /*:: ?: FullOptions*/
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this._name) {
        throw new ParseError(ParseError.FILE_DELETE_UNNAMED_ERROR, 'Cannot delete an unnamed file.');
      }

      var destroyOptions = {
        useMasterKey: true
      };

      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getFileController();

      return controller.deleteFile(this._name, destroyOptions).then(function () {
        _this3._data = null;
        _this3._requestTask = null;
        return _this3;
      });
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { name: ?string, url: ?string }*/
    {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: "equals",
    value: function (other
    /*: mixed*/
    )
    /*: boolean*/
    {
      if (this === other) {
        return true;
      } // Unsaved Files are never equal, since they will be saved to different URLs


      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
    /**
     * Sets metadata to be saved with file object. Overwrites existing metadata
     *
     * @param {object} metadata Key value pairs to be stored with file object
     */

  }, {
    key: "setMetadata",
    value: function (metadata
    /*: any*/
    ) {
      var _this4 = this;

      if (metadata && (0, _typeof2.default)(metadata) === 'object') {
        var _context5;

        (0, _forEach.default)(_context5 = (0, _keys.default)(metadata)).call(_context5, function (key) {
          _this4.addMetadata(key, metadata[key]);
        });
      }
    }
    /**
     * Sets metadata to be saved with file object. Adds to existing metadata.
     *
     * @param {string} key key to store the metadata
     * @param {*} value metadata
     */

  }, {
    key: "addMetadata",
    value: function (key
    /*: string*/
    , value
    /*: any*/
    ) {
      if (typeof key === 'string') {
        this._metadata[key] = value;
      }
    }
    /**
     * Sets tags to be saved with file object. Overwrites existing tags
     *
     * @param {object} tags Key value pairs to be stored with file object
     */

  }, {
    key: "setTags",
    value: function (tags
    /*: any*/
    ) {
      var _this5 = this;

      if (tags && (0, _typeof2.default)(tags) === 'object') {
        var _context6;

        (0, _forEach.default)(_context6 = (0, _keys.default)(tags)).call(_context6, function (key) {
          _this5.addTag(key, tags[key]);
        });
      }
    }
    /**
     * Sets tags to be saved with file object. Adds to existing tags.
     *
     * @param {string} key key to store tags
     * @param {*} value tag
     */

  }, {
    key: "addTag",
    value: function (key
    /*: string*/
    , value
    /*: string*/
    ) {
      if (typeof key === 'string') {
        this._tags[key] = value;
      }
    }
  }], [{
    key: "fromJSON",
    value: function (obj)
    /*: ParseFile*/
    {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }

      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: "encodeBase64",
    value: function (bytes
    /*: Array<number>*/
    )
    /*: string*/
    {
      var chunks = [];
      chunks.length = Math.ceil(bytes.length / 3);

      for (var i = 0; i < chunks.length; i++) {
        var b1 = bytes[i * 3];
        var b2 = bytes[i * 3 + 1] || 0;
        var b3 = bytes[i * 3 + 2] || 0;
        var has2 = i * 3 + 1 < bytes.length;
        var has3 = i * 3 + 2 < bytes.length;
        chunks[i] = [b64Digit(b1 >> 2 & 0x3f), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0f), has2 ? b64Digit(b2 << 2 & 0x3c | b3 >> 6 & 0x03) : '=', has3 ? b64Digit(b3 & 0x3f) : '='].join('');
      }

      return chunks.join('');
    }
  }]);
  return ParseFile;
}();

var DefaultController = {
  saveFile: function () {
    var _saveFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(name
    /*: string*/
    , source
    /*: FileSource*/
    , options
    /*:: ?: FullOptions*/
    ) {
      var base64Data, _base64Data$split, _base64Data$split2, first, second, data, newSource;

      return _regenerator.default.wrap(function (_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(source.format !== 'file')) {
                _context7.next = 2;
                break;
              }

              throw new Error('saveFile can only be used with File-type sources.');

            case 2:
              _context7.next = 4;
              return new _promise.default(function (res, rej) {
                // eslint-disable-next-line no-undef
                var reader = new FileReader();

                reader.onload = function () {
                  return res(reader.result);
                };

                reader.onerror = function (error) {
                  return rej(error);
                };

                reader.readAsDataURL(source.file);
              });

            case 4:
              base64Data = _context7.sent; // we only want the data after the comma
              // For example: "data:application/pdf;base64,JVBERi0xLjQKJ..." we would only want "JVBERi0xLjQKJ..."

              _base64Data$split = base64Data.split(','), _base64Data$split2 = (0, _slicedToArray2.default)(_base64Data$split, 2), first = _base64Data$split2[0], second = _base64Data$split2[1]; // in the event there is no 'data:application/pdf;base64,' at the beginning of the base64 string
              // use the entire string instead

              data = second ? second : first;
              newSource = {
                format: 'base64',
                base64: data,
                type: source.type || (source.file ? source.file.type : null)
              };
              _context7.next = 10;
              return DefaultController.saveBase64(name, newSource, options);

            case 10:
              return _context7.abrupt("return", _context7.sent);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee2);
    }));

    return function () {
      return _saveFile.apply(this, arguments);
    };
  }(),
  saveBase64: function (name
  /*: string*/
  , source
  /*: FileSource*/
  , options
  /*:: ?: FullOptions*/
  ) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }

    var data
    /*: { base64: any, _ContentType?: any, fileData: Object }*/
    = {
      base64: source.base64,
      fileData: {
        metadata: _objectSpread({}, options.metadata),
        tags: _objectSpread({}, options.tags)
      }
    };
    delete options.metadata;
    delete options.tags;

    if (source.type) {
      data._ContentType = source.type;
    }

    return _CoreManager.default.getRESTController().request('POST', 'files/' + name, data, options);
  },
  download: function (uri, options) {
    if (XHR) {
      return this.downloadAjax(uri, options);
    } else {
      return _promise.default.reject('Cannot make a request: No definition of XMLHttpRequest was found.');
    }
  },
  downloadAjax: function (uri, options) {
    return new _promise.default(function (resolve, reject) {
      var xhr = new XHR();
      xhr.open('GET', uri, true);
      xhr.responseType = 'arraybuffer';

      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== xhr.DONE) {
          return;
        }

        if (!this.response) {
          return resolve({});
        }

        var bytes = new Uint8Array(this.response);
        resolve({
          base64: ParseFile.encodeBase64(bytes),
          contentType: xhr.getResponseHeader('content-type')
        });
      };

      options.requestTask(xhr);
      xhr.send();
    });
  },
  deleteFile: function (name
  /*: string*/
  , options
  /*:: ?: FullOptions*/
  ) {
    var headers = {
      'X-Parse-Application-ID': _CoreManager.default.get('APPLICATION_ID')
    };

    if (options.useMasterKey) {
      headers['X-Parse-Master-Key'] = _CoreManager.default.get('MASTER_KEY');
    }

    var url = _CoreManager.default.get('SERVER_URL');

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += 'files/' + name;
    return _CoreManager.default.getRESTController().ajax('DELETE', url, '', headers).catch(function (response) {
      // TODO: return JSON object in server
      if (!response || response === 'SyntaxError: Unexpected end of JSON input') {
        return _promise.default.resolve();
      } else {
        return _CoreManager.default.getRESTController().handleError(response);
      }
    });
  },
  _setXHR: function (xhr
  /*: any*/
  ) {
    XHR = xhr;
  },
  _getXHR: function () {
    return XHR;
  }
};

_CoreManager.default.setFileController(DefaultController);

var _default = ParseFile;
exports.default = _default;
exports.b64Digit = b64Digit;