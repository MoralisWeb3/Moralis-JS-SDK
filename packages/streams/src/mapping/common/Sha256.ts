import { sha256 } from '@ethersproject/sha2';
import { toUtf8Bytes } from '@ethersproject/strings';

export class Sha256 {
  public static hash(value: string): string {
    const bytes = toUtf8Bytes(value);
    return sha256(bytes);
  }
}
