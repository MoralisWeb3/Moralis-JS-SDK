// $ref: #/components/schemas/GetAccountResourceResponse/properties/data
// typeName: GetAccountResourceResponse_data

export type AptosGetAccountResourceResponseDataJSON = object;
export type AptosGetAccountResourceResponseDataInput = AptosGetAccountResourceResponseDataJSON;

export class AptosGetAccountResourceResponseData {
  public static create(input: AptosGetAccountResourceResponseDataInput | AptosGetAccountResourceResponseData) {
    if (input instanceof AptosGetAccountResourceResponseData) {
      return input;
    }
    return new AptosGetAccountResourceResponseData(input);
  }

  public static fromJSON(json: AptosGetAccountResourceResponseDataJSON) {
    return new AptosGetAccountResourceResponseData(json);
  }

  public constructor(public readonly value: AptosGetAccountResourceResponseDataInput) {}

  public toJSON(): AptosGetAccountResourceResponseDataJSON {
    return this.value;
  }
}
