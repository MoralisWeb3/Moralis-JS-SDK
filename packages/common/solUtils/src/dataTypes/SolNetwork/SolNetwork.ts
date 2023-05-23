import { MoralisData, MoralisDataFormatted, CoreErrorCode, CoreError } from '@moralisweb3/common-core';

const solNetworkNames = ['mainnet', 'devnet'] as const;

/**
 * A name of Solana network.
 *
 * @example "mainnet"
 * @example "devnet"
 */
export type SolNetworkName = typeof solNetworkNames[number];

export type SolNetworkInput = SolNetwork | SolNetworkName | string;

export type SolNetworkJSON = string;

/**
 * Valid input for a new SolNetwork instance.
 * This can be an existing SolNetwork or a valid network name.
 *
 * @example "mainnet"
 * @example "devnet"
 * @example SolNetwork.create("mainnet")
 */
export type SolNetworkish = SolNetworkInput;

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

  public static fromJSON(network: SolNetworkJSON): SolNetwork {
    return SolNetwork.create(network);
  }

  private static parse(network: SolNetworkInput): SolNetworkName {
    if (typeof network === 'string') {
      if (!solNetworkNames.includes(network as SolNetworkName)) {
        throw new CoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: `Solana network is not supported: ${network}`,
        });
      }
    }
    return network as SolNetworkName;
  }

  private constructor(public readonly network: SolNetworkName) {}

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
   */
  public format(): MoralisDataFormatted {
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
  public toJSON(): SolNetworkJSON {
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
