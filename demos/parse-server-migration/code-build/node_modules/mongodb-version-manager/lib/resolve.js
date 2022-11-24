var resolve = require('mongodb-download-url').getDownloadURL;
var Model = require('./model');
var debug = require('debug')('mongodb-version-manager:resolve');

module.exports = function(opts, done) {
  var platform = opts.platform || process.platform;
  resolve(opts).then(function(res) {
    res.platform = platform;
    var model = new Model(res);
    debug('resolved', model.serialize({
      props: true,
      derived: true
    }));
    done(null, model);
  }, function(err) { done(err); });
};
