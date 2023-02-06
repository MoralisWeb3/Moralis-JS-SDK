import { MoralisData, MoralisDataFormatted, CoreErrorCode, CoreError } from '@moralisweb3/common-core';

const aptosNetworkNames = ['mainnet', 'testnet', 'devnet'] as const;
const aptosChainIdToNetworkNames: Record<string,AptosNetworkName>  = {
  "1": 'mainnet',
  "2": 'testnet',
}

/**
 * A name of Aptos network.
 *
 * @example "mainnet"
 * @example "devnet"
 */
export type AptosNetworkName = typeof aptosNetworkNames[number];


/**
 * A name of Aptos network.
 *
 * @example "mainnet"
 * @example "devnet"
 */
export type AptosNetworkNameish = AptosNetworkName | string;

/**
 * Valid input for a new AptosNetwork instance.
 * This can be an existing AptosNetwork or a valid network name.
 *
 * @example "mainnet"
 * @example "devnet"
 * @example AptosNetwork.create("mainnet")
 */
export type AptosNetworkish = AptosNetwork | AptosNetworkNameish;

/**
 * A representation of a Aptos network.
 *
 * @category DataType
 */
export class AptosNetwork implements MoralisData {
  /**
   * Returns MAINNET network
   *
   * @example AptosNetwork.MAINNET
   */
  public static get MAINNET() {
    return AptosNetwork.create('mainnet');
  }
  /**
   * Returns TESTNET network
   *
   * @example AptosNetwork.MAINNET
   */
  public static get TESTNET() {
    return AptosNetwork.create('testnet');
  }

  /**
   * Returns DEVNET network
   *
   * @example AptosNetwork.MAINNET
   */
  public static get DEVNET() {
    return AptosNetwork.create('devnet');
  }

  /**
   * Create a new instance of AptosNetwork from any valid network input.
   *
   * @example `const network = AptosNetwork.create("mainnet")`
   * @throws an error when a passed network is invalid.
   */
  public static create(network: AptosNetworkish): AptosNetwork {
    return network instanceof AptosNetwork ? network : new AptosNetwork(AptosNetwork.parse(network));
  }

  private static parse(network: AptosNetworkNameish): AptosNetworkName {
    if(typeof network !== 'string') {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Aptos network is not supported: ${network}`,
      });
    }

    const networkName = aptosChainIdToNetworkNames[network] ?? network

    if (!aptosNetworkNames.includes(networkName as AptosNetworkName)) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Aptos network is not supported: ${network}`,
      });
    }

    return networkName as AptosNetworkName;
  }

  private constructor(public readonly network: AptosNetworkName) {}

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
   * Checks the equality of the current network with another Aptos network.
   * @example `network.equals("mainnet")`
   * @example `network.equals(AptosNetwork.create("mainnet"))`
   */
  public equals(network: AptosNetworkish): boolean {
    return this.network === AptosNetwork.create(network).network;
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
