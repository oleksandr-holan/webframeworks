// WinnersBlock.test.ts
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import WinnersBlock from '@/components/WinnersBlock.vue'
import '@testing-library/jest-dom/vitest'

test('renders winners block with new winner button', async () => {
  render(WinnersBlock)

  const input = screen.getByPlaceholderText('Winners')
  expect(input).toBeInTheDocument()

  const button = screen.getByText('New winner')
  expect(button).toBeInTheDocument()
})

test('new winner button is disabled when there are 3 winners', async () => {
  const { rerender } = render(WinnersBlock, {
    props: {
      userNames: ['Winner 1', 'Winner 2', 'Winner 3'],
    },
  })

  const button = screen.getByText('New winner')
  expect(button).toBeDisabled()

  rerender({ winners: ['Winner 1', 'Winner 2'] })
  expect(button).toBeEnabled()
})

test('new winner button is disabled when users list is empty', async () => {
  render(WinnersBlock, {
    props: {
      userNames: [],
    },
  })

  const button = screen.getByText('New winner')
  expect(button).toBeDisabled()
})

test.skip('can remove a winner', async () => {
  const mockRemoveWinner = vi.fn()
  render(WinnersBlock, {
    props: {
      userNames: ['Winner 1'],
      // removeWinner: mockRemoveWinner,
    },
  })

  const removeButton = screen.getByLabelText('Remove Winner 1')
  await userEvent.click(removeButton)

  expect(mockRemoveWinner).toHaveBeenCalledWith('Winner 1')
})
