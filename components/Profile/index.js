// imports
import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// import env
import { auth0Domain } from '../../environment'

// Profile component
const Profile = () => {
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    )
}

export default Profile