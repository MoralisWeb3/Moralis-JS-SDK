/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const fetchEndpoints = require('./utils/apiUtils');

const API_HOST = 'solana-gateway.moralis.io';
const SWAGGER_PATH = '/api-json';

const OUTPUT_DIRECTORY = '../src';
const OUTPUT_FILENAME = 'MoralisSolanaApi.js';

let content = '';

content += `/**
 * Automatically generated code, via genSolanaAPI.js
 * Do not modify manually
 */
`;

content += `const axios = require('axios');\n`;

content += `
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
      if (required) throw new Error(\`param \${key} is required!\`);
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
      throw new Error(\`required param \${key} not provided\`);
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
   \`Solana API error while calling \${url}\`
  );
}

static async fetch({ endpoint, params }) {
  const { method = 'GET', url, bodyParams } = endpoint;
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
    // Perform type regularization before return depending on response type option
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
      
      const response =  await http.post(\`/functions/sol-\${name}\`, options, {
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

`;

const genSolanaApi = async () => {
  console.log('Start generating automatic SolanaApi code...');
  const wrappers = {};
  const ENDPOINTS = await fetchEndpoints(API_HOST, SWAGGER_PATH);

  for (const endpoint of ENDPOINTS) {
    const { group, name, url, method } = endpoint;
    if (!wrappers[group]) wrappers[group] = {};
    wrappers[group][name] = { name, url, method };
  }

  Object.keys(wrappers).forEach(group => {
    content += '\n';
    content += `  static ${group} = {\n`;
    Object.values(wrappers[group]).forEach(func => {
      content += `${
        func.name
      }: async (options = {}) => SolanaApi.fetch({ endpoint: ${JSON.stringify(
        ENDPOINTS.find(e => e.name === func.name)
      )}, params: options }),\n`;
    });
    content += '  }\n';
  });

  content += '}\n';
  content += '\n';

  content += 'export default SolanaApi;\n';

  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic SolanaAPI code!');
};

genSolanaApi();
