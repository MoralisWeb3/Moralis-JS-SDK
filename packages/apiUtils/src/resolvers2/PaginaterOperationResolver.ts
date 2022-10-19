import MoralisCore, {
  PaginatedRequest,
  OperationRequestValidator,
  RequestController,
  PaginatedJSONResponse,
  PaginatedOperation,
} from '@moralisweb3/core';
import { OperationRequestBuilder } from './OperationRequestBuilder';
import { PaginatedResponseAdapter } from './PaginatedResponseAdapter';

export class PaginatedOperationResolver<
  Request extends PaginatedRequest,
  JSONRequest,
  Result,
  JSONResult extends PaginatedJSONResponse<JSONResult>,
> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
    private readonly baseUrl: string,
    private readonly core: MoralisCore,
  ) {}

  public readonly fetch = async (request: Request): Promise<PaginatedResponseAdapter<Result, JSONResult>> => {
    this.requestValidator.validate(request);

    const { urlPath, urlSearchParams } = this.requestBuilder.prepareUrl(request);
    const url = `${this.baseUrl}${urlPath}`;
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: PaginatedJSONResponse<JSONResult> = await this.requestController.request({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    const nextRequest = this.tryGetNextRequest(request, jsonResponse);

    return new PaginatedResponseAdapter(
      jsonResponse.result,
      this.operation.deserializeResponse,
      this.core,
      nextRequest ? () => this.fetch(nextRequest) : undefined,
    );
  };

  private tryGetNextRequest = (request: Request, jsonResponse: PaginatedJSONResponse<JSONResult>) => {
    const firstPageIndex = this.operation.firstPageIndex ?? 1;

    const currentPage = firstPageIndex === 1 ? jsonResponse.page : jsonResponse.page + 1;
    const hasNextPage = jsonResponse.total > jsonResponse.page_size * currentPage;
    if (!hasNextPage) {
      return null;
    }

    const nextRequest = { ...request };
    if (request.cursor) {
      nextRequest.cursor = request.cursor;
    } else {
      nextRequest.offset = (jsonResponse.page + 1) * (nextRequest.limit || 500);
    }
    return nextRequest;
  };
}
