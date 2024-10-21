// RegistrationForm.test.ts
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import RegistrationForm from '@/components/RegistrationForm.vue'
import '@testing-library/jest-dom/vitest'

test('renders registration form with all fields', () => {
  render(RegistrationForm)

  expect(screen.getByLabelText('Name')).toBeInTheDocument()
  expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
  expect(screen.getByText('Save')).toBeInTheDocument()
})

test('validates required fields', async () => {
  render(RegistrationForm)

  await userEvent.click(screen.getByRole('button', { name: /save/i }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
  expect(screen.getByText('Date of Birth is required')).toBeInTheDocument()
  expect(screen.getByText('Email is required')).toBeInTheDocument()
  expect(screen.getByText('Phone number is required')).toBeInTheDocument()
})

test('validates email format', async () => {
  render(RegistrationForm)

  await userEvent.type(screen.getByLabelText('Email'), 'invalid-email')
  await userEvent.click(screen.getByText('Save'))

  expect(screen.getByText('Invalid email format')).toBeInTheDocument()
})

test('validates phone number format', async () => {
  render(RegistrationForm)

  await userEvent.type(screen.getByLabelText('Phone number'), '123')
  await userEvent.click(screen.getByText('Save'))

  expect(screen.getByText('Invalid phone number format')).toBeInTheDocument()
})

test('validates date of birth is not in the future', async () => {
  render(RegistrationForm)

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

test('submits form with valid data', async () => {
  const mockSubmit = vi.fn()
  render(RegistrationForm, {
    props: {
      onSubmit: mockSubmit,
    },
  })

  await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
  await userEvent.type(screen.getByLabelText('Date of Birth'), '1990-01-01')
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
  await userEvent.type(screen.getByLabelText('Phone number'), '1234567890')
  await userEvent.click(screen.getByText('Save'))

  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    dob: '1990-01-01',
    email: 'john@example.com',
    phone: '1234567890',
  })
})
