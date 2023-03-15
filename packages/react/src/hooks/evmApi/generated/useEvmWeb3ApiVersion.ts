import Moralis from 'moralis';
import { Web3ApiVersionRequest, Web3ApiVersionResponse, web3ApiVersionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';


export type UseEvmWeb3ApiVersionParams = Web3ApiVersionRequest;
export type UseEvmWeb3ApiVersionQueryOptions = QueryOptions<Web3ApiVersionResponse, UseEvmWeb3ApiVersionParams>;

export function useEvmWeb3ApiVersion(queryOptions: UseEvmWeb3ApiVersionQueryOptions = {}) {
  const resolver = useOperationResolver(web3ApiVersionOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, Web3ApiVersionRequest] = useMemo(() => {
    return [
      web3ApiVersionOperation.id,
      {
        
      },
    ];
  }, []);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    enabled: queryOptions.enabled,
  });
}