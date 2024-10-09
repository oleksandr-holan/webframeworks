interface Id {
    id: string
}

export interface IBookProps {
  title: string;
  author: string;
  year: number;
}

export interface IBook extends IBookProps, Id {
  isBorrowed: boolean;
  borrowedBy: string | null;
  borrowBook(user_id: string): void;
  returnBook(): void;
}


export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
  borrowedBy: string | null;
  constructor({ id, title, author, year, }: IBookProps & Id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = false;
    this.borrowedBy = null;
  }

  borrowBook(user_id: string): void {
    this.borrowedBy = user_id;
    this.isBorrowed = true;
  }

  returnBook(): void {
    this.borrowedBy = null;
    this.isBorrowed = false;
  }
}

export interface IUserProps {
  name: string;
  email: string;
}

export interface IUser extends IUserProps, Id {
  borrowedBooks: string[];
  borrowBook(book_id: string): void;
  returnBook(book_id: string): void;
}


export class User implements IUser {
  id: string;
  name: string;
  email: string;
  borrowedBooks: string[];
  constructor({ id, name, email }: IUserProps & Id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }

  borrowBook(book_id: string): void {
    this.borrowedBooks.push(book_id);
  }

  returnBook(book_id: string): void {
    this.borrowedBooks = this.borrowedBooks.filter((id) => id !== book_id);
  }
}
