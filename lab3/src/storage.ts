export class Storage {
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
