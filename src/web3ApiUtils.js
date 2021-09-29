import https from 'https';

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const fetchSwaggerJson = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: DEEP_INDEX_API_HOST,
        path: DEEP_INDEX_SWAGGER_PATH,
        method: 'GET',
      },
      res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode));
        }

        let body = '';

        res.on('data', chunk => {
          body += chunk;
        });

        res.on('end', function () {
          try {
            const result = JSON.parse(body);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', function (err) {
      reject(err);
    });

    req.end();
  });
};

const getPathByTag = swaggerJSON => {
  const pathByTag = {};
  const pathDetails = {};

  Object.entries(swaggerJSON.paths).map(([pathName, requestData]) => {
    return Object.entries(requestData).map(([method, data]) => {
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
    // console.log(x);
    const item = pathDetails[x];
    console.log(item);
    data.push({
      method: item.method.toUpperCase(),
      group: item.data.tags[0],
      name: x,
      url: item.pathName.split('{').join(':').split('}').join(''),
    });
  });

  return data;
};

module.exports = {
  fetchEndpoints,
};
