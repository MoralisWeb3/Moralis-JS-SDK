// $ref: #/components/schemas/GetAccountResourceResponse/properties/data
// typeName: GetAccountResourceResponse_data

export type AptosGetAccountResourceResponseDataJSON = object;
export type AptosGetAccountResourceResponseDataInput = object;
export type AptosGetAccountResourceResponseDataValue = object;

export abstract class AptosGetAccountResourceResponseData {
  public static create(input: AptosGetAccountResourceResponseDataInput | AptosGetAccountResourceResponseDataValue): AptosGetAccountResourceResponseDataValue {
    return input;
  }

  public static fromJSON(json: AptosGetAccountResourceResponseDataJSON): AptosGetAccountResourceResponseDataValue {
    return json;
  }
}
