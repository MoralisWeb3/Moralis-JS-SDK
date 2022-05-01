import { MoralisData } from './MoralisData';
import { MoralisDataObjectValue } from './types';

export abstract class MoralisDataObject extends MoralisData {
  abstract toJSON(): MoralisDataObjectValue;
}
