/* eslint-disable no-console */
const Moralis = require('moralis').default;

const lvlBlackList = [
  'endpoints',
  'Core',
  'core',
  'name',
  'type',
  'logger',
  '_info',
  'emitter',
  'start',
  'baseUrl',
  'verify',
  'info',
];

module.exports = function () {
  const paths = {};
  const getKeys = (obj, domains) => {
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        if (lvlBlackList.includes(key)) {
          return;
        }
        getKeys(obj[key], [...(domains || ''), key]);
      });
    } else {
      if (domains) {
        paths[domains.join('/')] = domains;
      }
    }
  };
  getKeys(Moralis);
  return paths;
};
