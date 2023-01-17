import Core, {
  RequestController,
  Operation,
  OperationRequestBody,
  OperationRequestValidator,
  ResponseAdapter,
} from '@moralisweb3/common-core';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export class OperationResolver<Request, JSONRequest, Response, JSONResponse> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: Operation<Request, JSONRequest, Response, JSONResponse>,
    private readonly baseUrl: string,
    private readonly core: Core,
  ) {
    if (operation.isNullable) {
      throw new Error(`Operation ${operation.name} has invalid value for isNullable property`);
    }
  }

  public readonly fetch = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse>> => {
    this.requestValidator.validate(request);

    const { url, urlSearchParams } = this.requestBuilder.prepareUrl(this.baseUrl, request);
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: JSONResponse = await this.requestController.request<OperationRequestBody | null, JSONResponse>({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    return new ResponseAdapter(jsonResponse, () =>
      this.operation.deserializeResponse(jsonResponse, request, this.core),
    );
  };
}