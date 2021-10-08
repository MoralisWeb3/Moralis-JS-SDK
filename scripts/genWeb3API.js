const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const OUTPUT_DIRECTORY = '../lib/web3Api/';
const OUTPUT_FILENAME = 'index.js';

let content = '';

content += "const axios = require('axios');";

content += '\n\n\n';

content += 'class Web3Api {';

content += '\n\n\n';

content += 'static initialise(serverUrl) {';
content += 'this.serverUrl = serverUrl;';
content += '}';

content += '\n\n\n';

content += 'static apiCall(name, options) {';
content += 'if(!this.serverUrl){';
content += `throw new Error("Web3Api not initialized, run Web3Api.initialize first")`;
content += '}';

content += '\n\n';

content += 'const http = axios({ baseURL: this.serverUrl });';
content += "if (!options.chain) options.chain = 'eth';";
// eslint-disable-next-line no-template-curly-in-string
content += 'return axios.post(`function/${name}`, options);';

content += '}';

content += '\n\n\n';

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
    content += `static ${group} = {`;
    Object.values(wrappers[group]).forEach(func => {
      content += `${func.name}: async (options = {}) => Web3Api.apiCall('${func.name}', options),`;
    });
    content += '}';
    content += '\n\n\n';
  });

  content += '}';

  content += 'module.exports = Web3Api';

  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
};

genWebApi();
