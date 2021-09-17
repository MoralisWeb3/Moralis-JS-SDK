import ParseUser from './ParseUser';
import { run } from './Cloud';

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

// v2
const endpoints_v2 = [
  {
    method: 'GET',
    group: 'native',
    name: 'getBlock',
    url: '/block/:block_number_or_hash',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenMetadata',
    url: '/erc20/metadata',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenMetadataBySymbol',
    url: '/erc20/metadata/symbols',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenAllowance',
    url: '/erc20/:address/allowance',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenPrice',
    url: '/erc20/:address/price',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getERC721Metadata',
    url: '/erc721/:address/metadata',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getAllTokenIds',
    url: '/nft/:address',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getNFTMetadata',
    url: '/nft/:address/metadata',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getNFTOwners',
    url: '/nft/:address/owners',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getContractNFTTransfers',
    url: '/nft/:address/transfers',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenIdMetadata',
    url: '/nft/:address/:token_id',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getTokenIdOwners',
    url: '/nft/:address/:token_id/owners',
  },
  {
    method: 'GET',
    group: 'token',
    name: 'getWalletTokenIdTransfers',
    url: '/nft/:address/:token_id/transfers',
  },
  {
    method: 'GET',
    group: 'resolve',
    name: 'resolveDomain',
    url: '/resolve/:domain',
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getTransactions',
    url: '/:address',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getNativeBalance',
    url: '/:address/balance',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getTokenBalances',
    url: '/:address/erc20',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getTokenTransfers',
    url: '/:address/erc20/transfers',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'POST',
    group: 'native',
    name: 'getContractEvents',
    url: '/:address/events',
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getNFTs',
    url: '/:address/nft',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getNFTTransfers',
    url: '/:address/nft/transfers',
    preprocess: addChainAndUserAddress,
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getHistoricalNFTTransfers',
    url: '/:address/nft/transfers/verbose',
  },
  {
    method: 'GET',
    group: 'account',
    name: 'getNFTsForContract',
    url: '/:address/nft/:token_address',
  },
];

const ENDPOINTS = endpoints_v2;

function endpointFactory() {
  const wrappers = {};
  ENDPOINTS.forEach(({ group, name, preprocess }) => {
    if (!wrappers[group]) wrappers[group] = {};
    wrappers[group][name] = options => {
      let o = options;
      if (typeof preprocess === 'function') o = preprocess(options);
      return run(name, o);
    };
  });
  return wrappers;
}

const deepIndexApi = endpointFactory();

export default deepIndexApi;
