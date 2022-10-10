// import { EndpointDescriptor } from '@moralisweb3/api-utils';
import Moralis from 'moralis';

function generateFunctions(api: 'evm' | 'solana') {
  let content = '';
  let descriptors;
  let service: 'EvmApi' | 'SolApi';
  switch (api) {
    case 'evm':
      descriptors = Moralis.EvmApi.endpoints.getDescriptors();
      service = 'EvmApi';
      break;
    case 'solana':
      descriptors = Moralis.SolApi.endpoints.getDescriptors();
      service = 'SolApi';
      break;
    default:
      throw new Error('invalid api');
  }
  for (const descriptor of descriptors) {
    let body = '';
    const moralisApi = Moralis[service] as any;
    const apiFunction = moralisApi[descriptor.group!][descriptor.name];
    // type check = Parameters<typeof apiFunction>;
    if (apiFunction.length > 0) {
      body = `@Body() body: Parameters<typeof Moralis.${service}.${descriptor.group}.${descriptor.name}>[0]`;
    }
    content += `
    @Post('${api}/${descriptor.name}')
            async ${descriptor.name}${api} (${body}) {
              try {
                return await Moralis.${service}.${descriptor.group}.${descriptor.name}(${body ? 'body' : ''});
              } catch (error) {
                throw new BadRequestException(error.message);
              }
            }
          `;
  }
  return content;
}

// function generateFunctions(api) {
//   let content = '';
//   let descriptors;
//   let service;
//   switch (api) {
//     case 'evm':
//       descriptors = Moralis.default.EvmApi.endpoints.getDescriptors();
//       service = 'evmProxyService';
//       break;
//     case 'solana':
//       descriptors = Moralis.default.SolApi.endpoints.getDescriptors();
//       service = 'solanaProxyService';
//       break;
//     default:
//       throw new Error('invalid api');
//   }
//   for (const descriptor of descriptors) {
//     const bodyType = getBodyInterface(descriptor.bodyParamNames);
//     const paramsType = getParamsInterface(descriptor.urlPatternParamNames);
//     content += `
//             ${getMethod(descriptor)}
//             async ${descriptor.name}${api} (@Body() body: ${
//       bodyType ? `{${bodyType}}` : 'any'
//     }, @Query() query: any, ${paramsType}) {
//               return await this['${service}'].request(${JSON.stringify(
//       descriptor,
//     )}, body, query, {${descriptor.urlPatternParamNames.join(',')}});
//             }
//           `;
//   }
//   return content;
// }

module.exports = {
  generateFunctions,
};
