import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import '../assets/css/login.css'
import TokenContext from '../contexts/TokenProvider'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordVisisble, setPasswordVisible] = useState(false)

    const { token, login } = useContext(TokenContext)

    function handleViewPassword(e) {
        setPasswordVisible(prev => !prev)
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3029/auth/login", {
                email: email,
                password: password
            })
            setInvalidCredentials(false)
            login(response.data.accessToken, response.data.userid)
            window.location = '/user/dashboard'
        } catch (error) {
            setInvalidCredentials(true)
            if (error.response) {
                setErrorMessage(error.response.data)
            }
        }
    }

    return (
        <div className='login-container'>
            <h1 className='login-header'>Welcome Back</h1>

            <form action="" className='login-form' onSubmit={handleLogin}>
                <div className='login-input-sections'>
                    <label htmlFor="email" >Email</label>
                    <input type="text" className='login-input' placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='login-input-sections'>
                    <label htmlFor="passowrd" >Password</label>
                    <input type={passwordVisisble ? "text" : "password"} className={passwordVisisble ? "display-password" : 'register-input'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className='login-view-password-section'>
                    <input type="checkbox" name='viewPassword' onChange={handleViewPassword}></input>
                    <label htmlFor="viewPassword">View Password</label>
                </div>

                {invalidCredentials && <div className='login-error-message'>{errorMessage}</div>}

                <button type="submit" className='login-submit-button'>Sign In</button>
            </form>

            <div className='login-register-section'>
                Don't have an account?<Link to="/register" className='login-signup-link'>Sign Up</Link>
            </div>
        </div>
    )
}