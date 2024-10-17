import {
  Book,
  User,
  IBook,
  IUser,
  IBookProps,
  IUserProps,
  IBookManagedProps,
  IUserManagedProps,
} from "./models";
import { Library } from "./library";
import { IStorage } from "./storage";
import { LibraryServiceError } from "./errors";

export class LibraryService {
  private storage: IStorage;
  public books: Library<Book>;
  public users: Library<User>;
  private bookIdCounter: number;
  private userIdCounter: number;

  constructor(storage: IStorage) {
    this.storage = storage;

    const parsedBooks = this.storage.getItem("books");
    this.books = new Library<Book>(
      ((parsedBooks as IBookManagedProps[] | null) ?? []).map(
        (bookData) => new Book(bookData),
      ),
    );

    const parsedUsers = this.storage.getItem("users");
    this.users = new Library<User>(
      ((parsedUsers as IUserManagedProps[] | null) ?? []).map(
        (userData) => new User(userData),
      ),
    );

    const bookIdCounter: unknown = this.storage.getItem("bookIdCounter");
    this.bookIdCounter = typeof bookIdCounter === "number" ? bookIdCounter : 1;

    const userIdCounter: unknown = this.storage.getItem("userIdCounter");
    this.userIdCounter = typeof userIdCounter === "number" ? userIdCounter : 1;
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
      throw new LibraryServiceError("Не можна позичити більше, ніж три книги.");
    }
    if (book.isBorrowed) {
      throw new LibraryServiceError("Книгу вже позичили.");
    }
    book.borrowBook(user.id);
    user.borrowBook(book.id);
    this.saveData();
  }

  returnBook(bookId: string): void {
    const book = this.getBookById(bookId);

    if (!book.borrowedBy) {
      throw new LibraryServiceError("Книгу не позичали.");
    }
    const user = this.getUserById(book.borrowedBy);

    book.returnBook();
    user.returnBook(book.id);
    this.saveData();
  }

  getBookById(id: string): IBook {
    const result = this.books.find((book) => book.id === id);
    if (!result) {
      throw new LibraryServiceError("Книгу не знайдено.");
    }
    return result;
  }

  getUserById(id: string): IUser {
    const result = this.users.find((user) => user.id === id);
    if (!result) {
      throw new LibraryServiceError("Користувача не знайдено.");
    }
    return result;
  }

  createBook(book: IBookProps): Book {
    const newBook = new Book({
      ...book,
      id: this.bookIdCounter.toString(),
    });
    this.books.add(newBook);
    this.bookIdCounter++;
    this.saveData();
    return newBook;
  }

  createUser(user: IUserProps): User {
    const newUser = new User({
      ...user,
      id: this.userIdCounter.toString(),
    });
    this.users.add(newUser);
    this.userIdCounter++;
    this.saveData();
    return newUser;
  }

  clearBooks(): void {
    this.bookIdCounter = 1;
    this.books.clear();
    this.saveData();
  }

  clearUsers(): void {
    this.userIdCounter = 1;
    this.users.clear();
    this.saveData();
  }

  deleteBook(bookId: string): void {
    const book = this.getBookById(bookId);
    if (book.isBorrowed) {
      throw new LibraryServiceError("Не можна видалити позичену книгу.");
    }
    this.books.remove(book);
    this.saveData();
  }

  deleteUser(userId: string): void {
    const user = this.getUserById(userId);
    if (user.borrowedBooks.length > 0) {
      throw new LibraryServiceError(
        "Не можна видалити користувача, який має позичені книги.",
      );
    }
    this.users.remove(user);
    this.saveData();
  }

  searchBooks(searchTerm: string): Book[] {
    return this.books.items.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
}
