// UsersTable.test.ts
import { render, screen } from '@testing-library/vue'
import { test, expect } from 'vitest'
import UsersTable from '@/components/UsersTable.vue'
import type { IUser } from '@/models/User'

test('renders users table with correct headers', () => {
  render(UsersTable)

  expect(screen.getByText('#')).toBeInTheDocument()
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('Date of Birth')).toBeInTheDocument()
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Phone number')).toBeInTheDocument()
})

test('displays users data correctly', () => {
  const users: IUser[] = [
    {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      email: 'john@example.com',
      phone: '1234567890',
    },
    {
      name: 'Jane Smith',
      dateOfBirth: '1995-05-05',
      email: 'jane@example.com',
      phone: '9876543210',
    },
  ]

  render(UsersTable, {
    props: { users },
  })

  users.forEach((user, index) => {
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.dateOfBirth)).toBeInTheDocument()
    expect(screen.getByText(user.email)).toBeInTheDocument()
    expect(screen.getByText(user.phone)).toBeInTheDocument()
    expect(screen.getByText((index + 1).toString())).toBeInTheDocument()
  })
})

test('displays empty message when no users', () => {
  render(UsersTable, {
    props: { users: [] },
  })

  expect(screen.getByText('No users registered')).toBeInTheDocument()
})
