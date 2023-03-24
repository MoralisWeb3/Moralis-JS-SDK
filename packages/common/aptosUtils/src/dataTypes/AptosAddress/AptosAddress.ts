import { CoreErrorCode, CoreError, MoralisData, MoralisDataFormatted } from '@moralisweb3/common-core';
import { AccountAddress } from '../../utils/AccountAddress';

/**
 * Valid input for a new AptosAddress instance.
 * This can be an existing AptosAddress or a valid address string.
 *
 * @example "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
 * @example AptosAddress.create("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")
 */
export type AptosAddressInput = AptosAddress | string;

export type AptosAddressJSON = string;

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
   * @example `const address = AptosAddress.create("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
   * @throws an error when a passed address is invalid.
   */
  public static create(address: AptosAddressInput): AptosAddress {
    if (address instanceof AptosAddress) {
      return address;
    }
    return new AptosAddress(AptosAddress.parse(address));
  }

  public static fromJSON(json: AptosAddressJSON): AptosAddress {
    return AptosAddress.create(json);
  }

  private static parse(address: string): string {
    try {
      if (!AccountAddress.isValid(address)) {
        throw new Error('Address is invalid');
      }
    } catch (e) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Invalid address provided: ${address}`,
        cause: e,
      });
    }

    if (address.startsWith('0x')) {
      address = address.substring(2);
    }
    return '0x' + address.padStart(64, '0');
  }

  public constructor(public readonly address: string) {}

  /**
   * Formats the address to hex format.
   * Currently returns a string representing the address.
   * @example address.format(); // "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.address;
  }

  /**
   * Check the equality between two Aptos addresses
   * @example `AptosAddress.equals("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90", "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
   */
  static equals(addressA: AptosAddressInput, addressB: AptosAddressInput) {
    return AptosAddress.create(addressA).equals(addressB);
  }

  /**
   * Checks the equality of the current address with another Aptos address.
   * @example `address.equals("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
   * @example `address.equals(AptosAddress.create("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"))`
   */
  public equals(address: AptosAddressInput): boolean {
    return this.address === AptosAddress.create(address).address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toString(); // "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
   */
  public toString(): string {
    return this.address;
  }

  /**
   * @returns a string representing the address.
   * @example address.toJSON(); // "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
   */
  public toJSON(): AptosAddressJSON {
    return this.address;
  }

  /**
   * @returns a string representing the address, the leading zeros are removed from the address.
   * @example address.short; // "0x1"
   */
  public get short(): string {
    return '0x' + this.address.substring(2).replace(/^0+/, '');
  }
}
