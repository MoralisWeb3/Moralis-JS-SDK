// $ref: #/components/schemas/normalizedMetadataAttribute/properties/value

export type AptNormalizedMetadataAttributeValueJSON = object;
export type AptNormalizedMetadataAttributeValueInput = AptNormalizedMetadataAttributeValueJSON;

export class AptNormalizedMetadataAttributeValue {
  public static create(input: AptNormalizedMetadataAttributeValueInput) {
    return new AptNormalizedMetadataAttributeValue(input);
  }

  public static fromJSON(json: AptNormalizedMetadataAttributeValueJSON) {
    return new AptNormalizedMetadataAttributeValue(json);
  }

  public constructor(public readonly value: AptNormalizedMetadataAttributeValueInput) {}

  public toJSON(): AptNormalizedMetadataAttributeValueJSON {
    return this.value;
  }
}
