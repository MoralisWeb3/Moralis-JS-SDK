import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/defiTokenBalance
// type: defiTokenBalance
// properties:
// - name ($ref: #/components/schemas/defiTokenBalance/properties/name)
// - logo ($ref: #/components/schemas/defiTokenBalance/properties/logo)
// - thumbnail ($ref: #/components/schemas/defiTokenBalance/properties/thumbnail)
// - decimals ($ref: #/components/schemas/defiTokenBalance/properties/decimals)
// - symbol ($ref: #/components/schemas/defiTokenBalance/properties/symbol)
// - contract_address ($ref: #/components/schemas/defiTokenBalance/properties/contract_address)
// - token_type ($ref: #/components/schemas/defiTokenBalance/properties/token_type)
// - usd_price ($ref: #/components/schemas/defiTokenBalance/properties/usd_price)
// - usd_value ($ref: #/components/schemas/defiTokenBalance/properties/usd_value)
// - balance ($ref: #/components/schemas/defiTokenBalance/properties/balance)
// - balance_formatted ($ref: #/components/schemas/defiTokenBalance/properties/balance_formatted)

export interface EvmDefiTokenBalanceJSON {
  readonly name: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly contract_address: EvmAddressJSON;
  readonly token_type: string;
  readonly usd_price?: number;
  readonly usd_value?: number;
  readonly balance: string;
  readonly balance_formatted: string;
}

export interface EvmDefiTokenBalanceInput {
  readonly name: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly contractAddress: EvmAddressInput | EvmAddress;
  readonly tokenType: string;
  readonly usdPrice?: number;
  readonly usdValue?: number;
  readonly balance: string;
  readonly balanceFormatted: string;
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
      name: json.name,
      logo: json.logo,
      thumbnail: json.thumbnail,
      decimals: json.decimals,
      symbol: json.symbol,
      contractAddress: EvmAddress.fromJSON(json.contract_address),
      tokenType: json.token_type,
      usdPrice: json.usd_price,
      usdValue: json.usd_value,
      balance: json.balance,
      balanceFormatted: json.balance_formatted,
    };
    return EvmDefiTokenBalance.create(input);
  }

  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The thumbnail of the token
   */
  public readonly thumbnail?: string;
  /**
   * @description The decimals of the token
   */
  public readonly decimals: number;
  /**
   * @description The symbol of the token
   */
  public readonly symbol: string;
  /**
   * @description The contract address
   */
  public readonly contractAddress: EvmAddress;
  /**
   * @description The token type (supply/defi/borrow token)
   */
  public readonly tokenType: string;
  /**
   * @description The USD price of the token
   */
  public readonly usdPrice?: number;
  /**
   * @description The USD value of the token
   */
  public readonly usdValue?: number;
  /**
   * @description The balance of the token
   */
  public readonly balance: string;
  /**
   * @description The balance of the token formatted
   */
  public readonly balanceFormatted: string;

  private constructor(input: EvmDefiTokenBalanceInput) {
    this.name = input.name;
    this.logo = input.logo;
    this.thumbnail = input.thumbnail;
    this.decimals = input.decimals;
    this.symbol = input.symbol;
    this.contractAddress = EvmAddress.create(input.contractAddress);
    this.tokenType = input.tokenType;
    this.usdPrice = input.usdPrice;
    this.usdValue = input.usdValue;
    this.balance = input.balance;
    this.balanceFormatted = input.balanceFormatted;
  }

  public toJSON(): EvmDefiTokenBalanceJSON {
    return {
      name: this.name,
      logo: this.logo,
      thumbnail: this.thumbnail,
      decimals: this.decimals,
      symbol: this.symbol,
      contract_address: this.contractAddress.toJSON(),
      token_type: this.tokenType,
      usd_price: this.usdPrice,
      usd_value: this.usdValue,
      balance: this.balance,
      balance_formatted: this.balanceFormatted,
    }
  }
}
