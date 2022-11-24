var Standalone = require('mongodb-tools').ServerManager;
var Cluster = require('mongodb-tools').ShardingManager;
var Replicaset = require('mongodb-tools').ReplSetManager;
var path = require('path');
var debug = require('debug')('mongodb-runner:worker');
/**
 * @todo (imlucas): Switch to using `mongodb-connection-model`
 * instead of driver directly.
 */
var mongodb = require('mongodb');
var format = require('util').format;

/**
 * This file actually spawns the mongod and mongos processes by leveraging MongoDB-Tools
 */
/**
 * ## Auth Providers
 */
/**
 * ### none
 * null => no auth, yo.
 */
/**
 * ### scram-sha-1
 *
 * @see https://github.com/mongodb/node-mongodb-native/blob/2.0/test/functional/scram_tests.js
 *
 * Only available if require('get-mongodb-version').is(opts.bin, '>=2.7.5')
 * pass to Standalone|Cluster|Replicaset constructor as well:
 *   {
 *     setParameter: 'authenticationMechanisms=SCRAM-SHA-1'
 *   }
 * And call `server.setCredentials('scram-sha-1', username, password, db, done)`
 *
 *
 * // User and password
 * var user = 'test';
 * var password = 'test';
 * MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
 * // Create an admin user
 * db.admin().addUser(user, password, function(err, result) {
 * // Attempt to reconnect authenticating against the admin database
 * MongoClient.connect('mongodb://test:test@localhost:27017/test?'
 * + 'authMechanism=SCRAM-SHA-1&authSource=admin&maxPoolSize=5',
 */
/**
 * ### mongocr (mongodb-cr)
 *
 * http://docs.mongodb.org/manual/core/authentication/#mongodb-cr-authentication
 *
 */
/**
 * ### x509 (ssl)
 * @see http://docs.mongodb.org/manual/core/authentication/#x-509-certificate-authentication
 */
/**
 * ## Enterprise-Only Auth Providers
 */
/**
 * ### plain
 * a.k.a ldap
 *
 * MongoDB Enterprise Edition versions `2.5.0` and newer support the SASL PLAIN
 * authentication mechanism, initially intended for delegating authentication
 * to an LDAP server. Using the SASL PLAIN mechanism is very similar to MONGODB-CR.
 * These examples use the $external virtual database for LDAP support:
 * SASL PLAIN is a clear-text authentication mechanism. We strongly recommend
 * that you connect to MongoDB using SSL with certificate validation when using
 * the PLAIN mechanism:
 *
 * ```c
 * mongoc_client_t *client;
 * client = mongoc_client_new ('mongodb://user:password@example.com/'
 * + '?authMechanism=PLAIN&authSource=$external');
 * ```
 */
/**
 * ### gssapi (kerberos)
 * @see http://docs.mongodb.org/manual/core/authentication/#kerberos-authentication
 */
/**
 * ### sspi (kerberos on windows)
 */

var newUserPassOpts = function(opts) {
  var newOpts = {};
  if (opts.topology === 'standalone') {
    newOpts.auth = null;
    if (Number(opts.version) > 2.6) {
      newOpts.setParameter = 'authenticationMechanisms=' + opts.auth_mechanism;
    }
    return newOpts;
  }
  if (opts.topology === 'replicaset') {
    newOpts.auth = null;
    newOpts.keyFile = opts.keyFile;
    if (Number(opts.version) > 2.6) {
      newOpts.setParameter = 'authenticationMechanisms=' + opts.auth_mechanism;
    }
    return newOpts;
  }
  if (opts.topology === 'cluster') {
    newOpts.replicasetOptions = {};
    newOpts.replicasetOptions.auth = null;
    newOpts.replicasetOptions.keyFile = opts.keyFile;
    if (Number(opts.version) > 2.6) {
      newOpts.replicasetOptions.setParameter =
        'authenticationMechanisms=' + opts.auth_mechanism;
    }
    newOpts.configsOptions = {};
    newOpts.configsOptions.auth = null;
    newOpts.configsOptions.keyFile = opts.keyFile;
    newOpts.mongosOptions = {};
    newOpts.mongosOptions.keyFile = opts.keyFile;
    return newOpts;
  }
  return opts;
};

var createUser = function(db, username, password, roles, callback) {
  debug('Adding User');
  db.admin().addUser(username, password, roles, function(err, result) {
    debug('Create user result: ' + JSON.stringify(result));
    callback(err, db);
  });
};

var createAdmin = function(db, username, password, callback) {
  debug('Adding admin User');
  var roles = {
    roles: [
      {
        role: 'root',
        db: 'admin'
      }
    ]
  };
  createUser(db, username, password, roles, callback);
};

var startStandalone = function(opts) {
  var options = {
    host: 'localhost',
    port: opts.port,
    storageEngine: opts.storage_engine,
    dbpath: opts.dbpath,
    logpath: opts.logpath,
    rest: false,
    purge: opts.purge,
    bin: opts.mongodBin
  };
  return new Standalone(options);
};

var startReplicaset = function(opts) {
  var options = {
    replSet: opts.name,
    startPort: opts.port,
    storageEngine: opts.storage_engine,
    dbpath: opts.dbpath,
    logpath: opts.logpath,
    arbiters: opts.arbiters,
    passives: opts.passives,
    secondaries: opts.secondaries,
    purge: opts.purge,
    rest: false,
    bin: opts.mongodBin
  };
  return new Replicaset(options);
};

var startCluster = function(opts) {
  if (opts.bin && opts.bin !== 'mongod') {
    var dir = path.dirname(opts.bin);
    opts.mongosBin = path.join(dir, 'mongos');
    opts.mongodBin = path.join(dir, 'mongod');
  }
  delete opts.bin;
  var options = {
    replSet: opts.name,
    storageEngine: opts.storage_engine,
    dbpath: opts.dbpath,
    logpath: opts.logpath,
    replsets: opts.shards,
    mongoses: opts.mongoses,
    configs: opts.configs,
    mongosStartPort: opts.port,
    replsetStartPort: opts.shardPort,
    configStartPort: opts.configPort,
    mongosBin: opts.mongosBin,
    mongodBin: opts.mongodBin,
    purge: opts.purge,
    replicasetOptions: {
      secondaries: opts.secondaries,
      arbiters: opts.arbiters,
      passives: opts.passives
    },
    configsOptions: {},
    mongosOptions: {},
    rest: false
  };
  return new Cluster(options);
};

/**
 * This file is a worker process that actually starts the mongodb deployments.
 * @param {object} opts
 * @param {Function} done stops the worker
 */
module.exports = function(opts, done) {
  var server;
  var delay = 0;
  debug(
    'Initializing mongodb-tools topology with opts:' + JSON.stringify(opts)
  );
  opts.purge = opts.purge === 'true';

  /**
   * Get opts form the commandline and create an options object.
   * This options object is passed to `mongodb-tools` which actually
   * starts the mongodb processes
   */
  if (opts.topology === 'cluster') {
    server = startCluster(opts);
    delay = 10000;
  } else if (opts.topology === 'replicaset') {
    server = startReplicaset(opts);
    delay = 5000;
  } else {
    server = startStandalone(opts);
    delay = 0;
  }


  // HACCK DON"T LOOK AT ME>>>>>
  opts.server = server;

  debug('Starting topology...');
  /**
   * @todo (imlucas): Handle mongodb already running (started outside of mongodb-runner)
   * gracefully so you can start mongod in weird ways and not have to change your
   * module's package.json.
   */

  server.start(
    {
      kill: false,
      purge: opts.purge
    },
    function(err) {
      if (err) {
        return done(err);
      }
      /* eslint no-shadow:0 */
      debug('Server started without auth');
      if (process.send) {
        var msg = {
          event: 'started',
          opts: opts
        };
        debug('Notifying parent process', msg);
        process.send(msg);
      }

      if (
        opts.auth_mechanism !== 'MONGODB-CR' &&
        opts.auth_mechanism !== 'SCRAM-SHA-1'
      ) {
        debug('server ready');
        done(null, opts);
        return;
      }

      if (
        opts.auth_mechanism === 'MONGODB-CR' ||
        opts.auth_mechanism === 'SCRAM-SHA-1'
      ) {
        debug('Waiting for start...');
        setTimeout(function() {
          var url = format('mongodb://localhost:%s/test', opts.port);
          debug('User/Pass auth enabled... connecting to MongoDB');
          var client = new mongodb.MongoClient(url);
          client.connect(function(err, client) {
            if (err) {
              return done(err);
            }

            debug('Creating admin user');
            var db = client.db('admin');
            createAdmin(db, opts.username, opts.password, function(err) {
              if (err) {
                return done(err);
              }

              debug('Closing connection');
              client.close(function(err) {
                if (err) {
                  return done(err);
                }

                debug('Restarting server');
                var newOpts = newUserPassOpts(opts);
                newOpts.purge = opts.purge = false;
                opts.shouldStop = true;
                server.updateServerOptions(newOpts);
                if (opts.auth_mechanism === 'SCRAM-SHA-1') {
                  server.setCredentials(
                    'scram-sha-1',
                    'admin',
                    opts.username,
                    opts.password
                  );
                } else {
                  server.setCredentials(
                    'mongodb-cr',
                    'admin',
                    opts.username,
                    opts.password
                  );
                }
                server.restart(opts, function(err) {
                  if (err) {
                    return done(err);
                  }

                  debug('Waiting for restart...');
                  setTimeout(done, delay);
                });
              });
            });
          });
        }, delay);
      }
    }
  );
};
