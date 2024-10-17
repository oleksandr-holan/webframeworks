export function validateTitle(title: string): string | null {
  if (!title.trim()) {
    return "Уведіть назву книги";
  }
  return null;
}

export function validateAuthor(author: string): string | null {
  if (!author.trim()) {
    return "Уведіть ім'я автора";
  }
  return null;
}

export function validateYear(year: string): string | null {
  if (!year.trim()) {
    return "Уведіть рік видання.";
  }
  const yearNumber = parseInt(year);
  if (isNaN(yearNumber)) {
    return "Уведіть число.";
  }
  const currentYear = new Date().getFullYear();
  const yearOfTheFirstBook = -4000;
  if (yearNumber < yearOfTheFirstBook || yearNumber > currentYear) {
    return `Рік видання може бути між ${yearOfTheFirstBook.toFixed(0)} і ${currentYear.toFixed(0)}`;
  }
  return null;
}
