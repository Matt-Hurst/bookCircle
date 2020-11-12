import React from 'react'
import Logo from '../images/Logocircle1.png'
import iconStandIn from '../images/iconStandIn.png'

import './AuthHeader.scss'

const AuthHeader = () => {
  return (
    <div className="header">
      <img className='logo' src={Logo} alt="Book Circle logo"/>
      <img className='icon-standIn' src={iconStandIn} alt=""/>
    </div>
  )
}

export default AuthHeader;