import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveDomainOperation as operation, 
  ResolveDomainRequest, 
  ResolveDomainResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmResolveDomain = (request: ResolveDomainRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<ResolveDomainResponse>(
    ['evmApi/resolveDomain', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
