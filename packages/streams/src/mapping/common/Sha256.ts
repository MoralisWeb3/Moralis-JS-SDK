import { ethers } from 'ethers';

export class Sha256 {
  public static hash(value: string): string {
    const bytes = ethers.utils.toUtf8Bytes(value);
    return ethers.utils.sha256(bytes);
  }
}
