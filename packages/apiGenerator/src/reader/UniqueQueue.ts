export class UniqueQueue<Item> {
  private readonly queue: { [key: string]: { done: boolean; item: Item } } = {};

  public push(key: string, item: Item) {
    const current = this.queue[key];
    if (!current) {
      this.queue[key] = { done: false, item };
    }
  }

  public pop(): Item | null {
    const nextKey = Object.keys(this.queue).find((r) => !this.queue[r].done);
    if (!nextKey) {
      return null;
    }
    const next = this.queue[nextKey];
    next.done = true;
    return next.item;
  }
}
