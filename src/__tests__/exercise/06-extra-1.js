// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {coords: {latitude: 20, longitude: 150}}

  // to influence several times the inner result of useCurrentPosition
  // it requires externalize the setState inside function of useCurrentPosition mock implementation
  // it's done by setReturnState
  let setReturnState
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([])
    setReturnState = setState
    return state
  })

  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)

  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnState([fakePosition])
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
