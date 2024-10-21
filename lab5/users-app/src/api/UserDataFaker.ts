import { faker } from '@faker-js/faker'
import type { UserData } from '@/types/UserData'

function generateUser(): UserData {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sex(),
    age: faker.number.int({ min: 10, max: 80 }),
    position: faker.person.jobTitle(),
    photo: faker.image.avatar(),
    hobbies: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.word.sample(),
    ),
  }
}

export function generateUsers(count: number): UserData[] {
  return Array.from({ length: count }, generateUser)
}
