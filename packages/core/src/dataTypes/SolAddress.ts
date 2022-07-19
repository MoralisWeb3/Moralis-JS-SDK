import { MoralisData, MoralisDataFormatted } from './abstract';

export type SolAddressish = SolAddress | string;

export class SolAddress implements MoralisData {
  public static create(address: SolAddressish): SolAddress {
    return address instanceof SolAddress ? address : new SolAddress(SolAddress.parse(address));
  }

  private static parse(address: string): string {
    // TODO: add address validation
    return address;
  }

  public get lowercase() {
    return this.address.toLowerCase();
  }

  public constructor(public readonly address: string) {}

  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.address;
  }

  public equals(address: SolAddress): boolean {
    return this.lowercase === address.lowercase;
  }

  public toString(): string {
    return this.address;
  }

  public toJSON(): string {
    return this.address;
  }
}
