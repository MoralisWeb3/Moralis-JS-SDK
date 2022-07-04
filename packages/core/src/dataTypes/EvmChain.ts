import { EvmChainIdFormat } from '../Config/configOptions';
import { assertUnreachable } from '../Assert/assertUnreachable';
import { chainList, EvmChainListDataEntry } from '../data/chaindata';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import core from '../MoralisCore';
import { MoralisData } from './abstract';

// Chain names, that are accepted by the evm api
export type ChainName =
  | 'eth'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'polygon'
  | 'mumbai'
  | 'bsc'
  | 'bsc testnet'
  | 'avalanche'
  | 'avalanche testnet'
  | 'fantom';

// hex-string, ChainNameor a number
export type InputChainId = string | ChainName | number;
export type EvmChainish = EvmChain | InputChainId;

type InternalEvmChain = string;

const isSupportedChainName = (value: string): value is ChainName => {
  return value in chainNameToChainIdMap;
};

const chainNameToChainIdMap = {
  eth: '0x1',
  ropsten: '0x2',
  rinkeby: '0x3',
  goerli: '0x5',
  kovan: '0x2a',
  polygon: '0x89',
  mumbai: '0x13881',
  bsc: '0x38',
  'bsc testnet': '0x61',
  avalanche: '0xa86a',
  'avalanche testnet': '0xa869',
  fantom: '0xfa',
} as const;

/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * A new instance can be created via `EvmChain.create(chain)`, where the provided chain can be a valid chain number (1),
 * hex-string ("0x1"), or any suppored ChainName
 */
export class EvmChain implements MoralisData {
  // hex-string chainId
  private _value: InternalEvmChain;
  private _chainlistData: EvmChainListDataEntry | null;

  constructor(value: InputChainId) {
    this._value = EvmChain.parse(value);
    this._chainlistData = chainList.find((chainData) => chainData.chainId === this.decimal) ?? null;
  }

  /**
   * Accepts a {@link EvmChainish} value and returns a new EvmChain or an already existing EvmChain
   */
  static create(chain: EvmChainish) {
    if (chain instanceof EvmChain) {
      return chain;
    }
    return new EvmChain(chain);
  }

  /**
   * Parse the input to a value that is compatible with the internal _value
   */
  static parse(chain: InputChainId) {
    if (typeof chain === 'string') {
      if (isSupportedChainName(chain)) {
        return chainNameToChainIdMap[chain];
      }

      if (chain.startsWith('0x') && chain !== '0x' && chain !== '0x0') {
        return chain;
      }
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message:
          "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
      });
    } else {
      if (chain <= 0) {
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message:
            "Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'",
        });
      }
      return `0x${chain.toString(16)}`;
    }
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
    const formatStyle = _formatStyle ?? core.config.get('formatEvmChainId');

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
    const explorer = this.explorer;

    if (!explorer || explorer.standard !== 'EIP3091') {
      return null;
    }

    const url = explorer.url;

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
