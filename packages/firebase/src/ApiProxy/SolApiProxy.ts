import { MoralisCore, ApiModule, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { EndpointProxy } from './EndpointProxy';
import Moralis from 'moralis';
import { createApiProxy, FirebaseFunctions, OnCallMiddleware } from './ApiProxy';

type SolApiDomains = Exclude<keyof MoralisSolApi, keyof ApiModule | 'endpoints'>;
export type SolApiEndpointName = { [Key in SolApiDomains]: keyof MoralisSolApi[Key] }[SolApiDomains];

export function createSolApiProxy(
  endpointNames: SolApiEndpointName[],
  userMiddleware: OnCallMiddleware | null,
  core?: MoralisCore,
): FirebaseFunctions {
  const finalCore = core ?? MoralisCoreProvider.getDefault();
  const baseUrl = finalCore.getModule<MoralisSolApi>(MoralisSolApi.moduleName).baseUrl;

  const descriptors = Moralis.SolApi.endpoints
    .getDescriptors()
    .filter(descriptor => endpointNames.includes(descriptor.name as SolApiEndpointName));

  const proxy = new EndpointProxy(baseUrl, finalCore.config);
  return createApiProxy(descriptors, proxy, userMiddleware);
}
