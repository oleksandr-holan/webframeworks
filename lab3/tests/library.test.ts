import { expect } from "chai";
import sinon from "sinon";
import { Library } from "../src/library";
import { Book } from "../src/models";
import { User } from "../src/models";

describe("Library", () => {
  let sut: Library<Book | User>;

  beforeEach(() => {
    sut = new Library<Book | User>();
  });

  describe("addItem", () => {
    it("should add an item to the collection", () => {
      const book = new Book("1", "Test Book", "Test Author", 2023);

      sut.addItem(book);

      expect(sut.getItems()).to.deep.include(book);
    });
  });

  describe("removeItem", () => {
    it("should remove an item from the collection", () => {
      const book = new Book("1", "Test Book", "Test Author", 2023);
      sut.addItem(book);

      sut.removeItem("1");

      expect(sut.getItems()).to.not.deep.include(book);
    });
  });

  describe("findItem", () => {
    it("should find an item in the collection", () => {
      const book = new Book("1", "Test Book", "Test Author", 2023);
      sut.addItem(book);

      const result = sut.findItem("1");

      expect(result).to.deep.equal(book);
    });

    it("should return undefined if item is not found", () => {
      const result = sut.findItem("nonexistent");

      expect(result).to.be.undefined;
    });
  });
});

function bookMother(overrides: Partial<Book> = {}): Book {
  return new Book(
    overrides.id || "1",
    overrides.title || "Default Title",
    overrides.author || "Default Author",
    overrides.year || 2023
  );
}

function userMother(overrides: Partial<User> = {}): User {
  return new User(
    overrides.id || "1",
    overrides.name || "Default Name",
    overrides.email || "default@example.com"
  );
}
