import { Book, User, IBook, IUser } from "./models";
import { Library } from "./library";

export class LibraryService {
    static borrowBook(book: Book, user: User): boolean {
        if (user.borrowedBooks.length >= 3) {
            alert("Не можна позичити більше, ніж три книги.");
            return false;
        }
        if (book.isBorrowed) {
            alert("Книгу вже позичили.");
            return false;
        }
        book.isBorrowed = true;
        user.borrowBook(book.id);
        return true;
    }

    static returnBook(book: Book, user: User): boolean {
        if (!book.isBorrowed) {
            alert("Книгу не позичали.");
            return false;
        }
        if (!user.borrowedBooks.includes(book.id)) {
            alert("Користувач не позичав цю книгу.")
            return false
        }

        book.isBorrowed = false;
        user.returnBook(book.id);
        return true;
    }
}
