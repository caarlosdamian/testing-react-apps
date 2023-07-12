// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build,fake} from '@jackfranklin/test-data-bot'

const buildLoginform = build({
  fields:{
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  }
})

// const buildLoginForm = overrides => {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides,
//   }
// }

test('submitting the form calls onSubmit with username and password', async () => {

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginform()
  const submitButton = screen.getByText(/submit/i)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(submitButton)
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
