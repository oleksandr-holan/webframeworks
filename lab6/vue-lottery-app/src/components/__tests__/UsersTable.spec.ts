import { render, screen } from '@testing-library/vue'
import { test, expect } from 'vitest'
import App from '@/App.vue'
import '@testing-library/jest-dom/vitest'

test('renders users table with correct headers', () => {
  render(App)

  const table = screen.getByRole('table')
  expect(table).toBeInTheDocument()

  const headers = screen.getAllByRole('columnheader')
  expect(headers).toHaveLength(5)

  const expectedHeaders = [
    '#',
    'Name',
    'Date of Birth',
    'Email',
    'Phone number',
  ]
  expectedHeaders.forEach((headerText, index) => {
    expect(headers[index]).toHaveTextContent(headerText)
  })
})
