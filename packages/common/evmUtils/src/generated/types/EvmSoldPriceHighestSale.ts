import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmSoldPriceHighestSalePaymentToken, EvmSoldPriceHighestSalePaymentTokenInput, EvmSoldPriceHighestSalePaymentTokenJSON } from '../types/EvmSoldPriceHighestSalePaymentToken';

// $ref: #/components/schemas/soldPrice/properties/highest_sale
// type: soldPrice_highest_sale
// properties:
// - transaction_hash ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/transaction_hash)
// - block_timestamp ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/block_timestamp)
// - buyer_address ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/buyer_address)
// - seller_address ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/seller_address)
// - price ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/price)
// - price_formatted ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/price_formatted)
// - usd_price_at_sale ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/usd_price_at_sale)
// - current_usd_value ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/current_usd_value)
// - token_id ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/token_id)
// - payment_token ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token)

export interface EvmSoldPriceHighestSaleJSON {
  readonly transaction_hash: string;
  readonly block_timestamp: string;
  readonly buyer_address?: EvmAddressJSON;
  readonly seller_address?: EvmAddressJSON;
  readonly price: string;
  readonly price_formatted: string;
  readonly usd_price_at_sale?: string;
  readonly current_usd_value?: string;
  readonly token_id?: string;
  readonly payment_token: EvmSoldPriceHighestSalePaymentTokenJSON;
}

export interface EvmSoldPriceHighestSaleInput {
  readonly transactionHash: string;
  readonly blockTimestamp: string;
  readonly buyerAddress?: EvmAddressInput | EvmAddress;
  readonly sellerAddress?: EvmAddressInput | EvmAddress;
  readonly price: string;
  readonly priceFormatted: string;
  readonly usdPriceAtSale?: string;
  readonly currentUsdValue?: string;
  readonly tokenId?: string;
  readonly paymentToken: EvmSoldPriceHighestSalePaymentTokenInput | EvmSoldPriceHighestSalePaymentToken;
}

export class EvmSoldPriceHighestSale {
  public static create(input: EvmSoldPriceHighestSaleInput | EvmSoldPriceHighestSale): EvmSoldPriceHighestSale {
    if (input instanceof EvmSoldPriceHighestSale) {
      return input;
    }
    return new EvmSoldPriceHighestSale(input);
  }

  public static fromJSON(json: EvmSoldPriceHighestSaleJSON): EvmSoldPriceHighestSale {
    const input: EvmSoldPriceHighestSaleInput = {
      transactionHash: json.transaction_hash,
      blockTimestamp: json.block_timestamp,
      buyerAddress: json.buyer_address ? EvmAddress.fromJSON(json.buyer_address) : undefined,
      sellerAddress: json.seller_address ? EvmAddress.fromJSON(json.seller_address) : undefined,
      price: json.price,
      priceFormatted: json.price_formatted,
      usdPriceAtSale: json.usd_price_at_sale,
      currentUsdValue: json.current_usd_value,
      tokenId: json.token_id,
      paymentToken: EvmSoldPriceHighestSalePaymentToken.fromJSON(json.payment_token),
    };
    return EvmSoldPriceHighestSale.create(input);
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
  public readonly paymentToken: EvmSoldPriceHighestSalePaymentToken;

  private constructor(input: EvmSoldPriceHighestSaleInput) {
    this.transactionHash = input.transactionHash;
    this.blockTimestamp = input.blockTimestamp;
    this.buyerAddress = input.buyerAddress ? EvmAddress.create(input.buyerAddress) : undefined;
    this.sellerAddress = input.sellerAddress ? EvmAddress.create(input.sellerAddress) : undefined;
    this.price = input.price;
    this.priceFormatted = input.priceFormatted;
    this.usdPriceAtSale = input.usdPriceAtSale;
    this.currentUsdValue = input.currentUsdValue;
    this.tokenId = input.tokenId;
    this.paymentToken = EvmSoldPriceHighestSalePaymentToken.create(input.paymentToken);
  }

  public toJSON(): EvmSoldPriceHighestSaleJSON {
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
