import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'web3ApiVersion';

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const web3ApiVersionResolver = new EvmResolver({
  getPath: () => `web3/version`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params) => params,
});
