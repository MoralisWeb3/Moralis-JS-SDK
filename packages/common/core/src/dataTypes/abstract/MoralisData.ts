import { MoralisDataFormatted } from './types';

/**
 * The MoralisData class represents the value of a native currency (like ETH, SOL, BNB etc.)
 *
 * @internal
 * @category DataType
 */
export abstract class MoralisData {
  abstract format(style?: unknown): MoralisDataFormatted;
  abstract equals(value: this): boolean;
}
