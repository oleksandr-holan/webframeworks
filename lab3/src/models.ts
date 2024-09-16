export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
}

export class Book implements IBook {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public year: number,
        public isBorrowed: boolean = false
    ) {}
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    borrowedBooks: number[];
}

export class User implements IUser {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public borrowedBooks: number[] = []
    ) {}

    borrowBook(book_id: number): void {
        this.borrowedBooks.push(book_id);
    }

    returnBook(book_id: number): void {
        this.borrowedBooks = this.borrowedBooks.filter((id) => id !== book_id);
    }
}
