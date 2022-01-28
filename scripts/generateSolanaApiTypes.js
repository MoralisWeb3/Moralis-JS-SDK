/* eslint-disable no-console */
// npx openapi-typescript https://deep-index.moralis.io/api-docs/v2/swagger.json --output types/generated/SolanaApi.d.ts

// const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');
const https = require('https');
const openapiTS = require('openapi-typescript').default;

// URL will be changed when api is deployed
const API_HOST = 'solana-gateway.moralis.io';
const SWAGGER_PATH = '/api-json';

const OUTPUT_DIRECTORY = '../types/generated/';
const OUTPUT_FILENAME = 'solanaApi.d.ts';

const fetchSwaggerJson = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: API_HOST,
        path: SWAGGER_PATH,
        method: 'GET',
      },
      res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`statusCode=${res.statusCode}`));
        }

        let body = '';

        res.on('data', chunk => {
          body += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(body);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', err => {
      reject(err);
    });

    req.end();
  });
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

const filterUnique = (value, index, self) => self.indexOf(value) === index;

const makeMethod = (pathDetails, path) => {
  const optionKeys = pathDetails[path].data?.parameters
    ? pathDetails[path].data.parameters.map(param => param.in).filter(filterUnique)
    : null;
  const hasQuery = optionKeys ? optionKeys.includes('query') : false;
  const hasPath = optionKeys ? optionKeys.includes('path') : false;

  const operations = `operations["${path}"]`;

  const options = [];
  if (hasQuery) {
    options.push(`${operations}["parameters"]["query"]`);
  }
  if (hasPath) {
    options.push(`${operations}["parameters"]["path"]`);
  }

  const optionsString = options.length > 0 ? options.join(' & ') : undefined;

  const responseCodes = Object.keys(pathDetails[path].data?.responses);
  const responseCode = responseCodes.length > 0 ? responseCodes[0] : '200';

  const result =
    responseCode === '200'
      ? `${operations}["responses"]["${responseCode}"]["content"]["application/json"]`
      : 'unknown';
  const optionParam = optionsString ? `options: ${optionsString}` : '';

  return `    ${path}: (${optionParam}) => Promise<${result}>;
`;
};

const makeTagObject = (tag, pathByTag, pathDetails) => {
  return `  static ${tag}: {
${pathByTag[tag].map(path => makeMethod(pathDetails, path)).join('')}  }

`;
};

const makeGeneratedSolanaApiType = (tags, pathByTag, pathDetails) => {
  let content = `export default class SolanaApi {\n`;

  content += `  static initialize: (options: {apiKey?: string, serverUrl?: string, Moralis?: any}) => void;\n`;
  content += `\n`;

  tags.forEach(tag => {
    content += `${makeTagObject(tag, pathByTag, pathDetails)}`;
  });

  content += `}\n`;

  return content;
};

const generateSolanaApiTypes = async () => {
  console.log('Start generating automatic SolanaAPI Types...');
  // Fetch the swagger JSON
  const swaggerJSON = await fetchSwaggerJson();

  // normalize data for our use
  const { pathByTag, pathDetails } = await getPathByTag(swaggerJSON);
  const tags = Object.keys(pathByTag);

  let content = '';

  // Generate automatic types from swagger via openapi-typescript
  content += await openapiTS(swaggerJSON);
  content += '\n';

  // Add our custom types
  content += makeGeneratedSolanaApiType(tags, pathByTag, pathDetails);

  // Save the file
  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });

  console.log('Done generatinging automatic SolanaAPI Types!');
};

generateSolanaApiTypes();
