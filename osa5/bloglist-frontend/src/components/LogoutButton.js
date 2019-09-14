import React from 'react'

const LogoutButton = ({user, handleLogout}) => {
    return(
    <button id={user.id} onClick={handleLogout}>logout</button>
    )
}

export default LogoutButton