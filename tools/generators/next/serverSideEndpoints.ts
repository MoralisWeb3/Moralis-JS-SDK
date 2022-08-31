/* eslint-disable no-console */
import Moralis from 'moralis';

const lvlBlackList = ['endpoints', 'Core', 'core', 'name', 'type', 'logger', '_info', 'emitter', 'start', 'baseUrl'];

const kek: Record<string, string[]> = {};
const getKeys = (obj: any, domains?: string[]) => {
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
      kek[domains.join('/')] = domains;
      // kek.push(domains);
    }
  }
};

getKeys(Moralis);
console.log(kek);
