import React from 'react'
import "./LoginDetails.css"
import LoginButton from '../LoginButton/LoginButton'

function LoginDetails() {
  return (
    <div className='LoginDetailsMain'>
        {/* <input type="text" id="username" placeholder="Enter Username"></input>
        <input type="text" id="pwd" placeholder="Enter pwd"></input> */}
          <LoginButton />
    </div>
  )
}

export default LoginDetails