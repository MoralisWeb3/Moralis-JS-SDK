import Moralis from 'moralis';

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

export const getSDKPaths = () => {
  const paths: any[] = [];
  const getKeys = (obj: any, domains?: any) => {
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
        // paths[domains.join('/')] = domains;
        paths.push(domains);
      }
    }
  };
  getKeys(Moralis);
  return paths;
};
