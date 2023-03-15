// $ref: #/components/schemas/NFTOwnerResponse/properties/token_properties
// typeName: NFTOwnerResponse_token_properties

export type AptosNFTOwnerResponseTokenPropertiesJSON = object;
export type AptosNFTOwnerResponseTokenPropertiesInput = object;
export type AptosNFTOwnerResponseTokenPropertiesValue = object;

export abstract class AptosNFTOwnerResponseTokenProperties {
  public static create(input: AptosNFTOwnerResponseTokenPropertiesInput | AptosNFTOwnerResponseTokenPropertiesValue): AptosNFTOwnerResponseTokenPropertiesValue {
    return input;
  }

  public static fromJSON(json: AptosNFTOwnerResponseTokenPropertiesJSON): AptosNFTOwnerResponseTokenPropertiesValue {
    return json;
  }
}
