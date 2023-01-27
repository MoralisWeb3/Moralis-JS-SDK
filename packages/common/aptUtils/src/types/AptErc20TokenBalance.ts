
// $ref: #/components/schemas/erc20TokenBalance

export interface AptErc20TokenBalanceJSON {
  readonly token_address: string;
  readonly name: string;
  readonly symbol: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly balance: string;
}

export interface AptErc20TokenBalanceInput {
  readonly tokenAddress: string;
  readonly name: string;
  readonly symbol: string;
  readonly logo?: string;
  readonly thumbnail?: string;
  readonly decimals: number;
  readonly balance: string;
}

export class AptErc20TokenBalance {
  public static create(input: AptErc20TokenBalanceInput): AptErc20TokenBalance {
    return new AptErc20TokenBalance(input);
  }

  public static fromJSON(json: AptErc20TokenBalanceJSON): AptErc20TokenBalance {
    const input: AptErc20TokenBalanceInput = {
      tokenAddress: json.token_address,
      name: json.name,
      symbol: json.symbol,
      logo: json.logo,
      thumbnail: json.thumbnail,
      decimals: json.decimals,
      balance: json.balance,
    };
    return AptErc20TokenBalance.create(input);
  }

  /**
   * @description The address of the token contract
   */
  public readonly tokenAddress: string;
  /**
   * @description The name of the token contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The thumbnail of the logo
   */
  public readonly thumbnail?: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: number;
  /**
   * @description Timestamp of when the contract was last synced with the node
   */
  public readonly balance: string;

  private constructor(input: AptErc20TokenBalanceInput) {
    this.tokenAddress = input.tokenAddress;
    this.name = input.name;
    this.symbol = input.symbol;
    this.logo = input.logo;
    this.thumbnail = input.thumbnail;
    this.decimals = input.decimals;
    this.balance = input.balance;
  }

  public toJSON(): AptErc20TokenBalanceJSON {
    return {
      token_address: this.tokenAddress,
      name: this.name,
      symbol: this.symbol,
      logo: this.logo,
      thumbnail: this.thumbnail,
      decimals: this.decimals,
      balance: this.balance,
    }
  }
}
