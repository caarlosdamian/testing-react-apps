// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.

jest.mock('react-use-geolocation') // mock function
// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  // const {promise, resolve, reject} = deferred()

  // await window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     promise.then(() => callback(fakePosition))
  //   },
  // )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/

test('unhapp path ', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  // const {promise, resolve, reject} = deferred()

  // await window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     promise.then(() => callback(fakePosition))
  //   },
  // )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    setReturnValue([null, {message: 'Testing Error'}])
  })
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Testing Error"`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
