import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/ContractTokenDetails
// type: ContractTokenDetails
// properties:
// - address ($ref: #/components/schemas/ContractTokenDetails/properties/address)
// - address_label ($ref: #/components/schemas/ContractTokenDetails/properties/address_label)
// - token_name ($ref: #/components/schemas/ContractTokenDetails/properties/token_name)
// - token_logo ($ref: #/components/schemas/ContractTokenDetails/properties/token_logo)
// - token_symbol ($ref: #/components/schemas/ContractTokenDetails/properties/token_symbol)

export interface EvmContractTokenDetailsJSON {
  readonly address: EvmAddressJSON;
  readonly address_label?: string;
  readonly token_name: string;
  readonly token_logo: string;
  readonly token_symbol: string;
}

export interface EvmContractTokenDetailsInput {
  readonly address: EvmAddressInput | EvmAddress;
  readonly addressLabel?: string;
  readonly tokenName: string;
  readonly tokenLogo: string;
  readonly tokenSymbol: string;
}

export class EvmContractTokenDetails {
  public static create(input: EvmContractTokenDetailsInput | EvmContractTokenDetails): EvmContractTokenDetails {
    if (input instanceof EvmContractTokenDetails) {
      return input;
    }
    return new EvmContractTokenDetails(input);
  }

  public static fromJSON(json: EvmContractTokenDetailsJSON): EvmContractTokenDetails {
    const input: EvmContractTokenDetailsInput = {
      address: EvmAddress.fromJSON(json.address),
      addressLabel: json.address_label,
      tokenName: json.token_name,
      tokenLogo: json.token_logo,
      tokenSymbol: json.token_symbol,
    };
    return EvmContractTokenDetails.create(input);
  }

  public readonly address: EvmAddress;
  public readonly addressLabel?: string;
  public readonly tokenName: string;
  public readonly tokenLogo: string;
  public readonly tokenSymbol: string;

  private constructor(input: EvmContractTokenDetailsInput) {
    this.address = EvmAddress.create(input.address);
    this.addressLabel = input.addressLabel;
    this.tokenName = input.tokenName;
    this.tokenLogo = input.tokenLogo;
    this.tokenSymbol = input.tokenSymbol;
  }

  public toJSON(): EvmContractTokenDetailsJSON {
    return {
      address: this.address.toJSON(),
      address_label: this.addressLabel,
      token_name: this.tokenName,
      token_logo: this.tokenLogo,
      token_symbol: this.tokenSymbol,
    }
  }
}
