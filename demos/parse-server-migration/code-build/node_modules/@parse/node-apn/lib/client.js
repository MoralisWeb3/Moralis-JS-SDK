const VError = require('verror');
const tls = require('tls');
const extend = require('./util/extend');
const createProxySocket = require('./util/proxy');

module.exports = function (dependencies) {
  // Used for routine logs such as HTTP status codes, etc.
  const defaultLogger = dependencies.logger;
  // Used for unexpected events that should be rare under normal circumstances,
  // e.g. connection errors.
  const defaultErrorLogger = dependencies.errorLogger || defaultLogger;
  const { config, http2 } = dependencies;

  const {
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_SCHEME,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_AUTHORITY,
    HTTP2_HEADER_PATH,
    HTTP2_METHOD_POST,
    NGHTTP2_CANCEL,
  } = http2.constants;

  const TIMEOUT_STATUS = '(timeout)';
  const ABORTED_STATUS = '(aborted)';
  const ERROR_STATUS = '(error)';

  function Client(options) {
    this.config = config(options);
    this.logger = defaultLogger;
    this.errorLogger = defaultErrorLogger;
    this.healthCheckInterval = setInterval(() => {
      if (this.session && !this.session.closed && !this.session.destroyed && !this.isDestroyed) {
        this.session.ping((error, duration) => {
          if (error) {
            this.errorLogger(
              'No Ping response after ' + duration + ' ms with error:' + error.message
            );
            return;
          }
          this.logger('Ping response after ' + duration + ' ms');
        });
      }
    }, this.config.heartBeat).unref();
  }

  // Session should be passed except when destroying the client
  Client.prototype.destroySession = function (session, callback) {
    if (!session) {
      session = this.session;
    }
    if (session) {
      if (this.session === session) {
        this.session = null;
      }
      if (!session.destroyed) {
        session.destroy();
      }
    }
    if (callback) {
      callback();
    }
  };

  // Session should be passed except when destroying the client
  Client.prototype.closeAndDestroySession = function (session, callback) {
    if (!session) {
      session = this.session;
    }
    if (session) {
      if (this.session === session) {
        this.session = null;
      }
      if (!session.closed) {
        session.close(() => this.destroySession(session, callback));
      } else {
        this.destroySession(session, callback);
      }
    } else if (callback) {
      callback();
    }
  };

  Client.prototype.write = function write(notification, device, count) {
    if (this.isDestroyed) {
      return Promise.resolve({ device, error: new VError('client is destroyed') });
    }

    // Connect session
    if (!this.session || this.session.closed || this.session.destroyed) {
      return this.connect().then(() => this.request(notification, device, count));
    }
    return this.request(notification, device, count);
  };

  Client.prototype.connect = function connect() {
    if (this.sessionPromise) return this.sessionPromise;

    const proxySocketPromise = this.config.proxy
      ? createProxySocket(this.config.proxy, {
          host: this.config.address,
          port: this.config.port,
        })
      : Promise.resolve();

    this.sessionPromise = proxySocketPromise.then(socket => {
      this.sessionPromise = null;
      if (socket) {
        this.config.createConnection = authority =>
          authority.protocol === 'http:'
            ? socket
            : authority.protocol === 'https:'
            ? tls.connect(+authority.port || 443, authority.hostname, {
                socket,
                servername: authority.hostname,
                ALPNProtocols: ['h2'],
              })
            : null;
      }

      const session = (this.session = http2.connect(
        this._mockOverrideUrl || `https://${this.config.address}`,
        this.config
      ));

      this.session.on('close', () => {
        if (this.errorLogger.enabled) {
          this.errorLogger('Session closed');
        }
        this.destroySession(session);
      });

      this.session.on('socketError', error => {
        if (this.errorLogger.enabled) {
          this.errorLogger(`Socket error: ${error}`);
        }
        this.closeAndDestroySession(session);
      });

      this.session.on('error', error => {
        if (this.errorLogger.enabled) {
          this.errorLogger(`Session error: ${error}`);
        }
        this.closeAndDestroySession(session);
      });

      this.session.on('goaway', (errorCode, lastStreamId, opaqueData) => {
        if (this.errorLogger.enabled) {
          this.errorLogger(
            `GOAWAY received: (errorCode ${errorCode}, lastStreamId: ${lastStreamId}, opaqueData: ${opaqueData})`
          );
        }
        this.closeAndDestroySession(session);
      });

      if (this.logger.enabled) {
        this.session.on('connect', () => {
          this.logger('Session connected');
        });
      }
      this.session.on('frameError', (frameType, errorCode, streamId) => {
        // This is a frame error not associate with any request(stream).
        if (this.errorLogger.enabled) {
          this.errorLogger(
            `Frame error: (frameType: ${frameType}, errorCode ${errorCode}, streamId: ${streamId})`
          );
        }
        this.closeAndDestroySession(session);
      });
    });

    return this.sessionPromise;
  };

  Client.prototype.request = function request(notification, device, count) {
    let tokenGeneration = null;
    let status = null;
    let responseData = '';
    const retryCount = count || 0;

    const headers = extend(
      {
        [HTTP2_HEADER_SCHEME]: 'https',
        [HTTP2_HEADER_METHOD]: HTTP2_METHOD_POST,
        [HTTP2_HEADER_AUTHORITY]: this.config.address,
        [HTTP2_HEADER_PATH]: `/3/device/${device}`,
      },
      notification.headers
    );

    if (this.config.token) {
      if (this.config.token.isExpired(3300)) {
        this.config.token.regenerate(this.config.token.generation);
      }
      headers.authorization = `bearer ${this.config.token.current}`;
      tokenGeneration = this.config.token.generation;
    }

    const request = this.session.request(headers);

    request.setEncoding('utf8');

    request.on('response', headers => {
      status = headers[HTTP2_HEADER_STATUS];
    });

    request.on('data', data => {
      responseData += data;
    });

    request.write(notification.body);

    return new Promise(resolve => {
      request.on('end', () => {
        try {
          if (this.logger.enabled) {
            this.logger(`Request ended with status ${status} and responseData: ${responseData}`);
          }

          if (status === 200) {
            resolve({ device });
          } else if ([TIMEOUT_STATUS, ABORTED_STATUS, ERROR_STATUS].includes(status)) {
            return;
          } else if (responseData !== '') {
            const response = JSON.parse(responseData);

            if (status === 403 && response.reason === 'ExpiredProviderToken' && retryCount < 2) {
              this.config.token.regenerate(tokenGeneration);
              resolve(this.write(notification, device, retryCount + 1));
              return;
            } else if (status === 500 && response.reason === 'InternalServerError') {
              this.closeAndDestroySession();
              const error = new VError('Error 500, stream ended unexpectedly');
              resolve({ device, error });
              return;
            }

            resolve({ device, status, response });
          } else {
            this.closeAndDestroySession();
            const error = new VError(
              `stream ended unexpectedly with status ${status} and empty body`
            );
            resolve({ device, error });
          }
        } catch (e) {
          const error = new VError(e, 'Unexpected error processing APNs response');
          if (this.errorLogger.enabled) {
            this.errorLogger(`Unexpected error processing APNs response: ${e.message}`);
          }
          resolve({ device, error });
        }
      });

      request.setTimeout(this.config.requestTimeout, () => {
        if (this.errorLogger.enabled) {
          this.errorLogger('Request timeout');
        }

        status = TIMEOUT_STATUS;

        request.close(NGHTTP2_CANCEL);

        resolve({ device, error: new VError('apn write timeout') });
      });

      request.on('aborted', () => {
        if (this.errorLogger.enabled) {
          this.errorLogger('Request aborted');
        }

        status = ABORTED_STATUS;

        resolve({ device, error: new VError('apn write aborted') });
      });

      request.on('error', error => {
        if (this.errorLogger.enabled) {
          this.errorLogger(`Request error: ${error}`);
        }

        status = ERROR_STATUS;

        if (typeof error === 'string') {
          error = new VError('apn write failed: %s', error);
        } else {
          error = new VError(error, 'apn write failed');
        }

        resolve({ device, error });
      });

      if (this.errorLogger.enabled) {
        request.on('frameError', (frameType, errorCode, streamId) => {
          this.errorLogger(
            `Request frame error: (frameType: ${frameType}, errorCode ${errorCode}, streamId: ${streamId})`
          );
        });
      }

      request.end();
    });
  };

  Client.prototype.shutdown = function shutdown(callback) {
    if (this.isDestroyed) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this.errorLogger.enabled) {
      this.errorLogger('Called client.shutdown()');
    }
    this.isDestroyed = true;
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    this.closeAndDestroySession(undefined, callback);
  };

  Client.prototype.setLogger = function (newLogger, newErrorLogger = null) {
    if (typeof newLogger !== 'function') {
      throw new Error(`Expected newLogger to be a function, got ${typeof newLogger}`);
    }
    if (newErrorLogger && typeof newErrorLogger !== 'function') {
      throw new Error(
        `Expected newErrorLogger to be a function or null, got ${typeof newErrorLogger}`
      );
    }
    this.logger = newLogger;
    this.errorLogger = newErrorLogger || newLogger;
  };

  return Client;
};
