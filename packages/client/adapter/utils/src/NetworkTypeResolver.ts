import { NetworkType } from './Auth';

export class NetworkTypeResolver {
  public static resolveByAddress(address: string): NetworkType {
    if (address.startsWith('0x') && address.length === 42) {
      return 'evm';
    }
    if (address.length === 44) {
      return 'solana';
    }
    throw new Error(`Cannot resolve address type by address: ${address}`);
  }
}
