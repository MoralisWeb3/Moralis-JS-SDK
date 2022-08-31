/* eslint-disable no-console */
import Moralis from 'moralis';

// const readKeysIfExist = (obj: unknown) => {
//   // if (typeof obj === 'object') {
//   const keys = Object?.keys(obj as object);
//   readKeysIfExist(keys);
//   // }
//   // return obj;
// };
// const libs = ['Core', 'Auth', 'EvmApi', 'SolApi'];
// const kek = [];
const getKeys = (obj: any, domains?: string[]) => {
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (key === 'endpoints') {
        return;
      }
      getKeys(obj[key], [...(domains || ['use']), key]);
    });
  } else {
    console.log(domains);
  }
};

const wat = getKeys(Moralis);
console.log(wat);
