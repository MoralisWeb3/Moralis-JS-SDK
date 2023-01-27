import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptBlockDate, AptBlockDateJSON, AptBlockDateInput } from '../types/AptBlockDate';

export interface AptGetDateToBlockOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly date: string;
}

export interface AptGetDateToBlockOperationRequest {
  readonly chain?: AptChainListInput;
  readonly date: string;
}

/**
 * @description Get the closest block given the date.
 */
export const AptGetDateToBlockOperation = {
  operationId: "getDateToBlock",
  httpMethod: "get",
  routePattern: "/dateToBlock",
  parameterNames: ["chain","date"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptBlockDateJSON): AptBlockDate {
    return AptBlockDate.fromJSON(json);
  },

  serializeRequest(request: AptGetDateToBlockOperationRequest): AptGetDateToBlockOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const date = request.date;
    return {
      chain: chain ? chain.toJSON() : undefined,
      date: date,
    };
  },

}
