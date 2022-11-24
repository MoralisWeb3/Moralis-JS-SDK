var fs = require('fs');
var path = require('path');
var through = require('through2');
var findRoot = require('find-root');

module.exports = function (file) {
    var VERSION_REGEX = /\/\*\s*\$AMPERSAND_VERSION\s*\*\//g;

    var root = findRoot(path.dirname(file));
    var pack = require(root + '/package.json');

    var name = pack.name;
    var version = pack.version;

    var codeString = ';' + [
        'if (typeof window !== "undefined") {',
        '  window.ampersand = window.ampersand || {};',
        '  window.ampersand["' + name + '"] = window.ampersand["' + name + '"] || [];',
        '  window.ampersand["' + name + '"].push("' + version + '");',
        '}'
    ].join('');

    return through(function (buf, enc, next) {
        this.push(buf.toString('utf8').replace(VERSION_REGEX, codeString));
        next();
    });
 };
