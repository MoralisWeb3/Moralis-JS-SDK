// $ref: #/components/schemas/NFTTokenResponse/properties/default_properties
// typeName: NFTTokenResponse_default_properties

export type AptosNFTTokenResponseDefaultPropertiesJSON = object;
export type AptosNFTTokenResponseDefaultPropertiesInput = object;
export type AptosNFTTokenResponseDefaultPropertiesValue = object;

export abstract class AptosNFTTokenResponseDefaultProperties {
  public static create(input: AptosNFTTokenResponseDefaultPropertiesInput | AptosNFTTokenResponseDefaultPropertiesValue): AptosNFTTokenResponseDefaultPropertiesValue {
    return input;
  }

  public static fromJSON(json: AptosNFTTokenResponseDefaultPropertiesJSON): AptosNFTTokenResponseDefaultPropertiesValue {
    return json;
  }
}
