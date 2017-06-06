import React from 'react'
import AuthenticatedHome from './AuthenticatedHome'
import UnauthenticatedHome from './UnauthenticatedHome'

export default ({ user }) => user ? <AuthenticatedHome {...user} /> : <UnauthenticatedHome />
