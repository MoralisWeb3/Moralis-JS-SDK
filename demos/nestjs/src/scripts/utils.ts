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

module.exports = {
  generateFunctions,
};
