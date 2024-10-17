export interface IStorage {
  setItem(key: string, data: unknown): void;
  getItem(key: string): unknown;
  removeItem(key: string): void;
  clear(): void;
}

export class Storage implements IStorage {
  private static instance?: Storage;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Storage {
    return this.instance ?? (this.instance = new this());
  }

  setItem(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): unknown {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
