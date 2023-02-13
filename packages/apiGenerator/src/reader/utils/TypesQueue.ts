import { ReferenceTypePointer } from '../TypeDescriptor';

export class TypesQueue {
  private readonly queue: { [key: string]: { done: boolean; pointer: ReferenceTypePointer } } = {};

  public push(pointer: ReferenceTypePointer) {
    const $ref = pointer.ref.toString();
    const current = this.queue[$ref];
    if (!current) {
      this.queue[$ref] = { done: false, pointer };
    }
  }

  public pop(): ReferenceTypePointer | null {
    const nextKey = Object.keys(this.queue).find(($ref) => !this.queue[$ref].done);
    if (!nextKey) {
      return null;
    }
    const next = this.queue[nextKey];
    next.done = true;
    return next.pointer;
  }
}
