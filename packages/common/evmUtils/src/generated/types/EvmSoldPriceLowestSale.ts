import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmSoldPriceLowestSalePaymentToken, EvmSoldPriceLowestSalePaymentTokenInput, EvmSoldPriceLowestSalePaymentTokenJSON } from '../types/EvmSoldPriceLowestSalePaymentToken';

// $ref: #/components/schemas/soldPrice/properties/lowest_sale
// type: soldPrice_lowest_sale
// properties:
// - transaction_hash ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/transaction_hash)
// - block_timestamp ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/block_timestamp)
// - buyer_address ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/buyer_address)
// - seller_address ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/seller_address)
// - price ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/price)
// - price_formatted ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/price_formatted)
// - usd_price_at_sale ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/usd_price_at_sale)
// - current_usd_value ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/current_usd_value)
// - token_id ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/token_id)
// - payment_token ($ref: #/components/schemas/soldPrice/properties/lowest_sale/properties/payment_token)

export interface EvmSoldPriceLowestSaleJSON {
  readonly transaction_hash: string;
  readonly block_timestamp: string;
  readonly buyer_address?: EvmAddressJSON;
  readonly seller_address?: EvmAddressJSON;
  readonly price: string;
  readonly price_formatted: string;
  readonly usd_price_at_sale?: string;
  readonly current_usd_value?: string;
  readonly token_id?: string;
  readonly payment_token: EvmSoldPriceLowestSalePaymentTokenJSON;
}

export interface EvmSoldPriceLowestSaleInput {
  readonly transactionHash: string;
  readonly blockTimestamp: string;
  readonly buyerAddress?: EvmAddressInput | EvmAddress;
  readonly sellerAddress?: EvmAddressInput | EvmAddress;
  readonly price: string;
  readonly priceFormatted: string;
  readonly usdPriceAtSale?: string;
  readonly currentUsdValue?: string;
  readonly tokenId?: string;
  readonly paymentToken: EvmSoldPriceLowestSalePaymentTokenInput | EvmSoldPriceLowestSalePaymentToken;
}

export class EvmSoldPriceLowestSale {
  public static create(input: EvmSoldPriceLowestSaleInput | EvmSoldPriceLowestSale): EvmSoldPriceLowestSale {
    if (input instanceof EvmSoldPriceLowestSale) {
      return input;
    }
    return new EvmSoldPriceLowestSale(input);
  }

  public static fromJSON(json: EvmSoldPriceLowestSaleJSON): EvmSoldPriceLowestSale {
    const input: EvmSoldPriceLowestSaleInput = {
      transactionHash: json.transaction_hash,
      blockTimestamp: json.block_timestamp,
      buyerAddress: json.buyer_address ? EvmAddress.fromJSON(json.buyer_address) : undefined,
      sellerAddress: json.seller_address ? EvmAddress.fromJSON(json.seller_address) : undefined,
      price: json.price,
      priceFormatted: json.price_formatted,
      usdPriceAtSale: json.usd_price_at_sale,
      currentUsdValue: json.current_usd_value,
      tokenId: json.token_id,
      paymentToken: EvmSoldPriceLowestSalePaymentToken.fromJSON(json.payment_token),
    };
    return EvmSoldPriceLowestSale.create(input);
  }

  /**
   * @description The transaction hash of the last sale
   */
  public readonly transactionHash: string;
  /**
   * @description The block timestamp of the last sale
   */
  public readonly blockTimestamp: string;
  /**
   * @description The buyer address of the last sale
   */
  public readonly buyerAddress?: EvmAddress;
  /**
   * @description The seller address of the last sale
   */
  public readonly sellerAddress?: EvmAddress;
  /**
   * @description The price of the last sale
   */
  public readonly price: string;
  /**
   * @description The formatted price of the last sale
   */
  public readonly priceFormatted: string;
  /**
   * @description The USD price of the last sale at sale time
   */
  public readonly usdPriceAtSale?: string;
  /**
   * @description The USD price of the last sale at the current value
   */
  public readonly currentUsdValue?: string;
  /**
   * @description The token ID that is sold
   */
  public readonly tokenId?: string;
  /**
   * @description The ERC20 token that is being traded with
   */
  public readonly paymentToken: EvmSoldPriceLowestSalePaymentToken;

  private constructor(input: EvmSoldPriceLowestSaleInput) {
    this.transactionHash = input.transactionHash;
    this.blockTimestamp = input.blockTimestamp;
    this.buyerAddress = input.buyerAddress ? EvmAddress.create(input.buyerAddress) : undefined;
    this.sellerAddress = input.sellerAddress ? EvmAddress.create(input.sellerAddress) : undefined;
    this.price = input.price;
    this.priceFormatted = input.priceFormatted;
    this.usdPriceAtSale = input.usdPriceAtSale;
    this.currentUsdValue = input.currentUsdValue;
    this.tokenId = input.tokenId;
    this.paymentToken = EvmSoldPriceLowestSalePaymentToken.create(input.paymentToken);
  }

  public toJSON(): EvmSoldPriceLowestSaleJSON {
    return {
      transaction_hash: this.transactionHash,
      block_timestamp: this.blockTimestamp,
      buyer_address: this.buyerAddress ? this.buyerAddress.toJSON() : undefined,
      seller_address: this.sellerAddress ? this.sellerAddress.toJSON() : undefined,
      price: this.price,
      price_formatted: this.priceFormatted,
      usd_price_at_sale: this.usdPriceAtSale,
      current_usd_value: this.currentUsdValue,
      token_id: this.tokenId,
      payment_token: this.paymentToken.toJSON(),
    }
  }
}
