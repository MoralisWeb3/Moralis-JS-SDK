import {
  GetPairAddressRequest,
  GetWalletTokenBalancesRequest,
  endpointWeightsOperation,
  getPairAddressOperation,
  getWalletTokenBalancesOperation,
} from 'moralis/common-evm-utils';
import { _useResolver } from '../resolvers';

export const useEvmEndpointWeights = () => {
  return _useResolver(endpointWeightsOperation, {});
};
export const usePairAddressOperation = (request?: GetPairAddressRequest) => {
  return _useResolver(getPairAddressOperation, request);
};
export const useEvmWalletTokenBalances = (request?: GetWalletTokenBalancesRequest) => {
  return _useResolver(getWalletTokenBalancesOperation, request);
};
