import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmSoldPriceLastSalePaymentToken, EvmSoldPriceLastSalePaymentTokenInput, EvmSoldPriceLastSalePaymentTokenJSON } from '../types/EvmSoldPriceLastSalePaymentToken';

// $ref: #/components/schemas/soldPrice/properties/last_sale
// type: soldPrice_last_sale
// properties:
// - transaction_hash ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/transaction_hash)
// - block_timestamp ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/block_timestamp)
// - buyer_address ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/buyer_address)
// - seller_address ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/seller_address)
// - price ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/price)
// - price_formatted ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/price_formatted)
// - usd_price_at_sale ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/usd_price_at_sale)
// - current_usd_value ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/current_usd_value)
// - token_id ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/token_id)
// - payment_token ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token)

export interface EvmSoldPriceLastSaleJSON {
  readonly transaction_hash: string;
  readonly block_timestamp: string;
  readonly buyer_address: EvmAddressJSON;
  readonly seller_address: EvmAddressJSON;
  readonly price: string;
  readonly price_formatted: string;
  readonly usd_price_at_sale?: string;
  readonly current_usd_value?: string;
  readonly token_id?: string;
  readonly payment_token: EvmSoldPriceLastSalePaymentTokenJSON;
}

export interface EvmSoldPriceLastSaleInput {
  readonly transactionHash: string;
  readonly blockTimestamp: string;
  readonly buyerAddress: EvmAddressInput | EvmAddress;
  readonly sellerAddress: EvmAddressInput | EvmAddress;
  readonly price: string;
  readonly priceFormatted: string;
  readonly usdPriceAtSale?: string;
  readonly currentUsdValue?: string;
  readonly tokenId?: string;
  readonly paymentToken: EvmSoldPriceLastSalePaymentTokenInput | EvmSoldPriceLastSalePaymentToken;
}

export class EvmSoldPriceLastSale {
  public static create(input: EvmSoldPriceLastSaleInput | EvmSoldPriceLastSale): EvmSoldPriceLastSale {
    if (input instanceof EvmSoldPriceLastSale) {
      return input;
    }
    return new EvmSoldPriceLastSale(input);
  }

  public static fromJSON(json: EvmSoldPriceLastSaleJSON): EvmSoldPriceLastSale {
    const input: EvmSoldPriceLastSaleInput = {
      transactionHash: json.transaction_hash,
      blockTimestamp: json.block_timestamp,
      buyerAddress: EvmAddress.fromJSON(json.buyer_address),
      sellerAddress: EvmAddress.fromJSON(json.seller_address),
      price: json.price,
      priceFormatted: json.price_formatted,
      usdPriceAtSale: json.usd_price_at_sale,
      currentUsdValue: json.current_usd_value,
      tokenId: json.token_id,
      paymentToken: EvmSoldPriceLastSalePaymentToken.fromJSON(json.payment_token),
    };
    return EvmSoldPriceLastSale.create(input);
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
  public readonly buyerAddress: EvmAddress;
  /**
   * @description The seller address of the last sale
   */
  public readonly sellerAddress: EvmAddress;
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
  public readonly paymentToken: EvmSoldPriceLastSalePaymentToken;

  private constructor(input: EvmSoldPriceLastSaleInput) {
    this.transactionHash = input.transactionHash;
    this.blockTimestamp = input.blockTimestamp;
    this.buyerAddress = EvmAddress.create(input.buyerAddress);
    this.sellerAddress = EvmAddress.create(input.sellerAddress);
    this.price = input.price;
    this.priceFormatted = input.priceFormatted;
    this.usdPriceAtSale = input.usdPriceAtSale;
    this.currentUsdValue = input.currentUsdValue;
    this.tokenId = input.tokenId;
    this.paymentToken = EvmSoldPriceLastSalePaymentToken.create(input.paymentToken);
  }

  public toJSON(): EvmSoldPriceLastSaleJSON {
    return {
      transaction_hash: this.transactionHash,
      block_timestamp: this.blockTimestamp,
      buyer_address: this.buyerAddress.toJSON(),
      seller_address: this.sellerAddress.toJSON(),
      price: this.price,
      price_formatted: this.priceFormatted,
      usd_price_at_sale: this.usdPriceAtSale,
      current_usd_value: this.currentUsdValue,
      token_id: this.tokenId,
      payment_token: this.paymentToken.toJSON(),
    }
  }
}
