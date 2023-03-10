import Moralis from 'moralis';
import { Web3ApiVersionRequest, Web3ApiVersionResponse, web3ApiVersionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmWeb3ApiVersionParams = UseMoralisQueryParams<Web3ApiVersionResponse, Web3ApiVersionRequest>

export function useEvmWeb3ApiVersion({  ...queryParams }: UseEvmWeb3ApiVersionParams = {}) {
  const resolver = useOperationResolver(web3ApiVersionOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, Web3ApiVersionRequest] | undefined = useMemo(() => {
      return [
      web3ApiVersionOperation.id,
        {
          {}
        },
      ]
  }, []);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}