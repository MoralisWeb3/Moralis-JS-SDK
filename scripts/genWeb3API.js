/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const OUTPUT_DIRECTORY = '../src';
const OUTPUT_FILENAME = 'MoralisWeb3Api.js';

const BodyParamTypes = {
  setBody: 'set body',
  property: 'property',
};

let content = '';

content += `/**
 * Automatically generated code, via genWeb3API.js
 * Do not modify manually
 */
`;

content += `const axios = require('axios');\n`;

content += `
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
   \`Web3 API error while calling \${url}\`
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
    return response.data;
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
      const { User, web3 } = this.Moralis;
      
      const user = User.current();

      if (!options.address) {
        if (user) {
          options.address = user.get('ethAddress');
        } else if (web3) {
          options.address = await (await web3.eth.getAccounts())[0];
        }
      }
    }

    try {
      const http = axios.create({ baseURL: this.serverUrl });
      if (!options.chain) options.chain = 'eth';
      
      const response =  await http.post(\`/functions/\${name}\`, options, {
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

`;

const fetchSwaggerJson = async () => {
  const http = await axios.create({ baseURL: `https://${DEEP_INDEX_API_HOST}` });
  const response = await http.get(DEEP_INDEX_SWAGGER_PATH);
  const result = response.data;
  return result;
};

const getPathByTag = swaggerJSON => {
  const pathByTag = {};
  const pathDetails = {};

  Object.entries(swaggerJSON.paths).map(([pathName, requestData]) => {
    return Object.entries(requestData).forEach(([method, data]) => {
      const { tags } = data;

      if (tags.length > 0) {
        if (!pathByTag[tags[0]]) {
          pathByTag[tags[0]] = [];
        }
        pathByTag[tags[0]].push(data.operationId);
        pathDetails[data.operationId] = { method, pathName, data };
      }
    });
  });

  return { pathByTag, pathDetails };
};

const fetchBodyParams = (schema, swaggerJSON, required) => {
  const body = [];
  if (schema.$ref) {
    const splitSchema = schema.$ref.split('/');
    const schemaKey = splitSchema[splitSchema.length - 1];
    const component = swaggerJSON.components.schemas[schemaKey];
    if (component) {
      Object.entries(component.properties).map(([key, value]) => {
        return body.push({
          key,
          type: component.type === 'array' ? BodyParamTypes.setBody : BodyParamTypes.property,
          required: component.required.includes(key) ? true : false,
        });
      });
    }
  } else {
    body.push({
      key: 'abi',
      type: BodyParamTypes.setBody,
      required,
    });
  }
  return body;
};

const fetchEndpoints = async () => {
  const swaggerJSON = await fetchSwaggerJson();

  const { pathDetails } = await getPathByTag(swaggerJSON);

  const data = [];

  Object.keys(pathDetails).forEach(x => {
    const item = pathDetails[x];

    const endpoint = {
      method: item.method.toUpperCase(),
      group: item.data.tags[0],
      name: x,
      url: item.pathName.split('{').join(':').split('}').join(''),
      bodyParams: item.data.requestBody
        ? fetchBodyParams(
            item.data.requestBody.content['application/json'].schema,
            swaggerJSON,
            item.data.requestBody.required
          )
        : undefined,
    };

    data.push(endpoint);
  });

  return data;
};

const genWebApi = async () => {
  console.log('Start generating automatic Web3API code...');
  const wrappers = {};
  const ENDPOINTS = await fetchEndpoints();

  for (const endpoint of ENDPOINTS) {
    const { group, name, url, method } = endpoint;
    if (!wrappers[group]) wrappers[group] = {};
    wrappers[group][name] = { name, url, method };
  }

  //   console.log(ENDPOINTS);
  //   console.log(wrappers);

  // ENDPOINTS.forEach(x => {
  //   wrappers = {};
  // });

  Object.keys(wrappers).forEach(group => {
    content += '\n';
    content += `  static ${group} = {\n`;
    Object.values(wrappers[group]).forEach(func => {
      content += `${func.name}: async (options = {}) => Web3Api.fetch({ endpoint: ${JSON.stringify(
        ENDPOINTS.find(e => e.name === func.name)
      )}, params: options }),\n`;
    });
    content += '  }\n';
  });

  content += '}\n';
  content += '\n';

  content += 'export default Web3Api;\n';

  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic Web3API code!');
};

genWebApi();
