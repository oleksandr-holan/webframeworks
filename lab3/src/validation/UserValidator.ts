export function validateName(name: string): string | null {
  if (!name.trim()) {
    return "Уведіть ім'я користувача";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "Уведіть еmail адресу користувача";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email адреса некоректна";
  }
  return null;
}

export function validateUserId(id: string): string | null {
  if (!id.trim()) {
    return "Уведіть ID користувача";
  }
  if (!/^\d+$/.test(id)) {
    return "ID користувача може містити тільки цифри";
  }
  return null;
}
