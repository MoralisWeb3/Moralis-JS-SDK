import { MoralisDataObject } from '../dataTypes';

class DummyDataType extends MoralisDataObject {
  equals(value: this): boolean {
    return true;
  }

  format(): boolean {
    return true;
  }

  toJSON() {
    return {
      response: true,
    };
  }
}

describe('MoralisDataObject', () => {
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

  it('should execute toJSON function', () => {
    expect(instance.toJSON().response).toBe(true);
  });
});
