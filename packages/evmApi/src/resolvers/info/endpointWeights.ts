import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'endpointWeights';

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const endpointWeightsResolver = new EvmResolver({
  getPath: () => `info/endpointWeights`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params) => params,
});
