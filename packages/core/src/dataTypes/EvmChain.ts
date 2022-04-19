import { ConfigChainIdFormat } from '..';
import { assertUnreachable } from '../Assert/assertUnreachable';
import { chainList, EvmChainListDataEntry } from '../data/chaindata';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisDataType } from './MoralisDataType';
import core from '../MoralisCore';

// TODO: combine logic of chainname, issupported and apihex (as it is all based on the supported servers)
// TODO: Export ChainName enum
// TODO: add chain based on any name in chainData

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
 * The EvmChain class is a MoralisDataType that references to a EVM chain
 * A new instance can be created via `EvmChain.create(chain)`, where the provided chain can be a valid chain number (1),
 * hex-string ("0x1"), or any suppored ChainName
 */
export class EvmChain implements MoralisDataType {
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

  static validate(chain: InputChainId) {
    // TODO: add better validation
    if (typeof chain === 'string') {
      if (isSupportedChainName(chain)) {
        return true;
      }

      if (chain.startsWith('0x')) {
        return true;
      }

      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: "Invalid provided chain, value must be a number, chain-name or a hex-string starting with '0x'",
      });
    }

    return true;
  }

  /**
   * Parse the input to a value that is compatible with the internal _value
   */
  static parse(chain: InputChainId) {
    EvmChain.validate(chain);
    if (typeof chain === 'string') {
      if (isSupportedChainName(chain)) {
        return chainNameToChainIdMap[chain];
      }

      return chain;
    }
    return `0x${chain.toString(16)}`;
  }

  /**
   * Getter to return _chainlistData and throws an error if it is not defined
   */
  private _getChainlistData() {
    if (!this._chainlistData) {
      throw new MoralisCoreError({
        code: CoreErrorCode.NO_DATA_FOUND,
        message: 'Could not find data for the provided chain',
      });
    }

    return this._chainlistData;
  }

  /**
   * Returns true if the chain is supported by Moralis, false otherwise
   */
  get isSupported() {
    return core.config.get('supportedEvmChainIds').includes(this.decimal);
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
  // TODO: add validation and better casting
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
      | `0xfa`;
  }

  /**
   * Compares if 2 chains are equal, based on the chainId
   */
  static equals(chainA: EvmChain, chainB: EvmChain) {
    return chainA._value === chainB._value;
  }

  /**
   * Compares if the current chain is equal to the provided chain, based on the chainId
   */
  equals(chain: EvmChain) {
    return EvmChain.equals(this, chain);
  }

  /**
   * Formats the chain to the given output; in decimal value or as hex-string.
   * The default formatting can be set in MoralisConfig
   */
  format(_formatStyle?: ConfigChainIdFormat) {
    const formatStyle = _formatStyle ?? core.config.get('formatChainId');

    if (formatStyle === 'decimal') {
      return this.decimal;
    }

    if (formatStyle === 'hex') {
      return this.hex;
    }

    return assertUnreachable(formatStyle);
  }

  get name() {
    return this._getChainlistData().name;
  }

  get currency() {
    return this._getChainlistData().nativeCurrency;
  }

  get rpcUrls() {
    return this._getChainlistData().rpc;
  }

  get blockExplorers() {
    return this._getChainlistData().explorers ?? null;
  }
}
