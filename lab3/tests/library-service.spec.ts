import { expect, describe, it, beforeEach, vi } from "vitest";
import { LibraryService } from "../src/services";
import { Book, IBook, IUser } from "../src/models";
import { User } from "../src/models";
import { Library } from "../src/library";

describe("LibraryService", () => {
  let sut: LibraryService;
  let storageStub: any;

  beforeEach(() => {
    storageStub = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    sut = new LibraryService(storageStub);
  });

  describe("borrowBook", () => {
    it("should mark a book as borrowed", () => {
      const book = bookMother({ id: "1", isBorrowed: false });
      const user = userMother({ id: "1" });
      sut.books.add(book);
      sut.users.add(user);
      storageStub.getItem.mockImplementation((key: string) => {
        if (key === "books") return JSON.stringify([book]);
        if (key === "users") return JSON.stringify([user]);
      });

      sut.borrowBook(book.id, user.id);

      expect(storageStub.setItem).toHaveBeenCalledWith("books", [
        { ...book, isBorrowed: true, borrowedBy: "1" },
      ]);
    });

    it("should throw an error if user has already borrowed 3 books", () => {
      const user = userMother({ id: "1" });
      const books = [
        bookMother({ id: "1", isBorrowed: true, borrowedBy: "1" }),
        bookMother({ id: "2", isBorrowed: true, borrowedBy: "1" }),
        bookMother({ id: "3", isBorrowed: true, borrowedBy: "1" }),
        bookMother({ id: "4", isBorrowed: false, borrowedBy: null }),
      ];
      sut.books.addAll(books);
      sut.users.add(user);
      storageStub.getItem.mockImplementation((key: string) => {
        if (key === "books") return JSON.stringify(books);
        if (key === "users") return JSON.stringify([user]);
      });

      expect(() => sut.borrowBook(books[3].id, user.id)).toThrow(
        "User has already borrowed the maximum number of books"
      );
    });
  });

  describe("returnBook", () => {
    it("should mark a book as returned", () => {
      const book = bookMother({ id: "1", isBorrowed: true, borrowedBy: "1" });
      const user = userMother({ id: "1" });
      storageStub.getItem.mockImplementation((key: string) => {
        if (key === "books") return JSON.stringify([book]);
        if (key === "users") return JSON.stringify([user]);
      });

      sut.returnBook(book.id, user.id);

      expect(storageStub.setItem).toHaveBeenCalledWith("books", [
        { ...book, isBorrowed: false, borrowedBy: null },
      ]);
    });
  });
});

function bookMother(overrides: Partial<Book> = {}): Book {
  return new Book(
    {
      id: overrides.id || "1",
      title: overrides.title || "Default Title",
      author: overrides.author || "Default Author",
      year: overrides.year || 2023,
      isBorrowed: overrides.isBorrowed || false,
      borrowedBy: overrides.borrowedBy || null,
    } as IBook
  );
}

function userMother(overrides: Partial<User> = {}): User {
  return new User(
    {
      id: overrides.id || "1",
      name: overrides.name || "Default Name",
      email: overrides.email || "default@example.com",
    } as IUser
  );
}
