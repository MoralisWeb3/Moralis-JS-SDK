import Core, {
  PaginatedRequest,
  OperationRequestValidator,
  RequestController,
  PaginatedJSONResponse,
  PaginatedOperation,
  NextPaginatedRequestResolver,
  PaginationReader,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export class PaginatedOperationResolver<Request extends PaginatedRequest, JSONRequest, Result, JSONResult> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
    private readonly baseUrl: string,
    private readonly core: Core,
  ) {
    if (operation.firstPageIndex !== 0 && operation.firstPageIndex !== 1) {
      throw new Error(`Operation ${operation.name} has invalid value for firstPageIndex property`);
    }
  }

  public readonly fetch = async (request: Request): Promise<PaginatedResponseAdapter<Result, JSONResult>> => {
    this.requestValidator.validate(request);

    const { url, urlSearchParams } = this.requestBuilder.prepareUrl(this.baseUrl, request);
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: PaginatedJSONResponse<JSONResult> = await this.requestController.request({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(this.operation.firstPageIndex, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => this.operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.fetch(nextRequest) : undefined,
    );
  };
}
