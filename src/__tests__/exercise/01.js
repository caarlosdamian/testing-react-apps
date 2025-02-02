// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client' 
import Counter from '../../components/counter'
import {render} from '@testing-library/react'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  act(() => createRoot(div).render(<Counter />))

  const buttons = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')
  const increment = buttons[1]
  const decrement = buttons[0]
  console.log(document.body.innerHTML)
  act(() => increment.click())
  expect(message.textContent).toBe('Current count: 1')
  act(() => decrement.click())
  expect(message.textContent).toBe('Current count: 0')

  div.remove()
})

/* eslint no-unused-vars:0 */
