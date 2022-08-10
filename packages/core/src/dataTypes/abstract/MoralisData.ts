import { MoralisDataFormatted } from './types';

export abstract class MoralisData {
  abstract format(style?: unknown): MoralisDataFormatted;
  abstract equals(value: this): boolean;
}
