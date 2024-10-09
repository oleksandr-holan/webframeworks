import { describe, it, beforeEach, expect, vi } from "vitest";
import { LibraryService } from "../src/services";
import { IBookProps, IUserProps } from "../src/models";
import { Context } from "vm";

declare module "vitest" {
    export interface TestContext {
        sut: LibraryService;
        storageStub: any;
    }
}

describe("LibraryService", () => {
    beforeEach<Context>((context) => {
        context.storageStub = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };
        context.sut = new LibraryService(context.storageStub);
    });

    describe("borrowBook", () => {
        it("should mark a book as borrowed", ({ sut }) => {
            // Arrange
            const book = sut.createBook(bookMother());
            const user = sut.createUser(userMother());

            // Act
            sut.borrowBook(book.id, user.id);

            // Assert
            expect(book.isBorrowed).toBe(true);
            expect(book.borrowedBy).toBe(user.id);
            expect(user.borrowedBooks).toContain(book.id);
        });

        it("should throw an error if user has aready borrowed 3 books", ({
            sut,
        }) => {
            // Arrange
            const user = sut.createUser(userMother());
            const books = Array.from({ length: 4 }, () =>
                sut.createBook(bookMother())
            );

            // Act
            books
                .slice(0, -1)
                .forEach((book) => sut.borrowBook(book.id, user.id));

            // Assert
            expect(() => sut.borrowBook(books[3].id, user.id)).toThrow(
                "Не можна позичити більше, ніж три книги."
            );
        });
    });

    describe("returnBook", () => {
        it("should mark a book as returned", ({ sut }) => {
            // Arrange
            const book = sut.createBook(bookMother());
            const user = sut.createUser(userMother());
            sut.borrowBook(book.id, user.id);

            // Act
            sut.returnBook(book.id);

            // Assert
            expect(book.isBorrowed).toBe(false);
            expect(book.borrowedBy).toBe(null);
            expect(user.borrowedBooks).not.toContain(book.id);
        });
    });
});

// Object Mother Methods
function bookMother(overrides: Partial<IBookProps> = {}): IBookProps {
    return {
        title: overrides.title || "Default Title",
        author: overrides.author || "Default Author",
        year: overrides.year || 2023,
    };
}

function userMother(overrides: Partial<IUserProps> = {}): IUserProps {
    return {
        name: overrides.name || "Default Name",
        email: overrides.email || "default@example.com",
    };
}
