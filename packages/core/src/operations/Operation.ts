import { MoralisCore } from '../MoralisCore';

export interface Operation<Request, JSONRequest, Response, JSONResponse> {
  name: string;
  groupName: string;
  method: OperationRequestMethod;
  urlPathPattern: string;
  urlPathParamNames: (keyof Request)[];
  urlSearchParamNames?: (keyof Request)[];
  bodyType?: OperationBodyType;
  bodyParamNames?: (keyof Request)[];
  firstPageIndex?: number;

  getRequestUrlParams(request: Request, core: MoralisCore): OperationRequestUrlParams;
  getRequestBody?(request: Request, core: MoralisCore): OperationRequestBody;
  deserializeResponse(jsonResponse: JSONResponse, core: MoralisCore): Response;
  serializeRequest(request: Request, core: MoralisCore): JSONRequest;
  deserializeRequest(jsonRequest: JSONRequest, core: MoralisCore): Request;
}

export type OperationRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type OperationBodyType = 'properties' | 'raw';
export type OperationRequestUrlParams = Record<string, string>;
export type OperationRequestBody = OperationRequestPropertiesBody | OperationRequestRawBody;
export type OperationRequestPropertiesBody = Record<string, unknown>;
export type OperationRequestRawBody = string | number | boolean | object;
