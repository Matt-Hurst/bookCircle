import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../images/Logocircle1.png'

const UnauthHeader = () => {
  return (
    <div className="header">
      <Link to='/'>
        <img className='logo' src={Logo} alt="Book Circle logo"/>
      </Link>
    </div>
  )
}

export default UnauthHeader;