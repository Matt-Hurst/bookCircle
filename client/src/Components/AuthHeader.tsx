import React from 'react'
import Logo from '../images/Logocircle1.png'
import { FaUserFriends } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { VscSearch } from "react-icons/vsc";

import './AuthHeader.scss'

const AuthHeader = () => {
  return (
    <div className="header">
      <img className='logo' src={Logo} alt="Book Circle logo"/>
      <div className="iconsDiv">
        <ImBooks className="icon"/>
        <FaUserFriends className="icon"/>
        <VscSearch className="icon searchIcon"/>
      </div>
    </div>
  )
}

export default AuthHeader;