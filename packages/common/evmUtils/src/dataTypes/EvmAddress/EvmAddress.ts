import {
  MoralisCore,
  MoralisCoreProvider,
  EvmAddressFormat,
  Config,
  CoreErrorCode,
  MoralisCoreError,
  MoralisData,
} from '@moralisweb3/common-core';
import { getAddress, isAddress } from '@ethersproject/address';
import { CommonEvmUtilsConfig } from '../../config/CommonEvmUtilsConfig';

/**
 * This can be any valid EVM address, formatted as lowercase or checksum.
 * @example "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"
 * @example "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
 */
export type EvmAddressInput = string;

/**
 * Valid input for a new EvmAddress instance.
 * This can be an existing EvmAddress or a valid address string as lowercase, or checksum format.
 */
export type EvmAddressish = EvmAddress | EvmAddressInput;

/**
 * A representation of an address on the EVM network.
 *
 * Use this class any time you work with an address, as it will provide utilities to validate the address,
 * and format it to lowercase and checksum format.
 *
 * @category DataType
 */
export class EvmAddress implements MoralisData {
  /**
   * @returns EvmAddress instance of the zero address: "0x0000000000000000000000000000000000000000"
   * @example `EvmAddress.ZERO_ADDRESS`
   */
  public static get ZERO_ADDRESS() {
    return EvmAddress.create('0x0000000000000000000000000000000000000000');
  }

  /**
   * Create a new instance of EvmAddress from any valid address input
   *
   * @example
   * ```
   * const address = EvmAddress.create("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")
   * const address = EvmAddress.create("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359")
   * const address = EvmAddress.ZERO_ADDRESS
   * ```
   */
  public static create(address: EvmAddressish, core?: MoralisCore) {
    if (address instanceof EvmAddress) {
      return address;
    }
    const finalCore = core || MoralisCoreProvider.getDefault();
    return new EvmAddress(address, finalCore.config);
  }

  /**
   * Internal reference of the address in checksum format
   */
  private _value: string;

  public constructor(address: EvmAddressInput, private readonly config: Config) {
    this._value = EvmAddress.parse(address);
  }

  private static parse(address: EvmAddressInput) {
    if (!isAddress(address)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Invalid address provided',
      });
    }
    return getAddress(address);
  }

  /**
   * Check the equality between two Evm addresses
   * @example `EvmAddress.equals("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")`
   */
  static equals(addressA: EvmAddressish, addressB: EvmAddressish) {
    return EvmAddress.create(addressA)._value === EvmAddress.create(addressB)._value;
  }

  /**
   * Checks the equality of the current address with another evm address
   * @example `address.equals("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")`
   */
  equals(address: EvmAddressish) {
    return EvmAddress.equals(this, address);
  }

  /**
   * Formats the address to a specific format.
   * If no formatStyle is provided as argument, it will use the `formatEvmAddress` set in the config.
   * @example `address.format() // "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"`
   */
  format(style?: EvmAddressFormat) {
    const formatStyle = style ?? this.config.get(CommonEvmUtilsConfig.formatEvmAddress);

    if (formatStyle === 'checksum') {
      return this.checksum;
    }

    if (formatStyle === 'lowercase') {
      return this.lowercase;
    }

    throw new MoralisCoreError({
      code: CoreErrorCode.INVALID_ARGUMENT,
      message: 'Cannot format address, invalid config.formatAddress',
    });
  }

  /**
   * @returns the address value in checksum (EIP-55) format (see https://eips.ethereum.org/EIPS/eip-55)
   * @example `address.checksum // "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"`
   */
  get checksum() {
    return this._value;
  }

  /**
   * @returns the address value in lowercase format
   * @example `address.lowercase // "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"`
   */
  get lowercase() {
    return this._value.toLowerCase();
  }
}
