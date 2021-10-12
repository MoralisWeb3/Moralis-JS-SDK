/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const OUTPUT_DIRECTORY = '../src';
const OUTPUT_FILENAME = 'MoralisWeb3Api.js';

let content = '';

content += `/**
 * Automatically generated code, via genWeb3API.js
 * Do not modify manually
 */
`;

content += `const axios = require('axios');\n`;

content += `
class Web3Api {
  static initialize(serverUrl, Moralis = null) {
    this.serverUrl = serverUrl;
    this.Moralis = Moralis;
  }

  static async apiCall(name, options) {
    if (!this.serverUrl) {
      throw new Error('Web3Api not initialized, run Moralis.start() first');
    }

    if(this.Moralis) {
      const { web3 } = this.Moralis;
      
      if(!web3) throw new Error("Web3 not initialized, run await Moralis.enable");

      if (!options.address) {
        options.address = await (await web3.eth.getAccounts())[0];
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
    };

    data.push(endpoint);
  });

  return data;
};

const genWebApi = async () => {
  console.log('Start generating automatic Web3API code...');
  let wrappers = {};
  const ENDPOINTS = await fetchEndpoints();

  ENDPOINTS.forEach(x => {
    wrappers = {};
  });

  for (const endpoint of ENDPOINTS) {
    const { group, name } = endpoint;
    if (!wrappers[group]) wrappers[group] = {};
    wrappers[group][name] = { name };
  }

  Object.keys(wrappers).forEach(group => {
    content += '\n';
    content += `  static ${group} = {\n`;
    Object.values(wrappers[group]).forEach(func => {
      content += `    ${func.name}: async (options = {}) => Web3Api.apiCall('${func.name}', options),\n`;
    });
    content += '  }\n';
  });

  content += '}\n';
  content += '\n';

  content += 'export default Web3Api;\n';
  content += 'module.exports = Web3Api;\n';

  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic Web3API code!');
};

genWebApi();
