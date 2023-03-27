import React from 'react'
import VitLogo from './Components/VitLogo/VitLogo'
import LoginDetails from './Components/LoginDetails/LoginDetails'
import { useAuth0 } from '@auth0/auth0-react';

function LoginPage() {
  
  const { isAuthenticated } = useAuth0();
  return (
    <div>
        {!isAuthenticated ? <VitLogo /> : <div></div>}
        <LoginDetails />
    </div>
  )
}

export default LoginPage