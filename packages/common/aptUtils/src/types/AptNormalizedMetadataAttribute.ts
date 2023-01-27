import {
  AptNormalizedMetadataAttributeValue,
  AptNormalizedMetadataAttributeValueJSON,
} from '../types/AptNormalizedMetadataAttributeValue';

// $ref: #/components/schemas/normalizedMetadataAttribute

export interface AptNormalizedMetadataAttributeJSON {
  readonly trait_type?: string;
  readonly value?: AptNormalizedMetadataAttributeValueJSON;
  readonly display_type?: string;
  readonly max_value?: number;
  readonly trait_count?: number;
  readonly order?: number;
}

export interface AptNormalizedMetadataAttributeInput {
  readonly traitType?: string;
  readonly value?: AptNormalizedMetadataAttributeValue;
  readonly displayType?: string;
  readonly maxValue?: number;
  readonly traitCount?: number;
  readonly order?: number;
}

export class AptNormalizedMetadataAttribute {
  public static create(input: AptNormalizedMetadataAttributeInput): AptNormalizedMetadataAttribute {
    return new AptNormalizedMetadataAttribute(input);
  }

  public static fromJSON(json: AptNormalizedMetadataAttributeJSON): AptNormalizedMetadataAttribute {
    const input: AptNormalizedMetadataAttributeInput = {
      traitType: json.trait_type,
      value: json.value ? AptNormalizedMetadataAttributeValue.fromJSON(json.value) : undefined,
      displayType: json.display_type,
      maxValue: json.max_value,
      traitCount: json.trait_count,
      order: json.order,
    };
    return AptNormalizedMetadataAttribute.create(input);
  }

  /**
   * @description The trait title or descriptor
   */
  public readonly traitType?: string;
  /**
   * @description The value of the attribute
   */
  public readonly value?: AptNormalizedMetadataAttributeValue;
  /**
   * @description The type the attribute value should be displayed as
   */
  public readonly displayType?: string;
  /**
   * @description For numeric values, the upper range
   */
  public readonly maxValue?: number;
  /**
   * @description The number of possible values for this trait
   */
  public readonly traitCount?: number;
  /**
   * @description Order the trait should appear in the attribute list.
   */
  public readonly order?: number;

  private constructor(input: AptNormalizedMetadataAttributeInput) {
    this.traitType = input.traitType;
    this.value = input.value;
    this.displayType = input.displayType;
    this.maxValue = input.maxValue;
    this.traitCount = input.traitCount;
    this.order = input.order;
  }

  public toJSON(): AptNormalizedMetadataAttributeJSON {
    return {
      trait_type: this.traitType,
      value: this.value ? this.value.toJSON() : undefined,
      display_type: this.displayType,
      max_value: this.maxValue,
      trait_count: this.traitCount,
      order: this.order,
    };
  }
}
