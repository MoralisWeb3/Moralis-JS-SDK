import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/defiTokenBalance
// type: defiTokenBalance
// properties:
// - token_type ($ref: #/components/schemas/defiTokenBalance/properties/token_type)
// - name ($ref: #/components/schemas/defiTokenBalance/properties/name)
// - symbol ($ref: #/components/schemas/defiTokenBalance/properties/symbol)
// - contract_address ($ref: #/components/schemas/defiTokenBalance/properties/contract_address)
// - decimals ($ref: #/components/schemas/defiTokenBalance/properties/decimals)
// - logo ($ref: #/components/schemas/defiTokenBalance/properties/logo)
// - thumbnail ($ref: #/components/schemas/defiTokenBalance/properties/thumbnail)
// - balance ($ref: #/components/schemas/defiTokenBalance/properties/balance)
// - balance_formatted ($ref: #/components/schemas/defiTokenBalance/properties/balance_formatted)
// - usd_price ($ref: #/components/schemas/defiTokenBalance/properties/usd_price)
// - usd_value ($ref: #/components/schemas/defiTokenBalance/properties/usd_value)

export interface EvmDefiTokenBalanceJSON {
  readonly token_type: string;
  readonly name: string;
  readonly symbol: string;
  readonly contract_address: EvmAddressJSON;
  readonly decimals: number;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly balance: string;
  readonly balance_formatted: string;
  readonly usd_price?: number;
  readonly usd_value?: number;
}

export interface EvmDefiTokenBalanceInput {
  readonly tokenType: string;
  readonly name: string;
  readonly symbol: string;
  readonly contractAddress: EvmAddressInput | EvmAddress;
  readonly decimals: number;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly balance: string;
  readonly balanceFormatted: string;
  readonly usdPrice?: number;
  readonly usdValue?: number;
}

export class EvmDefiTokenBalance {
  public static create(input: EvmDefiTokenBalanceInput | EvmDefiTokenBalance): EvmDefiTokenBalance {
    if (input instanceof EvmDefiTokenBalance) {
      return input;
    }
    return new EvmDefiTokenBalance(input);
  }

  public static fromJSON(json: EvmDefiTokenBalanceJSON): EvmDefiTokenBalance {
    const input: EvmDefiTokenBalanceInput = {
      tokenType: json.token_type,
      name: json.name,
      symbol: json.symbol,
      contractAddress: EvmAddress.fromJSON(json.contract_address),
      decimals: json.decimals,
      logo: json.logo,
      thumbnail: json.thumbnail,
      balance: json.balance,
      balanceFormatted: json.balance_formatted,
      usdPrice: json.usd_price,
      usdValue: json.usd_value,
    };
    return EvmDefiTokenBalance.create(input);
  }

  /**
   * @description The token type (supply/defi/borrow token)
   */
  public readonly tokenType: string;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The symbol of the token
   */
  public readonly symbol: string;
  /**
   * @description The contract address
   */
  public readonly contractAddress: EvmAddress;
  /**
   * @description The decimals of the token
   */
  public readonly decimals: number;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The thumbnail of the token
   */
  public readonly thumbnail?: string;
  /**
   * @description The balance of the token
   */
  public readonly balance: string;
  /**
   * @description The balance of the token formatted
   */
  public readonly balanceFormatted: string;
  /**
   * @description The USD price of the token
   */
  public readonly usdPrice?: number;
  /**
   * @description The USD value of the token
   */
  public readonly usdValue?: number;

  private constructor(input: EvmDefiTokenBalanceInput) {
    this.tokenType = input.tokenType;
    this.name = input.name;
    this.symbol = input.symbol;
    this.contractAddress = EvmAddress.create(input.contractAddress);
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.thumbnail = input.thumbnail;
    this.balance = input.balance;
    this.balanceFormatted = input.balanceFormatted;
    this.usdPrice = input.usdPrice;
    this.usdValue = input.usdValue;
  }

  public toJSON(): EvmDefiTokenBalanceJSON {
    return {
      token_type: this.tokenType,
      name: this.name,
      symbol: this.symbol,
      contract_address: this.contractAddress.toJSON(),
      decimals: this.decimals,
      logo: this.logo,
      thumbnail: this.thumbnail,
      balance: this.balance,
      balance_formatted: this.balanceFormatted,
      usd_price: this.usdPrice,
      usd_value: this.usdValue,
    }
  }
}
