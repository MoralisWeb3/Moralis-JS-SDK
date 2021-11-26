/**
 * Automatically generated code, via genSolanaAPI.js
 * Do not modify manually
 */
const axios = require('axios');

class SolanaApi {
  static baseURL = 'https://7f59-41-184-184-103.ngrok.io';
  static BodyParamTypes = {
    setBody: 'set body',
    property: 'property',
  };
  static initialize({ apiKey, serverUrl, Moralis = null }) {
    if (!serverUrl && !apiKey) {
      throw new Error('SolanaApi.initialize failed: initialize with apiKey or serverUrl');
    }
    if (apiKey) this.apiKey = apiKey;
    if (serverUrl) this.serverUrl = serverUrl;
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
      error?.response?.data?.message ||
      error?.message ||
      error?.toString() ||
      `Solana API error while calling ${url}`
    );
  }

  static async fetch({ endpoint, params }) {
    const { method = 'GET', url, bodyParams } = endpoint;
    if (this.Moralis) {
      const { web3 } = this.Moralis;

      if (!params.address && web3) {
        params.address = await (await web3.eth.getAccounts())[0];
      }
    }
    if (!params.network) params.network = 'mainnet';
    if (!this.apiKey) {
      return this.apiCall(endpoint.name, params);
    }
    try {
      const parameterizedUrl = this.getParameterizedUrl(url, params);
      const body = this.getBody(params, bodyParams);
      const response = await axios(this.baseURL + parameterizedUrl, {
        params,
        method,
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      const msg = this.getErrorMessage(error, url);
      throw new Error(msg);
    }
  }

  static async apiCall(name, options) {
    if (!this.serverUrl) {
      throw new Error('SolanaAPI not initialized, run Moralis.start() first');
    }

    try {
      const http = axios.create({ baseURL: this.serverUrl });

      const response = await http.post(`/functions/sol-${name}`, options, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      return response.data.result;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }

  static account = {
    balance: async (options = {}) =>
      SolanaApi.fetch({
        endpoint: {
          method: 'GET',
          group: 'account',
          name: 'balance',
          url: '/account/:network/:address/balance',
        },
        params: options,
      }),
    getSPL: async (options = {}) =>
      SolanaApi.fetch({
        endpoint: {
          method: 'GET',
          group: 'account',
          name: 'getSPL',
          url: '/account/:network/:address/fungible-tokens',
        },
        params: options,
      }),
    getNFTs: async (options = {}) =>
      SolanaApi.fetch({
        endpoint: {
          method: 'GET',
          group: 'account',
          name: 'getNFTs',
          url: '/account/:network/:address/non-fungible-tokens',
        },
        params: options,
      }),
    getAssets: async (options = {}) =>
      SolanaApi.fetch({
        endpoint: {
          method: 'GET',
          group: 'account',
          name: 'getAssets',
          url: '/account/:address/assets',
        },
        params: options,
      }),
    getPortfolio: async (options = {}) =>
      SolanaApi.fetch({
        endpoint: {
          method: 'GET',
          group: 'account',
          name: 'getPortfolio',
          url: '/account/:network/:address/portfolio',
        },
        params: options,
      }),
  };
}

export default SolanaApi;
