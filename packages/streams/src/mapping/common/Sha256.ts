import { utils } from 'ethers';

export class Sha256 {
  public static hash(value: string): string {
    const bytes = utils.toUtf8Bytes(value);
    return utils.sha256(bytes);
  }
}
