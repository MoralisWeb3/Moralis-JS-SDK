const axios = require('axios');

const BodyParamTypes = {
  setBody: 'set body',
  property: 'property',
};

const fetchSwaggerJson = async (API_HOST, SWAGGER_PATH) => {
  const http = await axios.create({ baseURL: `https://${API_HOST}` });
  const response = await http.get(SWAGGER_PATH);
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
      key: 'data',
      type: BodyParamTypes.setBody,
      required,
    });
  }
  return body;
};

const fetchEndpoints = async (API_HOST, SWAGGER_PATH) => {
  const swaggerJSON = await fetchSwaggerJson(API_HOST, SWAGGER_PATH);

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

module.exports = fetchEndpoints;
