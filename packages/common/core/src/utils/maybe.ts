/**
 * Converts `null` or `undefined` values to `undefined`
 * Optionally, the value gets transformed by the second argument
 */
export function maybe<Value>(value: Value | null | undefined): Value | undefined;
export function maybe<Value, Output>(
  value: Value | null | undefined,
  transform: (value: Value) => Output,
): Output | undefined;
export function maybe<Value, Output>(value: Value | null | undefined, transform?: (value: Value) => Output) {
  if (value == null) {
    return undefined;
  }

  if (transform) {
    return transform(value);
  }

  return value;
}
