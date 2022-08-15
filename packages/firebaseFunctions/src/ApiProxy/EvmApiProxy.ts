import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import Moralis from 'moralis';
import { EndpointProxy } from './EndpointProxy';
import { createApiProxy, FirebaseFunctions, OnCallMiddleware } from './ApiProxy';

type EvmApiDomains = Exclude<keyof MoralisEvmApi, keyof ApiModule | 'endpoints'>;
export type EvmApiEndpointName = { [Key in EvmApiDomains]: keyof MoralisEvmApi[Key] }[EvmApiDomains];

export function createEvmApiProxy(
  endpointNames: EvmApiEndpointName[],
  userMiddleware: OnCallMiddleware | null,
  core?: MoralisCore,
): FirebaseFunctions {
  const finalCore = core ?? MoralisCoreProvider.getDefault();
  const baseUrl = finalCore.getModule<MoralisEvmApi>(MoralisEvmApi.moduleName).baseUrl;

  const descriptors = Moralis.EvmApi.endpoints
    .getDescriptors()
    .filter((descriptor) => endpointNames.includes(descriptor.name as EvmApiEndpointName));

  const proxy = new EndpointProxy(baseUrl, finalCore.config);
  return createApiProxy(descriptors, proxy, userMiddleware);
}
