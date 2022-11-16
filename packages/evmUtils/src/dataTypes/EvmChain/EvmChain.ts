import { chainList, EvmChainListDataEntry } from '../../data/chaindata';
import { EvmChainParser } from './EvmChainParser';
import { EvmChainish, InputChainId } from './EvmChainish';
import {
  EvmChainIdFormat,
  Config,
  MoralisCoreProvider,
  MoralisData,
  assertUnreachable,
  MoralisCore,
  EvmChainable,
} from '@moralisweb3/core';
import { EvmUtilsConfig } from '../../config/EvmUtilsConfig';

/**
 * This can be any valid EVM chain in decimal or hex.
 * @example 3
 * @example "0x1"
 */
type InternalEvmChain = string;

/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * @category DataType
 */
export class EvmChain implements MoralisData, EvmChainable {
  /**
   * Returns ETHEREUM chain
   *
   * @example EvmChain.ETHEREUM
   */
  public static get ETHEREUM() {
    return EvmChain.create(1);
  }

  /**
   * Returns GOERLI chain
   *
   * @example EvmChain.GOERLI
   */
  public static get GOERLI() {
    return EvmChain.create(5);
  }

  public static get SEPOLIA() {
    return EvmChain.create(11155111);
  }

  /**
   * Returns POLYGON chain
   *
   * @example EvmChain.POLYGON
   */
  public static get POLYGON() {
    return EvmChain.create(137);
  }

  /**
   * Returns MUMBAI chain
   *
   * @example EvmChain.MUMBAI
   */
  public static get MUMBAI() {
    return EvmChain.create(80001);
  }

  /**
   * Returns BSC chain
   *
   * @example EvmChain.BSC
   */
  public static get BSC() {
    return EvmChain.create(56);
  }

  /**
   * Returns BSC_TESTNET chain
   *
   * @example EvmChain.BSC_TESTNET
   */
  public static get BSC_TESTNET() {
    return EvmChain.create(97);
  }

  /**
   * Returns AVALANCHE chain
   *
   * @example EvmChain.AVALANCHE
   */
  public static get AVALANCHE() {
    return EvmChain.create(43114);
  }

  /**
   * Returns FUJI chain
   *
   * @example EvmChain.FUJI
   */
  public static get FUJI() {
    return EvmChain.create(43113);
  }

  /**
   * Returns FANTOM chain
   *
   * @example EvmChain.FANTOM
   */
  public static get FANTOM() {
    return EvmChain.create(250);
  }

  /**
   * Returns CRONOS chain
   *
   * @example EvmChain.CRONOS
   */
  public static get CRONOS() {
    return EvmChain.create(25);
  }

  /**
   * Returns CRONOS_TESTNET chain
   *
   * @example EvmChain.CRONOS_TESTNET
   */
  public static get CRONOS_TESTNET() {
    return EvmChain.create(338);
  }

  /**
   * Create a new instance of EvmChain from any valid address input.
   *
   * @example
   * ```ts
   * const chain = EvmChain.create(1)
   * const chain = EvmChain.create("0x3")
   * ```
   */
  public static create(chain: EvmChainish, core?: MoralisCore): EvmChain {
    if (chain instanceof EvmChain) {
      return chain;
    }
    const c = core || MoralisCoreProvider.getDefault();
    return new EvmChain(chain, c.config);
  }

  // hex-string chainId
  private _value: InternalEvmChain;
  private _chainlistData: EvmChainListDataEntry | null;

  private constructor(value: InputChainId, private readonly config: Config) {
    this._value = EvmChainParser.parse(value);
    this._chainlistData = chainList.find((chainData) => chainData.chainId === this.decimal) ?? null;
  }

  // Getter to return _chainlistData and throws an error if it is not defined
  private _getChainlistData() {
    if (!this._chainlistData) {
      return null;
    }

    return this._chainlistData;
  }

  /**
   * Compares if 2 chains are equal, based on the chainId
   *
   * @param chainA - The first chain to compare
   * @param chainB - The second chain to compare
   *
   * @returns true if the chains are equal, false otherwise
   * @example
   * ```ts
   * EvmChain.equals("1", "0x1")
   * ```
   */
  static equals(chainA: EvmChainish, chainB: EvmChainish) {
    return EvmChain.create(chainA)._value === EvmChain.create(chainB)._value;
  }

  /**
   * Compares if the current chain is equal to the provided chain, based on the chainId
   * @param chain - The chain to compare to
   * @returns true if the chains are equal, false otherwise
   * @example
   * ```ts
   * chain.equals(EvmChain.ETHEREUM)
   * ```
   */
  equals(chain: EvmChainish) {
    return EvmChain.equals(this, chain);
  }

  /**
   * Formats the chain to the given output; in decimal value or as hex-string.
   * The default formatting can be set in MoralisConfig
   * @param _formatStyle - The output format to use
   * @example chain.format() // 1
   * @example chain.format('hex') // "0x1"
   * @example chain.format('decimal') // 1
   *
   * @returns The formatted chain
   */
  format(_formatStyle?: EvmChainIdFormat) {
    const formatStyle = _formatStyle ?? this.config.get(EvmUtilsConfig.formatEvmChainId);

    if (formatStyle === 'decimal') {
      return this.decimal;
    }

    if (formatStyle === 'hex') {
      return this.hex;
    }

    return assertUnreachable(formatStyle);
  }

  /**
   * Displays the chain hex-string representation of the chain and also the chain name if not null
   *
   * @example chain.display() // "Ethereum (0x1)" | "0x1"
   */
  display() {
    return this.name ? `${this.name} (${this.hex})` : this.hex;
  }

  /**
   * This function returns the explorer url of a block, transaction, account or token.
   *
   * @param value - An object containing the `block`, `transaction`, `account` or `erc20` to get the explorer url for.
   *
   * @example chain.getExplorerUrl({ block: 'block_here' }) // "https://etherscan.io/block/block_here"
   * @example chain.getExplorerUrl({ transaction: 'some_transaction' }) // "https://etherscan.io/tx/some_transaction"
   * @example chain.getExplorerUrl({ account: 'accoun_here' }) // "https://etherscan.io/address/accoun_here"
   * @example chain.getExplorerUrl({ erc20: 'token_here' }) // "https://etherscan.io/token/token_here"
   */
  getExplorerPath(value: { block: string } | { transaction: string } | { account: string } | { erc20: string }) {
    const { explorer } = this;

    if (!explorer || explorer.standard !== 'EIP3091') {
      return null;
    }

    const { url } = explorer;

    // See https://eips.ethereum.org/EIPS/eip-3091 for paths
    if ('block' in value) {
      return `${url}/block/${value.block}`;
    }

    if ('transaction' in value) {
      return `${url}/tx/${value.transaction}`;
    }

    if ('account' in value) {
      return `${url}/address/${value.account}`;
    }

    if ('erc20' in value) {
      return `${url}/token/${value.erc20}`;
    }
    return null;
  }

  /**
   * Returns the decimal representation of the chain
   * @example chain.decimal // 1
   */
  get decimal() {
    return parseInt(this._value, 16);
  }

  /**
   * Returns the hex-string representation of the chain
   * @example chain.hex // "0x1"
   */
  get hex() {
    return this._value;
  }

  /**
   * Validate and cast to api compatible hex
   *
   * @example chain.apiHex // "0x1"
   */
  get apiHex() {
    return this._value as
      | '0x1'
      | `0x5`
      | '0xaa36a7'
      | '0x89'
      | '0x13881'
      | '0x38'
      | '0x61'
      | '0xa86a'
      | '0xa869'
      | '0xfa'
      | '0x19'
      | '0x152';
  }

  /**
   * Validate and cast to api compatible id
   *
   * @example chain.apiId // 1
   */
  get apiId() {
    return this._value as
      | '1'
      | '3'
      | '4'
      | '5'
      | '25'
      | '42'
      | '56'
      | '97'
      | '137'
      | '250'
      | '338'
      | '1337'
      | '43113'
      | '43114'
      | '80001';
  }

  /**
   * Returns the name of the chain
   * @example chain.name // "Ethereum"
   */
  get name() {
    return this._getChainlistData()?.name;
  }

  /**
   * Returns the currency of the chain
   * @returns The cuurrency of the chain or undefined if not found
   *
   * @example chain.currency // EvmNativeCurrency
   */
  get currency() {
    return this._getChainlistData()?.nativeCurrency;
  }

  /**
   * Returns the rpc Urls of the chain
   *
   * @example chain.rpcUrls // ["https://mainnet.infura.io/v3/<infura-key>"]
   */
  get rpcUrls() {
    return this._getChainlistData()?.rpc;
  }

  /**
   * Returns the explorer Urls of the chain
   *
   * @example chain.explorerUrls // ["https://etherscan.io/"]
   */
  get explorer() {
    const explorers = this._getChainlistData()?.explorers;

    if (!explorers || explorers.length === 0) {
      return null;
    }

    return explorers[0];
  }
}
