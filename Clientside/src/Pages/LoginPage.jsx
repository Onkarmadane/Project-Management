import React, { useEffect } from 'react'
import UserLogin from '../Components/Login/UserLogin'

const LoginPage = () => {
  useEffect(() => {
    document.title = 'User Login'
   })
  return (
    <div>
<UserLogin />
    </div>
  )
}

export default LoginPage