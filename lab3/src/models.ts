interface Id {
  id: string;
}

export interface IBookProps {
  title: string;
  author: string;
  year: number;
  isBorrowed?: boolean;
  borrowedBy?: string | null;
}

export interface IBookManagedProps extends IBookProps, Id {}

export interface IBook extends Required<IBookManagedProps> {
  borrowBook: (userId: string) => void;
  returnBook: () => void;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
  borrowedBy: string | null;
  constructor({
    id,
    title,
    author,
    year,
    isBorrowed = false,
    borrowedBy = null,
  }: IBookManagedProps) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = isBorrowed;
    this.borrowedBy = borrowedBy;
  }

  borrowBook(userId: string): void {
    this.borrowedBy = userId;
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
  borrowedBooks?: string[];
}

export interface IUserManagedProps extends IUserProps, Id {}

export interface IUser extends Required<IUserManagedProps> {
  borrowBook(bookId: string): void;
  returnBook(bookId: string): void;
}

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  borrowedBooks: string[];
  constructor({ id, name, email, borrowedBooks = [] }: IUserManagedProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooks = borrowedBooks;
  }

  borrowBook(bookId: string): void {
    this.borrowedBooks.push(bookId);
  }

  returnBook(bookId: string): void {
    this.borrowedBooks = this.borrowedBooks.filter((id) => id !== bookId);
  }
}
