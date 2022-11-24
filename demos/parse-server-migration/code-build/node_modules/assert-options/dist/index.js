"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assertOptions(options, defaults) {
    if (options !== null && options !== undefined && typeof options !== 'object') {
        throw new TypeError('Invalid "options" parameter: ' + JSON.stringify(options));
    }
    var isArray = Array.isArray(defaults);
    if (!isArray && (!defaults || typeof defaults !== 'object')) {
        throw new TypeError('Invalid "defaults" parameter: ' + JSON.stringify(defaults));
    }
    if (options) {
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var a = _a[_i];
            if ((isArray && defaults.indexOf(a) === -1) || (!isArray && !(a in defaults))) {
                throw new Error('Option "' + a + '" is not recognized.');
            }
        }
    }
    else {
        options = {};
    }
    if (!isArray) {
        var defs = defaults;
        for (var _b = 0, _c = Object.keys(defs); _b < _c.length; _b++) {
            var d = _c[_b];
            if (options[d] === undefined && defs[d] !== undefined) {
                options[d] = defs[d];
            }
        }
    }
    return options;
}
exports.assertOptions = assertOptions;
