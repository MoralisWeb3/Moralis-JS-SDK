import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/ContractSpenderDetails
// type: ContractSpenderDetails
// properties:
// - address ($ref: #/components/schemas/ContractSpenderDetails/properties/address)
// - address_label ($ref: #/components/schemas/ContractSpenderDetails/properties/address_label)
// - name ($ref: #/components/schemas/ContractSpenderDetails/properties/name)
// - symbol ($ref: #/components/schemas/ContractSpenderDetails/properties/symbol)
// - logo ($ref: #/components/schemas/ContractSpenderDetails/properties/logo)

export interface EvmContractSpenderDetailsJSON {
  readonly address: EvmAddressJSON;
  readonly address_label?: string;
  readonly name?: string;
  readonly symbol?: string;
  readonly logo?: string;
}

export interface EvmContractSpenderDetailsInput {
  readonly address: EvmAddressInput | EvmAddress;
  readonly addressLabel?: string;
  readonly name?: string;
  readonly symbol?: string;
  readonly logo?: string;
}

export class EvmContractSpenderDetails {
  public static create(input: EvmContractSpenderDetailsInput | EvmContractSpenderDetails): EvmContractSpenderDetails {
    if (input instanceof EvmContractSpenderDetails) {
      return input;
    }
    return new EvmContractSpenderDetails(input);
  }

  public static fromJSON(json: EvmContractSpenderDetailsJSON): EvmContractSpenderDetails {
    const input: EvmContractSpenderDetailsInput = {
      address: EvmAddress.fromJSON(json.address),
      addressLabel: json.address_label,
      name: json.name,
      symbol: json.symbol,
      logo: json.logo,
    };
    return EvmContractSpenderDetails.create(input);
  }

  public readonly address: EvmAddress;
  public readonly addressLabel?: string;
  public readonly name?: string;
  public readonly symbol?: string;
  public readonly logo?: string;

  private constructor(input: EvmContractSpenderDetailsInput) {
    this.address = EvmAddress.create(input.address);
    this.addressLabel = input.addressLabel;
    this.name = input.name;
    this.symbol = input.symbol;
    this.logo = input.logo;
  }

  public toJSON(): EvmContractSpenderDetailsJSON {
    return {
      address: this.address.toJSON(),
      address_label: this.addressLabel,
      name: this.name,
      symbol: this.symbol,
      logo: this.logo,
    }
  }
}
