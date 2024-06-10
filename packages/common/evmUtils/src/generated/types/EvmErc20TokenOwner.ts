// $ref: #/components/schemas/erc20TokenOwner
// type: erc20TokenOwner
// properties:
// - owner_address ($ref: #/components/schemas/erc20TokenOwner/properties/owner_address)
// - owner_address_label ($ref: #/components/schemas/erc20TokenOwner/properties/owner_address_label)
// - balance ($ref: #/components/schemas/erc20TokenOwner/properties/balance)
// - balance_formatted ($ref: #/components/schemas/erc20TokenOwner/properties/balance_formatted)
// - usd_value ($ref: #/components/schemas/erc20TokenOwner/properties/usd_value)
// - is_contract ($ref: #/components/schemas/erc20TokenOwner/properties/is_contract)
// - percentage_relative_to_total_supply ($ref: #/components/schemas/erc20TokenOwner/properties/percentage_relative_to_total_supply)

export interface EvmErc20TokenOwnerJSON {
  readonly owner_address: string;
  readonly owner_address_label: string;
  readonly balance: string;
  readonly balance_formatted: string;
  readonly usd_value: string;
  readonly is_contract: boolean;
  readonly percentage_relative_to_total_supply: number;
}

export interface EvmErc20TokenOwnerInput {
  readonly ownerAddress: string;
  readonly ownerAddressLabel: string;
  readonly balance: string;
  readonly balanceFormatted: string;
  readonly usdValue: string;
  readonly isContract: boolean;
  readonly percentageRelativeToTotalSupply: number;
}

export class EvmErc20TokenOwner {
  public static create(input: EvmErc20TokenOwnerInput | EvmErc20TokenOwner): EvmErc20TokenOwner {
    if (input instanceof EvmErc20TokenOwner) {
      return input;
    }
    return new EvmErc20TokenOwner(input);
  }

  public static fromJSON(json: EvmErc20TokenOwnerJSON): EvmErc20TokenOwner {
    const input: EvmErc20TokenOwnerInput = {
      ownerAddress: json.owner_address,
      ownerAddressLabel: json.owner_address_label,
      balance: json.balance,
      balanceFormatted: json.balance_formatted,
      usdValue: json.usd_value,
      isContract: json.is_contract,
      percentageRelativeToTotalSupply: json.percentage_relative_to_total_supply,
    };
    return EvmErc20TokenOwner.create(input);
  }

  /**
   * @description The address of the erc20 token owner
   */
  public readonly ownerAddress: string;
  /**
   * @description The label of the owner_address
   */
  public readonly ownerAddressLabel: string;
  /**
   * @description The amount holding of the ERC20 token
   */
  public readonly balance: string;
  /**
   * @description The amount holding of the ERC20 token in decimaal
   */
  public readonly balanceFormatted: string;
  /**
   * @description The USD value of the balance
   */
  public readonly usdValue: string;
  /**
   * @description Indicates if the token address is for a contract or not
   */
  public readonly isContract: boolean;
  /**
   * @description The percentage of total supply held by the owner
   */
  public readonly percentageRelativeToTotalSupply: number;

  private constructor(input: EvmErc20TokenOwnerInput) {
    this.ownerAddress = input.ownerAddress;
    this.ownerAddressLabel = input.ownerAddressLabel;
    this.balance = input.balance;
    this.balanceFormatted = input.balanceFormatted;
    this.usdValue = input.usdValue;
    this.isContract = input.isContract;
    this.percentageRelativeToTotalSupply = input.percentageRelativeToTotalSupply;
  }

  public toJSON(): EvmErc20TokenOwnerJSON {
    return {
      owner_address: this.ownerAddress,
      owner_address_label: this.ownerAddressLabel,
      balance: this.balance,
      balance_formatted: this.balanceFormatted,
      usd_value: this.usdValue,
      is_contract: this.isContract,
      percentage_relative_to_total_supply: this.percentageRelativeToTotalSupply,
    }
  }
}
