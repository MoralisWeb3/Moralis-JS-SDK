// $ref: #/components/schemas/NFTTokenResponse/properties/default_properties
// typeName: NFTTokenResponse_default_properties

export type AptosNFTTokenResponseDefaultPropertiesJSON = object;
export type AptosNFTTokenResponseDefaultPropertiesInput = AptosNFTTokenResponseDefaultPropertiesJSON;

export class AptosNFTTokenResponseDefaultProperties {
  public static create(input: AptosNFTTokenResponseDefaultPropertiesInput | AptosNFTTokenResponseDefaultProperties) {
    if (input instanceof AptosNFTTokenResponseDefaultProperties) {
      return input;
    }
    return new AptosNFTTokenResponseDefaultProperties(input);
  }

  public static fromJSON(json: AptosNFTTokenResponseDefaultPropertiesJSON) {
    return new AptosNFTTokenResponseDefaultProperties(json);
  }

  public constructor(public readonly value: AptosNFTTokenResponseDefaultPropertiesInput) {}

  public toJSON(): AptosNFTTokenResponseDefaultPropertiesJSON {
    return this.value;
  }
}
