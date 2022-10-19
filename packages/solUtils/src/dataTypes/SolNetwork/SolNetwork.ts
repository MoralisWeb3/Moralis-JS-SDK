import { MoralisData, MoralisDataFormatted, CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';

const solNetworkNames = ['mainnet', 'devnet'] as const;

/**
 * A name of Solana network.
 *
 * @example "mainnet"
 * @example "devnet"
 */
export type SolNetworkName = typeof solNetworkNames[number];

/**
 * A name of Solana network.
 *
 * @example "mainnet"
 * @example "devnet"
 */
export type SolNetworkNameish = SolNetworkName | string;

/**
 * Valid input for a new SolNetwork instance.
 * This can be an existing SolNetwork or a valid network name.
 *
 * @example "mainnet"
 * @example "devnet"
 * @example SolNetwork.create("mainnet")
 */
export type SolNetworkish = SolNetwork | SolNetworkNameish;

/**
 * A representation of a Solana network.
 *
 * @category DataType
 */
export class SolNetwork implements MoralisData {
  /**
   * Returns MAINNET network
   *
   * @example SolNetwork.MAINNET
   */
  public static get MAINNET() {
    return SolNetwork.create('mainnet');
  }

  /**
   * Returns DEVNET network
   *
   * @example SolNetwork.MAINNET
   */
  public static get DEVNET() {
    return SolNetwork.create('devnet');
  }

  /**
   * Create a new instance of SolNetwork from any valid network input.
   *
   * @example `const network = SolNetwork.create("mainnet")`
   * @throws an error when a passed network is invalid.
   */
  public static create(network: SolNetworkish): SolNetwork {
    return network instanceof SolNetwork ? network : new SolNetwork(SolNetwork.parse(network));
  }

  private static parse(network: SolNetworkNameish): SolNetworkName {
    if (typeof network === 'string') {
      if (!solNetworkNames.includes(network as SolNetworkName)) {
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: `Solana network is not supported: ${network}`,
        });
      }
    }
    return network as SolNetworkName;
  }

  private constructor(public readonly network: SolNetworkName) {}

  /**
   * Formats the network to a specific format.
   * Currently returns a string representing the network.
   * @example network.format(); // "mainnet"
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.network;
  }

  /**
   * Checks the equality of the current network with another Solana network.
   * @example `network.equals("mainnet")`
   * @example `network.equals(SolNetwork.create("mainnet"))`
   */
  public equals(network: SolNetworkish): boolean {
    return this.network === SolNetwork.create(network).network;
  }

  /**
   * @returns a string representing the network.
   * @example network.toJSON(); // "mainnet"
   */
  public toJSON(): string {
    return this.network;
  }

  /**
   * @returns a string representing the network.
   * @example network.toString(); // "mainnet"
   */
  public toString(): string {
    return this.network;
  }
}
