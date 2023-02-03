import { CoreErrorCode, CoreError, MoralisData, MoralisDataFormatted } from '@moralisweb3/common-core';
import { getSolanaWeb3 } from '../../utils/getSolanaWeb3';

/**
 * Valid input for a new SolAddress instance.
 * This can be an existing SolAddress or a valid address string.
 *
 * @example "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
 * @example SolAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")
 */
export type SolAddressish = SolAddress | string;

/**
 * A representation of an address on the Solana network.
 *
 * Use this class any time you work with an address.
 *
 * @category DataType
 */
export class SolAddress implements MoralisData {
  /**
   * Create a new instance of SolAddress from any valid address input.
   *
   * @example `const address = SolAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")`
   * @throws an error when a passed address is invalid.
   */
  public static create(address: SolAddressish): SolAddress {
    return address instanceof SolAddress ? address : new SolAddress(SolAddress.parse(address));
  }

  private static parse(address: string): string {
    const { PublicKey } = getSolanaWeb3();

    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58();
    } catch (e) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Invalid Solana address provided: ${address}`,
        cause: e,
      });
    }
  }

  public constructor(public readonly address: string) {}

  /**
   * Formats the address to a specific format.
   * Currently returns a string representing the address.
   * @example address.format(); // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.address;
  }

  /**
   * Checks the equality of the current address with another Solana address.
   * @example `address.equals("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")`
   * @example `address.equals(SolAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"))`
   */
  public equals(address: SolAddressish): boolean {
    return this.address === SolAddress.create(address).address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toString(); // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
   */
  public toString(): string {
    return this.address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toJSON(); // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
   */
  public toJSON(): string {
    return this.address;
  }
}
