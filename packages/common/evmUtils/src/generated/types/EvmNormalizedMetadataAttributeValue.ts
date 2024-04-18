// $ref: #/components/schemas/normalizedMetadataAttribute/properties/value
// typeName: normalizedMetadataAttribute_value

export type EvmNormalizedMetadataAttributeValueJSON = object;
export type EvmNormalizedMetadataAttributeValueInput = object;
export type EvmNormalizedMetadataAttributeValueValue = object;

export abstract class EvmNormalizedMetadataAttributeValue {
  public static create(input: EvmNormalizedMetadataAttributeValueInput | EvmNormalizedMetadataAttributeValueValue): EvmNormalizedMetadataAttributeValueValue {
    return input;
  }

  public static fromJSON(json: EvmNormalizedMetadataAttributeValueJSON): EvmNormalizedMetadataAttributeValueValue {
    return json;
  }
}
