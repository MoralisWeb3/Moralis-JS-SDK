import { MoralisDataType } from './MoralisDataType';

export type MoralisObjectValue = {
  [key: string]:
    | null
    | string
    | boolean
    | number
    | string[]
    | boolean[]
    | number[]
    | MoralisObjectValue[]
    | MoralisObjectValue;
};
// TODO: typesafe nested object check that the referenced object is also a MoralisObjectValues
// | Object;

export abstract class MoralisObjectDataType extends MoralisDataType {
  abstract toJSON(): MoralisObjectValue;
}
