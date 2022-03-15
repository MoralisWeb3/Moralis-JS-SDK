import RESTController from './RESTController';

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const TrackingEventName = Object.freeze({
  START_FUNCTION: 'Moralis SDK start',
});

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
 * Compares if the semantic version of version1 is larger than version2
 */
const isSemanticVersionLarger = (version1, version2) => {
  const [version1Main, version1Pre] = version1.split('-');
  const version1Arr = version1Main.split('.').map(s => Number(s));
  const [version2Main, version2Pre] = version2.split('-');
  const version2Arr = version2Main.split('.').map(s => Number(s));

  for (let index = 0; index < 3; index++) {
    const compare1 = version1Arr[index];
    const compare2 = version2Arr[index];
    if (compare1 > compare2) return true;
    if (compare1 < compare2) return false;
    if (!Number.isNaN(compare1) && Number.isNaN(compare2)) return true;
    if (Number.isNaN(compare1) && !Number.isNaN(compare2)) return false;
  }

  // Compare pre-releasees if main versions are the same
  if (version1Pre && version2Pre) {
    const version1PreNumber = version1Pre.split('.')[1] ?? 0;
    const version2PreNumber = version2Pre.split('.')[1] ?? 0;

    return version1PreNumber > version2PreNumber;
  }

  // If version2 is a pre-release and version1 is not, then version 1 is newer
  if (version2Pre) {
    return true;
  }

  return false;
};

const checkForSdkUpdates = async () => {
  try {
    const { response } = await RESTController.ajax(
      'GET',
      'https://www.unpkg.com/moralis/package.json'
    );
    const latestVersion = response.version;
    const installedVersion = process.env.NEXT_VERSION;

    if (isSemanticVersionLarger(latestVersion, installedVersion))
      // eslint-disable-next-line no-console
      console.warn(
        `You are not using the latest version of the SDK. Please update it as soon as possible to enjoy the newest features. Most recent version: ${latestVersion}`
      );
  } catch (error) {
    // Cannot verify version, might be network error etc. We don't bother showing anything in that case
  }
};

const trackEvent = async (name, subdomain, options) => {
  try {
    const { response } = await RESTController.ajax(
      'POST',
      'https://internal-api.moralis.io/api/functions/trackEvent',
      JSON.stringify({
        subdomain,
        event: name,
        options,
      }),
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    );
    return response.result;
  } catch (error) {
    //
  }
};

const getSubdomain = serverUrl => {
  const subdomain = serverUrl.split('/')[2];
  const getPort = subdomain.split(':');
  if (getPort.length > 1) {
    return getPort[0];
  }
  return subdomain;
};

module.exports = {
  fetchSwaggerJson,
  getPathByTag,
  fetchEndpoints,
  checkForSdkUpdates,
  trackEvent,
  TrackingEventName,
  getSubdomain,
};
