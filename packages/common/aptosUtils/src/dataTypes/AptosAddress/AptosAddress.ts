import { CoreErrorCode, CoreError, MoralisData, MoralisDataFormatted } from '@moralisweb3/common-core';
import { AccountAddress } from '../../utils/AccountAddress';

/**
 * Valid input for a new AptosAddress instance.
 * This can be an existing AptosAddress or a valid address string.
 *
 * @example "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
 * @example AptosAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")
 */
export type AptosAddressish = AptosAddress | string;

/**
 * A representation of an address on the Aptos network.
 *
 * Use this class any time you work with an address.
 *
 * @category DataType
 */
export class AptosAddress implements MoralisData {
  /**
   * Create a new instance of AptosAddress from any valid address input.
   *
   * @example `const address = AptosAddress.create("0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c")`
   * @throws an error when a passed address is invalid.
   */
  public static create(address: AptosAddressish): AptosAddress {
    return address instanceof AptosAddress ? address : new AptosAddress(AptosAddress.parse(address));
  }

  private static parse(address: string): string {
    try {
      if (!AccountAddress.isValid(address)) {
        // Throw and catch locally to resolve the same way if it is invalid and if it cannot be parsed
        throw new Error();
      }

      return address;
    } catch (e) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Invalid address provided: ${address}`,
        cause: e,
      });
    }
  }

  public constructor(public readonly address: string) {}

  /**
   * Formats the address to hex format.
   * Currently returns a string representing the address.
   * @example address.format(); // "0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c"
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.address;
  }

  /**
   * Check the equality between two Aptos addresses
   * @example `AptosAddress.equals("0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c", "0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c")`
   */
  static equals(addressA: AptosAddressish, addressB: AptosAddressish) {
    return AptosAddress.create(addressA).equals(addressB);
  }

  /**
   * Checks the equality of the current address with another Aptos address.
   * @example `address.equals("0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c")`
   * @example `address.equals(AptosAddress.create("0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c"))`
   */
  public equals(address: AptosAddressish): boolean {
    return this.address === AptosAddress.create(address).address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toString(); // "0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c"
   */
  public toString(): string {
    return this.address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toJSON(); // "0xcd30fbbda98b2aed026772c13e5ed90a7f056b589ef9e78cd96415e1af12451c"
   */
  public toJSON(): string {
    return this.address;
  }
}
