import React from 'react'
import Logo from '../images/Logocircle1.png'

import './AuthHeader.scss'

const AuthHeader = () => {
  return (
    <div className="header">
      <img className='logo' src={Logo} alt="Book Circle logo"/>
    </div>
  )
}

export default AuthHeader;