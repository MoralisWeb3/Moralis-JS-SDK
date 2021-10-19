/**
 * Automatically generated code, via genWeb3API.js
 * Do not modify manually
 */
const axios = require('axios');

class Web3Api {
  static UpdateOperation = {
    increment: 'increment',
    restart: 'restart',
  };

  static initialize(serverUrl, Moralis = null) {
    this.serverUrl = serverUrl;
    this.windowMs = 1;
    this.requestLimit = 2;
    this.Moralis = Moralis;
  }

  static limitHit(firstRequestTime) {
    const startDate = new Date(firstRequestTime);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    const diffInMin = Math.floor(diff / 60000);
    return diffInMin;
  }

  // Check db for request status of user either by IP or username
  static async checkStatus(identifier) {
    const currentData = await this.dbQuery(identifier);
    const { firstRequestTime, requestCount } = currentData.attributes;
    const limit = this.limitHit(firstRequestTime);
    let response;
    if (limit > this.windowMs) {
      await this.updateDb(currentData, this.UpdateOperation.restart);
      response = true;
    } else if (limit < this.windowMs && requestCount < this.requestLimit) {
      await this.updateDb(currentData, this.UpdateOperation.increment);
      response = true;
    } else {
      response = false;
    }
    return response;
  }

  static async dbQuery(identifier) {
    try {
      const rateLimits = this.Moralis.Object.extend('RateLimits');
      const query = new this.Moralis.Query(rateLimits);
      query.equalTo('identifier', identifier);
      const results = await query.find();
      if (results.length === 0) {
        const data = new rateLimits();
        data.set('identifier', identifier);
        data.set('requestCount', 1);
        data.set('firstRequestTime', new Date());
        await data.save();
        return data;
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateDb(data, operation) {
    try {
      const result = await this.dbQuery(data.attributes.identifier);
      if (operation === this.UpdateOperation.increment) {
        result.set('requestCount', Number(result.attributes.requestCount) + 1);
      } else {
        result.set('requestCount', 1);
        result.set('firstRequestTime', new Date());
      }
      await result.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async beforeAPIRequest() {
    const user = this.Moralis.User.current();
    // eslint-disable-next-line no-console
    if (user) {
      return this.checkStatus(user.attributes.username);
    }
    const ip = await axios.get('https://api.ipify.org/?format=json');
    return this.checkStatus(ip.data.ip);
  }

  static async apiCall(name, options) {
    if (!this.serverUrl) {
      throw new Error('Web3Api not initialized, run Moralis.start() first');
    }

    if(!await this.beforeAPIRequest()) {
      throw new Error('Too many requests, please try again later.');
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
    getBlock: async (options = {}) => Web3Api.apiCall('getBlock', options),
    getDateToBlock: async (options = {}) => Web3Api.apiCall('getDateToBlock', options),
    getLogsByAddress: async (options = {}) => Web3Api.apiCall('getLogsByAddress', options),
    getNFTTransfersByBlock: async (options = {}) => Web3Api.apiCall('getNFTTransfersByBlock', options),
    getTransaction: async (options = {}) => Web3Api.apiCall('getTransaction', options),
    getContractEvents: async (options = {}) => Web3Api.apiCall('getContractEvents', options),
    runContractFunction: async (options = {}) => Web3Api.apiCall('runContractFunction', options),
  }

  static account = {
    getTransactions: async (options = {}) => Web3Api.apiCall('getTransactions', options),
    getNativeBalance: async (options = {}) => Web3Api.apiCall('getNativeBalance', options),
    getTokenBalances: async (options = {}) => Web3Api.apiCall('getTokenBalances', options),
    getTokenTransfers: async (options = {}) => Web3Api.apiCall('getTokenTransfers', options),
    getNFTs: async (options = {}) => Web3Api.apiCall('getNFTs', options),
    getNFTTransfers: async (options = {}) => Web3Api.apiCall('getNFTTransfers', options),
    getNFTsForContract: async (options = {}) => Web3Api.apiCall('getNFTsForContract', options),
  }

  static token = {
    getTokenMetadata: async (options = {}) => Web3Api.apiCall('getTokenMetadata', options),
    getTokenMetadataBySymbol: async (options = {}) => Web3Api.apiCall('getTokenMetadataBySymbol', options),
    getTokenPrice: async (options = {}) => Web3Api.apiCall('getTokenPrice', options),
    getTokenAdressTransfers: async (options = {}) => Web3Api.apiCall('getTokenAdressTransfers', options),
    getTokenAllowance: async (options = {}) => Web3Api.apiCall('getTokenAllowance', options),
    searchNFTs: async (options = {}) => Web3Api.apiCall('searchNFTs', options),
    getAllTokenIds: async (options = {}) => Web3Api.apiCall('getAllTokenIds', options),
    getContractNFTTransfers: async (options = {}) => Web3Api.apiCall('getContractNFTTransfers', options),
    getNFTOwners: async (options = {}) => Web3Api.apiCall('getNFTOwners', options),
    getNFTMetadata: async (options = {}) => Web3Api.apiCall('getNFTMetadata', options),
    getTokenIdMetadata: async (options = {}) => Web3Api.apiCall('getTokenIdMetadata', options),
    getTokenIdOwners: async (options = {}) => Web3Api.apiCall('getTokenIdOwners', options),
    getWalletTokenIdTransfers: async (options = {}) => Web3Api.apiCall('getWalletTokenIdTransfers', options),
  }

  static resolve = {
    resolveDomain: async (options = {}) => Web3Api.apiCall('resolveDomain', options),
  }

  static defi = {
    getPairReserves: async (options = {}) => Web3Api.apiCall('getPairReserves', options),
    getPairAddress: async (options = {}) => Web3Api.apiCall('getPairAddress', options),
  }

  static storage = {
    uploadFolder: async (options = {}) => Web3Api.apiCall('uploadFolder', options),
  }
}

export default Web3Api;
