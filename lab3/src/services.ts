import { Book, User, IBook, IUser } from "./models";
import { Library } from "./library";
import { Storage } from "./storage";
import { OmitFrom } from "./types";


export class LibraryService {
  private storage: Storage;
  public books: Library<Book>;
  public users: Library<User>;
  private bookIdCounter: number = 1;
  private userIdCounter: number = 1;

  constructor(storage: Storage) {
    this.storage = storage;
    this.books = new Library<Book>(this.storage.getItem("books") || []);

    this.users = new Library<User>(this.storage.getItem("users") || []);

    this.bookIdCounter = this.storage.getItem("bookIdCounter") || 1;
    this.userIdCounter = this.storage.getItem("userIdCounter") || 1;
  }

  private saveData(): void {
    this.storage.setItem("books", this.books.items);
    this.storage.setItem("users", this.users.items);
    this.storage.setItem("bookIdCounter", this.bookIdCounter);
    this.storage.setItem("userIdCounter", this.userIdCounter);
  }

  borrowBook(bookId: string, userId: string): void {
    const book = this.getBookById(bookId);
    const user = this.getUserById(userId);
    if (user.borrowedBooks.length >= 3) {
      throw new Error("Не можна позичити більше, ніж три книги.");
    }
    if (book.isBorrowed) {
      throw new Error("Книгу вже позичили.");
    }
    book.borrowBook(user.id);
    user.borrowBook(book.id);
    this.saveData();
  }

  returnBook(bookId: string, userId: string): void {
    const book = this.getBookById(bookId);
    const user = this.getUserById(userId);

    if (!book.isBorrowed) {
      throw new Error("Книгу не позичали.");
    }
    if (!user.borrowedBooks.includes(book.id)) {
      throw new Error("Користувач не позичав цю книгу.");
    }

    book.returnBook();
    user.returnBook(book.id);
    this.saveData();
  }

  getBookById(id: string): IBook {
    const result = this.books.find((book) => book.id === id);
    if (!result) {
      throw new Error("Книгу не знайдено.");
    }
    return result;
  }

  getUserById(id: string): IUser {
    const result = this.users.find((user) => user.id === id);
    if (!result) {
      throw new Error("Користувача не знайдено.");
    }
    return result;
  }

  createBook(book: OmitFrom<IBook, "id">): Book {
    const newBook = new Book({ ...book, id: this.bookIdCounter.toString() });
    this.books.add(newBook);
    this.bookIdCounter++;
    this.saveData();
    return newBook;
  }

  createUser(user: OmitFrom<IUser, "id">): User {
    const newUser = new User({ ...user, id: this.userIdCounter.toString() });
    this.users.add(newUser);
    this.userIdCounter++;
    this.saveData();
    return newUser;
  }
}
