import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/TransactionEventGuid
// type: TransactionEventGuid
// properties:
// - creation_number ($ref: #/components/schemas/TransactionEventGuid/properties/creation_number)
// - account_address ($ref: #/components/schemas/TransactionEventGuid/properties/account_address)

export interface AptosTransactionEventGuidJSON {
  readonly creation_number: string;
  readonly account_address: AptosAddressJSON;
}

export interface AptosTransactionEventGuidInput {
  readonly creationNumber: string;
  readonly accountAddress: AptosAddressInput | AptosAddress;
}

export class AptosTransactionEventGuid {
  public static create(input: AptosTransactionEventGuidInput | AptosTransactionEventGuid): AptosTransactionEventGuid {
    if (input instanceof AptosTransactionEventGuid) {
      return input;
    }
    return new AptosTransactionEventGuid(input);
  }

  public static fromJSON(json: AptosTransactionEventGuidJSON): AptosTransactionEventGuid {
    const input: AptosTransactionEventGuidInput = {
      creationNumber: json.creation_number,
      accountAddress: AptosAddress.fromJSON(json.account_address),
    };
    return AptosTransactionEventGuid.create(input);
  }

  /**
   * @description A string containing a 64-bit unsigned integer.
   * We represent u64 values as a string to ensure compatibility with languages such as JavaScript that do not parse u64s in JSON natively.
   */
  public readonly creationNumber: string;
  /**
   * @description A hex encoded 32 byte Aptos account address.
   * This is represented in a string as a 64 character hex string, sometimes shortened by stripping leading 0s, and adding a 0x.
   */
  public readonly accountAddress: AptosAddress;

  private constructor(input: AptosTransactionEventGuidInput) {
    this.creationNumber = input.creationNumber;
    this.accountAddress = AptosAddress.create(input.accountAddress);
  }

  public toJSON(): AptosTransactionEventGuidJSON {
    return {
      creation_number: this.creationNumber,
      account_address: this.accountAddress.toJSON(),
    }
  }
}
