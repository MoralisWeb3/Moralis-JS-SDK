"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Options = require("./Options");

var _defaults = _interopRequireDefault(require("./defaults"));

var logging = _interopRequireWildcard(require("./logger"));

var _Config = _interopRequireDefault(require("./Config"));

var _PromiseRouter = _interopRequireDefault(require("./PromiseRouter"));

var _requiredParameter = _interopRequireDefault(require("./requiredParameter"));

var _AnalyticsRouter = require("./Routers/AnalyticsRouter");

var _ClassesRouter = require("./Routers/ClassesRouter");

var _FeaturesRouter = require("./Routers/FeaturesRouter");

var _FilesRouter = require("./Routers/FilesRouter");

var _FunctionsRouter = require("./Routers/FunctionsRouter");

var _GlobalConfigRouter = require("./Routers/GlobalConfigRouter");

var _GraphQLRouter = require("./Routers/GraphQLRouter");

var _HooksRouter = require("./Routers/HooksRouter");

var _IAPValidationRouter = require("./Routers/IAPValidationRouter");

var _InstallationsRouter = require("./Routers/InstallationsRouter");

var _LogsRouter = require("./Routers/LogsRouter");

var _ParseLiveQueryServer = require("./LiveQuery/ParseLiveQueryServer");

var _PagesRouter = require("./Routers/PagesRouter");

var _PublicAPIRouter = require("./Routers/PublicAPIRouter");

var _PushRouter = require("./Routers/PushRouter");

var _CloudCodeRouter = require("./Routers/CloudCodeRouter");

var _RolesRouter = require("./Routers/RolesRouter");

var _SchemasRouter = require("./Routers/SchemasRouter");

var _SessionsRouter = require("./Routers/SessionsRouter");

var _UsersRouter = require("./Routers/UsersRouter");

var _PurgeRouter = require("./Routers/PurgeRouter");

var _AudiencesRouter = require("./Routers/AudiencesRouter");

var _AggregateRouter = require("./Routers/AggregateRouter");

var _ParseServerRESTController = require("./ParseServerRESTController");

var controllers = _interopRequireWildcard(require("./Controllers"));

var _ParseGraphQLServer = require("./GraphQL/ParseGraphQLServer");

var _SecurityRouter = require("./Routers/SecurityRouter");

var _CheckRunner = _interopRequireDefault(require("./Security/CheckRunner"));

var _Deprecator = _interopRequireDefault(require("./Deprecator/Deprecator"));

var _DefinedSchemas = require("./SchemaMigrations/DefinedSchemas");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ParseServer - open-source compatible API Server for Parse apps
var batch = require('./batch'),
    bodyParser = require('body-parser'),
    express = require('express'),
    middlewares = require('./middlewares'),
    Parse = require('parse/node').Parse,
    {
  parse
} = require('graphql'),
    path = require('path'),
    fs = require('fs');

// Mutate the Parse object to add the Cloud Code handlers
addParseCloud(); // ParseServer works like a constructor of an express app.
// https://parseplatform.org/parse-server/api/master/ParseServerOptions.html

class ParseServer {
  /**
   * @constructor
   * @param {ParseServerOptions} options the parse server initialization options
   */
  constructor(options) {
    // Scan for deprecated Parse Server options
    _Deprecator.default.scanParseServerOptions(options); // Set option defaults


    injectDefaults(options);
    const {
      appId = (0, _requiredParameter.default)('You must provide an appId!'),
      masterKey = (0, _requiredParameter.default)('You must provide a masterKey!'),
      cloud,
      security,
      javascriptKey,
      serverURL = (0, _requiredParameter.default)('You must provide a serverURL!'),
      serverStartComplete,
      schema
    } = options; // Initialize the node client SDK automatically

    Parse.initialize(appId, javascriptKey || 'unused', masterKey);
    Parse.serverURL = serverURL;
    const allControllers = controllers.getControllers(options);
    const {
      loggerController,
      databaseController,
      hooksController
    } = allControllers;
    this.config = _Config.default.put(Object.assign({}, options, allControllers));
    logging.setLogger(loggerController); // Note: Tests will start to fail if any validation happens after this is called.

    databaseController.performInitialization().then(() => hooksController.load()).then(async () => {
      if (schema) {
        await new _DefinedSchemas.DefinedSchemas(schema, this.config).execute();
      }

      if (serverStartComplete) {
        serverStartComplete();
      }
    }).catch(error => {
      if (serverStartComplete) {
        serverStartComplete(error);
      } else {
        console.error(error);
        process.exit(1);
      }
    });

    if (cloud) {
      addParseCloud();

      if (typeof cloud === 'function') {
        cloud(Parse);
      } else if (typeof cloud === 'string') {
        require(path.resolve(process.cwd(), cloud));
      } else {
        throw "argument 'cloud' must either be a string or a function";
      }
    }

    if (security && security.enableCheck && security.enableCheckLog) {
      new _CheckRunner.default(options.security).run();
    }
  }

  get app() {
    if (!this._app) {
      this._app = ParseServer.app(this.config);
    }

    return this._app;
  }

  handleShutdown() {
    const promises = [];
    const {
      adapter: databaseAdapter
    } = this.config.databaseController;

    if (databaseAdapter && typeof databaseAdapter.handleShutdown === 'function') {
      promises.push(databaseAdapter.handleShutdown());
    }

    const {
      adapter: fileAdapter
    } = this.config.filesController;

    if (fileAdapter && typeof fileAdapter.handleShutdown === 'function') {
      promises.push(fileAdapter.handleShutdown());
    }

    const {
      adapter: cacheAdapter
    } = this.config.cacheController;

    if (cacheAdapter && typeof cacheAdapter.handleShutdown === 'function') {
      promises.push(cacheAdapter.handleShutdown());
    }

    return (promises.length > 0 ? Promise.all(promises) : Promise.resolve()).then(() => {
      if (this.config.serverCloseComplete) {
        this.config.serverCloseComplete();
      }
    });
  }
  /**
   * @static
   * Create an express app for the parse server
   * @param {Object} options let you specify the maxUploadSize when creating the express app  */


  static app(options) {
    const {
      maxUploadSize = '20mb',
      appId,
      directAccess,
      pages
    } = options; // This app serves the Parse API directly.
    // It's the equivalent of https://api.parse.com/1 in the hosted Parse API.

    var api = express(); //api.use("/apps", express.static(__dirname + "/public"));

    api.use(middlewares.allowCrossDomain(appId)); // File handling needs to be before default middlewares are applied

    api.use('/', new _FilesRouter.FilesRouter().expressRouter({
      maxUploadSize: maxUploadSize
    }));
    api.use('/health', function (req, res) {
      res.json({
        status: 'ok'
      });
    });
    api.use('/', bodyParser.urlencoded({
      extended: false
    }), pages.enableRouter ? new _PagesRouter.PagesRouter(pages).expressRouter() : new _PublicAPIRouter.PublicAPIRouter().expressRouter());
    api.use(bodyParser.json({
      type: '*/*',
      limit: maxUploadSize
    }));
    api.use(middlewares.allowMethodOverride);
    api.use(middlewares.handleParseHeaders);
    const appRouter = ParseServer.promiseRouter({
      appId
    });
    api.use(appRouter.expressRouter());
    api.use(middlewares.handleParseErrors); // run the following when not testing

    if (!process.env.TESTING) {
      //This causes tests to spew some useless warnings, so disable in test

      /* istanbul ignore next */
      process.on('uncaughtException', err => {
        if (err.code === 'EADDRINUSE') {
          // user-friendly message for this common error
          process.stderr.write(`Unable to listen on port ${err.port}. The port is already in use.`);
          process.exit(0);
        } else {
          throw err;
        }
      }); // verify the server url after a 'mount' event is received

      /* istanbul ignore next */

      api.on('mount', function () {
        ParseServer.verifyServerUrl();
      });
    }

    if (process.env.PARSE_SERVER_ENABLE_EXPERIMENTAL_DIRECT_ACCESS === '1' || directAccess) {
      Parse.CoreManager.setRESTController((0, _ParseServerRESTController.ParseServerRESTController)(appId, appRouter));
    }

    return api;
  }

  static promiseRouter({
    appId
  }) {
    const routers = [new _ClassesRouter.ClassesRouter(), new _UsersRouter.UsersRouter(), new _SessionsRouter.SessionsRouter(), new _RolesRouter.RolesRouter(), new _AnalyticsRouter.AnalyticsRouter(), new _InstallationsRouter.InstallationsRouter(), new _FunctionsRouter.FunctionsRouter(), new _SchemasRouter.SchemasRouter(), new _PushRouter.PushRouter(), new _LogsRouter.LogsRouter(), new _IAPValidationRouter.IAPValidationRouter(), new _FeaturesRouter.FeaturesRouter(), new _GlobalConfigRouter.GlobalConfigRouter(), new _GraphQLRouter.GraphQLRouter(), new _PurgeRouter.PurgeRouter(), new _HooksRouter.HooksRouter(), new _CloudCodeRouter.CloudCodeRouter(), new _AudiencesRouter.AudiencesRouter(), new _AggregateRouter.AggregateRouter(), new _SecurityRouter.SecurityRouter()];
    const routes = routers.reduce((memo, router) => {
      return memo.concat(router.routes);
    }, []);
    const appRouter = new _PromiseRouter.default(routes, appId);
    batch.mountOnto(appRouter);
    return appRouter;
  }
  /**
   * starts the parse server's express app
   * @param {ParseServerOptions} options to use to start the server
   * @param {Function} callback called when the server has started
   * @returns {ParseServer} the parse server instance
   */


  start(options, callback) {
    const app = express();

    if (options.middleware) {
      let middleware;

      if (typeof options.middleware == 'string') {
        middleware = require(path.resolve(process.cwd(), options.middleware));
      } else {
        middleware = options.middleware; // use as-is let express fail
      }

      app.use(middleware);
    }

    app.use(options.mountPath, this.app);

    if (options.mountGraphQL === true || options.mountPlayground === true) {
      let graphQLCustomTypeDefs = undefined;

      if (typeof options.graphQLSchema === 'string') {
        graphQLCustomTypeDefs = parse(fs.readFileSync(options.graphQLSchema, 'utf8'));
      } else if (typeof options.graphQLSchema === 'object' || typeof options.graphQLSchema === 'function') {
        graphQLCustomTypeDefs = options.graphQLSchema;
      }

      const parseGraphQLServer = new _ParseGraphQLServer.ParseGraphQLServer(this, {
        graphQLPath: options.graphQLPath,
        playgroundPath: options.playgroundPath,
        graphQLCustomTypeDefs
      });

      if (options.mountGraphQL) {
        parseGraphQLServer.applyGraphQL(app);
      }

      if (options.mountPlayground) {
        parseGraphQLServer.applyPlayground(app);
      }
    }

    const server = app.listen(options.port, options.host, callback);
    this.server = server;

    if (options.startLiveQueryServer || options.liveQueryServerOptions) {
      this.liveQueryServer = ParseServer.createLiveQueryServer(server, options.liveQueryServerOptions, options);
    }
    /* istanbul ignore next */


    if (!process.env.TESTING) {
      configureListeners(this);
    }

    this.expressApp = app;
    return this;
  }
  /**
   * Creates a new ParseServer and starts it.
   * @param {ParseServerOptions} options used to start the server
   * @param {Function} callback called when the server has started
   * @returns {ParseServer} the parse server instance
   */


  static start(options, callback) {
    const parseServer = new ParseServer(options);
    return parseServer.start(options, callback);
  }
  /**
   * Helper method to create a liveQuery server
   * @static
   * @param {Server} httpServer an optional http server to pass
   * @param {LiveQueryServerOptions} config options for the liveQueryServer
   * @param {ParseServerOptions} options options for the ParseServer
   * @returns {ParseLiveQueryServer} the live query server instance
   */


  static createLiveQueryServer(httpServer, config, options) {
    if (!httpServer || config && config.port) {
      var app = express();
      httpServer = require('http').createServer(app);
      httpServer.listen(config.port);
    }

    return new _ParseLiveQueryServer.ParseLiveQueryServer(httpServer, config, options);
  }

  static verifyServerUrl(callback) {
    // perform a health check on the serverURL value
    if (Parse.serverURL) {
      const request = require('./request');

      request({
        url: Parse.serverURL.replace(/\/$/, '') + '/health'
      }).catch(response => response).then(response => {
        const json = response.data || null;

        if (response.status !== 200 || !json || json && json.status !== 'ok') {
          /* eslint-disable no-console */
          console.warn(`\nWARNING, Unable to connect to '${Parse.serverURL}'.` + ` Cloud code and push notifications may be unavailable!\n`);
          /* eslint-enable no-console */

          if (callback) {
            callback(false);
          }
        } else {
          if (callback) {
            callback(true);
          }
        }
      });
    }
  }

}

function addParseCloud() {
  const ParseCloud = require('./cloud-code/Parse.Cloud');

  Object.defineProperty(Parse, 'Server', {
    get() {
      return _Config.default.get(Parse.applicationId);
    },

    set(newVal) {
      newVal.appId = Parse.applicationId;

      _Config.default.put(newVal);
    },

    configurable: true
  });
  Object.assign(Parse.Cloud, ParseCloud);
  global.Parse = Parse;
}

function injectDefaults(options) {
  Object.keys(_defaults.default).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(options, key)) {
      options[key] = _defaults.default[key];
    }
  });

  if (!Object.prototype.hasOwnProperty.call(options, 'serverURL')) {
    options.serverURL = `http://localhost:${options.port}${options.mountPath}`;
  } // Reserved Characters


  if (options.appId) {
    const regex = /[!#$%'()*+&/:;=?@[\]{}^,|<>]/g;

    if (options.appId.match(regex)) {
      console.warn(`\nWARNING, appId that contains special characters can cause issues while using with urls.\n`);
    }
  } // Backwards compatibility


  if (options.userSensitiveFields) {
    /* eslint-disable no-console */
    !process.env.TESTING && console.warn(`\nDEPRECATED: userSensitiveFields has been replaced by protectedFields allowing the ability to protect fields in all classes with CLP. \n`);
    /* eslint-enable no-console */

    const userSensitiveFields = Array.from(new Set([...(_defaults.default.userSensitiveFields || []), ...(options.userSensitiveFields || [])])); // If the options.protectedFields is unset,
    // it'll be assigned the default above.
    // Here, protect against the case where protectedFields
    // is set, but doesn't have _User.

    if (!('_User' in options.protectedFields)) {
      options.protectedFields = Object.assign({
        _User: []
      }, options.protectedFields);
    }

    options.protectedFields['_User']['*'] = Array.from(new Set([...(options.protectedFields['_User']['*'] || []), ...userSensitiveFields]));
  } // Merge protectedFields options with defaults.


  Object.keys(_defaults.default.protectedFields).forEach(c => {
    const cur = options.protectedFields[c];

    if (!cur) {
      options.protectedFields[c] = _defaults.default.protectedFields[c];
    } else {
      Object.keys(_defaults.default.protectedFields[c]).forEach(r => {
        const unq = new Set([...(options.protectedFields[c][r] || []), ..._defaults.default.protectedFields[c][r]]);
        options.protectedFields[c][r] = Array.from(unq);
      });
    }
  });
  options.masterKeyIps = Array.from(new Set(options.masterKeyIps.concat(_defaults.default.masterKeyIps, options.masterKeyIps)));
} // Those can't be tested as it requires a subprocess

/* istanbul ignore next */


function configureListeners(parseServer) {
  const server = parseServer.server;
  const sockets = {};
  /* Currently, express doesn't shut down immediately after receiving SIGINT/SIGTERM if it has client connections that haven't timed out. (This is a known issue with node - https://github.com/nodejs/node/issues/2642)
    This function, along with `destroyAliveConnections()`, intend to fix this behavior such that parse server will close all open connections and initiate the shutdown process as soon as it receives a SIGINT/SIGTERM signal. */

  server.on('connection', socket => {
    const socketId = socket.remoteAddress + ':' + socket.remotePort;
    sockets[socketId] = socket;
    socket.on('close', () => {
      delete sockets[socketId];
    });
  });

  const destroyAliveConnections = function () {
    for (const socketId in sockets) {
      try {
        sockets[socketId].destroy();
      } catch (e) {
        /* */
      }
    }
  };

  const handleShutdown = function () {
    process.stdout.write('Termination signal received. Shutting down.');
    destroyAliveConnections();
    server.close();
    parseServer.handleShutdown();
  };

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
}

var _default = ParseServer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QYXJzZVNlcnZlci5qcyJdLCJuYW1lcyI6WyJiYXRjaCIsInJlcXVpcmUiLCJib2R5UGFyc2VyIiwiZXhwcmVzcyIsIm1pZGRsZXdhcmVzIiwiUGFyc2UiLCJwYXJzZSIsInBhdGgiLCJmcyIsImFkZFBhcnNlQ2xvdWQiLCJQYXJzZVNlcnZlciIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsIkRlcHJlY2F0b3IiLCJzY2FuUGFyc2VTZXJ2ZXJPcHRpb25zIiwiaW5qZWN0RGVmYXVsdHMiLCJhcHBJZCIsIm1hc3RlcktleSIsImNsb3VkIiwic2VjdXJpdHkiLCJqYXZhc2NyaXB0S2V5Iiwic2VydmVyVVJMIiwic2VydmVyU3RhcnRDb21wbGV0ZSIsInNjaGVtYSIsImluaXRpYWxpemUiLCJhbGxDb250cm9sbGVycyIsImNvbnRyb2xsZXJzIiwiZ2V0Q29udHJvbGxlcnMiLCJsb2dnZXJDb250cm9sbGVyIiwiZGF0YWJhc2VDb250cm9sbGVyIiwiaG9va3NDb250cm9sbGVyIiwiY29uZmlnIiwiQ29uZmlnIiwicHV0IiwiT2JqZWN0IiwiYXNzaWduIiwibG9nZ2luZyIsInNldExvZ2dlciIsInBlcmZvcm1Jbml0aWFsaXphdGlvbiIsInRoZW4iLCJsb2FkIiwiRGVmaW5lZFNjaGVtYXMiLCJleGVjdXRlIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJwcm9jZXNzIiwiZXhpdCIsInJlc29sdmUiLCJjd2QiLCJlbmFibGVDaGVjayIsImVuYWJsZUNoZWNrTG9nIiwiQ2hlY2tSdW5uZXIiLCJydW4iLCJhcHAiLCJfYXBwIiwiaGFuZGxlU2h1dGRvd24iLCJwcm9taXNlcyIsImFkYXB0ZXIiLCJkYXRhYmFzZUFkYXB0ZXIiLCJwdXNoIiwiZmlsZUFkYXB0ZXIiLCJmaWxlc0NvbnRyb2xsZXIiLCJjYWNoZUFkYXB0ZXIiLCJjYWNoZUNvbnRyb2xsZXIiLCJsZW5ndGgiLCJQcm9taXNlIiwiYWxsIiwic2VydmVyQ2xvc2VDb21wbGV0ZSIsIm1heFVwbG9hZFNpemUiLCJkaXJlY3RBY2Nlc3MiLCJwYWdlcyIsImFwaSIsInVzZSIsImFsbG93Q3Jvc3NEb21haW4iLCJGaWxlc1JvdXRlciIsImV4cHJlc3NSb3V0ZXIiLCJyZXEiLCJyZXMiLCJqc29uIiwic3RhdHVzIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwiZW5hYmxlUm91dGVyIiwiUGFnZXNSb3V0ZXIiLCJQdWJsaWNBUElSb3V0ZXIiLCJ0eXBlIiwibGltaXQiLCJhbGxvd01ldGhvZE92ZXJyaWRlIiwiaGFuZGxlUGFyc2VIZWFkZXJzIiwiYXBwUm91dGVyIiwicHJvbWlzZVJvdXRlciIsImhhbmRsZVBhcnNlRXJyb3JzIiwiZW52IiwiVEVTVElORyIsIm9uIiwiZXJyIiwiY29kZSIsInN0ZGVyciIsIndyaXRlIiwicG9ydCIsInZlcmlmeVNlcnZlclVybCIsIlBBUlNFX1NFUlZFUl9FTkFCTEVfRVhQRVJJTUVOVEFMX0RJUkVDVF9BQ0NFU1MiLCJDb3JlTWFuYWdlciIsInNldFJFU1RDb250cm9sbGVyIiwicm91dGVycyIsIkNsYXNzZXNSb3V0ZXIiLCJVc2Vyc1JvdXRlciIsIlNlc3Npb25zUm91dGVyIiwiUm9sZXNSb3V0ZXIiLCJBbmFseXRpY3NSb3V0ZXIiLCJJbnN0YWxsYXRpb25zUm91dGVyIiwiRnVuY3Rpb25zUm91dGVyIiwiU2NoZW1hc1JvdXRlciIsIlB1c2hSb3V0ZXIiLCJMb2dzUm91dGVyIiwiSUFQVmFsaWRhdGlvblJvdXRlciIsIkZlYXR1cmVzUm91dGVyIiwiR2xvYmFsQ29uZmlnUm91dGVyIiwiR3JhcGhRTFJvdXRlciIsIlB1cmdlUm91dGVyIiwiSG9va3NSb3V0ZXIiLCJDbG91ZENvZGVSb3V0ZXIiLCJBdWRpZW5jZXNSb3V0ZXIiLCJBZ2dyZWdhdGVSb3V0ZXIiLCJTZWN1cml0eVJvdXRlciIsInJvdXRlcyIsInJlZHVjZSIsIm1lbW8iLCJyb3V0ZXIiLCJjb25jYXQiLCJQcm9taXNlUm91dGVyIiwibW91bnRPbnRvIiwic3RhcnQiLCJjYWxsYmFjayIsIm1pZGRsZXdhcmUiLCJtb3VudFBhdGgiLCJtb3VudEdyYXBoUUwiLCJtb3VudFBsYXlncm91bmQiLCJncmFwaFFMQ3VzdG9tVHlwZURlZnMiLCJ1bmRlZmluZWQiLCJncmFwaFFMU2NoZW1hIiwicmVhZEZpbGVTeW5jIiwicGFyc2VHcmFwaFFMU2VydmVyIiwiUGFyc2VHcmFwaFFMU2VydmVyIiwiZ3JhcGhRTFBhdGgiLCJwbGF5Z3JvdW5kUGF0aCIsImFwcGx5R3JhcGhRTCIsImFwcGx5UGxheWdyb3VuZCIsInNlcnZlciIsImxpc3RlbiIsImhvc3QiLCJzdGFydExpdmVRdWVyeVNlcnZlciIsImxpdmVRdWVyeVNlcnZlck9wdGlvbnMiLCJsaXZlUXVlcnlTZXJ2ZXIiLCJjcmVhdGVMaXZlUXVlcnlTZXJ2ZXIiLCJjb25maWd1cmVMaXN0ZW5lcnMiLCJleHByZXNzQXBwIiwicGFyc2VTZXJ2ZXIiLCJodHRwU2VydmVyIiwiY3JlYXRlU2VydmVyIiwiUGFyc2VMaXZlUXVlcnlTZXJ2ZXIiLCJyZXF1ZXN0IiwidXJsIiwicmVwbGFjZSIsInJlc3BvbnNlIiwiZGF0YSIsIndhcm4iLCJQYXJzZUNsb3VkIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJhcHBsaWNhdGlvbklkIiwic2V0IiwibmV3VmFsIiwiY29uZmlndXJhYmxlIiwiQ2xvdWQiLCJnbG9iYWwiLCJrZXlzIiwiZGVmYXVsdHMiLCJmb3JFYWNoIiwia2V5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwicmVnZXgiLCJtYXRjaCIsInVzZXJTZW5zaXRpdmVGaWVsZHMiLCJBcnJheSIsImZyb20iLCJTZXQiLCJwcm90ZWN0ZWRGaWVsZHMiLCJfVXNlciIsImMiLCJjdXIiLCJyIiwidW5xIiwibWFzdGVyS2V5SXBzIiwic29ja2V0cyIsInNvY2tldCIsInNvY2tldElkIiwicmVtb3RlQWRkcmVzcyIsInJlbW90ZVBvcnQiLCJkZXN0cm95QWxpdmVDb25uZWN0aW9ucyIsImRlc3Ryb3kiLCJlIiwic3Rkb3V0IiwiY2xvc2UiXSwibWFw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QUFPLENBQUMrSixNQUFSLENBQWUxRyxLQUFmLENBQXFCLDZDQUFyQjtBQUNBdUcsSUFBQUEsdUJBQXVCO0FBQ3ZCckQsSUFBQUEsTUFBTSxDQUFDeUQsS0FBUDtBQUNBaEQsSUFBQUEsV0FBVyxDQUFDdEcsY0FBWjtBQUNELEdBTEQ7O0FBTUFWLEVBQUFBLE9BQU8sQ0FBQ2lELEVBQVIsQ0FBVyxTQUFYLEVBQXNCdkMsY0FBdEI7QUFDQVYsRUFBQUEsT0FBTyxDQUFDaUQsRUFBUixDQUFXLFFBQVgsRUFBcUJ2QyxjQUFyQjtBQUNEOztlQUVjOUMsVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFBhcnNlU2VydmVyIC0gb3Blbi1zb3VyY2UgY29tcGF0aWJsZSBBUEkgU2VydmVyIGZvciBQYXJzZSBhcHBzXG5cbnZhciBiYXRjaCA9IHJlcXVpcmUoJy4vYmF0Y2gnKSxcbiAgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyksXG4gIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyksXG4gIG1pZGRsZXdhcmVzID0gcmVxdWlyZSgnLi9taWRkbGV3YXJlcycpLFxuICBQYXJzZSA9IHJlcXVpcmUoJ3BhcnNlL25vZGUnKS5QYXJzZSxcbiAgeyBwYXJzZSB9ID0gcmVxdWlyZSgnZ3JhcGhxbCcpLFxuICBwYXRoID0gcmVxdWlyZSgncGF0aCcpLFxuICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmltcG9ydCB7IFBhcnNlU2VydmVyT3B0aW9ucywgTGl2ZVF1ZXJ5U2VydmVyT3B0aW9ucyB9IGZyb20gJy4vT3B0aW9ucyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cyc7XG5pbXBvcnQgKiBhcyBsb2dnaW5nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IFByb21pc2VSb3V0ZXIgZnJvbSAnLi9Qcm9taXNlUm91dGVyJztcbmltcG9ydCByZXF1aXJlZFBhcmFtZXRlciBmcm9tICcuL3JlcXVpcmVkUGFyYW1ldGVyJztcbmltcG9ydCB7IEFuYWx5dGljc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9BbmFseXRpY3NSb3V0ZXInO1xuaW1wb3J0IHsgQ2xhc3Nlc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9DbGFzc2VzUm91dGVyJztcbmltcG9ydCB7IEZlYXR1cmVzUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL0ZlYXR1cmVzUm91dGVyJztcbmltcG9ydCB7IEZpbGVzUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL0ZpbGVzUm91dGVyJztcbmltcG9ydCB7IEZ1bmN0aW9uc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9GdW5jdGlvbnNSb3V0ZXInO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL0dsb2JhbENvbmZpZ1JvdXRlcic7XG5pbXBvcnQgeyBHcmFwaFFMUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL0dyYXBoUUxSb3V0ZXInO1xuaW1wb3J0IHsgSG9va3NSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvSG9va3NSb3V0ZXInO1xuaW1wb3J0IHsgSUFQVmFsaWRhdGlvblJvdXRlciB9IGZyb20gJy4vUm91dGVycy9JQVBWYWxpZGF0aW9uUm91dGVyJztcbmltcG9ydCB7IEluc3RhbGxhdGlvbnNSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvSW5zdGFsbGF0aW9uc1JvdXRlcic7XG5pbXBvcnQgeyBMb2dzUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL0xvZ3NSb3V0ZXInO1xuaW1wb3J0IHsgUGFyc2VMaXZlUXVlcnlTZXJ2ZXIgfSBmcm9tICcuL0xpdmVRdWVyeS9QYXJzZUxpdmVRdWVyeVNlcnZlcic7XG5pbXBvcnQgeyBQYWdlc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9QYWdlc1JvdXRlcic7XG5pbXBvcnQgeyBQdWJsaWNBUElSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvUHVibGljQVBJUm91dGVyJztcbmltcG9ydCB7IFB1c2hSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvUHVzaFJvdXRlcic7XG5pbXBvcnQgeyBDbG91ZENvZGVSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvQ2xvdWRDb2RlUm91dGVyJztcbmltcG9ydCB7IFJvbGVzUm91dGVyIH0gZnJvbSAnLi9Sb3V0ZXJzL1JvbGVzUm91dGVyJztcbmltcG9ydCB7IFNjaGVtYXNSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvU2NoZW1hc1JvdXRlcic7XG5pbXBvcnQgeyBTZXNzaW9uc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9TZXNzaW9uc1JvdXRlcic7XG5pbXBvcnQgeyBVc2Vyc1JvdXRlciB9IGZyb20gJy4vUm91dGVycy9Vc2Vyc1JvdXRlcic7XG5pbXBvcnQgeyBQdXJnZVJvdXRlciB9IGZyb20gJy4vUm91dGVycy9QdXJnZVJvdXRlcic7XG5pbXBvcnQgeyBBdWRpZW5jZXNSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvQXVkaWVuY2VzUm91dGVyJztcbmltcG9ydCB7IEFnZ3JlZ2F0ZVJvdXRlciB9IGZyb20gJy4vUm91dGVycy9BZ2dyZWdhdGVSb3V0ZXInO1xuaW1wb3J0IHsgUGFyc2VTZXJ2ZXJSRVNUQ29udHJvbGxlciB9IGZyb20gJy4vUGFyc2VTZXJ2ZXJSRVNUQ29udHJvbGxlcic7XG5pbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICcuL0NvbnRyb2xsZXJzJztcbmltcG9ydCB7IFBhcnNlR3JhcGhRTFNlcnZlciB9IGZyb20gJy4vR3JhcGhRTC9QYXJzZUdyYXBoUUxTZXJ2ZXInO1xuaW1wb3J0IHsgU2VjdXJpdHlSb3V0ZXIgfSBmcm9tICcuL1JvdXRlcnMvU2VjdXJpdHlSb3V0ZXInO1xuaW1wb3J0IENoZWNrUnVubmVyIGZyb20gJy4vU2VjdXJpdHkvQ2hlY2tSdW5uZXInO1xuaW1wb3J0IERlcHJlY2F0b3IgZnJvbSAnLi9EZXByZWNhdG9yL0RlcHJlY2F0b3InO1xuaW1wb3J0IHsgRGVmaW5lZFNjaGVtYXMgfSBmcm9tICcuL1NjaGVtYU1pZ3JhdGlvbnMvRGVmaW5lZFNjaGVtYXMnO1xuXG4vLyBNdXRhdGUgdGhlIFBhcnNlIG9iamVjdCB0byBhZGQgdGhlIENsb3VkIENvZGUgaGFuZGxlcnNcbmFkZFBhcnNlQ2xvdWQoKTtcblxuLy8gUGFyc2VTZXJ2ZXIgd29ya3MgbGlrZSBhIGNvbnN0cnVjdG9yIG9mIGFuIGV4cHJlc3MgYXBwLlxuLy8gaHR0cHM6Ly9wYXJzZXBsYXRmb3JtLm9yZy9wYXJzZS1zZXJ2ZXIvYXBpL21hc3Rlci9QYXJzZVNlcnZlck9wdGlvbnMuaHRtbFxuY2xhc3MgUGFyc2VTZXJ2ZXIge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7UGFyc2VTZXJ2ZXJPcHRpb25zfSBvcHRpb25zIHRoZSBwYXJzZSBzZXJ2ZXIgaW5pdGlhbGl6YXRpb24gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zKSB7XG4gICAgLy8gU2NhbiBmb3IgZGVwcmVjYXRlZCBQYXJzZSBTZXJ2ZXIgb3B0aW9uc1xuICAgIERlcHJlY2F0b3Iuc2NhblBhcnNlU2VydmVyT3B0aW9ucyhvcHRpb25zKTtcbiAgICAvLyBTZXQgb3B0aW9uIGRlZmF1bHRzXG4gICAgaW5qZWN0RGVmYXVsdHMob3B0aW9ucyk7XG4gICAgY29uc3Qge1xuICAgICAgYXBwSWQgPSByZXF1aXJlZFBhcmFtZXRlcignWW91IG11c3QgcHJvdmlkZSBhbiBhcHBJZCEnKSxcbiAgICAgIG1hc3RlcktleSA9IHJlcXVpcmVkUGFyYW1ldGVyKCdZb3UgbXVzdCBwcm92aWRlIGEgbWFzdGVyS2V5IScpLFxuICAgICAgY2xvdWQsXG4gICAgICBzZWN1cml0eSxcbiAgICAgIGphdmFzY3JpcHRLZXksXG4gICAgICBzZXJ2ZXJVUkwgPSByZXF1aXJlZFBhcmFtZXRlcignWW91IG11c3QgcHJvdmlkZSBhIHNlcnZlclVSTCEnKSxcbiAgICAgIHNlcnZlclN0YXJ0Q29tcGxldGUsXG4gICAgICBzY2hlbWEsXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgbm9kZSBjbGllbnQgU0RLIGF1dG9tYXRpY2FsbHlcbiAgICBQYXJzZS5pbml0aWFsaXplKGFwcElkLCBqYXZhc2NyaXB0S2V5IHx8ICd1bnVzZWQnLCBtYXN0ZXJLZXkpO1xuICAgIFBhcnNlLnNlcnZlclVSTCA9IHNlcnZlclVSTDtcblxuICAgIGNvbnN0IGFsbENvbnRyb2xsZXJzID0gY29udHJvbGxlcnMuZ2V0Q29udHJvbGxlcnMob3B0aW9ucyk7XG5cbiAgICBjb25zdCB7IGxvZ2dlckNvbnRyb2xsZXIsIGRhdGFiYXNlQ29udHJvbGxlciwgaG9va3NDb250cm9sbGVyIH0gPSBhbGxDb250cm9sbGVycztcbiAgICB0aGlzLmNvbmZpZyA9IENvbmZpZy5wdXQoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgYWxsQ29udHJvbGxlcnMpKTtcblxuICAgIGxvZ2dpbmcuc2V0TG9nZ2VyKGxvZ2dlckNvbnRyb2xsZXIpO1xuXG4gICAgLy8gTm90ZTogVGVzdHMgd2lsbCBzdGFydCB0byBmYWlsIGlmIGFueSB2YWxpZGF0aW9uIGhhcHBlbnMgYWZ0ZXIgdGhpcyBpcyBjYWxsZWQuXG4gICAgZGF0YWJhc2VDb250cm9sbGVyXG4gICAgICAucGVyZm9ybUluaXRpYWxpemF0aW9uKClcbiAgICAgIC50aGVuKCgpID0+IGhvb2tzQ29udHJvbGxlci5sb2FkKCkpXG4gICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWEpIHtcbiAgICAgICAgICBhd2FpdCBuZXcgRGVmaW5lZFNjaGVtYXMoc2NoZW1hLCB0aGlzLmNvbmZpZykuZXhlY3V0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2ZXJTdGFydENvbXBsZXRlKSB7XG4gICAgICAgICAgc2VydmVyU3RhcnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKHNlcnZlclN0YXJ0Q29tcGxldGUpIHtcbiAgICAgICAgICBzZXJ2ZXJTdGFydENvbXBsZXRlKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgaWYgKGNsb3VkKSB7XG4gICAgICBhZGRQYXJzZUNsb3VkKCk7XG4gICAgICBpZiAodHlwZW9mIGNsb3VkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNsb3VkKFBhcnNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNsb3VkID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXF1aXJlKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjbG91ZCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgXCJhcmd1bWVudCAnY2xvdWQnIG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9yIGEgZnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VjdXJpdHkgJiYgc2VjdXJpdHkuZW5hYmxlQ2hlY2sgJiYgc2VjdXJpdHkuZW5hYmxlQ2hlY2tMb2cpIHtcbiAgICAgIG5ldyBDaGVja1J1bm5lcihvcHRpb25zLnNlY3VyaXR5KS5ydW4oKTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXBwKCkge1xuICAgIGlmICghdGhpcy5fYXBwKSB7XG4gICAgICB0aGlzLl9hcHAgPSBQYXJzZVNlcnZlci5hcHAodGhpcy5jb25maWcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXBwO1xuICB9XG5cbiAgaGFuZGxlU2h1dGRvd24oKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBjb25zdCB7IGFkYXB0ZXI6IGRhdGFiYXNlQWRhcHRlciB9ID0gdGhpcy5jb25maWcuZGF0YWJhc2VDb250cm9sbGVyO1xuICAgIGlmIChkYXRhYmFzZUFkYXB0ZXIgJiYgdHlwZW9mIGRhdGFiYXNlQWRhcHRlci5oYW5kbGVTaHV0ZG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvbWlzZXMucHVzaChkYXRhYmFzZUFkYXB0ZXIuaGFuZGxlU2h1dGRvd24oKSk7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlcjogZmlsZUFkYXB0ZXIgfSA9IHRoaXMuY29uZmlnLmZpbGVzQ29udHJvbGxlcjtcbiAgICBpZiAoZmlsZUFkYXB0ZXIgJiYgdHlwZW9mIGZpbGVBZGFwdGVyLmhhbmRsZVNodXRkb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKGZpbGVBZGFwdGVyLmhhbmRsZVNodXRkb3duKCkpO1xuICAgIH1cbiAgICBjb25zdCB7IGFkYXB0ZXI6IGNhY2hlQWRhcHRlciB9ID0gdGhpcy5jb25maWcuY2FjaGVDb250cm9sbGVyO1xuICAgIGlmIChjYWNoZUFkYXB0ZXIgJiYgdHlwZW9mIGNhY2hlQWRhcHRlci5oYW5kbGVTaHV0ZG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvbWlzZXMucHVzaChjYWNoZUFkYXB0ZXIuaGFuZGxlU2h1dGRvd24oKSk7XG4gICAgfVxuICAgIHJldHVybiAocHJvbWlzZXMubGVuZ3RoID4gMCA/IFByb21pc2UuYWxsKHByb21pc2VzKSA6IFByb21pc2UucmVzb2x2ZSgpKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZXJ2ZXJDbG9zZUNvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnNlcnZlckNsb3NlQ29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3RhdGljXG4gICAqIENyZWF0ZSBhbiBleHByZXNzIGFwcCBmb3IgdGhlIHBhcnNlIHNlcnZlclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBsZXQgeW91IHNwZWNpZnkgdGhlIG1heFVwbG9hZFNpemUgd2hlbiBjcmVhdGluZyB0aGUgZXhwcmVzcyBhcHAgICovXG4gIHN0YXRpYyBhcHAob3B0aW9ucykge1xuICAgIGNvbnN0IHsgbWF4VXBsb2FkU2l6ZSA9ICcyMG1iJywgYXBwSWQsIGRpcmVjdEFjY2VzcywgcGFnZXMgfSA9IG9wdGlvbnM7XG4gICAgLy8gVGhpcyBhcHAgc2VydmVzIHRoZSBQYXJzZSBBUEkgZGlyZWN0bHkuXG4gICAgLy8gSXQncyB0aGUgZXF1aXZhbGVudCBvZiBodHRwczovL2FwaS5wYXJzZS5jb20vMSBpbiB0aGUgaG9zdGVkIFBhcnNlIEFQSS5cbiAgICB2YXIgYXBpID0gZXhwcmVzcygpO1xuICAgIC8vYXBpLnVzZShcIi9hcHBzXCIsIGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArIFwiL3B1YmxpY1wiKSk7XG4gICAgYXBpLnVzZShtaWRkbGV3YXJlcy5hbGxvd0Nyb3NzRG9tYWluKGFwcElkKSk7XG4gICAgLy8gRmlsZSBoYW5kbGluZyBuZWVkcyB0byBiZSBiZWZvcmUgZGVmYXVsdCBtaWRkbGV3YXJlcyBhcmUgYXBwbGllZFxuICAgIGFwaS51c2UoXG4gICAgICAnLycsXG4gICAgICBuZXcgRmlsZXNSb3V0ZXIoKS5leHByZXNzUm91dGVyKHtcbiAgICAgICAgbWF4VXBsb2FkU2l6ZTogbWF4VXBsb2FkU2l6ZSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGFwaS51c2UoJy9oZWFsdGgnLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgc3RhdHVzOiAnb2snLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhcGkudXNlKFxuICAgICAgJy8nLFxuICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pLFxuICAgICAgcGFnZXMuZW5hYmxlUm91dGVyXG4gICAgICAgID8gbmV3IFBhZ2VzUm91dGVyKHBhZ2VzKS5leHByZXNzUm91dGVyKClcbiAgICAgICAgOiBuZXcgUHVibGljQVBJUm91dGVyKCkuZXhwcmVzc1JvdXRlcigpXG4gICAgKTtcblxuICAgIGFwaS51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogJyovKicsIGxpbWl0OiBtYXhVcGxvYWRTaXplIH0pKTtcbiAgICBhcGkudXNlKG1pZGRsZXdhcmVzLmFsbG93TWV0aG9kT3ZlcnJpZGUpO1xuICAgIGFwaS51c2UobWlkZGxld2FyZXMuaGFuZGxlUGFyc2VIZWFkZXJzKTtcblxuICAgIGNvbnN0IGFwcFJvdXRlciA9IFBhcnNlU2VydmVyLnByb21pc2VSb3V0ZXIoeyBhcHBJZCB9KTtcbiAgICBhcGkudXNlKGFwcFJvdXRlci5leHByZXNzUm91dGVyKCkpO1xuXG4gICAgYXBpLnVzZShtaWRkbGV3YXJlcy5oYW5kbGVQYXJzZUVycm9ycyk7XG5cbiAgICAvLyBydW4gdGhlIGZvbGxvd2luZyB3aGVuIG5vdCB0ZXN0aW5nXG4gICAgaWYgKCFwcm9jZXNzLmVudi5URVNUSU5HKSB7XG4gICAgICAvL1RoaXMgY2F1c2VzIHRlc3RzIHRvIHNwZXcgc29tZSB1c2VsZXNzIHdhcm5pbmdzLCBzbyBkaXNhYmxlIGluIHRlc3RcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBwcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VBRERSSU5VU0UnKSB7XG4gICAgICAgICAgLy8gdXNlci1mcmllbmRseSBtZXNzYWdlIGZvciB0aGlzIGNvbW1vbiBlcnJvclxuICAgICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBVbmFibGUgdG8gbGlzdGVuIG9uIHBvcnQgJHtlcnIucG9ydH0uIFRoZSBwb3J0IGlzIGFscmVhZHkgaW4gdXNlLmApO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gdmVyaWZ5IHRoZSBzZXJ2ZXIgdXJsIGFmdGVyIGEgJ21vdW50JyBldmVudCBpcyByZWNlaXZlZFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGFwaS5vbignbW91bnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhcnNlU2VydmVyLnZlcmlmeVNlcnZlclVybCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5QQVJTRV9TRVJWRVJfRU5BQkxFX0VYUEVSSU1FTlRBTF9ESVJFQ1RfQUNDRVNTID09PSAnMScgfHwgZGlyZWN0QWNjZXNzKSB7XG4gICAgICBQYXJzZS5Db3JlTWFuYWdlci5zZXRSRVNUQ29udHJvbGxlcihQYXJzZVNlcnZlclJFU1RDb250cm9sbGVyKGFwcElkLCBhcHBSb3V0ZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9taXNlUm91dGVyKHsgYXBwSWQgfSkge1xuICAgIGNvbnN0IHJvdXRlcnMgPSBbXG4gICAgICBuZXcgQ2xhc3Nlc1JvdXRlcigpLFxuICAgICAgbmV3IFVzZXJzUm91dGVyKCksXG4gICAgICBuZXcgU2Vzc2lvbnNSb3V0ZXIoKSxcbiAgICAgIG5ldyBSb2xlc1JvdXRlcigpLFxuICAgICAgbmV3IEFuYWx5dGljc1JvdXRlcigpLFxuICAgICAgbmV3IEluc3RhbGxhdGlvbnNSb3V0ZXIoKSxcbiAgICAgIG5ldyBGdW5jdGlvbnNSb3V0ZXIoKSxcbiAgICAgIG5ldyBTY2hlbWFzUm91dGVyKCksXG4gICAgICBuZXcgUHVzaFJvdXRlcigpLFxuICAgICAgbmV3IExvZ3NSb3V0ZXIoKSxcbiAgICAgIG5ldyBJQVBWYWxpZGF0aW9uUm91dGVyKCksXG4gICAgICBuZXcgRmVhdHVyZXNSb3V0ZXIoKSxcbiAgICAgIG5ldyBHbG9iYWxDb25maWdSb3V0ZXIoKSxcbiAgICAgIG5ldyBHcmFwaFFMUm91dGVyKCksXG4gICAgICBuZXcgUHVyZ2VSb3V0ZXIoKSxcbiAgICAgIG5ldyBIb29rc1JvdXRlcigpLFxuICAgICAgbmV3IENsb3VkQ29kZVJvdXRlcigpLFxuICAgICAgbmV3IEF1ZGllbmNlc1JvdXRlcigpLFxuICAgICAgbmV3IEFnZ3JlZ2F0ZVJvdXRlcigpLFxuICAgICAgbmV3IFNlY3VyaXR5Um91dGVyKCksXG4gICAgXTtcblxuICAgIGNvbnN0IHJvdXRlcyA9IHJvdXRlcnMucmVkdWNlKChtZW1vLCByb3V0ZXIpID0+IHtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChyb3V0ZXIucm91dGVzKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBhcHBSb3V0ZXIgPSBuZXcgUHJvbWlzZVJvdXRlcihyb3V0ZXMsIGFwcElkKTtcblxuICAgIGJhdGNoLm1vdW50T250byhhcHBSb3V0ZXIpO1xuICAgIHJldHVybiBhcHBSb3V0ZXI7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnRzIHRoZSBwYXJzZSBzZXJ2ZXIncyBleHByZXNzIGFwcFxuICAgKiBAcGFyYW0ge1BhcnNlU2VydmVyT3B0aW9uc30gb3B0aW9ucyB0byB1c2UgdG8gc3RhcnQgdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgc2VydmVyIGhhcyBzdGFydGVkXG4gICAqIEByZXR1cm5zIHtQYXJzZVNlcnZlcn0gdGhlIHBhcnNlIHNlcnZlciBpbnN0YW5jZVxuICAgKi9cbiAgc3RhcnQob3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zLCBjYWxsYmFjazogPygpID0+IHZvaWQpIHtcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgaWYgKG9wdGlvbnMubWlkZGxld2FyZSkge1xuICAgICAgbGV0IG1pZGRsZXdhcmU7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWlkZGxld2FyZSA9PSAnc3RyaW5nJykge1xuICAgICAgICBtaWRkbGV3YXJlID0gcmVxdWlyZShwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgb3B0aW9ucy5taWRkbGV3YXJlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaWRkbGV3YXJlID0gb3B0aW9ucy5taWRkbGV3YXJlOyAvLyB1c2UgYXMtaXMgbGV0IGV4cHJlc3MgZmFpbFxuICAgICAgfVxuICAgICAgYXBwLnVzZShtaWRkbGV3YXJlKTtcbiAgICB9XG5cbiAgICBhcHAudXNlKG9wdGlvbnMubW91bnRQYXRoLCB0aGlzLmFwcCk7XG5cbiAgICBpZiAob3B0aW9ucy5tb3VudEdyYXBoUUwgPT09IHRydWUgfHwgb3B0aW9ucy5tb3VudFBsYXlncm91bmQgPT09IHRydWUpIHtcbiAgICAgIGxldCBncmFwaFFMQ3VzdG9tVHlwZURlZnMgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JhcGhRTFNjaGVtYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZ3JhcGhRTEN1c3RvbVR5cGVEZWZzID0gcGFyc2UoZnMucmVhZEZpbGVTeW5jKG9wdGlvbnMuZ3JhcGhRTFNjaGVtYSwgJ3V0ZjgnKSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5ncmFwaFFMU2NoZW1hID09PSAnb2JqZWN0JyB8fFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5ncmFwaFFMU2NoZW1hID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgZ3JhcGhRTEN1c3RvbVR5cGVEZWZzID0gb3B0aW9ucy5ncmFwaFFMU2NoZW1hO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZUdyYXBoUUxTZXJ2ZXIgPSBuZXcgUGFyc2VHcmFwaFFMU2VydmVyKHRoaXMsIHtcbiAgICAgICAgZ3JhcGhRTFBhdGg6IG9wdGlvbnMuZ3JhcGhRTFBhdGgsXG4gICAgICAgIHBsYXlncm91bmRQYXRoOiBvcHRpb25zLnBsYXlncm91bmRQYXRoLFxuICAgICAgICBncmFwaFFMQ3VzdG9tVHlwZURlZnMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdGlvbnMubW91bnRHcmFwaFFMKSB7XG4gICAgICAgIHBhcnNlR3JhcGhRTFNlcnZlci5hcHBseUdyYXBoUUwoYXBwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubW91bnRQbGF5Z3JvdW5kKSB7XG4gICAgICAgIHBhcnNlR3JhcGhRTFNlcnZlci5hcHBseVBsYXlncm91bmQoYXBwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKG9wdGlvbnMucG9ydCwgb3B0aW9ucy5ob3N0LCBjYWxsYmFjayk7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICBpZiAob3B0aW9ucy5zdGFydExpdmVRdWVyeVNlcnZlciB8fCBvcHRpb25zLmxpdmVRdWVyeVNlcnZlck9wdGlvbnMpIHtcbiAgICAgIHRoaXMubGl2ZVF1ZXJ5U2VydmVyID0gUGFyc2VTZXJ2ZXIuY3JlYXRlTGl2ZVF1ZXJ5U2VydmVyKFxuICAgICAgICBzZXJ2ZXIsXG4gICAgICAgIG9wdGlvbnMubGl2ZVF1ZXJ5U2VydmVyT3B0aW9ucyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoIXByb2Nlc3MuZW52LlRFU1RJTkcpIHtcbiAgICAgIGNvbmZpZ3VyZUxpc3RlbmVycyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5leHByZXNzQXBwID0gYXBwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgUGFyc2VTZXJ2ZXIgYW5kIHN0YXJ0cyBpdC5cbiAgICogQHBhcmFtIHtQYXJzZVNlcnZlck9wdGlvbnN9IG9wdGlvbnMgdXNlZCB0byBzdGFydCB0aGUgc2VydmVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgaGFzIHN0YXJ0ZWRcbiAgICogQHJldHVybnMge1BhcnNlU2VydmVyfSB0aGUgcGFyc2Ugc2VydmVyIGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgc3RhcnQob3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zLCBjYWxsYmFjazogPygpID0+IHZvaWQpIHtcbiAgICBjb25zdCBwYXJzZVNlcnZlciA9IG5ldyBQYXJzZVNlcnZlcihvcHRpb25zKTtcbiAgICByZXR1cm4gcGFyc2VTZXJ2ZXIuc3RhcnQob3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gY3JlYXRlIGEgbGl2ZVF1ZXJ5IHNlcnZlclxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7U2VydmVyfSBodHRwU2VydmVyIGFuIG9wdGlvbmFsIGh0dHAgc2VydmVyIHRvIHBhc3NcbiAgICogQHBhcmFtIHtMaXZlUXVlcnlTZXJ2ZXJPcHRpb25zfSBjb25maWcgb3B0aW9ucyBmb3IgdGhlIGxpdmVRdWVyeVNlcnZlclxuICAgKiBAcGFyYW0ge1BhcnNlU2VydmVyT3B0aW9uc30gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgUGFyc2VTZXJ2ZXJcbiAgICogQHJldHVybnMge1BhcnNlTGl2ZVF1ZXJ5U2VydmVyfSB0aGUgbGl2ZSBxdWVyeSBzZXJ2ZXIgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVMaXZlUXVlcnlTZXJ2ZXIoXG4gICAgaHR0cFNlcnZlcixcbiAgICBjb25maWc6IExpdmVRdWVyeVNlcnZlck9wdGlvbnMsXG4gICAgb3B0aW9uczogUGFyc2VTZXJ2ZXJPcHRpb25zXG4gICkge1xuICAgIGlmICghaHR0cFNlcnZlciB8fCAoY29uZmlnICYmIGNvbmZpZy5wb3J0KSkge1xuICAgICAgdmFyIGFwcCA9IGV4cHJlc3MoKTtcbiAgICAgIGh0dHBTZXJ2ZXIgPSByZXF1aXJlKCdodHRwJykuY3JlYXRlU2VydmVyKGFwcCk7XG4gICAgICBodHRwU2VydmVyLmxpc3Rlbihjb25maWcucG9ydCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUGFyc2VMaXZlUXVlcnlTZXJ2ZXIoaHR0cFNlcnZlciwgY29uZmlnLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyB2ZXJpZnlTZXJ2ZXJVcmwoY2FsbGJhY2spIHtcbiAgICAvLyBwZXJmb3JtIGEgaGVhbHRoIGNoZWNrIG9uIHRoZSBzZXJ2ZXJVUkwgdmFsdWVcbiAgICBpZiAoUGFyc2Uuc2VydmVyVVJMKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0Jyk7XG4gICAgICByZXF1ZXN0KHsgdXJsOiBQYXJzZS5zZXJ2ZXJVUkwucmVwbGFjZSgvXFwvJC8sICcnKSArICcvaGVhbHRoJyB9KVxuICAgICAgICAuY2F0Y2gocmVzcG9uc2UgPT4gcmVzcG9uc2UpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zdCBqc29uID0gcmVzcG9uc2UuZGF0YSB8fCBudWxsO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCB8fCAhanNvbiB8fCAoanNvbiAmJiBqc29uLnN0YXR1cyAhPT0gJ29rJykpIHtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFxcbldBUk5JTkcsIFVuYWJsZSB0byBjb25uZWN0IHRvICcke1BhcnNlLnNlcnZlclVSTH0nLmAgK1xuICAgICAgICAgICAgICAgIGAgQ2xvdWQgY29kZSBhbmQgcHVzaCBub3RpZmljYXRpb25zIG1heSBiZSB1bmF2YWlsYWJsZSFcXG5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUGFyc2VDbG91ZCgpIHtcbiAgY29uc3QgUGFyc2VDbG91ZCA9IHJlcXVpcmUoJy4vY2xvdWQtY29kZS9QYXJzZS5DbG91ZCcpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGFyc2UsICdTZXJ2ZXInLCB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbmZpZy5nZXQoUGFyc2UuYXBwbGljYXRpb25JZCk7XG4gICAgfSxcbiAgICBzZXQobmV3VmFsKSB7XG4gICAgICBuZXdWYWwuYXBwSWQgPSBQYXJzZS5hcHBsaWNhdGlvbklkO1xuICAgICAgQ29uZmlnLnB1dChuZXdWYWwpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9KTtcbiAgT2JqZWN0LmFzc2lnbihQYXJzZS5DbG91ZCwgUGFyc2VDbG91ZCk7XG4gIGdsb2JhbC5QYXJzZSA9IFBhcnNlO1xufVxuXG5mdW5jdGlvbiBpbmplY3REZWZhdWx0cyhvcHRpb25zOiBQYXJzZVNlcnZlck9wdGlvbnMpIHtcbiAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBrZXkpKSB7XG4gICAgICBvcHRpb25zW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgJ3NlcnZlclVSTCcpKSB7XG4gICAgb3B0aW9ucy5zZXJ2ZXJVUkwgPSBgaHR0cDovL2xvY2FsaG9zdDoke29wdGlvbnMucG9ydH0ke29wdGlvbnMubW91bnRQYXRofWA7XG4gIH1cblxuICAvLyBSZXNlcnZlZCBDaGFyYWN0ZXJzXG4gIGlmIChvcHRpb25zLmFwcElkKSB7XG4gICAgY29uc3QgcmVnZXggPSAvWyEjJCUnKCkqKyYvOjs9P0BbXFxde31eLHw8Pl0vZztcbiAgICBpZiAob3B0aW9ucy5hcHBJZC5tYXRjaChyZWdleCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFxcbldBUk5JTkcsIGFwcElkIHRoYXQgY29udGFpbnMgc3BlY2lhbCBjaGFyYWN0ZXJzIGNhbiBjYXVzZSBpc3N1ZXMgd2hpbGUgdXNpbmcgd2l0aCB1cmxzLlxcbmBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgaWYgKG9wdGlvbnMudXNlclNlbnNpdGl2ZUZpZWxkcykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAhcHJvY2Vzcy5lbnYuVEVTVElORyAmJlxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgXFxuREVQUkVDQVRFRDogdXNlclNlbnNpdGl2ZUZpZWxkcyBoYXMgYmVlbiByZXBsYWNlZCBieSBwcm90ZWN0ZWRGaWVsZHMgYWxsb3dpbmcgdGhlIGFiaWxpdHkgdG8gcHJvdGVjdCBmaWVsZHMgaW4gYWxsIGNsYXNzZXMgd2l0aCBDTFAuIFxcbmBcbiAgICAgICk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbiAgICBjb25zdCB1c2VyU2Vuc2l0aXZlRmllbGRzID0gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBTZXQoWy4uLihkZWZhdWx0cy51c2VyU2Vuc2l0aXZlRmllbGRzIHx8IFtdKSwgLi4uKG9wdGlvbnMudXNlclNlbnNpdGl2ZUZpZWxkcyB8fCBbXSldKVxuICAgICk7XG5cbiAgICAvLyBJZiB0aGUgb3B0aW9ucy5wcm90ZWN0ZWRGaWVsZHMgaXMgdW5zZXQsXG4gICAgLy8gaXQnbGwgYmUgYXNzaWduZWQgdGhlIGRlZmF1bHQgYWJvdmUuXG4gICAgLy8gSGVyZSwgcHJvdGVjdCBhZ2FpbnN0IHRoZSBjYXNlIHdoZXJlIHByb3RlY3RlZEZpZWxkc1xuICAgIC8vIGlzIHNldCwgYnV0IGRvZXNuJ3QgaGF2ZSBfVXNlci5cbiAgICBpZiAoISgnX1VzZXInIGluIG9wdGlvbnMucHJvdGVjdGVkRmllbGRzKSkge1xuICAgICAgb3B0aW9ucy5wcm90ZWN0ZWRGaWVsZHMgPSBPYmplY3QuYXNzaWduKHsgX1VzZXI6IFtdIH0sIG9wdGlvbnMucHJvdGVjdGVkRmllbGRzKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLnByb3RlY3RlZEZpZWxkc1snX1VzZXInXVsnKiddID0gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBTZXQoWy4uLihvcHRpb25zLnByb3RlY3RlZEZpZWxkc1snX1VzZXInXVsnKiddIHx8IFtdKSwgLi4udXNlclNlbnNpdGl2ZUZpZWxkc10pXG4gICAgKTtcbiAgfVxuXG4gIC8vIE1lcmdlIHByb3RlY3RlZEZpZWxkcyBvcHRpb25zIHdpdGggZGVmYXVsdHMuXG4gIE9iamVjdC5rZXlzKGRlZmF1bHRzLnByb3RlY3RlZEZpZWxkcykuZm9yRWFjaChjID0+IHtcbiAgICBjb25zdCBjdXIgPSBvcHRpb25zLnByb3RlY3RlZEZpZWxkc1tjXTtcbiAgICBpZiAoIWN1cikge1xuICAgICAgb3B0aW9ucy5wcm90ZWN0ZWRGaWVsZHNbY10gPSBkZWZhdWx0cy5wcm90ZWN0ZWRGaWVsZHNbY107XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzLnByb3RlY3RlZEZpZWxkc1tjXSkuZm9yRWFjaChyID0+IHtcbiAgICAgICAgY29uc3QgdW5xID0gbmV3IFNldChbXG4gICAgICAgICAgLi4uKG9wdGlvbnMucHJvdGVjdGVkRmllbGRzW2NdW3JdIHx8IFtdKSxcbiAgICAgICAgICAuLi5kZWZhdWx0cy5wcm90ZWN0ZWRGaWVsZHNbY11bcl0sXG4gICAgICAgIF0pO1xuICAgICAgICBvcHRpb25zLnByb3RlY3RlZEZpZWxkc1tjXVtyXSA9IEFycmF5LmZyb20odW5xKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgb3B0aW9ucy5tYXN0ZXJLZXlJcHMgPSBBcnJheS5mcm9tKFxuICAgIG5ldyBTZXQob3B0aW9ucy5tYXN0ZXJLZXlJcHMuY29uY2F0KGRlZmF1bHRzLm1hc3RlcktleUlwcywgb3B0aW9ucy5tYXN0ZXJLZXlJcHMpKVxuICApO1xufVxuXG4vLyBUaG9zZSBjYW4ndCBiZSB0ZXN0ZWQgYXMgaXQgcmVxdWlyZXMgYSBzdWJwcm9jZXNzXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gY29uZmlndXJlTGlzdGVuZXJzKHBhcnNlU2VydmVyKSB7XG4gIGNvbnN0IHNlcnZlciA9IHBhcnNlU2VydmVyLnNlcnZlcjtcbiAgY29uc3Qgc29ja2V0cyA9IHt9O1xuICAvKiBDdXJyZW50bHksIGV4cHJlc3MgZG9lc24ndCBzaHV0IGRvd24gaW1tZWRpYXRlbHkgYWZ0ZXIgcmVjZWl2aW5nIFNJR0lOVC9TSUdURVJNIGlmIGl0IGhhcyBjbGllbnQgY29ubmVjdGlvbnMgdGhhdCBoYXZlbid0IHRpbWVkIG91dC4gKFRoaXMgaXMgYSBrbm93biBpc3N1ZSB3aXRoIG5vZGUgLSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzI2NDIpXG4gICAgVGhpcyBmdW5jdGlvbiwgYWxvbmcgd2l0aCBgZGVzdHJveUFsaXZlQ29ubmVjdGlvbnMoKWAsIGludGVuZCB0byBmaXggdGhpcyBiZWhhdmlvciBzdWNoIHRoYXQgcGFyc2Ugc2VydmVyIHdpbGwgY2xvc2UgYWxsIG9wZW4gY29ubmVjdGlvbnMgYW5kIGluaXRpYXRlIHRoZSBzaHV0ZG93biBwcm9jZXNzIGFzIHNvb24gYXMgaXQgcmVjZWl2ZXMgYSBTSUdJTlQvU0lHVEVSTSBzaWduYWwuICovXG4gIHNlcnZlci5vbignY29ubmVjdGlvbicsIHNvY2tldCA9PiB7XG4gICAgY29uc3Qgc29ja2V0SWQgPSBzb2NrZXQucmVtb3RlQWRkcmVzcyArICc6JyArIHNvY2tldC5yZW1vdGVQb3J0O1xuICAgIHNvY2tldHNbc29ja2V0SWRdID0gc29ja2V0O1xuICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICBkZWxldGUgc29ja2V0c1tzb2NrZXRJZF07XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IGRlc3Ryb3lBbGl2ZUNvbm5lY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAoY29uc3Qgc29ja2V0SWQgaW4gc29ja2V0cykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc29ja2V0c1tzb2NrZXRJZF0uZGVzdHJveSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiAqL1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTaHV0ZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnVGVybWluYXRpb24gc2lnbmFsIHJlY2VpdmVkLiBTaHV0dGluZyBkb3duLicpO1xuICAgIGRlc3Ryb3lBbGl2ZUNvbm5lY3Rpb25zKCk7XG4gICAgc2VydmVyLmNsb3NlKCk7XG4gICAgcGFyc2VTZXJ2ZXIuaGFuZGxlU2h1dGRvd24oKTtcbiAgfTtcbiAgcHJvY2Vzcy5vbignU0lHVEVSTScsIGhhbmRsZVNodXRkb3duKTtcbiAgcHJvY2Vzcy5vbignU0lHSU5UJywgaGFuZGxlU2h1dGRvd24pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZVNlcnZlcjtcbiJdfQ==