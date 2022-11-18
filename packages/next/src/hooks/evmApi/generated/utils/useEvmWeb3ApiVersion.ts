import { fetcher } from '../../../../utils/fetcher';
import { 
  web3ApiVersionOperation as operation, 
  Web3ApiVersionRequest, 
  Web3ApiVersionResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWeb3ApiVersion = (request: Web3ApiVersionRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<Web3ApiVersionResponse>(
    ['evmApi/web3ApiVersion', {operation, request}], 
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
