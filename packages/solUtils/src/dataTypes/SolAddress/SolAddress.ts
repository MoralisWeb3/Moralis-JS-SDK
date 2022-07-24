import { MoralisData, MoralisDataFormatted } from "@moralisweb3/core";

export type SolAddressish = SolAddress | string;

export class SolAddress implements MoralisData {
  public static create(address: SolAddressish): SolAddress {
    return address instanceof SolAddress ? address : new SolAddress(SolAddress.parse(address));
  }

  private static parse(address: string): string {
    // TODO: add address validation
    return address;
  }

  public constructor(public readonly address: string) {}

  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.address;
  }

  public equals(address: SolAddress): boolean {
    return this.address === address.address;
  }

  public toString(): string {
    return this.address;
  }

  public toJSON(): string {
    return this.address;
  }
}
