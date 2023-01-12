import { Core } from '../Core';

export interface Operation<Request, JSONRequest, Response, JSONResponse> {
  name: string;
  id: string;
  groupName: string;
  method: OperationRequestMethod;
  urlPathPattern: string;
  urlPathParamNames?: (keyof Request)[];
  urlSearchParamNames?: (keyof Request)[];
  bodyType?: OperationBodyType;
  bodyParamNames?: (keyof Request)[];
  isNullable?: boolean;
  firstPageIndex?: number;

  getRequestUrlParams(request: Request, core: Core): OperationRequestUrlParams;
  getRequestBody?(request: Request, core: Core): OperationRequestBody;
  deserializeResponse(jsonResponse: JSONResponse, request: Request, core: Core): Response;
  serializeRequest(request: Request, core: Core): JSONRequest;
  deserializeRequest(jsonRequest: JSONRequest, core: Core): Request;
}

export type OperationRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type OperationBodyType = 'properties' | 'raw';
export type OperationRequestUrlParams = Record<string, string | string[] | boolean | undefined>;
export type OperationRequestBody = OperationRequestPropertiesBody | OperationRequestRawBody;
export type OperationRequestPropertiesBody = Record<string, unknown>;
export type OperationRequestRawBody = string | number | boolean | object;

export type UnknownOperation = Operation<unknown, unknown, unknown, unknown>;
