export class LibraryServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}