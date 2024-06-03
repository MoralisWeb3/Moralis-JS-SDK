import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token
// type: soldPrice_highest_sale_payment_token
// properties:
// - token_name ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token/properties/token_name)
// - token_symbol ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token/properties/token_logo)
// - token_decimals ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token/properties/token_decimals)
// - token_address ($ref: #/components/schemas/soldPrice/properties/highest_sale/properties/payment_token/properties/token_address)

export interface EvmSoldPriceHighestSalePaymentTokenJSON {
  readonly token_name: string;
  readonly token_symbol: string;
  readonly token_logo: string;
  readonly token_decimals: string;
  readonly token_address: EvmAddressJSON;
}

export interface EvmSoldPriceHighestSalePaymentTokenInput {
  readonly tokenName: string;
  readonly tokenSymbol: string;
  readonly tokenLogo: string;
  readonly tokenDecimals: number;
  readonly tokenAddress: EvmAddressInput | EvmAddress;
}

export class EvmSoldPriceHighestSalePaymentToken {
  public static create(input: EvmSoldPriceHighestSalePaymentTokenInput | EvmSoldPriceHighestSalePaymentToken): EvmSoldPriceHighestSalePaymentToken {
    if (input instanceof EvmSoldPriceHighestSalePaymentToken) {
      return input;
    }
    return new EvmSoldPriceHighestSalePaymentToken(input);
  }

  public static fromJSON(json: EvmSoldPriceHighestSalePaymentTokenJSON): EvmSoldPriceHighestSalePaymentToken {
    const input: EvmSoldPriceHighestSalePaymentTokenInput = {
      tokenName: json.token_name,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
      tokenDecimals: Number(json.token_decimals),
      tokenAddress: EvmAddress.fromJSON(json.token_address),
    };
    return EvmSoldPriceHighestSalePaymentToken.create(input);
  }

  /**
   * @description The token name
   */
  public readonly tokenName: string;
  /**
   * @description The token symbol
   */
  public readonly tokenSymbol: string;
  /**
   * @description The token logo
   */
  public readonly tokenLogo: string;
  /**
   * @description The token decimals
   */
  public readonly tokenDecimals: number;
  /**
   * @description The token address
   */
  public readonly tokenAddress: EvmAddress;

  private constructor(input: EvmSoldPriceHighestSalePaymentTokenInput) {
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
  }

  public toJSON(): EvmSoldPriceHighestSalePaymentTokenJSON {
    return {
      token_name: this.tokenName,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
      token_decimals: String(this.tokenDecimals),
      token_address: this.tokenAddress.toJSON(),
    }
  }
}
