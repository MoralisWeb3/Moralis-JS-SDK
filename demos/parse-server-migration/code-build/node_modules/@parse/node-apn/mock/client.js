module.exports = function () {
  // Mocks of public API methods
  function Client() {}

  Client.prototype.write = function mockWrite(notification, device) {
    return { device };
  };

  Client.prototype.setLogger = function mockSetLogger(newLogger, newErrorLogger = null) {
    // Validate arguments but don't store the logger
    if (typeof newLogger !== 'function') {
      throw new Error(`Expected newLogger to be a function, got ${typeof newLogger}`);
    }
    if (newErrorLogger && typeof newErrorLogger !== 'function') {
      throw new Error(
        `Expected newErrorLogger to be a function or null, got ${typeof newErrorLogger}`
      );
    }
  };

  Client.prototype.shutdown = function mockShutdown(callback) {
    if (callback) {
      callback();
    }
  };

  return Client;
};
