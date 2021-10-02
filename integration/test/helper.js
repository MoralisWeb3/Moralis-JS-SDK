const { ParseServer } = require('parse-server');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
beforeAll(done => {
  const { app } = require('../server');
  const httpServer = require('http').createServer(app);

  httpServer.on('error', console.log).listen(1337, () => {
    console.log('parse-server running on port 1337.');
    done();
  });
  ParseServer.createLiveQueryServer(httpServer);
});
