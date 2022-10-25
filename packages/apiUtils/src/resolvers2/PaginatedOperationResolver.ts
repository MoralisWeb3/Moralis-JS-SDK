import MoralisCore, {
  PaginatedRequest,
  OperationRequestValidator,
  RequestController,
  PaginatedJSONResponse,
  PaginatedOperation,
} from '@moralisweb3/common-core';
import { OperationRequestBuilder } from './OperationRequestBuilder';
import { PaginatedResponseAdapter } from './PaginatedResponseAdapter';
import { Pagination, readPagination } from './Pagination';

export class PaginatedOperationResolver<Request extends PaginatedRequest, JSONRequest, Result, JSONResult> {
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

    const pagination = readPagination(jsonResponse);
    const nextRequest = this.tryGetNextRequest(request, pagination, jsonResponse.cursor);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => this.operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.fetch(nextRequest) : undefined,
    );
  };

  private tryGetNextRequest = (
    request: Request,
    pagination: Pagination,
    cursor: string | undefined,
  ): Request | null => {
    const currentPage = this.operation.firstPageIndex === 1 ? pagination.page : pagination.page + 1;
    const hasNextPage = pagination.total > pagination.pageSize * currentPage;
    if (!hasNextPage) {
      return null;
    }

    const nextParams = { ...request };
    if (cursor) {
      nextParams.cursor = cursor;
    } else {
      nextParams.offset = (pagination.page + 1) * (nextParams.limit || 500);
    }
    return nextParams;
  };
}
