import { CoreError, CoreErrorCode, MoralisData } from '@moralisweb3/common-core';

/**
 * This can be a string that starts with $ and is the path of any field in the stream data.
 */
export type StreamSelectorInput = string;

/**
 * Valid input for a new StreamSelector instance.
 * This can be an existing StreamSelector or a valid input string.
 */
export type StreamSelectorish = StreamSelector | StreamSelectorInput;

/**
 * The StreamSelector class is a representation of a stream selector
 *
 * Use this class any time you want to use a value in your stream trigger data that is not a static value
 *
 * @category DataType
 */
export class StreamSelector implements MoralisData {
  private readonly _value: string;

  /**
   * Create a new instance of StreamSelector from any valid stream data field
   *
   * @example
   * ```
   * const receiverSelector = StreamSelector.create('$to')
   * const selector = StreamSelector.create('$contract')
   * ```
   */
  constructor(data: StreamSelectorInput) {
    this._value = StreamSelector.parse(data);
  }

  static isSelectorString(selector: StreamSelectorish): boolean {
    if (selector instanceof StreamSelector) {
      return true;
    }

    return selector.startsWith('$');
  }

  static create(streamSelector: StreamSelectorish) {
    if (streamSelector instanceof StreamSelector) {
      return streamSelector;
    }
    return new StreamSelector(streamSelector);
  }

  private static parse(streamSelector: StreamSelectorInput) {
    if (!StreamSelector.isSelectorString(streamSelector)) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: 'Invalid selector string provided',
      });
    }

    return streamSelector;
  }

  /**
   * Compares two StreamSelector data. It checks a deep equality check of both values.
   * @param valueA - the first StreamSelectorish data to compare
   * @param valueB - the second StreamSelectorish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamSelector.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamSelectorish, valueB: StreamSelectorish) {
    const streamSelectorA = StreamSelector.create(valueA);
    const streamSelectorB = StreamSelector.create(valueB);

    return streamSelectorA.value === streamSelectorB.value;
  }

  /**
   * Compares an StreamSelectorish data to this StreamSelector instance.
   * @param streamSelector - the streamSelector to compare
   * @returns true if the streamSelector is equal to the current instance, false otherwise
   * @example
   * ```ts
   * streamSelector.equals(streamSelector);
   * ```
   */
  equals(streamSelector: StreamSelectorish) {
    return StreamSelector.equals(this, streamSelector);
  }

  /**
   * Converts the StreamSelector instance to a JSON object.
   * @returns JSON object of the StreamSelector instance
   * @example `streamSelector.format()`
   */
  format() {
    return this.value;
  }

  /**
   * @returns the selector path
   * @example '$from'
   */
  get value() {
    return this._value;
  }

  public toJSON() {
    return this.value;
  }
}
