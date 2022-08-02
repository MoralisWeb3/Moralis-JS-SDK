"use strict";
exports.id = 924;
exports.ids = [924];
exports.modules = {

/***/ 2743:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiPaginatedResultAdapter = void 0;
var core_1 = __webpack_require__(4243);
var ApiResultAdapter_1 = __webpack_require__(4889);
var ApiPaginatedResultAdapter = /** @class */ (function (_super) {
    __extends(ApiPaginatedResultAdapter, _super);
    function ApiPaginatedResultAdapter(data, adapter, jsonAdapter, params, nextCall) {
        var _this = _super.call(this, data, adapter, jsonAdapter, params) || this;
        _this.next = function () {
            if (!_this._nextCall) {
                throw new core_1.MoralisApiError({
                    code: core_1.ApiErrorCode.PAGE_LIMIT_EXCEEDED,
                    message: 'Cannot call .next(). Page limit exceeded.',
                });
            }
            return _this._nextCall();
        };
        _this._nextCall = nextCall;
        return _this;
    }
    Object.defineProperty(ApiPaginatedResultAdapter.prototype, "pagination", {
        get: function () {
            return {
                total: this._data.total,
                page: this._data.page,
                pageSize: this._data.page_size,
                cursor: this._data.cursor,
            };
        },
        enumerable: false,
        configurable: true
    });
    return ApiPaginatedResultAdapter;
}(ApiResultAdapter_1.ApiResultAdapter));
exports.ApiPaginatedResultAdapter = ApiPaginatedResultAdapter;
//# sourceMappingURL=ApiPaginatedResultAdapter.js.map

/***/ }),

/***/ 4889:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResultAdapter = exports.ApiFormatType = void 0;
var core_1 = __webpack_require__(4243);
// TODO: make part of core config? The challenge in that case is to make sure it is Typed correctly
var ApiFormatType;
(function (ApiFormatType) {
    // Return the data directly, as is provided by the API
    ApiFormatType["RAW"] = "raw";
    // Return the formatted result of all moralis DataTypes
    ApiFormatType["JSON"] = "JSON";
    // Return class with moralis DataTypes and format functions
    ApiFormatType["NORMAL"] = "normal";
})(ApiFormatType = exports.ApiFormatType || (exports.ApiFormatType = {}));
var ApiResultAdapter = /** @class */ (function () {
    function ApiResultAdapter(data, adapter, jsonAdapter, params) {
        this._data = data;
        this._adapter = adapter;
        this._jsonAdapter = jsonAdapter;
        this._params = params;
    }
    Object.defineProperty(ApiResultAdapter.prototype, "raw", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiResultAdapter.prototype, "result", {
        get: function () {
            return this._adapter(this._data, this._params);
        },
        enumerable: false,
        configurable: true
    });
    // TODO:  Cast all to primitive types
    ApiResultAdapter.prototype.toJSON = function () {
        return this._jsonAdapter(this.result);
    };
    ApiResultAdapter.prototype.format = function (formatType) {
        if (formatType === ApiFormatType.RAW) {
            return this.raw;
        }
        if (formatType === ApiFormatType.JSON) {
            return this.toJSON();
        }
        if (formatType === ApiFormatType.NORMAL) {
            return this.result;
        }
        throw new core_1.MoralisApiError({
            code: core_1.ApiErrorCode.GENERIC_API_ERROR,
            message: 'provided formatType not supported',
        });
    };
    return ApiResultAdapter;
}());
exports.ApiResultAdapter = ApiResultAdapter;
//# sourceMappingURL=ApiResultAdapter.js.map

/***/ }),

/***/ 3296:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisApiUtils = void 0;
var core_1 = __webpack_require__(4243);
var ApiConfigSetup_1 = __webpack_require__(705);
var MoralisApiUtils = /** @class */ (function (_super) {
    __extends(MoralisApiUtils, _super);
    function MoralisApiUtils(core) {
        return _super.call(this, MoralisApiUtils.moduleName, core) || this;
    }
    MoralisApiUtils.create = function (core) {
        return new MoralisApiUtils(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisApiUtils.prototype.setup = function () {
        ApiConfigSetup_1.ApiConfigSetup.register(this.core.config);
    };
    MoralisApiUtils.prototype.start = function () {
        // Nothing...
    };
    MoralisApiUtils.moduleName = 'api';
    return MoralisApiUtils;
}(core_1.Module));
exports.MoralisApiUtils = MoralisApiUtils;
//# sourceMappingURL=MoralisApiUtils.js.map

/***/ }),

/***/ 7810:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiPaginatedResolver = void 0;
var checkObjEqual_1 = __webpack_require__(6673);
var Resolver_1 = __webpack_require__(7101);
var getNextParams_1 = __webpack_require__(8612);
var ApiPaginatedResultAdapter_1 = __webpack_require__(2743);
var ApiConfig_1 = __webpack_require__(5139);
var core_1 = __webpack_require__(4243);
var ApiPaginatedResolver = /** @class */ (function (_super) {
    __extends(ApiPaginatedResolver, _super);
    function ApiPaginatedResolver(_a) {
        var getUrl = _a.getUrl, apiToResult = _a.apiToResult, resultToJson = _a.resultToJson, parseParams = _a.parseParams, method = _a.method, bodyParams = _a.bodyParams, bodyType = _a.bodyType, name = _a.name;
        var _this = _super.call(this, { getUrl: getUrl, apiToResult: apiToResult, resultToJson: resultToJson, parseParams: parseParams, method: method, bodyParams: bodyParams, bodyType: bodyType, name: name }) || this;
        // TODO: error handler to ApiError
        _this._apiGet = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var url, apiParams, searchParams, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getUrl(params);
                        apiParams = this.parseParams(params);
                        searchParams = this.getSearchParams(apiParams);
                        return [4 /*yield*/, this.requestController.get(url, searchParams, {
                                headers: {
                                    'x-api-key': this.config.get(ApiConfig_1.ApiConfig.apiKey),
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new ApiPaginatedResultAdapter_1.ApiPaginatedResultAdapter(result, this.apiToResult, this.resultToJson, params, this.resolveNextCall(params, result))];
                }
            });
        }); };
        _this._apiPost = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var url, apiParams, searchParams, bodyParams, apiKey, headers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getUrl(params);
                        apiParams = this.parseParams(params);
                        searchParams = this.getSearchParams(apiParams);
                        bodyParams = this.getBodyParams(apiParams);
                        apiKey = this.config.get(ApiConfig_1.ApiConfig.apiKey);
                        headers = {};
                        if (apiKey) {
                            headers['x-api-key'] = apiKey;
                        }
                        return [4 /*yield*/, this.requestController.post(url, searchParams, bodyParams, {
                                headers: headers,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new ApiPaginatedResultAdapter_1.ApiPaginatedResultAdapter(result, this.apiToResult, this.resultToJson, params, this.resolveNextCall(params, result))];
                }
            });
        }); };
        _this.resolveNextCall = function (params, result) {
            var nextParams = (0, getNextParams_1.getNextParams)(params, result);
            return (0, checkObjEqual_1.checkObjEqual)(params, nextParams) ? undefined : function () { return _this.fetch(nextParams); };
        };
        _this.fetch = function (params) {
            var apiKey = _this.config.get(ApiConfig_1.ApiConfig.apiKey);
            if (!apiKey) {
                throw new core_1.MoralisApiError({
                    code: core_1.ApiErrorCode.API_KEY_NOT_SET,
                    message: 'apiKey is not set',
                });
            }
            return _this.method === 'post' ? _this._apiPost(params) : _this._apiGet(params);
        };
        return _this;
    }
    return ApiPaginatedResolver;
}(Resolver_1.ApiResolver));
exports.ApiPaginatedResolver = ApiPaginatedResolver;
//# sourceMappingURL=PaginatedResolver.js.map

/***/ }),

/***/ 7101:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResolver = exports.BodyType = void 0;
var core_1 = __webpack_require__(4243);
var ApiConfig_1 = __webpack_require__(5139);
var ApiResultAdapter_1 = __webpack_require__(4889);
var BodyType;
(function (BodyType) {
    BodyType["PROPERTY"] = "property";
    BodyType["BODY"] = "body";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
var ApiResolver = /** @class */ (function () {
    function ApiResolver(_a) {
        var getUrl = _a.getUrl, apiToResult = _a.apiToResult, resultToJson = _a.resultToJson, parseParams = _a.parseParams, method = _a.method, bodyParams = _a.bodyParams, bodyType = _a.bodyType, name = _a.name;
        var _this = this;
        this.isBodyParam = function (param) {
            if (_this.method === 'get') {
                return false;
            }
            if (!_this.bodyParams || _this.bodyParams.length === 0) {
                return false;
            }
            // @ts-ignore TODO: fix the param string cast from keyof
            return _this.bodyParams.includes(param);
        };
        // TODO: error handler to ApiError
        this._apiGet = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var url, apiParams, searchParams, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getUrl(params);
                        apiParams = this.parseParams(params);
                        searchParams = this.getSearchParams(apiParams);
                        return [4 /*yield*/, this.requestController.get(url, searchParams, {
                                headers: this.createHeaders(),
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new ApiResultAdapter_1.ApiResultAdapter(result, this.apiToResult, this.resultToJson, params)];
                }
            });
        }); };
        this._apiPost = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var url, apiParams, searchParams, bodyParams, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getUrl(params);
                        apiParams = this.parseParams(params);
                        searchParams = this.getSearchParams(apiParams);
                        bodyParams = this.getBodyParams(apiParams);
                        return [4 /*yield*/, this.requestController.post(url, searchParams, bodyParams, {
                                headers: this.createHeaders(),
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new ApiResultAdapter_1.ApiResultAdapter(result, this.apiToResult, this.resultToJson, params)];
                }
            });
        }); };
        this._apiPut = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var url, apiParams, searchParams, bodyParams, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.getUrl(params);
                        apiParams = this.parseParams(params);
                        searchParams = this.getSearchParams(apiParams);
                        bodyParams = this.getBodyParams(apiParams);
                        return [4 /*yield*/, this.requestController.put(url, searchParams, bodyParams, {
                                headers: this.createHeaders(),
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new ApiResultAdapter_1.ApiResultAdapter(result, this.apiToResult, this.resultToJson, params)];
                }
            });
        }); };
        this.fetch = function (params) {
            var apiKey = _this.config.get(ApiConfig_1.ApiConfig.apiKey);
            if (!apiKey) {
                throw new core_1.MoralisApiError({
                    code: core_1.ApiErrorCode.API_KEY_NOT_SET,
                    message: 'apiKey is not set',
                });
            }
            switch (_this.method) {
                case 'post':
                    return _this._apiPost(params);
                case 'put':
                    return _this._apiPut(params);
                default:
                    return _this._apiGet(params);
            }
        };
        this.getUrl = getUrl;
        this.apiToResult = apiToResult;
        this.resultToJson = resultToJson;
        this.parseParams = parseParams;
        this.method = method !== null && method !== void 0 ? method : 'get';
        this.bodyParams = bodyParams;
        this.bodyType = bodyType !== null && bodyType !== void 0 ? bodyType : BodyType.PROPERTY;
        this.name = name;
        var core = core_1.MoralisCoreProvider.getDefault();
        this.config = core.config;
        this.requestController = core_1.RequestController.create(core);
    }
    ApiResolver.prototype.getSearchParams = function (params) {
        var _this = this;
        return Object.keys(params).reduce(function (result, key) {
            var _a;
            // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
            if (!params[key] || _this.isBodyParam(key)) {
                return result;
            }
            // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
            return __assign(__assign({}, result), (_a = {}, _a[key] = params[key], _a));
        }, {});
    };
    ApiResolver.prototype.getBodyParams = function (params) {
        var _this = this;
        return Object.keys(params).reduce(function (result, key) {
            var _a;
            // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
            if (!params[key] || !_this.isBodyParam(key)) {
                return result;
            }
            if (_this.bodyType === BodyType.PROPERTY) {
                // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
                return __assign(__assign({}, result), (_a = {}, _a[key] = params[key], _a));
            }
            // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
            return params[key];
        }, {});
    };
    ApiResolver.prototype.createHeaders = function () {
        var apiKey = this.config.get(ApiConfig_1.ApiConfig.apiKey);
        var headers = {};
        if (apiKey) {
            headers['x-api-key'] = apiKey;
        }
        return headers;
    };
    return ApiResolver;
}());
exports.ApiResolver = ApiResolver;
//# sourceMappingURL=Resolver.js.map

/***/ }),

/***/ 5139:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiConfig = void 0;
exports.ApiConfig = {
    apiKey: {
        name: 'apiKey',
        defaultValue: null,
    },
};
//# sourceMappingURL=ApiConfig.js.map

/***/ }),

/***/ 705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiConfigSetup = void 0;
var ApiConfig_1 = __webpack_require__(5139);
var ApiConfigSetup = /** @class */ (function () {
    function ApiConfigSetup() {
    }
    ApiConfigSetup.register = function (config) {
        if (!config.hasKey(ApiConfig_1.ApiConfig.apiKey)) {
            config.registerKey(ApiConfig_1.ApiConfig.apiKey);
        }
    };
    return ApiConfigSetup;
}());
exports.ApiConfigSetup = ApiConfigSetup;
//# sourceMappingURL=ApiConfigSetup.js.map

/***/ }),

/***/ 3520:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7101), exports);
__exportStar(__webpack_require__(4889), exports);
__exportStar(__webpack_require__(7810), exports);
__exportStar(__webpack_require__(2743), exports);
__exportStar(__webpack_require__(3368), exports);
__exportStar(__webpack_require__(3296), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6673:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkObjEqual = void 0;
// eslint-disable-next-line @typescript-eslint/ban-types
var checkObjEqual = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.every(function (obj) { return JSON.stringify(obj) === JSON.stringify(objects[0]); });
};
exports.checkObjEqual = checkObjEqual;
//# sourceMappingURL=checkObjEqual.js.map

/***/ }),

/***/ 8612:
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNextParams = void 0;
var getNextParams = function (params, data) {
    var nextParams = __assign({}, params);
    if (data.total > data.page_size * (data.page + 1)) {
        data.cursor ? (nextParams.cursor = data.cursor) : (nextParams.offset = (data.page + 1) * (nextParams.limit || 500));
    }
    return nextParams;
};
exports.getNextParams = getNextParams;
//# sourceMappingURL=getNextParams.js.map

/***/ }),

/***/ 3368:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8612), exports);
__exportStar(__webpack_require__(6673), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5355:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisAuth = exports.BASE_URL = void 0;
var core_1 = __webpack_require__(4243);
var requestMessage_1 = __webpack_require__(7616);
var verify_1 = __webpack_require__(6237);
exports.BASE_URL = 'https://auth-api.do-prod-1.moralis.io';
var MoralisAuth = /** @class */ (function (_super) {
    __extends(MoralisAuth, _super);
    function MoralisAuth(core) {
        var _this = _super.call(this, MoralisAuth.moduleName, core, exports.BASE_URL) || this;
        _this.requestMessage = function (options) { return (0, requestMessage_1.makeRequestMessage)()(options); };
        _this.verify = function (options) { return (0, verify_1.makeVerify)()(options); };
        return _this;
    }
    MoralisAuth.create = function (core) {
        return new MoralisAuth(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisAuth.prototype.setup = function () {
        // Nothing
    };
    MoralisAuth.prototype.start = function () {
        // Nothing
    };
    MoralisAuth.moduleName = 'auth';
    return MoralisAuth;
}(core_1.ApiModule));
exports.MoralisAuth = MoralisAuth;
//# sourceMappingURL=MoralisAuth.js.map

/***/ }),

/***/ 3228:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MoralisAuth_1 = __webpack_require__(5355);
__exportStar(__webpack_require__(5355), exports);
exports["default"] = MoralisAuth_1.MoralisAuth;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7616:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeRequestMessage = exports.AuthNetwork = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var evmRequestChallenge_1 = __webpack_require__(8618);
var AuthNetwork;
(function (AuthNetwork) {
    AuthNetwork["EVM"] = "evm";
})(AuthNetwork = exports.AuthNetwork || (exports.AuthNetwork = {}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var makeEvmRequestMessage = function (_a) {
    var chain = _a.chain, address = _a.address, network = _a.network, options = __rest(_a, ["chain", "address", "network"]);
    return evmRequestChallenge_1.initializeChallengeResolver.fetch(__assign({ chainId: evm_utils_1.EvmChain.create(chain).decimal, address: evm_utils_1.EvmAddress.create(address).checksum }, options));
};
var makeRequestMessage = function () { return function (options) {
    switch (options.network) {
        case 'evm':
            return makeEvmRequestMessage(options);
        default:
            throw new core_1.MoralisAuthError({
                code: core_1.AuthErrorCode.INCORRECT_NETWORK,
                message: "Incorrect network provided. Got \"".concat(options.network, "\", Valid values are: ").concat(Object.values(AuthNetwork)
                    .map(function (value) { return "\"".concat(value, "\""); })
                    .join(', ')),
            });
    }
}; };
exports.makeRequestMessage = makeRequestMessage;
//# sourceMappingURL=requestMessage.js.map

/***/ }),

/***/ 6237:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeVerify = void 0;
var core_1 = __webpack_require__(4243);
var evmVerifyChallenge_1 = __webpack_require__(6563);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var makeEvmVerify = function (_a) {
    var network = _a.network, options = __rest(_a, ["network"]);
    return evmVerifyChallenge_1.completeChallengeResolver.fetch({
        message: options.message,
        signature: options.signature,
    });
};
var makeVerify = function () { return function (options) {
    switch (options.network) {
        case 'evm':
            return makeEvmVerify(options);
        default:
            return (0, core_1.assertUnreachable)(options.network);
    }
}; };
exports.makeVerify = makeVerify;
//# sourceMappingURL=verify.js.map

/***/ }),

/***/ 8618:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeChallengeResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var MoralisAuth_1 = __webpack_require__(5355);
var method = 'post';
var bodyParams = [
    'domain',
    'chainId',
    'address',
    'statement',
    'uri',
    'expirationTime',
    'notBefore',
    'resources',
    'timeout',
];
var apiToResult = function (apiData, params) {
    var data = (0, core_1.toCamelCase)(apiData);
    return __assign({}, data);
};
exports.initializeChallengeResolver = new api_utils_1.ApiResolver({
    name: 'Request Challenge (EVM)',
    getUrl: function (params) { return "".concat(MoralisAuth_1.BASE_URL, "/challenge/request/evm"); },
    apiToResult: apiToResult,
    resultToJson: function (data) { return (__assign({}, data)); },
    parseParams: function (params) { return params; },
    method: method,
    bodyParams: bodyParams,
});
//# sourceMappingURL=evmRequestChallenge.js.map

/***/ }),

/***/ 6563:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.completeChallengeResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var api_utils_1 = __webpack_require__(3520);
var MoralisAuth_1 = __webpack_require__(5355);
var method = 'post';
var bodyParams = ['message', 'signature'];
exports.completeChallengeResolver = new api_utils_1.ApiResolver({
    name: 'Verify Challenge (EVM)',
    getUrl: function (params) { return "".concat(MoralisAuth_1.BASE_URL, "/challenge/verify/evm"); },
    apiToResult: function (_a) {
        var chainId = _a.chainId, data = __rest(_a, ["chainId"]);
        return (__assign(__assign({}, data), { 
            // TODO: revisit EVM logic once we know how authentication in other networks work
            chain: evm_utils_1.EvmChain.create(chainId), address: evm_utils_1.EvmAddress.create(data.address), expirationTime: (0, core_1.maybe)(data.expirationTime, function (value) { return new Date(value); }) }));
    },
    resultToJson: function (result) { return (__assign(__assign({}, (0, core_1.toCamelCase)(result)), { chain: result.chain.format(), address: result.address.format() })); },
    parseParams: function (params) { return params; },
    method: method,
    bodyParams: bodyParams,
});
//# sourceMappingURL=evmVerifyChallenge.js.map

/***/ }),

/***/ 4181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assertUnreachable = exports.UnreachableError = void 0;
var Error_1 = __webpack_require__(2882);
exports.UnreachableError = new Error_1.MoralisCoreError({
    code: Error_1.CoreErrorCode.GENERIC_CORE_ERROR,
    message: "Incorrect type provided, code should not reach here",
});
/**
 * Typesafe check, to make sure that code never reaches a certain point.
 * Can be used as an exhaustive check in swtich/if-else statements
 *
 * When used properly with Typescript, this code should never reach, as it is typed as 'never'
 *
 * If the code does reach this assertion an UnreachableError is thrown
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var assertUnreachable = function (x) {
    throw exports.UnreachableError;
};
exports.assertUnreachable = assertUnreachable;
//# sourceMappingURL=assertUnreachable.js.map

/***/ }),

/***/ 9954:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4181), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1986:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
var Error_1 = __webpack_require__(2882);
var Config = /** @class */ (function () {
    function Config() {
        this.items = new Map();
    }
    Config.prototype.registerKey = function (key, validator) {
        if (this.items.has(key.name)) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.CONFIG_KEY_ALREADY_EXIST,
                message: "Key \"".concat(key.name, "\" is already registered"),
            });
        }
        this.items.set(key.name, { key: key, value: key.defaultValue, validator: validator });
    };
    Config.prototype.getKeys = function () {
        return Array.from(this.items.keys());
    };
    Config.prototype.hasKey = function (key) {
        return this.items.has(key.name);
    };
    Config.prototype.get = function (keyOrName) {
        return this.getItem(keyOrName).value;
    };
    Config.prototype.set = function (keyOrName, value) {
        var item = this.getItem(keyOrName);
        var error = item.validator ? item.validator(value) : null;
        if (error) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.CONFIG_INVALID_VALUE,
                message: "Cannot set this config. Invalid value for \"".concat(item.key.name, "\". ").concat(error),
            });
        }
        item.value = value;
    };
    Config.prototype.merge = function (values) {
        var _this = this;
        Object.keys(values).forEach(function (keyName) {
            _this.set(keyName, values[keyName]);
        });
    };
    Config.prototype.reset = function () {
        this.items.forEach(function (item) {
            item.value = item.key.defaultValue;
        });
    };
    Config.prototype.getItem = function (keyOrName) {
        var keyName = typeof keyOrName === 'string' ? keyOrName : keyOrName.name;
        var item = this.items.get(keyName);
        if (!item) {
            // This error occurs when a user tries to set a value for a specific key, but the key is not registered.
            // That situation may occur, when a moralis module is not registered (all keys are registered in the module setup step).
            // If you have this error, you should fix your code. Firstly, you should register all modules, later you can modify the configuration.
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.CONFIG_KEY_NOT_EXIST,
                message: "Key \"".concat(keyName, "\" is unregistered. Have you registered all required modules?"),
            });
        }
        return item;
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map

/***/ }),

/***/ 2153:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreConfig = void 0;
exports.CoreConfig = {
    logLevel: {
        name: 'logLevel',
        defaultValue: 'info',
    },
    buidEnvironment: {
        name: 'buidEnvironment',
        defaultValue: 'browser',
    },
    defaultNetwork: {
        name: 'defaultNetwork',
        defaultValue: 'Evm',
    },
};
//# sourceMappingURL=CoreConfig.js.map

/***/ }),

/***/ 636:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreConfigSetup = void 0;
var CoreConfig_1 = __webpack_require__(2153);
var CoreConfigSetup = /** @class */ (function () {
    function CoreConfigSetup() {
    }
    CoreConfigSetup.register = function (config) {
        config.registerKey(CoreConfig_1.CoreConfig.logLevel);
        config.registerKey(CoreConfig_1.CoreConfig.buidEnvironment);
        config.registerKey(CoreConfig_1.CoreConfig.defaultNetwork);
    };
    return CoreConfigSetup;
}());
exports.CoreConfigSetup = CoreConfigSetup;
//# sourceMappingURL=CoreConfigSetup.js.map

/***/ }),

/***/ 9539:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=MoralisConfig.js.map

/***/ }),

/***/ 3503:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1986), exports);
__exportStar(__webpack_require__(2153), exports);
__exportStar(__webpack_require__(9539), exports);
__exportStar(__webpack_require__(2702), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7285:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/evm-utils package.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EvmChainish.js.map

/***/ }),

/***/ 6499:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/sol-utils package.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.solNetworkNames = void 0;
exports.solNetworkNames = ['mainnet', 'devnet'];
//# sourceMappingURL=SolNetworkish.js.map

/***/ }),

/***/ 2702:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6499), exports);
__exportStar(__webpack_require__(7285), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3871:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthErrorCode = exports.ApiErrorCode = exports.CoreErrorCode = void 0;
var CoreErrorCode;
(function (CoreErrorCode) {
    // Generic Core error
    CoreErrorCode["GENERIC_CORE_ERROR"] = "C0001";
    // A module wants to register with a name that already is registered
    CoreErrorCode["DUPLICATE_MODULE"] = "C0002";
    // The module is not registered
    CoreErrorCode["MODULE_NOT_FOUND"] = "C0003";
    // Error in validation check
    CoreErrorCode["VALIDATION_ERROR"] = "C0004";
    CoreErrorCode["INVALID_ARGUMENT"] = "C0005";
    CoreErrorCode["REQUEST_ERROR"] = "C0006";
    CoreErrorCode["NO_DATA_FOUND"] = "C0007";
    CoreErrorCode["NOT_INITIALIZED"] = "C0008";
    CoreErrorCode["ALREADY_INITIALIZED"] = "C0009";
    CoreErrorCode["METHOD_FAILED"] = "C0010";
    CoreErrorCode["STATE_MACHINE_STARTED"] = "C0011";
    CoreErrorCode["STATE_MACHINE_NOT_STARTED"] = "C0012";
    CoreErrorCode["CONFIG_KEY_NOT_EXIST"] = "C0013";
    CoreErrorCode["CONFIG_INVALID_VALUE"] = "C0014";
    CoreErrorCode["CONFIG_KEY_ALREADY_EXIST"] = "C0015";
    CoreErrorCode["BIG_NUMBER_ERROR"] = "C0500";
    CoreErrorCode["NOT_IMPLEMENTED"] = "C9000";
})(CoreErrorCode = exports.CoreErrorCode || (exports.CoreErrorCode = {}));
var ApiErrorCode;
(function (ApiErrorCode) {
    ApiErrorCode["GENERIC_API_ERROR"] = "A0001";
    ApiErrorCode["PAGE_LIMIT_EXCEEDED"] = "A0002";
    ApiErrorCode["API_KEY_NOT_SET"] = "A0003";
    ApiErrorCode["NOT_IMPLEMENTED"] = "A9000";
})(ApiErrorCode = exports.ApiErrorCode || (exports.ApiErrorCode = {}));
var AuthErrorCode;
(function (AuthErrorCode) {
    AuthErrorCode["GENERIC_AUTH_ERROR"] = "U0001";
    AuthErrorCode["INCORRECT_NETWORK"] = "U0002";
    AuthErrorCode["INCORRECT_PARAMETER"] = "U0003";
    AuthErrorCode["NOT_IMPLEMENTED"] = "U9000";
})(AuthErrorCode = exports.AuthErrorCode || (exports.AuthErrorCode = {}));
//# sourceMappingURL=ErrorCode.js.map

/***/ }),

/***/ 9489:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisAuthError = exports.MoralisApiError = exports.MoralisCoreError = exports.MoralisError = void 0;
var MoralisError = /** @class */ (function (_super) {
    __extends(MoralisError, _super);
    function MoralisError(_a) {
        var message = _a.message, code = _a.code, details = _a.details, cause = _a.cause;
        var _this = 
        // @ts-ignore Typescript does not recognise 'cause' ? OR we have wrong TS version
        _super.call(this, MoralisError.makeMessage(message, code), { cause: cause }) || this;
        _this.name = 'Moralis SDK Error';
        _this.isMoralisError = true;
        // Set prototype manually, as required since Typescript 2.2: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
        Object.setPrototypeOf(_this, MoralisError.prototype);
        _this.code = code;
        _this.details = details;
        if (cause) {
            _this.cause = cause;
            if ('stack' in cause) {
                _this.stack = _this.stack + '\nCAUSE: ' + cause.stack;
            }
        }
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisError);
        }
        return _this;
    }
    MoralisError.makeMessage = function (message, code) { return "[".concat(code, "] ").concat(message); };
    return MoralisError;
}(Error));
exports.MoralisError = MoralisError;
var MoralisCoreError = /** @class */ (function (_super) {
    __extends(MoralisCoreError, _super);
    function MoralisCoreError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis SDK Core Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisCoreError);
        }
        return _this;
    }
    return MoralisCoreError;
}(MoralisError));
exports.MoralisCoreError = MoralisCoreError;
var MoralisApiError = /** @class */ (function (_super) {
    __extends(MoralisApiError, _super);
    function MoralisApiError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis SDK API Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisApiError);
        }
        return _this;
    }
    return MoralisApiError;
}(MoralisError));
exports.MoralisApiError = MoralisApiError;
var MoralisAuthError = /** @class */ (function (_super) {
    __extends(MoralisAuthError, _super);
    function MoralisAuthError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis Auth Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisAuthError);
        }
        return _this;
    }
    return MoralisAuthError;
}(MoralisError));
exports.MoralisAuthError = MoralisAuthError;
//# sourceMappingURL=MoralisError.js.map

/***/ }),

/***/ 2882:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3871), exports);
__exportStar(__webpack_require__(9489), exports);
__exportStar(__webpack_require__(6969), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6969:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMoralisError = void 0;
var isMoralisError = function (error) {
    if (!(error instanceof Error)) {
        return false;
    }
    if (!error.isMoralisError) {
        return false;
    }
    return true;
};
exports.isMoralisError = isMoralisError;
//# sourceMappingURL=isMoralisError.js.map

/***/ }),

/***/ 4466:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
var ModuleType_1 = __webpack_require__(3630);
var Module_1 = __webpack_require__(5564);
/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 * - `baseUrl`: the base url where of the api
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var ApiModule = /** @class */ (function (_super) {
    __extends(ApiModule, _super);
    function ApiModule(name, core, baseUrl) {
        var _this = _super.call(this, name, core, ModuleType_1.ModuleType.API) || this;
        _this.baseUrl = baseUrl;
        return _this;
    }
    return ApiModule;
}(Module_1.Module));
exports.ApiModule = ApiModule;
//# sourceMappingURL=ApiModule.js.map

/***/ }),

/***/ 5564:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Module = void 0;
var eventemitter3_1 = __importDefault(__webpack_require__(3234));
var LoggerController_1 = __webpack_require__(5550);
var ModuleType_1 = __webpack_require__(3630);
/**
 * The base class of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Module = /** @class */ (function () {
    function Module(name, core, type) {
        if (type === void 0) { type = ModuleType_1.ModuleType.DEFAULT; }
        this.name = name;
        this.core = core;
        this.type = type;
        this.emitter = new eventemitter3_1.default();
        this.logger = new LoggerController_1.LoggerController(core.config, this.name);
    }
    /**
     * Any cleanup that needs to be done for removing this module.
     * It also should remove the module via `this.core.modules.remove(this.name)`
     */
    Module.prototype.cleanUp = function () {
        this.core.modules.remove(this.name);
    };
    /**
     * Listen to an event, and returns a cleanup function
     */
    Module.prototype.listen = function (eventName, listener) {
        var _this = this;
        this.emitter.on(eventName, listener);
        return function () { return _this.emitter.removeListener(eventName, listener); };
    };
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=Module.js.map

/***/ }),

/***/ 3630:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleType = void 0;
var ModuleType;
(function (ModuleType) {
    ModuleType["API"] = "api";
    ModuleType["DEFAULT"] = "default";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
//# sourceMappingURL=ModuleType.js.map

/***/ }),

/***/ 4992:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modules = void 0;
var utils_1 = __webpack_require__(108);
var Error_1 = __webpack_require__(2882);
/**
 * MoralisModues handles all registered modules.
 * Any package that is used in Moralis, should register itself via this class.
 * This allows cross-communication between modules and easy management of the modules
 *
 * This class is responsible for:
 * - registering new modules
 * - removing modules (in theory possible for exotic usecases, but might break the app if done after initialisation)
 * - getting individual modules by name, type or everything
 */
var Modules = /** @class */ (function () {
    function Modules() {
        this.modules = new Map();
    }
    /**
     * Register and setup a new module by providing a module that is extended from BaseClass.
     * This will throw an error if the name is not unique
     * @param module the module that needs to be registered
     */
    Modules.prototype.register = function (module) {
        if (this.modules.has(module.name)) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.DUPLICATE_MODULE,
                message: "The module \"".concat(module.name, "\" has already been registered."),
            });
        }
        this.modules.set(module.name, module);
        module.setup();
    };
    /**
     * Returns the module with the given name.
     * This module should have been registered with `register`
     * @param name the module name
     * @returns a valid BaseModule
     * @throws a MoralisCoreError if no module with the given name has been registered
     */
    Modules.prototype.get = function (name) {
        var module = this.modules.get(name);
        if (!module) {
            throw new Error_1.MoralisCoreError({ code: Error_1.CoreErrorCode.MODULE_NOT_FOUND, message: "Module \"".concat(name, "\" does not exist.") });
        }
        return module;
    };
    /**
     * Tries to return the module with the given name if exist. Otherwise returns null.
     * @param name the module name
     * @returns a valid BaseModule or null
     */
    Modules.prototype.tryGet = function (name) {
        return this.modules.get(name) || null;
    };
    Modules.prototype.has = function (name) {
        return this.modules.has(name);
    };
    /**
     * Returns the network module with the provided name.
     * @param name the module name
     * @returns a valid ApiModule
     * @throws a MoralisCoreError if no network module with the given name has been registered
     */
    Modules.prototype.getApi = function (name) {
        var module = this.modules.get(name);
        if (!module || !(0, utils_1.isApiModule)(module)) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.MODULE_NOT_FOUND,
                message: "No ApiModule found with the name \"".concat(name, "\""),
            });
        }
        return module;
    };
    /**
     * Remove the module with the provided name, if it has been registered,
     * @param name the module name
     * @throws a MoralisCoreError if the module cannot be found.
     */
    Modules.prototype.remove = function (name) {
        var isRemoved = this.modules.delete(name);
        if (!isRemoved) {
            throw new Error_1.MoralisCoreError({ code: Error_1.CoreErrorCode.MODULE_NOT_FOUND, message: "Module \"".concat(name, "\" does not exist.") });
        }
    };
    /**
     * List all the registered modules
     * @returns an array of BaseModule that have been registered
     */
    Modules.prototype.list = function () {
        return Array.from(this.modules.values());
    };
    /**
     * Returns the names of all registered modules
     */
    Modules.prototype.listNames = function () {
        return this.list().map(function (module) { return module.name; });
    };
    /**
     * List all the registered api modules (eg. modules with the type CoreModuleType.API)
     */
    Modules.prototype.listApis = function () {
        return this.list().filter(utils_1.isApiModule);
    };
    return Modules;
}());
exports.Modules = Modules;
//# sourceMappingURL=Modules.js.map

/***/ }),

/***/ 8624:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5564), exports);
__exportStar(__webpack_require__(4466), exports);
__exportStar(__webpack_require__(3630), exports);
__exportStar(__webpack_require__(4992), exports);
__exportStar(__webpack_require__(108), exports);
__exportStar(__webpack_require__(4295), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4295:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isApiModule = void 0;
var ModuleType_1 = __webpack_require__(3630);
/**
 * Verify if the provided class is a api type.
 * Should be used as a Typescript type-guard
 *
 * @example
 * ```
 * if(isApiModule(module)){
 *  // module is types as ApiModule here
 * }
 * ```
 */
var isApiModule = function (moralisClass) {
    if (moralisClass.type === ModuleType_1.ModuleType.API) {
        return true;
    }
    return false;
};
exports.isApiModule = isApiModule;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 478:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisCore = void 0;
var Modules_1 = __webpack_require__(4992);
var LoggerController_1 = __webpack_require__(5550);
var Config_1 = __webpack_require__(1986);
var CoreConfigSetup_1 = __webpack_require__(636);
/**
 * MoralisCore is used in all Moralis applications
 * This class is **required** to be implemented in every app
 *
 * This class is responsible for:
 * - registering, removing and accessing modules
 * - accessing and changing the config
 */
var MoralisCore = /** @class */ (function () {
    function MoralisCore(modules, config, logger) {
        var _this = this;
        this.modules = modules;
        this.config = config;
        this.logger = logger;
        this.name = MoralisCore.moduleName;
        /**
         * Register all specified modules and configurations
         * @params array of all modules (any module that is extended from BaseModule) that you want to include
         */
        this.registerModules = function (modules) {
            modules.forEach(_this.registerModule);
        };
        /**
         * Register a new module
         */
        this.registerModule = function (module) {
            if ('create' in module) {
                module = module.create(_this);
            }
            _this.modules.register(module);
            _this.logger.verbose('Module registered', { module: module.name });
        };
        this.getModule = function (name) {
            return _this.modules.get(name);
        };
        /**
         * Start all modules, this function should be called before any interaction with a module,
         * as it is responsible for initialising the modules.
         *
         * This will call `start()` on every registered module
         */
        this.start = function (providedConfig) { return __awaiter(_this, void 0, void 0, function () {
            var allModules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allModules = this.modules.list();
                        if (providedConfig) {
                            this.config.merge(providedConfig);
                        }
                        this.logger.verbose('Starting all registered modules', {
                            moduleNames: this.modules.listNames(),
                        });
                        return [4 /*yield*/, Promise.all(allModules.map(function (module) { return module.start(); }))];
                    case 1:
                        _a.sent();
                        this.logger.verbose('Finished starting all registered modules', {
                            moduleNames: this.modules.listNames(),
                        });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    MoralisCore.create = function () {
        var modules = new Modules_1.Modules();
        var config = new Config_1.Config();
        var logger = new LoggerController_1.LoggerController(config, MoralisCore.moduleName);
        var core = new MoralisCore(modules, config, logger);
        CoreConfigSetup_1.CoreConfigSetup.register(config);
        return core;
    };
    MoralisCore.moduleName = 'core';
    return MoralisCore;
}());
exports.MoralisCore = MoralisCore;
//# sourceMappingURL=MoralisCore.js.map

/***/ }),

/***/ 2481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisCoreProvider = void 0;
var MoralisCore_1 = __webpack_require__(478);
var MoralisCoreProvider = /** @class */ (function () {
    function MoralisCoreProvider() {
    }
    MoralisCoreProvider.getDefault = function () {
        if (!this.core) {
            this.core = MoralisCore_1.MoralisCore.create();
        }
        return this.core;
    };
    MoralisCoreProvider.hasDefault = function () {
        return !!this.core;
    };
    return MoralisCoreProvider;
}());
exports.MoralisCoreProvider = MoralisCoreProvider;
//# sourceMappingURL=MoralisCoreProvider.js.map

/***/ }),

/***/ 2714:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisState = void 0;
var fsm_1 = __webpack_require__(5753);
var Error_1 = __webpack_require__(2882);
var MoralisState = /** @class */ (function () {
    function MoralisState(name) {
        this.name = name;
        this.value = null;
    }
    Object.defineProperty(MoralisState.prototype, "isStarted", {
        get: function () {
            if (!this.value) {
                return false;
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MoralisState.prototype.assertStarted = function () {
        var value = this.value;
        if (!value || !this.isStarted) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.STATE_MACHINE_NOT_STARTED,
                message: "State machine \"".concat(this.name, "\" not started. Call moralisState.start() first."),
            });
        }
        return value;
    };
    MoralisState.prototype.start = function (_config) {
        if (this.isStarted) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.STATE_MACHINE_STARTED,
                message: "State machine \"".concat(this.name, "\" already started."),
            });
        }
        var config = __assign({ id: this.name }, _config);
        var machine = (0, fsm_1.createMachine)(config);
        var service = (0, fsm_1.interpret)(machine).start();
        this.value = {
            config: config,
            machine: machine,
            service: service,
        };
        return this.value;
    };
    Object.defineProperty(MoralisState.prototype, "state", {
        get: function () {
            var value = this.assertStarted();
            return value.service.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisState.prototype, "machine", {
        get: function () {
            var value = this.assertStarted();
            return value.machine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisState.prototype, "service", {
        get: function () {
            var value = this.assertStarted();
            return value.service;
        },
        enumerable: false,
        configurable: true
    });
    MoralisState.prototype.match = function (value) {
        this.assertStarted();
        return this.state.matches(value);
    };
    // Optimistic check if state can change
    // Note: this takes no guards into account at all, it only checks the config definition
    // to see if there is an event of the type defined
    MoralisState.prototype.can = function (event) {
        var state = this.state.value;
        var stateConfig = this.machine.config.states[state];
        var ons = stateConfig.on;
        return ons && Object.keys(ons).includes(event);
    };
    MoralisState.prototype.transition = function (event) {
        var value = this.assertStarted();
        return value.service.send(event);
    };
    return MoralisState;
}());
exports.MoralisState = MoralisState;
//# sourceMappingURL=MoralisState.js.map

/***/ }),

/***/ 7852:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2714), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6210:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AxiosRetry = void 0;
var axios_1 = __importDefault(__webpack_require__(2167));
var AxiosRetry = /** @class */ (function () {
    function AxiosRetry() {
    }
    AxiosRetry.request = function (retryConfig, requestConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var attempt, e_1, axiosError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        attempt = 1;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.request(requestConfig)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        e_1 = _b.sent();
                        if (attempt >= retryConfig.maxAttempts) {
                            throw e_1;
                        }
                        if (!requestConfig.method || !retryConfig.allowedMethods.includes(requestConfig.method.toUpperCase())) {
                            throw e_1;
                        }
                        if (!axios_1.default.isAxiosError(e_1)) {
                            throw e_1;
                        }
                        axiosError = e_1;
                        if (!((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || !retryConfig.allowedResponseStatuses.includes(axiosError.response.status)) {
                            throw e_1;
                        }
                        if (retryConfig.beforeRetry) {
                            retryConfig.beforeRetry(attempt, axiosError);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AxiosRetry;
}());
exports.AxiosRetry = AxiosRetry;
//# sourceMappingURL=AxiosRetry.js.map

/***/ }),

/***/ 5550:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerController = void 0;
/* eslint-disable no-console */
var isMoralisError_1 = __webpack_require__(6969);
var CoreConfig_1 = __webpack_require__(2153);
var logLevelMap = {
    verbose: 5,
    debug: 4,
    info: 3,
    warning: 2,
    error: 1,
    off: 0,
};
/**
 * LoggerController, responsible to create log messages for each module.
 * It should be created with the name of the module like `new Logger('module-name')`
 * It will then prefix any logs with that module-name for easy debugging
 * It will show only logs up to the specified `logLevel` in the MoralisConfig
 */
var LoggerController = /** @class */ (function () {
    function LoggerController(config, moduleName) {
        this.config = config;
        this.moduleName = moduleName;
    }
    Object.defineProperty(LoggerController.prototype, "level", {
        get: function () {
            return this.config.get(CoreConfig_1.CoreConfig.logLevel);
        },
        enumerable: false,
        configurable: true
    });
    LoggerController.prototype._transport = function (level, message, details) {
        var logMessage = this._makeLogMessage(message);
        var args = [logMessage, details].filter(function (arg) { return arg != null; });
        switch (level) {
            case 'error':
                console.error.apply(console, args);
                break;
            case 'warn':
                console.warn.apply(console, args);
                break;
            case 'log':
                console.log.apply(console, args);
                break;
        }
    };
    LoggerController.prototype._shouldLog = function (logLevel) {
        var level = logLevelMap[logLevel];
        var acceptedLevel = logLevelMap[this.level];
        if (level > acceptedLevel) {
            return false;
        }
        return true;
    };
    LoggerController.prototype._makeLogMessage = function (message) {
        return "Moralis[".concat(this.moduleName, "]: ").concat(message);
    };
    LoggerController.prototype.error = function (error, details) {
        if (!this._shouldLog('error')) {
            return;
        }
        var message = '';
        if (typeof error === 'string') {
            message = error;
        }
        else if ((0, isMoralisError_1.isMoralisError)(error)) {
            message = error.message;
            if (error.details) {
                if (details) {
                    details._errorDetails = error.details;
                }
                else {
                    details = {
                        _errorDetails: error.details,
                    };
                }
            }
        }
        else {
            message = error.message;
        }
        this._transport('error', message, details);
    };
    LoggerController.prototype.warn = function (message, details) {
        if (!this._shouldLog('warning')) {
            return;
        }
        this._transport('warn', message, details);
    };
    LoggerController.prototype.info = function (message, details) {
        if (!this._shouldLog('info')) {
            return;
        }
        this._transport('log', message, details);
    };
    LoggerController.prototype.debug = function (message, details) {
        if (!this._shouldLog('debug')) {
            return;
        }
        this._transport('log', message, details);
    };
    LoggerController.prototype.verbose = function (message, details) {
        if (!this._shouldLog('verbose')) {
            return;
        }
        this._transport('log', message, details);
    };
    return LoggerController;
}());
exports.LoggerController = LoggerController;
//# sourceMappingURL=LoggerController.js.map

/***/ }),

/***/ 2539:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestController = void 0;
var axios_1 = __importDefault(__webpack_require__(2167));
var Error_1 = __webpack_require__(2882);
var AxiosRetry_1 = __webpack_require__(6210);
var isTest_1 = __webpack_require__(9126);
var noop_1 = __webpack_require__(3112);
var MoralisCoreProvider_1 = __webpack_require__(2481);
/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
var RequestController = /** @class */ (function () {
    function RequestController(logger) {
        this.logger = logger;
    }
    RequestController.create = function (core) {
        var finalCore = core || MoralisCoreProvider_1.MoralisCoreProvider.getDefault();
        return new RequestController(finalCore.logger);
    };
    RequestController.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var retryConfig, response, e_1, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.verbose('[RequestController] request started', {
                            url: config.url,
                            method: config.method,
                            body: config.data,
                        });
                        retryConfig = {
                            maxAttempts: 2,
                            allowedMethods: ['GET', 'OPTIONS'],
                            allowedResponseStatuses: [408, 413, 429, 500, 502, 503, 504],
                            beforeRetry: function (attempt, error) {
                                _this.logger.verbose('[RequestController] request retry', {
                                    url: config.url,
                                    method: config.method,
                                    body: config.data,
                                    error: error,
                                    attempt: attempt,
                                });
                            },
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(0, isTest_1.isTest)()) return [3 /*break*/, 3];
                        /**
                         * Known issue where in Jest, axios.request() will leave open handlers.
                         * See: https://stackoverflow.com/questions/69169492/async-external-function-leaves-open-handles-jest-supertest-express
                         */
                        return [4 /*yield*/, process.nextTick(noop_1.noop)];
                    case 2:
                        /**
                         * Known issue where in Jest, axios.request() will leave open handlers.
                         * See: https://stackoverflow.com/questions/69169492/async-external-function-leaves-open-handles-jest-supertest-express
                         */
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, AxiosRetry_1.AxiosRetry.request(retryConfig, __assign(__assign({}, config), { timeout: 10000 }))];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 5:
                        e_1 = _a.sent();
                        error = this.makeError(e_1);
                        this.logger.verbose('[RequestController] request error', {
                            url: config.url,
                            method: config.method,
                            body: config.data,
                            cause: error.cause,
                            name: error.name,
                            details: error.details,
                        });
                        throw error;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RequestController.prototype.makeError = function (error) {
        var _a, _b;
        if (axios_1.default.isAxiosError(error)) {
            var axiosError = error;
            return new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.REQUEST_ERROR,
                message: "Request failed with status ".concat((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status, ": ").concat(axiosError.message),
                cause: error,
                details: {
                    status: (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status,
                    request: axiosError.request,
                    response: axiosError.response,
                },
            });
        }
        var err = error instanceof Error ? error : new Error("".concat(error));
        return new Error_1.MoralisCoreError({
            code: Error_1.CoreErrorCode.REQUEST_ERROR,
            message: "Request failed: ".concat(err.message),
            cause: err,
        });
    };
    RequestController.prototype.post = function (url, params, body, options, abortSignal) {
        return this.request({
            url: url,
            method: 'POST',
            data: body,
            params: params,
            headers: options === null || options === void 0 ? void 0 : options.headers,
            signal: abortSignal,
        });
    };
    RequestController.prototype.put = function (url, params, body, options, abortSignal) {
        return this.request({
            url: url,
            method: 'PUT',
            data: body,
            params: params,
            headers: options === null || options === void 0 ? void 0 : options.headers,
            signal: abortSignal,
        });
    };
    RequestController.prototype.get = function (url, params, options, abortSignal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        url: url,
                        method: 'GET',
                        params: params,
                        headers: options === null || options === void 0 ? void 0 : options.headers,
                        signal: abortSignal,
                    })];
            });
        });
    };
    return RequestController;
}());
exports.RequestController = RequestController;
//# sourceMappingURL=RequestController.js.map

/***/ }),

/***/ 1757:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2539), exports);
__exportStar(__webpack_require__(5550), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6973:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BigNumber = void 0;
var BigNumberFormatter_1 = __webpack_require__(6358);
var BigNumberParser_1 = __webpack_require__(6655);
var BigNumber = /** @class */ (function () {
    function BigNumber(value) {
        this.value = value;
    }
    BigNumber.create = function (value) {
        if (value instanceof BigNumber) {
            return value;
        }
        return new BigNumber(BigNumberParser_1.BigNumberParser.parseInt(value));
    };
    BigNumber.fromDecimal = function (value, decimals) {
        if (decimals === void 0) { decimals = 0; }
        return new BigNumber(BigNumberParser_1.BigNumberParser.parseDecimal(value, decimals));
    };
    BigNumber.prototype.toBigInt = function () {
        return this.value;
    };
    BigNumber.prototype.add = function (value) {
        return new BigNumber(this.value + asBigInt(value));
    };
    BigNumber.prototype.sub = function (value) {
        return new BigNumber(this.value - asBigInt(value));
    };
    BigNumber.prototype.mul = function (value) {
        return new BigNumber(this.value * asBigInt(value));
    };
    BigNumber.prototype.div = function (value) {
        return new BigNumber(this.value / asBigInt(value));
    };
    BigNumber.prototype.equals = function (value) {
        return this.value === value.toBigInt();
    };
    BigNumber.prototype.toDecimal = function (decimals) {
        return BigNumberFormatter_1.BigNumberFormatter.toDecimal(this.value, decimals);
    };
    BigNumber.prototype.toString = function () {
        return this.value.toString();
    };
    BigNumber.prototype.toHex = function () {
        return BigNumberFormatter_1.BigNumberFormatter.toHex(this.value);
    };
    BigNumber.prototype.toJSON = function () {
        return this.toHex();
    };
    return BigNumber;
}());
exports.BigNumber = BigNumber;
function asBigInt(value) {
    return BigNumber.create(value).toBigInt();
}
//# sourceMappingURL=BigNumber.js.map

/***/ }),

/***/ 6358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BigNumberFormatter = void 0;
var Error_1 = __webpack_require__(2882);
var BigNumberFormatter = /** @class */ (function () {
    function BigNumberFormatter() {
    }
    BigNumberFormatter.toDecimal = function (value, decimals) {
        if (decimals < 0) {
            throw new Error_1.MoralisCoreError({
                code: Error_1.CoreErrorCode.BIG_NUMBER_ERROR,
                message: 'Invalid decimals',
            });
        }
        var result = value.toString();
        if (decimals === 0) {
            return result;
        }
        var isNegative = result.startsWith('-');
        if (isNegative) {
            result = result.substring(1);
        }
        result = result.padStart(decimals, '0');
        var dot = result.length - decimals;
        var whole = dot === 0 ? '0' : result.substring(0, dot);
        var fraction = result.substring(dot);
        result = whole + '.' + fraction;
        while (result[result.length - 1] === '0' && result[result.length - 2] !== '.') {
            result = result.substring(0, result.length - 1);
        }
        if (isNegative) {
            result = '-' + result;
        }
        return result;
    };
    BigNumberFormatter.toHex = function (value) {
        var result = value.toString(16);
        var isNegative = result.startsWith('-');
        if (isNegative) {
            result = result.substring(1);
        }
        if (result.length % 2 !== 0) {
            result = '0' + result;
        }
        result = '0x' + result;
        if (isNegative) {
            result = '-' + result;
        }
        return result;
    };
    return BigNumberFormatter;
}());
exports.BigNumberFormatter = BigNumberFormatter;
//# sourceMappingURL=BigNumberFormatter.js.map

/***/ }),

/***/ 6655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BigNumberParser = void 0;
var Error_1 = __webpack_require__(2882);
var BigNumberParser = /** @class */ (function () {
    function BigNumberParser() {
    }
    BigNumberParser.parseInt = function (value) {
        assertNotEmpty(value);
        if (typeof value === 'string') {
            if (value.length === 0) {
                throw createError('Value is empty');
            }
            var isNegativeHex = value.startsWith('-0x');
            if (isNegativeHex) {
                value = value.substring(1);
            }
            var result = BigInt(value);
            if (isNegativeHex) {
                result *= BigInt(-1);
            }
            return result;
        }
        return BigInt(value);
    };
    BigNumberParser.parseDecimal = function (value, decimals) {
        assertNotEmpty(value);
        var multiplier = getMultiplier(decimals);
        if (typeof value === 'number') {
            return BigInt(value) * multiplier;
        }
        if (typeof value === 'bigint') {
            return value * multiplier;
        }
        var isNegative = value.startsWith('-');
        if (isNegative) {
            value = value.substring(1);
        }
        var fragments = value.split('.');
        if (fragments.length > 2) {
            throw createError('Value has more than one dot');
        }
        if (fragments.some(function (fragment) { return !fragment; })) {
            throw createError('Value has empty fragments');
        }
        var result;
        if (fragments.length === 1) {
            result = BigInt(fragments[0]) * multiplier;
        }
        else {
            var whole = fragments[0];
            var fraction = fragments[1];
            if (fraction.length > decimals) {
                throw createError("Value has too long fractional part: ".concat(fraction.length, ", max: ").concat(decimals));
            }
            if (fraction.length < decimals) {
                fraction = fraction.padEnd(decimals, '0');
            }
            result = BigInt(whole) * multiplier + BigInt(fraction);
        }
        if (isNegative) {
            result *= BigInt(-1);
        }
        return result;
    };
    return BigNumberParser;
}());
exports.BigNumberParser = BigNumberParser;
function assertNotEmpty(value) {
    if (value === null) {
        throw createError('Value is null');
    }
    if (value === undefined) {
        throw createError('Value is undefined');
    }
}
function getMultiplier(decimals) {
    if (decimals < 0) {
        throw createError('Invalid decimals');
    }
    // decimals = 0, multiplier = 1
    // decimals = 1, multiplier = 10
    // decimals = 2, multiplier = 100
    // ...
    var ten = BigInt(10);
    var multiplier = BigInt(1);
    while (decimals-- > 0) {
        multiplier *= ten;
    }
    return multiplier;
}
function createError(message) {
    return new Error_1.MoralisCoreError({
        code: Error_1.CoreErrorCode.BIG_NUMBER_ERROR,
        message: message,
    });
}
//# sourceMappingURL=BigNumberParser.js.map

/***/ }),

/***/ 7278:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6973), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1183:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisData = void 0;
var MoralisData = /** @class */ (function () {
    function MoralisData() {
    }
    return MoralisData;
}());
exports.MoralisData = MoralisData;
//# sourceMappingURL=MoralisData.js.map

/***/ }),

/***/ 5125:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisDataObject = void 0;
var MoralisData_1 = __webpack_require__(1183);
var MoralisDataObject = /** @class */ (function (_super) {
    __extends(MoralisDataObject, _super);
    function MoralisDataObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoralisDataObject;
}(MoralisData_1.MoralisData));
exports.MoralisDataObject = MoralisDataObject;
//# sourceMappingURL=MoralisObjectData.js.map

/***/ }),

/***/ 5905:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1183), exports);
__exportStar(__webpack_require__(5125), exports);
__exportStar(__webpack_require__(4612), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4612:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 3610:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5905), exports);
__exportStar(__webpack_require__(7278), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9126:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTest = void 0;
/**
 * @returns true if the current process is running in a test environment.
 */
var isTest = function () {
    var _a;
    if (typeof process !== 'undefined') {
        return ((_a = process.env) === null || _a === void 0 ? void 0 : "production") === 'test';
    }
    return false;
};
exports.isTest = isTest;
//# sourceMappingURL=isTest.js.map

/***/ }),

/***/ 4243:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MoralisCore_1 = __webpack_require__(478);
__exportStar(__webpack_require__(478), exports);
__exportStar(__webpack_require__(2481), exports);
__exportStar(__webpack_require__(8624), exports);
__exportStar(__webpack_require__(2882), exports);
__exportStar(__webpack_require__(3503), exports);
__exportStar(__webpack_require__(9954), exports);
__exportStar(__webpack_require__(7852), exports);
__exportStar(__webpack_require__(3610), exports);
__exportStar(__webpack_require__(1757), exports);
__exportStar(__webpack_require__(7410), exports);
__exportStar(__webpack_require__(9954), exports);
exports["default"] = MoralisCore_1.MoralisCore;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7410:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3779), exports);
__exportStar(__webpack_require__(7257), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7257:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.maybe = void 0;
function maybe(value, transform) {
    if (value == null) {
        return undefined;
    }
    if (transform) {
        return transform(value);
    }
    return value;
}
exports.maybe = maybe;
//# sourceMappingURL=maybe.js.map

/***/ }),

/***/ 3112:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.noop = void 0;
/**
 * Empty (no operation) function.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function () { };
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ 3779:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCamelCase = void 0;
var toCamel = function (value) {
    return value.replace(/([-_][a-z])/gi, function ($1) {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};
var isObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};
var toCamelCase = function (data) {
    if (isObject(data)) {
        var n_1 = {};
        Object.keys(data).forEach(function (k) {
            //@ts-ignore TODO: fix typing
            n_1[toCamel(k)] = (0, exports.toCamelCase)(data[k]);
        });
        return n_1;
    }
    else if (Array.isArray(data)) {
        //@ts-ignore TODO: difficult to type with recursive arrays
        return data.map(function (i) {
            return (0, exports.toCamelCase)(i);
        });
    }
    return data;
};
exports.toCamelCase = toCamelCase;
//# sourceMappingURL=toCamelCase.js.map

/***/ }),

/***/ 9769:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisEvmApi = exports.BASE_URL = void 0;
var core_1 = __webpack_require__(4243);
var token_1 = __webpack_require__(6639);
var defi_1 = __webpack_require__(9544);
var resolve_1 = __webpack_require__(4717);
var account_1 = __webpack_require__(3422);
var native_1 = __webpack_require__(3183);
var info_1 = __webpack_require__(3114);
var storage_1 = __webpack_require__(2750);
var EvmApiConfigSetup_1 = __webpack_require__(9001);
exports.BASE_URL = 'https://deep-index.moralis.io/api/v2';
var MoralisEvmApi = /** @class */ (function (_super) {
    __extends(MoralisEvmApi, _super);
    function MoralisEvmApi(core) {
        return _super.call(this, MoralisEvmApi.moduleName, core, exports.BASE_URL) || this;
    }
    MoralisEvmApi.create = function (core) {
        return new MoralisEvmApi(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisEvmApi.prototype.setup = function () {
        EvmApiConfigSetup_1.EvmApiConfigSetup.register(this.core.config);
    };
    MoralisEvmApi.prototype.start = function () {
        // Nothing
    };
    Object.defineProperty(MoralisEvmApi.prototype, "native", {
        get: function () {
            return {
                runContractFunction: native_1.runContractFunctionResolver.fetch,
                getBlock: native_1.getBlockResolver.fetch,
                getDateToBlock: native_1.getDateToBlockResolver.fetch,
                getTransaction: native_1.getTransactionResolver.fetch,
                getLogsByAddress: native_1.getLogsByAddressResolver.fetch,
                getNFTTransfersByBlock: native_1.getNFTTransfersByBlockResolver.fetch,
                getContractEvents: native_1.getContractEventsResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "account", {
        get: function () {
            return {
                getTokenBalances: account_1.getTokenBalancesResolver.fetch,
                getNativeBalance: account_1.getNativeBalanceResolver.fetch,
                getNFTTransfers: account_1.getNFTTransfersResolver.fetch,
                getTokenTransfers: account_1.getTokenTransfersResolver.fetch,
                getTransactions: account_1.getTransactionsResolver.fetch,
                getNFTs: account_1.getNFTsResolver.fetch,
                getNFTsForContract: account_1.getNFTsForContractResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "resolve", {
        get: function () {
            return {
                resolveDomain: resolve_1.resolveDomainResolver.fetch,
                resolveAddress: resolve_1.resolveAddressResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "defi", {
        get: function () {
            return {
                getPairReserves: defi_1.getPairReservesResolver.fetch,
                getPairAddress: defi_1.getPairAddressResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "token", {
        get: function () {
            return {
                reSyncMetadata: token_1.reSyncMetadataResolver.fetch,
                getTokenPrice: token_1.getTokenPriceResolver.fetch,
                getTokenAllowance: token_1.getTokenAllowanceResolver.fetch,
                getContractNFTTransfers: token_1.getContractNFTTransfersResolver.fetch,
                getNftTransfersFromToBlock: token_1.getNftTransfersFromToBlockResolver.fetch,
                getTokenAddressTransfers: token_1.getTokenAddressTransfersResolver.fetch,
                getNFTTrades: token_1.getNFTTradesResolver.fetch,
                getNFTLowestPrice: token_1.getNFTLowestPriceResolver.fetch,
                getWalletTokenIdTransfers: token_1.getWalletTokenIdTransfersResolver.fetch,
                getTokenMetadataBySymbol: token_1.getTokenMetadataBySymbolResolver.fetch,
                getTokenMetadata: token_1.getTokenMetadataResolver.fetch,
                getAllTokenIds: token_1.getAllTokenIdsResolver.fetch,
                searchNFTs: token_1.searchNFTsResolver.fetch,
                getNFTOwners: token_1.getNFTOwnersResolver.fetch,
                getTokenIdOwners: token_1.getTokenIdOwnersResolver.fetch,
                getTokenIdMetadata: token_1.getTokenIdMetadataResolver.fetch,
                getNFTMetadata: token_1.getNFTMetadataResolver.fetch,
                syncNFTContract: token_1.syncNFTContractResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "info", {
        get: function () {
            return {
                web3ApiVersion: function () { return info_1.web3ApiVersionResolver.fetch({}); },
                endpointWeights: function () { return info_1.endpointWeightsResolver.fetch({}); },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoralisEvmApi.prototype, "storage", {
        get: function () {
            return {
                uploadFolder: storage_1.uploadFolderResolver.fetch,
            };
        },
        enumerable: false,
        configurable: true
    });
    MoralisEvmApi.moduleName = 'evmApi';
    return MoralisEvmApi;
}(core_1.ApiModule));
exports.MoralisEvmApi = MoralisEvmApi;
//# sourceMappingURL=EvmApi.js.map

/***/ }),

/***/ 8078:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmApiConfig = void 0;
exports.EvmApiConfig = {
    defaultEvmApiChain: {
        name: 'defaultEvmApiChain',
        defaultValue: '0x1',
    },
};
//# sourceMappingURL=EvmApiConfig.js.map

/***/ }),

/***/ 9001:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmApiConfigSetup = void 0;
var EvmApiConfig_1 = __webpack_require__(8078);
var EvmApiConfigSetup = /** @class */ (function () {
    function EvmApiConfigSetup() {
    }
    EvmApiConfigSetup.register = function (config) {
        config.registerKey(EvmApiConfig_1.EvmApiConfig.defaultEvmApiChain);
    };
    return EvmApiConfigSetup;
}());
exports.EvmApiConfigSetup = EvmApiConfigSetup;
//# sourceMappingURL=EvmApiConfigSetup.js.map

/***/ }),

/***/ 7268:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var EvmApi_1 = __webpack_require__(9769);
__exportStar(__webpack_require__(9769), exports);
exports["default"] = EvmApi_1.MoralisEvmApi;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 435:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmChainResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApiConfig_1 = __webpack_require__(8078);
var EvmChainResolver = /** @class */ (function () {
    function EvmChainResolver() {
    }
    EvmChainResolver.resolve = function (chain) {
        if (chain) {
            return evm_utils_1.EvmChain.create(chain);
        }
        var core = core_1.MoralisCoreProvider.getDefault();
        var defaultEvmChain = core.config.get(EvmApiConfig_1.EvmApiConfig.defaultEvmApiChain);
        return evm_utils_1.EvmChain.create(defaultEvmChain);
    };
    return EvmChainResolver;
}());
exports.EvmChainResolver = EvmChainResolver;
//# sourceMappingURL=EvmChainResolver.js.map

/***/ }),

/***/ 5316:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTTransfersResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var api_utils_1 = __webpack_require__(3520);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTTransfersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTTransfers',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/nft/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { tokenAddress: evm_utils_1.EvmAddress.create(transfer.to_address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), operator: transfer.operator ? evm_utils_1.EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? evm_utils_1.EvmAddress.create(transfer.from_address) : null, value: transfer.value ? evm_utils_1.EvmNative.create(transfer.value) : null, blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) {
            var _a, _b, _c;
            return (__assign(__assign({}, transfer), { tokenAddress: transfer.tokenAddress.format(), toAddress: transfer.toAddress.format(), fromAddress: (_a = transfer.fromAddress) === null || _a === void 0 ? void 0 : _a.format(), operator: (_b = transfer.operator) === null || _b === void 0 ? void 0 : _b.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString(), value: (_c = transfer.value) === null || _c === void 0 ? void 0 : _c.format() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase })); },
});
//# sourceMappingURL=getNFTTransfers.js.map

/***/ }),

/***/ 5297:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTsResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTs',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/nft"); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                name: nft.name,
                symbol: nft.symbol,
            }),
            blockNumberMinted: nft.block_number_minted,
            blockNumber: nft.block_number,
            ownerOf: evm_utils_1.EvmAddress.create(nft.owner_of),
            tokenHash: nft.token_hash,
            lastMetadataSync: new Date(nft.last_metadata_sync),
            lastTokenUriSync: new Date(nft.last_token_uri_sync),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) { return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: nft.lastMetadataSync.toLocaleDateString(), lastTokenUriSync: nft.lastTokenUriSync.toLocaleDateString() })); });
    },
    parseParams: function (params) {
        var _a;
        return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, token_addresses: (_a = params.tokenAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return evm_utils_1.EvmAddress.create(address).lowercase; }), address: evm_utils_1.EvmAddress.create(params.address).lowercase }));
    },
});
//# sourceMappingURL=getNFTs.js.map

/***/ }),

/***/ 733:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTsForContractResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTsForContractResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTsForContract',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/nft/").concat(params.tokenAddress); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                name: nft.name,
                symbol: nft.symbol,
            }),
            blockNumberMinted: nft.block_number_minted,
            blockNumber: nft.block_number,
            ownerOf: evm_utils_1.EvmAddress.create(nft.owner_of),
            amount: nft.amount,
            tokenHash: nft.token_hash,
            lastMetadataSync: new Date(nft.last_metadata_sync),
            lastTokenUriSync: new Date(nft.last_token_uri_sync),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) { return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: nft.lastMetadataSync.toLocaleDateString(), lastTokenUriSync: nft.lastTokenUriSync.toLocaleDateString() })); });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, token_address: evm_utils_1.EvmAddress.create(params.tokenAddress).lowercase })); },
});
//# sourceMappingURL=getNFTsForContract.js.map

/***/ }),

/***/ 6322:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNativeBalanceResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNativeBalanceResolver = new api_utils_1.ApiResolver({
    name: 'getNativeBalance',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/balance"); },
    apiToResult: function (data) { return ({
        balance: evm_utils_1.EvmNative.create(data.balance, 'wei'),
    }); },
    resultToJson: function (data) { return ({
        balance: data.balance.format(),
    }); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        to_block: params.toBlock,
        providerUrl: params.providerUrl,
    }); },
});
//# sourceMappingURL=getNativeBalance.js.map

/***/ }),

/***/ 1085:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenBalancesResolver = void 0;
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var api_utils_1 = __webpack_require__(3520);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenBalancesResolver = new api_utils_1.ApiResolver({
    name: 'getTokenBalances',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/erc20"); },
    apiToResult: function (data, params) {
        return data.map(function (token) { return ({
            token: new evm_utils_1.Erc20Token({
                decimals: token.decimals,
                name: token.name,
                symbol: token.symbol,
                contractAddress: token.token_address,
                logo: token.logo,
                thumbnail: token.thumbnail,
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
            }),
            value: new evm_utils_1.Erc20Value(token.balance, token.decimals),
        }); });
    },
    resultToJson: function (data) { return data.map(function (_a) {
        var token = _a.token, value = _a.value;
        return ({ token: token.toJSON(), value: value.format() });
    }); },
    parseParams: function (params) { return ({
        to_block: params.toBlock,
        token_addresses: params.tokenAddresses,
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
    }); },
});
//# sourceMappingURL=getTokenBalances.js.map

/***/ }),

/***/ 6100:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenTransfersResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenTransfersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getTokenTransfers',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/erc20/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { address: evm_utils_1.EvmAddress.create(transfer.address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), fromAddress: evm_utils_1.EvmAddress.create(transfer.from_address), value: core_1.BigNumber.create(transfer.value), blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) { return (__assign(__assign({}, transfer), { address: transfer.address.format(), toAddress: transfer.toAddress.format(), fromAddress: transfer.fromAddress.format(), value: transfer.value.toString(), blockTimestamp: transfer.blockTimestamp.toLocaleString() })); });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, to_block: params.toBlock, from_block: params.fromBlock, from_date: params.fromDate, to_date: params.toDate })); },
});
//# sourceMappingURL=getTokenTransfers.js.map

/***/ }),

/***/ 3086:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTransactionsResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTransactionsResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getTransactions',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transaction) {
            return evm_utils_1.EvmTransactionReceipt.create({
                // Transaction Receipt data
                cumulativeGasUsed: transaction.receipt_cumulative_gas_used,
                gasPrice: transaction.gas_price,
                gasUsed: transaction.receipt_gas_used,
                transactionIndex: +transaction.transaction_index,
                contractAddress: transaction.receipt_contract_address,
                root: transaction.receipt_root,
                status: +transaction.receipt_status,
            }, {
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                data: transaction.input,
                from: transaction.from_address,
                hash: transaction.hash,
                nonce: transaction.nonce,
                value: transaction.value,
                blockHash: transaction.block_hash,
                blockNumber: +transaction.block_number,
                blockTimestamp: new Date(transaction.block_timestamp),
                gasPrice: transaction.gas_price,
                gasLimit: core_1.BigNumber.create(transaction.gas),
                to: transaction.to_address,
                // Not specified in Api response
                accessList: undefined,
                confirmations: undefined,
                maxFeePerGas: undefined,
                maxPriorityFeePerGas: undefined,
                type: undefined,
            });
        });
    },
    resultToJson: function (data) { return data === null || data === void 0 ? void 0 : data.map(function (transaction) { return transaction.toJSON(); }); },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, to_block: params.toBlock, from_block: params.fromBlock, from_date: params.fromDate, to_date: params.toDate })); },
});
//# sourceMappingURL=getTransactions.js.map

/***/ }),

/***/ 3422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTsForContractResolver = exports.getNFTsResolver = exports.getTransactionsResolver = exports.getTokenTransfersResolver = exports.getNFTTransfersResolver = exports.getNativeBalanceResolver = exports.getTokenBalancesResolver = void 0;
var getTokenBalances_1 = __webpack_require__(1085);
Object.defineProperty(exports, "getTokenBalancesResolver", ({ enumerable: true, get: function () { return getTokenBalances_1.getTokenBalancesResolver; } }));
var getNativeBalance_1 = __webpack_require__(6322);
Object.defineProperty(exports, "getNativeBalanceResolver", ({ enumerable: true, get: function () { return getNativeBalance_1.getNativeBalanceResolver; } }));
var getNFTTransfers_1 = __webpack_require__(5316);
Object.defineProperty(exports, "getNFTTransfersResolver", ({ enumerable: true, get: function () { return getNFTTransfers_1.getNFTTransfersResolver; } }));
var getTokenTransfers_1 = __webpack_require__(6100);
Object.defineProperty(exports, "getTokenTransfersResolver", ({ enumerable: true, get: function () { return getTokenTransfers_1.getTokenTransfersResolver; } }));
var getTransactions_1 = __webpack_require__(3086);
Object.defineProperty(exports, "getTransactionsResolver", ({ enumerable: true, get: function () { return getTransactions_1.getTransactionsResolver; } }));
var getNFTs_1 = __webpack_require__(5297);
Object.defineProperty(exports, "getNFTsResolver", ({ enumerable: true, get: function () { return getNFTs_1.getNFTsResolver; } }));
var getNFTsForContract_1 = __webpack_require__(733);
Object.defineProperty(exports, "getNFTsForContractResolver", ({ enumerable: true, get: function () { return getNFTsForContract_1.getNFTsForContractResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3589:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPairAddressResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getPairAddressResolver = new api_utils_1.ApiResolver({
    name: 'getPairAddress',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.token0Address, "/").concat(params.token1Address, "/pairAddress"); },
    apiToResult: function (data, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        return ({
            //   ApiResult types generated all come as undefined which should not be the case TODO:
            token0: {
                token: new evm_utils_1.Erc20Token({
                    contractAddress: ((_a = data.token0) === null || _a === void 0 ? void 0 : _a.address) ? evm_utils_1.EvmAddress.create((_b = data.token0) === null || _b === void 0 ? void 0 : _b.address) : '',
                    decimals: (_d = (_c = data.token0) === null || _c === void 0 ? void 0 : _c.decimals) !== null && _d !== void 0 ? _d : 0,
                    name: (_f = (_e = data.token0) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : '',
                    symbol: (_h = (_g = data.token0) === null || _g === void 0 ? void 0 : _g.symbol) !== null && _h !== void 0 ? _h : '',
                    logo: (_j = data.token0) === null || _j === void 0 ? void 0 : _j.logo,
                    thumbnail: (_k = data.token0) === null || _k === void 0 ? void 0 : _k.thumbnail,
                    chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                }),
                blockNumber: (_l = data.token0) === null || _l === void 0 ? void 0 : _l.block_number,
                validated: (_m = data.token0) === null || _m === void 0 ? void 0 : _m.validated,
                created_at: ((_o = data.token0) === null || _o === void 0 ? void 0 : _o.created_at) ? new Date((_p = data.token0) === null || _p === void 0 ? void 0 : _p.created_at) : undefined,
            },
            token1: {
                token: new evm_utils_1.Erc20Token({
                    contractAddress: ((_q = data.token0) === null || _q === void 0 ? void 0 : _q.address) ? evm_utils_1.EvmAddress.create((_r = data.token0) === null || _r === void 0 ? void 0 : _r.address) : '',
                    decimals: (_t = (_s = data.token1) === null || _s === void 0 ? void 0 : _s.decimals) !== null && _t !== void 0 ? _t : 0,
                    name: (_v = (_u = data.token1) === null || _u === void 0 ? void 0 : _u.name) !== null && _v !== void 0 ? _v : '',
                    symbol: (_x = (_w = data.token1) === null || _w === void 0 ? void 0 : _w.symbol) !== null && _x !== void 0 ? _x : '',
                    logo: (_y = data.token1) === null || _y === void 0 ? void 0 : _y.logo,
                    thumbnail: (_z = data.token1) === null || _z === void 0 ? void 0 : _z.thumbnail,
                    chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                }),
                blockNumber: (_0 = data.token1) === null || _0 === void 0 ? void 0 : _0.block_number,
                validated: (_1 = data.token1) === null || _1 === void 0 ? void 0 : _1.validated,
                created_at: ((_2 = data.token1) === null || _2 === void 0 ? void 0 : _2.created_at) ? new Date((_3 = data.token1) === null || _3 === void 0 ? void 0 : _3.created_at) : undefined,
            },
            pairAddress: data.pairAddress ? evm_utils_1.EvmAddress.create(data.pairAddress) : undefined,
        });
    },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        token0_address: evm_utils_1.EvmAddress.create(params.token0Address).lowercase,
        token1_address: evm_utils_1.EvmAddress.create(params.token1Address).lowercase,
        exchange: params.exchange,
        to_block: params.toBlock,
        to_date: params.toDate,
    }); },
});
//# sourceMappingURL=getPairAddress.js.map

/***/ }),

/***/ 9727:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPairReservesResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getPairReservesResolver = new api_utils_1.ApiResolver({
    name: 'getPairReserves',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.pairAddress, "/reserves"); },
    apiToResult: function (data) { return data; },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        pair_address: evm_utils_1.EvmAddress.create(params.pairAddress).lowercase,
        provider_url: params.providerUrl,
        to_block: params.toBlock,
        to_date: params.toDate,
    }); },
});
//# sourceMappingURL=getPairReserves.js.map

/***/ }),

/***/ 9544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPairAddressResolver = exports.getPairReservesResolver = void 0;
var getPairReserves_1 = __webpack_require__(9727);
Object.defineProperty(exports, "getPairReservesResolver", ({ enumerable: true, get: function () { return getPairReserves_1.getPairReservesResolver; } }));
var getPairAddress_1 = __webpack_require__(3589);
Object.defineProperty(exports, "getPairAddressResolver", ({ enumerable: true, get: function () { return getPairAddress_1.getPairAddressResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 491:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endpointWeightsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
exports.endpointWeightsResolver = new api_utils_1.ApiResolver({
    name: 'endpointWeights',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/info/endpointWeights"); },
    apiToResult: function (data) { return data; },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return params; },
});
//# sourceMappingURL=endpointWeights.js.map

/***/ }),

/***/ 3114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.web3ApiVersionResolver = exports.endpointWeightsResolver = void 0;
var endpointWeights_1 = __webpack_require__(491);
Object.defineProperty(exports, "endpointWeightsResolver", ({ enumerable: true, get: function () { return endpointWeights_1.endpointWeightsResolver; } }));
var web3ApiVersion_1 = __webpack_require__(8865);
Object.defineProperty(exports, "web3ApiVersionResolver", ({ enumerable: true, get: function () { return web3ApiVersion_1.web3ApiVersionResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8865:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.web3ApiVersionResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
exports.web3ApiVersionResolver = new api_utils_1.ApiResolver({
    name: 'web3ApiVersion',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/web3/version"); },
    apiToResult: function (data) { return data; },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return params; },
});
//# sourceMappingURL=web3ApiVersion.js.map

/***/ }),

/***/ 1468:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBlockResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
var apiToResult = function (apiData, params) {
    var data = (0, core_1.toCamelCase)(apiData);
    return __assign(__assign({}, data), { miner: evm_utils_1.EvmAddress.create(data.miner), transactions: data.transactions.map(function (transaction) {
            return evm_utils_1.EvmTransactionReceipt.create({
                // Transaction Receipt data
                cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
                gasPrice: transaction.gasPrice,
                gasUsed: transaction.receiptGasUsed,
                logs: transaction.logs.map(function (log) { return ({
                    address: log.address,
                    blockHash: log.blockHash,
                    blockNumber: +log.blockNumber,
                    data: log.data,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                    transactionHash: log.transactionHash,
                    blockTimestamp: log.blockTimestamp,
                    logIndex: +log.logIndex,
                    transactionIndex: +log.transactionIndex,
                }); }),
                transactionIndex: +transaction.transactionIndex,
                contractAddress: transaction.receiptContractAddress,
                root: transaction.receiptRoot,
                status: +transaction.receiptStatus,
            }, {
                // Transaction Response data
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                data: transaction.input,
                from: transaction.fromAddress,
                hash: transaction.hash,
                nonce: transaction.nonce,
                value: transaction.value,
                blockHash: transaction.blockHash,
                blockNumber: +transaction.blockNumber,
                blockTimestamp: new Date(transaction.blockTimestamp),
                gasPrice: transaction.gasPrice,
                gasLimit: transaction.gas,
                to: transaction.toAddress,
                // Not specified in Api response
                accessList: undefined,
                confirmations: undefined,
                maxFeePerGas: undefined,
                maxPriorityFeePerGas: undefined,
                type: undefined,
            });
        }) });
};
exports.getBlockResolver = new api_utils_1.ApiResolver({
    name: 'getBlock',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/block/").concat(params.blockNumberOrHash); },
    apiToResult: apiToResult,
    resultToJson: function (data) { return (__assign(__assign({}, data), { transactions: data.transactions.map(function (transaction) { return transaction.toJSON(); }), miner: data.miner.format() })); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        block_number_or_hash: params.blockNumberOrHash,
        subdomain: params.subdomain,
    }); },
});
//# sourceMappingURL=getBlock.js.map

/***/ }),

/***/ 4439:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContractEventsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
var method = 'post';
var bodyParams = ['abi'];
exports.getContractEventsResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getContractEvents',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/events"); },
    //   TODO: remove PaginatedResponse when api squad make swagger update
    apiToResult: function (data) {
        return data.result.map(function (event) { return (__assign(__assign({}, event), { address: evm_utils_1.EvmAddress.create(event.address) })); });
    },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        from_block: params.fromBlock,
        to_block: params.toBlock,
        from_date: params.toDate,
        to_date: params.toDate,
        providerUrl: params.providerUrl,
        topic: params.topic,
        limit: params.limit,
        offset: params.offset,
        subdomain: params.subdomain,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        abi: params.abi,
    }); },
    method: method,
    bodyParams: bodyParams,
    bodyType: api_utils_1.BodyType.BODY,
});
//# sourceMappingURL=getContractEvents.js.map

/***/ }),

/***/ 3865:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDateToBlockResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getDateToBlockResolver = new api_utils_1.ApiResolver({
    name: 'getDateToBlock',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/dateToBlock"); },
    apiToResult: function (data) { return (__assign(__assign({}, data), { date: new Date(data.date) })); },
    resultToJson: function (data) { return (__assign(__assign({}, data), { date: data.date.toLocaleDateString() })); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        date: params.date,
    }); },
});
//# sourceMappingURL=getDateToBlock.js.map

/***/ }),

/***/ 4993:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLogsByAddressResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getLogsByAddressResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getLogsByAddress',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/logs"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (log) {
            return new evm_utils_1.EvmTransactionLog(__assign(__assign({}, (0, core_1.toCamelCase)(log)), { 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                topics: [log.topic0, log.topic1, log.topic2, log.topic3], blockNumber: Number(log.block_number) }));
        });
    },
    resultToJson: function (data) { return data === null || data === void 0 ? void 0 : data.map(function (log) { return log.toJSON(); }); },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase })); },
});
//# sourceMappingURL=getLogsByAddress.js.map

/***/ }),

/***/ 5408:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTTransfersByBlockResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTTransfersByBlockResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTTransfersByBlock',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/block/").concat(params.blockNumberOrHash, "/nft/transfers"); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: transfer.contract_type,
                tokenAddress: transfer.token_address,
                tokenId: transfer.token_id,
            }),
            blockNumber: transfer.block_number,
            blockHash: transfer.block_hash,
            transactionHash: transfer.transaction_hash,
            transactionType: transfer.transaction_type,
            transactionIndex: transfer.transaction_index,
            toAddress: evm_utils_1.EvmAddress.create(transfer.to_address),
            operator: transfer.operator ? evm_utils_1.EvmAddress.create(transfer.operator) : null,
            fromAddress: transfer.from_address ? evm_utils_1.EvmAddress.create(transfer.from_address) : null,
            value: transfer.value ? evm_utils_1.EvmNative.create(transfer.value) : null,
            blockTimestamp: new Date(transfer.block_timestamp),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) {
            var _a, _b, _c;
            return (__assign(__assign({}, transfer), { token: transfer.token.toJSON(), toAddress: transfer.toAddress.format(), fromAddress: (_a = transfer.fromAddress) === null || _a === void 0 ? void 0 : _a.format(), operator: (_b = transfer.operator) === null || _b === void 0 ? void 0 : _b.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString(), value: (_c = transfer.value) === null || _c === void 0 ? void 0 : _c.format() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, block_number_or_hash: params.blockNumberOrHash })); },
});
//# sourceMappingURL=getNFTTransfersByBlock.js.map

/***/ }),

/***/ 9967:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTransactionResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTransactionResolver = new api_utils_1.ApiResolver({
    name: 'getTransaction',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/transaction/").concat(params.transactionHash); },
    apiToResult: function (data, params) {
        var transactionReciept = evm_utils_1.EvmTransactionReceipt.create({
            // Transaction Receipt data
            cumulativeGasUsed: data.receipt_cumulative_gas_used,
            gasPrice: data.gas_price,
            gasUsed: data.receipt_gas_used,
            logs: data.logs.map(function (log) { return ({
                address: log.address,
                blockHash: log.block_hash,
                blockNumber: +log.block_number,
                data: log.data,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                transactionHash: log.transaction_hash,
                blockTimestamp: log.block_timestamp,
                logIndex: +log.log_index,
                transactionIndex: +log.transaction_index,
            }); }),
            transactionIndex: +data.transaction_index,
            contractAddress: data.receipt_contract_address,
            root: data.receipt_root,
            status: +data.receipt_status,
        }, {
            // Transaction Response data
            chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
            data: data.input,
            from: data.from_address,
            hash: data.hash,
            nonce: data.nonce,
            value: data.value,
            blockHash: data.block_hash,
            blockNumber: +data.block_number,
            blockTimestamp: new Date(data.block_timestamp),
            gasPrice: data.gas_price,
            gasLimit: data.gas,
            to: data.to_address,
            // Not specified in Api response
            accessList: undefined,
            confirmations: undefined,
            maxFeePerGas: undefined,
            maxPriorityFeePerGas: undefined,
            type: undefined,
        });
        return transactionReciept;
    },
    resultToJson: function (data) { return data.toJSON(); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        subdomain: params.subdomain || undefined,
        transaction_hash: params.transactionHash,
    }); },
});
//# sourceMappingURL=getTransaction.js.map

/***/ }),

/***/ 3183:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContractEventsResolver = exports.getNFTTransfersByBlockResolver = exports.getLogsByAddressResolver = exports.getTransactionResolver = exports.runContractFunctionResolver = exports.getDateToBlockResolver = exports.getBlockResolver = void 0;
var getBlock_1 = __webpack_require__(1468);
Object.defineProperty(exports, "getBlockResolver", ({ enumerable: true, get: function () { return getBlock_1.getBlockResolver; } }));
var getDateToBlock_1 = __webpack_require__(3865);
Object.defineProperty(exports, "getDateToBlockResolver", ({ enumerable: true, get: function () { return getDateToBlock_1.getDateToBlockResolver; } }));
var runContractFunction_1 = __webpack_require__(2800);
Object.defineProperty(exports, "runContractFunctionResolver", ({ enumerable: true, get: function () { return runContractFunction_1.runContractFunctionResolver; } }));
var getTransaction_1 = __webpack_require__(9967);
Object.defineProperty(exports, "getTransactionResolver", ({ enumerable: true, get: function () { return getTransaction_1.getTransactionResolver; } }));
var getLogsByAddress_1 = __webpack_require__(4993);
Object.defineProperty(exports, "getLogsByAddressResolver", ({ enumerable: true, get: function () { return getLogsByAddress_1.getLogsByAddressResolver; } }));
var getNFTTransfersByBlock_1 = __webpack_require__(5408);
Object.defineProperty(exports, "getNFTTransfersByBlockResolver", ({ enumerable: true, get: function () { return getNFTTransfersByBlock_1.getNFTTransfersByBlockResolver; } }));
var getContractEvents_1 = __webpack_require__(4439);
Object.defineProperty(exports, "getContractEventsResolver", ({ enumerable: true, get: function () { return getContractEvents_1.getContractEventsResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2800:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runContractFunctionResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
var method = 'post';
var bodyParams = ['abi', 'params'];
exports.runContractFunctionResolver = new api_utils_1.ApiResolver({
    name: 'runContractFunction',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/").concat(params.address, "/function"); },
    apiToResult: function (data) {
        return data;
    },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        function_name: params.functionName,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        abi: params.abi,
        params: params.params,
    }); },
    method: method,
    bodyParams: bodyParams,
});
//# sourceMappingURL=runContractFunction.js.map

/***/ }),

/***/ 4717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDomainResolver = exports.resolveAddressResolver = void 0;
var resolveAddress_1 = __webpack_require__(8126);
Object.defineProperty(exports, "resolveAddressResolver", ({ enumerable: true, get: function () { return resolveAddress_1.resolveAddressResolver; } }));
var resolveDomain_1 = __webpack_require__(4790);
Object.defineProperty(exports, "resolveDomainResolver", ({ enumerable: true, get: function () { return resolveDomain_1.resolveDomainResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveAddressResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
exports.resolveAddressResolver = new api_utils_1.ApiResolver({
    name: 'resolveAddress',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/resolve/").concat(params.address, "/reverse"); },
    apiToResult: function (data) { return data; },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        address: params.address ? evm_utils_1.EvmAddress.create(params.address).lowercase : undefined,
    }); },
});
//# sourceMappingURL=resolveAddress.js.map

/***/ }),

/***/ 4790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDomainResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
exports.resolveDomainResolver = new api_utils_1.ApiResolver({
    name: 'resolveDomain',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/resolve/").concat(params.domain); },
    apiToResult: function (data) { return ({
        address: evm_utils_1.EvmAddress.create(data.address),
    }); },
    resultToJson: function (data) { return ({
        address: data.address.format(),
    }); },
    parseParams: function (params) { return params; },
});
//# sourceMappingURL=resolveDomain.js.map

/***/ }),

/***/ 2750:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uploadFolderResolver = void 0;
var uploadFolder_1 = __webpack_require__(2844);
Object.defineProperty(exports, "uploadFolderResolver", ({ enumerable: true, get: function () { return uploadFolder_1.uploadFolderResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2844:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uploadFolderResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
var method = 'post';
var bodyParams = ['abi'];
exports.uploadFolderResolver = new api_utils_1.ApiResolver({
    name: 'uploadFolder',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/ipfs/uploadFolder"); },
    apiToResult: function (data) {
        return data;
    },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return (__assign({}, params)); },
    method: method,
    bodyParams: bodyParams,
    bodyType: api_utils_1.BodyType.BODY,
});
//# sourceMappingURL=uploadFolder.js.map

/***/ }),

/***/ 4109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllTokenIdsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getAllTokenIdsResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getAllTokenIds',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                name: nft.name,
                tokenHash: nft.token_hash,
                symbol: nft.symbol,
            }),
            syncedAt: nft.synced_at ? new Date(nft.synced_at) : undefined,
            amount: nft.amount,
            blockNumberMinted: nft.block_number_minted,
            lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
            lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) {
            var _a, _b;
            return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: (_a = nft.lastMetadataSync) === null || _a === void 0 ? void 0 : _a.toLocaleDateString(), lastTokenUriSync: (_b = nft.lastTokenUriSync) === null || _b === void 0 ? void 0 : _b.toLocaleDateString() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase })); },
});
//# sourceMappingURL=getAllTokenIds.js.map

/***/ }),

/***/ 6417:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContractNFTTransfersResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getContractNFTTransfersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getContractNFTTransfers',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { tokenAddress: evm_utils_1.EvmAddress.create(transfer.to_address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), operator: transfer.operator ? evm_utils_1.EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? evm_utils_1.EvmAddress.create(transfer.from_address) : null, value: transfer.value ? evm_utils_1.EvmNative.create(transfer.value) : null, blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) {
            var _a, _b, _c;
            return (__assign(__assign({}, transfer), { tokenAddress: transfer.tokenAddress.format(), toAddress: transfer.toAddress.format(), fromAddress: (_a = transfer.fromAddress) === null || _a === void 0 ? void 0 : _a.format(), operator: (_b = transfer.operator) === null || _b === void 0 ? void 0 : _b.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString(), value: (_c = transfer.value) === null || _c === void 0 ? void 0 : _c.format() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase })); },
});
//# sourceMappingURL=getContractNFTTransfers.js.map

/***/ }),

/***/ 620:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTLowestPriceResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTLowestPriceResolver = new api_utils_1.ApiResolver({
    name: 'getNFTLowestPrice',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/lowestprice"); },
    apiToResult: function (data) { return (__assign(__assign({}, (0, core_1.toCamelCase)(data)), { sellerAddress: evm_utils_1.EvmAddress.create(data.seller_address), buyerAddress: evm_utils_1.EvmAddress.create(data.buyer_address), marketplaceAddress: evm_utils_1.EvmAddress.create(data.marketplace_address), tokenAddress: evm_utils_1.EvmAddress.create(data.token_address), price: evm_utils_1.EvmNative.create(data.price), blockTimestamp: new Date(data.block_timestamp) })); },
    resultToJson: function (data) { return (__assign(__assign({}, data), { sellerAddress: data.sellerAddress.format(), buyerAddress: data.buyerAddress.format(), marketplaceAddress: data.marketplaceAddress.format(), blockTimestamp: data.blockTimestamp.toLocaleString(), price: data.price.format() })); },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, provider_url: params.providerUrl })); },
});
//# sourceMappingURL=getNFTLowestPrice.js.map

/***/ }),

/***/ 894:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTMetadataResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
exports.getNFTMetadataResolver = new api_utils_1.ApiResolver({
    name: 'getNFTMetadata',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/metadata"); },
    apiToResult: function (data) { return (__assign(__assign({}, (0, core_1.toCamelCase)(data)), { tokenAddress: evm_utils_1.EvmAddress.create(data.token_address), syncedAt: data.synced_at ? new Date(data.synced_at) : undefined })); },
    resultToJson: function (data) {
        var _a;
        return (__assign(__assign({}, data), { tokenAddress: data.tokenAddress.format(), syncedAt: (_a = data.syncedAt) === null || _a === void 0 ? void 0 : _a.toDateString() }));
    },
    parseParams: function (params) { return ({
        chain: params.chain ? evm_utils_1.EvmChain.create(params.chain).apiHex : undefined,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
    }); },
});
//# sourceMappingURL=getNFTMetadata.js.map

/***/ }),

/***/ 9985:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTOwnersResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTOwnersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTOwners',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/owners"); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                name: nft.name,
                symbol: nft.symbol,
                tokenHash: nft.token_hash,
            }),
            blockNumberMinted: nft.block_number_minted,
            blockNumber: nft.block_number,
            ownerOf: evm_utils_1.EvmAddress.create(nft.owner_of),
            amount: nft.amount,
            lastMetadataSync: new Date(nft.last_metadata_sync),
            lastTokenUriSync: new Date(nft.last_token_uri_sync),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) {
            var _a, _b;
            return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: (_a = nft.lastMetadataSync) === null || _a === void 0 ? void 0 : _a.toLocaleDateString(), lastTokenUriSync: (_b = nft.lastTokenUriSync) === null || _b === void 0 ? void 0 : _b.toLocaleDateString() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase })); },
});
//# sourceMappingURL=getNFTOwners.js.map

/***/ }),

/***/ 6728:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTTradesResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNFTTradesResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNFTTrades',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/trades"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (trade) { return (__assign(__assign({}, (0, core_1.toCamelCase)(trade)), { sellerAddress: evm_utils_1.EvmAddress.create(trade.seller_address), buyerAddress: evm_utils_1.EvmAddress.create(trade.buyer_address), marketplaceAddress: evm_utils_1.EvmAddress.create(trade.marketplace_address), tokenAddress: evm_utils_1.EvmAddress.create(trade.token_address), price: evm_utils_1.EvmNative.create(trade.price), blockTimestamp: new Date(trade.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (trade) { return (__assign(__assign({}, trade), { sellerAddress: trade.sellerAddress.format(), buyerAddress: trade.buyerAddress.format(), marketplaceAddress: trade.marketplaceAddress.format(), blockTimestamp: trade.blockTimestamp.toLocaleString(), price: trade.price.format() })); });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, to_block: params.toBlock, from_block: params.fromBlock, from_date: params.fromDate, to_date: params.toDate, provider_url: params.providerUrl })); },
});
//# sourceMappingURL=getNFTTrades.js.map

/***/ }),

/***/ 6029:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNftTransfersFromToBlockResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getNftTransfersFromToBlockResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getNftTransfersFromToBlock',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/nft/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { tokenAddress: evm_utils_1.EvmAddress.create(transfer.to_address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), operator: transfer.operator ? evm_utils_1.EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? evm_utils_1.EvmAddress.create(transfer.from_address) : null, value: transfer.value ? evm_utils_1.EvmNative.create(transfer.value) : null, blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) {
            var _a, _b, _c;
            return (__assign(__assign({}, transfer), { tokenAddress: transfer.tokenAddress.format(), toAddress: transfer.toAddress.format(), fromAddress: (_a = transfer.fromAddress) === null || _a === void 0 ? void 0 : _a.format(), operator: (_b = transfer.operator) === null || _b === void 0 ? void 0 : _b.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString(), value: (_c = transfer.value) === null || _c === void 0 ? void 0 : _c.format() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, to_block: params.toBlock, from_block: params.fromBlock, from_date: params.fromDate, to_date: params.toDate })); },
});
//# sourceMappingURL=getNftTransfersFromToBlock.js.map

/***/ }),

/***/ 7084:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenAddressTransfersResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenAddressTransfersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getTokenAddressTransfers',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/erc20/").concat(params.address, "/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { address: evm_utils_1.EvmAddress.create(transfer.address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), fromAddress: evm_utils_1.EvmAddress.create(transfer.from_address), value: evm_utils_1.Erc20Value.create(transfer.value), blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) { return (__assign(__assign({}, transfer), { address: transfer.address.format(), toAddress: transfer.toAddress.format(), fromAddress: transfer.fromAddress.format(), value: transfer.value.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString() })); });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, to_block: params.toBlock, from_block: params.fromBlock, from_date: params.fromDate, to_date: params.toDate })); },
});
//# sourceMappingURL=getTokenAddressTransfers.js.map

/***/ }),

/***/ 8138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenAllowanceResolver = void 0;
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var api_utils_1 = __webpack_require__(3520);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenAllowanceResolver = new api_utils_1.ApiResolver({
    name: 'getTokenAllowance',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/erc20/").concat(params.address, "/allowance"); },
    apiToResult: function (data) { return ({
        allowance: core_1.BigNumber.create(data.allowance),
    }); },
    resultToJson: function (data) { return ({
        allowance: data.allowance.toString(),
    }); },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, owner_address: evm_utils_1.EvmAddress.create(params.ownerAddress).lowercase, spender_address: evm_utils_1.EvmAddress.create(params.spenderAddress).lowercase })); },
});
//# sourceMappingURL=getTokenAllowance.js.map

/***/ }),

/***/ 2027:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenIdMetadataResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenIdMetadataResolver = new api_utils_1.ApiResolver({
    name: 'getTokenIdMetadata',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/").concat(params.tokenId); },
    apiToResult: function (data, params) { return ({
        token: new evm_utils_1.EvmNFT({
            chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
            contractType: data.contract_type,
            tokenAddress: data.token_address,
            tokenId: data.token_id,
            tokenUri: data.token_uri,
            metadata: data.metadata,
            name: data.name,
            symbol: data.symbol,
            tokenHash: data.token_hash,
        }),
        amount: data.amount,
        ownerOf: evm_utils_1.EvmAddress.create(data.owner_of),
        blockNumberMinted: data.block_number_minted,
        blockNumber: data.block_number,
        lastMetadataSync: data.last_metadata_sync ? new Date(data.last_metadata_sync) : undefined,
        lastTokenUriSync: data.last_token_uri_sync ? new Date(data.last_token_uri_sync) : undefined,
    }); },
    resultToJson: function (data) {
        var _a, _b;
        return (__assign(__assign({}, data), { token: data.token.toJSON(), lastMetadataSync: (_a = data.lastMetadataSync) === null || _a === void 0 ? void 0 : _a.toLocaleDateString(), lastTokenUriSync: (_b = data.lastTokenUriSync) === null || _b === void 0 ? void 0 : _b.toLocaleDateString() }));
    },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        token_id: params.tokenId,
        format: params.format,
    }); },
});
//# sourceMappingURL=getTokenIdMetadata.js.map

/***/ }),

/***/ 8931:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenIdOwnersResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenIdOwnersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getTokenIdOwners',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/").concat(params.tokenId, "/owners"); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                name: nft.name,
                symbol: nft.symbol,
                tokenHash: nft.token_hash,
            }),
            blockNumberMinted: nft.block_number_minted,
            blockNumber: nft.block_number,
            ownerOf: evm_utils_1.EvmAddress.create(nft.owner_of),
            amount: nft.amount,
            lastMetadataSync: new Date(nft.last_metadata_sync),
            lastTokenUriSync: new Date(nft.last_token_uri_sync),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) { return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: nft.lastMetadataSync.toLocaleDateString(), lastTokenUriSync: nft.lastTokenUriSync.toLocaleDateString() })); });
    },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        token_id: params.tokenId,
        cursor: params.cursor,
        format: params.format,
        limit: params.limit,
    }); },
});
//# sourceMappingURL=getTokenIdOwners.js.map

/***/ }),

/***/ 6004:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenMetadataResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenMetadataResolver = new api_utils_1.ApiResolver({
    name: 'getTokenMetadata',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/erc20/metadata"); },
    apiToResult: function (data, params) {
        return data.map(function (token) {
            var tokenType = new evm_utils_1.Erc20Token(__assign(__assign({}, (0, core_1.toCamelCase)(token)), { contractAddress: token.address, chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain) }));
            return {
                token: tokenType,
                blockNumber: token.block_number,
                validated: token.validated,
            };
        });
    },
    resultToJson: function (data) { return data.map(function (item) { return (__assign(__assign({}, item), { token: item.token.toJSON() })); }); },
    parseParams: function (params) { return ({
        providerUrl: params.providerUrl || undefined,
        subdomain: params.subdomain || undefined,
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        addresses: params.addresses.map(function (address) { return evm_utils_1.EvmAddress.create(address).lowercase; }),
    }); },
});
//# sourceMappingURL=getTokenMetadata.js.map

/***/ }),

/***/ 5373:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenMetadataBySymbolResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenMetadataBySymbolResolver = new api_utils_1.ApiResolver({
    name: 'getTokenMetadataBySymbol',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/erc20/metadata/symbols"); },
    apiToResult: function (data, params) {
        return data.map(function (token) {
            var erc20token = new evm_utils_1.Erc20Token(__assign(__assign({}, (0, core_1.toCamelCase)(token)), { contractAddress: token.address, chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain) }));
            return {
                token: erc20token,
                blockNumber: token.block_number,
                validated: token.validated,
            };
        });
    },
    resultToJson: function (data) { return data.map(function (result) { return (__assign(__assign({}, result), { token: result.token.toJSON() })); }); },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex })); },
});
//# sourceMappingURL=getTokenMetadataBySymbol.js.map

/***/ }),

/***/ 525:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokenPriceResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getTokenPriceResolver = new api_utils_1.ApiResolver({
    name: 'getTokenPrice',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/erc20/").concat(params.address, "/price"); },
    apiToResult: function (data) {
        var _a, _b, _c;
        return (__assign(__assign({}, (0, core_1.toCamelCase)(data)), { nativePrice: ((_a = data.nativePrice) === null || _a === void 0 ? void 0 : _a.value) ? evm_utils_1.EvmNative.create((_b = data.nativePrice) === null || _b === void 0 ? void 0 : _b.value, (_c = data.nativePrice) === null || _c === void 0 ? void 0 : _c.decimals) : null, exchangeAddress: data.exchangeAddress ? evm_utils_1.EvmAddress.create(data.exchangeAddress) : null }));
    },
    resultToJson: function (data) { return (__assign(__assign({}, data), { exchangeAddress: data.exchangeAddress ? data.exchangeAddress.format() : null, nativePrice: data.nativePrice ? data.nativePrice.format() : null })); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        exchange: params.exchange,
        to_block: params.toBlock,
        providerUrl: params.providerUrl,
    }); },
});
//# sourceMappingURL=getTokenPrice.js.map

/***/ }),

/***/ 1157:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWalletTokenIdTransfersResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var core_1 = __webpack_require__(4243);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.getWalletTokenIdTransfersResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'getWalletTokenIdTransfers',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/").concat(params.tokenId, "/transfers"); },
    apiToResult: function (data) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (transfer) { return (__assign(__assign({}, (0, core_1.toCamelCase)(transfer)), { tokenAddress: evm_utils_1.EvmAddress.create(transfer.to_address), toAddress: evm_utils_1.EvmAddress.create(transfer.to_address), operator: transfer.operator ? evm_utils_1.EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? evm_utils_1.EvmAddress.create(transfer.from_address) : null, value: transfer.value ? evm_utils_1.EvmNative.create(transfer.value) : null, blockTimestamp: new Date(transfer.block_timestamp) })); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (transfer) {
            var _a, _b, _c;
            return (__assign(__assign({}, transfer), { tokenAddress: transfer.tokenAddress.format(), toAddress: transfer.toAddress.format(), fromAddress: (_a = transfer.fromAddress) === null || _a === void 0 ? void 0 : _a.format(), operator: (_b = transfer.operator) === null || _b === void 0 ? void 0 : _b.format(), blockTimestamp: transfer.blockTimestamp.toLocaleString(), value: (_c = transfer.value) === null || _c === void 0 ? void 0 : _c.format() }));
        });
    },
    parseParams: function (params) { return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, address: evm_utils_1.EvmAddress.create(params.address).lowercase, token_id: params.tokenId })); },
});
//# sourceMappingURL=getWalletTokenIdTransfers.js.map

/***/ }),

/***/ 6639:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.syncNFTContractResolver = exports.getNFTMetadataResolver = exports.getTokenIdMetadataResolver = exports.getTokenIdOwnersResolver = exports.getNFTOwnersResolver = exports.searchNFTsResolver = exports.getTokenMetadataBySymbolResolver = exports.getWalletTokenIdTransfersResolver = exports.getNFTLowestPriceResolver = exports.getNFTTradesResolver = exports.getTokenAddressTransfersResolver = exports.getNftTransfersFromToBlockResolver = exports.getContractNFTTransfersResolver = exports.getAllTokenIdsResolver = exports.reSyncMetadataResolver = exports.getTokenPriceResolver = exports.getTokenAllowanceResolver = exports.getTokenMetadataResolver = void 0;
var getTokenMetadata_1 = __webpack_require__(6004);
Object.defineProperty(exports, "getTokenMetadataResolver", ({ enumerable: true, get: function () { return getTokenMetadata_1.getTokenMetadataResolver; } }));
var getTokenAllowance_1 = __webpack_require__(8138);
Object.defineProperty(exports, "getTokenAllowanceResolver", ({ enumerable: true, get: function () { return getTokenAllowance_1.getTokenAllowanceResolver; } }));
var getTokenPrice_1 = __webpack_require__(525);
Object.defineProperty(exports, "getTokenPriceResolver", ({ enumerable: true, get: function () { return getTokenPrice_1.getTokenPriceResolver; } }));
var reSyncMetadata_1 = __webpack_require__(211);
Object.defineProperty(exports, "reSyncMetadataResolver", ({ enumerable: true, get: function () { return reSyncMetadata_1.reSyncMetadataResolver; } }));
var getAllTokenIds_1 = __webpack_require__(4109);
Object.defineProperty(exports, "getAllTokenIdsResolver", ({ enumerable: true, get: function () { return getAllTokenIds_1.getAllTokenIdsResolver; } }));
var getContractNFTTransfers_1 = __webpack_require__(6417);
Object.defineProperty(exports, "getContractNFTTransfersResolver", ({ enumerable: true, get: function () { return getContractNFTTransfers_1.getContractNFTTransfersResolver; } }));
var getNftTransfersFromToBlock_1 = __webpack_require__(6029);
Object.defineProperty(exports, "getNftTransfersFromToBlockResolver", ({ enumerable: true, get: function () { return getNftTransfersFromToBlock_1.getNftTransfersFromToBlockResolver; } }));
var getTokenAddressTransfers_1 = __webpack_require__(7084);
Object.defineProperty(exports, "getTokenAddressTransfersResolver", ({ enumerable: true, get: function () { return getTokenAddressTransfers_1.getTokenAddressTransfersResolver; } }));
var getNFTTrades_1 = __webpack_require__(6728);
Object.defineProperty(exports, "getNFTTradesResolver", ({ enumerable: true, get: function () { return getNFTTrades_1.getNFTTradesResolver; } }));
var getNFTLowestPrice_1 = __webpack_require__(620);
Object.defineProperty(exports, "getNFTLowestPriceResolver", ({ enumerable: true, get: function () { return getNFTLowestPrice_1.getNFTLowestPriceResolver; } }));
var getWalletTokenIdTransfers_1 = __webpack_require__(1157);
Object.defineProperty(exports, "getWalletTokenIdTransfersResolver", ({ enumerable: true, get: function () { return getWalletTokenIdTransfers_1.getWalletTokenIdTransfersResolver; } }));
var getTokenMetadataBySymbol_1 = __webpack_require__(5373);
Object.defineProperty(exports, "getTokenMetadataBySymbolResolver", ({ enumerable: true, get: function () { return getTokenMetadataBySymbol_1.getTokenMetadataBySymbolResolver; } }));
var searchNFTs_1 = __webpack_require__(9924);
Object.defineProperty(exports, "searchNFTsResolver", ({ enumerable: true, get: function () { return searchNFTs_1.searchNFTsResolver; } }));
var getNFTOwners_1 = __webpack_require__(9985);
Object.defineProperty(exports, "getNFTOwnersResolver", ({ enumerable: true, get: function () { return getNFTOwners_1.getNFTOwnersResolver; } }));
var getTokenIdOwners_1 = __webpack_require__(8931);
Object.defineProperty(exports, "getTokenIdOwnersResolver", ({ enumerable: true, get: function () { return getTokenIdOwners_1.getTokenIdOwnersResolver; } }));
var getTokenIdMetadata_1 = __webpack_require__(2027);
Object.defineProperty(exports, "getTokenIdMetadataResolver", ({ enumerable: true, get: function () { return getTokenIdMetadata_1.getTokenIdMetadataResolver; } }));
var getNFTMetadata_1 = __webpack_require__(894);
Object.defineProperty(exports, "getNFTMetadataResolver", ({ enumerable: true, get: function () { return getNFTMetadata_1.getNFTMetadataResolver; } }));
var syncNFTContract_1 = __webpack_require__(1996);
Object.defineProperty(exports, "syncNFTContractResolver", ({ enumerable: true, get: function () { return syncNFTContract_1.syncNFTContractResolver; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 211:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reSyncMetadataResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.reSyncMetadataResolver = new api_utils_1.ApiResolver({
    name: 'reSyncMetadata',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/").concat(params.tokenId, "/metadata/resync"); },
    apiToResult: function (data) { return (__assign({}, data)); },
    resultToJson: function (data) { return data; },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
        token_id: params.tokenId,
        flag: params.flag,
        mode: params.mode,
    }); },
});
//# sourceMappingURL=reSyncMetadata.js.map

/***/ }),

/***/ 9924:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.searchNFTsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
exports.searchNFTsResolver = new api_utils_1.ApiPaginatedResolver({
    name: 'searchNFTs',
    getUrl: function () { return "".concat(EvmApi_1.BASE_URL, "/nft/search"); },
    apiToResult: function (data, params) {
        var _a;
        return (_a = data.result) === null || _a === void 0 ? void 0 : _a.map(function (nft) { return ({
            token: new evm_utils_1.EvmNFT({
                chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain),
                contractType: nft.contract_type,
                tokenAddress: nft.token_address,
                tokenId: nft.token_id,
                tokenUri: nft.token_uri,
                metadata: nft.metadata,
                tokenHash: nft.token_hash,
            }),
            tokenHash: nft.token_hash,
            blockNumberMinted: nft.block_number_minted,
            lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
            lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
            batchId: nft.batch_id,
            frozen: nft.frozen,
            frozenLogIndex: nft.frozen_log_index,
            imported: nft.imported,
            isValid: nft.is_valid,
            openseaLookup: nft.opensea_lookup,
            resyncing: nft.resyncing,
            syncing: nft.syncing,
            updatedAt: new Date(nft.updatedAt),
        }); });
    },
    resultToJson: function (data) {
        return data === null || data === void 0 ? void 0 : data.map(function (nft) {
            var _a, _b;
            return (__assign(__assign({}, nft), { token: nft.token.toJSON(), lastMetadataSync: (_a = nft.lastMetadataSync) === null || _a === void 0 ? void 0 : _a.toLocaleDateString(), lastTokenUriSync: (_b = nft.lastTokenUriSync) === null || _b === void 0 ? void 0 : _b.toLocaleDateString(), updatedAt: nft.updatedAt.toLocaleDateString() }));
        });
    },
    parseParams: function (params) {
        var _a;
        return (__assign(__assign({}, params), { chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex, addresses: (_a = params.addresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return evm_utils_1.EvmAddress.create(address).lowercase; }) }));
    },
});
//# sourceMappingURL=searchNFTs.js.map

/***/ }),

/***/ 1996:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.syncNFTContractResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var evm_utils_1 = __webpack_require__(9977);
var EvmApi_1 = __webpack_require__(9769);
var EvmChainResolver_1 = __webpack_require__(435);
var method = 'put';
exports.syncNFTContractResolver = new api_utils_1.ApiResolver({
    name: 'syncNFTContract',
    getUrl: function (params) { return "".concat(EvmApi_1.BASE_URL, "/nft/").concat(params.address, "/sync"); },
    apiToResult: function (data) { return ({
        success: true,
    }); },
    resultToJson: function (data) { return ({
        success: true,
    }); },
    parseParams: function (params) { return ({
        chain: EvmChainResolver_1.EvmChainResolver.resolve(params.chain).apiHex,
        address: evm_utils_1.EvmAddress.create(params.address).lowercase,
    }); },
    method: method,
});
//# sourceMappingURL=syncNFTContract.js.map

/***/ }),

/***/ 5438:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisEvmUtils = void 0;
var core_1 = __webpack_require__(4243);
var EvmUtilsConfigSetup_1 = __webpack_require__(1778);
var MoralisEvmUtils = /** @class */ (function (_super) {
    __extends(MoralisEvmUtils, _super);
    function MoralisEvmUtils(core) {
        return _super.call(this, MoralisEvmUtils.moduleName, core) || this;
    }
    MoralisEvmUtils.create = function (core) {
        return new MoralisEvmUtils(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisEvmUtils.prototype.setup = function () {
        EvmUtilsConfigSetup_1.EvmUtilsConfigSetup.register(this.core.config);
    };
    MoralisEvmUtils.prototype.start = function () {
        // Nothing
    };
    MoralisEvmUtils.moduleName = 'evmUtils';
    return MoralisEvmUtils;
}(core_1.Module));
exports.MoralisEvmUtils = MoralisEvmUtils;
//# sourceMappingURL=MoralisEvmUtils.js.map

/***/ }),

/***/ 4362:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmUtilsConfig = void 0;
exports.EvmUtilsConfig = {
    formatEvmChainId: {
        name: 'formatEvmChainId',
        defaultValue: 'hex',
    },
    formatEvmAddress: {
        name: 'formatEvmAddress',
        defaultValue: 'lowercase',
    },
};
//# sourceMappingURL=EvmUtilsConfig.js.map

/***/ }),

/***/ 1778:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmUtilsConfigSetup = void 0;
var EvmUtilsConfig_1 = __webpack_require__(4362);
var EvmUtilsConfigSetup = /** @class */ (function () {
    function EvmUtilsConfigSetup() {
    }
    EvmUtilsConfigSetup.register = function (config) {
        config.registerKey(EvmUtilsConfig_1.EvmUtilsConfig.formatEvmAddress);
        config.registerKey(EvmUtilsConfig_1.EvmUtilsConfig.formatEvmChainId);
    };
    return EvmUtilsConfigSetup;
}());
exports.EvmUtilsConfigSetup = EvmUtilsConfigSetup;
//# sourceMappingURL=EvmUtilsConfigSetup.js.map

/***/ }),

/***/ 494:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Erc20Value = void 0;
var core_1 = __webpack_require__(4243);
var EVM_ERC20_DEFAULT_DECIMALS = 18;
/**
 * The Erc20Value class is a MoralisData that references to a the value of an Erc20Token
 * It holds data about the data about the amount of tokens and the number of decimals.
 */
var Erc20Value = /** @class */ (function () {
    function Erc20Value(amount, decimals) {
        if (decimals === void 0) { decimals = EVM_ERC20_DEFAULT_DECIMALS; }
        this._value = Erc20Value.parse({
            amount: amount,
            decimals: decimals,
        });
    }
    Erc20Value.create = function (value, decimals) {
        if (value instanceof Erc20Value) {
            return value;
        }
        return new Erc20Value(value, decimals);
    };
    Erc20Value.equals = function (valueA, valueB) {
        var erc20ValueA = Erc20Value.create(valueA);
        var erc20ValueB = Erc20Value.create(valueB);
        return erc20ValueA.value.equals(erc20ValueB.value);
    };
    Erc20Value.prototype.equals = function (value) {
        return Erc20Value.equals(this, value);
    };
    Object.defineProperty(Erc20Value.prototype, "decimals", {
        get: function () {
            return this._value.decimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Value.prototype, "amount", {
        get: function () {
            return this._value.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Value.prototype, "value", {
        get: function () {
            return core_1.BigNumber.fromDecimal(this._value.amount.toString(), this._value.decimals);
        },
        enumerable: false,
        configurable: true
    });
    Erc20Value.prototype.toString = function () {
        return this.value.toString();
    };
    Erc20Value.prototype.format = function () {
        return this.toString();
    };
    Erc20Value.parse = function (value) { return ({
        amount: value.amount,
        decimals: +value.decimals,
    }); };
    return Erc20Value;
}());
exports.Erc20Value = Erc20Value;
//# sourceMappingURL=Erc20Value.js.map

/***/ }),

/***/ 8856:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(494), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1559:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Erc20Token = void 0;
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmChain_1 = __webpack_require__(43);
/**
 * The Erc20Token class is a MoralisData that references to a Erc20 Token
 * It holds data about the data and metadata of an Erc20 token
 */
var Erc20Token = /** @class */ (function () {
    function Erc20Token(value) {
        this._value = Erc20Token.parse(value);
    }
    Erc20Token.create = function (value) {
        if (value instanceof Erc20Token) {
            return value;
        }
        return new Erc20Token(value);
    };
    Erc20Token.equals = function (valueA, valueB) {
        var erc20A = Erc20Token.create(valueA);
        var erc20B = Erc20Token.create(valueB);
        if (!erc20A._value.chain.equals(erc20B._value.chain)) {
            return false;
        }
        if (!erc20A._value.contractAddress.equals(erc20B._value.contractAddress)) {
            return false;
        }
        return true;
    };
    Erc20Token.prototype.equals = function (value) {
        return Erc20Token.equals(this, value);
    };
    Erc20Token.prototype.toJSON = function () {
        var value = this._value;
        return __assign(__assign({}, value), { contractAddress: value.contractAddress.format(), chain: value.chain.format() });
    };
    Erc20Token.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Token.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Token.parse = function (value) { return ({
        decimals: (0, core_1.maybe)(value.decimals, function (value) { return +value; }),
        name: value.name,
        symbol: value.symbol,
        contractAddress: EvmAddress_1.EvmAddress.create(value.contractAddress),
        logo: (0, core_1.maybe)(value.logo),
        logoHash: (0, core_1.maybe)(value.logoHash),
        thumbnail: (0, core_1.maybe)(value.thumbnail),
        chain: EvmChain_1.EvmChain.create(value.chain),
    }); };
    return Erc20Token;
}());
exports.Erc20Token = Erc20Token;
//# sourceMappingURL=Erc20.js.map

/***/ }),

/***/ 1339:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1559), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4827:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmAddress = void 0;
var core_1 = __webpack_require__(4243);
var address_1 = __webpack_require__(1541);
var EvmUtilsConfig_1 = __webpack_require__(4362);
/**
 * The EvmAddress class is a MoralisData that references to a EVM address
 * A new instance can be created via `EvmAddress.create(address)`, where the provided chain can be a valid address (in lowercase or checksum)
 */
var EvmAddress = /** @class */ (function () {
    function EvmAddress(address, config) {
        this.config = config;
        this._value = EvmAddress.parse(address);
    }
    EvmAddress.create = function (address, core) {
        if (address instanceof EvmAddress) {
            return address;
        }
        var finalCore = core || core_1.MoralisCoreProvider.getDefault();
        return new EvmAddress(address, finalCore.config);
    };
    /**
     * Parse the input to a value that is compatible with the internal _value
     */
    EvmAddress.parse = function (address) {
        if (!(0, address_1.isAddress)(address)) {
            throw new core_1.MoralisCoreError({
                code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                message: 'Invalid address provided',
            });
        }
        return (0, address_1.getAddress)(address);
    };
    Object.defineProperty(EvmAddress.prototype, "checksum", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmAddress.prototype, "lowercase", {
        get: function () {
            return this._value.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    EvmAddress.equals = function (addressA, addressB) {
        return EvmAddress.create(addressA)._value === EvmAddress.create(addressB)._value;
    };
    EvmAddress.prototype.equals = function (address) {
        return EvmAddress.equals(this, address);
    };
    EvmAddress.prototype.format = function (_formatStyle) {
        var formatStyle = _formatStyle !== null && _formatStyle !== void 0 ? _formatStyle : this.config.get(EvmUtilsConfig_1.EvmUtilsConfig.formatEvmAddress);
        if (formatStyle === 'checksum') {
            return this.checksum;
        }
        if (formatStyle === 'lowercase') {
            return this.lowercase;
        }
        throw new core_1.MoralisCoreError({
            code: core_1.CoreErrorCode.INVALID_ARGUMENT,
            message: 'Cannot format address, invalid config.formatAddress',
        });
    };
    return EvmAddress;
}());
exports.EvmAddress = EvmAddress;
//# sourceMappingURL=EvmAddress.js.map

/***/ }),

/***/ 4142:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4827), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 83:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmChain = void 0;
var chaindata_1 = __webpack_require__(1385);
var EvmChainParser_1 = __webpack_require__(3607);
var core_1 = __webpack_require__(4243);
var EvmUtilsConfig_1 = __webpack_require__(4362);
/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * A new instance can be created via `EvmChain.create(chain)`, where the provided chain can be a valid chain number (1),
 * hex-string ("0x1"), or any suppored ChainName
 */
var EvmChain = /** @class */ (function () {
    function EvmChain(value, config) {
        var _this = this;
        var _a;
        this.config = config;
        this._value = EvmChainParser_1.EvmChainParser.parse(value);
        this._chainlistData = (_a = chaindata_1.chainList.find(function (chainData) { return chainData.chainId === _this.decimal; })) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Accepts a {@link EvmChainish} value and returns a new EvmChain or an already existing EvmChain
     */
    EvmChain.create = function (chain, core) {
        if (chain instanceof EvmChain) {
            return chain;
        }
        var c = core || core_1.MoralisCoreProvider.getDefault();
        return new EvmChain(chain, c.config);
    };
    /**
     * Getter to return _chainlistData and throws an error if it is not defined
     */
    EvmChain.prototype._getChainlistData = function () {
        if (!this._chainlistData) {
            return null;
        }
        return this._chainlistData;
    };
    Object.defineProperty(EvmChain.prototype, "decimal", {
        /**
         * Returns the decimal representation of the chain
         */
        get: function () {
            return parseInt(this._value, 16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "hex", {
        /**
         * Returns the hex-string representation of the chain
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "apiHex", {
        /**
         * Validate and cast to api compatible hex
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Compares if 2 chains are equal, based on the chainId
     */
    EvmChain.equals = function (chainA, chainB) {
        return EvmChain.create(chainA)._value === EvmChain.create(chainB)._value;
    };
    /**
     * Compares if the current chain is equal to the provided chain, based on the chainId
     */
    EvmChain.prototype.equals = function (chain) {
        return EvmChain.equals(this, chain);
    };
    /**
     * Formats the chain to the given output; in decimal value or as hex-string.
     * The default formatting can be set in MoralisConfig
     */
    EvmChain.prototype.format = function (_formatStyle) {
        var formatStyle = _formatStyle !== null && _formatStyle !== void 0 ? _formatStyle : this.config.get(EvmUtilsConfig_1.EvmUtilsConfig.formatEvmChainId);
        if (formatStyle === 'decimal') {
            return this.decimal;
        }
        if (formatStyle === 'hex') {
            return this.hex;
        }
        return (0, core_1.assertUnreachable)(formatStyle);
    };
    EvmChain.prototype.display = function () {
        return this.name ? "".concat(this.name, " (").concat(this.hex, ")") : this.hex;
    };
    Object.defineProperty(EvmChain.prototype, "name", {
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "currency", {
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.nativeCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "rpcUrls", {
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.rpc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "explorer", {
        get: function () {
            var _a;
            var explorers = (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.explorers;
            if (!explorers || explorers.length === 0) {
                return null;
            }
            return explorers[0];
        },
        enumerable: false,
        configurable: true
    });
    EvmChain.prototype.getExplorerPath = function (value) {
        var explorer = this.explorer;
        if (!explorer || explorer.standard !== 'EIP3091') {
            return null;
        }
        var url = explorer.url;
        // See https://eips.ethereum.org/EIPS/eip-3091 for paths
        if ('block' in value) {
            return "".concat(url, "/block/").concat(value.block);
        }
        if ('transaction' in value) {
            return "".concat(url, "/tx/").concat(value.transaction);
        }
        if ('account' in value) {
            return "".concat(url, "/address/").concat(value.account);
        }
        if ('erc20' in value) {
            return "".concat(url, "/token/").concat(value.erc20);
        }
        return null;
    };
    return EvmChain;
}());
exports.EvmChain = EvmChain;
//# sourceMappingURL=EvmChain.js.map

/***/ }),

/***/ 3607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmChainParser = void 0;
var core_1 = __webpack_require__(4243);
var isSupportedChainName = function (value) {
    return value in chainNameToChainIdMap;
};
var chainNameToChainIdMap = {
    eth: '0x1',
    ropsten: '0x3',
    rinkeby: '0x4',
    goerli: '0x5',
    kovan: '0x2a',
    polygon: '0x89',
    mumbai: '0x13881',
    bsc: '0x38',
    'bsc testnet': '0x61',
    avalanche: '0xa86a',
    'avalanche testnet': '0xa869',
    fantom: '0xfa',
};
var EvmChainParser = /** @class */ (function () {
    function EvmChainParser() {
    }
    EvmChainParser.parse = function (chain) {
        if (typeof chain === 'string') {
            if (isSupportedChainName(chain)) {
                return chainNameToChainIdMap[chain];
            }
            if (chain.startsWith('0x') && chain !== '0x' && chain !== '0x0') {
                return chain;
            }
            throw new core_1.MoralisCoreError({
                code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
            });
        }
        if (chain <= 0) {
            throw new core_1.MoralisCoreError({
                code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
            });
        }
        return "0x".concat(chain.toString(16));
    };
    return EvmChainParser;
}());
exports.EvmChainParser = EvmChainParser;
//# sourceMappingURL=EvmChainParser.js.map

/***/ }),

/***/ 7436:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EvmChainish.js.map

/***/ }),

/***/ 43:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(83), exports);
__exportStar(__webpack_require__(7436), exports);
__exportStar(__webpack_require__(3607), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8848:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmNFT = exports.ContractType = void 0;
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmChain_1 = __webpack_require__(43);
var ContractType;
(function (ContractType) {
    ContractType["ERC721"] = "ERC721";
    ContractType["ERC1155"] = "ERC1155";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
/**
 * The EvmNFT class is a MoralisData that references to a the NFT of the type; Erc721 or Erc1155
 */
var EvmNFT = /** @class */ (function () {
    function EvmNFT(value) {
        this._value = EvmNFT.parse(value);
    }
    EvmNFT.validateType = function (value) {
        switch (value.toUpperCase()) {
            case ContractType.ERC1155:
                return ContractType.ERC1155;
            case ContractType.ERC721:
                return ContractType.ERC721;
            default:
                throw new core_1.MoralisCoreError({
                    code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                    message: 'Invalid contract type provided',
                });
        }
    };
    EvmNFT.create = function (value) {
        if (value instanceof EvmNFT) {
            return value;
        }
        return new EvmNFT(value);
    };
    EvmNFT.equals = function (valueA, valueB) {
        var nftA = EvmNFT.create(valueA);
        var nftB = EvmNFT.create(valueB);
        if (!nftA._value.chain.equals(nftB._value.chain)) {
            return false;
        }
        if (!nftA._value.tokenAddress.equals(nftB._value.tokenAddress)) {
            return false;
        }
        return true;
    };
    EvmNFT.prototype.equals = function (value) {
        return EvmNFT.equals(this, value);
    };
    EvmNFT.prototype.toJSON = function () {
        var value = this._value;
        return __assign(__assign({}, value), { tokenAddress: value.tokenAddress.format(), chain: value.chain.format() });
    };
    EvmNFT.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNFT.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    var _a;
    _a = EvmNFT;
    EvmNFT.parse = function (value) { return (__assign(__assign({}, value), { chain: EvmChain_1.EvmChain.create(value.chain), contractType: _a.validateType(value.contractType), tokenAddress: EvmAddress_1.EvmAddress.create(value.tokenAddress), metadata: (0, core_1.maybe)(value.metadata, _a.validateMetadata), tokenUri: (0, core_1.maybe)(value.tokenUri), tokenHash: (0, core_1.maybe)(value.tokenHash), name: (0, core_1.maybe)(value.name), symbol: (0, core_1.maybe)(value.symbol) })); };
    EvmNFT.validateMetadata = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            throw new core_1.MoralisCoreError({
                code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                message: 'Invalid metadata provided, cannot parse the value to JSON',
            });
        }
    };
    return EvmNFT;
}());
exports.EvmNFT = EvmNFT;
//# sourceMappingURL=EvmNFT.js.map

/***/ }),

/***/ 9609:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8848), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6314:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmNative = void 0;
var core_1 = __webpack_require__(4243);
var unitToDecimals = {
    ether: 18,
    finney: 15,
    szabo: 12,
    gwei: 9,
    mwei: 6,
    kwei: 3,
    wei: 0,
};
/**
 * The EvmNative class is a MoralisData that references to a the value of a native currency (like ETH, BNB etc.)
 */
var EvmNative = /** @class */ (function () {
    function EvmNative(native, unit) {
        if (unit === void 0) { unit = 'ether'; }
        this.rawValue = EvmNative.parse(native, unit);
    }
    EvmNative.create = function (native, unit) {
        if (native instanceof EvmNative) {
            return native;
        }
        return new EvmNative(native, unit);
    };
    EvmNative.parse = function (native, unit) {
        var decimals;
        if (typeof unit === 'number') {
            decimals = unit;
        }
        else {
            if (unitToDecimals[unit] == null) {
                throw new core_1.MoralisCoreError({
                    code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                    message: 'Unit should be a decimal number or valid EvmNativeUnit string',
                });
            }
            decimals = unitToDecimals[unit];
        }
        return core_1.BigNumber.fromDecimal(native.toString(), decimals);
    };
    EvmNative.equals = function (valueA, valueB) {
        var evmNativeA = EvmNative.create(valueA);
        var evmNativeB = EvmNative.create(valueB);
        return evmNativeA.rawValue.equals(evmNativeB.rawValue);
    };
    EvmNative.prototype.equals = function (value) {
        return EvmNative.equals(this, value);
    };
    Object.defineProperty(EvmNative.prototype, "value", {
        get: function () {
            return this.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "wei", {
        get: function () {
            return this.value.toString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "gwei", {
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['gwei']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "ether", {
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['ether']);
        },
        enumerable: false,
        configurable: true
    });
    EvmNative.prototype.toString = function () {
        return this.wei;
    };
    EvmNative.prototype.format = function () {
        return this.toString();
    };
    return EvmNative;
}());
exports.EvmNative = EvmNative;
//# sourceMappingURL=EvmNative.js.map

/***/ }),

/***/ 3912:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6314), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5119:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmTransactionLog = void 0;
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmTransactionLog = /** @class */ (function () {
    function EvmTransactionLog(value) {
        this._value = EvmTransactionLog.parse(value);
    }
    EvmTransactionLog.parse = function (value) {
        return {
            logIndex: (0, core_1.maybe)(value.logIndex),
            transactionHash: value.transactionHash,
            transactionIndex: (0, core_1.maybe)(value.transactionIndex),
            data: value.data,
            topics: value.topics,
            blockHash: value.blockHash,
            blockNumber: value.blockNumber,
            blockTimestamp: value.blockTimestamp,
            address: EvmAddress_1.EvmAddress.create(value.address),
        };
    };
    EvmTransactionLog.create = function (value) {
        return new EvmTransactionLog(value);
    };
    EvmTransactionLog.prototype.equals = function (value) {
        return (value._value.transactionHash === this._value.transactionHash &&
            value._value.address.equals(this._value.address) &&
            value._value.logIndex === this._value.logIndex);
    };
    EvmTransactionLog.prototype.toJSON = function () {
        var value = this._value;
        return __assign(__assign({}, value), { address: value.address.format() });
    };
    EvmTransactionLog.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmTransactionLog.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransactionLog;
}());
exports.EvmTransactionLog = EvmTransactionLog;
//# sourceMappingURL=EvmTransactionLog.js.map

/***/ }),

/***/ 1838:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5119), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7877:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmTransactionReceipt = void 0;
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmNative_1 = __webpack_require__(3912);
var EvmTransactionLog_1 = __webpack_require__(1838);
var EvmTransactionResponse_1 = __webpack_require__(6247);
/**
 * The EvmTransaction class is a MoralisData that references a confirmed Evm transaction,
 * that has been sent to the network.
 *
 * @see EvmTransaction for an unpublished transaction that has to be sent to to the network
 * @see EvmTransactionResponse for a published transaction that has been sent to the network
 */
var EvmTransactionReceipt = /** @class */ (function () {
    function EvmTransactionReceipt(value, transaction) {
        this._value = EvmTransactionReceipt.parse(value, transaction);
    }
    EvmTransactionReceipt.create = function (value, transaction) {
        if (value instanceof EvmTransactionReceipt) {
            return value;
        }
        return new EvmTransactionReceipt(value, EvmTransactionResponse_1.EvmTransactionResponse.create(transaction));
    };
    EvmTransactionReceipt.parse = function (value, transaction) {
        var _a;
        return __assign(__assign({}, value), { transactionIndex: value.transactionIndex, contractAddress: (0, core_1.maybe)(value.contractAddress, EvmAddress_1.EvmAddress.create), gasUsed: core_1.BigNumber.create(value.gasUsed), cumulativeGasUsed: core_1.BigNumber.create(value.cumulativeGasUsed), gasPrice: core_1.BigNumber.create(value.gasPrice), logs: (_a = value.logs) === null || _a === void 0 ? void 0 : _a.map(function (log) { return EvmTransactionLog_1.EvmTransactionLog.create(log); }), root: (0, core_1.maybe)(value.root), status: (0, core_1.maybe)(value.status), transaction: transaction });
    };
    Object.defineProperty(EvmTransactionReceipt.prototype, "totalGasCost", {
        get: function () {
            return EvmNative_1.EvmNative.create(this._value.cumulativeGasUsed.mul(this._value.gasPrice), 'wei');
        },
        enumerable: false,
        configurable: true
    });
    EvmTransactionReceipt.equals = function (transactionReceiptA, transactionReceiptB) {
        if (!transactionReceiptA._value.transaction.equals(transactionReceiptB._value.transaction)) {
            return false;
        }
        if (transactionReceiptA._value.status !== transactionReceiptB._value.status) {
            return false;
        }
        return true;
    };
    EvmTransactionReceipt.prototype.equals = function (value) {
        return EvmTransactionReceipt.equals(this, value);
    };
    EvmTransactionReceipt.prototype.toJSON = function () {
        var _a, _b;
        var value = this._value;
        return __assign(__assign({}, value), { contractAddress: (_a = value.contractAddress) === null || _a === void 0 ? void 0 : _a.format(), gasUsed: value.gasUsed.toString(), cumulativeGasUsed: value.cumulativeGasUsed.toString(), gasPrice: value.gasPrice.toString(), logs: (_b = value.logs) === null || _b === void 0 ? void 0 : _b.map(function (log) { return log.toJSON(); }), transaction: value.transaction.toJSON() });
    };
    EvmTransactionReceipt.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmTransactionReceipt.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransactionReceipt;
}());
exports.EvmTransactionReceipt = EvmTransactionReceipt;
//# sourceMappingURL=EvmTransactionReceipt.js.map

/***/ }),

/***/ 8292:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EvmTransactionReceiptTypes.js.map

/***/ }),

/***/ 9795:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7877), exports);
__exportStar(__webpack_require__(8292), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6247:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmTransactionResponse = void 0;
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmChain_1 = __webpack_require__(43);
var EvmNative_1 = __webpack_require__(3912);
/**
 * The EvmTransaction class is a MoralisData that references an Evm transaction response,
 * that has been sent to the network.
 *
 * @see EvmTransaction for an unpublished transaction that has to be sent to to the network
 * @see EvmTransactionReceipt for a confirmed transaction
 */
var EvmTransactionResponse = /** @class */ (function () {
    function EvmTransactionResponse(value, resolveCall) {
        var _this = this;
        this.receipt = null;
        this.wait = function (confirmations) {
            if (confirmations === void 0) { confirmations = 1; }
            return __awaiter(_this, void 0, void 0, function () {
                var receipt, error_1, message, ethError, details;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._resolveCall) {
                                throw new core_1.MoralisCoreError({
                                    code: core_1.CoreErrorCode.METHOD_FAILED,
                                    message: 'Cannot send transaction, no supported call method provided',
                                });
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._resolveCall(this, confirmations)];
                        case 2:
                            receipt = _a.sent();
                            this.receipt = receipt;
                            return [2 /*return*/, receipt];
                        case 3:
                            error_1 = _a.sent();
                            message = "Failed waiting for transaction confirmation.";
                            if (error_1 instanceof Error) {
                                ethError = error_1;
                                details = {};
                                if (ethError.reason) {
                                    message += " Reason: ".concat(ethError.reason);
                                    details.reason = ethError.reason;
                                }
                                if (ethError.cancelled) {
                                    details.cancelled = ethError.cancelled;
                                }
                                if (ethError.replacement) {
                                    details.replacement = ethError.replacement;
                                }
                                if (ethError.receipt) {
                                    details.receipt = ethError.receipt;
                                }
                                throw new core_1.MoralisCoreError({
                                    code: core_1.CoreErrorCode.METHOD_FAILED,
                                    message: message,
                                    cause: error_1,
                                    details: details,
                                });
                            }
                            throw new core_1.MoralisCoreError({
                                code: core_1.CoreErrorCode.METHOD_FAILED,
                                message: message,
                            });
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this._value = EvmTransactionResponse.parse(value);
        this._resolveCall = resolveCall;
    }
    EvmTransactionResponse.create = function (value, resolveCall) {
        if (value instanceof EvmTransactionResponse) {
            return value;
        }
        return new EvmTransactionResponse(value, resolveCall);
    };
    EvmTransactionResponse.parse = function (value) {
        return {
            hash: value.hash,
            nonce: core_1.BigNumber.create(value.nonce || 0),
            chain: EvmChain_1.EvmChain.create(value.chain),
            from: EvmAddress_1.EvmAddress.create(value.from),
            to: (0, core_1.maybe)(value.to, EvmAddress_1.EvmAddress.create),
            value: (0, core_1.maybe)(value.value, function (val) { return EvmNative_1.EvmNative.create(val, 'wei'); }),
            confirmations: (0, core_1.maybe)(value.confirmations),
            blockNumber: (0, core_1.maybe)(value.blockNumber),
            blockHash: (0, core_1.maybe)(value.blockHash),
            blockTimestamp: (0, core_1.maybe)(value.blockTimestamp, function (value) { return (value instanceof Date ? value : new Date(value)); }),
            gasLimit: (0, core_1.maybe)(value.gasLimit, core_1.BigNumber.create),
            gasPrice: (0, core_1.maybe)(value.gasPrice, core_1.BigNumber.create),
            data: (0, core_1.maybe)(value.data),
            type: (0, core_1.maybe)(value.type),
            maxPriorityFeePerGas: (0, core_1.maybe)(value.maxPriorityFeePerGas, core_1.BigNumber.create),
            maxFeePerGas: (0, core_1.maybe)(value.maxFeePerGas, core_1.BigNumber.create),
        };
    };
    EvmTransactionResponse.equals = function (valueA, valueB) {
        var transactionResponseA = EvmTransactionResponse.create(valueA);
        var transactionResponseB = EvmTransactionResponse.create(valueB);
        if (!transactionResponseA._value.chain.equals(transactionResponseB._value.chain)) {
            return false;
        }
        if (transactionResponseA._value.blockNumber !== transactionResponseB._value.blockNumber) {
            return false;
        }
        if (transactionResponseA._value.hash !== transactionResponseB._value.hash) {
            return false;
        }
        return true;
    };
    EvmTransactionResponse.prototype.equals = function (value) {
        return EvmTransactionResponse.equals(this, value);
    };
    EvmTransactionResponse.prototype.toJSON = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var value = this._value;
        return __assign(__assign({}, value), { nonce: value.nonce.toString(), chain: value.chain.format(), from: value.from.format(), to: (_a = value.from) === null || _a === void 0 ? void 0 : _a.format(), value: value.value.toString(), gasLimit: (_c = (_b = value.gasLimit) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null, gasPrice: (_e = (_d = value.gasPrice) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null, maxPriorityFeePerGas: (_f = value.maxPriorityFeePerGas) === null || _f === void 0 ? void 0 : _f.toString(), maxFeePerGas: (_g = value.maxFeePerGas) === null || _g === void 0 ? void 0 : _g.toString() });
    };
    EvmTransactionResponse.prototype.format = function () {
        return this._value.hash;
    };
    Object.defineProperty(EvmTransactionResponse.prototype, "exporerUrl", {
        get: function () {
            return this._value.chain.getExplorerPath({ transaction: this._value.hash });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionResponse.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransactionResponse;
}());
exports.EvmTransactionResponse = EvmTransactionResponse;
//# sourceMappingURL=EvmTransactionResponse.js.map

/***/ }),

/***/ 71:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EvmTransactionResponseTypes.js.map

/***/ }),

/***/ 6130:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6247), exports);
__exportStar(__webpack_require__(71), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3881:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvmTransaction = void 0;
var transactions_1 = __webpack_require__(954);
var core_1 = __webpack_require__(4243);
var EvmAddress_1 = __webpack_require__(4142);
var EvmChain_1 = __webpack_require__(43);
var EvmNative_1 = __webpack_require__(3912);
/**
 * The EvmTransaction class is a MoralisData that references an Evm transaction request,
 * that is meant to be sent to the network.
 *
 * @see EvmTransactionResponse for a published transaction that has been sent to the network
 * @see EvmTransactionReceipt for a confirmed transaction
 */
var EvmTransaction = /** @class */ (function () {
    function EvmTransaction(value, sendCall) {
        var _this = this;
        this.send = function () {
            if (!_this._sendCall) {
                throw new core_1.MoralisCoreError({
                    code: core_1.CoreErrorCode.GENERIC_CORE_ERROR,
                    message: 'Cannot send transaction, no supported call method provided',
                });
            }
            return _this._sendCall(_this);
        };
        this._value = EvmTransaction.parse(value);
        this._sendCall = sendCall;
    }
    EvmTransaction.create = function (transaction, sendCall) {
        if (transaction instanceof EvmTransaction) {
            return transaction;
        }
        return new EvmTransaction(transaction, sendCall);
    };
    EvmTransaction.parse = function (value) {
        return {
            to: (0, core_1.maybe)(value.to, EvmAddress_1.EvmAddress.create),
            from: (0, core_1.maybe)(value.from, EvmAddress_1.EvmAddress.create),
            nonce: (0, core_1.maybe)(value.nonce, core_1.BigNumber.create),
            gasLimit: (0, core_1.maybe)(value.gasLimit, core_1.BigNumber.create),
            gasPrice: (0, core_1.maybe)(value.gasPrice, core_1.BigNumber.create),
            data: (0, core_1.maybe)(value.data),
            value: (0, core_1.maybe)(value.value, function (val) { return EvmNative_1.EvmNative.create(val, 'wei'); }),
            chain: (0, core_1.maybe)(value.chain, EvmChain_1.EvmChain.create),
            type: (0, core_1.maybe)(value.type),
            accessList: (0, core_1.maybe)(value.accessList, transactions_1.accessListify),
            maxPriorityFeePerGas: (0, core_1.maybe)(value.maxPriorityFeePerGas, core_1.BigNumber.create),
            maxFeePerGas: (0, core_1.maybe)(value.maxFeePerGas, core_1.BigNumber.create),
        };
    };
    EvmTransaction.equals = function (providedTransactionA, providedTransactionB) {
        var transactionA = EvmTransaction.create(providedTransactionA);
        var transactionB = EvmTransaction.create(providedTransactionB);
        if (JSON.stringify(transactionA.toJSON()) === JSON.stringify(transactionB.toJSON())) {
            return true;
        }
        return false;
    };
    EvmTransaction.prototype.equals = function (value) {
        return EvmTransaction.equals(this, value);
    };
    EvmTransaction.prototype.toEthRequest = function () {
        var _a, _b, _c;
        var _d = this._value, chain = _d.chain, value = __rest(_d, ["chain"]);
        return __assign(__assign({}, value), { to: (_a = value.to) === null || _a === void 0 ? void 0 : _a.checksum, from: (_b = value.from) === null || _b === void 0 ? void 0 : _b.checksum, chainId: chain === null || chain === void 0 ? void 0 : chain.decimal, value: (_c = value.value) === null || _c === void 0 ? void 0 : _c.format() });
    };
    EvmTransaction.prototype.toJSON = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var value = this._value;
        var out = __assign(__assign({}, value), { to: (_a = value.to) === null || _a === void 0 ? void 0 : _a.format(), from: (_b = value.from) === null || _b === void 0 ? void 0 : _b.format(), nonce: (_c = value.nonce) === null || _c === void 0 ? void 0 : _c.toString(), gasLimit: (_d = value.gasLimit) === null || _d === void 0 ? void 0 : _d.toString(), gasPrice: (_e = value.gasPrice) === null || _e === void 0 ? void 0 : _e.toString(), value: (_f = value.value) === null || _f === void 0 ? void 0 : _f.toString(), chain: (_g = value.chain) === null || _g === void 0 ? void 0 : _g.format(), maxPriorityFeePerGas: (_h = value.maxPriorityFeePerGas) === null || _h === void 0 ? void 0 : _h.toString(), maxFeePerGas: (_j = value.maxFeePerGas) === null || _j === void 0 ? void 0 : _j.toString() });
        return out;
    };
    EvmTransaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmTransaction.prototype, "result", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransaction;
}());
exports.EvmTransaction = EvmTransaction;
//# sourceMappingURL=EvmTransaction.js.map

/***/ }),

/***/ 4063:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EvmTransactionTypes.js.map

/***/ }),

/***/ 7048:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3881), exports);
__exportStar(__webpack_require__(4063), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5779:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1339), exports);
__exportStar(__webpack_require__(8856), exports);
__exportStar(__webpack_require__(4142), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(3912), exports);
__exportStar(__webpack_require__(9609), exports);
__exportStar(__webpack_require__(7048), exports);
__exportStar(__webpack_require__(1838), exports);
__exportStar(__webpack_require__(9795), exports);
__exportStar(__webpack_require__(6130), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1385:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.chainList = void 0;
// Sourced from https://chainid.network/chains.json
exports.chainList = [
    {
        name: 'Ethereum Mainnet',
        chain: 'ETH',
        icon: 'ethereum',
        rpc: [
            'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
            'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
            'https://api.mycryptoapi.com/eth',
            'https://cloudflare-eth.com',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://ethereum.org',
        shortName: 'eth',
        chainId: 1,
        networkId: 1,
        slip44: 60,
        ens: {
            registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
        explorers: [
            {
                name: 'etherscan',
                url: 'https://etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Expanse Network',
        chain: 'EXP',
        rpc: ['https://node.expanse.tech'],
        faucets: [],
        nativeCurrency: {
            name: 'Expanse Network Ether',
            symbol: 'EXP',
            decimals: 18,
        },
        infoURL: 'https://expanse.tech',
        shortName: 'exp',
        chainId: 2,
        networkId: 1,
        slip44: 40,
    },
    {
        name: 'Ropsten',
        title: 'Ethereum Testnet Ropsten',
        chain: 'ETH',
        network: 'testnet',
        rpc: ['https://ropsten.infura.io/v3/${INFURA_API_KEY}', 'wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}'],
        faucets: ['http://fauceth.komputing.org?chain=3&address=${ADDRESS}', 'https://faucet.ropsten.be?${ADDRESS}'],
        nativeCurrency: {
            name: 'Ropsten Ether',
            symbol: 'ROP',
            decimals: 18,
        },
        infoURL: 'https://github.com/ethereum/ropsten',
        shortName: 'rop',
        chainId: 3,
        networkId: 3,
        ens: {
            registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
        },
        explorers: [
            {
                name: 'etherscan',
                url: 'https://ropsten.etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Rinkeby',
        title: 'Ethereum Testnet Rinkeby',
        chain: 'ETH',
        network: 'testnet',
        rpc: ['https://rinkeby.infura.io/v3/${INFURA_API_KEY}', 'wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}'],
        faucets: ['http://fauceth.komputing.org?chain=4&address=${ADDRESS}', 'https://faucet.rinkeby.io'],
        nativeCurrency: {
            name: 'Rinkeby Ether',
            symbol: 'RIN',
            decimals: 18,
        },
        infoURL: 'https://www.rinkeby.io',
        shortName: 'rin',
        chainId: 4,
        networkId: 4,
        ens: {
            registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
        },
        explorers: [
            {
                name: 'etherscan-rinkeby',
                url: 'https://rinkeby.etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Görli',
        title: 'Ethereum Testnet Görli',
        chain: 'ETH',
        network: 'testnet',
        rpc: [
            'https://goerli.infura.io/v3/${INFURA_API_KEY}',
            'wss://goerli.infura.io/v3/${INFURA_API_KEY}',
            'https://rpc.goerli.mudit.blog/',
        ],
        faucets: [
            'http://fauceth.komputing.org?chain=5&address=${ADDRESS}',
            'https://goerli-faucet.slock.it?address=${ADDRESS}',
            'https://faucet.goerli.mudit.blog',
        ],
        nativeCurrency: {
            name: 'Görli Ether',
            symbol: 'GOR',
            decimals: 18,
        },
        infoURL: 'https://goerli.net/#about',
        shortName: 'gor',
        chainId: 5,
        networkId: 5,
        ens: {
            registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
        },
        explorers: [
            {
                name: 'etherscan-goerli',
                url: 'https://goerli.etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ethereum Classic Testnet Kotti',
        chain: 'ETC',
        rpc: ['https://www.ethercluster.com/kotti'],
        faucets: [],
        nativeCurrency: {
            name: 'Kotti Ether',
            symbol: 'KOT',
            decimals: 18,
        },
        infoURL: 'https://explorer.jade.builders/?network=kotti',
        shortName: 'kot',
        chainId: 6,
        networkId: 6,
    },
    {
        name: 'ThaiChain',
        chain: 'TCH',
        rpc: ['https://rpc.dome.cloud'],
        faucets: [],
        nativeCurrency: {
            name: 'ThaiChain Ether',
            symbol: 'TCH',
            decimals: 18,
        },
        infoURL: 'https://thaichain.io',
        shortName: 'tch',
        chainId: 7,
        networkId: 7,
    },
    {
        name: 'Ubiq',
        chain: 'UBQ',
        rpc: ['https://rpc.octano.dev', 'https://pyrus2.ubiqscan.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Ubiq Ether',
            symbol: 'UBQ',
            decimals: 18,
        },
        infoURL: 'https://ubiqsmart.com',
        shortName: 'ubq',
        chainId: 8,
        networkId: 8,
        slip44: 108,
        explorers: [
            {
                name: 'ubiqscan',
                url: 'https://ubiqscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ubiq Network Testnet',
        chain: 'UBQ',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Ubiq Testnet Ether',
            symbol: 'TUBQ',
            decimals: 18,
        },
        infoURL: 'https://ethersocial.org',
        shortName: 'tubq',
        chainId: 9,
        networkId: 2,
    },
    {
        name: 'Optimism',
        chain: 'ETH',
        rpc: ['https://mainnet.optimism.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://optimism.io',
        shortName: 'oeth',
        chainId: 10,
        networkId: 10,
        explorers: [
            {
                name: 'etherscan',
                url: 'https://optimistic.etherscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Metadium Mainnet',
        chain: 'META',
        rpc: ['https://api.metadium.com/prod'],
        faucets: [],
        nativeCurrency: {
            name: 'Metadium Mainnet Ether',
            symbol: 'META',
            decimals: 18,
        },
        infoURL: 'https://metadium.com',
        shortName: 'meta',
        chainId: 11,
        networkId: 11,
        slip44: 916,
    },
    {
        name: 'Metadium Testnet',
        chain: 'META',
        rpc: ['https://api.metadium.com/dev'],
        faucets: [],
        nativeCurrency: {
            name: 'Metadium Testnet Ether',
            symbol: 'KAL',
            decimals: 18,
        },
        infoURL: 'https://metadium.com',
        shortName: 'kal',
        chainId: 12,
        networkId: 12,
    },
    {
        name: 'Diode Testnet Staging',
        chain: 'DIODE',
        rpc: ['https://staging.diode.io:8443/', 'wss://staging.diode.io:8443/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'Staging Diodes',
            symbol: 'sDIODE',
            decimals: 18,
        },
        infoURL: 'https://diode.io/staging',
        shortName: 'dstg',
        chainId: 13,
        networkId: 13,
    },
    {
        name: 'Flare Mainnet',
        chain: 'FLR',
        icon: 'flare',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Spark',
            symbol: 'FLR',
            decimals: 18,
        },
        infoURL: 'https://flare.xyz',
        shortName: 'flr',
        chainId: 14,
        networkId: 14,
    },
    {
        name: 'Diode Prenet',
        chain: 'DIODE',
        rpc: ['https://prenet.diode.io:8443/', 'wss://prenet.diode.io:8443/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'Diodes',
            symbol: 'DIODE',
            decimals: 18,
        },
        infoURL: 'https://diode.io/prenet',
        shortName: 'diode',
        chainId: 15,
        networkId: 15,
    },
    {
        name: 'Flare Testnet Coston',
        chain: 'FLR',
        rpc: ['https://coston-api.flare.network/ext/bc/C/rpc'],
        faucets: ['https://faucet.towolabs.com', 'https://fauceth.komputing.org?chain=16&address=${ADDRESS}'],
        nativeCurrency: {
            name: 'Coston Spark',
            symbol: 'CFLR',
            decimals: 18,
        },
        infoURL: 'https://flare.xyz',
        shortName: 'cflr',
        chainId: 16,
        networkId: 16,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://coston-explorer.flare.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'ThaiChain 2.0 ThaiFi',
        chain: 'TCH',
        rpc: ['https://rpc.thaifi.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Thaifi Ether',
            symbol: 'TFI',
            decimals: 18,
        },
        infoURL: 'https://exp.thaifi.com',
        shortName: 'tfi',
        chainId: 17,
        networkId: 17,
    },
    {
        name: 'ThunderCore Testnet',
        chain: 'TST',
        rpc: ['https://testnet-rpc.thundercore.com'],
        faucets: ['https://faucet-testnet.thundercore.com'],
        nativeCurrency: {
            name: 'ThunderCore Testnet Ether',
            symbol: 'TST',
            decimals: 18,
        },
        infoURL: 'https://thundercore.com',
        shortName: 'TST',
        chainId: 18,
        networkId: 18,
        explorers: [
            {
                name: 'ThundercoreTestNetScanner',
                url: 'https://scan-testnet.thundercore.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Songbird Canary-Network',
        chain: 'SGB',
        icon: 'songbird',
        rpc: [
            'https://songbird.towolabs.com/rpc',
            'https://sgb.ftso.com.au/ext/bc/C/rpc',
            'https://sgb.lightft.so/rpc',
            'https://sgb-rpc.ftso.eu',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Songbird',
            symbol: 'SGB',
            decimals: 18,
        },
        infoURL: 'https://flare.xyz',
        shortName: 'sgb',
        chainId: 19,
        networkId: 19,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://songbird-explorer.flare.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Elastos Smart Chain',
        chain: 'ETH',
        rpc: ['https://api.elastos.io/eth'],
        faucets: ['https://faucet.elastos.org/'],
        nativeCurrency: {
            name: 'Elastos',
            symbol: 'ELA',
            decimals: 18,
        },
        infoURL: 'https://www.elastos.org/',
        shortName: 'elaeth',
        chainId: 20,
        networkId: 20,
        explorers: [
            {
                name: 'elastos eth explorer',
                url: 'https://eth.elastos.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'ELA-ETH-Sidechain Testnet',
        chain: 'ETH',
        rpc: ['https://rpc.elaeth.io'],
        faucets: ['https://faucet.elaeth.io/'],
        nativeCurrency: {
            name: 'Elastos',
            symbol: 'tELA',
            decimals: 18,
        },
        infoURL: 'https://elaeth.io/',
        shortName: 'elaetht',
        chainId: 21,
        networkId: 21,
    },
    {
        name: 'ELA-DID-Sidechain Mainnet',
        chain: 'ETH',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Elastos',
            symbol: 'ELA',
            decimals: 18,
        },
        infoURL: 'https://www.elastos.org/',
        shortName: 'eladid',
        chainId: 22,
        networkId: 22,
    },
    {
        name: 'ELA-DID-Sidechain Testnet',
        chain: 'ETH',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Elastos',
            symbol: 'tELA',
            decimals: 18,
        },
        infoURL: 'https://elaeth.io/',
        shortName: 'eladidt',
        chainId: 23,
        networkId: 23,
    },
    {
        name: 'Dithereum Mainnet',
        chain: 'DTH',
        icon: 'dithereum',
        rpc: ['https://node-mainnet.dithereum.io'],
        faucets: ['https://faucet.dithereum.org'],
        nativeCurrency: {
            name: 'Dither',
            symbol: 'DTH',
            decimals: 18,
        },
        infoURL: 'https://dithereum.org',
        shortName: 'dthmainnet',
        chainId: 24,
        networkId: 24,
    },
    {
        name: 'Cronos Mainnet Beta',
        chain: 'CRO',
        rpc: ['https://evm.cronos.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Cronos',
            symbol: 'CRO',
            decimals: 18,
        },
        infoURL: 'https://cronos.org/',
        shortName: 'cro',
        chainId: 25,
        networkId: 25,
        explorers: [
            {
                name: 'Cronos Explorer',
                url: 'https://cronos.org/explorer',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Genesis L1 testnet',
        chain: 'genesis',
        rpc: ['https://testrpc.genesisl1.org'],
        faucets: [],
        nativeCurrency: {
            name: 'L1 testcoin',
            symbol: 'L1test',
            decimals: 18,
        },
        infoURL: 'https://www.genesisl1.com',
        shortName: 'L1test',
        chainId: 26,
        networkId: 26,
        explorers: [
            {
                name: 'Genesis L1 testnet explorer',
                url: 'https://testnet.genesisl1.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'ShibaChain',
        chain: 'SHIB',
        rpc: ['https://rpc.shibachain.net'],
        faucets: [],
        nativeCurrency: {
            name: 'SHIBA INU COIN',
            symbol: 'SHIB',
            decimals: 18,
        },
        infoURL: 'https://www.shibachain.net',
        shortName: 'shib',
        chainId: 27,
        networkId: 27,
        explorers: [
            {
                name: 'Shiba Explorer',
                url: 'https://exp.shibachain.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Boba Network Rinkeby Testnet',
        chain: 'ETH',
        rpc: ['https://rinkeby.boba.network/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://boba.network',
        shortName: 'Boba Rinkeby',
        chainId: 28,
        networkId: 28,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://blockexplorer.rinkeby.boba.network',
                standard: 'none',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-4',
            bridges: [
                {
                    url: 'https://gateway.rinkeby.boba.network',
                },
            ],
        },
    },
    {
        name: 'Genesis L1',
        chain: 'genesis',
        rpc: ['https://rpc.genesisl1.org'],
        faucets: [],
        nativeCurrency: {
            name: 'L1 coin',
            symbol: 'L1',
            decimals: 18,
        },
        infoURL: 'https://www.genesisl1.com',
        shortName: 'L1',
        chainId: 29,
        networkId: 29,
        explorers: [
            {
                name: 'Genesis L1 blockchain explorer',
                url: 'https://explorer.genesisl1.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'RSK Mainnet',
        chain: 'RSK',
        rpc: ['https://public-node.rsk.co', 'https://mycrypto.rsk.co'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'RSK Mainnet Ether',
            symbol: 'RBTC',
            decimals: 18,
        },
        infoURL: 'https://rsk.co',
        shortName: 'rsk',
        chainId: 30,
        networkId: 30,
        slip44: 137,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.rsk.co',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'RSK Testnet',
        chain: 'RSK',
        rpc: ['https://public-node.testnet.rsk.co', 'https://mycrypto.testnet.rsk.co'],
        faucets: ['https://faucet.testnet.rsk.co'],
        nativeCurrency: {
            name: 'RSK Testnet Ether',
            symbol: 'tRBTC',
            decimals: 18,
        },
        infoURL: 'https://rsk.co',
        shortName: 'trsk',
        chainId: 31,
        networkId: 31,
    },
    {
        name: 'GoodData Testnet',
        chain: 'GooD',
        rpc: ['https://test2.goodata.io'],
        faucets: [],
        nativeCurrency: {
            name: 'GoodData Testnet Ether',
            symbol: 'GooD',
            decimals: 18,
        },
        infoURL: 'https://www.goodata.org',
        shortName: 'GooDT',
        chainId: 32,
        networkId: 32,
    },
    {
        name: 'GoodData Mainnet',
        chain: 'GooD',
        rpc: ['https://rpc.goodata.io'],
        faucets: [],
        nativeCurrency: {
            name: 'GoodData Mainnet Ether',
            symbol: 'GooD',
            decimals: 18,
        },
        infoURL: 'https://www.goodata.org',
        shortName: 'GooD',
        chainId: 33,
        networkId: 33,
    },
    {
        name: 'Dithereum Testnet',
        chain: 'DTH',
        icon: 'dithereum',
        rpc: ['https://node-testnet.dithereum.io'],
        faucets: ['https://faucet.dithereum.org'],
        nativeCurrency: {
            name: 'Dither',
            symbol: 'DTH',
            decimals: 18,
        },
        infoURL: 'https://dithereum.org',
        shortName: 'dth',
        chainId: 34,
        networkId: 34,
    },
    {
        name: 'TBWG Chain',
        chain: 'TBWG',
        rpc: ['https://rpc.tbwg.io'],
        faucets: [],
        nativeCurrency: {
            name: 'TBWG Ether',
            symbol: 'TBG',
            decimals: 18,
        },
        infoURL: 'https://tbwg.io',
        shortName: 'tbwg',
        chainId: 35,
        networkId: 35,
    },
    {
        name: 'Valorbit',
        chain: 'VAL',
        rpc: ['https://rpc.valorbit.com/v2'],
        faucets: [],
        nativeCurrency: {
            name: 'Valorbit',
            symbol: 'VAL',
            decimals: 18,
        },
        infoURL: 'https://valorbit.com',
        shortName: 'val',
        chainId: 38,
        networkId: 38,
        slip44: 538,
    },
    {
        name: 'Telos EVM Mainnet',
        chain: 'TLOS',
        rpc: ['https://mainnet.telos.net/evm'],
        faucets: [],
        nativeCurrency: {
            name: 'Telos',
            symbol: 'TLOS',
            decimals: 18,
        },
        infoURL: 'https://telos.net',
        shortName: 'Telos EVM',
        chainId: 40,
        networkId: 40,
        explorers: [
            {
                name: 'teloscan',
                url: 'https://teloscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Telos EVM Testnet',
        chain: 'TLOS',
        rpc: ['https://testnet.telos.net/evm'],
        faucets: ['https://app.telos.net/testnet/developers'],
        nativeCurrency: {
            name: 'Telos',
            symbol: 'TLOS',
            decimals: 18,
        },
        infoURL: 'https://telos.net',
        shortName: 'Telos EVM Testnet',
        chainId: 41,
        networkId: 41,
    },
    {
        name: 'Kovan',
        title: 'Ethereum Testnet Kovan',
        chain: 'ETH',
        network: 'testnet',
        rpc: [
            'https://kovan.poa.network',
            'http://kovan.poa.network:8545',
            'https://kovan.infura.io/v3/${INFURA_API_KEY}',
            'wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}',
            'ws://kovan.poa.network:8546',
        ],
        faucets: [
            'http://fauceth.komputing.org?chain=42&address=${ADDRESS}',
            'https://faucet.kovan.network',
            'https://gitter.im/kovan-testnet/faucet',
        ],
        nativeCurrency: {
            name: 'Kovan Ether',
            symbol: 'KOV',
            decimals: 18,
        },
        explorers: [
            {
                name: 'etherscan',
                url: 'https://kovan.etherscan.io',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://kovan-testnet.github.io/website',
        shortName: 'kov',
        chainId: 42,
        networkId: 42,
    },
    {
        name: 'Darwinia Pangolin Testnet',
        chain: 'pangolin',
        rpc: ['https://pangolin-rpc.darwinia.network'],
        faucets: ['https://docs.crab.network/dvm/wallets/dvm-metamask#apply-for-the-test-token'],
        nativeCurrency: {
            name: 'Pangolin Network Native Token”',
            symbol: 'PRING',
            decimals: 18,
        },
        infoURL: 'https://darwinia.network/',
        shortName: 'pangolin',
        chainId: 43,
        networkId: 43,
        explorers: [
            {
                name: 'subscan',
                url: 'https://pangolin.subscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Darwinia Crab Network',
        chain: 'crab',
        rpc: ['https://crab-rpc.darwinia.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Crab Network Native Token',
            symbol: 'CRAB',
            decimals: 18,
        },
        infoURL: 'https://crab.network/',
        shortName: 'crab',
        chainId: 44,
        networkId: 44,
        explorers: [
            {
                name: 'subscan',
                url: 'https://crab.subscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Darwinia Pangoro Testnet',
        chain: 'pangoro',
        rpc: ['http://pangoro-rpc.darwinia.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Pangoro Network Native Token”',
            symbol: 'ORING',
            decimals: 18,
        },
        infoURL: 'https://darwinia.network/',
        shortName: 'pangoro',
        chainId: 45,
        networkId: 45,
        explorers: [
            {
                name: 'subscan',
                url: 'https://pangoro.subscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'XinFin Network Mainnet',
        chain: 'XDC',
        rpc: ['https://rpc.xinfin.network'],
        faucets: [],
        nativeCurrency: {
            name: 'XinFin',
            symbol: 'XDC',
            decimals: 18,
        },
        infoURL: 'https://xinfin.org',
        shortName: 'xdc',
        chainId: 50,
        networkId: 50,
    },
    {
        name: 'XinFin Apothem Testnet',
        chain: 'TXDC',
        rpc: ['https://rpc.apothem.network'],
        faucets: [],
        nativeCurrency: {
            name: 'XinFinTest',
            symbol: 'TXDC',
            decimals: 18,
        },
        infoURL: 'https://xinfin.org',
        shortName: 'TXDC',
        chainId: 51,
        networkId: 51,
    },
    {
        name: 'CoinEx Smart Chain Mainnet',
        chain: 'CSC',
        rpc: ['https://rpc.coinex.net'],
        faucets: [],
        nativeCurrency: {
            name: 'CoinEx Chain Native Token',
            symbol: 'cet',
            decimals: 18,
        },
        infoURL: 'https://www.coinex.org/',
        shortName: 'cet',
        chainId: 52,
        networkId: 52,
        explorers: [
            {
                name: 'coinexscan',
                url: 'https://www.coinex.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'CoinEx Smart Chain Testnet',
        chain: 'CSC',
        rpc: ['https://testnet-rpc.coinex.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'CoinEx Chain Test Native Token',
            symbol: 'cett',
            decimals: 18,
        },
        infoURL: 'https://www.coinex.org/',
        shortName: 'tcet',
        chainId: 53,
        networkId: 53,
        explorers: [
            {
                name: 'coinexscan',
                url: 'https://testnet.coinex.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Openpiece Mainnet',
        chain: 'OPENPIECE',
        icon: 'openpiece',
        network: 'mainnet',
        rpc: ['https://mainnet.openpiece.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Belly',
            symbol: 'BELLY',
            decimals: 18,
        },
        infoURL: 'https://cryptopiece.online',
        shortName: 'OP',
        chainId: 54,
        networkId: 54,
        explorers: [
            {
                name: 'Belly Scan',
                url: 'https://bellyscan.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Zyx Mainnet',
        chain: 'ZYX',
        rpc: [
            'https://rpc-1.zyx.network/',
            'https://rpc-2.zyx.network/',
            'https://rpc-3.zyx.network/',
            'https://rpc-4.zyx.network/',
            'https://rpc-5.zyx.network/',
            'https://rpc-6.zyx.network/',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Zyx',
            symbol: 'ZYX',
            decimals: 18,
        },
        infoURL: 'https://zyx.network/',
        shortName: 'ZYX',
        chainId: 55,
        networkId: 55,
        explorers: [
            {
                name: 'zyxscan',
                url: 'https://zyxscan.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Binance Smart Chain Mainnet',
        chain: 'BSC',
        rpc: [
            'https://bsc-dataseed1.binance.org',
            'https://bsc-dataseed2.binance.org',
            'https://bsc-dataseed3.binance.org',
            'https://bsc-dataseed4.binance.org',
            'https://bsc-dataseed1.defibit.io',
            'https://bsc-dataseed2.defibit.io',
            'https://bsc-dataseed3.defibit.io',
            'https://bsc-dataseed4.defibit.io',
            'https://bsc-dataseed1.ninicoin.io',
            'https://bsc-dataseed2.ninicoin.io',
            'https://bsc-dataseed3.ninicoin.io',
            'https://bsc-dataseed4.ninicoin.io',
            'wss://bsc-ws-node.nariox.org',
        ],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'BNB',
            decimals: 18,
        },
        infoURL: 'https://www.binance.org',
        shortName: 'bnb',
        chainId: 56,
        networkId: 56,
        slip44: 714,
        explorers: [
            {
                name: 'bscscan',
                url: 'https://bscscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Syscoin Mainnet',
        chain: 'SYS',
        rpc: ['https://rpc.syscoin.org', 'wss://rpc.syscoin.org/wss'],
        faucets: ['https://faucet.syscoin.org'],
        nativeCurrency: {
            name: 'Syscoin',
            symbol: 'SYS',
            decimals: 18,
        },
        infoURL: 'https://www.syscoin.org',
        shortName: 'sys',
        chainId: 57,
        networkId: 57,
        explorers: [
            {
                name: 'Syscoin Block Explorer',
                url: 'https://explorer.syscoin.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ontology Mainnet',
        chain: 'Ontology',
        rpc: [
            'http://dappnode1.ont.io:20339',
            'http://dappnode2.ont.io:20339',
            'http://dappnode3.ont.io:20339',
            'http://dappnode4.ont.io:20339',
            'https://dappnode1.ont.io:10339',
            'https://dappnode2.ont.io:10339',
            'https://dappnode3.ont.io:10339',
            'https://dappnode4.ont.io:10339',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'ONG',
            symbol: 'ONG',
            decimals: 18,
        },
        infoURL: 'https://ont.io/',
        shortName: 'Ontology Mainnet',
        chainId: 58,
        networkId: 58,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.ont.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'EOS Mainnet',
        chain: 'EOS',
        rpc: ['https://api.eosargentina.io'],
        faucets: [],
        nativeCurrency: {
            name: 'EOS',
            symbol: 'EOS',
            decimals: 18,
        },
        infoURL: 'https://eoscommunity.org/',
        shortName: 'EOS Mainnet',
        chainId: 59,
        networkId: 59,
        explorers: [
            {
                name: 'bloks',
                url: 'https://bloks.eosargentina.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'GoChain',
        chain: 'GO',
        rpc: ['https://rpc.gochain.io'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'GoChain Ether',
            symbol: 'GO',
            decimals: 18,
        },
        infoURL: 'https://gochain.io',
        shortName: 'go',
        chainId: 60,
        networkId: 60,
        slip44: 6060,
        explorers: [
            {
                name: 'GoChain Explorer',
                url: 'https://explorer.gochain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ethereum Classic Mainnet',
        chain: 'ETC',
        rpc: ['https://www.ethercluster.com/etc'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/?'],
        nativeCurrency: {
            name: 'Ethereum Classic Ether',
            symbol: 'ETC',
            decimals: 18,
        },
        infoURL: 'https://ethereumclassic.org',
        shortName: 'etc',
        chainId: 61,
        networkId: 1,
        slip44: 61,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/etc/mainnet',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Ethereum Classic Testnet Morden',
        chain: 'ETC',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Ethereum Classic Testnet Ether',
            symbol: 'TETC',
            decimals: 18,
        },
        infoURL: 'https://ethereumclassic.org',
        shortName: 'tetc',
        chainId: 62,
        networkId: 2,
    },
    {
        name: 'Ethereum Classic Testnet Mordor',
        chain: 'ETC',
        rpc: ['https://www.ethercluster.com/mordor'],
        faucets: [],
        nativeCurrency: {
            name: 'Mordor Classic Testnet Ether',
            symbol: 'METC',
            decimals: 18,
        },
        infoURL: 'https://github.com/eth-classic/mordor/',
        shortName: 'metc',
        chainId: 63,
        networkId: 7,
    },
    {
        name: 'Ellaism',
        chain: 'ELLA',
        rpc: ['https://jsonrpc.ellaism.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Ellaism Ether',
            symbol: 'ELLA',
            decimals: 18,
        },
        infoURL: 'https://ellaism.org',
        shortName: 'ella',
        chainId: 64,
        networkId: 64,
        slip44: 163,
    },
    {
        name: 'OKExChain Testnet',
        chain: 'okexchain',
        rpc: ['https://exchaintestrpc.okex.org'],
        faucets: ['https://www.okex.com/drawdex'],
        nativeCurrency: {
            name: 'OKExChain Global Utility Token in testnet',
            symbol: 'OKT',
            decimals: 18,
        },
        infoURL: 'https://www.okex.com/okexchain',
        shortName: 'tokt',
        chainId: 65,
        networkId: 65,
        explorers: [
            {
                name: 'OKLink',
                url: 'https://www.oklink.com/okexchain-test',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'OKXChain Mainnet',
        chain: 'okexchain',
        rpc: ['https://exchainrpc.okex.org'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/?'],
        nativeCurrency: {
            name: 'OKExChain Global Utility Token',
            symbol: 'OKT',
            decimals: 18,
        },
        infoURL: 'https://www.okex.com/okexchain',
        shortName: 'okt',
        chainId: 66,
        networkId: 66,
        explorers: [
            {
                name: 'OKLink',
                url: 'https://www.oklink.com/okexchain',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'DBChain Testnet',
        chain: 'DBM',
        rpc: ['http://test-rpc.dbmbp.com'],
        faucets: [],
        nativeCurrency: {
            name: 'DBChain Testnet',
            symbol: 'DBM',
            decimals: 18,
        },
        infoURL: 'http://test.dbmbp.com',
        shortName: 'dbm',
        chainId: 67,
        networkId: 67,
    },
    {
        name: 'SoterOne Mainnet',
        chain: 'SOTER',
        rpc: ['https://rpc.soter.one'],
        faucets: [],
        nativeCurrency: {
            name: 'SoterOne Mainnet Ether',
            symbol: 'SOTER',
            decimals: 18,
        },
        infoURL: 'https://www.soterone.com',
        shortName: 'SO1',
        chainId: 68,
        networkId: 68,
    },
    {
        name: 'Optimism Kovan',
        title: 'Optimism Testnet Kovan',
        chain: 'ETH',
        rpc: ['https://kovan.optimism.io/'],
        faucets: ['http://fauceth.komputing.org?chain=69&address=${ADDRESS}'],
        nativeCurrency: {
            name: 'Kovan Ether',
            symbol: 'KOR',
            decimals: 18,
        },
        explorers: [
            {
                name: 'etherscan',
                url: 'https://kovan-optimistic.etherscan.io',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://optimism.io',
        shortName: 'okov',
        chainId: 69,
        networkId: 69,
    },
    {
        name: 'Conflux eSpace (Testnet)',
        chain: 'Conflux',
        network: 'testnet',
        rpc: ['https://evmtestnet.confluxrpc.com'],
        faucets: ['https://faucet.confluxnetwork.org'],
        nativeCurrency: {
            name: 'CFX',
            symbol: 'CFX',
            decimals: 18,
        },
        infoURL: 'https://confluxnetwork.org',
        shortName: 'cfxtest',
        chainId: 71,
        networkId: 71,
        icon: 'conflux',
        explorers: [
            {
                name: 'Conflux Scan',
                url: 'https://evmtestnet.confluxscan.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'IDChain Mainnet',
        chain: 'IDChain',
        network: 'mainnet',
        rpc: ['https://idchain.one/rpc/', 'wss://idchain.one/ws/'],
        faucets: [],
        nativeCurrency: {
            name: 'EIDI',
            symbol: 'EIDI',
            decimals: 18,
        },
        infoURL: 'https://idchain.one/begin/',
        shortName: 'idchain',
        chainId: 74,
        networkId: 74,
        icon: 'idchain',
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.idchain.one',
                icon: 'etherscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Mix',
        chain: 'MIX',
        rpc: ['https://rpc2.mix-blockchain.org:8647'],
        faucets: [],
        nativeCurrency: {
            name: 'Mix Ether',
            symbol: 'MIX',
            decimals: 18,
        },
        infoURL: 'https://mix-blockchain.org',
        shortName: 'mix',
        chainId: 76,
        networkId: 76,
        slip44: 76,
    },
    {
        name: 'POA Network Sokol',
        chain: 'POA',
        rpc: ['https://sokol.poa.network', 'wss://sokol.poa.network/wss', 'ws://sokol.poa.network:8546'],
        faucets: ['https://faucet.poa.network'],
        nativeCurrency: {
            name: 'POA Sokol Ether',
            symbol: 'SPOA',
            decimals: 18,
        },
        infoURL: 'https://poa.network',
        shortName: 'spoa',
        chainId: 77,
        networkId: 77,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/poa/sokol',
                standard: 'none',
            },
        ],
    },
    {
        name: 'PrimusChain mainnet',
        chain: 'PC',
        rpc: ['https://ethnode.primusmoney.com/mainnet'],
        faucets: [],
        nativeCurrency: {
            name: 'Primus Ether',
            symbol: 'PETH',
            decimals: 18,
        },
        infoURL: 'https://primusmoney.com',
        shortName: 'primuschain',
        chainId: 78,
        networkId: 78,
    },
    {
        name: 'Zenith Mainnet',
        chain: 'Zenith',
        rpc: ['https://dataserver-1.zenithchain.co/', 'https://dataserver-us-1.zenithchain.co/'],
        faucets: [],
        nativeCurrency: {
            name: 'ZENITH',
            symbol: 'ZENITH',
            decimals: 18,
        },
        infoURL: 'https://www.zenithchain.co/',
        chainId: 79,
        networkId: 79,
        shortName: 'zenith',
        explorers: [
            {
                name: 'zenith scan',
                url: 'https://scan.zenithchain.co',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'GeneChain',
        chain: 'GeneChain',
        rpc: ['https://rpc.genechain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'RNA',
            symbol: 'RNA',
            decimals: 18,
        },
        infoURL: 'https://scan.genechain.io/',
        shortName: 'GeneChain',
        chainId: 80,
        networkId: 80,
        explorers: [
            {
                name: 'GeneChain Scan',
                url: 'https://scan.genechain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Villinius',
        chain: 'Zenith',
        rpc: ['https://vilinius.zenithchain.co/http'],
        faucets: ['https://faucet.zenithchain.co/'],
        nativeCurrency: {
            name: 'Villinius',
            symbol: 'VIL',
            decimals: 18,
        },
        infoURL: 'https://www.zenithchain.co/',
        chainId: 81,
        networkId: 81,
        shortName: 'VIL',
        explorers: [
            {
                name: 'villinius zenith scan',
                url: 'https://vilinius.scan.zenithchain.co',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Meter Mainnet',
        chain: 'METER',
        rpc: ['https://rpc.meter.io'],
        faucets: ['https://faucet.meter.io'],
        nativeCurrency: {
            name: 'Meter',
            symbol: 'MTR',
            decimals: 18,
        },
        infoURL: 'https://www.meter.io',
        shortName: 'Meter',
        chainId: 82,
        networkId: 82,
        explorers: [
            {
                name: 'Meter Mainnet Scan',
                url: 'https://scan.meter.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Meter Testnet',
        chain: 'METER Testnet',
        rpc: ['https://rpctest.meter.io'],
        faucets: ['https://faucet-warringstakes.meter.io'],
        nativeCurrency: {
            name: 'Meter',
            symbol: 'MTR',
            decimals: 18,
        },
        infoURL: 'https://www.meter.io',
        shortName: 'MeterTest',
        chainId: 83,
        networkId: 83,
        explorers: [
            {
                name: 'Meter Testnet Scan',
                url: 'https://scan-warringstakes.meter.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'GateChain Testnet',
        chainId: 85,
        shortName: 'gttest',
        chain: 'GTTEST',
        networkId: 85,
        nativeCurrency: {
            name: 'GateToken',
            symbol: 'GT',
            decimals: 18,
        },
        rpc: ['https://testnet.gatenode.cc'],
        faucets: ['https://www.gatescan.org/testnet/faucet'],
        explorers: [
            {
                name: 'GateScan',
                url: 'https://www.gatescan.org/testnet',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://www.gatechain.io',
    },
    {
        name: 'GateChain Mainnet',
        chainId: 86,
        shortName: 'gt',
        chain: 'GT',
        networkId: 86,
        nativeCurrency: {
            name: 'GateToken',
            symbol: 'GT',
            decimals: 18,
        },
        rpc: ['https://evm.gatenode.cc'],
        faucets: ['https://www.gatescan.org/faucet'],
        explorers: [
            {
                name: 'GateScan',
                url: 'https://www.gatescan.org',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://www.gatechain.io',
    },
    {
        name: 'Nova Network',
        chain: 'NNW',
        icon: 'novanetwork',
        rpc: ['https://connect.novanetwork.io', 'https://0x57.redjackstudio.com', 'https://rpc.novanetwork.io:9070'],
        faucets: [],
        nativeCurrency: {
            name: 'Supernova',
            symbol: 'SNT',
            decimals: 18,
        },
        infoURL: 'https://novanetwork.io',
        shortName: 'nnw',
        chainId: 87,
        networkId: 87,
        explorers: [
            {
                name: 'novanetwork',
                url: 'https://explorer.novanetwork.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'TomoChain',
        chain: 'TOMO',
        rpc: ['https://rpc.tomochain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'TomoChain',
            symbol: 'TOMO',
            decimals: 18,
        },
        infoURL: 'https://tomochain.com',
        shortName: 'tomo',
        chainId: 88,
        networkId: 88,
        slip44: 889,
    },
    {
        name: 'TomoChain Testnet',
        chain: 'TOMO',
        rpc: ['https://rpc.testnet.tomochain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'TomoChain',
            symbol: 'TOMO',
            decimals: 18,
        },
        infoURL: 'https://tomochain.com',
        shortName: 'tomot',
        chainId: 89,
        networkId: 89,
        slip44: 889,
    },
    {
        name: 'Garizon Stage0',
        chain: 'GAR',
        network: 'mainnet',
        icon: 'garizon',
        rpc: ['https://s0.garizon.net/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-s0',
        chainId: 90,
        networkId: 90,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Garizon Stage1',
        chain: 'GAR',
        network: 'mainnet',
        icon: 'garizon',
        rpc: ['https://s1.garizon.net/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-s1',
        chainId: 91,
        networkId: 91,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-90',
            type: 'shard',
        },
    },
    {
        name: 'Garizon Stage2',
        chain: 'GAR',
        network: 'mainnet',
        icon: 'garizon',
        rpc: ['https://s2.garizon.net/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-s2',
        chainId: 92,
        networkId: 92,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-90',
            type: 'shard',
        },
    },
    {
        name: 'Garizon Stage3',
        chain: 'GAR',
        network: 'mainnet',
        icon: 'garizon',
        rpc: ['https://s3.garizon.net/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-s3',
        chainId: 93,
        networkId: 93,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-90',
            type: 'shard',
        },
    },
    {
        name: 'CryptoKylin Testnet',
        chain: 'EOS',
        rpc: ['https://kylin.eosargentina.io'],
        faucets: [],
        nativeCurrency: {
            name: 'EOS',
            symbol: 'EOS',
            decimals: 18,
        },
        infoURL: 'https://www.cryptokylin.io/',
        shortName: 'Kylin Testnet',
        chainId: 95,
        networkId: 95,
        explorers: [
            {
                name: 'eosq',
                url: 'https://kylin.eosargentina.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'NEXT Smart Chain',
        chain: 'NSC',
        rpc: ['https://rpc.nextsmartchain.com'],
        faucets: ['https://faucet.nextsmartchain.com'],
        nativeCurrency: {
            name: 'NEXT',
            symbol: 'NEXT',
            decimals: 18,
        },
        infoURL: 'https://www.nextsmartchain.com/',
        shortName: 'nsc',
        chainId: 96,
        networkId: 96,
        explorers: [
            {
                name: 'Next Smart Chain Explorer',
                url: 'https://explorer.nextsmartchain.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Binance Smart Chain Testnet',
        chain: 'BSC',
        rpc: [
            'https://data-seed-prebsc-1-s1.binance.org:8545',
            'https://data-seed-prebsc-2-s1.binance.org:8545',
            'https://data-seed-prebsc-1-s2.binance.org:8545',
            'https://data-seed-prebsc-2-s2.binance.org:8545',
            'https://data-seed-prebsc-1-s3.binance.org:8545',
            'https://data-seed-prebsc-2-s3.binance.org:8545',
        ],
        faucets: ['https://testnet.binance.org/faucet-smart'],
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'tBNB',
            decimals: 18,
        },
        infoURL: 'https://testnet.binance.org/',
        shortName: 'bnbt',
        chainId: 97,
        networkId: 97,
        explorers: [
            {
                name: 'bscscan-testnet',
                url: 'https://testnet.bscscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'POA Network Core',
        chain: 'POA',
        rpc: [
            'https://core.poanetwork.dev',
            'http://core.poanetwork.dev:8545',
            'https://core.poa.network',
            'ws://core.poanetwork.dev:8546',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'POA Network Core Ether',
            symbol: 'POA',
            decimals: 18,
        },
        infoURL: 'https://poa.network',
        shortName: 'poa',
        chainId: 99,
        networkId: 99,
        slip44: 178,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/poa/core',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Gnosis Chain (formerly xDai)',
        chain: 'Gnosis',
        icon: 'gnosis',
        rpc: [
            'https://rpc.gnosischain.com',
            'https://xdai.poanetwork.dev',
            'wss://rpc.gnosischain.com/wss',
            'wss://xdai.poanetwork.dev/wss',
            'http://xdai.poanetwork.dev',
            'https://dai.poa.network',
            'ws://xdai.poanetwork.dev:8546',
        ],
        faucets: [
            'https://faucet.gimlu.com/gnosis',
            'https://stakely.io/faucet/gnosis-chain-xdai',
            'https://faucet.prussia.dev/xdai',
        ],
        nativeCurrency: {
            name: 'xDAI',
            symbol: 'xDAI',
            decimals: 18,
        },
        infoURL: 'https://www.xdaichain.com/',
        shortName: 'gno',
        chainId: 100,
        networkId: 100,
        slip44: 700,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/xdai/mainnet',
                icon: 'blockscout',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'EtherInc',
        chain: 'ETI',
        rpc: ['https://api.einc.io/jsonrpc/mainnet'],
        faucets: [],
        nativeCurrency: {
            name: 'EtherInc Ether',
            symbol: 'ETI',
            decimals: 18,
        },
        infoURL: 'https://einc.io',
        shortName: 'eti',
        chainId: 101,
        networkId: 1,
        slip44: 464,
    },
    {
        name: 'Web3Games Testnet',
        chain: 'Web3Games',
        icon: 'web3games',
        rpc: ['https://testnet.web3games.org/evm'],
        faucets: [],
        nativeCurrency: {
            name: 'Web3Games',
            symbol: 'W3G',
            decimals: 18,
        },
        infoURL: 'https://web3games.org/',
        shortName: 'tw3g',
        chainId: 102,
        networkId: 102,
    },
    {
        name: 'Web3Games Devnet',
        chain: 'Web3Games',
        icon: 'web3games',
        rpc: ['https://devnet.web3games.org/evm'],
        faucets: [],
        nativeCurrency: {
            name: 'Web3Games',
            symbol: 'W3G',
            decimals: 18,
        },
        infoURL: 'https://web3games.org/',
        shortName: 'dw3g',
        chainId: 105,
        networkId: 105,
        explorers: [
            {
                name: 'Web3Games Explorer',
                url: 'https://explorer-devnet.web3games.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Velas EVM Mainnet',
        chain: 'Velas',
        icon: 'velas',
        rpc: ['https://evmexplorer.velas.com/rpc', 'https://explorer.velas.com/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Velas',
            symbol: 'VLX',
            decimals: 18,
        },
        infoURL: 'https://velas.com',
        shortName: 'vlx',
        chainId: 106,
        networkId: 106,
        explorers: [
            {
                name: 'Velas Explorer',
                url: 'https://evmexplorer.velas.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Nebula Testnet',
        chain: 'NTN',
        icon: 'nebulatestnet',
        rpc: ['https://testnet.rpc.novanetwork.io:9070'],
        faucets: [],
        nativeCurrency: {
            name: 'Nebula X',
            symbol: 'NBX',
            decimals: 18,
        },
        infoURL: 'https://novanetwork.io',
        shortName: 'ntn',
        chainId: 107,
        networkId: 107,
        explorers: [
            {
                name: 'nebulatestnet',
                url: 'https://explorer.novanetwork.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'ThunderCore Mainnet',
        chain: 'TT',
        rpc: ['https://mainnet-rpc.thundercore.com'],
        faucets: ['https://faucet.thundercore.com'],
        nativeCurrency: {
            name: 'ThunderCore Mainnet Ether',
            symbol: 'TT',
            decimals: 18,
        },
        infoURL: 'https://thundercore.com',
        shortName: 'TT',
        chainId: 108,
        networkId: 108,
        slip44: 1001,
        explorers: [
            {
                name: 'ThundercoreScan',
                url: 'https://scan.thundercore.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Proton Testnet',
        chain: 'XPR',
        rpc: ['https://protontestnet.greymass.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'Proton',
            symbol: 'XPR',
            decimals: 4,
        },
        infoURL: 'https://protonchain.com',
        shortName: 'xpr',
        chainId: 110,
        networkId: 110,
    },
    {
        name: 'EtherLite Chain',
        chain: 'ETL',
        rpc: ['https://rpc.etherlite.org'],
        faucets: ['https://etherlite.org/faucets'],
        nativeCurrency: {
            name: 'EtherLite',
            symbol: 'ETL',
            decimals: 18,
        },
        infoURL: 'https://etherlite.org',
        shortName: 'ETL',
        chainId: 111,
        networkId: 111,
        icon: 'etherlite',
    },
    {
        name: 'Fuse Mainnet',
        chain: 'FUSE',
        rpc: ['https://rpc.fuse.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Fuse',
            symbol: 'FUSE',
            decimals: 18,
        },
        infoURL: 'https://fuse.io/',
        shortName: 'fuse',
        chainId: 122,
        networkId: 122,
    },
    {
        name: 'Fuse Sparknet',
        chain: 'fuse',
        rpc: ['https://rpc.fusespark.io'],
        faucets: ['https://get.fusespark.io'],
        nativeCurrency: {
            name: 'Spark',
            symbol: 'SPARK',
            decimals: 18,
        },
        infoURL: 'https://docs.fuse.io/general/fuse-network-blockchain/fuse-testnet',
        shortName: 'spark',
        chainId: 123,
        networkId: 123,
    },
    {
        name: 'Decentralized Web Mainnet',
        shortName: 'dwu',
        chain: 'DWU',
        chainId: 124,
        networkId: 124,
        rpc: ['https://decentralized-web.tech/dw_rpc.php'],
        faucets: [],
        infoURL: 'https://decentralized-web.tech/dw_chain.php',
        nativeCurrency: {
            name: 'Decentralized Web Utility',
            symbol: 'DWU',
            decimals: 18,
        },
    },
    {
        name: 'OYchain Testnet',
        chain: 'OYchain',
        rpc: ['https://rpc.testnet.oychain.io'],
        faucets: ['https://faucet.oychain.io'],
        nativeCurrency: {
            name: 'OYchain Token',
            symbol: 'OY',
            decimals: 18,
        },
        infoURL: 'https://www.oychain.io',
        shortName: 'oychain testnet',
        chainId: 125,
        networkId: 125,
        slip44: 125,
        explorers: [
            {
                name: 'OYchain Testnet Explorer',
                url: 'https://explorer.testnet.oychain.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'OYchain Mainnet',
        chain: 'OYchain',
        icon: 'oychain',
        rpc: ['https://rpc.mainnet.oychain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'OYchain Token',
            symbol: 'OY',
            decimals: 18,
        },
        infoURL: 'https://www.oychain.io',
        shortName: 'oychain mainnet',
        chainId: 126,
        networkId: 126,
        slip44: 126,
        explorers: [
            {
                name: 'OYchain Mainnet Explorer',
                url: 'https://explorer.oychain.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Factory 127 Mainnet',
        chain: 'FETH',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Factory 127 Token',
            symbol: 'FETH',
            decimals: 18,
        },
        infoURL: 'https://www.factory127.com',
        shortName: 'feth',
        chainId: 127,
        networkId: 127,
        slip44: 127,
    },
    {
        name: 'Huobi ECO Chain Mainnet',
        chain: 'Heco',
        rpc: ['https://http-mainnet.hecochain.com', 'wss://ws-mainnet.hecochain.com'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Huobi ECO Chain Native Token',
            symbol: 'HT',
            decimals: 18,
        },
        infoURL: 'https://www.hecochain.com',
        shortName: 'heco',
        chainId: 128,
        networkId: 128,
        slip44: 1010,
        explorers: [
            {
                name: 'hecoinfo',
                url: 'https://hecoinfo.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Polygon Mainnet',
        chain: 'Polygon',
        rpc: [
            'https://polygon-rpc.com/',
            'https://rpc-mainnet.matic.network',
            'https://matic-mainnet.chainstacklabs.com',
            'https://rpc-mainnet.maticvigil.com',
            'https://rpc-mainnet.matic.quiknode.pro',
            'https://matic-mainnet-full-rpc.bwarelabs.com',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        infoURL: 'https://polygon.technology/',
        shortName: 'MATIC',
        chainId: 137,
        networkId: 137,
        slip44: 966,
        explorers: [
            {
                name: 'polygonscan',
                url: 'https://polygonscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Openpiece Testnet',
        chain: 'OPENPIECE',
        icon: 'openpiece',
        network: 'testnet',
        rpc: ['https://testnet.openpiece.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Belly',
            symbol: 'BELLY',
            decimals: 18,
        },
        infoURL: 'https://cryptopiece.online',
        shortName: 'OPtest',
        chainId: 141,
        networkId: 141,
        explorers: [
            {
                name: 'Belly Scan',
                url: 'https://testnet.bellyscan.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'DAX CHAIN',
        chain: 'DAX',
        rpc: ['https://rpc.prodax.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Prodax',
            symbol: 'DAX',
            decimals: 18,
        },
        infoURL: 'https://prodax.io/',
        shortName: 'dax',
        chainId: 142,
        networkId: 142,
    },
    {
        name: 'Lightstreams Testnet',
        chain: 'PHT',
        rpc: ['https://node.sirius.lightstreams.io'],
        faucets: ['https://discuss.lightstreams.network/t/request-test-tokens'],
        nativeCurrency: {
            name: 'Lightstreams PHT',
            symbol: 'PHT',
            decimals: 18,
        },
        infoURL: 'https://explorer.sirius.lightstreams.io',
        shortName: 'tpht',
        chainId: 162,
        networkId: 162,
    },
    {
        name: 'Lightstreams Mainnet',
        chain: 'PHT',
        rpc: ['https://node.mainnet.lightstreams.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Lightstreams PHT',
            symbol: 'PHT',
            decimals: 18,
        },
        infoURL: 'https://explorer.lightstreams.io',
        shortName: 'pht',
        chainId: 163,
        networkId: 163,
    },
    {
        name: 'AIOZ Network',
        chain: 'AIOZ',
        network: 'mainnet',
        icon: 'aioz',
        rpc: ['https://eth-dataseed.aioz.network'],
        faucets: [],
        nativeCurrency: {
            name: 'AIOZ',
            symbol: 'AIOZ',
            decimals: 18,
        },
        infoURL: 'https://aioz.network',
        shortName: 'aioz',
        chainId: 168,
        networkId: 168,
        slip44: 60,
        explorers: [
            {
                name: 'AIOZ Network Explorer',
                url: 'https://explorer.aioz.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'HOO Smart Chain Testnet',
        chain: 'ETH',
        rpc: ['https://http-testnet.hoosmartchain.com'],
        faucets: ['https://faucet-testnet.hscscan.com/'],
        nativeCurrency: {
            name: 'HOO',
            symbol: 'HOO',
            decimals: 18,
        },
        infoURL: 'https://www.hoosmartchain.com',
        shortName: 'hoosmartchain',
        chainId: 170,
        networkId: 170,
    },
    {
        name: 'Latam-Blockchain Resil Testnet',
        chain: 'Resil',
        rpc: ['https://rpc.latam-blockchain.com', 'wss://ws.latam-blockchain.com'],
        faucets: ['https://faucet.latam-blockchain.com'],
        nativeCurrency: {
            name: 'Latam-Blockchain Resil Test Native Token',
            symbol: 'usd',
            decimals: 18,
        },
        infoURL: 'https://latam-blockchain.com',
        shortName: 'resil',
        chainId: 172,
        networkId: 172,
    },
    {
        name: 'Seele Mainnet',
        chain: 'Seele',
        rpc: ['https://rpc.seelen.pro/'],
        faucets: [],
        nativeCurrency: {
            name: 'Seele',
            symbol: 'Seele',
            decimals: 18,
        },
        infoURL: 'https://seelen.pro/',
        shortName: 'Seele',
        chainId: 186,
        networkId: 186,
        explorers: [
            {
                name: 'seeleview',
                url: 'https://seeleview.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'BMC Mainnet',
        chain: 'BMC',
        rpc: ['https://mainnet.bmcchain.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'BTM',
            symbol: 'BTM',
            decimals: 18,
        },
        infoURL: 'https://bmc.bytom.io/',
        shortName: 'BMC',
        chainId: 188,
        networkId: 188,
        explorers: [
            {
                name: 'Blockmeta',
                url: 'https://bmc.blockmeta.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'BMC Testnet',
        chain: 'BMC',
        rpc: ['https://testnet.bmcchain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'BTM',
            symbol: 'BTM',
            decimals: 18,
        },
        infoURL: 'https://bmc.bytom.io/',
        shortName: 'BMCT',
        chainId: 189,
        networkId: 189,
        explorers: [
            {
                name: 'Blockmeta',
                url: 'https://bmctestnet.blockmeta.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'BitTorrent Chain Mainnet',
        chain: 'BTTC',
        rpc: ['https://rpc.bittorrentchain.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'BitTorrent',
            symbol: 'BTT',
            decimals: 18,
        },
        infoURL: 'https://bittorrentchain.io/',
        shortName: 'BTT',
        chainId: 199,
        networkId: 199,
        explorers: [
            {
                name: 'bttcscan',
                url: 'https://scan.bittorrentchain.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Arbitrum on xDai',
        chain: 'AOX',
        rpc: ['https://arbitrum.xdaichain.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'xDAI',
            symbol: 'xDAI',
            decimals: 18,
        },
        infoURL: 'https://xdaichain.com',
        shortName: 'aox',
        chainId: 200,
        networkId: 200,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/xdai/arbitrum',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-100',
            type: 'L2',
        },
    },
    {
        name: 'Freight Trust Network',
        chain: 'EDI',
        rpc: ['http://13.57.207.168:3435', 'https://app.freighttrust.net/ftn/${API_KEY}'],
        faucets: ['http://faucet.freight.sh'],
        nativeCurrency: {
            name: 'Freight Trust Native',
            symbol: '0xF',
            decimals: 18,
        },
        infoURL: 'https://freighttrust.com',
        shortName: 'EDI',
        chainId: 211,
        networkId: 0,
    },
    {
        name: 'SoterOne Mainnet old',
        chain: 'SOTER',
        rpc: ['https://rpc.soter.one'],
        faucets: [],
        nativeCurrency: {
            name: 'SoterOne Mainnet Ether',
            symbol: 'SOTER',
            decimals: 18,
        },
        infoURL: 'https://www.soterone.com',
        shortName: 'SO1-old',
        chainId: 218,
        networkId: 218,
        deprecated: true,
    },
    {
        name: 'Permission',
        chain: 'ASK',
        rpc: ['https://blockchain-api-mainnet.permission.io/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'ASK',
            symbol: 'ASK',
            decimals: 18,
        },
        infoURL: 'https://permission.io/',
        shortName: 'ASK',
        chainId: 222,
        networkId: 2221,
        slip44: 2221,
    },
    {
        name: 'LACHAIN Mainnet',
        chain: 'LA',
        icon: 'lachain',
        rpc: ['https://rpc-mainnet.lachain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'LA',
            symbol: 'LA',
            decimals: 18,
        },
        infoURL: 'https://lachain.io',
        shortName: 'LA',
        chainId: 225,
        networkId: 225,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://scan.lachain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'LACHAIN Testnet',
        chain: 'TLA',
        icon: 'lachain',
        rpc: ['https://rpc-testnet.lachain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'TLA',
            symbol: 'TLA',
            decimals: 18,
        },
        infoURL: 'https://lachain.io',
        shortName: 'TLA',
        chainId: 226,
        networkId: 226,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://scan-test.lachain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Energy Web Chain',
        chain: 'Energy Web Chain',
        rpc: ['https://rpc.energyweb.org', 'wss://rpc.energyweb.org/ws'],
        faucets: ['https://faucet.carbonswap.exchange', 'https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Energy Web Token',
            symbol: 'EWT',
            decimals: 18,
        },
        infoURL: 'https://energyweb.org',
        shortName: 'ewt',
        chainId: 246,
        networkId: 246,
        slip44: 246,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.energyweb.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Fantom Opera',
        chain: 'FTM',
        rpc: ['https://rpc.ftm.tools'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18,
        },
        infoURL: 'https://fantom.foundation',
        shortName: 'ftm',
        chainId: 250,
        networkId: 250,
        icon: 'fantom',
        explorers: [
            {
                name: 'ftmscan',
                url: 'https://ftmscan.com',
                icon: 'ftmscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Huobi ECO Chain Testnet',
        chain: 'Heco',
        rpc: ['https://http-testnet.hecochain.com', 'wss://ws-testnet.hecochain.com'],
        faucets: ['https://scan-testnet.hecochain.com/faucet'],
        nativeCurrency: {
            name: 'Huobi ECO Chain Test Native Token',
            symbol: 'htt',
            decimals: 18,
        },
        infoURL: 'https://testnet.hecoinfo.com',
        shortName: 'hecot',
        chainId: 256,
        networkId: 256,
    },
    {
        name: 'Setheum',
        chain: 'Setheum',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Setheum',
            symbol: 'SETM',
            decimals: 18,
        },
        infoURL: 'https://setheum.xyz',
        shortName: 'setm',
        chainId: 258,
        networkId: 258,
    },
    {
        name: 'SUR Blockchain Network',
        chain: 'SUR',
        rpc: ['https://sur.nilin.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Suren',
            symbol: 'SRN',
            decimals: 18,
        },
        infoURL: 'https://surnet.org',
        shortName: 'SUR',
        chainId: 262,
        networkId: 1,
        icon: 'SUR',
        explorers: [
            {
                name: 'Surnet Explorer',
                url: 'https://explorer.surnet.org',
                icon: 'SUR',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'High Performance Blockchain',
        chain: 'HPB',
        rpc: ['https://hpbnode.com', 'wss://ws.hpbnode.com'],
        faucets: ['https://myhpbwallet.com/'],
        nativeCurrency: {
            name: 'High Performance Blockchain Ether',
            symbol: 'HPB',
            decimals: 18,
        },
        infoURL: 'https://hpb.io',
        shortName: 'hpb',
        chainId: 269,
        networkId: 269,
        slip44: 269,
        explorers: [
            {
                name: 'hscan',
                url: 'https://hscan.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Boba Network',
        chain: 'ETH',
        rpc: ['https://mainnet.boba.network/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://boba.network',
        shortName: 'Boba',
        chainId: 288,
        networkId: 288,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://blockexplorer.boba.network',
                standard: 'none',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-1',
            bridges: [
                {
                    url: 'https://gateway.boba.network',
                },
            ],
        },
    },
    {
        name: 'Optimism on Gnosis Chain',
        chain: 'OGC',
        rpc: ['https://optimism.gnosischain.com', 'wss://optimism.gnosischain.com/wss'],
        faucets: ['https://faucet.gimlu.com/gnosis'],
        nativeCurrency: {
            name: 'xDAI',
            symbol: 'xDAI',
            decimals: 18,
        },
        infoURL: 'https://www.xdaichain.com/for-developers/optimism-optimistic-rollups-on-gc',
        shortName: 'ogc',
        chainId: 300,
        networkId: 300,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://blockscout.com/xdai/optimism',
                icon: 'blockscout',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'KCC Mainnet',
        chain: 'KCC',
        rpc: ['https://rpc-mainnet.kcc.network', 'wss://rpc-ws-mainnet.kcc.network'],
        faucets: [],
        nativeCurrency: {
            name: 'KuCoin Token',
            symbol: 'KCS',
            decimals: 18,
        },
        infoURL: 'https://kcc.io',
        shortName: 'kcs',
        chainId: 321,
        networkId: 1,
        explorers: [
            {
                name: 'KCC Explorer',
                url: 'https://explorer.kcc.io/en',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'KCC Testnet',
        chain: 'KCC',
        rpc: ['https://rpc-testnet.kcc.network', 'wss://rpc-ws-testnet.kcc.network'],
        faucets: ['https://faucet-testnet.kcc.network'],
        nativeCurrency: {
            name: 'KuCoin Testnet Token',
            symbol: 'tKCS',
            decimals: 18,
        },
        infoURL: 'https://scan-testnet.kcc.network',
        shortName: 'kcst',
        chainId: 322,
        networkId: 322,
        explorers: [
            {
                name: 'kcc-scan',
                url: 'https://scan-testnet.kcc.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Web3Q Mainnet',
        chain: 'Web3Q',
        rpc: ['https://mainnet.web3q.io:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'Web3Q',
            symbol: 'W3Q',
            decimals: 18,
        },
        infoURL: 'https://web3q.io/home.w3q/',
        shortName: 'w3q',
        chainId: 333,
        networkId: 333,
        explorers: [
            {
                name: 'w3q-mainnet',
                url: 'https://explorer.mainnet.web3q.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'DFK Chain Test',
        chain: 'DFK',
        icon: 'dfk',
        network: 'testnet',
        rpc: ['https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Jewel',
            symbol: 'JEWEL',
            decimals: 18,
        },
        infoURL: 'https://defikingdoms.com',
        shortName: 'DFKTEST',
        chainId: 335,
        networkId: 335,
        explorers: [
            {
                name: 'ethernal',
                url: 'https://explorer-test.dfkchain.com',
                icon: 'ethereum',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Shiden',
        chain: 'SDN',
        rpc: ['https://rpc.shiden.astar.network:8545', 'wss://shiden.api.onfinality.io/public-ws'],
        faucets: [],
        nativeCurrency: {
            name: 'Shiden',
            symbol: 'SDN',
            decimals: 18,
        },
        infoURL: 'https://shiden.astar.network/',
        shortName: 'sdn',
        chainId: 336,
        networkId: 336,
        explorers: [
            {
                name: 'subscan',
                url: 'https://shiden.subscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Cronos Testnet',
        chain: 'CRO',
        rpc: ['https://cronos-testnet-3.crypto.org:8545', 'wss://cronos-testnet-3.crypto.org:8546'],
        faucets: ['https://cronos.crypto.org/faucet'],
        nativeCurrency: {
            name: 'Crypto.org Test Coin',
            symbol: 'TCRO',
            decimals: 18,
        },
        infoURL: 'https://cronos.crypto.org',
        shortName: 'tcro',
        chainId: 338,
        networkId: 338,
        explorers: [
            {
                name: 'Cronos Testnet Explorer',
                url: 'https://cronos.crypto.org/explorer/testnet3',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Theta Mainnet',
        chain: 'Theta',
        rpc: ['https://eth-rpc-api.thetatoken.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Theta Fuel',
            symbol: 'TFUEL',
            decimals: 18,
        },
        infoURL: 'https://www.thetatoken.org/',
        shortName: 'theta-mainnet',
        chainId: 361,
        networkId: 361,
        explorers: [
            {
                name: 'Theta Mainnet Explorer',
                url: 'https://explorer.thetatoken.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Theta Sapphire Testnet',
        chain: 'Theta',
        rpc: ['https://eth-rpc-api-sapphire.thetatoken.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Theta Fuel',
            symbol: 'TFUEL',
            decimals: 18,
        },
        infoURL: 'https://www.thetatoken.org/',
        shortName: 'theta-sapphire',
        chainId: 363,
        networkId: 363,
        explorers: [
            {
                name: 'Theta Sapphire Testnet Explorer',
                url: 'https://guardian-testnet-sapphire-explorer.thetatoken.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Theta Amber Testnet',
        chain: 'Theta',
        rpc: ['https://eth-rpc-api-amber.thetatoken.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Theta Fuel',
            symbol: 'TFUEL',
            decimals: 18,
        },
        infoURL: 'https://www.thetatoken.org/',
        shortName: 'theta-amber',
        chainId: 364,
        networkId: 364,
        explorers: [
            {
                name: 'Theta Amber Testnet Explorer',
                url: 'https://guardian-testnet-amber-explorer.thetatoken.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Theta Testnet',
        chain: 'Theta',
        rpc: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Theta Fuel',
            symbol: 'TFUEL',
            decimals: 18,
        },
        infoURL: 'https://www.thetatoken.org/',
        shortName: 'theta-testnet',
        chainId: 365,
        networkId: 365,
        explorers: [
            {
                name: 'Theta Testnet Explorer',
                url: 'https://testnet-explorer.thetatoken.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'PulseChain Mainnet',
        shortName: 'pls',
        chain: 'PLS',
        chainId: 369,
        networkId: 369,
        infoURL: 'https://pulsechain.com/',
        rpc: ['https://rpc.mainnet.pulsechain.com/', 'wss://rpc.mainnet.pulsechain.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'Pulse',
            symbol: 'PLS',
            decimals: 18,
        },
    },
    {
        name: 'Lisinski',
        chain: 'CRO',
        rpc: ['https://rpc-bitfalls1.lisinski.online'],
        faucets: ['https://pipa.lisinski.online'],
        nativeCurrency: {
            name: 'Lisinski Ether',
            symbol: 'LISINS',
            decimals: 18,
        },
        infoURL: 'https://lisinski.online',
        shortName: 'lisinski',
        chainId: 385,
        networkId: 385,
    },
    {
        name: 'Optimistic Ethereum Testnet Goerli',
        chain: 'ETH',
        rpc: ['https://goerli.optimism.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'Görli Ether',
            symbol: 'GOR',
            decimals: 18,
        },
        infoURL: 'https://optimism.io',
        shortName: 'ogor',
        chainId: 420,
        networkId: 420,
    },
    {
        name: 'Rupaya',
        chain: 'RUPX',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Rupaya',
            symbol: 'RUPX',
            decimals: 18,
        },
        infoURL: 'https://www.rupx.io',
        shortName: 'rupx',
        chainId: 499,
        networkId: 499,
        slip44: 499,
    },
    {
        name: 'Double-A Chain Mainnet',
        chain: 'AAC',
        rpc: ['https://rpc.acuteangle.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Acuteangle Native Token',
            symbol: 'AAC',
            decimals: 18,
        },
        infoURL: 'https://www.acuteangle.com/',
        shortName: 'aac',
        chainId: 512,
        networkId: 512,
        slip44: 1512,
        explorers: [
            {
                name: 'aacscan',
                url: 'https://scan.acuteangle.com',
                standard: 'EIP3091',
            },
        ],
        icon: 'aac',
    },
    {
        name: 'Double-A Chain Testnet',
        chain: 'AAC',
        icon: 'aac',
        rpc: ['https://rpc-testnet.acuteangle.com'],
        faucets: ['https://scan-testnet.acuteangle.com/faucet'],
        nativeCurrency: {
            name: 'Acuteangle Native Token',
            symbol: 'AAC',
            decimals: 18,
        },
        infoURL: 'https://www.acuteangle.com/',
        shortName: 'aact',
        chainId: 513,
        networkId: 513,
        explorers: [
            {
                name: 'aacscan-testnet',
                url: 'https://scan-testnet.acuteangle.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Vela1 Chain Mainnet',
        chain: 'VELA1',
        rpc: ['https://rpc.velaverse.io'],
        faucets: [],
        nativeCurrency: {
            name: 'CLASS COIN',
            symbol: 'CLASS',
            decimals: 18,
        },
        infoURL: 'https://velaverse.io',
        shortName: 'CLASS',
        chainId: 555,
        networkId: 555,
        explorers: [
            {
                name: 'Vela1 Chain Mainnet Explorer',
                url: 'https://exp.velaverse.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Tao Network',
        chain: 'TAO',
        rpc: [
            'https://rpc.testnet.tao.network',
            'http://rpc.testnet.tao.network:8545',
            'https://rpc.tao.network',
            'wss://rpc.tao.network',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Tao',
            symbol: 'TAO',
            decimals: 18,
        },
        infoURL: 'https://tao.network',
        shortName: 'tao',
        chainId: 558,
        networkId: 558,
    },
    {
        name: 'Metis Stardust Testnet',
        chain: 'ETH',
        rpc: ['https://stardust.metis.io/?owner=588'],
        faucets: [],
        nativeCurrency: {
            name: 'tMetis',
            symbol: 'METIS',
            decimals: 18,
        },
        infoURL: 'https://www.metis.io',
        shortName: 'metis-stardust',
        chainId: 588,
        networkId: 588,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://stardust-explorer.metis.io',
                standard: 'EIP3091',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-4',
            bridges: [
                {
                    url: 'https://bridge.metis.io',
                },
            ],
        },
    },
    {
        name: 'Acala Mandala Testnet',
        chain: 'mACA',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Acala Mandala Token',
            symbol: 'mACA',
            decimals: 18,
        },
        infoURL: 'https://acala.network',
        shortName: 'maca',
        chainId: 595,
        networkId: 595,
    },
    {
        name: 'Meshnyan testnet',
        chain: 'MeshTestChain',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Meshnyan Testnet Native Token',
            symbol: 'MESHT',
            decimals: 18,
        },
        infoURL: '',
        shortName: 'mesh-chain-testnet',
        chainId: 600,
        networkId: 600,
    },
    {
        name: 'Pixie Chain Testnet',
        chain: 'PixieChain',
        rpc: ['https://http-testnet.chain.pixie.xyz', 'wss://ws-testnet.chain.pixie.xyz'],
        faucets: ['https://chain.pixie.xyz/faucet'],
        nativeCurrency: {
            name: 'Pixie Chain Testnet Native Token',
            symbol: 'PCTT',
            decimals: 18,
        },
        infoURL: 'https://scan-testnet.chain.pixie.xyz',
        shortName: 'pixie-chain-testnet',
        chainId: 666,
        networkId: 666,
    },
    {
        name: 'Karura Network',
        chain: 'KAR',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Karura Token',
            symbol: 'KAR',
            decimals: 18,
        },
        infoURL: 'https://karura.network',
        shortName: 'kar',
        chainId: 686,
        networkId: 686,
        slip44: 686,
    },
    {
        name: 'Star Social Testnet',
        chain: 'SNS',
        rpc: ['https://avastar.cc/ext/bc/C/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Social',
            symbol: 'SNS',
            decimals: 18,
        },
        infoURL: 'https://info.avastar.cc',
        shortName: 'SNS',
        chainId: 700,
        networkId: 700,
        explorers: [
            {
                name: 'starscan',
                url: 'https://avastar.info',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'BlockChain Station Mainnet',
        chain: 'BCS',
        rpc: ['https://rpc-mainnet.bcsdev.io', 'wss://rpc-ws-mainnet.bcsdev.io'],
        faucets: [],
        nativeCurrency: {
            name: 'BCS Token',
            symbol: 'BCS',
            decimals: 18,
        },
        infoURL: 'https://blockchainstation.io',
        shortName: 'bcs',
        chainId: 707,
        networkId: 707,
        explorers: [
            {
                name: 'BlockChain Station Explorer',
                url: 'https://explorer.bcsdev.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'BlockChain Station Testnet',
        chain: 'BCS',
        rpc: ['https://rpc-testnet.bcsdev.io', 'wss://rpc-ws-testnet.bcsdev.io'],
        faucets: ['https://faucet.bcsdev.io'],
        nativeCurrency: {
            name: 'BCS Testnet Token',
            symbol: 'tBCS',
            decimals: 18,
        },
        infoURL: 'https://blockchainstation.io',
        shortName: 'tbcs',
        chainId: 708,
        networkId: 708,
        explorers: [
            {
                name: 'BlockChain Station Explorer',
                url: 'https://testnet.bcsdev.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Factory 127 Testnet',
        chain: 'FETH',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Factory 127 Token',
            symbol: 'FETH',
            decimals: 18,
        },
        infoURL: 'https://www.factory127.com',
        shortName: 'tfeth',
        chainId: 721,
        networkId: 721,
        slip44: 721,
    },
    {
        name: 'cheapETH',
        chain: 'cheapETH',
        rpc: ['https://node.cheapeth.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'cTH',
            symbol: 'cTH',
            decimals: 18,
        },
        infoURL: 'https://cheapeth.org/',
        shortName: 'cth',
        chainId: 777,
        networkId: 777,
    },
    {
        name: 'Acala Network',
        chain: 'ACA',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Acala Token',
            symbol: 'ACA',
            decimals: 18,
        },
        infoURL: 'https://acala.network',
        shortName: 'aca',
        chainId: 787,
        networkId: 787,
        slip44: 787,
    },
    {
        name: 'Aerochain Testnet',
        chain: 'Aerochain',
        network: 'testnet',
        rpc: ['https://testnet-rpc.aerochain.id/'],
        faucets: ['https://faucet.aerochain.id/'],
        nativeCurrency: {
            name: 'Aerochain Testnet',
            symbol: 'TAero',
            decimals: 18,
        },
        infoURL: 'https://aerochaincoin.org/',
        shortName: 'taero',
        chainId: 788,
        networkId: 788,
        explorers: [
            {
                name: 'aeroscan',
                url: 'https://testnet.aeroscan.id',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Haic',
        chain: 'Haic',
        rpc: ['https://orig.haichain.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'Haicoin',
            symbol: 'HAIC',
            decimals: 18,
        },
        infoURL: 'https://www.haichain.io/',
        shortName: 'haic',
        chainId: 803,
        networkId: 803,
    },
    {
        name: 'Callisto Mainnet',
        chain: 'CLO',
        rpc: ['https://clo-geth.0xinfra.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Callisto Mainnet Ether',
            symbol: 'CLO',
            decimals: 18,
        },
        infoURL: 'https://callisto.network',
        shortName: 'clo',
        chainId: 820,
        networkId: 1,
        slip44: 820,
    },
    {
        name: 'Callisto Testnet',
        chain: 'CLO',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Callisto Testnet Ether',
            symbol: 'TCLO',
            decimals: 18,
        },
        infoURL: 'https://callisto.network',
        shortName: 'tclo',
        chainId: 821,
        networkId: 2,
    },
    {
        name: 'Ambros Chain Mainnet',
        chain: 'ambroschain',
        rpc: ['https://mainnet.ambroschain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'AMBROS',
            symbol: 'AMBR',
            decimals: 18,
        },
        infoURL: 'https://bcmhunt.com/',
        shortName: 'ambros',
        chainId: 880,
        networkId: 880,
        explorers: [
            {
                name: 'Ambros Chain Explorer',
                url: 'https://explorer.ambroschain.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Wanchain',
        chain: 'WAN',
        rpc: ['https://gwan-ssl.wandevs.org:56891/'],
        faucets: [],
        nativeCurrency: {
            name: 'Wancoin',
            symbol: 'WAN',
            decimals: 18,
        },
        infoURL: 'https://www.wanscan.org',
        shortName: 'wan',
        chainId: 888,
        networkId: 888,
        slip44: 5718350,
    },
    {
        name: 'Garizon Testnet Stage0',
        chain: 'GAR',
        network: 'testnet',
        icon: 'garizon',
        rpc: ['https://s0-testnet.garizon.net/rpc'],
        faucets: ['https://faucet-testnet.garizon.com'],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-test-s0',
        chainId: 900,
        networkId: 900,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer-testnet.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Garizon Testnet Stage1',
        chain: 'GAR',
        network: 'testnet',
        icon: 'garizon',
        rpc: ['https://s1-testnet.garizon.net/rpc'],
        faucets: ['https://faucet-testnet.garizon.com'],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-test-s1',
        chainId: 901,
        networkId: 901,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer-testnet.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-900',
            type: 'shard',
        },
    },
    {
        name: 'Garizon Testnet Stage2',
        chain: 'GAR',
        network: 'testnet',
        icon: 'garizon',
        rpc: ['https://s2-testnet.garizon.net/rpc'],
        faucets: ['https://faucet-testnet.garizon.com'],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-test-s2',
        chainId: 902,
        networkId: 902,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer-testnet.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-900',
            type: 'shard',
        },
    },
    {
        name: 'Garizon Testnet Stage3',
        chain: 'GAR',
        network: 'testnet',
        icon: 'garizon',
        rpc: ['https://s3-testnet.garizon.net/rpc'],
        faucets: ['https://faucet-testnet.garizon.com'],
        nativeCurrency: {
            name: 'Garizon',
            symbol: 'GAR',
            decimals: 18,
        },
        infoURL: 'https://garizon.com',
        shortName: 'gar-test-s3',
        chainId: 903,
        networkId: 903,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer-testnet.garizon.com',
                icon: 'garizon',
                standard: 'EIP3091',
            },
        ],
        parent: {
            chain: 'eip155-900',
            type: 'shard',
        },
    },
    {
        name: 'PulseChain Testnet',
        shortName: 'tpls',
        chain: 'tPLS',
        chainId: 940,
        networkId: 940,
        infoURL: 'https://pulsechain.com/',
        rpc: ['https://rpc.v2.testnet.pulsechain.com/', 'wss://rpc.v2.testnet.pulsechain.com/'],
        faucets: ['https://faucet.v2.testnet.pulsechain.com/'],
        nativeCurrency: {
            name: 'Test Pulse',
            symbol: 'tPLS',
            decimals: 18,
        },
    },
    {
        name: 'PulseChain Testnet v2b',
        shortName: 't2bpls',
        chain: 't2bPLS',
        network: 'testnet-2b',
        chainId: 941,
        networkId: 941,
        infoURL: 'https://pulsechain.com/',
        rpc: ['https://rpc.v2b.testnet.pulsechain.com/', 'wss://rpc.v2b.testnet.pulsechain.com/'],
        faucets: ['https://faucet.v2b.testnet.pulsechain.com/'],
        nativeCurrency: {
            name: 'Test Pulse',
            symbol: 'tPLS',
            decimals: 18,
        },
    },
    {
        name: 'PulseChain Testnet v3',
        shortName: 't3pls',
        chain: 't3PLS',
        network: 'testnet-3',
        chainId: 942,
        networkId: 942,
        infoURL: 'https://pulsechain.com/',
        rpc: ['https://rpc.v3.testnet.pulsechain.com/', 'wss://rpc.v3.testnet.pulsechain.com/'],
        faucets: ['https://faucet.v3.testnet.pulsechain.com/'],
        nativeCurrency: {
            name: 'Test Pulse',
            symbol: 'tPLS',
            decimals: 18,
        },
    },
    {
        name: 'Nepal Blockchain Network',
        chain: 'YETI',
        rpc: ['https://api.nepalblockchain.dev', 'https://api.nepalblockchain.network'],
        faucets: ['https://faucet.nepalblockchain.network'],
        nativeCurrency: {
            name: 'Nepal Blockchain Network Ether',
            symbol: 'YETI',
            decimals: 18,
        },
        infoURL: 'https://nepalblockchain.network',
        shortName: 'yeti',
        chainId: 977,
        networkId: 977,
    },
    {
        name: 'Lucky Network',
        chain: 'LN',
        rpc: ['https://rpc.luckynetwork.org', 'wss://ws.lnscan.org', 'https://rpc.lnscan.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Lucky',
            symbol: 'L99',
            decimals: 18,
        },
        infoURL: 'https://luckynetwork.org',
        shortName: 'ln',
        chainId: 998,
        networkId: 998,
        icon: 'lucky',
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.luckynetwork.org',
                standard: 'none',
            },
            {
                name: 'expedition',
                url: 'https://lnscan.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Wanchain Testnet',
        chain: 'WAN',
        rpc: ['https://gwan-ssl.wandevs.org:46891/'],
        faucets: [],
        nativeCurrency: {
            name: 'Wancoin',
            symbol: 'WAN',
            decimals: 18,
        },
        infoURL: 'https://testnet.wanscan.org',
        shortName: 'twan',
        chainId: 999,
        networkId: 999,
    },
    {
        name: 'Klaytn Testnet Baobab',
        chain: 'KLAY',
        rpc: ['https://api.baobab.klaytn.net:8651'],
        faucets: ['https://baobab.wallet.klaytn.com/access?next=faucet'],
        nativeCurrency: {
            name: 'KLAY',
            symbol: 'KLAY',
            decimals: 18,
        },
        infoURL: 'https://www.klaytn.com/',
        shortName: 'Baobab',
        chainId: 1001,
        networkId: 1001,
    },
    {
        name: 'Newton Testnet',
        chain: 'NEW',
        rpc: ['https://rpc1.newchain.newtonproject.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Newton',
            symbol: 'NEW',
            decimals: 18,
        },
        infoURL: 'https://www.newtonproject.org/',
        shortName: 'tnew',
        chainId: 1007,
        networkId: 1007,
    },
    {
        name: 'Eurus Mainnet',
        chain: 'EUN',
        network: 'eurus',
        rpc: ['https://mainnet.eurus.network/'],
        faucets: [],
        nativeCurrency: {
            name: 'Eurus',
            symbol: 'EUN',
            decimals: 18,
        },
        infoURL: 'https://eurus.network',
        shortName: 'eun',
        chainId: 1008,
        networkId: 1008,
        icon: 'eurus',
        explorers: [
            {
                name: 'eurusexplorer',
                url: 'https://explorer.eurus.network',
                icon: 'eurus',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Evrice Network',
        chain: 'EVC',
        rpc: ['https://meta.evrice.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Evrice',
            symbol: 'EVC',
            decimals: 18,
        },
        infoURL: 'https://evrice.com',
        shortName: 'EVC',
        chainId: 1010,
        networkId: 1010,
        slip44: 1020,
    },
    {
        name: 'Newton',
        chain: 'NEW',
        rpc: ['https://global.rpc.mainnet.newtonproject.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Newton',
            symbol: 'NEW',
            decimals: 18,
        },
        infoURL: 'https://www.newtonproject.org/',
        shortName: 'new',
        chainId: 1012,
        networkId: 1012,
    },
    {
        name: 'Sakura',
        chain: 'Sakura',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Sakura',
            symbol: 'SKU',
            decimals: 18,
        },
        infoURL: 'https://clover.finance/sakura',
        shortName: 'sku',
        chainId: 1022,
        networkId: 1022,
    },
    {
        name: 'Clover Testnet',
        chain: 'Clover',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Clover',
            symbol: 'CLV',
            decimals: 18,
        },
        infoURL: 'https://clover.finance',
        shortName: 'tclv',
        chainId: 1023,
        networkId: 1023,
    },
    {
        name: 'Clover Mainnet',
        chain: 'Clover',
        rpc: ['https://rpc-ivy.clover.finance', 'https://rpc-ivy-2.clover.finance', 'https://rpc-ivy-3.clover.finance'],
        faucets: [],
        nativeCurrency: {
            name: 'Clover',
            symbol: 'CLV',
            decimals: 18,
        },
        infoURL: 'https://clover.finance',
        shortName: 'clv',
        chainId: 1024,
        networkId: 1024,
    },
    {
        name: 'BitTorrent Chain Testnet',
        chain: 'BTTC',
        rpc: ['https://testrpc.bittorrentchain.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'BitTorrent',
            symbol: 'BTT',
            decimals: 18,
        },
        infoURL: 'https://bittorrentchain.io/',
        shortName: 'tbtt',
        chainId: 1028,
        networkId: 1028,
        explorers: [
            {
                name: 'testbttcscan',
                url: 'https://testscan.bittorrentchain.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Conflux eSpace',
        chain: 'Conflux',
        network: 'mainnet',
        rpc: ['https://evm.confluxrpc.com'],
        faucets: [],
        nativeCurrency: {
            name: 'CFX',
            symbol: 'CFX',
            decimals: 18,
        },
        infoURL: 'https://confluxnetwork.org',
        shortName: 'cfx',
        chainId: 1030,
        networkId: 1030,
        icon: 'conflux',
        explorers: [
            {
                name: 'Conflux Scan',
                url: 'https://evm.confluxscan.net',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Metis Andromeda Mainnet',
        chain: 'ETH',
        rpc: ['https://andromeda.metis.io/?owner=1088'],
        faucets: [],
        nativeCurrency: {
            name: 'Metis',
            symbol: 'METIS',
            decimals: 18,
        },
        infoURL: 'https://www.metis.io',
        shortName: 'metis-andromeda',
        chainId: 1088,
        networkId: 1088,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://andromeda-explorer.metis.io',
                standard: 'EIP3091',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-1',
            bridges: [
                {
                    url: 'https://bridge.metis.io',
                },
            ],
        },
    },
    {
        name: 'MathChain',
        chain: 'MATH',
        rpc: ['https://mathchain-asia.maiziqianbao.net/rpc', 'https://mathchain-us.maiziqianbao.net/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'MathChain',
            symbol: 'MATH',
            decimals: 18,
        },
        infoURL: 'https://mathchain.org',
        shortName: 'MATH',
        chainId: 1139,
        networkId: 1139,
    },
    {
        name: 'MathChain Testnet',
        chain: 'MATH',
        rpc: ['https://galois-hk.maiziqianbao.net/rpc'],
        faucets: ['https://scan.boka.network/#/Galois/faucet'],
        nativeCurrency: {
            name: 'MathChain',
            symbol: 'MATH',
            decimals: 18,
        },
        infoURL: 'https://mathchain.org',
        shortName: 'tMATH',
        chainId: 1140,
        networkId: 1140,
    },
    {
        name: 'Iora Chain',
        chain: 'IORA',
        network: 'iorachain',
        icon: 'iorachain',
        rpc: ['https://dataseed.iorachain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Iora',
            symbol: 'IORA',
            decimals: 18,
        },
        infoURL: 'https://iorachain.com',
        shortName: 'iora',
        chainId: 1197,
        networkId: 1197,
        explorers: [
            {
                name: 'ioraexplorer',
                url: 'https://explorer.iorachain.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Evanesco Testnet',
        chain: 'Evanesco Testnet',
        network: 'avis',
        rpc: ['https://seed5.evanesco.org:8547'],
        faucets: [],
        nativeCurrency: {
            name: 'AVIS',
            symbol: 'AVIS',
            decimals: 18,
        },
        infoURL: 'https://evanesco.org/',
        shortName: 'avis',
        chainId: 1201,
        networkId: 1201,
    },
    {
        name: 'World Trade Technical Chain Mainnet',
        chain: 'WTT',
        rpc: ['https://rpc.cadaut.com', 'wss://rpc.cadaut.com/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'World Trade Token',
            symbol: 'WTT',
            decimals: 18,
        },
        infoURL: 'http://www.cadaut.com',
        shortName: 'wtt',
        chainId: 1202,
        networkId: 2048,
        explorers: [
            {
                name: 'WTTScout',
                url: 'https://explorer.cadaut.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Popcateum Mainnet',
        chain: 'POPCATEUM',
        rpc: ['https://dataseed.popcateum.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Popcat',
            symbol: 'POP',
            decimals: 18,
        },
        infoURL: 'https://popcateum.org',
        shortName: 'popcat',
        chainId: 1213,
        networkId: 1213,
        explorers: [
            {
                name: 'popcateum explorer',
                url: 'https://explorer.popcateum.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'EnterChain Mainnet',
        chain: 'ENTER',
        network: 'mainnet',
        rpc: ['https://tapi.entercoin.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'EnterCoin',
            symbol: 'ENTER',
            decimals: 18,
        },
        infoURL: 'https://entercoin.net',
        shortName: 'enter',
        chainId: 1214,
        networkId: 1214,
        icon: 'enter',
        explorers: [
            {
                name: 'Enter Explorer - Expenter',
                url: 'https://explorer.entercoin.net',
                icon: 'enter',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'HALO Mainnet',
        chain: 'HALO',
        rpc: ['https://nodes.halo.land'],
        faucets: [],
        nativeCurrency: {
            name: 'HALO',
            symbol: 'HO',
            decimals: 18,
        },
        infoURL: 'https://halo.land/#/',
        shortName: 'HO',
        chainId: 1280,
        networkId: 1280,
        explorers: [
            {
                name: 'HALOexplorer',
                url: 'https://browser.halo.land',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Moonbeam',
        chain: 'MOON',
        rpc: ['https://rpc.api.moonbeam.network', 'wss://wss.api.moonbeam.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Glimmer',
            symbol: 'GLMR',
            decimals: 18,
        },
        infoURL: 'https://moonbeam.network/networks/moonbeam/',
        shortName: 'mbeam',
        chainId: 1284,
        networkId: 1284,
        explorers: [
            {
                name: 'moonscan',
                url: 'https://moonbeam.moonscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Moonriver',
        chain: 'MOON',
        rpc: ['https://rpc.api.moonriver.moonbeam.network', 'wss://wss.api.moonriver.moonbeam.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Moonriver',
            symbol: 'MOVR',
            decimals: 18,
        },
        infoURL: 'https://moonbeam.network/networks/moonriver/',
        shortName: 'mriver',
        chainId: 1285,
        networkId: 1285,
        explorers: [
            {
                name: 'moonscan',
                url: 'https://moonriver.moonscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Moonrock old',
        chain: 'MOON',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Rocs',
            symbol: 'ROC',
            decimals: 18,
        },
        infoURL: '',
        shortName: 'mrock-old',
        chainId: 1286,
        networkId: 1286,
        deprecated: true,
    },
    {
        name: 'Moonbase Alpha',
        chain: 'MOON',
        rpc: ['https://rpc.api.moonbase.moonbeam.network', 'wss://wss.api.moonbase.moonbeam.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Dev',
            symbol: 'DEV',
            decimals: 18,
        },
        infoURL: 'https://docs.moonbeam.network/networks/testnet/',
        shortName: 'mbase',
        chainId: 1287,
        networkId: 1287,
        explorers: [
            {
                name: 'moonscan',
                url: 'https://moonbase.moonscan.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Moonrock',
        chain: 'MOON',
        rpc: ['https://rpc.api.moonrock.moonbeam.network', 'wss://wss.api.moonrock.moonbeam.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Rocs',
            symbol: 'ROC',
            decimals: 18,
        },
        infoURL: 'https://docs.moonbeam.network/learn/platform/networks/overview/',
        shortName: 'mrock',
        chainId: 1288,
        networkId: 1288,
    },
    {
        name: 'CENNZnet old',
        chain: 'CENNZnet',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'CPAY',
            symbol: 'CPAY',
            decimals: 18,
        },
        infoURL: 'https://cennz.net',
        shortName: 'cennz-old',
        chainId: 1337,
        networkId: 1337,
        deprecated: true,
    },
    {
        name: 'Catecoin Chain Mainnet',
        chain: 'Catechain',
        rpc: ['https://send.catechain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Catecoin',
            symbol: 'CATE',
            decimals: 18,
        },
        infoURL: 'https://catechain.com',
        shortName: 'cate',
        chainId: 1618,
        networkId: 1618,
    },
    {
        name: 'Atheios',
        chain: 'ATH',
        rpc: ['https://wallet.atheios.com:8797'],
        faucets: [],
        nativeCurrency: {
            name: 'Atheios Ether',
            symbol: 'ATH',
            decimals: 18,
        },
        infoURL: 'https://atheios.com',
        shortName: 'ath',
        chainId: 1620,
        networkId: 11235813,
        slip44: 1620,
    },
    {
        name: 'Btachain',
        chain: 'btachain',
        rpc: ['https://dataseed1.btachain.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'Bitcoin Asset',
            symbol: 'BTA',
            decimals: 18,
        },
        infoURL: 'https://bitcoinasset.io/',
        shortName: 'bta',
        chainId: 1657,
        networkId: 1657,
    },
    {
        name: 'LUDAN Mainnet',
        chain: 'LUDAN',
        rpc: ['https://rpc.ludan.org/'],
        faucets: [],
        nativeCurrency: {
            name: 'LUDAN',
            symbol: 'LUDAN',
            decimals: 18,
        },
        infoURL: 'https://www.ludan.org/',
        shortName: 'LUDAN',
        icon: 'ludan',
        chainId: 1688,
        networkId: 1688,
    },
    {
        name: 'Teslafunds',
        chain: 'TSF',
        rpc: ['https://tsfapi.europool.me'],
        faucets: [],
        nativeCurrency: {
            name: 'Teslafunds Ether',
            symbol: 'TSF',
            decimals: 18,
        },
        infoURL: 'https://teslafunds.io',
        shortName: 'tsf',
        chainId: 1856,
        networkId: 1,
    },
    {
        name: 'BON Network',
        chain: 'BON',
        network: 'testnet',
        rpc: ['http://rpc.boyanet.org:8545', 'ws://rpc.boyanet.org:8546'],
        faucets: [],
        nativeCurrency: {
            name: 'BOYACoin',
            symbol: 'BOY',
            decimals: 18,
        },
        infoURL: 'https://boyanet.org',
        shortName: 'boya',
        chainId: 1898,
        networkId: 1,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.boyanet.org:4001',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Eurus Testnet',
        chain: 'EUN',
        network: 'eurus-testnet',
        rpc: ['https://testnet.eurus.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Eurus',
            symbol: 'EUN',
            decimals: 18,
        },
        infoURL: 'https://eurus.network',
        shortName: 'euntest',
        chainId: 1984,
        networkId: 1984,
        icon: 'eurus',
        explorers: [
            {
                name: 'testnetexplorer',
                url: 'https://testnetexplorer.eurus.network',
                icon: 'eurus',
                standard: 'none',
            },
        ],
    },
    {
        name: 'EtherGem',
        chain: 'EGEM',
        rpc: ['https://jsonrpc.egem.io/custom'],
        faucets: [],
        nativeCurrency: {
            name: 'EtherGem Ether',
            symbol: 'EGEM',
            decimals: 18,
        },
        infoURL: 'https://egem.io',
        shortName: 'egem',
        chainId: 1987,
        networkId: 1987,
        slip44: 1987,
    },
    {
        name: 'Milkomeda C1 Mainnet',
        chain: 'milkAda',
        icon: 'milkomeda',
        network: 'mainnet',
        rpc: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com', 'wss://rpc-mainnet-cardano-evm.c1.milkomeda.com'],
        faucets: [],
        nativeCurrency: {
            name: 'milkAda',
            symbol: 'mADA',
            decimals: 18,
        },
        infoURL: 'https://milkomeda.com',
        shortName: 'milkAda',
        chainId: 2001,
        networkId: 2001,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com',
                standard: 'none',
            },
        ],
    },
    {
        name: '420coin',
        chain: '420',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'Fourtwenty',
            symbol: '420',
            decimals: 18,
        },
        infoURL: 'https://420integrated.com',
        shortName: '420',
        chainId: 2020,
        networkId: 2020,
    },
    {
        name: 'Edgeware Mainnet',
        chain: 'EDG',
        rpc: ['https://mainnet1.edgewa.re'],
        faucets: [],
        nativeCurrency: {
            name: 'Edge',
            symbol: 'EDG',
            decimals: 18,
        },
        infoURL: 'http://edgewa.re',
        shortName: 'edg',
        chainId: 2021,
        networkId: 2021,
    },
    {
        name: 'Beresheet Testnet',
        chain: 'EDG',
        rpc: ['https://beresheet1.edgewa.re'],
        faucets: [],
        nativeCurrency: {
            name: 'Testnet Edge',
            symbol: 'tEDG',
            decimals: 18,
        },
        infoURL: 'http://edgewa.re',
        shortName: 'edgt',
        chainId: 2022,
        networkId: 2022,
    },
    {
        name: 'Rangers Protocol Mainnet',
        chain: 'Rangers',
        icon: 'rangers',
        rpc: ['https://mainnet.rangersprotocol.com/api/jsonrpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Rangers Protocol Gas',
            symbol: 'RPG',
            decimals: 18,
        },
        infoURL: 'https://rangersprotocol.com',
        shortName: 'rpg',
        chainId: 2025,
        networkId: 2025,
        slip44: 1008,
        explorers: [
            {
                name: 'rangersscan',
                url: 'https://scan.rangersprotocol.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Ecoball Mainnet',
        chain: 'ECO',
        rpc: ['https://api.ecoball.org/ecoball/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ecoball Coin',
            symbol: 'ECO',
            decimals: 18,
        },
        infoURL: 'https://ecoball.org',
        shortName: 'eco',
        chainId: 2100,
        networkId: 2100,
        explorers: [
            {
                name: 'Ecoball Explorer',
                url: 'https://scan.ecoball.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ecoball Testnet Espuma',
        chain: 'ECO',
        rpc: ['https://api.ecoball.org/espuma/'],
        faucets: [],
        nativeCurrency: {
            name: 'Espuma Coin',
            symbol: 'ECO',
            decimals: 18,
        },
        infoURL: 'https://ecoball.org',
        shortName: 'esp',
        chainId: 2101,
        networkId: 2101,
        explorers: [
            {
                name: 'Ecoball Testnet Explorer',
                url: 'https://espuma-scan.ecoball.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Findora Mainnet',
        chain: 'Findora',
        network: 'mainnet',
        rpc: ['https://prod-mainnet.prod.findora.org:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'FRA',
            symbol: 'FRA',
            decimals: 18,
        },
        infoURL: 'https://findora.org/',
        shortName: 'fra',
        chainId: 2152,
        networkId: 2152,
        explorers: [
            {
                name: 'findorascan',
                url: 'https://evm.findorascan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Findora Testnet',
        chain: 'Testnet-anvil',
        network: 'testnet',
        rpc: ['https://prod-testnet.prod.findora.org:8545/'],
        faucets: [],
        nativeCurrency: {
            name: 'FRA',
            symbol: 'FRA',
            decimals: 18,
        },
        infoURL: 'https://findora.org/',
        shortName: 'findora-testnet',
        chainId: 2153,
        networkId: 2153,
        explorers: [
            {
                name: 'findorascan',
                url: 'https://testnet-anvil.evm.findorascan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Evanesco Mainnet',
        chain: 'EVA',
        network: 'mainnet',
        rpc: ['https://seed4.evanesco.org:8546'],
        faucets: [],
        nativeCurrency: {
            name: 'EVA',
            symbol: 'EVA',
            decimals: 18,
        },
        infoURL: 'https://evanesco.org/',
        shortName: 'evanesco',
        chainId: 2213,
        networkId: 2213,
        icon: 'evanesco',
        explorers: [
            {
                name: 'Evanesco Explorer',
                url: 'https://explorer.evanesco.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Kava EVM Testnet',
        chain: 'KAVA',
        network: 'testnet',
        rpc: ['https://evm.evm-alpha.kava.io', 'wss://evm-ws.evm-alpha.kava.io'],
        faucets: ['https://faucet.kava.io'],
        nativeCurrency: {
            name: 'Kava',
            symbol: 'KAVA',
            decimals: 18,
        },
        infoURL: 'https://www.kava.io',
        shortName: 'kava',
        chainId: 2221,
        networkId: 2221,
        icon: 'kava',
        explorers: [
            {
                name: 'Kava Testnet Explorer',
                url: 'https://explorer.evm-alpha.kava.io',
                standard: 'EIP3091',
                icon: 'kava',
            },
        ],
    },
    {
        name: 'Kortho Mainnet',
        chain: 'Kortho Chain',
        rpc: ['https://www.kortho-chain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'KorthoChain',
            symbol: 'KTO',
            decimals: 11,
        },
        infoURL: 'https://www.kortho.io/',
        shortName: 'ktoc',
        chainId: 2559,
        networkId: 2559,
    },
    {
        name: 'CENNZnet Rata',
        chain: 'CENNZnet',
        network: 'rata',
        rpc: ['https://rata.centrality.me/public'],
        faucets: ['https://app-faucet.centrality.me'],
        nativeCurrency: {
            name: 'CPAY',
            symbol: 'CPAY',
            decimals: 18,
        },
        infoURL: 'https://cennz.net',
        shortName: 'cennz-r',
        chainId: 3000,
        networkId: 3000,
        icon: 'cennz',
    },
    {
        name: 'CENNZnet Nikau',
        chain: 'CENNZnet',
        network: 'nikau',
        rpc: ['https://nikau.centrality.me/public'],
        faucets: ['https://app-faucet.centrality.me'],
        nativeCurrency: {
            name: 'CPAY',
            symbol: 'CPAY',
            decimals: 18,
        },
        infoURL: 'https://cennz.net',
        shortName: 'cennz-n',
        chainId: 3001,
        networkId: 3001,
        icon: 'cennz',
        explorers: [
            {
                name: 'UNcover',
                url: 'https://www.uncoverexplorer.com/?network=Nikau',
                standard: 'none',
            },
        ],
    },
    {
        name: 'ZCore Testnet',
        chain: 'Beach',
        icon: 'zcore',
        rpc: ['https://rpc-testnet.zcore.cash'],
        faucets: ['https://faucet.zcore.cash'],
        nativeCurrency: {
            name: 'ZCore',
            symbol: 'ZCR',
            decimals: 18,
        },
        infoURL: 'https://zcore.cash',
        shortName: 'zcrbeach',
        chainId: 3331,
        networkId: 3331,
    },
    {
        name: 'Web3Q Testnet',
        chain: 'Web3Q',
        rpc: ['https://testnet.web3q.io:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'Web3Q',
            symbol: 'W3Q',
            decimals: 18,
        },
        infoURL: 'https://testnet.web3q.io/home.w3q/',
        shortName: 'w3q-t',
        chainId: 3333,
        networkId: 3333,
        explorers: [
            {
                name: 'w3q-testnet',
                url: 'https://explorer.testnet.web3q.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Web3Q Galileo',
        chain: 'Web3Q',
        rpc: ['https://galileo.web3q.io:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'Web3Q',
            symbol: 'W3Q',
            decimals: 18,
        },
        infoURL: 'https://galileo.web3q.io/home.w3q/',
        shortName: 'w3q-g',
        chainId: 3334,
        networkId: 3334,
        explorers: [
            {
                name: 'w3q-galileo',
                url: 'https://explorer.galileo.web3q.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Paribu Net Mainnet',
        chain: 'PRB',
        network: 'Paribu Net',
        rpc: ['https://rpc.paribu.network'],
        faucets: [],
        nativeCurrency: {
            name: 'PRB',
            symbol: 'PRB',
            decimals: 18,
        },
        infoURL: 'https://net.paribu.com',
        shortName: 'prb',
        chainId: 3400,
        networkId: 3400,
        icon: 'prb',
        explorers: [
            {
                name: 'Paribu Net Explorer',
                url: 'https://explorer.paribu.network',
                icon: 'explorer',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Paribu Net Testnet',
        chain: 'PRB',
        network: 'Paribu Net',
        rpc: ['https://rpc.testnet.paribuscan.com'],
        faucets: ['https://faucet.paribuscan.com'],
        nativeCurrency: {
            name: 'PRB',
            symbol: 'PRB',
            decimals: 18,
        },
        infoURL: 'https://net.paribu.com',
        shortName: 'prbtestnet',
        chainId: 3500,
        networkId: 3500,
        icon: 'prb',
        explorers: [
            {
                name: 'Paribu Net Testnet Explorer',
                url: 'https://testnet.paribuscan.com',
                icon: 'explorer',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Bittex Mainnet',
        chain: 'BTX',
        rpc: ['https://rpc1.bittexscan.info', 'https://rpc2.bittexscan.info'],
        faucets: [],
        nativeCurrency: {
            name: 'Bittex',
            symbol: 'BTX',
            decimals: 18,
        },
        infoURL: 'https://bittexscan.com',
        shortName: 'btx',
        chainId: 3690,
        networkId: 3690,
        icon: 'ethereum',
        explorers: [
            {
                name: 'bittexscan',
                url: 'https://bittexscan.com',
                icon: 'etherscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'DYNO Mainnet',
        chain: 'DYNO',
        rpc: ['https://api.dynoprotocol.com'],
        faucets: ['https://faucet.dynoscan.io'],
        nativeCurrency: {
            name: 'DYNO Token',
            symbol: 'DYNO',
            decimals: 18,
        },
        infoURL: 'https://dynoprotocol.com',
        shortName: 'dyno',
        chainId: 3966,
        networkId: 3966,
        explorers: [
            {
                name: 'DYNO Explorer',
                url: 'https://dynoscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'DYNO Testnet',
        chain: 'DYNO',
        rpc: ['https://tapi.dynoprotocol.com'],
        faucets: ['https://faucet.dynoscan.io'],
        nativeCurrency: {
            name: 'DYNO Token',
            symbol: 'tDYNO',
            decimals: 18,
        },
        infoURL: 'https://dynoprotocol.com',
        shortName: 'tdyno',
        chainId: 3967,
        networkId: 3967,
        explorers: [
            {
                name: 'DYNO Explorer',
                url: 'https://testnet.dynoscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Fantom Testnet',
        chain: 'FTM',
        rpc: ['https://rpc.testnet.fantom.network'],
        faucets: ['https://faucet.fantom.network'],
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18,
        },
        infoURL: 'https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet',
        shortName: 'tftm',
        chainId: 4002,
        networkId: 4002,
        icon: 'fantom',
        explorers: [
            {
                name: 'ftmscan',
                url: 'https://testnet.ftmscan.com',
                icon: 'ftmscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'AIOZ Network Testnet',
        chain: 'AIOZ',
        network: 'testnet',
        icon: 'aioz',
        rpc: ['https://eth-ds.testnet.aioz.network'],
        faucets: [],
        nativeCurrency: {
            name: 'testAIOZ',
            symbol: 'AIOZ',
            decimals: 18,
        },
        infoURL: 'https://aioz.network',
        shortName: 'aioz-testnet',
        chainId: 4102,
        networkId: 4102,
        slip44: 60,
        explorers: [
            {
                name: 'AIOZ Network Testnet Explorer',
                url: 'https://testnet.explorer.aioz.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'IoTeX Network Mainnet',
        chain: 'iotex.io',
        rpc: ['https://babel-api.mainnet.iotex.io'],
        faucets: [],
        nativeCurrency: {
            name: 'IoTeX',
            symbol: 'IOTX',
            decimals: 18,
        },
        infoURL: 'https://iotex.io',
        shortName: 'iotex-mainnet',
        chainId: 4689,
        networkId: 4689,
        explorers: [
            {
                name: 'iotexscan',
                url: 'https://iotexscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'IoTeX Network Testnet',
        chain: 'iotex.io',
        rpc: ['https://babel-api.testnet.iotex.io'],
        faucets: ['https://faucet.iotex.io/'],
        nativeCurrency: {
            name: 'IoTeX',
            symbol: 'IOTX',
            decimals: 18,
        },
        infoURL: 'https://iotex.io',
        shortName: 'iotex-testnet',
        chainId: 4690,
        networkId: 4690,
        explorers: [
            {
                name: 'testnet iotexscan',
                url: 'https://testnet.iotexscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Venidium Testnet',
        chain: 'XVM',
        rpc: ['https://rpc-evm-testnet.venidium.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Venidium',
            symbol: 'XVM',
            decimals: 18,
        },
        infoURL: 'https://venidium.io',
        shortName: 'xvm',
        chainId: 4918,
        networkId: 4918,
        explorers: [
            {
                name: 'Venidium EVM Testnet Explorer',
                url: 'https://evm-testnet.venidiumexplorer.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'EraSwap Mainnet',
        chain: 'ESN',
        icon: 'eraswap',
        rpc: ['https://mainnet.eraswap.network', 'https://rpc-mumbai.mainnet.eraswap.network'],
        faucets: [],
        nativeCurrency: {
            name: 'EraSwap',
            symbol: 'ES',
            decimals: 18,
        },
        infoURL: 'https://eraswap.info/',
        shortName: 'es',
        chainId: 5197,
        networkId: 5197,
    },
    {
        name: 'Uzmi Network Mainnet',
        chain: 'UZMI',
        rpc: ['https://network.uzmigames.com.br/'],
        faucets: [],
        nativeCurrency: {
            name: 'UZMI',
            symbol: 'UZMI',
            decimals: 18,
        },
        infoURL: 'https://uzmigames.com.br/',
        shortName: 'UZMI',
        chainId: 5315,
        networkId: 5315,
    },
    {
        name: 'Syscoin Tanenbaum Testnet',
        chain: 'SYS',
        rpc: ['https://rpc.tanenbaum.io', 'wss://rpc.tanenbaum.io/wss'],
        faucets: ['https://faucet.tanenbaum.io'],
        nativeCurrency: {
            name: 'Testnet Syscoin',
            symbol: 'tSYS',
            decimals: 18,
        },
        infoURL: 'https://syscoin.org',
        shortName: 'tsys',
        chainId: 5700,
        networkId: 5700,
        explorers: [
            {
                name: 'Syscoin Testnet Block Explorer',
                url: 'https://tanenbaum.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Digest Swarm Chain',
        chain: 'DSC',
        icon: 'swarmchain',
        rpc: ['https://rpc.digestgroup.ltd'],
        faucets: [],
        nativeCurrency: {
            name: 'DigestCoin',
            symbol: 'DGCC',
            decimals: 18,
        },
        infoURL: 'https://digestgroup.ltd',
        shortName: 'dgcc',
        chainId: 5777,
        networkId: 5777,
        explorers: [
            {
                name: 'swarmexplorer',
                url: 'https://explorer.digestgroup.ltd',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Ontology Testnet',
        chain: 'Ontology',
        rpc: [
            'http://polaris1.ont.io:20339',
            'http://polaris2.ont.io:20339',
            'http://polaris3.ont.io:20339',
            'http://polaris4.ont.io:20339',
            'https://polaris1.ont.io:10339',
            'https://polaris2.ont.io:10339',
            'https://polaris3.ont.io:10339',
            'https://polaris4.ont.io:10339',
        ],
        faucets: ['https://developer.ont.io/'],
        nativeCurrency: {
            name: 'ONG',
            symbol: 'ONG',
            decimals: 18,
        },
        infoURL: 'https://ont.io/',
        shortName: 'Ontology Testnet',
        chainId: 5851,
        networkId: 5851,
        explorers: [
            {
                name: 'explorer',
                url: 'https://explorer.ont.io/testnet',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Wegochain Rubidium Mainnet',
        chain: 'RBD',
        rpc: ['https://proxy.wegochain.io', 'http://wallet.wegochain.io:7764'],
        faucets: [],
        nativeCurrency: {
            name: 'Rubid',
            symbol: 'RBD',
            decimals: 18,
        },
        infoURL: 'https://www.wegochain.io',
        shortName: 'rbd',
        chainId: 5869,
        networkId: 5869,
        explorers: [
            {
                name: 'wegoscan2',
                url: 'https://scan2.wegochain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Pixie Chain Mainnet',
        chain: 'PixieChain',
        rpc: ['https://http-mainnet.chain.pixie.xyz', 'wss://ws-mainnet.chain.pixie.xyz'],
        faucets: [],
        nativeCurrency: {
            name: 'Pixie Chain Native Token',
            symbol: 'PIX',
            decimals: 18,
        },
        infoURL: 'https://chain.pixie.xyz',
        shortName: 'pixie-chain',
        chainId: 6626,
        networkId: 6626,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://scan.chain.pixie.xyz',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Shyft Mainnet',
        chain: 'SHYFT',
        icon: 'shyft',
        rpc: ['https://rpc.shyft.network/'],
        faucets: [],
        nativeCurrency: {
            name: 'Shyft',
            symbol: 'SHYFT',
            decimals: 18,
        },
        infoURL: 'https://shyft.network',
        shortName: 'shyft',
        chainId: 7341,
        networkId: 7341,
        slip44: 2147490989,
        explorers: [
            {
                name: 'Shyft BX',
                url: 'https://bx.shyft.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Hazlor Testnet',
        chain: 'SCAS',
        rpc: ['https://hatlas.rpc.hazlor.com:8545', 'wss://hatlas.rpc.hazlor.com:8546'],
        faucets: ['https://faucet.hazlor.com'],
        nativeCurrency: {
            name: 'Hazlor Test Coin',
            symbol: 'TSCAS',
            decimals: 18,
        },
        infoURL: 'https://hazlor.com',
        shortName: 'tscas',
        chainId: 7878,
        networkId: 7878,
        explorers: [
            {
                name: 'Hazlor Testnet Explorer',
                url: 'https://explorer.hazlor.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Teleport',
        chain: 'Teleport',
        rpc: ['https://evm-rpc.teleport.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Tele',
            symbol: 'TELE',
            decimals: 18,
        },
        infoURL: 'https://teleport.network',
        shortName: 'teleport',
        chainId: 8000,
        networkId: 8000,
        icon: 'teleport',
        explorers: [
            {
                name: 'Teleport EVM Explorer (Blockscout)',
                url: 'https://evm-explorer.teleport.network',
                standard: 'none',
                icon: 'teleport',
            },
            {
                name: 'Teleport Cosmos Explorer (Big Dipper)',
                url: 'https://explorer.teleport.network',
                standard: 'none',
                icon: 'teleport',
            },
        ],
    },
    {
        name: 'Teleport Testnet',
        chain: 'Teleport',
        rpc: ['https://evm-rpc.testnet.teleport.network'],
        faucets: ['https://chain-docs.teleport.network/testnet/faucet.html'],
        nativeCurrency: {
            name: 'Tele',
            symbol: 'TELE',
            decimals: 18,
        },
        infoURL: 'https://teleport.network',
        shortName: 'teleport-testnet',
        chainId: 8001,
        networkId: 8001,
        icon: 'teleport',
        explorers: [
            {
                name: 'Teleport EVM Explorer (Blockscout)',
                url: 'https://evm-explorer.testnet.teleport.network',
                standard: 'none',
                icon: 'teleport',
            },
            {
                name: 'Teleport Cosmos Explorer (Big Dipper)',
                url: 'https://explorer.testnet.teleport.network',
                standard: 'none',
                icon: 'teleport',
            },
        ],
    },
    {
        name: 'MDGL Testnet',
        chain: 'MDGL',
        rpc: ['https://testnet.mdgl.io'],
        faucets: [],
        nativeCurrency: {
            name: 'MDGL Token',
            symbol: 'MDGLT',
            decimals: 18,
        },
        infoURL: 'https://mdgl.io',
        shortName: 'mdgl',
        chainId: 8029,
        networkId: 8029,
    },
    {
        name: 'GeneChain Adenine Testnet',
        chain: 'GeneChain',
        rpc: ['https://rpc-testnet.genechain.io'],
        faucets: ['https://faucet.genechain.io'],
        nativeCurrency: {
            name: 'Testnet RNA',
            symbol: 'tRNA',
            decimals: 18,
        },
        infoURL: 'https://scan-testnet.genechain.io/',
        shortName: 'GeneChainAdn',
        chainId: 8080,
        networkId: 8080,
        explorers: [
            {
                name: 'GeneChain Adenine Testnet Scan',
                url: 'https://scan-testnet.genechain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Klaytn Mainnet Cypress',
        chain: 'KLAY',
        rpc: ['https://public-node-api.klaytnapi.com/v1/cypress'],
        faucets: [],
        nativeCurrency: {
            name: 'KLAY',
            symbol: 'KLAY',
            decimals: 18,
        },
        infoURL: 'https://www.klaytn.com/',
        shortName: 'Cypress',
        chainId: 8217,
        networkId: 8217,
        slip44: 8217,
        explorers: [
            {
                name: 'Klaytnscope',
                url: 'https://scope.klaytn.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'KorthoTest',
        chain: 'Kortho',
        rpc: ['https://www.krotho-test.net'],
        faucets: [],
        nativeCurrency: {
            name: 'Kortho Test',
            symbol: 'KTO',
            decimals: 11,
        },
        infoURL: 'https://www.kortho.io/',
        shortName: 'Kortho',
        chainId: 8285,
        networkId: 8285,
    },
    {
        name: 'TOOL Global Mainnet',
        chain: 'OLO',
        rpc: ['https://mainnet-web3.wolot.io'],
        faucets: [],
        nativeCurrency: {
            name: 'TOOL Global',
            symbol: 'OLO',
            decimals: 18,
        },
        infoURL: 'https://ibdt.io',
        shortName: 'olo',
        chainId: 8723,
        networkId: 8723,
        slip44: 479,
        explorers: [
            {
                name: 'OLO Block Explorer',
                url: 'https://www.olo.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'TOOL Global Testnet',
        chain: 'OLO',
        rpc: ['https://testnet-web3.wolot.io'],
        faucets: ['https://testnet-explorer.wolot.io'],
        nativeCurrency: {
            name: 'TOOL Global',
            symbol: 'OLO',
            decimals: 18,
        },
        infoURL: 'https://testnet-explorer.wolot.io',
        shortName: 'tolo',
        chainId: 8724,
        networkId: 8724,
        slip44: 479,
    },
    {
        name: 'Ambros Chain Testnet',
        chain: 'ambroschain',
        rpc: ['https://testnet.ambroschain.com'],
        faucets: [],
        nativeCurrency: {
            name: 'AMBROS',
            symbol: 'AMBR',
            decimals: 18,
        },
        infoURL: 'https://bcmhunt.com/',
        shortName: 'ambrostestnet',
        chainId: 8888,
        networkId: 8888,
        explorers: [
            {
                name: 'Ambros Chain Explorer',
                url: 'https://testexplorer.ambroschain.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'bloxberg',
        chain: 'bloxberg',
        rpc: ['https://core.bloxberg.org'],
        faucets: ['https://faucet.bloxberg.org/'],
        nativeCurrency: {
            name: 'BERG',
            symbol: 'U+25B3',
            decimals: 18,
        },
        infoURL: 'https://bloxberg.org',
        shortName: 'berg',
        chainId: 8995,
        networkId: 8995,
    },
    {
        name: 'Evmos Testnet',
        chain: 'Evmos',
        rpc: ['https://eth.bd.evmos.dev:8545'],
        faucets: ['https://faucet.evmos.dev'],
        nativeCurrency: {
            name: 'test-Evmos',
            symbol: 'tEVMOS',
            decimals: 18,
        },
        infoURL: 'https://evmos.org',
        shortName: 'evmos-testnet',
        chainId: 9000,
        networkId: 9000,
        icon: 'evmos',
        explorers: [
            {
                name: 'Evmos EVM Explorer',
                url: 'https://evm.evmos.dev',
                standard: 'EIP3091',
                icon: 'evmos',
            },
            {
                name: 'Evmos Cosmos Explorer',
                url: 'https://explorer.evmos.dev',
                standard: 'none',
                icon: 'evmos',
            },
        ],
    },
    {
        name: 'Evmos',
        chain: 'Evmos',
        rpc: ['https://eth.bd.evmos.org:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'Evmos',
            symbol: 'EVMOS',
            decimals: 18,
        },
        infoURL: 'https://evmos.org',
        shortName: 'evmos',
        chainId: 9001,
        networkId: 9001,
        icon: 'evmos',
        explorers: [
            {
                name: 'Evmos EVM Explorer (Blockscout)',
                url: 'https://evm.evmos.org',
                standard: 'none',
                icon: 'evmos',
            },
            {
                name: 'Evmos Cosmos Explorer (Mintscan)',
                url: 'https://www.mintscan.io/evmos',
                standard: 'none',
                icon: 'evmos',
            },
        ],
    },
    {
        name: 'Genesis Coin',
        chain: 'Genesis',
        rpc: ['https://genesis-gn.com', 'wss://genesis-gn.com'],
        faucets: [],
        nativeCurrency: {
            name: 'GN Coin',
            symbol: 'GNC',
            decimals: 18,
        },
        infoURL: 'https://genesis-gn.com',
        shortName: 'GENEC',
        chainId: 9100,
        networkId: 9100,
    },
    {
        name: 'Rangers Protocol Testnet Robin',
        chain: 'Rangers',
        icon: 'rangers',
        rpc: ['https://robin.rangersprotocol.com/api/jsonrpc'],
        faucets: ['https://robin-faucet.rangersprotocol.com'],
        nativeCurrency: {
            name: 'Rangers Protocol Gas',
            symbol: 'tRPG',
            decimals: 18,
        },
        infoURL: 'https://rangersprotocol.com',
        shortName: 'trpg',
        chainId: 9527,
        networkId: 9527,
        explorers: [
            {
                name: 'rangersscan-robin',
                url: 'https://robin-rangersscan.rangersprotocol.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'myOwn Testnet',
        chain: 'myOwn',
        rpc: ['https://geth.dev.bccloud.net'],
        faucets: [],
        nativeCurrency: {
            name: 'MYN',
            symbol: 'MYN',
            decimals: 18,
        },
        infoURL: 'https://docs.bccloud.net/',
        shortName: 'myn',
        chainId: 9999,
        networkId: 9999,
    },
    {
        name: 'Smart Bitcoin Cash',
        chain: 'smartBCH',
        rpc: [
            'https://smartbch.greyh.at',
            'https://rpc-mainnet.smartbch.org',
            'https://smartbch.fountainhead.cash/mainnet',
            'https://smartbch.devops.cash/mainnet',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Bitcoin Cash',
            symbol: 'BCH',
            decimals: 18,
        },
        infoURL: 'https://smartbch.org/',
        shortName: 'smartbch',
        chainId: 10000,
        networkId: 10000,
    },
    {
        name: 'Smart Bitcoin Cash Testnet',
        chain: 'smartBCHTest',
        rpc: ['https://rpc-testnet.smartbch.org', 'https://smartbch.devops.cash/testnet'],
        faucets: [],
        nativeCurrency: {
            name: 'Bitcoin Cash Test Token',
            symbol: 'BCHT',
            decimals: 18,
        },
        infoURL: 'http://smartbch.org/',
        shortName: 'smartbchtest',
        chainId: 10001,
        networkId: 10001,
    },
    {
        name: 'Blockchain Genesis Mainnet',
        chain: 'GEN',
        rpc: ['https://eu.mainnet.xixoio.com', 'https://us.mainnet.xixoio.com', 'https://asia.mainnet.xixoio.com'],
        faucets: [],
        nativeCurrency: {
            name: 'GEN',
            symbol: 'GEN',
            decimals: 18,
        },
        infoURL: 'https://www.xixoio.com/',
        shortName: 'GEN',
        chainId: 10101,
        networkId: 10101,
    },
    {
        name: 'CryptoCoinPay',
        chain: 'CCP',
        rpc: ['http://node106.cryptocoinpay.info:8545', 'ws://node106.cryptocoinpay.info:8546'],
        faucets: [],
        icon: 'ccp',
        nativeCurrency: {
            name: 'CryptoCoinPay',
            symbol: 'CCP',
            decimals: 18,
        },
        infoURL: 'https://www.cryptocoinpay.co',
        shortName: 'CCP',
        chainId: 10823,
        networkId: 10823,
        explorers: [
            {
                name: 'CCP Explorer',
                url: 'https://cryptocoinpay.info',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'WAGMI',
        chain: 'WAGMI',
        icon: 'wagmi',
        rpc: ['https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc'],
        faucets: ['https://faucet.trywagmi.xyz'],
        nativeCurrency: {
            name: 'WAGMI',
            symbol: 'WGM',
            decimals: 18,
        },
        infoURL: 'https://trywagmi.xyz',
        shortName: 'WAGMI',
        chainId: 11111,
        networkId: 11111,
        explorers: [
            {
                name: 'WAGMI Explorer',
                url: 'https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Shyft Testnet',
        chain: 'SHYFTT',
        icon: 'shyft',
        rpc: ['https://rpc.testnet.shyft.network/'],
        faucets: [],
        nativeCurrency: {
            name: 'Shyft Test Token',
            symbol: 'SHYFTT',
            decimals: 18,
        },
        infoURL: 'https://shyft.network',
        shortName: 'shyftt',
        chainId: 11437,
        networkId: 11437,
        explorers: [
            {
                name: 'Shyft Testnet BX',
                url: 'https://bx.testnet.shyft.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Singularity ZERO Testnet',
        chain: 'ZERO',
        rpc: ['https://betaenv.singularity.gold:18545'],
        faucets: ['https://nft.singularity.gold'],
        nativeCurrency: {
            name: 'ZERO',
            symbol: 'tZERO',
            decimals: 18,
        },
        infoURL: 'https://www.singularity.gold',
        shortName: 'tZERO',
        chainId: 12051,
        networkId: 12051,
        explorers: [
            {
                name: 'zeroscan',
                url: 'https://betaenv.singularity.gold:18002',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Singularity ZERO Mainnet',
        chain: 'ZERO',
        rpc: ['https://zerorpc.singularity.gold'],
        faucets: ['https://zeroscan.singularity.gold'],
        nativeCurrency: {
            name: 'ZERO',
            symbol: 'ZERO',
            decimals: 18,
        },
        infoURL: 'https://www.singularity.gold',
        shortName: 'ZERO',
        chainId: 12052,
        networkId: 12052,
        slip44: 621,
        explorers: [
            {
                name: 'zeroscan',
                url: 'https://zeroscan.singularity.gold',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Phoenix Mainnet',
        chain: 'Phoenix',
        network: 'mainnet',
        rpc: ['https://rpc.phoenixplorer.com/'],
        faucets: [],
        nativeCurrency: {
            name: 'Phoenix',
            symbol: 'PHX',
            decimals: 18,
        },
        infoURL: 'https://cryptophoenix.org/phoenix',
        shortName: 'Phoenix',
        chainId: 13381,
        networkId: 13381,
        icon: 'phoenix',
        explorers: [
            {
                name: 'phoenixplorer',
                url: 'https://phoenixplorer.com',
                icon: 'phoenixplorer',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'MetaDot Mainnet',
        chain: 'MTT',
        rpc: ['https://mainnet.metadot.network'],
        faucets: [],
        nativeCurrency: {
            name: 'MetaDot Token',
            symbol: 'MTT',
            decimals: 18,
        },
        infoURL: 'https://metadot.network',
        shortName: 'mtt',
        chainId: 16000,
        networkId: 16000,
    },
    {
        name: 'MetaDot Testnet',
        chain: 'MTTTest',
        rpc: ['https://testnet.metadot.network'],
        faucets: ['https://faucet.metadot.network/'],
        nativeCurrency: {
            name: 'MetaDot Token TestNet',
            symbol: 'MTTest',
            decimals: 18,
        },
        infoURL: 'https://metadot.network',
        shortName: 'mtttest',
        chainId: 16001,
        networkId: 16001,
    },
    {
        name: 'BTCIX Network',
        chain: 'BTCIX',
        rpc: ['https://seed.btcix.org/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'BTCIX Network',
            symbol: 'BTCIX',
            decimals: 18,
        },
        infoURL: 'https://bitcolojix.org',
        shortName: 'btcix',
        chainId: 19845,
        networkId: 19845,
        explorers: [
            {
                name: 'BTCIXScan',
                url: 'https://btcixscan.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'CENNZnet Azalea',
        chain: 'CENNZnet',
        network: 'azalea',
        rpc: ['https://cennznet.unfrastructure.io/public'],
        faucets: [],
        nativeCurrency: {
            name: 'CPAY',
            symbol: 'CPAY',
            decimals: 18,
        },
        infoURL: 'https://cennz.net',
        shortName: 'cennz-a',
        chainId: 21337,
        networkId: 21337,
        icon: 'cennz',
        explorers: [
            {
                name: 'UNcover',
                url: 'https://uncoverexplorer.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'omChain Mainnet',
        chain: 'OML',
        icon: 'omlira',
        rpc: ['https://seed.omlira.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Omlira',
            symbol: 'OML',
            decimals: 18,
        },
        infoURL: 'https://omlira.com',
        shortName: 'oml',
        chainId: 21816,
        networkId: 21816,
        explorers: [
            {
                name: 'omChain Explorer',
                url: 'https://explorer.omlira.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Webchain',
        chain: 'WEB',
        rpc: ['https://node1.webchain.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Webchain Ether',
            symbol: 'WEB',
            decimals: 18,
        },
        infoURL: 'https://webchain.network',
        shortName: 'web',
        chainId: 24484,
        networkId: 37129,
        slip44: 227,
    },
    {
        name: 'MintMe.com Coin',
        chain: 'MINTME',
        rpc: ['https://node1.mintme.com'],
        faucets: [],
        nativeCurrency: {
            name: 'MintMe.com Coin',
            symbol: 'MINTME',
            decimals: 18,
        },
        infoURL: 'https://www.mintme.com',
        shortName: 'mintme',
        chainId: 24734,
        networkId: 37480,
    },
    {
        name: 'Ethersocial Network',
        chain: 'ESN',
        rpc: ['https://api.esn.gonspool.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Ethersocial Network Ether',
            symbol: 'ESN',
            decimals: 18,
        },
        infoURL: 'https://ethersocial.org',
        shortName: 'esn',
        chainId: 31102,
        networkId: 1,
        slip44: 31102,
    },
    {
        name: 'GoChain Testnet',
        chain: 'GO',
        rpc: ['https://testnet-rpc.gochain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'GoChain Coin',
            symbol: 'GO',
            decimals: 18,
        },
        infoURL: 'https://gochain.io',
        shortName: 'got',
        chainId: 31337,
        networkId: 31337,
        slip44: 6060,
        explorers: [
            {
                name: 'GoChain Testnet Explorer',
                url: 'https://testnet-explorer.gochain.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Fusion Mainnet',
        chain: 'FSN',
        rpc: ['https://mainnet.anyswap.exchange', 'https://fsn.dev/api'],
        faucets: [],
        nativeCurrency: {
            name: 'Fusion',
            symbol: 'FSN',
            decimals: 18,
        },
        infoURL: 'https://www.fusion.org/',
        shortName: 'fsn',
        chainId: 32659,
        networkId: 32659,
    },
    {
        name: 'Energi Mainnet',
        chain: 'NRG',
        rpc: ['https://nodeapi.energi.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Energi',
            symbol: 'NRG',
            decimals: 18,
        },
        infoURL: 'https://www.energi.world/',
        shortName: 'nrg',
        chainId: 39797,
        networkId: 39797,
        slip44: 39797,
    },
    {
        name: 'pegglecoin',
        chain: '42069',
        rpc: [],
        faucets: [],
        nativeCurrency: {
            name: 'pegglecoin',
            symbol: 'peggle',
            decimals: 18,
        },
        infoURL: 'https://teampeggle.com',
        shortName: 'PC',
        chainId: 42069,
        networkId: 42069,
    },
    {
        name: 'Arbitrum One',
        chainId: 42161,
        shortName: 'arb1',
        chain: 'ETH',
        networkId: 42161,
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpc: [
            'https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}',
            'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
            'https://arb1.arbitrum.io/rpc',
            'wss://arb1.arbitrum.io/ws',
        ],
        faucets: [],
        explorers: [
            {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
                standard: 'EIP3091',
            },
            {
                name: 'Arbitrum Explorer',
                url: 'https://explorer.arbitrum.io',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://arbitrum.io',
        parent: {
            type: 'L2',
            chain: 'eip155-1',
            bridges: [
                {
                    url: 'https://bridge.arbitrum.io',
                },
            ],
        },
    },
    {
        name: 'Celo Mainnet',
        chainId: 42220,
        shortName: 'CELO',
        chain: 'CELO',
        networkId: 42220,
        nativeCurrency: {
            name: 'CELO',
            symbol: 'CELO',
            decimals: 18,
        },
        rpc: ['https://forno.celo.org', 'wss://forno.celo.org/ws'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        infoURL: 'https://docs.celo.org/',
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.celo.org',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Emerald Paratime Testnet',
        chain: 'Emerald',
        icon: 'oasis',
        rpc: ['https://testnet.emerald.oasis.dev/', 'wss://testnet.emerald.oasis.dev/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'Emerald Rose',
            symbol: 'ROSE',
            decimals: 18,
        },
        infoURL: 'https://docs.oasis.dev/general/developer-resources/overview',
        shortName: 'emerald',
        chainId: 42261,
        networkId: 42261,
        explorers: [
            {
                name: 'Emerald Paratime Testnet Explorer',
                url: 'https://testnet.explorer.emerald.oasis.dev',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Emerald Paratime Mainnet',
        chain: 'Emerald',
        icon: 'oasis',
        rpc: ['https://emerald.oasis.dev', 'wss://emerald.oasis.dev/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'Emerald Rose',
            symbol: 'ROSE',
            decimals: 18,
        },
        infoURL: 'https://docs.oasis.dev/general/developer-resources/overview',
        shortName: 'oasis',
        chainId: 42262,
        networkId: 42262,
        explorers: [
            {
                name: 'Emerald Paratime Mainnet Explorer',
                url: 'https://explorer.emerald.oasis.dev',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Athereum',
        chain: 'ATH',
        rpc: ['https://ava.network:21015/ext/evm/rpc'],
        faucets: ['http://athfaucet.ava.network//?address=${ADDRESS}'],
        nativeCurrency: {
            name: 'Athereum Ether',
            symbol: 'ATH',
            decimals: 18,
        },
        infoURL: 'https://athereum.ava.network',
        shortName: 'avaeth',
        chainId: 43110,
        networkId: 43110,
    },
    {
        name: 'Avalanche Fuji Testnet',
        chain: 'AVAX',
        rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
        faucets: ['https://faucet.avax-test.network/'],
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
        },
        infoURL: 'https://cchain.explorer.avax-test.network',
        shortName: 'Fuji',
        chainId: 43113,
        networkId: 1,
        explorers: [
            {
                name: 'snowtrace',
                url: 'https://testnet.snowtrace.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Avalanche C-Chain',
        chain: 'AVAX',
        rpc: ['https://api.avax.network/ext/bc/C/rpc'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
        },
        infoURL: 'https://www.avax.network/',
        shortName: 'Avalanche',
        chainId: 43114,
        networkId: 43114,
        slip44: 9005,
        explorers: [
            {
                name: 'snowtrace',
                url: 'https://snowtrace.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Celo Alfajores Testnet',
        chainId: 44787,
        shortName: 'ALFA',
        chain: 'CELO',
        networkId: 44787,
        nativeCurrency: {
            name: 'CELO',
            symbol: 'CELO',
            decimals: 18,
        },
        rpc: ['https://alfajores-forno.celo-testnet.org', 'wss://alfajores-forno.celo-testnet.org/ws'],
        faucets: ['https://celo.org/developers/faucet', 'https://cauldron.pretoriaresearchlab.io/alfajores-faucet'],
        infoURL: 'https://docs.celo.org/',
    },
    {
        name: 'Autobahn Network',
        chain: 'BNB',
        network: 'mainnet',
        rpc: ['https://rpc.autobahn.network'],
        faucets: [],
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        infoURL: 'https://autobahn.network',
        shortName: 'autobahn',
        chainId: 45000,
        networkId: 45000,
        icon: 'autobahn',
        explorers: [
            {
                name: 'autobahn explorer',
                url: 'https://explorer.autobahn.network',
                icon: 'autobahn',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'REI Network',
        chain: 'REI',
        rpc: ['https://rpc.rei.network', 'wss://rpc.rei.network'],
        faucets: [],
        nativeCurrency: {
            name: 'REI',
            symbol: 'REI',
            decimals: 18,
        },
        infoURL: 'https://rei.network/',
        shortName: 'REI',
        chainId: 47805,
        networkId: 47805,
        explorers: [
            {
                name: 'rei-scan',
                url: 'https://scan.rei.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Energi Testnet',
        chain: 'NRG',
        rpc: ['https://nodeapi.test.energi.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Energi',
            symbol: 'NRG',
            decimals: 18,
        },
        infoURL: 'https://www.energi.world/',
        shortName: 'tnrg',
        chainId: 49797,
        networkId: 49797,
        slip44: 49797,
    },
    {
        name: 'DFK Chain',
        chain: 'DFK',
        icon: 'dfk',
        network: 'mainnet',
        rpc: ['https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc'],
        faucets: [],
        nativeCurrency: {
            name: 'Jewel',
            symbol: 'JEWEL',
            decimals: 18,
        },
        infoURL: 'https://defikingdoms.com',
        shortName: 'DFK',
        chainId: 53935,
        networkId: 53935,
        explorers: [
            {
                name: 'ethernal',
                url: 'https://explorer.dfkchain.com',
                icon: 'ethereum',
                standard: 'none',
            },
        ],
    },
    {
        name: 'REI Chain Mainnet',
        chain: 'REI',
        icon: 'reichain',
        rpc: ['https://rei-rpc.moonrhythm.io'],
        faucets: ['http://kururu.finance/faucet?chainId=55555'],
        nativeCurrency: {
            name: 'Rei',
            symbol: 'REI',
            decimals: 18,
        },
        infoURL: 'https://reichain.io',
        shortName: 'rei',
        chainId: 55555,
        networkId: 55555,
        explorers: [
            {
                name: 'reiscan',
                url: 'https://reiscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'REI Chain Testnet',
        chain: 'REI',
        icon: 'reichain',
        rpc: ['https://rei-testnet-rpc.moonrhythm.io'],
        faucets: ['http://kururu.finance/faucet?chainId=55556'],
        nativeCurrency: {
            name: 'tRei',
            symbol: 'tREI',
            decimals: 18,
        },
        infoURL: 'https://reichain.io',
        shortName: 'trei',
        chainId: 55556,
        networkId: 55556,
        explorers: [
            {
                name: 'reiscan',
                url: 'https://testnet.reiscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Testnet Chain 0',
        chain: 'Thinkium',
        rpc: ['https://test.thinkiumrpc.net/'],
        faucets: ['https://www.thinkiumdev.net/faucet'],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM-test0',
        chainId: 60000,
        networkId: 60000,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://test0.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Testnet Chain 1',
        chain: 'Thinkium',
        rpc: ['https://test1.thinkiumrpc.net/'],
        faucets: ['https://www.thinkiumdev.net/faucet'],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM-test1',
        chainId: 60001,
        networkId: 60001,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://test1.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Testnet Chain 2',
        chain: 'Thinkium',
        rpc: ['https://test2.thinkiumrpc.net/'],
        faucets: ['https://www.thinkiumdev.net/faucet'],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM-test2',
        chainId: 60002,
        networkId: 60002,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://test2.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Testnet Chain 103',
        chain: 'Thinkium',
        rpc: ['https://test103.thinkiumrpc.net/'],
        faucets: ['https://www.thinkiumdev.net/faucet'],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM-test103',
        chainId: 60103,
        networkId: 60103,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://test103.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Celo Baklava Testnet',
        chainId: 62320,
        shortName: 'BKLV',
        chain: 'CELO',
        networkId: 62320,
        nativeCurrency: {
            name: 'CELO',
            symbol: 'CELO',
            decimals: 18,
        },
        rpc: ['https://baklava-forno.celo-testnet.org'],
        faucets: [
            'https://docs.google.com/forms/d/e/1FAIpQLSdfr1BwUTYepVmmvfVUDRCwALejZ-TUva2YujNpvrEmPAX2pg/viewform',
            'https://cauldron.pretoriaresearchlab.io/baklava-faucet',
        ],
        infoURL: 'https://docs.celo.org/',
    },
    {
        name: 'eCredits Mainnet',
        chain: 'ECS',
        network: 'mainnet',
        rpc: ['https://rpc.ecredits.com'],
        faucets: [],
        nativeCurrency: {
            name: 'eCredits',
            symbol: 'ECS',
            decimals: 18,
        },
        infoURL: 'https://ecredits.com',
        shortName: 'ecs',
        chainId: 63000,
        networkId: 63000,
        explorers: [
            {
                name: 'eCredits MainNet Explorer',
                url: 'https://explorer.ecredits.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'eCredits Testnet',
        chain: 'ECS',
        network: 'testnet',
        rpc: ['https://rpc.tst.ecredits.com'],
        faucets: ['https://faucet.tst.ecredits.com'],
        nativeCurrency: {
            name: 'eCredits',
            symbol: 'ECS',
            decimals: 18,
        },
        infoURL: 'https://ecredits.com',
        shortName: 'ecs-testnet',
        chainId: 63001,
        networkId: 63001,
        explorers: [
            {
                name: 'eCredits TestNet Explorer',
                url: 'https://explorer.tst.ecredits.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Condrieu',
        title: 'Ethereum Verkle Testnet Condrieu',
        chain: 'ETH',
        rpc: ['https://rpc.condrieu.ethdevops.io:8545'],
        faucets: ['https://faucet.condrieu.ethdevops.io'],
        nativeCurrency: {
            name: 'Condrieu Testnet Ether',
            symbol: 'CTE',
            decimals: 18,
        },
        infoURL: 'https://condrieu.ethdevops.io',
        shortName: 'cndr',
        chainId: 69420,
        networkId: 69420,
        explorers: [
            {
                name: 'Condrieu explorer',
                url: 'https://explorer.condrieu.ethdevops.io',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Thinkium Mainnet Chain 0',
        chain: 'Thinkium',
        rpc: ['https://proxy.thinkiumrpc.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM0',
        chainId: 70000,
        networkId: 70000,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://chain0.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Mainnet Chain 1',
        chain: 'Thinkium',
        rpc: ['https://proxy1.thinkiumrpc.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM1',
        chainId: 70001,
        networkId: 70001,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://chain1.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Mainnet Chain 2',
        chain: 'Thinkium',
        rpc: ['https://proxy2.thinkiumrpc.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM2',
        chainId: 70002,
        networkId: 70002,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://chain2.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Thinkium Mainnet Chain 103',
        chain: 'Thinkium',
        rpc: ['https://proxy103.thinkiumrpc.net/'],
        faucets: [],
        nativeCurrency: {
            name: 'TKM',
            symbol: 'TKM',
            decimals: 18,
        },
        infoURL: 'https://thinkium.net/',
        shortName: 'TKM103',
        chainId: 70103,
        networkId: 70103,
        explorers: [
            {
                name: 'thinkiumscan',
                url: 'https://chain103.thinkiumscan.net',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Polyjuice Testnet',
        chain: 'CKB',
        icon: 'polyjuice',
        rpc: ['https://godwoken-testnet-web3-rpc.ckbapp.dev', 'ws://godwoken-testnet-web3-rpc.ckbapp.dev/ws'],
        faucets: ['https://faucet.nervos.org/'],
        nativeCurrency: {
            name: 'CKB',
            symbol: 'CKB',
            decimals: 8,
        },
        infoURL: 'https://github.com/nervosnetwork/godwoken',
        shortName: 'ckb',
        chainId: 71393,
        networkId: 1,
    },
    {
        name: 'Energy Web Volta Testnet',
        chain: 'Volta',
        rpc: ['https://volta-rpc.energyweb.org', 'wss://volta-rpc.energyweb.org/ws'],
        faucets: ['https://voltafaucet.energyweb.org'],
        nativeCurrency: {
            name: 'Volta Token',
            symbol: 'VT',
            decimals: 18,
        },
        infoURL: 'https://energyweb.org',
        shortName: 'vt',
        chainId: 73799,
        networkId: 73799,
    },
    {
        name: 'Firenze test network',
        chain: 'ETH',
        rpc: ['https://ethnode.primusmoney.com/firenze'],
        faucets: [],
        nativeCurrency: {
            name: 'Firenze Ether',
            symbol: 'FIN',
            decimals: 18,
        },
        infoURL: 'https://primusmoney.com',
        shortName: 'firenze',
        chainId: 78110,
        networkId: 78110,
    },
    {
        name: 'Mumbai',
        title: 'Polygon Testnet Mumbai',
        chain: 'Polygon',
        rpc: [
            'https://matic-mumbai.chainstacklabs.com',
            'https://rpc-mumbai.maticvigil.com',
            'https://matic-testnet-archive-rpc.bwarelabs.com',
        ],
        faucets: ['https://faucet.polygon.technology/'],
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        infoURL: 'https://polygon.technology/',
        shortName: 'maticmum',
        chainId: 80001,
        networkId: 80001,
        explorers: [
            {
                name: 'polygonscan',
                url: 'https://mumbai.polygonscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'UB Smart Chain(testnet)',
        chain: 'USC',
        network: 'testnet',
        rpc: ['https://testnet.rpc.uschain.network'],
        faucets: [],
        nativeCurrency: {
            name: 'UBC',
            symbol: 'UBC',
            decimals: 18,
        },
        infoURL: 'https://www.ubchain.site',
        shortName: 'usctest',
        chainId: 99998,
        networkId: 99998,
    },
    {
        name: 'UB Smart Chain',
        chain: 'USC',
        network: 'mainnet',
        rpc: ['https://rpc.uschain.network'],
        faucets: [],
        nativeCurrency: {
            name: 'UBC',
            symbol: 'UBC',
            decimals: 18,
        },
        infoURL: 'https://www.ubchain.site/',
        shortName: 'usc',
        chainId: 99999,
        networkId: 99999,
    },
    {
        name: 'QuarkChain Mainnet Root',
        chain: 'QuarkChain',
        rpc: ['http://jrpc.mainnet.quarkchain.io:38391/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-r',
        chainId: 100000,
        networkId: 100000,
    },
    {
        name: 'QuarkChain Mainnet Shard 0',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s0-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39000/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s0',
        chainId: 100001,
        networkId: 100001,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/0',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 1',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s1-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39001/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s1',
        chainId: 100002,
        networkId: 100002,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/1',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 2',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s2-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39002/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s2',
        chainId: 100003,
        networkId: 100003,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/2',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 3',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s3-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39003/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s3',
        chainId: 100004,
        networkId: 100004,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/3',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 4',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s4-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39004/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s4',
        chainId: 100005,
        networkId: 100005,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/4',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 5',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s5-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39005/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s5',
        chainId: 100006,
        networkId: 100006,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/5',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 6',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s6-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39006/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s6',
        chainId: 100007,
        networkId: 100007,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/6',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Mainnet Shard 7',
        chain: 'QuarkChain',
        rpc: ['https://mainnet-s7-ethapi.quarkchain.io', 'http://eth-jrpc.mainnet.quarkchain.io:39007/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-s7',
        chainId: 100008,
        networkId: 100008,
        parent: {
            chain: 'eip155-100000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-mainnet',
                url: 'https://mainnet.quarkchain.io/7',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'BROChain Mainnet',
        chain: 'BRO',
        network: 'mainnet',
        rpc: [
            'https://rpc.brochain.org',
            'http://rpc.brochain.org',
            'https://rpc.brochain.org/mainnet',
            'http://rpc.brochain.org/mainnet',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Brother',
            symbol: 'BRO',
            decimals: 18,
        },
        infoURL: 'https://brochain.org',
        shortName: 'bro',
        chainId: 108801,
        networkId: 108801,
        explorers: [
            {
                name: 'BROChain Explorer',
                url: 'https://explorer.brochain.org',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Root',
        chain: 'QuarkChain',
        rpc: ['http://jrpc.devnet.quarkchain.io:38391/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-r',
        chainId: 110000,
        networkId: 110000,
    },
    {
        name: 'QuarkChain Devnet Shard 0',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s0-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39900/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s0',
        chainId: 110001,
        networkId: 110001,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/0',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 1',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s1-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39901/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s1',
        chainId: 110002,
        networkId: 110002,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/1',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 2',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s2-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39902/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s2',
        chainId: 110003,
        networkId: 110003,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/2',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 3',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s3-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39903/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s3',
        chainId: 110004,
        networkId: 110004,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/3',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 4',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s4-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39904/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s4',
        chainId: 110005,
        networkId: 110005,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/4',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 5',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s5-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39905/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s5',
        chainId: 110006,
        networkId: 110006,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/5',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 6',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s6-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39906/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s6',
        chainId: 110007,
        networkId: 110007,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/6',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'QuarkChain Devnet Shard 7',
        chain: 'QuarkChain',
        rpc: ['https://devnet-s7-ethapi.quarkchain.io', 'http://eth-jrpc.devnet.quarkchain.io:39907/'],
        faucets: [],
        nativeCurrency: {
            name: 'QKC',
            symbol: 'QKC',
            decimals: 18,
        },
        infoURL: 'https://www.quarkchain.io/',
        shortName: 'qkc-d-s7',
        chainId: 110008,
        networkId: 110008,
        parent: {
            chain: 'eip155-110000',
            type: 'shard',
        },
        explorers: [
            {
                name: 'quarkchain-devnet',
                url: 'https://devnet.quarkchain.io/7',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Milkomeda C1 Testnet',
        chain: 'milkTAda',
        icon: 'milkomeda',
        network: 'testnet',
        rpc: ['https://rpc-devnet-cardano-evm.c1.milkomeda.com', 'wss://rpc-devnet-cardano-evm.c1.milkomeda.com'],
        faucets: [],
        nativeCurrency: {
            name: 'milkTAda',
            symbol: 'mTAda',
            decimals: 18,
        },
        infoURL: 'https://milkomeda.com',
        shortName: 'milkTAda',
        chainId: 200101,
        networkId: 200101,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Akroma',
        chain: 'AKA',
        rpc: ['https://remote.akroma.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Akroma Ether',
            symbol: 'AKA',
            decimals: 18,
        },
        infoURL: 'https://akroma.io',
        shortName: 'aka',
        chainId: 200625,
        networkId: 200625,
        slip44: 200625,
    },
    {
        name: 'Alaya Mainnet',
        chain: 'Alaya',
        rpc: ['https://openapi.alaya.network/rpc', 'wss://openapi.alaya.network/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'ATP',
            symbol: 'atp',
            decimals: 18,
        },
        infoURL: 'https://www.alaya.network/',
        shortName: 'alaya',
        chainId: 201018,
        networkId: 1,
        icon: 'alaya',
        explorers: [
            {
                name: 'alaya explorer',
                url: 'https://scan.alaya.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Alaya Dev Testnet',
        chain: 'Alaya',
        rpc: ['https://devnetopenapi.alaya.network/rpc', 'wss://devnetopenapi.alaya.network/ws'],
        faucets: ['https://faucet.alaya.network/faucet/?id=f93426c0887f11eb83b900163e06151c'],
        nativeCurrency: {
            name: 'ATP',
            symbol: 'atp',
            decimals: 18,
        },
        infoURL: 'https://www.alaya.network/',
        shortName: 'alayadev',
        chainId: 201030,
        networkId: 1,
        icon: 'alaya',
        explorers: [
            {
                name: 'alaya explorer',
                url: 'https://devnetscan.alaya.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'PlatON Mainnet',
        chain: 'PlatON',
        network: 'mainnet',
        rpc: ['https://openapi.platon.network/rpc', 'wss://openapi.platon.network/ws'],
        faucets: [],
        nativeCurrency: {
            name: 'LAT',
            symbol: 'lat',
            decimals: 18,
        },
        infoURL: 'https://www.platon.network',
        shortName: 'platon',
        chainId: 210425,
        networkId: 1,
        icon: 'platon',
        explorers: [
            {
                name: 'PlatON explorer',
                url: 'https://scan.platon.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Haymo Testnet',
        chain: 'tHYM',
        network: 'testnet',
        rpc: ['https://testnet1.haymo.network'],
        faucets: [],
        nativeCurrency: {
            name: 'HAYMO',
            symbol: 'HYM',
            decimals: 18,
        },
        infoURL: 'https://haymoswap.web.app/',
        shortName: 'hym',
        chainId: 234666,
        networkId: 234666,
    },
    {
        name: 'ARTIS sigma1',
        chain: 'ARTIS',
        rpc: ['https://rpc.sigma1.artis.network'],
        faucets: [],
        nativeCurrency: {
            name: 'ARTIS sigma1 Ether',
            symbol: 'ATS',
            decimals: 18,
        },
        infoURL: 'https://artis.eco',
        shortName: 'ats',
        chainId: 246529,
        networkId: 246529,
        slip44: 246529,
    },
    {
        name: 'ARTIS Testnet tau1',
        chain: 'ARTIS',
        rpc: ['https://rpc.tau1.artis.network'],
        faucets: [],
        nativeCurrency: {
            name: 'ARTIS tau1 Ether',
            symbol: 'tATS',
            decimals: 18,
        },
        infoURL: 'https://artis.network',
        shortName: 'atstau',
        chainId: 246785,
        networkId: 246785,
    },
    {
        name: 'Social Smart Chain Mainnet',
        chain: 'SoChain',
        rpc: ['https://socialsmartchain.digitalnext.business'],
        faucets: [],
        nativeCurrency: {
            name: 'SoChain',
            symbol: '$OC',
            decimals: 18,
        },
        infoURL: 'https://digitalnext.business/SocialSmartChain',
        shortName: 'SoChain',
        chainId: 281121,
        networkId: 281121,
        explorers: [],
    },
    {
        name: 'Polis Testnet',
        chain: 'Sparta',
        icon: 'polis',
        rpc: ['https://sparta-rpc.polis.tech'],
        faucets: ['https://faucet.polis.tech'],
        nativeCurrency: {
            name: 'tPolis',
            symbol: 'tPOLIS',
            decimals: 18,
        },
        infoURL: 'https://polis.tech',
        shortName: 'sparta',
        chainId: 333888,
        networkId: 333888,
    },
    {
        name: 'Polis Mainnet',
        chain: 'Olympus',
        icon: 'polis',
        rpc: ['https://rpc.polis.tech'],
        faucets: ['https://faucet.polis.tech'],
        nativeCurrency: {
            name: 'Polis',
            symbol: 'POLIS',
            decimals: 18,
        },
        infoURL: 'https://polis.tech',
        shortName: 'olympus',
        chainId: 333999,
        networkId: 333999,
    },
    {
        name: 'Arbitrum Rinkeby',
        title: 'Arbitrum Testnet Rinkeby',
        chainId: 421611,
        shortName: 'arb-rinkeby',
        chain: 'ETH',
        networkId: 421611,
        nativeCurrency: {
            name: 'Arbitrum Rinkeby Ether',
            symbol: 'ARETH',
            decimals: 18,
        },
        rpc: ['https://rinkeby.arbitrum.io/rpc', 'wss://rinkeby.arbitrum.io/ws'],
        faucets: ['http://fauceth.komputing.org?chain=421611&address=${ADDRESS}'],
        infoURL: 'https://arbitrum.io',
        explorers: [
            {
                name: 'arbitrum-rinkeby',
                url: 'https://rinkeby-explorer.arbitrum.io',
                standard: 'EIP3091',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-4',
            bridges: [
                {
                    url: 'https://bridge.arbitrum.io',
                },
            ],
        },
    },
    {
        name: 'Weelink Testnet',
        chain: 'WLK',
        rpc: ['https://weelinknode1c.gw002.oneitfarm.com'],
        faucets: ['https://faucet.weelink.gw002.oneitfarm.com'],
        nativeCurrency: {
            name: 'Weelink Chain Token',
            symbol: 'tWLK',
            decimals: 18,
        },
        infoURL: 'https://weelink.cloud',
        shortName: 'wlkt',
        chainId: 444900,
        networkId: 444900,
        explorers: [
            {
                name: 'weelink-testnet',
                url: 'https://weelink.cloud/#/blockView/overview',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Vision - Vpioneer Test Chain',
        chain: 'Vision-Vpioneer',
        rpc: ['https://vpioneer.infragrid.v.network/ethereum/compatible'],
        faucets: ['https://vpioneerfaucet.visionscan.org'],
        nativeCurrency: {
            name: 'VS',
            symbol: 'VS',
            decimals: 18,
        },
        infoURL: 'https://visionscan.org',
        shortName: 'vpioneer',
        chainId: 666666,
        networkId: 666666,
        slip44: 60,
    },
    {
        name: 'Vision - Mainnet',
        chain: 'Vision',
        rpc: ['https://infragrid.v.network/ethereum/compatible'],
        faucets: [],
        nativeCurrency: {
            name: 'VS',
            symbol: 'VS',
            decimals: 18,
        },
        infoURL: 'https://www.v.network',
        explorers: [
            {
                name: 'Visionscan',
                url: 'https://www.visionscan.org',
                standard: 'EIP3091',
            },
        ],
        shortName: 'vision',
        chainId: 888888,
        networkId: 888888,
        slip44: 60,
    },
    {
        name: 'Eluvio Content Fabric',
        chain: 'Eluvio',
        rpc: [
            'https://host-76-74-28-226.contentfabric.io/eth/',
            'https://host-76-74-28-232.contentfabric.io/eth/',
            'https://host-76-74-29-2.contentfabric.io/eth/',
            'https://host-76-74-29-8.contentfabric.io/eth/',
            'https://host-76-74-29-34.contentfabric.io/eth/',
            'https://host-76-74-29-35.contentfabric.io/eth/',
            'https://host-154-14-211-98.contentfabric.io/eth/',
            'https://host-154-14-192-66.contentfabric.io/eth/',
            'https://host-60-240-133-202.contentfabric.io/eth/',
            'https://host-64-235-250-98.contentfabric.io/eth/',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'ELV',
            symbol: 'ELV',
            decimals: 18,
        },
        infoURL: 'https://eluv.io',
        shortName: 'elv',
        chainId: 955305,
        networkId: 955305,
        slip44: 1011,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.eluv.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Etho Protocol',
        chain: 'ETHO',
        rpc: ['https://rpc.ethoprotocol.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Etho Protocol',
            symbol: 'ETHO',
            decimals: 18,
        },
        infoURL: 'https://ethoprotocol.com',
        shortName: 'etho',
        chainId: 1313114,
        networkId: 1313114,
        slip44: 1313114,
        explorers: [
            {
                name: 'blockscout',
                url: 'https://explorer.ethoprotocol.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Xerom',
        chain: 'XERO',
        rpc: ['https://rpc.xerom.org'],
        faucets: [],
        nativeCurrency: {
            name: 'Xerom Ether',
            symbol: 'XERO',
            decimals: 18,
        },
        infoURL: 'https://xerom.org',
        shortName: 'xero',
        chainId: 1313500,
        networkId: 1313500,
    },
    {
        name: 'Kintsugi',
        title: 'Kintsugi merge testnet',
        chain: 'ETH',
        rpc: ['https://rpc.kintsugi.themerge.dev'],
        faucets: ['http://fauceth.komputing.org?chain=1337702&address=${ADDRESS}', 'https://faucet.kintsugi.themerge.dev'],
        nativeCurrency: {
            name: 'kintsugi Ethere',
            symbol: 'kiETH',
            decimals: 18,
        },
        infoURL: 'https://kintsugi.themerge.dev/',
        shortName: 'kintsugi',
        chainId: 1337702,
        networkId: 1337702,
        explorers: [
            {
                name: 'kintsugi explorer',
                url: 'https://explorer.kintsugi.themerge.dev',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'PlatON Dev Testnet',
        chain: 'PlatON',
        rpc: ['https://devnetopenapi2.platon.network/rpc', 'wss://devnetopenapi2.platon.network/ws'],
        faucets: ['https://faucet.platon.network/faucet/?id=e5d32df10aee11ec911142010a667c03'],
        nativeCurrency: {
            name: 'LAT',
            symbol: 'lat',
            decimals: 18,
        },
        infoURL: 'https://www.platon.network',
        shortName: 'platondev',
        chainId: 2203181,
        networkId: 1,
        icon: 'platon',
        explorers: [
            {
                name: 'PlatON explorer',
                url: 'https://devnetscan.platon.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Musicoin',
        chain: 'MUSIC',
        rpc: ['https://mewapi.musicoin.tw'],
        faucets: [],
        nativeCurrency: {
            name: 'Musicoin',
            symbol: 'MUSIC',
            decimals: 18,
        },
        infoURL: 'https://musicoin.tw',
        shortName: 'music',
        chainId: 7762959,
        networkId: 7762959,
        slip44: 184,
    },
    {
        name: 'Sepolia',
        title: 'Ethereum Testnet Sepolia',
        chain: 'ETH',
        network: 'testnet',
        rpc: [],
        faucets: ['http://fauceth.komputing.org?chain=11155111&address=${ADDRESS}'],
        nativeCurrency: {
            name: 'Sepolia Ether',
            symbol: 'SEP',
            decimals: 18,
        },
        infoURL: 'https://sepolia.otterscan.io',
        shortName: 'sep',
        chainId: 11155111,
        networkId: 11155111,
        explorers: [
            {
                name: 'otterscan-sepolia',
                url: 'https://sepolia.otterscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'PepChain Churchill',
        chain: 'PEP',
        rpc: ['https://churchill-rpc.pepchain.io'],
        faucets: [],
        nativeCurrency: {
            name: 'PepChain Churchill Ether',
            symbol: 'TPEP',
            decimals: 18,
        },
        infoURL: 'https://pepchain.io',
        shortName: 'tpep',
        chainId: 13371337,
        networkId: 13371337,
    },
    {
        name: 'IOLite',
        chain: 'ILT',
        rpc: ['https://net.iolite.io'],
        faucets: [],
        nativeCurrency: {
            name: 'IOLite Ether',
            symbol: 'ILT',
            decimals: 18,
        },
        infoURL: 'https://iolite.io',
        shortName: 'ilt',
        chainId: 18289463,
        networkId: 18289463,
    },
    {
        name: 'quarkblockchain',
        chain: 'QKI',
        rpc: ['https://hz.rpc.qkiscan.cn', 'https://jp.rpc.qkiscan.io'],
        faucets: [],
        nativeCurrency: {
            name: 'quarkblockchain Native Token',
            symbol: 'QKI',
            decimals: 18,
        },
        infoURL: 'https://quarkblockchain.org/',
        shortName: 'qki',
        chainId: 20181205,
        networkId: 20181205,
    },
    {
        name: 'Auxilium Network Mainnet',
        chain: 'AUX',
        rpc: ['https://rpc.auxilium.global'],
        faucets: [],
        nativeCurrency: {
            name: 'Auxilium coin',
            symbol: 'AUX',
            decimals: 18,
        },
        infoURL: 'https://auxilium.global',
        shortName: 'auxi',
        chainId: 28945486,
        networkId: 28945486,
        slip44: 344,
    },
    {
        name: 'Joys Digital Mainnet',
        chain: 'JOYS',
        rpc: ['https://node.joys.digital'],
        faucets: [],
        nativeCurrency: {
            name: 'JOYS',
            symbol: 'JOYS',
            decimals: 18,
        },
        infoURL: 'https://joys.digital',
        shortName: 'JOYS',
        chainId: 35855456,
        networkId: 35855456,
    },
    {
        name: 'Aquachain',
        chain: 'AQUA',
        rpc: ['https://c.onical.org', 'https://tx.aquacha.in/api'],
        faucets: ['https://aquacha.in/faucet'],
        nativeCurrency: {
            name: 'Aquachain Ether',
            symbol: 'AQUA',
            decimals: 18,
        },
        infoURL: 'https://aquachain.github.io',
        shortName: 'aqua',
        chainId: 61717561,
        networkId: 61717561,
        slip44: 61717561,
    },
    {
        name: 'Joys Digital TestNet',
        chain: 'TOYS',
        rpc: ['https://toys.joys.cash/'],
        faucets: ['https://faucet.joys.digital/'],
        nativeCurrency: {
            name: 'TOYS',
            symbol: 'TOYS',
            decimals: 18,
        },
        infoURL: 'https://joys.digital',
        shortName: 'TOYS',
        chainId: 99415706,
        networkId: 99415706,
    },
    {
        name: 'Gather Mainnet Network',
        chain: 'GTH',
        rpc: ['https://mainnet.gather.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Gather',
            symbol: 'GTH',
            decimals: 18,
        },
        infoURL: 'https://gather.network',
        shortName: 'GTH',
        chainId: 192837465,
        networkId: 192837465,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://explorer.gather.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Neon EVM DevNet',
        chain: 'Solana',
        rpc: ['https://proxy.devnet.neonlabs.org/solana'],
        faucets: ['https://neonswap.live/#/get-tokens'],
        nativeCurrency: {
            name: 'Neon',
            symbol: 'NEON',
            decimals: 18,
        },
        infoURL: 'https://neon-labs.org/',
        shortName: 'neonevm-devnet',
        chainId: 245022926,
        networkId: 245022926,
    },
    {
        name: 'Neon EVM MainNet',
        chain: 'Solana',
        rpc: ['https://proxy.mainnet.neonlabs.org/solana'],
        faucets: [],
        nativeCurrency: {
            name: 'Neon',
            symbol: 'NEON',
            decimals: 18,
        },
        infoURL: 'https://neon-labs.org/',
        shortName: 'neonevm-mainnet',
        chainId: 245022934,
        networkId: 245022934,
    },
    {
        name: 'Neon EVM TestNet',
        chain: 'Solana',
        rpc: ['https://proxy.testnet.neonlabs.org/solana'],
        faucets: [],
        nativeCurrency: {
            name: 'Neon',
            symbol: 'NEON',
            decimals: 18,
        },
        infoURL: 'https://neon-labs.org/',
        shortName: 'neonevm-testnet',
        chainId: 245022940,
        networkId: 245022940,
    },
    {
        name: 'OneLedger Mainnet',
        chain: 'OLT',
        icon: 'oneledger',
        rpc: ['https://mainnet-rpc.oneledger.network'],
        faucets: [],
        nativeCurrency: {
            name: 'OLT',
            symbol: 'OLT',
            decimals: 18,
        },
        infoURL: 'https://oneledger.io',
        shortName: 'oneledger',
        chainId: 311752642,
        networkId: 311752642,
        explorers: [
            {
                name: 'OneLedger Block Explorer',
                url: 'https://mainnet-explorer.oneledger.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Gather Testnet Network',
        chain: 'GTH',
        rpc: ['https://testnet.gather.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Gather',
            symbol: 'GTH',
            decimals: 18,
        },
        infoURL: 'https://gather.network',
        shortName: 'tGTH',
        chainId: 356256156,
        networkId: 356256156,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://testnet-explorer.gather.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Gather Devnet Network',
        chain: 'GTH',
        rpc: ['https://devnet.gather.network'],
        faucets: [],
        nativeCurrency: {
            name: 'Gather',
            symbol: 'GTH',
            decimals: 18,
        },
        infoURL: 'https://gather.network',
        shortName: 'dGTH',
        chainId: 486217935,
        networkId: 486217935,
        explorers: [
            {
                name: 'Blockscout',
                url: 'https://devnet-explorer.gather.network',
                standard: 'none',
            },
        ],
    },
    {
        name: 'IPOS Network',
        chain: 'IPOS',
        rpc: ['https://rpc.iposlab.com', 'https://rpc2.iposlab.com'],
        faucets: [],
        nativeCurrency: {
            name: 'IPOS Network Ether',
            symbol: 'IPOS',
            decimals: 18,
        },
        infoURL: 'https://iposlab.com',
        shortName: 'ipos',
        chainId: 1122334455,
        networkId: 1122334455,
    },
    {
        name: 'Aurora Mainnet',
        chain: 'NEAR',
        rpc: ['https://mainnet.aurora.dev'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://aurora.dev',
        shortName: 'aurora',
        chainId: 1313161554,
        networkId: 1313161554,
        explorers: [
            {
                name: 'aurorascan.dev',
                url: 'https://aurorascan.dev',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Aurora Testnet',
        chain: 'NEAR',
        rpc: ['https://testnet.aurora.dev/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://aurora.dev',
        shortName: 'aurora-testnet',
        chainId: 1313161555,
        networkId: 1313161555,
        explorers: [
            {
                name: 'aurorascan.dev',
                url: 'https://testnet.aurorascan.dev',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Aurora Betanet',
        chain: 'NEAR',
        rpc: ['https://betanet.aurora.dev/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://aurora.dev',
        shortName: 'aurora-betanet',
        chainId: 1313161556,
        networkId: 1313161556,
    },
    {
        name: 'Harmony Mainnet Shard 0',
        chain: 'Harmony',
        rpc: ['https://api.harmony.one', 'https://api.s0.t.hmny.io'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-s0',
        chainId: 1666600000,
        networkId: 1666600000,
        explorers: [
            {
                name: 'Harmony Block Explorer',
                url: 'https://explorer.harmony.one',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Harmony Mainnet Shard 1',
        chain: 'Harmony',
        rpc: ['https://api.s1.t.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-s1',
        chainId: 1666600001,
        networkId: 1666600001,
    },
    {
        name: 'Harmony Mainnet Shard 2',
        chain: 'Harmony',
        rpc: ['https://api.s2.t.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-s2',
        chainId: 1666600002,
        networkId: 1666600002,
    },
    {
        name: 'Harmony Mainnet Shard 3',
        chain: 'Harmony',
        rpc: ['https://api.s3.t.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-s3',
        chainId: 1666600003,
        networkId: 1666600003,
    },
    {
        name: 'Harmony Testnet Shard 0',
        chain: 'Harmony',
        rpc: ['https://api.s0.b.hmny.io'],
        faucets: ['https://faucet.pops.one'],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-b-s0',
        chainId: 1666700000,
        networkId: 1666700000,
        explorers: [
            {
                name: 'Harmony Testnet Block Explorer',
                url: 'https://explorer.pops.one',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Harmony Testnet Shard 1',
        chain: 'Harmony',
        rpc: ['https://api.s1.b.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-b-s1',
        chainId: 1666700001,
        networkId: 1666700001,
    },
    {
        name: 'Harmony Testnet Shard 2',
        chain: 'Harmony',
        rpc: ['https://api.s2.b.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-b-s2',
        chainId: 1666700002,
        networkId: 1666700002,
    },
    {
        name: 'Harmony Testnet Shard 3',
        chain: 'Harmony',
        rpc: ['https://api.s3.b.hmny.io'],
        faucets: [],
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        infoURL: 'https://www.harmony.one/',
        shortName: 'hmy-b-s3',
        chainId: 1666700003,
        networkId: 1666700003,
    },
    {
        name: 'DataHopper',
        chain: 'HOP',
        rpc: ['https://23.92.21.121:8545'],
        faucets: [],
        nativeCurrency: {
            name: 'DataHoppers',
            symbol: 'HOP',
            decimals: 18,
        },
        infoURL: 'https://www.DataHopper.com',
        shortName: 'hop',
        chainId: 2021121117,
        networkId: 2021121117,
    },
    {
        name: 'Pirl',
        chain: 'PIRL',
        rpc: ['https://wallrpc.pirl.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Pirl Ether',
            symbol: 'PIRL',
            decimals: 18,
        },
        infoURL: 'https://pirl.io',
        shortName: 'pirl',
        chainId: 3125659152,
        networkId: 3125659152,
        slip44: 164,
    },
    {
        name: 'OneLedger Testnet Frankenstein',
        chain: 'OLT',
        icon: 'oneledger',
        rpc: ['https://frankenstein-rpc.oneledger.network'],
        faucets: ['https://frankenstein-faucet.oneledger.network'],
        nativeCurrency: {
            name: 'OLT',
            symbol: 'OLT',
            decimals: 18,
        },
        infoURL: 'https://oneledger.io',
        shortName: 'frankenstein',
        chainId: 4216137055,
        networkId: 4216137055,
        explorers: [
            {
                name: 'OneLedger Block Explorer',
                url: 'https://frankenstein-explorer.oneledger.network',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Palm Testnet',
        chain: 'Palm',
        icon: 'palm',
        rpc: ['https://palm-testnet.infura.io/v3/{INFURA_API_KEY}'],
        faucets: [],
        nativeCurrency: {
            name: 'PALM',
            symbol: 'PALM',
            decimals: 18,
        },
        infoURL: 'https://palm.io',
        shortName: 'tpalm',
        chainId: 11297108099,
        networkId: 11297108099,
        explorers: [
            {
                name: 'Palm Testnet Explorer',
                url: 'https://explorer.palm-uat.xyz',
                standard: 'EIP3091',
                icon: 'palm',
            },
        ],
    },
    {
        name: 'Palm',
        chain: 'Palm',
        icon: 'palm',
        rpc: ['https://palm-mainnet.infura.io/v3/{INFURA_API_KEY}'],
        faucets: [],
        nativeCurrency: {
            name: 'PALM',
            symbol: 'PALM',
            decimals: 18,
        },
        infoURL: 'https://palm.io',
        shortName: 'palm',
        chainId: 11297108109,
        networkId: 11297108109,
        explorers: [
            {
                name: 'Palm Explorer',
                url: 'https://explorer.palm.io',
                standard: 'EIP3091',
                icon: 'palm',
            },
        ],
    },
    {
        name: 'Ntity Mainnet',
        chain: 'Ntity',
        rpc: ['https://rpc.ntity.io'],
        faucets: [],
        nativeCurrency: {
            name: 'Ntity',
            symbol: 'NTT',
            decimals: 18,
        },
        infoURL: 'https://ntity.io',
        shortName: 'ntt',
        chainId: 197710212030,
        networkId: 197710212030,
        icon: 'ntity',
        explorers: [
            {
                name: 'Ntity Blockscout',
                url: 'https://blockscout.ntity.io',
                icon: 'ntity',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Haradev Testnet',
        chain: 'Ntity',
        rpc: ['https://blockchain.haradev.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Ntity Haradev',
            symbol: 'NTTH',
            decimals: 18,
        },
        infoURL: 'https://ntity.io',
        shortName: 'ntt-haradev',
        chainId: 197710212031,
        networkId: 197710212031,
        icon: 'ntity',
        explorers: [
            {
                name: 'Ntity Haradev Blockscout',
                url: 'https://blockscout.haradev.com',
                icon: 'ntity',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Molereum Network',
        chain: 'ETH',
        rpc: ['https://molereum.jdubedition.com'],
        faucets: [],
        nativeCurrency: {
            name: 'Molereum Ether',
            symbol: 'MOLE',
            decimals: 18,
        },
        infoURL: 'https://github.com/Jdubedition/molereum',
        shortName: 'mole',
        chainId: 6022140761023,
        networkId: 6022140761023,
    },
    {
        name: 'Godwoken Testnet (V1)',
        chain: 'GWT',
        rpc: ['https://godwoken-testnet-web3-v1-rpc.ckbapp.dev'],
        faucets: ['https://homura.github.io/light-godwoken'],
        nativeCurrency: {
            name: 'CKB',
            symbol: 'CKB',
            decimals: 8,
        },
        infoURL: 'https://www.nervos.org',
        shortName: 'gw-testnet-v1',
        chainId: 868455272153094,
        networkId: 868455272153094,
        explorers: [
            {
                name: 'GWScan Block Explorer',
                url: 'https://v1.aggron.gwscan.com',
                standard: 'none',
            },
        ],
    },
];
//# sourceMappingURL=chaindata.js.map

/***/ }),

/***/ 9977:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5779), exports);
__exportStar(__webpack_require__(5438), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var api_utils_1 = __webpack_require__(3520);
var auth_1 = __webpack_require__(3228);
var evm_utils_1 = __webpack_require__(9977);
var evm_api_1 = __webpack_require__(7268);
var sol_utils_1 = __webpack_require__(6826);
var sol_api_1 = __webpack_require__(2305);
var core_1 = __webpack_require__(4243);
// Core
var core = core_1.MoralisCoreProvider.getDefault();
// Utility modules
var evmUtils = evm_utils_1.MoralisEvmUtils.create(core);
var solUtils = sol_utils_1.MoralisSolUtils.create(core);
var apiUtils = api_utils_1.MoralisApiUtils.create(core);
// Feature modules
var auth = auth_1.MoralisAuth.create(core);
var evmApi = evm_api_1.MoralisEvmApi.create(core);
var solApi = sol_api_1.MoralisSolApi.create(core);
// Register all Moralis modules to MoralisCore
core.registerModules([evmUtils, solUtils, auth, apiUtils, evmApi, solApi]);
var Moralis = {
    Core: core,
    Auth: auth,
    EvmApi: evmApi,
    SolApi: solApi,
    start: core.start,
};
exports.Z = Moralis;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8964:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisSolApi = exports.BASE_URL = void 0;
var core_1 = __webpack_require__(4243);
var SolApiConfigSetup_1 = __webpack_require__(9656);
var getBalance_1 = __webpack_require__(8847);
var getNFTs_1 = __webpack_require__(8735);
var getPortfolio_1 = __webpack_require__(6398);
var getSPL_1 = __webpack_require__(7252);
var getNFTMetadata_1 = __webpack_require__(6762);
exports.BASE_URL = 'https://solana-gateway.moralis.io';
var MoralisSolApi = /** @class */ (function (_super) {
    __extends(MoralisSolApi, _super);
    function MoralisSolApi(core) {
        var _this = _super.call(this, MoralisSolApi.moduleName, core, exports.BASE_URL) || this;
        _this.account = {
            getBalance: getBalance_1.getBalanceResolver.fetch,
            getNFTs: getNFTs_1.getNFTsResolver.fetch,
            getPortfolio: getPortfolio_1.getPortfolioResolver.fetch,
            getSPL: getSPL_1.getSPLResolver.fetch,
        };
        _this.nft = {
            getNFTMetadata: getNFTMetadata_1.getNFTMetadataResolver.fetch,
        };
        return _this;
    }
    MoralisSolApi.create = function (core) {
        return new MoralisSolApi(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisSolApi.prototype.setup = function () {
        SolApiConfigSetup_1.SolApiConfigSetup.register(this.core.config);
    };
    MoralisSolApi.prototype.start = function () {
        // Nothing
    };
    MoralisSolApi.moduleName = 'solApi';
    return MoralisSolApi;
}(core_1.ApiModule));
exports.MoralisSolApi = MoralisSolApi;
//# sourceMappingURL=MoralisSolApi.js.map

/***/ }),

/***/ 7427:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolApiConfig = void 0;
exports.SolApiConfig = {
    defaultSolNetwork: {
        name: 'defaultSolNetwork',
        defaultValue: 'mainnet',
    },
};
//# sourceMappingURL=SolApiConfig.js.map

/***/ }),

/***/ 9656:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolApiConfigSetup = void 0;
var SolApiConfig_1 = __webpack_require__(7427);
var SolApiConfigSetup = /** @class */ (function () {
    function SolApiConfigSetup() {
    }
    SolApiConfigSetup.register = function (config) {
        config.registerKey(SolApiConfig_1.SolApiConfig.defaultSolNetwork);
    };
    return SolApiConfigSetup;
}());
exports.SolApiConfigSetup = SolApiConfigSetup;
//# sourceMappingURL=SolApiConfigSetup.js.map

/***/ }),

/***/ 2305:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MoralisSolApi_1 = __webpack_require__(8964);
__exportStar(__webpack_require__(8964), exports);
exports["default"] = { MoralisSolApi: MoralisSolApi_1.MoralisSolApi };
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7063:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolNetworkResolver = void 0;
var core_1 = __webpack_require__(4243);
var sol_utils_1 = __webpack_require__(6826);
var SolApiConfig_1 = __webpack_require__(7427);
var SolNetworkResolver = /** @class */ (function () {
    function SolNetworkResolver() {
    }
    SolNetworkResolver.resolve = function (network) {
        if (!network) {
            var core = core_1.MoralisCoreProvider.getDefault();
            network = core.config.get(SolApiConfig_1.SolApiConfig.defaultSolNetwork);
        }
        return sol_utils_1.SolNetwork.create(network).network;
    };
    return SolNetworkResolver;
}());
exports.SolNetworkResolver = SolNetworkResolver;
//# sourceMappingURL=SolNetworkResolver.js.map

/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBalanceResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var sol_utils_1 = __webpack_require__(6826);
var MoralisSolApi_1 = __webpack_require__(8964);
var SolNetworkResolver_1 = __webpack_require__(7063);
exports.getBalanceResolver = new api_utils_1.ApiResolver({
    name: 'getBalance',
    getUrl: function (params) {
        var network = SolNetworkResolver_1.SolNetworkResolver.resolve(params.network);
        return "".concat(MoralisSolApi_1.BASE_URL, "/account/").concat(network, "/").concat(params.address, "/balance");
    },
    apiToResult: function (data) {
        return sol_utils_1.SolNative.create(data.lamports, 'lamports');
    },
    resultToJson: function (data) {
        return data.toJSON();
    },
    parseParams: function (params) { return ({
        network: SolNetworkResolver_1.SolNetworkResolver.resolve(params.network),
        address: sol_utils_1.SolAddress.create(params.address).address,
    }); },
});
//# sourceMappingURL=getBalance.js.map

/***/ }),

/***/ 8735:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTsResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var sol_utils_1 = __webpack_require__(6826);
var MoralisSolApi_1 = __webpack_require__(8964);
var SolNetworkResolver_1 = __webpack_require__(7063);
exports.getNFTsResolver = new api_utils_1.ApiResolver({
    name: 'getNFTs',
    getUrl: function (params) {
        var network = SolNetworkResolver_1.SolNetworkResolver.resolve(params.network);
        return "".concat(MoralisSolApi_1.BASE_URL, "/account/").concat(network, "/").concat(params.address, "/nft");
    },
    apiToResult: function (data) {
        return data.map(function (nft) {
            return {
                associatedTokenAddress: sol_utils_1.SolAddress.create(nft.associatedTokenAddress),
                mint: sol_utils_1.SolAddress.create(nft.mint),
            };
        });
    },
    resultToJson: function (data) {
        return data.map(function (nft) {
            return {
                associatedTokenAddress: nft.associatedTokenAddress.toJSON(),
                mint: nft.mint.toJSON(),
            };
        });
    },
    parseParams: function (params) { return ({
        network: SolNetworkResolver_1.SolNetworkResolver.resolve(params.network),
        address: sol_utils_1.SolAddress.create(params.address).address,
    }); },
});
//# sourceMappingURL=getNFTs.js.map

/***/ }),

/***/ 6398:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPortfolioResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var sol_utils_1 = __webpack_require__(6826);
var MoralisSolApi_1 = __webpack_require__(8964);
var SolNetworkResolver_1 = __webpack_require__(7063);
exports.getPortfolioResolver = new api_utils_1.ApiResolver({
    name: 'getPortfolio',
    getUrl: function (params) {
        var network = SolNetworkResolver_1.SolNetworkResolver.resolve(params.network);
        return "".concat(MoralisSolApi_1.BASE_URL, "/account/").concat(network, "/").concat(params.address, "/portfolio");
    },
    apiToResult: function (data) {
        return {
            nativeBalance: sol_utils_1.SolNative.create(data.nativeBalance.lamports, 'lamports'),
            nfts: data.nfts.map(function (nft) {
                return {
                    associatedTokenAddress: sol_utils_1.SolAddress.create(nft.associatedTokenAddress),
                    mint: sol_utils_1.SolAddress.create(nft.mint),
                };
            }),
            tokens: data.tokens.map(function (token) {
                return {
                    associatedTokenAddress: sol_utils_1.SolAddress.create(token.associatedTokenAddress),
                    mint: sol_utils_1.SolAddress.create(token.mint),
                    amount: sol_utils_1.SolNative.create(token.amountRaw, 'lamports'),
                };
            }),
        };
    },
    resultToJson: function (data) {
        return {
            nativeBalance: data.nativeBalance.toJSON(),
            nfts: data.nfts.map(function (nft) {
                return {
                    associatedTokenAddress: nft.associatedTokenAddress.toJSON(),
                    mint: nft.mint.toJSON(),
                };
            }),
            tokens: data.tokens.map(function (token) {
                return {
                    associatedTokenAddress: token.associatedTokenAddress.toJSON(),
                    mint: token.mint.toJSON(),
                    amount: token.amount.toJSON(),
                };
            }),
        };
    },
    parseParams: function (params) { return ({
        network: SolNetworkResolver_1.SolNetworkResolver.resolve(params.network),
        address: sol_utils_1.SolAddress.create(params.address).address,
    }); },
});
//# sourceMappingURL=getPortfolio.js.map

/***/ }),

/***/ 7252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSPLResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var sol_utils_1 = __webpack_require__(6826);
var MoralisSolApi_1 = __webpack_require__(8964);
var SolNetworkResolver_1 = __webpack_require__(7063);
exports.getSPLResolver = new api_utils_1.ApiResolver({
    name: 'getSPL',
    getUrl: function (params) {
        var network = SolNetworkResolver_1.SolNetworkResolver.resolve(params.network);
        return "".concat(MoralisSolApi_1.BASE_URL, "/account/").concat(network, "/").concat(params.address, "/tokens");
    },
    apiToResult: function (data) {
        return data.map(function (token) {
            return {
                associatedTokenAddress: sol_utils_1.SolAddress.create(token.associatedTokenAddress),
                mint: sol_utils_1.SolAddress.create(token.mint),
                amount: sol_utils_1.SolNative.create(token.amountRaw, 'lamports'),
            };
        });
    },
    resultToJson: function (data) {
        return data.map(function (token) {
            return {
                associatedTokenAddress: token.associatedTokenAddress.toJSON(),
                mint: token.mint.toJSON(),
                amount: token.amount.toJSON(),
            };
        });
    },
    parseParams: function (params) { return ({
        network: SolNetworkResolver_1.SolNetworkResolver.resolve(params.network),
        address: sol_utils_1.SolAddress.create(params.address).address,
    }); },
});
//# sourceMappingURL=getSPL.js.map

/***/ }),

/***/ 6762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNFTMetadataResolver = void 0;
var api_utils_1 = __webpack_require__(3520);
var sol_utils_1 = __webpack_require__(6826);
var MoralisSolApi_1 = __webpack_require__(8964);
var SolNetworkResolver_1 = __webpack_require__(7063);
exports.getNFTMetadataResolver = new api_utils_1.ApiResolver({
    name: 'getNFTMetadata',
    getUrl: function (params) { return "".concat(MoralisSolApi_1.BASE_URL, "/nft/").concat(params.network, "/").concat(params.address, "/metadata"); },
    apiToResult: function (data) {
        return {
            mint: sol_utils_1.SolAddress.create(data.mint),
            standard: data.standard,
            name: data.name,
            symbol: data.symbol,
            metaplex: {
                metadataUri: data.metaplex.metadataUri,
                updateAuthority: sol_utils_1.SolAddress.create(data.metaplex.updateAuthority),
                sellerFeeBasisPoints: data.metaplex.sellerFeeBasisPoints,
                primarySaleHappened: data.metaplex.primarySaleHappened,
                isMutable: data.metaplex.isMutable,
                masterEdition: data.metaplex.masterEdition,
            },
        };
    },
    resultToJson: function (data) {
        return {
            mint: data.mint.toJSON(),
            standard: data.standard,
            name: data.name,
            symbol: data.symbol,
            metaplex: {
                metadataUri: data.metaplex.metadataUri,
                updateAuthority: data.metaplex.updateAuthority.toJSON(),
                sellerFeeBasisPoints: data.metaplex.sellerFeeBasisPoints,
                primarySaleHappened: data.metaplex.primarySaleHappened,
                isMutable: data.metaplex.isMutable,
                masterEdition: data.metaplex.masterEdition,
            },
        };
    },
    parseParams: function (params) { return ({
        network: SolNetworkResolver_1.SolNetworkResolver.resolve(params.network),
        address: sol_utils_1.SolAddress.create(params.address).address,
    }); },
});
//# sourceMappingURL=getNFTMetadata.js.map

/***/ }),

/***/ 6755:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoralisSolUtils = void 0;
var core_1 = __webpack_require__(4243);
var MoralisSolUtils = /** @class */ (function (_super) {
    __extends(MoralisSolUtils, _super);
    function MoralisSolUtils(core) {
        return _super.call(this, MoralisSolUtils.moduleName, core) || this;
    }
    MoralisSolUtils.create = function (core) {
        return new MoralisSolUtils(core !== null && core !== void 0 ? core : core_1.MoralisCoreProvider.getDefault());
    };
    MoralisSolUtils.prototype.setup = function () {
        // Nothing
    };
    MoralisSolUtils.prototype.start = function () {
        // Nothing
    };
    MoralisSolUtils.moduleName = 'solUtils';
    return MoralisSolUtils;
}(core_1.Module));
exports.MoralisSolUtils = MoralisSolUtils;
//# sourceMappingURL=MoralisSolUtils.js.map

/***/ }),

/***/ 376:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolAddress = void 0;
var SolAddress = /** @class */ (function () {
    function SolAddress(address) {
        this.address = address;
    }
    SolAddress.create = function (address) {
        return address instanceof SolAddress ? address : new SolAddress(SolAddress.parse(address));
    };
    SolAddress.parse = function (address) {
        // TODO: add address validation
        return address;
    };
    SolAddress.prototype.format = function () {
        // TODO: add `format` argument
        return this.address;
    };
    SolAddress.prototype.equals = function (address) {
        return this.address === address.address;
    };
    SolAddress.prototype.toString = function () {
        return this.address;
    };
    SolAddress.prototype.toJSON = function () {
        return this.address;
    };
    return SolAddress;
}());
exports.SolAddress = SolAddress;
//# sourceMappingURL=SolAddress.js.map

/***/ }),

/***/ 2136:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(376), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolNative = void 0;
var core_1 = __webpack_require__(4243);
var unitToDecimals = {
    solana: 9,
    lamports: 0,
};
var SolNative = /** @class */ (function () {
    function SolNative(rawValue) {
        this.rawValue = rawValue;
    }
    SolNative.create = function (value, unit) {
        if (value instanceof SolNative) {
            return value;
        }
        return new SolNative(SolNative.parse(value, unit));
    };
    SolNative.parse = function (value, unit) {
        if (unit === void 0) { unit = 'solana'; }
        var decimal;
        if (typeof unit === 'number') {
            decimal = unit;
        }
        else if (unitToDecimals[unit] !== undefined) {
            decimal = unitToDecimals[unit];
        }
        else {
            throw new core_1.MoralisCoreError({
                code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                message: "Not supported Solana unit: ".concat(unit),
            });
        }
        return core_1.BigNumber.fromDecimal(value.toString(), decimal);
    };
    Object.defineProperty(SolNative.prototype, "value", {
        get: function () {
            return this.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolNative.prototype, "solana", {
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['solana']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolNative.prototype, "lamports", {
        get: function () {
            return this.rawValue.toString();
        },
        enumerable: false,
        configurable: true
    });
    SolNative.prototype.format = function () {
        // TODO: add `format` argument
        return this.lamports;
    };
    SolNative.prototype.equals = function (value) {
        return this.lamports === value.lamports;
    };
    SolNative.prototype.toJSON = function () {
        return this.lamports;
    };
    SolNative.prototype.toString = function () {
        return this.lamports;
    };
    return SolNative;
}());
exports.SolNative = SolNative;
//# sourceMappingURL=SolNative.js.map

/***/ }),

/***/ 5070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7515), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9051:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolNetwork = void 0;
var core_1 = __webpack_require__(4243);
var solNetworkNames = ['mainnet', 'devnet'];
var SolNetwork = /** @class */ (function () {
    function SolNetwork(network) {
        this.network = network;
    }
    SolNetwork.create = function (network) {
        return network instanceof SolNetwork ? network : new SolNetwork(SolNetwork.parse(network));
    };
    SolNetwork.parse = function (network) {
        if (typeof network === 'string') {
            if (!solNetworkNames.includes(network)) {
                throw new core_1.MoralisCoreError({
                    code: core_1.CoreErrorCode.INVALID_ARGUMENT,
                    message: "Solana network is not supported: ".concat(network),
                });
            }
        }
        return network;
    };
    SolNetwork.prototype.format = function () {
        // TODO: add `format` argument
        return this.network;
    };
    SolNetwork.prototype.equals = function (network) {
        return this.network === network.network;
    };
    SolNetwork.prototype.toJSON = function () {
        return this.network;
    };
    SolNetwork.prototype.toString = function () {
        return this.network;
    };
    return SolNetwork;
}());
exports.SolNetwork = SolNetwork;
//# sourceMappingURL=SolNetwork.js.map

/***/ }),

/***/ 9005:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9051), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8836:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2136), exports);
__exportStar(__webpack_require__(9005), exports);
__exportStar(__webpack_require__(5070), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8836), exports);
__exportStar(__webpack_require__(6755), exports);
//# sourceMappingURL=index.js.map

/***/ })

};
;