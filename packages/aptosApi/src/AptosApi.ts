import { Core, CoreProvider, RequestController } from '@moralisweb3/common-core';
import { AbstractClient, AptosNetworkResolver, OperationV3, AptosNetworkInput } from '@moralisweb3/common-aptos-utils';
import { OperationV3Resolver, OperationV3UrlBaseResolver } from './OperationV3Resolver';

const MAINNET_BASE_URL = 'https://aptos-mainnet.aws-prod-api-1.moralis.io';
const TESTNET_BASE_URL = 'https://aptos-testnet.aws-prod-api-1.moralis.io';

export class AptosApi extends AbstractClient {
  public static readonly moduleName = 'aptApi';

  public static create(core?: Core): AptosApi {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const requestController = RequestController.create(core);
    const baseUrlResolver = new AptosApiBaseUrlResolver(core);
    const operationResolver = new OperationV3Resolver(baseUrlResolver, core.config, requestController);
    return new AptosApi(operationResolver);
  }

  private constructor(private readonly operationResolver: OperationV3Resolver) {
    super();
  }

  protected createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>,
  ): (r: Request) => Promise<Response> {
    return (request: Request) => {
      return this.operationResolver.resolve(request, null, operation);
    };
  }

  protected createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
  ): (r: Request, b: Body) => Promise<Response> {
    return (request: Request, body: Body) => {
      return this.operationResolver.resolve(request, body, operation);
    };
  }
}

class AptosApiBaseUrlResolver implements OperationV3UrlBaseResolver {
  public constructor(private readonly core: Core) {}

  public resolve(request: unknown): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const network = (request as any).network as AptosNetworkInput | undefined;
    if (network) {
      switch (AptosNetworkResolver.resolve(network, this.core)) {
        case 'mainnet':
          return MAINNET_BASE_URL;
        case 'testnet':
          return TESTNET_BASE_URL;
        default:
          throw new Error('Not supported network');
      }
    }
    return MAINNET_BASE_URL;
  }
}
