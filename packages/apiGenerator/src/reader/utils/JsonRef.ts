export class JsonRef {
  public static parse(ref: string): JsonRef {
    if (!ref) {
      throw new Error('Ref is empty or null');
    }
    if (!ref.startsWith('#/')) {
      throw new Error('Not supported ref');
    }
    return new JsonRef(ref.split('/').map(decode).slice(1));
  }

  public static from(parts: string[]): JsonRef {
    return new JsonRef(parts);
  }

  private constructor(public readonly parts: string[]) {}

  public toString() {
    return '#/' + this.parts.map(encode).join('/');
  }

  public extend(newParts: string[]): JsonRef {
    const p = this.parts.concat(newParts);
    return new JsonRef(p);
  }

  public find<T>(data: any): T {
    let current = data;
    for (let index = 0; index < this.parts.length; index++) {
      const part = this.parts[index];
      current = current[part];
      if (!current) {
        throw new Error(`Cannot find node by ref: ${this.toString()} (${part})`);
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
