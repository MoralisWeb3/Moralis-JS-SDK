import { endpointWeightsOperation } from 'moralis/common-evm-utils';
import { createResolver } from '../../../genericResolvers';
import Moralis from 'moralis';

export const endpointWeightsResolver = createResolver(endpointWeightsOperation, Moralis.EvmApi.baseUrl);