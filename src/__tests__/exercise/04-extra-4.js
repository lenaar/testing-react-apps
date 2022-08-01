// form testing
// http://localhost:3000/login

import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const userNameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const {username, password} = buildLoginForm({password: 'abcd'})
  await userEvent.type(userNameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({password, username})
})

/*
eslint
  no-unused-vars: "off",
*/
