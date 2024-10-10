import { IBook, IUser } from "./models";
import { LibraryService } from "./services";
import { Storage } from "./storage";
import { Validation } from "./validation";
import { AlertModal, PromptModal } from "./modal";
import { LibraryServiceError } from "./errors";

class App {
    private library: LibraryService;
    private storage: Storage;
    private bookList: HTMLElement;
    private userList: HTMLElement;
    private addBookForm: HTMLFormElement;
    private addUserForm: HTMLFormElement;
    private promptModal: PromptModal;
    private alertModal: AlertModal;

    constructor() {
        this.storage = Storage.getInstance();

        this.library = new LibraryService(this.storage);

        this.bookList = document.getElementById("bookList") as HTMLElement;
        this.userList = document.getElementById("userList") as HTMLElement;
        this.addBookForm = document.getElementById(
            "addBookForm"
        ) as HTMLFormElement;
        this.addUserForm = document.getElementById(
            "addUserForm"
        ) as HTMLFormElement;

        this.promptModal = new PromptModal(
            "promptModal",
            ".modal-title",
            ".modal-body",
            "input",
            ".btn-primary",
            ".btn-secondary"
        );
        this.alertModal = new AlertModal(
            "alertModal",
            ".modal-title",
            ".modal-body",
            ".btn-primary"
        );

        this.initEventListeners();
        this.renderBooks();
        this.renderUsers();
    }

    private initEventListeners(): void {
        this.addBookForm.addEventListener(
            "submit",
            this.handleAddBook.bind(this)
        );
        this.addUserForm.addEventListener(
            "submit",
            this.handleAddUser.bind(this)
        );
        const clearBooksBtn = document.getElementById(
            "clearBooksBtn"
        ) as HTMLButtonElement;
        clearBooksBtn.addEventListener("click", this.clearBooks.bind(this));

        const clearUsersBtn = document.getElementById(
            "clearUsersBtn"
        ) as HTMLButtonElement;
        clearUsersBtn.addEventListener("click", this.clearUsers.bind(this));
    }

    private handleAddBook(event: Event): void {
        event.preventDefault();
        const titleInput = document.getElementById(
            "bookTitle"
        ) as HTMLInputElement;
        const authorInput = document.getElementById(
            "bookAuthor"
        ) as HTMLInputElement;
        const yearInput = document.getElementById(
            "bookYear"
        ) as HTMLInputElement;

        const titleError = Validation.BookValidator.validateTitle(
            titleInput.value
        );
        const authorError = Validation.BookValidator.validateAuthor(
            authorInput.value
        );
        const yearError = Validation.BookValidator.validateYear(
            yearInput.value
        );

        this.showValidationErrors({
            bookTitle: titleError,
            bookAuthor: authorError,
            bookYear: yearError,
        });

        if (titleError || authorError || yearError) {
            return;
        }

        this.library.createBook({
            title: titleInput.value,
            author: authorInput.value,
            year: parseInt(yearInput.value),
        });
        this.renderBooks();
        this.addBookForm.reset();
    }

    private handleAddUser(event: Event): void {
        event.preventDefault();
        const nameInput = document.getElementById(
            "userName"
        ) as HTMLInputElement;
        const emailInput = document.getElementById(
            "userEmail"
        ) as HTMLInputElement;

        const nameError = Validation.UserValidator.validateName(
            nameInput.value
        );
        const emailError = Validation.UserValidator.validateEmail(
            emailInput.value
        );

        this.showValidationErrors({
            userName: nameError,
            userEmail: emailError,
        });

        if (nameError || emailError) {
            return;
        }

        this.library.createUser({
            name: nameInput.value,
            email: emailInput.value,
        });
        this.renderUsers();
        this.addUserForm.reset();
    }

    private showValidationErrors(errors: {
        [key: string]: string | null;
    }): void {
        for (const [field, error] of Object.entries(errors)) {
            const inputElement = document.getElementById(
                field
            ) as HTMLInputElement;
            const feedbackElement =
                inputElement.nextElementSibling as HTMLElement;

            if (error) {
                inputElement.classList.add("is-invalid");
                if (
                    feedbackElement &&
                    feedbackElement.classList.contains("invalid-feedback")
                ) {
                    feedbackElement.textContent = error;
                }
            } else {
                inputElement.classList.remove("is-invalid");
                feedbackElement.textContent = "";
            }
        }
    }

    private renderBooks(): void {
        this.bookList.innerHTML = "";
        this.library.books.items.forEach((book) => {
            const bookItem = document.createElement("li");
            bookItem.className =
                "list-group-item d-flex justify-content-between align-items-center";
            bookItem.innerHTML = `
                ${book.title} by ${book.author} (${book.year})
                <div>
                    <button class="btn btn-primary btn-sm borrow-btn" data-id="${
                        book.id
                    }" ${book.isBorrowed ? "disabled" : ""}>Позичити</button>
                    <button class="btn btn-warning btn-sm return-btn" data-id="${
                        book.id
                    }" ${!book.isBorrowed ? "disabled" : ""}>Повернути</button>
                </div>
            `;
            this.bookList.appendChild(bookItem);
        });

        document.querySelectorAll(".borrow-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const bookId = (event.target as HTMLButtonElement).getAttribute(
                    "data-id"
                )!;
                this.borrowBook(bookId);
            });
        });

        document.querySelectorAll(".return-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const bookId = (event.target as HTMLButtonElement).getAttribute(
                    "data-id"
                )!;

                this.returnBook(bookId);
            });
        });
    }

    private renderUsers(): void {
        this.userList.innerHTML = "";
        this.library.users.items.forEach((user) => {
            const userItem = document.createElement("li");
            userItem.className = "list-group-item";
            userItem.textContent = `${user.id} ${user.name} (${user.email})`;
            this.userList.appendChild(userItem);
        });
    }

    private async borrowBook(bookId: string): Promise<void> {
        try {
            const userId = await this.promptModal.show(
                "Введіть ID користувача, який позичає книгу:"
            );
            await this.confirmBorrowBook(bookId, userId);
        } catch (error) {
            this.alertModal.show((error as Error).message);
        }
    }

    private async confirmBorrowBook(
        bookId: string,
        userId: string
    ): Promise<void> {
        let book: IBook;
        let user: IUser;

        try {
            book = this.library.getBookById(bookId);
            user = this.library.getUserById(userId);
            this.library.borrowBook(bookId, userId);
        } catch (e) {
            this.handleError(e);
            return;
        }
        this.alertModal.show(`${book.title} позичив користувач ${user.name}.`);
        this.renderBooks();
    }

    private returnBook(bookId: string): void {
        let book: IBook;
        try {
            book = this.library.getBookById(bookId);
            this.library.returnBook(bookId);
        } catch (e) {
            this.handleError(e);
            return;
        }
        this.alertModal.show(`${book.title} повернено.`);
        this.renderBooks();
    }

    private handleError(e: unknown): void {
        if (e instanceof LibraryServiceError) {
            this.alertModal.show(e.message);
        } else {
            this.alertModal.show("Щось пішло не так :(");
            console.error(e);
        }
    }

    private clearBooks(): void {
        this.library.clearBooks();
        this.renderBooks();
    }

    private clearUsers(): void {
        this.library.clearUsers();
        this.renderUsers();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});
