/**
 * Automatically generated code, via genWeb3API.js
 * Do not modify manually
 */
const axios = require('axios');

class Web3Api {
  static initialize(serverUrl) {
    this.serverUrl = serverUrl;
  }

  static async apiCall(name, options) {
    if (!this.serverUrl) {
      throw new Error('Web3Api not initialized, run Moralis.start() first');
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
