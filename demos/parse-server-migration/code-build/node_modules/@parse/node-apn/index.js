const http2 = require('http2');
const debug = require('debug')('apn');

debug.log = console.log.bind(console);

const credentials = require('./lib/credentials')({
  logger: debug,
});

const config = require('./lib/config')({
  logger: debug,
  prepareCertificate: credentials.certificate,
  prepareToken: credentials.token,
  prepareCA: credentials.ca,
});

const Client = require('./lib/client')({
  logger: debug,
  config,
  http2,
});

const MultiClient = require('./lib/multiclient')({
  Client,
});

const Provider = require('./lib/provider')({
  logger: debug,
  Client,
});

const MultiProvider = require('./lib/provider')({
  logger: debug,
  Client: MultiClient,
});

const Notification = require('./lib/notification');

const token = require('./lib/token');

module.exports = {
  Provider,
  MultiProvider,
  Notification,
  token,
};
