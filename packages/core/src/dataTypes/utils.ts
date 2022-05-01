/**
 * Converts undefined values to `null`
 * Optionally, the value gets transformed by the second argument
 */
export function maybe<Value, Output>(value: Value | null | undefined): Value;
export function maybe<Value, Output>(value: Value | null | undefined, transform: (value: Value) => Output): Output;
export function maybe<Value, Output>(value: Value | null | undefined, transform?: (value: Value) => Output) {
  if (value == null) {
    return undefined;
  }

  if (transform) {
    return transform(value);
  }

  return value;
}
