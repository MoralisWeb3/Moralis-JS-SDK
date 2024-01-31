import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/tokenPriceItem
// type: tokenPriceItem
// properties:
// - token_address ($ref: #/components/schemas/tokenPriceItem/properties/token_address)
// - exchange ($ref: #/components/schemas/tokenPriceItem/properties/exchange)
// - to_block ($ref: #/components/schemas/tokenPriceItem/properties/to_block)

export interface EvmTokenPriceItemJSON {
  readonly token_address: EvmAddressJSON;
  readonly exchange?: string;
  readonly to_block?: string;
}

export interface EvmTokenPriceItemInput {
  readonly tokenAddress: EvmAddressInput | EvmAddress;
  readonly exchange?: string;
  readonly toBlock?: string;
}

export class EvmTokenPriceItem {
  public static create(input: EvmTokenPriceItemInput | EvmTokenPriceItem): EvmTokenPriceItem {
    if (input instanceof EvmTokenPriceItem) {
      return input;
    }
    return new EvmTokenPriceItem(input);
  }

  public static fromJSON(json: EvmTokenPriceItemJSON): EvmTokenPriceItem {
    const input: EvmTokenPriceItemInput = {
      tokenAddress: EvmAddress.fromJSON(json.token_address),
      exchange: json.exchange,
      toBlock: json.to_block,
    };
    return EvmTokenPriceItem.create(input);
  }

  /**
   * @description The contract address
   */
  public readonly tokenAddress: EvmAddress;
  /**
   * @description The exchange
   */
  public readonly exchange?: string;
  /**
   * @description The block number
   */
  public readonly toBlock?: string;

  private constructor(input: EvmTokenPriceItemInput) {
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
    this.exchange = input.exchange;
    this.toBlock = input.toBlock;
  }

  public toJSON(): EvmTokenPriceItemJSON {
    return {
      token_address: this.tokenAddress.toJSON(),
      exchange: this.exchange,
      to_block: this.toBlock,
    }
  }
}
