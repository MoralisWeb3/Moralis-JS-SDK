import { MoralisCore, ApiModule, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { EndpointProxy } from './EndpointProxy';
import { createApiProxy, FirebaseFunctions, OnCallMiddleware } from './ApiProxy';

type SolApiDomains = Exclude<keyof MoralisSolApi, keyof ApiModule | 'endpoints'>;
export type SolApiEndpointName = { [Key in SolApiDomains]: keyof MoralisSolApi[Key] }[SolApiDomains];

export function createSolApiProxy(
  endpointNames: SolApiEndpointName[],
  userMiddleware: OnCallMiddleware | null,
  core?: MoralisCore,
): FirebaseFunctions {
  const finalCore = core ?? MoralisCoreProvider.getDefault();
  const solApi = finalCore.getModule<MoralisSolApi>(MoralisSolApi.moduleName);

  const descriptors = solApi.endpoints
    .getDescriptors()
    .filter((descriptor) => endpointNames.includes(descriptor.name as SolApiEndpointName));

  const proxy = new EndpointProxy(solApi.baseUrl, finalCore.config);
  return createApiProxy(descriptors, proxy, userMiddleware);
}
