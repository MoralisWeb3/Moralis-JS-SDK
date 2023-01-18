export class JsonRef {
  public static serialize(parts: string[]) {
    return '#/' + parts.map(encode).join('/');
  }

  public static extend(ref: string, newParts: string[]): string {
    const parts = JsonRef.parse(ref);
    newParts.forEach((part) => parts.push(part));
    return JsonRef.serialize(parts);
  }

  public static parse(ref: string): string[] {
    if (!ref.startsWith('#/')) {
      throw new Error('Not supported ref');
    }
    return ref.split('/').map(decode).slice(1);
  }

  public static find<T>(ref: string, data: any): T {
    const parts = JsonRef.parse(ref);

    let current = data;
    for (let i = 0; i < parts.length; i++) {
      const item = parts[i];
      current = current[item];
      if (!current) {
        throw new Error(`Cannot find node by ref: ${ref} (${item})`);
      }
    }
    return current as T;
  }
}

function encode(value: string): string {
  return value.replace(/~/g, '~0').replace(/\//g, '~1');
}

function decode(value: string): string {
  return value.replace(/~1/g, '/').replace(/~0/g, '~');
}
