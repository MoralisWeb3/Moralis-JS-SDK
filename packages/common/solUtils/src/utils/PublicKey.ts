/**
 * Copied (and remove obsolete functionalities) from https://github.com/solana-labs/solana-web3.js/blob/master/src/publickey.ts because
 * - We only care about address validation and conversion
 * - Resolving this dependency in UMD gives dependency errors
 */

import BN from 'bn.js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

/**
 * Size of public key in bytes
 */
export const PUBLIC_KEY_LENGTH = 32;

/**
 * Value to be converted into public key
 */
export type PublicKeyInitData = number | string | Uint8Array | Array<number> | PublicKeyData;

/**
 * JSON object representation of PublicKey class
 */
export type PublicKeyData = {
  /** @internal */
  _bn: BN;
};

function isPublicKeyData(value: PublicKeyInitData): value is PublicKeyData {
  return (value as PublicKeyData)._bn !== undefined;
}

export class PublicKey {
  /** @internal */
  _bn: BN;

  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(value: PublicKeyInitData) {
    if (isPublicKeyData(value)) {
      this._bn = value._bn;
    } else {
      if (typeof value === 'string') {
        // assume base 58 encoding by default
        const decoded = bs58.decode(value);
        if (decoded.length !== PUBLIC_KEY_LENGTH) {
          throw new Error(`Invalid public key input`);
        }
        this._bn = new BN(decoded);
      } else {
        this._bn = new BN(value);
      }

      if (this._bn.byteLength() > PUBLIC_KEY_LENGTH) {
        throw new Error(`Invalid public key input`);
      }
    }
  }

  /**
   * Return the base-58 representation of the public key
   */
  toBase58(): string {
    return bs58.encode(this.toBytes());
  }

  /**
   * Return the byte array representation of the public key in big endian
   */
  toBytes(): Uint8Array {
    const buf = this.toBuffer();
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  /**
   * Return the Buffer representation of the public key in big endian
   */
  toBuffer(): Buffer {
    const b = this._bn.toArrayLike(Buffer);
    if (b.length === PUBLIC_KEY_LENGTH) {
      return b;
    }

    const zeroPad = Buffer.alloc(32);
    b.copy(zeroPad, 32 - b.length);
    return zeroPad;
  }

  get [Symbol.toStringTag](): string {
    return `PublicKey(${this.toString()})`;
  }

  /**
   * Return the base-58 representation of the public key
   */
  toString(): string {
    return this.toBase58();
  }
}
