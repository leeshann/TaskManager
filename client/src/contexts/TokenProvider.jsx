import React, { createContext, useEffect, useState } from 'react';

const TokenContext = createContext()

export function TokenProvider({children}) {
    const [token, setToken] = useState("")
    const [userID, setUserID] = useState("")

    useEffect(() => {
        const savedUserID = localStorage.getItem('userID')
        if (savedUserID) {
            const savedToken = localStorage.getItem(`accessToken${savedUserID}`)
            if (savedToken !== null) setToken(savedToken)
        }
    }, [])

    function login(newToken, userID) {
        localStorage.setItem('userID', userID)
        localStorage.setItem(`accessToken${userID}`, newToken)
        setToken(newToken)
        setUserID(userID)
    }

    function logout(userID) {
        localStorage.setItem('userID', userID)
        localStorage.removeItem(`accessToken${userID}`)
        setToken(null)
        setUserID(userID)
    }

    const values = {
        userID,
        token,
        login,
        logout
    }

    return (
        <TokenContext.Provider value={values}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContext
