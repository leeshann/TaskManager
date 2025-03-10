import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import '../assets/css/register.css'
import TokenContext from '../contexts/TokenProvider' 

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [passwordVisisble, setPasswordVisible] = useState(false)
    const { token, login, userID } = useContext(TokenContext)

    function handleViewPassword(e) {
        setPasswordVisible(prev => !prev)
    }

    async function handleRegister(e) {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3029/auth/register", {
                name: name,
                email: email,
                password: password
            })
            setInvalidCredentials(false)
            login(response.data.accessToken, response.data.userid)
            window.location = '/user/dashboard'
        } catch (error) {
            setInvalidCredentials(true)
            setErrorMessage(error.response.data)
        }
    }

    console.log("current access token is: ", token)
    console.log("current user id is: ", userID)

    return (
        <div className='register-container'>
            <h1 className='login-header'>Welcome!</h1>

            <form action="" className='register-form' onSubmit={handleRegister}>
                
                <div className='register-input-sections'>
                    <label htmlFor="name" >Name</label>
                    <input type="text" className='register-input' placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required/>
                </div>

                <div className='register-input-sections'>
                    <label htmlFor="email" >Email</label>
                    <input type="text" className='register-input' placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
            
                <div className='register-input-sections'>
                    <label htmlFor="passowrd" >Password</label>
                    <input type={passwordVisisble ? "text" : "password"} className={passwordVisisble ? "display-password" : 'login-input'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                {invalidCredentials && 
                <div className='register-error-message'>
                    Email or password is invalid. Password must contain: 
                    <ul className='register-error-message-list'>
                        <li>At least one letter</li>
                        <li>At least one digit</li>
                        <li>At least one special character</li>
                        <li>Must be at least 8 characters</li>
                        <li>No whitespaces</li>
                    </ul>
                </div>}

                <div className='register-view-password-section'>
                    <input type="checkbox" name='viewPassword' onChange={handleViewPassword}></input>
                    <label htmlFor="viewPassword">View Password</label>
                </div>

                <button type="submit" className='register-submit-button'>Sign Up</button>

            </form>

            <div className='login-section'>
                Have an account?<Link to="/" className='login-signup-link'>Log In</Link>
            </div>
        </div>
    )
}