import { Core, CoreProvider, OperationV3 } from '@moralisweb3/common-core';
import { AbstractClient, AptosNetworkResolver, AptosNetworkInput } from '@moralisweb3/common-aptos-utils';
import { OperationV3Resolver } from '@moralisweb3/api-utils';

const MAINNET_BASE_URL = 'https://aptos-mainnet.aws-prod-api-1.moralis.io';
const TESTNET_BASE_URL = 'https://aptos-testnet.aws-prod-api-1.moralis.io';

export class AptosApi extends AbstractClient {
  public static readonly moduleName = 'aptApi';

  public static create(core?: Core): AptosApi {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    return new AptosApi(core);
  }

  private constructor(private readonly core: Core) {
    super();
  }

  protected createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>,
  ): (r: Request) => Promise<Response> {
    return (request: Request) => {
      const resolver = new OperationV3Resolver(operation, createBaseUrlResolver(this.core), this.core);
      return resolver.resolve(request, null);
    };
  }

  protected createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
  ): (r: Request, b: Body) => Promise<Response> {
    return (request: Request, body: Body) => {
      const resolver = new OperationV3Resolver(operation, createBaseUrlResolver(this.core), this.core);
      return resolver.resolve(request, body);
    };
  }
}

function createBaseUrlResolver(core: Core) {
  return (request: unknown): string => {
    const { network } = request as { network: AptosNetworkInput | undefined };
    if (network) {
      const finalNetwork = AptosNetworkResolver.resolve(network, core);
      switch (finalNetwork) {
        case 'mainnet':
          return MAINNET_BASE_URL;
        case 'testnet':
          return TESTNET_BASE_URL;
        default:
          throw new Error('Not supported network');
      }
    }
    return MAINNET_BASE_URL;
  };
}
