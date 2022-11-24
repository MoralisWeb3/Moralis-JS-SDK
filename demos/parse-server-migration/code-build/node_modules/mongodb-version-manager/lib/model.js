var path = require('path');
var config = require('./config');
var AmpersandState = require('ampersand-state');

var Model = AmpersandState.extend({
  props: {
    name: {
      type: 'string',
      default: 'mongodb'
    },
    platform: {
      type: 'string'
    },
    version: {
      type: 'string'
    },
    filename: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    debug: {
      type: 'boolean',
      default: false
    },
    enterprise: {
      type: 'boolean',
      default: false
    },
    distro: {
      type: 'string'
    },
    bits: {
      type: 'string'
    },
    directory: {
      type: 'string'
    }
  },
  derived: {
    download_directory: {
      deps: ['directory'],
      fn: function() {
        if (!this.directory) {
          return undefined;
        }
        return path.join(this.directory, 'downloads');
      }
    },
    download_path: {
      deps: ['download_directory', 'filename'],
      fn: function() {
        if (!this.download_directory) {
          return undefined;
        }
        return path.join(this.download_directory, this.filename);
      }
    },
    root_directory: {
      deps: ['directory', 'name', 'version', 'platform', 'bits', 'enterprise', 'debug'],
      fn: function() {
        if (!this.directory) {
          return undefined;
        }
        var dir = [this.name, this.version, this.platform, this.bits].join('-');
        if (this.enterprise) {
          dir += '-enterprise';
        }
        if (this.debug) {
          dir += '-debug';
        }
        return path.join(this.directory, dir);
      }
    },
    bin_directory: {
      deps: ['root_directory'],
      fn: function() {
        if (!this.root_directory) {
          return undefined;
        }
        return path.join(this.root_directory, 'bin');
      }
    }
  },
  initialize: function(attrs) {
    attrs = attrs || {};
    if (attrs.artifact) {
      this.filename = attrs.filename = attrs.artifact;
    }
    this.directory = attrs.directory = config.ROOT_DIRECTORY;
    if (attrs.platform === 'win32') {
      this.platform = attrs.platform = 'windows';
    }
  }
});

module.exports = Model;
