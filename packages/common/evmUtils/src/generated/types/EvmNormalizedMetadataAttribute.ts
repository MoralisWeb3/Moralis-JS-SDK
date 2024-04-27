import { EvmNormalizedMetadataAttributeValue, EvmNormalizedMetadataAttributeValueValue, EvmNormalizedMetadataAttributeValueInput, EvmNormalizedMetadataAttributeValueJSON } from '../types/EvmNormalizedMetadataAttributeValue';

// $ref: #/components/schemas/normalizedMetadataAttribute
// type: normalizedMetadataAttribute
// properties:
// - trait_type ($ref: #/components/schemas/normalizedMetadataAttribute/properties/trait_type)
// - value ($ref: #/components/schemas/normalizedMetadataAttribute/properties/value)
// - display_type ($ref: #/components/schemas/normalizedMetadataAttribute/properties/display_type)
// - max_value ($ref: #/components/schemas/normalizedMetadataAttribute/properties/max_value)
// - trait_count ($ref: #/components/schemas/normalizedMetadataAttribute/properties/trait_count)
// - order ($ref: #/components/schemas/normalizedMetadataAttribute/properties/order)

export interface EvmNormalizedMetadataAttributeJSON {
  readonly trait_type?: string;
  readonly value?: EvmNormalizedMetadataAttributeValueJSON;
  readonly display_type?: string;
  readonly max_value?: number;
  readonly trait_count?: number;
  readonly order?: number;
}

export interface EvmNormalizedMetadataAttributeInput {
  readonly traitType?: string;
  readonly value?: EvmNormalizedMetadataAttributeValueInput | EvmNormalizedMetadataAttributeValueValue;
  readonly displayType?: string;
  readonly maxValue?: number;
  readonly traitCount?: number;
  readonly order?: number;
}

export class EvmNormalizedMetadataAttribute {
  public static create(input: EvmNormalizedMetadataAttributeInput | EvmNormalizedMetadataAttribute): EvmNormalizedMetadataAttribute {
    if (input instanceof EvmNormalizedMetadataAttribute) {
      return input;
    }
    return new EvmNormalizedMetadataAttribute(input);
  }

  public static fromJSON(json: EvmNormalizedMetadataAttributeJSON): EvmNormalizedMetadataAttribute {
    const input: EvmNormalizedMetadataAttributeInput = {
      traitType: json.trait_type,
      value: json.value ? EvmNormalizedMetadataAttributeValue.fromJSON(json.value) : undefined,
      displayType: json.display_type,
      maxValue: json.max_value,
      traitCount: json.trait_count,
      order: json.order,
    };
    return EvmNormalizedMetadataAttribute.create(input);
  }

  /**
   * @description The trait title or descriptor
   */
  public readonly traitType?: string;
  /**
   * @description The value of the attribute
   */
  public readonly value?: EvmNormalizedMetadataAttributeValueValue;
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

  private constructor(input: EvmNormalizedMetadataAttributeInput) {
    this.traitType = input.traitType;
    this.value = input.value ? EvmNormalizedMetadataAttributeValue.create(input.value) : undefined;
    this.displayType = input.displayType;
    this.maxValue = input.maxValue;
    this.traitCount = input.traitCount;
    this.order = input.order;
  }

  public toJSON(): EvmNormalizedMetadataAttributeJSON {
    return {
      trait_type: this.traitType,
      value: this.value ? this.value : undefined,
      display_type: this.displayType,
      max_value: this.maxValue,
      trait_count: this.traitCount,
      order: this.order,
    }
  }
}
