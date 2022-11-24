const Client = require('./client')();
const MultiClient = require('../lib/multiclient')({
  Client,
});

const Provider = require('../lib/provider')({
  Client,
});

// In case the code being tested relies on the provider.client.clients array existing
// (e.g. a health check) use the real MultiClient for this mock.
const MultiProvider = require('../lib/provider')({
  Client: MultiClient,
});

const Notification = require('../lib/notification');
const token = require('../lib/token');

module.exports = {
  Provider,
  MultiProvider,
  Notification,
  Client,
  token,
};
