import { fetcher } from '../../../../utils/fetcher';
import { 
  resolveDomainOperation as operation, 
  ResolveDomainRequest, 
  ResolveDomainResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmResolveDomain = (request: ResolveDomainRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<ResolveDomainResponse>(
    ['evmApi/resolveDomain', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
