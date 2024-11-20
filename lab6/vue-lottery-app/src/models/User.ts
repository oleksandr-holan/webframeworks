import * as UserValidations from '@/validations/UserValidations'

export interface IUser {
  name: string
  dateOfBirth: string
  email: string
  phone: string
}

export class User implements IUser {
  #name: string = ''
  #dateOfBirth: string = ''
  #email: string = ''
  #phone: string = ''

  constructor(name: string, dateOfBirth: string, email: string, phone: string) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.email = email
    this.phone = phone
  }

  get name(): string {
    return this.#name
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Name cannot be empty.')
    }
    this.#name = value.trim()
  }

  get dateOfBirth(): string {
    return this.#dateOfBirth
  }

  set dateOfBirth(value: string) {
    if (!UserValidations.isValidDate(value)) {
      throw new Error('Invalid date format.')
    }
    if (!UserValidations.isDateInPast(value)) {
      throw new Error('Date in the future. Enter a past date.')
    }
    this.#dateOfBirth = value
  }

  get email(): string {
    return this.#email
  }

  set email(value: string) {
    if (!UserValidations.isValidEmail(value)) {
      throw new Error('Invalid email format.')
    }
    this.#email = value.toLowerCase()
  }

  get phone(): string {
    return this.#phone
  }

  set phone(value: string) {
    if (!UserValidations.isValidPhone(value)) {
      throw new Error('Invalid phone number format.')
    }
    this.#phone = value
  }
}
