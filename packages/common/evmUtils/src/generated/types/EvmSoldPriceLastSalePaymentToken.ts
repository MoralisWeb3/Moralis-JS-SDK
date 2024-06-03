import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token
// type: soldPrice_last_sale_payment_token
// properties:
// - token_name ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token/properties/token_name)
// - token_symbol ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token/properties/token_logo)
// - token_decimals ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token/properties/token_decimals)
// - token_address ($ref: #/components/schemas/soldPrice/properties/last_sale/properties/payment_token/properties/token_address)

export interface EvmSoldPriceLastSalePaymentTokenJSON {
  readonly token_name: string;
  readonly token_symbol: string;
  readonly token_logo: string;
  readonly token_decimals: string;
  readonly token_address: EvmAddressJSON;
}

export interface EvmSoldPriceLastSalePaymentTokenInput {
  readonly tokenName: string;
  readonly tokenSymbol: string;
  readonly tokenLogo: string;
  readonly tokenDecimals: number;
  readonly tokenAddress: EvmAddressInput | EvmAddress;
}

export class EvmSoldPriceLastSalePaymentToken {
  public static create(input: EvmSoldPriceLastSalePaymentTokenInput | EvmSoldPriceLastSalePaymentToken): EvmSoldPriceLastSalePaymentToken {
    if (input instanceof EvmSoldPriceLastSalePaymentToken) {
      return input;
    }
    return new EvmSoldPriceLastSalePaymentToken(input);
  }

  public static fromJSON(json: EvmSoldPriceLastSalePaymentTokenJSON): EvmSoldPriceLastSalePaymentToken {
    const input: EvmSoldPriceLastSalePaymentTokenInput = {
      tokenName: json.token_name,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
      tokenDecimals: Number(json.token_decimals),
      tokenAddress: EvmAddress.fromJSON(json.token_address),
    };
    return EvmSoldPriceLastSalePaymentToken.create(input);
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

  private constructor(input: EvmSoldPriceLastSalePaymentTokenInput) {
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
  }

  public toJSON(): EvmSoldPriceLastSalePaymentTokenJSON {
    return {
      token_name: this.tokenName,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
      token_decimals: String(this.tokenDecimals),
      token_address: this.tokenAddress.toJSON(),
    }
  }
}
