import { AptTokenItem, AptTokenItemJSON } from '../types/AptTokenItem';

// $ref: #/components/schemas/GetMultipleNftsDto

export interface AptGetMultipleNftsDtoJSON {
  readonly tokens: AptTokenItemJSON[];
  readonly normalizeMetadata?: boolean;
}

export interface AptGetMultipleNftsDtoInput {
  readonly tokens: AptTokenItem[];
  readonly normalizeMetadata?: boolean;
}

export class AptGetMultipleNftsDto {
  public static create(input: AptGetMultipleNftsDtoInput): AptGetMultipleNftsDto {
    return new AptGetMultipleNftsDto(input);
  }

  public static fromJSON(json: AptGetMultipleNftsDtoJSON): AptGetMultipleNftsDto {
    const input: AptGetMultipleNftsDtoInput = {
      tokens: json.tokens.map((item) => AptTokenItem.fromJSON(item)),
      normalizeMetadata: json.normalizeMetadata,
    };
    return AptGetMultipleNftsDto.create(input);
  }

  /**
   * @description The tokens to be fetched (max 25 tokens)
   */
  public readonly tokens: AptTokenItem[];
  /**
   * @description Should normalized metadata be returned?
   */
  public readonly normalizeMetadata?: boolean;

  private constructor(input: AptGetMultipleNftsDtoInput) {
    this.tokens = input.tokens;
    this.normalizeMetadata = input.normalizeMetadata;
  }

  public toJSON(): AptGetMultipleNftsDtoJSON {
    return {
      tokens: this.tokens.map((item) => item.toJSON()),
      normalizeMetadata: this.normalizeMetadata,
    }
  }
}
