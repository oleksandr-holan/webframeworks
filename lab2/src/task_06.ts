interface LibraryItem {
    title: string;
    author: string;
    borrowed: boolean;
    borrow(): void;
}

class Book implements LibraryItem {
    borrowed: boolean = false;

    constructor(
        public title: string,
        public author: string,
        public pages: number
    ) {}

    borrow(): void {
        this.borrowed = true;
    }
}

class Magazine implements LibraryItem {
    borrowed: boolean = false;

    constructor(
        public title: string,
        public author: string,
        public issueNumber: number
    ) {}

    borrow(): void {
        this.borrowed = true;
    }
}

class DVD implements LibraryItem {
    borrowed: boolean = false;

    constructor(
        public title: string,
        public author: string,
        public duration : number
    ) {}

    borrow(): void {
        this.borrowed = true;
    }
}

class Library {
    #items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.#items.push(item);
    }

    findItemByName(name: string): LibraryItem | undefined {
        return this.#items.find(item => item.title === name);
    }

    listAvailableItems(): void {
        this.#items.forEach(item => {
            if (!item.borrowed) {
                console.log(`Title: ${item.title}, Author: ${item.author}`);
            }
        });
    }
}

const book = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218);
const magazine = new Magazine("National Geographic", "Editorial Team", 501);
const dvd = new DVD("Inception", "Christopher Nolan", 148);

const library = new Library();
library.addItem(book);
library.addItem(magazine);
library.addItem(dvd);

console.log("Available items:");
library.listAvailableItems();

console.log("\nBorrowing 'The Great Gatsby':");
book.borrow();

console.log("\nAvailable items after borrowing:");
library.listAvailableItems();

console.log("\nFinding out 'The Great Gatsby' borrowed status:");
console.log(library.findItemByName('The Great Gatsby')?.borrowed || 'Not found');

console.log(`Finding ${magazine.title} magazine author:`);
console.log(library.findItemByName(magazine.title)?.author || 'Not found');