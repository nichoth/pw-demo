import { useState } from 'react'
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

    function handleInput (ev) {
        console.log('input', ev.target.name, ev.target.value)
        const { name, value } = ev.target

        const obj = {}
        obj[name] = value
        const pwds = Object.assign({}, pendingPwds, obj)

        setPendingPwds(pwds)
    }

    const [pwdOk, validation] = pwIsOk(pendingPwds)

    const requirements = {
        length: ['minimum length of 6 characters'],
        upper: ['at least 1 uppercase character'],
        lower: ['at least 1 lowercase character'],
        digit: ['at least 1 number'],
        eq: ['verification is equal'],
        special: ['has at least 1 special character — ', 
            <code key="code">{'!@#$%^&*()_-+={[}]|:;"\'<,>.'}</code>]
    }

    return (
    <div className="the-app">
        <h1>Reset a password</h1>

        <h2>Password requirements</h2>

        <ul className="form-instructions">
            {Object.keys(validation).map(k => {
                console.log('validation', k, validation[k])
                const isValid = validation[k]
                return <li key={k}>
                    {pendingPwds.password.length ?
                        (isValid ? <span>✅ </span> : <span>🔘 </span>) :
                        <span>🔘</span>
                    }
                    {' ' + requirements[k][0]}
                    {requirements[k][1] ?
                        requirements[k][1] :
                        null
                    }
                </li>
            })}
        </ul>

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

            <Button disabled={!pwdOk} type="submit"
                isSpinning={isResolving}
            >
                Save password
            </Button>
        </form>
    </div>
    )
};

export default App;


// (?=.*[a-z]) -- at least one lowercase letter
// (?=.*[A-Z]) -- at least one uppercase letter
// (?=.*[0-9]) -- at least one digit
// const specialTester = new RegExp("(?=.*[!@#$%\^\"'&*()]).")
const specialChars = '!@#$%^&*()_-+={[}]|:;"\'<,>.'

const upperTester = new RegExp("(?=.*[A-Z])")
const lowerTester = new RegExp("(?=.*[a-z])")
const digit = new RegExp("(?=.*[0-9])")

function pwIsOk (pendingPwds) {
    const { password, passwordVerify } = pendingPwds

    // TODO -- could use regex here, but how?
    const hasSpecial = Array.prototype.some.call(password, l => {
        return specialChars.includes(l)
    })

    const vals = {
        length: (password.length >= 6),
        upper: upperTester.test(password),
        lower: lowerTester.test(password),
        digit: digit.test(password),
        eq: (password === passwordVerify),
        special: (hasSpecial)
    }

    // return [isValid, { validation-msgs }]
    return [
        Object.keys(vals).reduce((isValid, k) => {
            return isValid && vals[k]
        }, true),

        vals
    ]

    // if (password.length <= 6) return [false, 'blabla']
    // console.log('is more than 6')

    // if (password !== passwordVerify) return [false, 'blabla']
    // console.log('is equal')

    // if (!hasSpecial || !tester.test(password)) return [false, 'blabla']
    // console.log('has special and regex is ok')

    // return [true]
}
