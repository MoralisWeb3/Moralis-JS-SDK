import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/erc20Transfer
// type: erc20Transfer
// properties:
// - token_name ($ref: #/components/schemas/erc20Transfer/properties/token_name)
// - token_symbol ($ref: #/components/schemas/erc20Transfer/properties/token_symbol)
// - token_logo ($ref: #/components/schemas/erc20Transfer/properties/token_logo)
// - token_decimals ($ref: #/components/schemas/erc20Transfer/properties/token_decimals)
// - contract_address ($ref: #/components/schemas/erc20Transfer/properties/contract_address)
// - transaction_hash ($ref: #/components/schemas/erc20Transfer/properties/transaction_hash)
// - transaction_index ($ref: #/components/schemas/erc20Transfer/properties/transaction_index)
// - log_index ($ref: #/components/schemas/erc20Transfer/properties/log_index)
// - block_timestamp ($ref: #/components/schemas/erc20Transfer/properties/block_timestamp)
// - block_number ($ref: #/components/schemas/erc20Transfer/properties/block_number)
// - block_hash ($ref: #/components/schemas/erc20Transfer/properties/block_hash)
// - from_wallet ($ref: #/components/schemas/erc20Transfer/properties/from_wallet)
// - to_wallet ($ref: #/components/schemas/erc20Transfer/properties/to_wallet)
// - value ($ref: #/components/schemas/erc20Transfer/properties/value)
// - value_decimal ($ref: #/components/schemas/erc20Transfer/properties/value_decimal)
// - possible_spam ($ref: #/components/schemas/erc20Transfer/properties/possible_spam)

export interface EvmErc20TransferJSON {
  readonly token_name: string;
  readonly token_symbol: string;
  readonly token_logo?: string;
  readonly token_decimals: string;
  readonly contract_address: EvmAddressJSON;
  readonly transaction_hash: string;
  readonly transaction_index: string;
  readonly log_index: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly from_wallet: EvmAddressJSON;
  readonly to_wallet: EvmAddressJSON;
  readonly value: string;
  readonly value_decimal: string;
  readonly possible_spam: boolean;
}

export interface EvmErc20TransferInput {
  readonly tokenName: string;
  readonly tokenSymbol: string;
  readonly tokenLogo?: string;
  readonly tokenDecimals: string;
  readonly contractAddress: EvmAddressInput | EvmAddress;
  readonly transactionHash: string;
  readonly transactionIndex: string;
  readonly logIndex: string;
  readonly blockTimestamp: Date;
  readonly blockNumber: string;
  readonly blockHash: string;
  readonly fromWallet: EvmAddressInput | EvmAddress;
  readonly toWallet: EvmAddressInput | EvmAddress;
  readonly value: string;
  readonly valueDecimal: string;
  readonly possibleSpam: boolean;
}

export class EvmErc20Transfer {
  public static create(input: EvmErc20TransferInput | EvmErc20Transfer): EvmErc20Transfer {
    if (input instanceof EvmErc20Transfer) {
      return input;
    }
    return new EvmErc20Transfer(input);
  }

  public static fromJSON(json: EvmErc20TransferJSON): EvmErc20Transfer {
    const input: EvmErc20TransferInput = {
      tokenName: json.token_name,
      tokenSymbol: json.token_symbol,
      tokenLogo: json.token_logo,
      tokenDecimals: json.token_decimals,
      contractAddress: EvmAddress.fromJSON(json.contract_address),
      transactionHash: json.transaction_hash,
      transactionIndex: json.transaction_index,
      logIndex: json.log_index,
      blockTimestamp: new Date(json.block_timestamp),
      blockNumber: json.block_number,
      blockHash: json.block_hash,
      fromWallet: EvmAddress.fromJSON(json.from_wallet),
      toWallet: EvmAddress.fromJSON(json.to_wallet),
      value: json.value,
      valueDecimal: json.value_decimal,
      possibleSpam: json.possible_spam,
    };
    return EvmErc20Transfer.create(input);
  }

  public readonly tokenName: string;
  public readonly tokenSymbol: string;
  public readonly tokenLogo?: string;
  public readonly tokenDecimals: string;
  public readonly contractAddress: EvmAddress;
  /**
   * @description The hash of the transaction
   */
  public readonly transactionHash: string;
  public readonly transactionIndex: string;
  public readonly logIndex: string;
  /**
   * @description The timestamp of the block
   */
  public readonly blockTimestamp: Date;
  /**
   * @description The block number
   */
  public readonly blockNumber: string;
  /**
   * @description The hash of the block
   */
  public readonly blockHash: string;
  /**
   * @description The address of the contract
   */
  public readonly fromWallet: EvmAddress;
  /**
   * @description The address of the contract
   */
  public readonly toWallet: EvmAddress;
  /**
   * @description The value of the transfer
   */
  public readonly value: string;
  /**
   * @description The decimal value of the transfer
   */
  public readonly valueDecimal: string;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;

  private constructor(input: EvmErc20TransferInput) {
    this.tokenName = input.tokenName;
    this.tokenSymbol = input.tokenSymbol;
    this.tokenLogo = input.tokenLogo;
    this.tokenDecimals = input.tokenDecimals;
    this.contractAddress = EvmAddress.create(input.contractAddress);
    this.transactionHash = input.transactionHash;
    this.transactionIndex = input.transactionIndex;
    this.logIndex = input.logIndex;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
    this.fromWallet = EvmAddress.create(input.fromWallet);
    this.toWallet = EvmAddress.create(input.toWallet);
    this.value = input.value;
    this.valueDecimal = input.valueDecimal;
    this.possibleSpam = input.possibleSpam;
  }

  public toJSON(): EvmErc20TransferJSON {
    return {
      token_name: this.tokenName,
      token_symbol: this.tokenSymbol,
      token_logo: this.tokenLogo,
      token_decimals: this.tokenDecimals,
      contract_address: this.contractAddress.toJSON(),
      transaction_hash: this.transactionHash,
      transaction_index: this.transactionIndex,
      log_index: this.logIndex,
      block_timestamp: this.blockTimestamp.toISOString(),
      block_number: this.blockNumber,
      block_hash: this.blockHash,
      from_wallet: this.fromWallet.toJSON(),
      to_wallet: this.toWallet.toJSON(),
      value: this.value,
      value_decimal: this.valueDecimal,
      possible_spam: this.possibleSpam,
    }
  }
}
