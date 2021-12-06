import RESTController from './RESTController';

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const fetchSwaggerJson = async () => {
  const { response } = await RESTController.ajax(
    'GET',
    `https://${DEEP_INDEX_API_HOST}${DEEP_INDEX_SWAGGER_PATH}`
  );
  return response;
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

/**
 * Compares if the semantic version of version1 is larget than version2
 */
const isSemanticVersionLarger = (version1, version2) => {
  const version1Arr = version1.split('.').map(s => Number(s));
  const version2Arr = version2.split('.').map(s => Number(s));

  for (let index = 0; index < 3; index++) {
    const compare1 = version1Arr[index];
    const compare2 = version2Arr[index];
    if (compare1 > compare2) return true;
    if (compare1 < compare2) return false;
    if (!Number.isNaN(compare1) && Number.isNaN(compare2)) return true;
    if (Number.isNaN(compare1) && !Number.isNaN(compare2)) return false;
  }

  return false;
};

const checkForSdkUpdates = async () => {
  try {
    const { response } = await RESTController.ajax(
      'GET',
      'https://www.unpkg.com/moralis@0.0.148/package.json'
    );
    const latestVersion = response.version;
    const installedVersion = process.env.npm_package_version;

    if (isSemanticVersionLarger(latestVersion, installedVersion))
      // eslint-disable-next-line no-console
      console.warn(
        `You are not using the latest version of the SDK. Please update it as soon as possible to enjoy the newest features. Most recent version: ${latestVersion}`
      );
  } catch (error) {
    // Cannot verify version, might be network error etc. We don't bother showing anything in that case
  }
};

module.exports = {
  fetchSwaggerJson,
  getPathByTag,
  fetchEndpoints,
  checkForSdkUpdates,
};
