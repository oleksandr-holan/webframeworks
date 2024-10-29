import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import App from '@/App.vue'
import '@testing-library/jest-dom/vitest'

/* 
1. new winner button is disabled when there are 3 winners
2. new winner button is disabled when no loosers left
*/

test('renders winners block with new winner button', async () => {
  render(App)

  const input = screen.getByText('Winners')
  expect(input).toBeInTheDocument()

  const button = screen.getByText('New winner')
  expect(button).toBeInTheDocument()
})

test('new winner button is disabled when there are 3 winners', async () => {
  const { rerender } = render(App)

  const button = screen.getByText('New winner')
  expect(button).toBeDisabled()

  rerender({ winners: ['Winner 1', 'Winner 2'] })
  expect(button).toBeEnabled()
})

test('new winner button is disabled when users list is empty', async () => {
  render(App)

  const button = screen.getByText('New winner')
  expect(button).toBeDisabled()
})

test.skip('can remove a winner', async () => {
  const mockRemoveWinner = vi.fn()
  render(App)

  const removeButton = screen.getByLabelText('Remove Winner 1')
  await userEvent.click(removeButton)

  expect(mockRemoveWinner).toHaveBeenCalledWith('Winner 1')
})
