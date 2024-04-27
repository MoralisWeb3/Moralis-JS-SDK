import { EvmNormalizedMetadataAttribute, EvmNormalizedMetadataAttributeInput, EvmNormalizedMetadataAttributeJSON } from '../types/EvmNormalizedMetadataAttribute';

// $ref: #/components/schemas/normalizedMetadata
// type: normalizedMetadata
// properties:
// - name ($ref: #/components/schemas/normalizedMetadata/properties/name)
// - description ($ref: #/components/schemas/normalizedMetadata/properties/description)
// - image ($ref: #/components/schemas/normalizedMetadata/properties/image)
// - external_link ($ref: #/components/schemas/normalizedMetadata/properties/external_link)
// - animation_url ($ref: #/components/schemas/normalizedMetadata/properties/animation_url)
// - attributes ($ref: #/components/schemas/normalizedMetadataAttribute)

export interface EvmNormalizedMetadataJSON {
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly external_link?: string;
  readonly animation_url?: string;
  readonly attributes?: EvmNormalizedMetadataAttributeJSON[];
}

export interface EvmNormalizedMetadataInput {
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly externalLink?: string;
  readonly animationUrl?: string;
  readonly attributes?: EvmNormalizedMetadataAttributeInput[] | EvmNormalizedMetadataAttribute[];
}

export class EvmNormalizedMetadata {
  public static create(input: EvmNormalizedMetadataInput | EvmNormalizedMetadata): EvmNormalizedMetadata {
    if (input instanceof EvmNormalizedMetadata) {
      return input;
    }
    return new EvmNormalizedMetadata(input);
  }

  public static fromJSON(json: EvmNormalizedMetadataJSON): EvmNormalizedMetadata {
    const input: EvmNormalizedMetadataInput = {
      name: json.name,
      description: json.description,
      image: json.image,
      externalLink: json.external_link,
      animationUrl: json.animation_url,
      attributes: json.attributes ? json.attributes.map((item) => EvmNormalizedMetadataAttribute.fromJSON(item)) : undefined,
    };
    return EvmNormalizedMetadata.create(input);
  }

  /**
   * @description The name or title of the NFT
   */
  public readonly name?: string;
  /**
   * @description A detailed description of the NFT
   */
  public readonly description?: string;
  /**
   * @description The URL of the NFT's image
   */
  public readonly image?: string;
  /**
   * @description A link to additional information
   */
  public readonly externalLink?: string;
  /**
   * @description An animated version of the NFT's image
   */
  public readonly animationUrl?: string;
  public readonly attributes?: EvmNormalizedMetadataAttribute[];

  private constructor(input: EvmNormalizedMetadataInput) {
    this.name = input.name;
    this.description = input.description;
    this.image = input.image;
    this.externalLink = input.externalLink;
    this.animationUrl = input.animationUrl;
    this.attributes = input.attributes ? input.attributes.map((item) => EvmNormalizedMetadataAttribute.create(item)) : undefined;
  }

  public toJSON(): EvmNormalizedMetadataJSON {
    return {
      name: this.name,
      description: this.description,
      image: this.image,
      external_link: this.externalLink,
      animation_url: this.animationUrl,
      attributes: this.attributes ? this.attributes.map((item) => item.toJSON()) : undefined,
    }
  }
}
