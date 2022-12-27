import { StreamSelector } from './StreamSelector';

const TEST_FROM = '$from';
const TEST_CONTRACT = '$contract';
const TEST_INVALID_ADDRESS = 'invalid';

describe('StreamSelector', () => {
  /**
   * Creation
   */
  it('should create a new StreamSelector', () => {
    const selector = StreamSelector.create(TEST_FROM);

    expect(selector.format()).toBe(TEST_FROM);
  });

  it('should throw an error when creating with an invalid string', () => {
    expect(() => StreamSelector.create(TEST_INVALID_ADDRESS)).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid selector string provided"`,
    );
  });

  it('should return the same StreamSelector on calling create with an StreamSelector', () => {
    const selectorA = StreamSelector.create(TEST_FROM);
    const selectorB = StreamSelector.create(selectorA);

    expect(selectorA).toBe(selectorB);
  });

  /**
   * Value
   */
  it('should return the selector string when specified', () => {
    const selector = StreamSelector.create(TEST_FROM);

    const value = selector.format();

    expect(value).toBe(TEST_FROM);
  });

  /**
   * Methods
   */
  it('should check equality of 2 selectors of the same value', () => {
    const selectorA = StreamSelector.create(TEST_FROM);
    const selectorB = StreamSelector.create(TEST_FROM);

    expect(selectorA.equals(selectorB)).toBeTruthy();
  });

  it('should check equality of 2 selectors of the same value via a static method', () => {
    const selectorA = StreamSelector.create(TEST_FROM);
    const selectorB = StreamSelector.create(TEST_FROM);

    expect(StreamSelector.equals(selectorA, selectorB)).toBeTruthy();
  });

  it('should check inequality of 2 selectors of different value', () => {
    const addressA = StreamSelector.create(TEST_FROM);
    const addressB = StreamSelector.create(TEST_CONTRACT);

    expect(addressA.equals(addressB)).toBeFalsy();
  });
});
