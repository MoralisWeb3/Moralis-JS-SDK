import {
  AptNormalizedMetadataAttribute,
  AptNormalizedMetadataAttributeJSON,
} from '../types/AptNormalizedMetadataAttribute';

// $ref: #/components/schemas/normalizedMetadata

export interface AptNormalizedMetadataJSON {
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly external_link?: string;
  readonly animation_url?: string;
  readonly attributes?: AptNormalizedMetadataAttributeJSON[];
}

export interface AptNormalizedMetadataInput {
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly externalLink?: string;
  readonly animationUrl?: string;
  readonly attributes?: AptNormalizedMetadataAttribute[];
}

export class AptNormalizedMetadata {
  public static create(input: AptNormalizedMetadataInput): AptNormalizedMetadata {
    return new AptNormalizedMetadata(input);
  }

  public static fromJSON(json: AptNormalizedMetadataJSON): AptNormalizedMetadata {
    const input: AptNormalizedMetadataInput = {
      name: json.name,
      description: json.description,
      image: json.image,
      externalLink: json.external_link,
      animationUrl: json.animation_url,
      attributes: json.attributes
        ? json.attributes.map((item) => AptNormalizedMetadataAttribute.fromJSON(item))
        : undefined,
    };
    return AptNormalizedMetadata.create(input);
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
  public readonly attributes?: AptNormalizedMetadataAttribute[];

  private constructor(input: AptNormalizedMetadataInput) {
    this.name = input.name;
    this.description = input.description;
    this.image = input.image;
    this.externalLink = input.externalLink;
    this.animationUrl = input.animationUrl;
    this.attributes = input.attributes;
  }

  public toJSON(): AptNormalizedMetadataJSON {
    return {
      name: this.name,
      description: this.description,
      image: this.image,
      external_link: this.externalLink,
      animation_url: this.animationUrl,
      attributes: this.attributes ? this.attributes.map((item) => item.toJSON()) : undefined,
    };
  }
}
