// $ref: #/components/schemas/NFTOwnerResponse/properties/token_properties
// typeName: NFTOwnerResponse_token_properties

export type AptosNFTOwnerResponseTokenPropertiesJSON = object;
export type AptosNFTOwnerResponseTokenPropertiesInput = AptosNFTOwnerResponseTokenPropertiesJSON;

export class AptosNFTOwnerResponseTokenProperties {
  public static create(input: AptosNFTOwnerResponseTokenPropertiesInput | AptosNFTOwnerResponseTokenProperties) {
    if (input instanceof AptosNFTOwnerResponseTokenProperties) {
      return input;
    }
    return new AptosNFTOwnerResponseTokenProperties(input);
  }

  public static fromJSON(json: AptosNFTOwnerResponseTokenPropertiesJSON) {
    return new AptosNFTOwnerResponseTokenProperties(json);
  }

  public constructor(public readonly value: AptosNFTOwnerResponseTokenPropertiesInput) {}

  public toJSON(): AptosNFTOwnerResponseTokenPropertiesJSON {
    return this.value;
  }
}
