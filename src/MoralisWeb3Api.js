import ParseUser from './ParseUser';
import { run } from './Cloud';

import utils from './utils';

function addChainAndUserAddress(options = {}) {
  if (!options.chain) options.chain = 'eth';
  if (options.address) return options;
  const user = ParseUser.current();
  if (user) {
    options.address = user.get('ethAddress');
    return options;
  }
  throw new Error('address or logged in user required');
}

async function endpointFactory() {
  const wrappers = {};
  const ENDPOINTS = await utils.fetchEndpoints();

  for (const endpoint of ENDPOINTS) {
    const { group, name } = endpoint;
    let { preprocess } = endpoint;
    preprocess = addChainAndUserAddress;
    if (!wrappers[group]) wrappers[group] = {};
    wrappers[group][name] = options => {
      let o = options;
      if (typeof preprocess === 'function') o = preprocess(options);
      return run(name, o);
    };
  }
  return wrappers;
}

const deepIndexApi = endpointFactory();

export default deepIndexApi;
