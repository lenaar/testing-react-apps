// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function setup(props) {
  const result = {}
  function TestComponent() {
    Object.assign(result, useCounter(props))
    return null
  }
  render(<TestComponent />)
  return result
}
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('customize initial count', () => {
  const result = setup({initialCount: 3})
  expect(result.count).toBe(3)
})

test('customize step for counter', () => {
  const result = setup({step: 4})
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(4)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})
/* eslint no-unused-vars:0 */
