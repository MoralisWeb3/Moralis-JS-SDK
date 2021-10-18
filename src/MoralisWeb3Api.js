/**
 * Automatically generated code, via genWeb3API.js
 * Do not modify manually
 */
const axios = require('axios');

class Web3Api {
  static baseURL = 'https://deep-index.moralis.io/api/v2';
  static BodyParamTypes = {
    setBody: 'set body',
    property: 'property',
  };
  static initialize({apiKey, serverUrl, Moralis = null}) {
    if (!serverUrl && !apiKey) {
      throw new Error('Web3Api.initialize failed: initialize with apiKey or serverUrl');
    }
    if(apiKey) this.apiKey = apiKey;
    if(serverUrl) this.serverUrl = serverUrl;
    this.Moralis = Moralis;
  }

    static getBody(params, bodyParams) {
  if (!params || !bodyParams || !bodyParams.length) {
    return undefined;
  }
  let body = {};
  bodyParams.forEach(({ key, type, required }) => {
    if (params[key] === undefined) {
      if (required) throw new Error(`param ${key} is required!`);
    } else if (type === this.BodyParamTypes.setBody) {
      body = params[key];
    } else {
      body[key] = params[key];
    }
    // remove the param so it doesn't also get added as a query param
    delete params[key];
  });
  return body;
}

static getParameterizedUrl(url, params) {
  if (!Object.keys(params).length) return url;

  // find url params, they start with :
  const requiredParams = url.split('/').filter(s => s && s.includes(':'));
  if (!requiredParams.length) return url;

  let parameterizedUrl = url;
  requiredParams.forEach(p => {
    // strip the : and replace with param value
    const key = p.substr(1);
    const value = params[key];
    if (!value) {
      throw new Error(`required param ${key} not provided`);
    }
    parameterizedUrl = parameterizedUrl.replace(p, value);

    // remove required param from param list
    // so it doesn't become part of the query params
    delete params[key];
  });

  return parameterizedUrl;
}

static getErrorMessage(error, url) {
  return (
    error?.data?.error ||
    error?.data ||
    error?.mesage ||
    error?.toString() ||
   `Web3 API error while calling ${url}`
  );
}

static async fetch({ endpoint, params }) {
  const { method = 'GET', url, bodyParams } = endpoint;
  if(this.Moralis) {
      const { web3 } = this.Moralis;
      
      if (!params.address && web3) {
        params.address = await (await web3.eth.getAccounts())[0];
      }
    }
  try {
    const parameterizedUrl = this.getParameterizedUrl(url, params);
    const body = this.getBody(params, bodyParams);
    const http = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    });
    const response = await http[method.toLowerCase()](parameterizedUrl, body, {
      params,
    });
    return response;
  } catch (error) {
    const msg = this.getErrorMessage(error, url);
    throw new Error(msg);
  }
}

static async apiCall(name, options) {
    if (!this.serverUrl) {
      throw new Error('Web3Api not initialized, run Moralis.start() first');
    }

    if(this.Moralis) {
      const { web3 } = this.Moralis;
      
      if (!options.address && web3) {
        options.address = await (await web3.eth.getAccounts())[0];
      }
    }

    try {
      const http = axios.create({ baseURL: this.serverUrl });
      if (!options.chain) options.chain = 'eth';
      
      const response =  await http.post(`/functions/${name}`, options, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      return response.data.result
    } catch (error) {
      if (error.response) { 
        throw error.response.data;
      }
      throw error;
    }
  }


  static native = {
getBlock: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"native","name":"getBlock","url":"/block/:block_number_or_hash"}, params: options }) : Web3Api.apiCall('getBlock', options),
getDateToBlock: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"native","name":"getDateToBlock","url":"/dateToBlock"}, params: options }) : Web3Api.apiCall('getDateToBlock', options),
getLogsByAddress: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"native","name":"getLogsByAddress","url":"/:address/logs"}, params: options }) : Web3Api.apiCall('getLogsByAddress', options),
getNFTTransfersByBlock: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"native","name":"getNFTTransfersByBlock","url":"/block/:block_number_or_hash/nft/transfers"}, params: options }) : Web3Api.apiCall('getNFTTransfersByBlock', options),
getTransaction: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"native","name":"getTransaction","url":"/transaction/:transaction_hash"}, params: options }) : Web3Api.apiCall('getTransaction', options),
getContractEvents: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"POST","group":"native","name":"getContractEvents","url":"/:address/events","bodyParams":[{"key":"data","type":"set body","required":false}]}, params: options }) : Web3Api.apiCall('getContractEvents', options),
runContractFunction: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"POST","group":"native","name":"runContractFunction","url":"/:address/function","bodyParams":[{"key":"data","type":"set body","required":true}]}, params: options }) : Web3Api.apiCall('runContractFunction', options),
  }

  static account = {
getTransactions: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getTransactions","url":"/:address"}, params: options }) : Web3Api.apiCall('getTransactions', options),
getNativeBalance: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getNativeBalance","url":"/:address/balance"}, params: options }) : Web3Api.apiCall('getNativeBalance', options),
getTokenBalances: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getTokenBalances","url":"/:address/erc20"}, params: options }) : Web3Api.apiCall('getTokenBalances', options),
getTokenTransfers: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getTokenTransfers","url":"/:address/erc20/transfers"}, params: options }) : Web3Api.apiCall('getTokenTransfers', options),
getNFTs: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getNFTs","url":"/:address/nft"}, params: options }) : Web3Api.apiCall('getNFTs', options),
getNFTTransfers: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getNFTTransfers","url":"/:address/nft/transfers"}, params: options }) : Web3Api.apiCall('getNFTTransfers', options),
getNFTsForContract: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"account","name":"getNFTsForContract","url":"/:address/nft/:token_address"}, params: options }) : Web3Api.apiCall('getNFTsForContract', options),
  }

  static token = {
getTokenMetadata: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenMetadata","url":"/erc20/metadata"}, params: options }) : Web3Api.apiCall('getTokenMetadata', options),
getTokenMetadataBySymbol: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenMetadataBySymbol","url":"/erc20/metadata/symbols"}, params: options }) : Web3Api.apiCall('getTokenMetadataBySymbol', options),
getTokenPrice: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenPrice","url":"/erc20/:address/price"}, params: options }) : Web3Api.apiCall('getTokenPrice', options),
getTokenAdressTransfers: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenAdressTransfers","url":"/erc20/:address/transfers"}, params: options }) : Web3Api.apiCall('getTokenAdressTransfers', options),
getTokenAllowance: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenAllowance","url":"/erc20/:address/allowance"}, params: options }) : Web3Api.apiCall('getTokenAllowance', options),
searchNFTs: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"searchNFTs","url":"/nft/search"}, params: options }) : Web3Api.apiCall('searchNFTs', options),
getAllTokenIds: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getAllTokenIds","url":"/nft/:address"}, params: options }) : Web3Api.apiCall('getAllTokenIds', options),
getContractNFTTransfers: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getContractNFTTransfers","url":"/nft/:address/transfers"}, params: options }) : Web3Api.apiCall('getContractNFTTransfers', options),
getNFTOwners: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getNFTOwners","url":"/nft/:address/owners"}, params: options }) : Web3Api.apiCall('getNFTOwners', options),
getNFTMetadata: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getNFTMetadata","url":"/nft/:address/metadata"}, params: options }) : Web3Api.apiCall('getNFTMetadata', options),
getTokenIdMetadata: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenIdMetadata","url":"/nft/:address/:token_id"}, params: options }) : Web3Api.apiCall('getTokenIdMetadata', options),
getTokenIdOwners: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getTokenIdOwners","url":"/nft/:address/:token_id/owners"}, params: options }) : Web3Api.apiCall('getTokenIdOwners', options),
getWalletTokenIdTransfers: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"token","name":"getWalletTokenIdTransfers","url":"/nft/:address/:token_id/transfers"}, params: options }) : Web3Api.apiCall('getWalletTokenIdTransfers', options),
  }

  static resolve = {
resolveDomain: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"resolve","name":"resolveDomain","url":"/resolve/:domain"}, params: options }) : Web3Api.apiCall('resolveDomain', options),
  }

  static defi = {
getPairReserves: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"defi","name":"getPairReserves","url":"/:pair_address/reserves"}, params: options }) : Web3Api.apiCall('getPairReserves', options),
getPairAddress: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"GET","group":"defi","name":"getPairAddress","url":"/:token0_address/:token1_address/pairAddress"}, params: options }) : Web3Api.apiCall('getPairAddress', options),
  }

  static storage = {
uploadFolder: async (options = {}) => this.apiKey ? Web3Api.fetch({ endpoint: {"method":"POST","group":"storage","name":"uploadFolder","url":"/ipfs/uploadFolder","bodyParams":[{"key":"data","type":"set body","required":false}]}, params: options }) : Web3Api.apiCall('uploadFolder', options),
  }
}

export default Web3Api;
