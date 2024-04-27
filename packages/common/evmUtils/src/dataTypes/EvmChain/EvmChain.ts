import { chainList } from '../../data/chaindata';
import { EvmChainListDataEntry, EvmNativeCurrency } from '../../data/types';
import { EvmChainParser } from './EvmChainParser';
import { EvmChainish, InputChainId } from './EvmChainish';
import { EvmChainable } from '@moralisweb3/common-core';

/**
 * This can be any valid EVM chain in decimal or hex.
 * @example 3
 * @example "0x1"
 */
type InternalEvmChain = string;

export type EvmChainInput = string;
export type EvmChainJSON = string;

/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * @category DataType
 */
export class EvmChain implements EvmChainable {
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

  /**
   * Returns SEPOLIA chain
   *
   * @example EvmChain.SEPOLIA
   */
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
   * Returns AVALANCHE_TESTNET chain
   *
   * @example EvmChain.AVALANCHE_TESTNET
   */
  public static get AVALANCHE_TESTNET() {
    return EvmChain.create(0xa869);
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
   * Returns FANTOM_TESTNET chain
   *
   * @example EvmChain.FANTOM_TESTNET
   */
  public static get FANTOM_TESTNET() {
    return EvmChain.create(4002);
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
   * Returns PALM chain
   *
   * @example EvmChain.PALM
   */
  public static get PALM() {
    return EvmChain.create(11297108109);
  }

  /**
   * Returns ARBITRUM chain
   *
   * @example EvmChain.ARBITRUM
   */
  public static get ARBITRUM() {
    return EvmChain.create(42161);
  }

  /**
   * Returns ARBITRUM_TESTNET chain
   *
   * @example EvmChain.ARBITRUM_TESTNET
   */
  public static get ARBITRUM_TESTNET() {
    return EvmChain.create(421613);
  }

  /**
   * Returns RONIN chain
   *
   * @example EvmChain.RONIN
   */
  public static get RONIN() {
    return EvmChain.create(2020);
  }

  /**
   * Returns OPTIMISM chain
   *
   * @example EvmChain.OPTIMISM
   */
  public static get OPTIMISM() {
    return EvmChain.create(10);
  }

  /**
   * Returns CHILIZ chain
   *
   * @example EvmChain.CHILIZ
   */
  public static get CHILIZ() {
    return EvmChain.create(88888);
  }

  /**
   * Returns CHILIZ_TESTNET chain
   *
   * @example EvmChain.CHILIZ_TESTNET
   */
  public static get CHILIZ_TESTNET() {
    return EvmChain.create(88882);
  }

  /**
   * Returns GNOSIS chain
   *
   * @example EvmChain.GNOSIS
   */
  public static get GNOSIS() {
    return EvmChain.create(100);
  }

  /**
   * Returns GNOSIS_TESTNET chain
   *
   * @example EvmChain.GNOSIS_TESTNET
   */
  public static get GNOSIS_TESTNET() {
    return EvmChain.create(10200);
  }

  /**
   * Returns BASE chain
   *
   * @example EvmChain.BASE
   */
  public static get BASE() {
    return EvmChain.create(8453);
  }

  /**
   * Returns BASE_TESTNET chain
   *
   * @example EvmChain.BASE_TESTNET
   */
  public static get BASE_TESTNET() {
    return EvmChain.create(84531);
  }

  /**
   * Returns BASE_SEPOLIA chain
   *
   * @example EvmChain.BASE_SEPOLIA
   */
  public static get BASE_SEPOLIA() {
    return EvmChain.create(84532);
  }

  /**
   * Returns HOLESKY chain
   *
   * @example EvmChain.HOLESKY
   */
  public static get HOLESKY() {
    return EvmChain.create(0x4268);
  }

  /**
   * Returns POLYGON_AMOY chain
   *
   * @example EvmChain.POLYGON_AMOY
   */
  public static get POLYGON_AMOY() {
    return EvmChain.create(80002);
  }

  /**
   * Returns LINEA chain
   *
   * @example EvmChain.LINEA
   */
  public static get LINEA() {
    return EvmChain.create(59144);
  }
  /**
   * Returns MOONRIVER chain
   *
   * @example EvmChain.MOONRIVER
   */
  public static get MOONRIVER() {
    return EvmChain.create(1285);
  }

  /**
   * Returns MOONBEAM chain
   *
   * @example EvmChain.MOONBEAM
   */
  public static get MOONBEAM() {
    return EvmChain.create(1284);
  }
  /**
   * Returns MOONBASE chain
   *
   * @example EvmChain.MOONBASE
   */
  public static get MOONBASE() {
    return EvmChain.create(1287);
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
  public static create(chain: EvmChainish): EvmChain {
    if (chain instanceof EvmChain) {
      return chain;
    }
    return new EvmChain(chain);
  }

  // hex-string chainId
  private _value: InternalEvmChain;
  private _chainlistData: EvmChainListDataEntry | null;

  private constructor(value: InputChainId) {
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
   * @returns all the available chains
   */
  public static values(): EvmChain[] {
    return [
      EvmChain.ETHEREUM,
      EvmChain.GOERLI,
      EvmChain.SEPOLIA,
      EvmChain.POLYGON,
      EvmChain.MUMBAI,
      EvmChain.BSC,
      EvmChain.BSC_TESTNET,
      EvmChain.AVALANCHE,
      EvmChain.AVALANCHE_TESTNET,
      EvmChain.FANTOM,
      EvmChain.FANTOM_TESTNET,
      EvmChain.CRONOS,
      EvmChain.PALM,
      EvmChain.ARBITRUM,
      EvmChain.ARBITRUM_TESTNET,
      EvmChain.RONIN,
      EvmChain.OPTIMISM,
      EvmChain.CHILIZ,
      EvmChain.CHILIZ_TESTNET,
      EvmChain.GNOSIS,
      EvmChain.GNOSIS_TESTNET,
      EvmChain.BASE,
      EvmChain.BASE_TESTNET,
      EvmChain.BASE_SEPOLIA,
      EvmChain.HOLESKY,
      EvmChain.POLYGON_AMOY,
      EvmChain.LINEA,
      EvmChain.MOONBEAM,
      EvmChain.MOONRIVER,
      EvmChain.MOONBASE,
    ];
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
      | '0xfa2'
      | '0x19'
      | '0x152'
      | '0x2a15c308d'
      | '0xa4b1'
      | '0x7e4'
      | '0x66eed'
      | '0xa'
      | '0x15b38'
      | '0x15b32'
      | '0x64'
      | '0x27d8'
      | '0x2105'
      | '0x14a33'
      | '0x4268'
      | '0x13882'
      | '0xe708'
      | '0x504'
      | '0x505'
      | '0x507';
  }

  /**
   * Returns the name of the chain
   * @example chain.name // "Ethereum"
   */
  get name(): string | undefined {
    return this._getChainlistData()?.name;
  }

  /**
   * Returns the currency of the chain
   * @returns The cuurrency of the chain or undefined if not found
   *
   * @example chain.currency // EvmNativeCurrency
   */
  get currency(): EvmNativeCurrency | undefined {
    return this._getChainlistData()?.nativeCurrency;
  }

  /**
   * Returns the rpc Urls of the chain
   *
   * @example chain.rpcUrls // ["https://mainnet.infura.io/v3/<infura-key>"]
   */
  get rpcUrls(): string[] | undefined {
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

  /**
   * Returns the chain as a string.
   * @returns The chain.
   */
  public toJSON(): EvmChainJSON {
    return this.hex;
  }
}
