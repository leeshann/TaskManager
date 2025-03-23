import '../assets/css/logoutMenu.css'
import TokenContext from '../contexts/TokenProvider'
import { useContext } from 'react'


export default function LogoutMenu() {
    const { userID, logout } = useContext(TokenContext)

    function handleLogout(e) {
        logout(userID)
    }

    return (
        <div className='logout-menu-container'>
            <button className='logout-button' onClick={e => handleLogout(e)}>Sign Out</button>
        </div>
    )
}