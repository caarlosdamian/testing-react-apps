// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

// function Counter({initialCount, step}) {
//   const {count, increment, decrement} = useCounter({initialCount, step})
//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

function setup(props) {
  const results = {}
  function TestComponent(props) {
    Object.assign(results, useCounter(props))
    return null
  }
  render(<TestComponent {...props} />)
  return results
}

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  await act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  await act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
  // console.log(results);
  // const count = screen.getByText(/Current count/i)
  // const incrementButton = screen.getByText(/Increment/i)
  // const decrementButton = screen.getByText(/Decrement/i)
  // expect(count).toMatchInlineSnapshot(`
  //   <div>
  //     Current count:
  //     0
  //   </div>
  // `)
  // await userEvent.click(incrementButton)
  // expect(count).toMatchInlineSnapshot(`
  //   <div>
  //     Current count:
  //     1
  //   </div>
  // `)
  // await userEvent.click(decrementButton)
  // expect(count).toMatchInlineSnapshot(`
  //   <div>
  //     Current count:
  //     0
  //   </div>
  // `)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 6}})
  expect(result.current.count).toBe(6)
})
test('allows customization of the step', async () => {
  const {result} = renderHook(useCounter, {
    initialProps: {initialCount: 6, step: 2},
  })

  // render(<TestComponent initialCount={6}  />)
  expect(result.current.count).toBe(6)
  await act(() => result.current.increment())
  expect(result.current.count).toBe(8)
})

test('athe step can be changed', async () => {
  const {result,rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })

  // render(<TestComponent initialCount={6}  />)
  expect(result.current.count).toBe(0)
  await act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step:2})
  await act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

// /* eslint no-unused-vars:0 */
