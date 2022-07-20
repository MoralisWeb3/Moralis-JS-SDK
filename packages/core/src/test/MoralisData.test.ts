import { MoralisData } from '../dataTypes';

class DummyDataType extends MoralisData {
  equals(value: this): boolean {
    return true;
  }

  format(): boolean {
    return true;
  }
}

describe('MoralisData', () => {
  let instance: DummyDataType;
  beforeEach(() => {
    instance = new DummyDataType();
  });

  it('should execute equals function', () => {
    expect(instance.equals(instance)).toBe(true);
  });

  it('should execute format function', () => {
    expect(instance.format()).toBe(true);
  });
});
