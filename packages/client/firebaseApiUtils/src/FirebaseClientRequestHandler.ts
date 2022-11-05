import { ClientRequestHandler } from '@moralisweb3/client-api-utils';
import {
  Core,
  NextPaginatedRequestResolver,
  Operation,
  PaginatedJSONResponse,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  PaginationReader,
  ResponseAdapter,
} from '@moralisweb3/common-core';
import { httpsCallable, Functions } from '@firebase/functions';

export class FirebaseClientRequestHandler implements ClientRequestHandler {
  private readonly functionName: string;

  public constructor(
    private readonly moduleName: string,
    functionNamePrefix: string,
    private readonly functions: Functions,
    private readonly core: Core,
  ) {
    this.functionName = `${functionNamePrefix}call`;
  }

  public async handle<Request, JSONRequest, Response, JSONResponse>(
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: this.moduleName,
      request: jsonRequest,
    });

    return new ResponseAdapter(jsonResponse.data, () => {
      return operation.deserializeResponse(jsonResponse.data, request, this.core);
    });
  }

  public async handleNullable<Request, JSONRequest, Response, JSONResponse>(
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse | null>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: this.moduleName,
      request: jsonRequest,
    });

    if (!jsonResponse.data) {
      return null;
    }
    const data = jsonResponse.data as JSONResponse;
    return new ResponseAdapter<Response, JSONResponse>(data, () => {
      return operation.deserializeResponse(data, request, this.core);
    });
  }

  public async handlePaginated<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const response = await httpsCallable<CallRequest<JSONRequest>, PaginatedJSONResponse<JSONResult>>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: this.moduleName,
      request: jsonRequest,
    });
    const jsonResponse = response.data;

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(operation, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.handlePaginated(nextRequest, operation) : undefined,
    );
  }
}

interface CallRequest<OperationJSONRequest> {
  operationName: string;
  moduleName: string;
  request: OperationJSONRequest;
}
