var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

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

var ParseError = require('./ParseError').default;

var XHR = null;

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

var base64Regex = new RegExp('([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))', 'i');
var dataUriRegex = new RegExp("^data:([a-zA-Z]+\\/[-a-zA-Z0-9+.]+(;[a-z-]+=[a-zA-Z0-9+.-]+)?)?(;base64)?,(" + base64Regex.source + ")*$", 'i');

function b64Digit(number) {
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

var ParseFile = function () {
  function ParseFile(name, data, type, metadata, tags) {
    (0, _classCallCheck2.default)(this, ParseFile);
    var specifiedType = type || '';
    this._name = name;
    this._metadata = metadata || {};
    this._tags = tags || {};

    if (data !== undefined) {
      if (Array.isArray(data)) {
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
        var validationRegex = new RegExp(base64Regex.source + '|' + dataUriRegex.source, 'i');

        if (!validationRegex.test(data.base64)) {
          throw new Error('Cannot create a Parse.File without valid data URIs or base64 encoded data.');
        }

        var base64 = data.base64.split(',').slice(-1)[0];

        var _type = specifiedType || data.base64.split(';').slice(0, 1)[0].split(':').slice(1, 2)[0] || '';

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

  (0, _createClass2.default)(ParseFile, [{
    key: "getData",
    value: function () {
      var _this = this;

      var options, controller, result;
      return _regenerator.default.async(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this._data) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", this._data);

            case 2:
              if (this._url) {
                _context.next = 4;
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
              _context.next = 8;
              return _regenerator.default.awrap(controller.download(this._url, options));

            case 8:
              result = _context.sent;
              this._data = result.base64;
              return _context.abrupt("return", this._data);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "name",
    value: function () {
      return this._name;
    }
  }, {
    key: "url",
    value: function (options) {
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
  }, {
    key: "metadata",
    value: function () {
      return this._metadata;
    }
  }, {
    key: "tags",
    value: function () {
      return this._tags;
    }
  }, {
    key: "save",
    value: function (options) {
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
  }, {
    key: "cancel",
    value: function () {
      if (this._requestTask && typeof this._requestTask.abort === 'function') {
        this._requestTask.abort();
      }

      this._requestTask = null;
    }
  }, {
    key: "destroy",
    value: function () {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
    value: function () {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: "equals",
    value: function (other) {
      if (this === other) {
        return true;
      }

      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
  }, {
    key: "setMetadata",
    value: function (metadata) {
      var _this4 = this;

      if (metadata && typeof metadata === 'object') {
        Object.keys(metadata).forEach(function (key) {
          _this4.addMetadata(key, metadata[key]);
        });
      }
    }
  }, {
    key: "addMetadata",
    value: function (key, value) {
      if (typeof key === 'string') {
        this._metadata[key] = value;
      }
    }
  }, {
    key: "setTags",
    value: function (tags) {
      var _this5 = this;

      if (tags && typeof tags === 'object') {
        Object.keys(tags).forEach(function (key) {
          _this5.addTag(key, tags[key]);
        });
      }
    }
  }, {
    key: "addTag",
    value: function (key, value) {
      if (typeof key === 'string') {
        this._tags[key] = value;
      }
    }
  }], [{
    key: "fromJSON",
    value: function (obj) {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }

      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: "encodeBase64",
    value: function (bytes) {
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
  saveFile: function (name, source, options) {
    var base64Data, _base64Data$split, _base64Data$split2, first, second, data, newSource;

    return _regenerator.default.async(function (_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(source.format !== 'file')) {
              _context2.next = 2;
              break;
            }

            throw new Error('saveFile can only be used with File-type sources.');

          case 2:
            _context2.next = 4;
            return _regenerator.default.awrap(new Promise(function (res, rej) {
              var reader = new FileReader();

              reader.onload = function () {
                return res(reader.result);
              };

              reader.onerror = function (error) {
                return rej(error);
              };

              reader.readAsDataURL(source.file);
            }));

          case 4:
            base64Data = _context2.sent;
            _base64Data$split = base64Data.split(','), _base64Data$split2 = (0, _slicedToArray2.default)(_base64Data$split, 2), first = _base64Data$split2[0], second = _base64Data$split2[1];
            data = second ? second : first;
            newSource = {
              format: 'base64',
              base64: data,
              type: source.type || (source.file ? source.file.type : null)
            };
            _context2.next = 10;
            return _regenerator.default.awrap(DefaultController.saveBase64(name, newSource, options));

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, null, Promise);
  },
  saveBase64: function (name, source, options) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }

    var data = {
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
      return Promise.reject('Cannot make a request: No definition of XMLHttpRequest was found.');
    }
  },
  downloadAjax: function (uri, options) {
    return new Promise(function (resolve, reject) {
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
  deleteFile: function (name, options) {
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
      if (!response || response === 'SyntaxError: Unexpected end of JSON input') {
        return Promise.resolve();
      } else {
        return _CoreManager.default.getRESTController().handleError(response);
      }
    });
  },
  _setXHR: function (xhr) {
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