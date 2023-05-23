import { GetTokenPriceOperation, GetTokenPriceOperationRequest, GetTokenPriceOperationRequestJSON } from '../operations/GetTokenPriceOperation';
import { SolSPLTokenPrice, SolSPLTokenPriceJSON } from '../types/SolSPLTokenPrice';

export interface OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON> {
  operationId: string;
  groupName: string;
  httpMethod: string;
  routePattern: string;
  parameterNames: string[];
  hasResponse: boolean;
  hasBody: boolean;
  serializeRequest?: (request: Request) => RequestJSON;
  parseResponse?: (json: ResponseJSON) => Response;
  serializeBody?: (body: Body) => BodyJSON;
}

export abstract class AbstractClient {
  protected abstract createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>
  ): (request: Request) => Promise<Response>;
  protected abstract createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>
  ): (request: Request, body: Body) => Promise<Response>;

  public readonly token = {
    /**
     * @description Gets the token price (usd and native) for a given contract address and network.
     * @param request Request with parameters.
     * @param {Object} request.network The network to query
     * @param {Object} request.address The address of the token contract
     * @returns {Object} Response for the request.
     */
    getTokenPrice: this.createEndpoint<
      GetTokenPriceOperationRequest,
      GetTokenPriceOperationRequestJSON,
      SolSPLTokenPrice,
      SolSPLTokenPriceJSON
    >(GetTokenPriceOperation),
  };
}
