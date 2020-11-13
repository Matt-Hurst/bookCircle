import React from "react"
import Friend from '../Components/Friend'

import { BsPersonPlus } from "react-icons/bs";
import { User } from '../Interfaces'
import './Friends.scss'

interface myProps {
  user: User;
  getSelectedFriend: Function;
}

const Friends = ({user,  getSelectedFriend}: myProps) => {

  return (
    <>
    <header className="friendsHeader">
      <h1 className='searchH1'>Your Friends:</h1>
      <BsPersonPlus className="addFriendIcon" />
    </header>
      <div className="friendsDiv">
        {user && user.friends?.map(friend => {
          return <Friend friendId={friend}  getSelectedFriend={getSelectedFriend} />
        })}
      </div>
    </>
  )
}

export default Friends;