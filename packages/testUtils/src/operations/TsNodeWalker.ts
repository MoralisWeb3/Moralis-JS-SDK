import { Node } from 'typescript';

export class TsNodeWalker {
  public static traverse<Value>(parent: Node, processor: (child: Node) => Value | null): Value[] {
    const values: Value[] = [];
    parent.forEachChild((child) => {
      const value = processor(child);
      if (value) {
        values.push(value);
      }
    });
    return values;
  }
}
