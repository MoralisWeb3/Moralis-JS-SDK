import { AptosGetAccountResourceResponseData, AptosGetAccountResourceResponseDataValue, AptosGetAccountResourceResponseDataInput, AptosGetAccountResourceResponseDataJSON } from '../types/AptosGetAccountResourceResponseData';

// $ref: #/components/schemas/GetAccountResourceResponse
// type: GetAccountResourceResponse
// properties:
// - type ($ref: #/components/schemas/GetAccountResourceResponse/properties/type)
// - data ($ref: #/components/schemas/GetAccountResourceResponse/properties/data)

export interface AptosGetAccountResourceResponseJSON {
  readonly type: string;
  readonly data: AptosGetAccountResourceResponseDataJSON;
}

export interface AptosGetAccountResourceResponseInput {
  readonly type: string;
  readonly data: AptosGetAccountResourceResponseDataInput | AptosGetAccountResourceResponseDataValue;
}

export class AptosGetAccountResourceResponse {
  public static create(input: AptosGetAccountResourceResponseInput | AptosGetAccountResourceResponse): AptosGetAccountResourceResponse {
    if (input instanceof AptosGetAccountResourceResponse) {
      return input;
    }
    return new AptosGetAccountResourceResponse(input);
  }

  public static fromJSON(json: AptosGetAccountResourceResponseJSON): AptosGetAccountResourceResponse {
    const input: AptosGetAccountResourceResponseInput = {
      type: json.type,
      data: AptosGetAccountResourceResponseData.fromJSON(json.data),
    };
    return AptosGetAccountResourceResponse.create(input);
  }

  /**
   * @description String representation of a MoveStructTag (on-chain Move struct type). This exists so you can specify MoveStructTags as path / query parameters
   */
  public readonly type: string;
  /**
   * @description This is a JSON representation of some data within an account resource. More specifically, it is a map of strings to arbitrary JSON values / objects, where the keys are top level fields within the given resource.
   */
  public readonly data: AptosGetAccountResourceResponseDataValue;

  private constructor(input: AptosGetAccountResourceResponseInput) {
    this.type = input.type;
    this.data = AptosGetAccountResourceResponseData.create(input.data);
  }

  public toJSON(): AptosGetAccountResourceResponseJSON {
    return {
      type: this.type,
      data: this.data,
    }
  }
}
