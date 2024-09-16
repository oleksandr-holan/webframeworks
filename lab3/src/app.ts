import { Book, User } from "./models";
import { LibraryService } from "./services";
import { Library } from "./library";
import { Storage } from "./storage";

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
        const title = (document.getElementById("bookTitle") as HTMLInputElement).value;
        const author = (document.getElementById("bookAuthor") as HTMLInputElement).value;
        const year = parseInt((document.getElementById("bookYear") as HTMLInputElement).value);

        const newBook: Book = new Book(this.bookIdCounter++, title, author, year)

        this.books.add(newBook);
        this.renderBooks();
        this.saveData();

        this.addBookForm.reset();
    }

    private handleAddUser(event: Event): void {
        event.preventDefault();
        const name = (document.getElementById("userName") as HTMLInputElement).value;
        const email = (document.getElementById("userEmail") as HTMLInputElement).value;

        const newUser: User = new User(this.userIdCounter++, name, email);
        this.users.push(newUser);
        this.renderUsers();
        this.saveData();

        this.addUserForm.reset();
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
