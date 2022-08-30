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

type InternalEvmChain = string;

/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * A new instance can be created via `EvmChain.create(chain)`, where the provided chain can be a valid chain number (1),
 * hex-string ("0x1"), or any suppored ChainName
 */
export class EvmChain implements MoralisData, EvmChainable {
  public static create(chain: EvmChainish, core?: MoralisCore): EvmChain {
    if (chain instanceof EvmChain) {
      return chain;
    }
    const c = core || MoralisCoreProvider.getDefault();
    return new EvmChain(chain, c.config);
  }

  public static get ETHEREUM() {
    return EvmChain.create(1);
  }
  public static get ROPSTEN() {
    return EvmChain.create(3);
  }
  public static get RINKEBY() {
    return EvmChain.create(4);
  }
  public static get GOERLI() {
    return EvmChain.create(5);
  }
  public static get KOVAN() {
    return EvmChain.create(42);
  }
  public static get POLYGON() {
    return EvmChain.create(137);
  }
  public static get MUMBAI() {
    return EvmChain.create(80001);
  }
  public static get BSC() {
    return EvmChain.create(56);
  }
  public static get BSC_TESTNET() {
    return EvmChain.create(97);
  }
  public static get AVALANCHE() {
    return EvmChain.create(43114);
  }
  public static get FUJI() {
    return EvmChain.create(43113);
  }
  public static get FANTOM() {
    return EvmChain.create(250);
  }
  public static get CRONOS() {
    return EvmChain.create(25);
  }
  public static get CRONOS_TESTNET() {
    return EvmChain.create(338);
  }

  // hex-string chainId
  private _value: InternalEvmChain;
  private _chainlistData: EvmChainListDataEntry | null;

  private constructor(value: InputChainId, private readonly config: Config) {
    this._value = EvmChainParser.parse(value);
    this._chainlistData = chainList.find((chainData) => chainData.chainId === this.decimal) ?? null;
  }

  /**
   * Getter to return _chainlistData and throws an error if it is not defined
   */
  private _getChainlistData() {
    if (!this._chainlistData) {
      return null;
    }

    return this._chainlistData;
  }

  /**
   * Returns the decimal representation of the chain
   */
  get decimal() {
    return parseInt(this._value, 16);
  }

  /**
   * Returns the hex-string representation of the chain
   */
  get hex() {
    return this._value;
  }

  /**
   * Validate and cast to api compatible hex
   */
  get apiHex() {
    return this._value as
      | '0x1'
      | `0x3`
      | `0x4`
      | `0x5`
      | `0x2a`
      | `0x89`
      | `0x13881`
      | `0x38`
      | `0x61`
      | `0xa86a`
      | `0xa869`
      | `0xfa`
      | 'cronos'
      | '0x19';
  }

  /**
   * Compares if 2 chains are equal, based on the chainId
   */
  static equals(chainA: EvmChainish, chainB: EvmChainish) {
    return EvmChain.create(chainA)._value === EvmChain.create(chainB)._value;
  }

  /**
   * Compares if the current chain is equal to the provided chain, based on the chainId
   */
  equals(chain: EvmChainish) {
    return EvmChain.equals(this, chain);
  }

  /**
   * Formats the chain to the given output; in decimal value or as hex-string.
   * The default formatting can be set in MoralisConfig
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

  display() {
    return this.name ? `${this.name} (${this.hex})` : this.hex;
  }

  get name() {
    return this._getChainlistData()?.name;
  }

  get currency() {
    return this._getChainlistData()?.nativeCurrency;
  }

  get rpcUrls() {
    return this._getChainlistData()?.rpc;
  }

  get explorer() {
    const explorers = this._getChainlistData()?.explorers;

    if (!explorers || explorers.length === 0) {
      return null;
    }

    return explorers[0];
  }

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
}
