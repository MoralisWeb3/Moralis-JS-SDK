const Moralis = require('moralis');

function getMethod(descriptor) {
  const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
  if (descriptor.method === 'get') {
    return `@Get('${urlPattern}')`;
  } else if (descriptor.method === 'post') {
    return `@Post('${urlPattern}')`;
  } else if (descriptor.method === 'put') {
    return `@Put('${urlPattern}')`;
  } else if (descriptor.method === 'delete') {
    return `@Delete('${urlPattern}')`;
  } else {
    throw new Error('invalid method');
  }
}

function getBodyInterface(bodyParams) {
  let content = '';
  bodyParams.forEach((param) => {
    content += `
            ${param}: any;
          `;
  });
  return content;
}

function getParamsInterface(params) {
  let content = '';
  params.forEach((param) => {
    content += `
            @Param('${param}')
            ${param}: string,
          `;
  });
  return content;
}

function generateFunctions(api) {
  let content = '';
  let descriptors;
  let service;
  switch (api) {
    case 'evm':
      descriptors = Moralis.default.EvmApi.endpoints.getDescriptors();
      service = 'evmProxyService';
      break;
    case 'solana':
      descriptors = Moralis.default.SolApi.endpoints.getDescriptors();
      service = 'solanaProxyService';
      break;
    default:
      throw new Error('invalid api');
  }
  for (const descriptor of descriptors) {
    const bodyType = getBodyInterface(descriptor.bodyParamNames);
    const paramsType = getParamsInterface(descriptor.urlPatternParamNames);
    content += `
            ${getMethod(descriptor)}
            async ${descriptor.name}${api} (@Body() body: ${
      bodyType ? `{${bodyType}}` : 'any'
    }, @Query() query: any, ${paramsType}) {
              return await this['${service}'].request(${JSON.stringify(
      descriptor,
    )}, body, query, {${descriptor.urlPatternParamNames.join(',')}});
            }
          `;
  }
  return content;
}

module.exports = {
  generateFunctions,
};
