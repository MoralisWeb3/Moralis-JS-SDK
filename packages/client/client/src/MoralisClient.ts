import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { EvmAuthClient } from '@moralisweb3/client-evm-auth';
import { SolApiClient } from '@moralisweb3/client-sol-api';
import { SolAuthClient } from '@moralisweb3/client-sol-auth';
import { CoreErrorCode, MoralisError } from '@moralisweb3/common-core';
import { Client, ClientOptions } from './Client';

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    throw new MoralisError({
      code: CoreErrorCode.NOT_INITIALIZED,
      message: 'Client is not initialized. Please call the start() method firstly.',
    });
  }
  return client;
}

export class MoralisClient {
  public static start(options?: ClientOptions) {
    if (client) {
      throw new MoralisError({
        code: CoreErrorCode.ALREADY_INITIALIZED,
        message: 'Client is already initialized.',
      });
    }

    client = Client.create(options);
    client.start();
  }

  public static get EvmApi(): EvmApiClient {
    return getClient().evmApi;
  }

  public static get EvmAuth(): EvmAuthClient {
    return getClient().evmAuth;
  }

  public static get SolApi(): SolApiClient {
    return getClient().solApi;
  }

  public static get SolAuth(): SolAuthClient {
    return getClient().solAuth;
  }
}
