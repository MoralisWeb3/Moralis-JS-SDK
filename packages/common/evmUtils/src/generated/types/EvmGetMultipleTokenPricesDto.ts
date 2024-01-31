import { EvmTokenPriceItem, EvmTokenPriceItemInput, EvmTokenPriceItemJSON } from '../types/EvmTokenPriceItem';

// $ref: #/components/schemas/GetMultipleTokenPricesDto
// type: GetMultipleTokenPricesDto
// properties:
// - tokens ($ref: #/components/schemas/tokenPriceItem)

export interface EvmGetMultipleTokenPricesDtoJSON {
  readonly tokens: EvmTokenPriceItemJSON[];
}

export interface EvmGetMultipleTokenPricesDtoInput {
  readonly tokens: EvmTokenPriceItemInput[] | EvmTokenPriceItem[];
}

export class EvmGetMultipleTokenPricesDto {
  public static create(input: EvmGetMultipleTokenPricesDtoInput | EvmGetMultipleTokenPricesDto): EvmGetMultipleTokenPricesDto {
    if (input instanceof EvmGetMultipleTokenPricesDto) {
      return input;
    }
    return new EvmGetMultipleTokenPricesDto(input);
  }

  public static fromJSON(json: EvmGetMultipleTokenPricesDtoJSON): EvmGetMultipleTokenPricesDto {
    const input: EvmGetMultipleTokenPricesDtoInput = {
      tokens: json.tokens.map((item) => EvmTokenPriceItem.fromJSON(item)),
    };
    return EvmGetMultipleTokenPricesDto.create(input);
  }

  /**
   * @description The tokens to be fetched
   */
  public readonly tokens: EvmTokenPriceItem[];

  private constructor(input: EvmGetMultipleTokenPricesDtoInput) {
    this.tokens = input.tokens.map((item) => EvmTokenPriceItem.create(item));
  }

  public toJSON(): EvmGetMultipleTokenPricesDtoJSON {
    return {
      tokens: this.tokens.map((item) => item.toJSON()),
    }
  }
}
