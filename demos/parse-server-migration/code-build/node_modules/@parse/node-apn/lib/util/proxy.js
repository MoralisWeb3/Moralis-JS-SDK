const http = require('http');

module.exports = function createProxySocket(proxy, target) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: proxy.host,
      port: proxy.port,
      method: 'connect',
      path: target.host + ':' + target.port,
      headers: { Connection: 'Keep-Alive' },
    });
    req.on('error', reject);
    req.on('connect', (res, socket, head) => {
      resolve(socket);
    });
    req.end();
  });
};
