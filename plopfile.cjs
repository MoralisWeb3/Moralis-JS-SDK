const setGenerators = require('./tools/generators/index.cjs');

module.exports = function (plop) {
  setGenerators(plop);
  // plop.setHelper('getInterface', (name) => `${name}Props`);
  // plop.setHelper('getSubDirectoryPath', (subDirectory) => `/${subDirectory}`);
};
