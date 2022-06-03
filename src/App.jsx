import { useState } from 'react'
// import logo from './logo.svg'
import TextInput from './text-input'
import Button from './button'
import './App.css'

const App = () => {
  const [isResolving, setResolving] = useState(false)
  const [pendingPwds, setPendingPwds] = useState({
      password: '',
      passwordVerify: ''
  })

  function savePassword (ev) {
    ev.preventDefault()
    setResolving(true)

    setTimeout(() => {
        setResolving(false)
    }, 2000)  // 2 seconds
  }

  // (?=.*[a-z]) -- at least one lowercase letter
  // (?=.*[A-Z]) -- at least one uppercase letter
  // (?=.*[0-9]) -- at least one digit
  const tester = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^\"'&*()]).")
  const specialChars = '!@#$%^&*()_-+={[}]|:;"\'<,>.'

  function handleInput (ev) {
    console.log('input', ev.target.name, ev.target.value)
    const { name, value } = ev.target

    const obj = {}
    obj[name] = value
    const pwds = Object.assign({}, pendingPwds, obj)

    setPendingPwds(pwds)
  }

  function pwIsOk () {
    const { password, passwordVerify } = pendingPwds

    // TODO -- could use regex here, but how?
    const hasSpecial = Array.prototype.some.call(password, l => {
        return specialChars.includes(l)
    })

    if (password.length <= 6) return false
    console.log('is more than 6')

    if (password !== passwordVerify) return false
    console.log('is equal')

    if (!hasSpecial || !tester.test(password)) return false
    console.log('has special and regex is ok')

    return true
  }

  return (
    <div className="the-app">
      <h1>Reset a password</h1>

      <h2>Password requirements</h2>
      <p>
          minimum length of 6 characters
      </p>
      <p>
          at least 1 uppercase character
      </p>
      <p>
          at least 1 lowercase character
      </p>
      <p>
          at least 1 number
      </p>
      <p>
          Password has at least 1 special character &mdash;
          (<code>{'!@#$%^&*()_-+={[}]|:;"\'<,>.'}</code>)
      </p>

      <form onSubmit={savePassword}>
          <TextInput type="password" displayName="Password"
              required={true} name="password" minLength={6}
              onChange={handleInput}
              value={pendingPwds.password}
          />
          <TextInput type="password" displayName="Verify password"
              name="passwordVerify"
              onChange={handleInput}
              value={pendingPwds.passwordVerify}
          />
          <Button disabled={!pwIsOk()} type="submit"
              isSpinning={isResolving}
          >
              Submit
          </Button>
      </form>
    </div>
  )
};

export default App;
