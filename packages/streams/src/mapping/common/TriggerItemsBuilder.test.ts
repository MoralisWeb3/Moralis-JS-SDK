import { TriggerItem, TriggerItemValue } from '../storage';
import { TriggerItemsBuilder } from './TriggerItemsBuilder';

describe('TriggerItemsBuilder', () => {
  it('returns undefined if argument is null or undefined', () => {
    expect(TriggerItemsBuilder.build(undefined)).toBeUndefined();
    expect(TriggerItemsBuilder.build(null as any)).toBeUndefined();
  });

  it('returns undefined if array has 0 length', () => {
    expect(TriggerItemsBuilder.build([])).toBeUndefined();
  });

  it('keeps basic types', () => {
    const items = TriggerItemsBuilder.build([
      {
        name: 'str',
        value: '100',
      },
      {
        name: 'num',
        value: 200,
      },
      {
        name: 'bool',
        value: true,
      },
    ]) as TriggerItem[];

    expect(items[0].name).toBe('str');
    expect(items[0].value).toBe('100');

    expect(items[1].name).toBe('num');
    expect(items[1].value).toBe(200);

    expect(items[2].name).toBe('bool');
    expect(items[2].value).toBe(true);
  });

  it('converts arrays', () => {
    const items = TriggerItemsBuilder.build([
      {
        name: 'prices',
        value: [100, 200, '300', [400, 500]],
      },
    ]) as TriggerItem[];

    expect(items[0].name).toBe('prices');
    const values = items[0].value as TriggerItemValue[];
    expect(values[0]).toBe(100);
    expect(values[1]).toBe(200);
    expect(values[2]).toBe('300');
    const values3 = values[3] as TriggerItemValue[];
    expect(values3[0]).toBe(400);
    expect(values3[1]).toBe(500);
  });

  it('converts non-basic types to string', () => {
    const items = TriggerItemsBuilder.build([
      {
        name: 'obj',
        value: { value: -1 },
      },
      {
        name: 'arr',
        value: [1, 2, [3, 4], { value: -1 }],
      },
    ]) as TriggerItem[];

    expect(items[0].name).toBe('obj');
    expect(items[0].value).toBe('[object Object]');

    expect(items[1].name).toBe('arr');
    const arrValues = items[1].value as TriggerItemValue[];
    expect(arrValues[0]).toBe(1);
    expect(arrValues[1]).toBe(2);
    expect(Array.isArray(arrValues[2])).toBe(true);
    expect(arrValues[3]).toBe('[object Object]');
  });
});
