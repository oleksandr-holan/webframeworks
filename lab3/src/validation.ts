// validation.ts

export namespace Validation {
    export class BookValidator {
        static validateTitle(title: string): string | null {
            if (!title.trim()) {
                return "Уведіть назву книги";
            }
            return null;
        }

        static validateAuthor(author: string): string | null {
            if (!author.trim()) {
                return "Уведіть ім'я автора";
            }
            return null;
        }

        static validateYear(year: string): string | null {
            if (!year.trim()) {
                return "Уведіть рік видання.";
            }
            const yearNumber = parseInt(year);
            if (isNaN(yearNumber)) {
                return "Уведіть число.";
            }
            const currentYear = new Date().getFullYear();
            const yearOfTheFirstBook = -4000
            if (yearNumber < yearOfTheFirstBook || yearNumber > currentYear) {
                return `Рік видання може бути між ${yearOfTheFirstBook} і ${currentYear}`;
            }
            return null;
        }
    }

    export class UserValidator {
        static validateName(name: string): string | null {
            if (!name.trim()) {
                return "Уведіть ім'я користувача";
            }
            return null;
        }

        static validateEmail(email: string): string | null {
            if (!email.trim()) {
                return "Уведіть еmail адресу користувача";
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return "Email адреса некоректна";
            }
            return null;
        }

        static validateUserId(id: string): string | null {
            if (!id.trim()) {
                return "Уведіть ID користувача";
            }
            if (!/^\d+$/.test(id)) {
                return "ID користувача може містити тільки цифри";
            }
            return null;
        }
    }
}