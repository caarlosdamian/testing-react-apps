import React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from 'components/theme'
import EasyButton from 'components/easy-button'
import userEvent from '@testing-library/user-event'
import App from 'examples/easy-button'

const AllTheProviders = ({children}) => {
  return <ThemeProvider theme="light">{children}</ThemeProvider>
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
// export * from '@testing-library/react'

// override render method
export {customRender as render}

beforeEach(() => customRender(<App />))

test('renders with the light styles for the light theme', () => {
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})
test('renders with the dark styles for the dark theme', async () => {
  const button = screen.getByRole('button', {name: /easy/i})
  const toggleButton = screen.getByRole('button', {name: /toggle/i})
  await userEvent.click(toggleButton)
  screen.debug()
  expect(button).toHaveStyle(`
  color: white; background-color: black;
  `)
})

/* eslint no-unused-vars:0 */
