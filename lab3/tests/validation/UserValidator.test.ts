import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";
import * as UserValidator from "../../src/validation/UserValidator";

describe("UserValidator", () => {
  let sut: typeof UserValidator;

  beforeEach(() => {
    sut = UserValidator;
  });

  describe("validateName", () => {
    it("should return null for a valid name", () => {
      const name = faker.person.fullName();
      const result = sut.validateName(name);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty name", () => {
      const result = sut.validateName("");
      expect(result).toBe("Уведіть ім'я користувача");
    });

    it("should return an error message for a name with only whitespace", () => {
      const result = sut.validateName("   ");
      expect(result).toBe("Уведіть ім'я користувача");
    });
  });

  describe("validateEmail", () => {
    it("should return null for a valid email", () => {
      const email = faker.internet.email();
      const result = sut.validateEmail(email);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty email", () => {
      const result = sut.validateEmail("");
      expect(result).toBe("Уведіть еmail адресу користувача");
    });

    it("should return an error message for an email with only whitespace", () => {
      const result = sut.validateEmail("   ");
      expect(result).toBe("Уведіть еmail адресу користувача");
    });

    it("should return an error message for an invalid email format", () => {
      const invalidEmails = [
        "plainaddress",
        "@missingusername.com",
        "username@.com",
        "username@domain.com.",
        "username@domain..com",
      ];

      invalidEmails.forEach((email) => {
        const result = sut.validateEmail(email);
        expect(result).toBe("Email адреса некоректна");
      });
    });
  });

  describe("validateUserId", () => {
    it("should return null for a valid user ID", () => {
      const userId = faker.string.numeric(5); // Generate a 5-digit number
      const result = sut.validateUserId(userId);
      expect(result).toBeNull();
    });

    it("should return an error message for an empty user ID", () => {
      const result = sut.validateUserId("");
      expect(result).toBe("Уведіть ID користувача");
    });

    it("should return an error message for a user ID with only whitespace", () => {
      const result = sut.validateUserId("   ");
      expect(result).toBe("Уведіть ID користувача");
    });

    it("should return an error message for a user ID containing non-digit characters", () => {
      const invalidUserIds = ["abc123", "123abc", "12.34", "12-34", "12 34"];

      invalidUserIds.forEach((userId) => {
        const result = sut.validateUserId(userId);
        expect(result).toBe("ID користувача може містити тільки цифри");
      });
    });
  });
});
