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
import { ApiClient } from '@moralisweb3/client-backend-adapter-utils';

export class FirebaseApiClient implements ApiClient {
  private readonly functionName: string;

  public constructor(
    private readonly functions: Functions,
    private readonly core: Core,
    functionNamePrefix: string | undefined,
  ) {
    this.functionName = (functionNamePrefix || 'ext-moralis-api-').concat('call');
  }

  public async request<Request, JSONRequest, Response, JSONResponse>(
    callingModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
      request: jsonRequest,
    });

    return new ResponseAdapter(jsonResponse.data, () => {
      return operation.deserializeResponse(jsonResponse.data, request, this.core);
    });
  }

  public async requestNullable<Request, JSONRequest, Response, JSONResponse>(
    callingModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse | null>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
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

  public async requestPaginated<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    callingModuleName: string,
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const response = await httpsCallable<CallRequest<JSONRequest>, PaginatedJSONResponse<JSONResult>>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
      request: jsonRequest,
    });
    const jsonResponse = response.data;

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(operation.firstPageIndex, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.requestPaginated(callingModuleName, nextRequest, operation) : undefined,
    );
  }
}

interface CallRequest<OperationJSONRequest> {
  operationName: string;
  moduleName: string;
  request: OperationJSONRequest;
}
