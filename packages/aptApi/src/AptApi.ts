import { Core, CoreProvider, RequestController } from '@moralisweb3/common-core';
import { AbstractClient, OperationV3 } from './generated/abstractClient';
import { OperationV3Resolver } from './OperationV3Resolver';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class AptApi extends AbstractClient {
  public static readonly moduleName = 'aptApi';

  public static create(core?: Core): AptApi {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const requestController = RequestController.create(core);
    const operationResolver = new OperationV3Resolver(BASE_URL, core.config, requestController);
    return new AptApi(operationResolver);
  }

  private constructor(private readonly operationResolver: OperationV3Resolver) {
    super();
  }

  protected createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON>,
  ): (r: Request) => Promise<Response> {
    return (request: Request) => {
      return this.operationResolver.resolve(request, operation);
    };
  }
}
