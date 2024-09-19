import { Book, User } from "./models";
import { LibraryService } from "./services";
import { Library } from "./library";
import { Storage } from "./storage";
import { Validation } from './validation';

class App {
    private books!: Library<Book>;
    private users!: User[];
    private bookIdCounter!: number;
    private userIdCounter!: number;
    private bookList: HTMLElement;
    private userList: HTMLElement;
    private addBookForm: HTMLFormElement;
    private addUserForm: HTMLFormElement;

    constructor() {
        this.loadData();
        
        this.bookList = document.getElementById("bookList")!;
        this.userList = document.getElementById("userList")!;
        this.addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
        this.addUserForm = document.getElementById("addUserForm") as HTMLFormElement;

        this.initEventListeners();
        this.renderBooks();
        this.renderUsers();
    }

    private loadData(): void {
        const savedBooks = Storage.load('books');
        this.books = new Library<Book>(savedBooks || []);

        const savedUsers = Storage.load('users');
        this.users = savedUsers ? savedUsers.map((u: any) => new User(u.id, u.name, u.email, u.borrowedBooks)) : [];

        this.bookIdCounter = Storage.load('bookIdCounter') || 1;
        this.userIdCounter = Storage.load('userIdCounter') || 1;
    }

    private saveData(): void {
        Storage.save('books', this.books.items);
        Storage.save('users', this.users);
        Storage.save('bookIdCounter', this.bookIdCounter);
        Storage.save('userIdCounter', this.userIdCounter);
    }

    private initEventListeners(): void {
        this.addBookForm.addEventListener("submit", this.handleAddBook.bind(this));
        this.addUserForm.addEventListener("submit", this.handleAddUser.bind(this));
    }

    private handleAddBook(event: Event): void {
        event.preventDefault();
        const titleInput = document.getElementById("bookTitle") as HTMLInputElement;
        const authorInput = document.getElementById("bookAuthor") as HTMLInputElement;
        const yearInput = document.getElementById("bookYear") as HTMLInputElement;

        const titleError = Validation.BookValidator.validateTitle(titleInput.value);
        const authorError = Validation.BookValidator.validateAuthor(authorInput.value);
        const yearError = Validation.BookValidator.validateYear(yearInput.value);

        this.showValidationErrors({
            bookTitle: titleError,
            bookAuthor: authorError,
            bookYear: yearError
        });

        if (titleError || authorError || yearError) {
            return;
        }

        const newBook: Book = new Book(
            this.bookIdCounter++,
            titleInput.value,
            authorInput.value,
            parseInt(yearInput.value),
            false,
        );
        this.books.add(newBook);
        this.renderBooks();
        this.saveData();

        this.addBookForm.reset();
    }

    private handleAddUser(event: Event): void {
        event.preventDefault();
        const nameInput = document.getElementById("userName") as HTMLInputElement;
        const emailInput = document.getElementById("userEmail") as HTMLInputElement;

        const nameError = Validation.UserValidator.validateName(nameInput.value);
        const emailError = Validation.UserValidator.validateEmail(emailInput.value);

        this.showValidationErrors({
            userName: nameError,
            userEmail: emailError
        });

        if (nameError || emailError) {
            return;
        }

        const newUser: User = new User(this.userIdCounter++, nameInput.value, emailInput.value);
        this.users.push(newUser);
        this.renderUsers();
        this.saveData();

        this.addUserForm.reset();
    }

    private showValidationErrors(errors: { [key: string]: string | null }): void {
        for (const [field, error] of Object.entries(errors)) {
            const inputElement = document.getElementById(field) as HTMLInputElement;
            const feedbackElement = inputElement.nextElementSibling as HTMLElement;

            if (error) {
                inputElement.classList.add('is-invalid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.textContent = error;
                }
            } else {
                inputElement.classList.remove('is-invalid');
                feedbackElement.textContent = '';
            }
        }
    }

    private renderBooks(): void {
        this.bookList.innerHTML = "";
        this.books.items.forEach((book) => {
            const bookItem = document.createElement("li");
            bookItem.className = "list-group-item d-flex justify-content-between align-items-center";
            bookItem.innerHTML = `
                ${book.title} by ${book.author} (${book.year})
                <div>
                    <button class="btn btn-primary btn-sm borrow-btn" data-id="${book.id}" ${book.isBorrowed ? "disabled" : ""}>Позичити</button>
                    <button class="btn btn-warning btn-sm return-btn" data-id="${book.id}" ${!book.isBorrowed ? "disabled" : ""}>Повернути</button>
                </div>
            `;
            this.bookList.appendChild(bookItem);
        });

        document.querySelectorAll(".borrow-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const bookId = parseInt((event.target as HTMLButtonElement).getAttribute("data-id")!);
                this.borrowBook(bookId);
            });
        });

        document.querySelectorAll(".return-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const bookId = parseInt((event.target as HTMLButtonElement).getAttribute("data-id")!);
                this.returnBook(bookId);
            });
        });
    }

    private renderUsers(): void {
        this.userList.innerHTML = "";
        this.users.forEach((user) => {
            const userItem = document.createElement("li");
            userItem.className = "list-group-item";
            userItem.textContent = `${user.id} ${user.name} (${user.email})`;
            this.userList.appendChild(userItem);
        });
    }

    private borrowBook(bookId: number): void {
        const book = this.books.find((b) => b.id === bookId);
        if (!book) {
            alert("Книгу не знайдено");
            return;
        }
        const userId = prompt("Введіть ID користувача, який позичає книгу:");
        const user = this.users.find((u) => u.id === parseInt(userId!));
        if (!user) {
            alert("Користувача не знайдено.");
            return;
        }
        LibraryService.borrowBook(book, user);
        alert(`${book.title} позичив користувач ${user.name}.`);
        this.renderBooks();
        this.saveData();
    }

    private returnBook(bookId: number): void {
        const book = this.books.find((b) => b.id === bookId);
        if (!book) {
            alert("Книгу не знайдено.");
            return;
        }
        const user = this.users.find((u) => u.borrowedBooks.includes(book.id));
        if (!user) {
            alert("Користувача, який позичив книгу, не знайдено");
            return;
        }
        LibraryService.returnBook(book, user);
        alert(`${book.title} повернено.`);
        this.renderBooks();
        this.saveData();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
