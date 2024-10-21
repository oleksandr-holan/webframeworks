import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import App from '@/App.vue'
import '@testing-library/jest-dom/vitest'
import { faker } from '@faker-js/faker'

test('renders registration form with all fields', () => {
  // Arrange and Act
  render(App)

  // Assert
  expect(screen.getByLabelText('Name')).toBeInTheDocument()
  expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
  expect(screen.getByText('Save')).toBeInTheDocument()
})

test('validates required fields', async () => {
  render(App)

  await userEvent.click(screen.getByRole('button', { name: /save/i }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
  expect(screen.getByText('Date of Birth is required')).toBeInTheDocument()
  expect(screen.getByText('Email is required')).toBeInTheDocument()
  expect(screen.getByText('Phone number is required')).toBeInTheDocument()
})

test('validates email format', async () => {
  render(App)

  await userEvent.type(screen.getByLabelText('Email'), 'invalid-email')
  await userEvent.click(screen.getByText('Save'))

  expect(screen.getByText('Invalid email format')).toBeInTheDocument()
})

test('validates phone number format', async () => {
  render(App)

  await userEvent.type(screen.getByLabelText('Phone number'), '123')
  await userEvent.click(screen.getByText('Save'))

  expect(screen.getByText('Invalid phone number format')).toBeInTheDocument()
})

test('validates date of birth is not in the future', async () => {
  render(App)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  await userEvent.type(
    screen.getByLabelText('Date of Birth'),
    tomorrow.toISOString().split('T')[0],
  )
  await userEvent.click(screen.getByText('Save'))

  expect(
    screen.getByText('Date of birth cannot be in the future'),
  ).toBeInTheDocument()
})

test('adds new user to the table after form submission', async () => {
  render(App)

  // Arrange
  const fakeUser = {
    name: faker.person.fullName(),
    dateOfBirth: faker.date.birthdate().toISOString().split('T')[0], // Format: YYYY-MM-DD
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }), // 10-digit number
  }

  // Act
  await userEvent.type(screen.getByLabelText('Name'), fakeUser.name)
  await userEvent.type(
    screen.getByLabelText('Date of Birth'),
    fakeUser.dateOfBirth,
  )
  await userEvent.type(screen.getByLabelText('Email'), fakeUser.email)
  await userEvent.type(screen.getByLabelText('Phone number'), fakeUser.phone)
  await userEvent.click(screen.getByText('Save'))

  // Assert
  const rows = screen.getAllByRole('row')
  const lastRow = rows[rows.length - 1]

  expect(lastRow).toHaveTextContent(fakeUser.name)
  expect(lastRow).toHaveTextContent(fakeUser.dateOfBirth)
  expect(lastRow).toHaveTextContent(fakeUser.email)
  expect(lastRow).toHaveTextContent(fakeUser.phone)
})
