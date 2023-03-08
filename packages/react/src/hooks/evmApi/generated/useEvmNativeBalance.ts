import { OperationResolver } from "@moralisweb3/api-utils";
import Moralis from "moralis";
import { GetNativeBalanceRequest, GetNativeBalanceResponse, getNativeBalanceOperation } from "moralis/common-evm-utils";
import { useMemo } from "react";
import { _useMoralisContext } from "../../../context/MoralisProvider";
import { UseQueryOptions, useQuery } from "../../useQuery";

export type UseEvmNativeBalanceParams = UseQueryOptions<GetNativeBalanceResponse, Error, GetNativeBalanceResponse, [string, GetNativeBalanceRequest]> &
    Partial<GetNativeBalanceRequest>

export function useEvmNativeBalance({
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    suspense,
    staleTime,
    address,
    chain,
    toBlock,
}: UseEvmNativeBalanceParams = {}) {
    const { core } = _useMoralisContext();
    const resolver = useMemo(() => {
        return new OperationResolver(getNativeBalanceOperation, Moralis.EvmApi.baseUrl, core)
    }, [core]);

    const isRequiredParamsProvided = useMemo(() => {
        return Boolean(address)
    }, [address])

    const queryKey: [string, GetNativeBalanceRequest] | undefined = useMemo(() => {
        if (address) {
            return [
                getNativeBalanceOperation.id,
                {
                address,
                chain,
                toBlock,
            }];
        };
        return undefined;
    }, [
        address,
        chain,
        toBlock,
    ])

    return useQuery({
        queryKey,
        queryFn: async ({ queryKey: [_id, req] }) => {
            const { result } = await resolver.fetch(req);
            return result;
        },
        cacheTime,
        enabled: isRequiredParamsProvided && enabled,
        onError,
        onSettled,
        onSuccess,
        staleTime,
        refetchInterval,
        suspense,
    });
}
