import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/walletHistoryErc20Transfer
// type: walletHistoryErc20Transfer
// properties:
// - token_name ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/token_name)
// - token_symbol ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/token_logo)
// - token_decimals ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/token_decimals)
// - address ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/address)
// - block_timestamp ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/block_timestamp)
// - to_address ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/to_address)
// - to_address_label ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/to_address_label)
// - from_address ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/from_address)
// - from_address_label ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/from_address_label)
// - value ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/value)
// - value_formatted ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/value_formatted)
// - log_index ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/log_index)
// - possible_spam ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/possible_spam)
// - verified_contract ($ref: #/components/schemas/walletHistoryErc20Transfer/properties/verified_contract)

export interface EvmWalletHistoryErc20TransferJSON {
  readonly token_name: string;
  readonly token_symbol: string;
  readonly token_logo: string;
  readonly token_decimals: string;
  readonly address: EvmAddressJSON;
  readonly block_timestamp?: string;
  readonly to_address: EvmAddressJSON;
  readonly to_address_label?: string;
  readonly from_address: EvmAddressJSON;
  readonly from_address_label?: string;
  readonly value: string;
  readonly value_formatted: string;
  readonly log_index: number;
  readonly possible_spam: boolean;
  readonly verified_contract: boolean;
}

export interface EvmWalletHistoryErc20TransferInput {
  readonly tokenName: string;
  readonly tokenSymbol: string;
  readonly tokenLogo: string;
  readonly tokenDecimals: number;
  readonly address: EvmAddressInput | EvmAddress;
  readonly blockTimestamp?: string;
  readonly toAddress: EvmAddressInput | EvmAddress;
  readonly toAddressLabel?: string;
  readonly fromAddress: EvmAddressInput | EvmAddress;
  readonly fromAddressLabel?: string;
  readonly value: string;
  readonly valueFormatted: string;
  readonly logIndex: number;
  readonly possibleSpam: boolean;
  readonly verifiedContract: boolean;
}

export class EvmWalletHistoryErc20Transfer {
  public static create(input: EvmWalletHistoryErc20TransferInput | EvmWalletHistoryErc20Transfer): EvmWalletHistoryErc20Transfer {
    if (input instanceof EvmWalletHistoryErc20Transfer) {
      return input;
    }
    return new EvmWalletHistoryErc20Transfer(input);
  }

  public static fromJSON(json: EvmWalletHistoryErc20TransferJSON): EvmWalletHistoryErc20Transfer {
    const input: EvmWalletHistoryErc20TransferInput = {
      tokenName: json.token_name,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
      tokenDecimals: Number(json.token_decimals),
      address: EvmAddress.fromJSON(json.address),
      blockTimestamp: json.block_timestamp,
      toAddress: EvmAddress.fromJSON(json.to_address),
      toAddressLabel: json.to_address_label,
      fromAddress: EvmAddress.fromJSON(json.from_address),
      fromAddressLabel: json.from_address_label,
      value: json.value,
      valueFormatted: json.value_formatted,
      logIndex: json.log_index,
      possibleSpam: json.possible_spam,
      verifiedContract: json.verified_contract,
    };
    return EvmWalletHistoryErc20Transfer.create(input);
  }

  public readonly tokenName: string;
  public readonly tokenSymbol: string;
  public readonly tokenLogo: string;
  public readonly tokenDecimals: number;
  /**
   * @description The address of the token
   */
  public readonly address: EvmAddress;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp?: string;
  /**
   * @description The recipient
   */
  public readonly toAddress: EvmAddress;
  /**
   * @description The label of the to address
   */
  public readonly toAddressLabel?: string;
  /**
   * @description The sender
   */
  public readonly fromAddress: EvmAddress;
  /**
   * @description The label of the from address
   */
  public readonly fromAddressLabel?: string;
  /**
   * @description The value that was transfered (in wei)
   */
  public readonly value: string;
  /**
   * @description The value that was transfered decimal format
   */
  public readonly valueFormatted: string;
  /**
   * @description The log index of the transfer within the block
   */
  public readonly logIndex: number;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description Indicates if a contract is verified
   */
  public readonly verifiedContract: boolean;

  private constructor(input: EvmWalletHistoryErc20TransferInput) {
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.address = EvmAddress.create(input.address);
    this.blockTimestamp = input.blockTimestamp;
    this.toAddress = EvmAddress.create(input.toAddress);
    this.toAddressLabel = input.toAddressLabel;
    this.fromAddress = EvmAddress.create(input.fromAddress);
    this.fromAddressLabel = input.fromAddressLabel;
    this.value = input.value;
    this.valueFormatted = input.valueFormatted;
    this.logIndex = input.logIndex;
    this.possibleSpam = input.possibleSpam;
    this.verifiedContract = input.verifiedContract;
  }

  public toJSON(): EvmWalletHistoryErc20TransferJSON {
    return {
      token_name: this.tokenName,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
      token_decimals: String(this.tokenDecimals),
      address: this.address.toJSON(),
      block_timestamp: this.blockTimestamp,
      to_address: this.toAddress.toJSON(),
      to_address_label: this.toAddressLabel,
      from_address: this.fromAddress.toJSON(),
      from_address_label: this.fromAddressLabel,
      value: this.value,
      value_formatted: this.valueFormatted,
      log_index: this.logIndex,
      possible_spam: this.possibleSpam,
      verified_contract: this.verifiedContract,
    }
  }
}
