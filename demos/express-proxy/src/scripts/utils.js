const Moralis = require('moralis');

function generateFunctions(api) {
  let content = '';
  let descriptors;
  let service;
  switch (api) {
    case 'evm':
      descriptors = Moralis.default.EvmApi.endpoints.getDescriptors();
      service = 'EvmApi';
      break;
    case 'solana':
      descriptors = Moralis.default.SolApi.endpoints.getDescriptors();
      service = 'SolApi';
      break;
    default:
      throw new Error('invalid api');
  }
  for (const descriptor of descriptors) {
    let body = '';
    const moralisApi = Moralis.default[service];
    const apiFunction = moralisApi[descriptor.group][descriptor.name];
    if (apiFunction.length > 0) {
      body = `Parameters<typeof Moralis.${service}.${descriptor.group}.${descriptor.name}>[0]`;
    }
    content += `
    proxyRouter.route('/${api}/${descriptor.name}').post(async (req: ${
      body ? `TypedRequestBody<${body}>` : 'Request'
    }, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.${service}.${descriptor.group}.${descriptor.name}(${body ? 'req.body' : ''});
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            `;
  }
  return content;
}

module.exports = {
  generateFunctions,
};
