export class Library<T> {
  private _items: T[] = [];

  public get items(): T[] {
    return this._items;
  }

  constructor(items: T[]) {
    this._items = items
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this._items = this.items.filter((i) => i !== item);
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this._items.find(predicate);
  }
}
