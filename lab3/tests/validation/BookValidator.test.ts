import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";
import * as BookValidator from "../../src/validation/BookValidator";

describe("BookValidation", () => {
  let sut: typeof BookValidator;

  beforeEach(() => {
    sut = BookValidator;
  });

  describe("validateTitle", () => {
    it("should return null for a valid title", () => {
      const title = faker.lorem.words();
      const result = sut.validateTitle(title);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty title", () => {
      const result = sut.validateTitle("");
      expect(result).toBe("Уведіть назву книги");
    });

    it("should return an error message for a title with only whitespace", () => {
      const result = sut.validateTitle("   ");
      expect(result).toBe("Уведіть назву книги");
    });
  });

  describe("validateAuthor", () => {
    it("should return null for a valid author name", () => {
      const author = faker.person.fullName();
      const result = sut.validateAuthor(author);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty author name", () => {
      const result = sut.validateAuthor("");
      expect(result).toBe("Уведіть ім'я автора");
    });

    it("should return an error message for an author name with only whitespace", () => {
      const result = sut.validateAuthor("   ");
      expect(result).toBe("Уведіть ім'я автора");
    });
  });

  describe("validateYear", () => {
    it("should return null for a valid year", () => {
      const year = faker.date.past().getFullYear().toString();
      const result = sut.validateYear(year);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty year", () => {
      const result = sut.validateYear("");
      expect(result).toBe("Уведіть рік видання.");
    });

    it("should return an error message for a year with only whitespace", () => {
      const result = sut.validateYear("   ");
      expect(result).toBe("Уведіть рік видання.");
    });

    it("should return an error message for a non-numeric year", () => {
      const result = sut.validateYear("abc");
      expect(result).toBe("Уведіть число.");
    });

    it("should return an error message for a year before -4000", () => {
      const result = sut.validateYear("-4001");
      expect(result).toMatch(/Рік видання може бути між -4000 і \d{4}/);
    });

    it("should return an error message for a year in the future", () => {
      const futureYear = (new Date().getFullYear() + 1).toString();
      const result = sut.validateYear(futureYear);
      expect(result).toMatch(/Рік видання може бути між -4000 і \d{4}/);
    });

    it("should return null for the earliest valid year (-4000)", () => {
      const result = sut.validateYear("-4000");
      expect(result).toBeNull();
    });

    it("should return null for the current year", () => {
      const currentYear = new Date().getFullYear().toString();
      const result = sut.validateYear(currentYear);
      expect(result).toBeNull();
    });
  });
});
