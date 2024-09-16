export class Storage {
    static save(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load(key: string): any {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}
