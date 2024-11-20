export interface IStorage {
  setItem(key: string, data: any): void;
  getItem(key: string): any;
  removeItem(key: string): void;
  clear(): void;
}

export class Storage implements IStorage {
    private static instance: Storage;

    private constructor() {}

    public static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    setItem(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getItem(key: string): any {
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
