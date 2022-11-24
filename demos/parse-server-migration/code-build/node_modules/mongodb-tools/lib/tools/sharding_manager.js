var f = require('util').format;
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var ServerManager = require('./server_manager');
var ReplSetManager = require('./replset_manager');
var MongosManager = require('./mongos_manager');
var Server = require('mongodb-core').Server;

var clone = function(obj) {
  var o = {};
  for (var name in obj) {
    o[name] = obj[name];
  }
  return o;
};

var ShardingManager = function(mongosOptions) {
  mongosOptions = mongosOptions || {};
  // Default values
  mongosOptions.kill = typeof mongosOptions.kill === 'boolean' ? mongosOptions.kill : true;
  mongosOptions.purge = typeof mongosOptions.purge === 'boolean' ? mongosOptions.purge : true;

  // Replset name
  var replSet = mongosOptions.replSet = mongosOptions.replSet || 'rs';

  // Unpack options
  var numberOfReplicasets = typeof mongosOptions.replsets === 'number'
    ? mongosOptions.replsets : 2;
  var numberOfMongoses = typeof mongosOptions.mongoses === 'number'
    ? mongosOptions.mongoses : 2;
  var numberOfConfigs = typeof mongosOptions.configs == 'number'
    ? mongosOptions.configs : 1;

  // Binaries
  var mongosBin = mongosOptions.mongosBin || 'mongos';
  var mongodBin = mongosOptions.mongodBin || 'mongod';

  // Starting ports
  var mongosStartPort = mongosOptions.mongosStartPort || 50000;
  var replsetStartPort = mongosOptions.replsetStartPort || 31000;
  var configStartPort = mongosOptions.configStartPort || 35000;

  // Replicaset options
  var replicasetOptions = mongosOptions.replicasetOptions || {};
  var mongosProxyOptions = mongosOptions.mongosOptions || {};
  var configsOptions = mongosOptions.configsOptions || {};

  // Number of elements in each replicaset
  var secondaries = typeof mongosOptions.secondaries === 'number'
    ? mongosOptions.secondaries : 2;
  var arbiters = typeof mongosOptions.arbiters === 'number'
    ? mongosOptions.arbiters : 0;

  // Replset specific options
  var dbpath = mongosOptions.dbpath;
  var logpath = mongosOptions.logpath;
  var tags = mongosOptions.tags;

  // Contains all the managers
  var replicasets = [];
  var mongoses = [];
  var configs = [];

  var credentials;

  Object.defineProperty(this, 'mongosStartPort', {
    enumerable: true,
    get: function() {
      return mongosStartPort;
    }
  });

  this.setCredentials = function(provider, db, user, password) {
    credentials = {
      provider: provider,
      db: db,
      user: user,
      password: password
    };
    for (var i = 0; i < mongoses.length; i++) {
      mongoses[i].setCredentials(provider, db, user, password);
    }
  };

  this.updateServerOptions = function(options) {
    for (var attrname in options) {
      mongosOptions[attrname] = options[attrname];
    }
    for (var i = 0; i < mongoses.length; i++) {
      mongoses[i].updateMongosOptions(options.mongosOptions);
    }
    for (var i = 0; i < replicasets.length; i++) {
      replicasets[i].updateServerOptions(options.replicasetOptions);
    }
    for (var i = 0; i < configs.length; i++) {
      configs[i].updateServerOptions(options.configsOptions);
    }
  };

  // Start the server
  this.start = function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // Replicaset initial port
    var initialPort = replsetStartPort;
    var initiallMongosPort = mongosStartPort;
    var initiallConfigPort = configStartPort;

    // Start configs
    var startConfigs = function(callback) {
      var opts = clone(replicasetOptions);
      opts.port = replsetStartPort;
      opts.host = 'localhost';

      // We need to establish if the servers support config servers as a replicaset
      var server = new Server(opts);
      server.on('connect', function(err) {
        // Run as replicaset
        if (server.lastIsMaster().maxWireVersion >= 4) {
          var opts = clone(replicasetOptions);
          // Set some variables
          opts.startPort = initiallConfigPort;
          opts.configsvr = null;
          opts.dbpath = dbpath + '/configs';
          opts.logpath = logpath + '/configs';
          mkdirp.sync(opts.dbpath);
          mkdirp.sync(opts.logpath);
          
          opts.replSet = replSet + '_configs';
          opts.bin = mongodBin;
          // Create replsetManager
          var replsetManager = new ReplSetManager(opts);
          // Add to list of config sets
          configs.push(replsetManager);

          // Start the replicaset managers
          replsetManager.start({
            purge: true,
            kill: false
          }, function(err) {
            callback(err);
          });
        } else {
          var configsLeft = numberOfConfigs;
          // Start the config instances
          for (var i = 0; i < numberOfConfigs; i++) {
            var opts = clone(configsOptions);
            opts.dbpath = dbpath + f('/data-%s', initiallConfigPort);
            opts.logpath = logpath + f('/data-%s.log', initiallConfigPort);
            opts.port = initiallConfigPort;
            opts.bin = mongodBin;

            // Create a server manager
            configs.push(new ServerManager(opts));
            // Update the config server port
            initiallConfigPort = initiallConfigPort + 1;
            // Start all the config server
            configs[i].start({
              purge: options.purge
            }, function(err) {
              if (err) {
                throw err;
              }
              configsLeft = configsLeft - 1;

              // Mongos's are done booting
              if (configsLeft === 0) {
                callback();
              }
            });
          }
        }
      });

      server.connect();
    };

    // Start Replicasets
    var startReplicasets = function(callback) {
      var replSetsLeft = numberOfReplicasets;
      // Create Replicaset Managers
      for (var i = 0; i < numberOfReplicasets; i++) {
        var opts = clone(replicasetOptions);
        // Set name of replset
        var name = replSet + i;

        // Set some variables
        opts.startPort = initialPort;
        opts.dbpath = dbpath;
        opts.logpath = logpath;
        opts.tags = tags;
        opts.replSet = name;
        opts.bin = mongodBin;
        opts.shardsvr = null;

        // Add to list of replicasets
        replicasets.push(new ReplSetManager(opts));

        // Increase the initialPort
        initialPort = initialPort + 5 + (secondaries + arbiters + 1);

        // Start the replicaset managers
        replicasets[i].start({
          purge: options.purge,
          kill: i == 0 ? true : false
        }, function(err) {
          if (err) {
            throw err;
          }
          replSetsLeft = replSetsLeft - 1;

          // No more managers left to start
          if (replSetsLeft === 0) {
            callback();
          }
        });
      }
    };

    // Start Mongooses
    var startMongoses = function(callback) {
      var mongosLeft = numberOfMongoses;
      var initiallConfigPort = configStartPort;
      var configsAddresses = [];

      if (configs.length == 1 && configs[0] instanceof ReplSetManager) {
        for (var i = 0; i < 3; i++) {
          configsAddresses.push(f('localhost:%s', configs[0].startPort + i));
        }
      } else {
        // Create config addresses for mongos's
        for (var i = 0; i < numberOfConfigs; i++) {
          configsAddresses.push(f('localhost:%s', initiallConfigPort++));
        }
      }

      // Start the config servers instances
      for (var i = 0; i < numberOfMongoses; i++) {
        var opts = clone(mongosProxyOptions);
        opts.port = initiallMongosPort;
        opts.pidfilepath = f('%s', dbpath);
        opts.logpath = f('%s/mongos-%s.log', logpath, initiallMongosPort);
        opts.configdb = configsAddresses;
        opts.bin = mongosBin;

        // Done let's start up the mongos instances
        mongoses.push(new MongosManager(opts));

        // Update the mongos port
        initiallMongosPort = initiallMongosPort + 1;

        // Set the credentials for the mongos
        if (credentials) {
          mongoses[i].setCredentials(credentials.provider,
            credentials.db,
            credentials.user,
            credentials.password);
        }

        // Start all the mongoses
        mongoses[i].start({
          purge: options.purge
        }, function(err) {
          if (err) {
            throw err;
          }
          mongosLeft = mongosLeft - 1;

          // Mongos's are done booting
          if (mongosLeft === 0) {
            callback();
          }
        });
      }
    };

    // Set up shards
    var setupShards = function(callback) {
      var replSetsLeft = numberOfReplicasets;
      // Get a mongos connection
      mongoses[0].connect(function(err, server) {
        if (err) {
          throw err;
        }

        var setupShard = function(replset, _callback) {
          replset.getIsMaster(function(err, ismaster) {
            if (err) {
              throw err;
            }

            server.command('admin.$cmd', {
              addshard: f('%s/%s', replset.name, ismaster.me)
            }, _callback);
          });
        };

        for (var i = 0; i < numberOfReplicasets; i++) {
          setupShard(replicasets[i], function(err) {
            replSetsLeft = replSetsLeft - 1;
            if (err) {
              throw err;
            }

            if (replSetsLeft === 0) {
              callback();
            }
          });
        }
      });
    };

    // Start up sharded system
    var start = function() {
      setTimeout(function() {
        // Start up replicasets
        startReplicasets(function() {
          // Start up config servers
          startConfigs(function() {
            // Start up mongos processes
            startMongoses(function() {
              // Set up the sharded system
              setupShards(function() {
                setTimeout(function() {
                  callback();
                }, 5000);
              });
            });
          });
        });
      }, 1000);
    };

    // kill all instances
    if (mongosOptions.kill) {
      return exec(f('killall -3 mongod'), function() {
        exec(f('killall -3 mongos'), function() {
          // purge the directory
          if (mongosOptions.purge) {
            rimraf.sync(dbpath);
            mkdirp.sync(dbpath);
          }

          // Start servers
          start();
        });
      });
    }

    // purge the directory
    if (mongosOptions.purge) {
      rimraf.sync(dbpath);
      mkdirp.sync(dbpath);
    }

    // Start servers
    start();
  };

  this.stop = function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // All Managers to kill
    var managers = replicasets.slice(0).concat(configs).concat(mongoses);
    var totalLeft = managers.length;
    if (totalLeft === 0) {
      return callback();
    }

    // Stop all managers
    for (var i = 0; i < managers.length; i++) {
      managers[i].stop(options, function() {
        totalLeft = totalLeft - 1;

        if (totalLeft === 0) {
          callback();
        }
      });
    }
  };

  this.restart = function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // All Managers to kill
    var managers = replicasets.slice(0).concat(configs).concat(mongoses);
    var totalLeft = managers.length;

    // Restart all managers
    for (var i = 0; i < managers.length; i++) {
      managers[i].restart(options, function(err) {
        if (err) {
          throw err;
        }
        totalLeft = totalLeft - 1;

        if (totalLeft === 0) {
          callback();
        }
      });
    }
  };

  this.remove = function(t, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    var index = options.index || 0;
    // If we are killing a mongoose
    if (t === 'mongos') {
      mongoses[index].stop(function(err) {
        callback(err, mongoses[index]);
      });
    }
  };

  this.add = function(server, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // Start the server instance
    server.start(function(err) {
      callback(err);
    });
  };
};

module.exports = ShardingManager;
