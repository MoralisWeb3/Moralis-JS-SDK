/**
 * Automatically generated code, via genSolanaAPI.js
 * Do not modify manually
 */
const axios = require('axios');

class SolanaApi {
  // URL will be changed when api is deployed
  static baseURL = 'https://solana-gateway.moralis.io';
  static BodyParamTypes = {
    setBody: 'set body',
    property: 'property',
  };
  static initialize({apiKey, serverUrl, Moralis = null}) {
    if (!serverUrl && !apiKey) {
      throw new Error('SolanaApi.initialize failed: initialize with apiKey or serverUrl');
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

static getApiRateLimitInfo(headers) {
  return {
    'x-rate-limit-limit': headers['x-rate-limit-limit'],
    'x-rate-limit-remaining': headers['x-rate-limit-remaining'],
    'x-rate-limit-remaining-ttl': headers['x-rate-limit-remaining-ttl'],
    'x-rate-limit-throttle-limit': headers['x-rate-limit-throttle-limit'],
    'x-rate-limit-throttle-remaining': headers['x-rate-limit-throttle-remaining'],
    'x-rate-limit-throttle-remaining-ttl': headers['x-rate-limit-throttle-remaining-ttl'],
    'x-rate-limit-throttle-used': headers['x-rate-limit-throttle-used'],
    'x-rate-limit-used': headers['x-rate-limit-used'],
    'x-request-weight': headers['x-request-weight'],
    'x-rate-limit-throttle-ip-used': headers['x-rate-limit-throttle-ip-used'],
    'x-rate-limit-remaining-ip-ttl': headers['x-rate-limit-remaining-ip-ttl'],
    'x-rate-limit-throttle-remaining-ip-ttl': headers['x-rate-limit-throttle-remaining-ip-ttl'],
    'x-rate-limit-ip-used': headers['x-rate-limit-ip-used'],
  };
}

static getErrorMessage(error, url) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    error?.toString() ||
   `Solana API error while calling ${url}`
  );
}

static async fetch({ endpoint, params: providedParams }) {
  // Make a shallow copy to prevent modification of original params
  const params = {...providedParams};
  if(this.Moralis) {
    const { User } = this.Moralis;
    const user = User.current();

    if (!params.address) {
      if (user) {
        params.address = user.get('solAddress');
      }
    }
  }
  if (!params.network) params.network = 'mainnet';
  if (!params.responseType) params.responseType = 'native';

  if(!this.apiKey) {
    return this.fetchFromServer(endpoint.name, params);
  }

  return this.fetchFromApi(endpoint, params);
}

static async fetchFromApi(endpoint, params) {
  const { method = 'GET', url, bodyParams } = endpoint;

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
    // Perform type regularization before return depending on response type option
    return response.data;
  } catch (error) {
    const {status, headers, data} = error.response;

    let msg
    if(status === 429){
      msg = `This Moralis Server is rate-limited because of the plan restrictions. See the details about the current rate and throttle limits: ${JSON.stringify(
        this.getApiRateLimitInfo(headers)
      )}`
    } else {
      msg = this.getApiErrorMessage(error, url);
    }

    throw new Error(msg);
  }
}


static async fetchFromServer(name, options) {
    if (!this.serverUrl) {
      throw new Error('SolanaAPI not initialized, run Moralis.start() first');
    }

    try {
      const http = axios.create({ baseURL: this.serverUrl });
      
      const response =  await http.post(`/functions/sol-${name}`, options, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      return response.data.result
    } catch (error) {
      if (error.response?.data?.error) { 
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }


  static account = {
balance: async (options = {}) => SolanaApi.fetch({ endpoint: {"method":"GET","group":"account","name":"balance","url":"/account/:network/:address/balance"}, params: options }),
getSPL: async (options = {}) => SolanaApi.fetch({ endpoint: {"method":"GET","group":"account","name":"getSPL","url":"/account/:network/:address/tokens"}, params: options }),
getNFTs: async (options = {}) => SolanaApi.fetch({ endpoint: {"method":"GET","group":"account","name":"getNFTs","url":"/account/:network/:address/nft"}, params: options }),
getPortfolio: async (options = {}) => SolanaApi.fetch({ endpoint: {"method":"GET","group":"account","name":"getPortfolio","url":"/account/:network/:address/portfolio"}, params: options }),
  }

  static nft = {
getNFTMetadata: async (options = {}) => SolanaApi.fetch({ endpoint: {"method":"GET","group":"nft","name":"getNFTMetadata","url":"/nft/:network/:address/metadata"}, params: options }),
  }
}

export default SolanaApi;
