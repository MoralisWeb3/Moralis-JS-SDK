import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveDomainOperation as operation, 
  ResolveDomainRequest, 
  ResolveDomainResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmResolveDomain = (request: ResolveDomainRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<ResolveDomainResponse>(
    ['evmApi/resolveDomain', {operation, request}], 
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
