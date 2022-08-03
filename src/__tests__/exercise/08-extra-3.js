// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('customize initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})

  expect(result.current.count).toBe(3)
})

test('customize step for counter', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 4}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed after re-render', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 4},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  rerender({step: 5})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(-1)
})

/* eslint no-unused-vars:0 */
