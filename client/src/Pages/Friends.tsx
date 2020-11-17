import React from "react"
import { useHistory } from "react-router-dom";
import Friend from '../Components/Friend'

import { RiUserSearchLine } from "react-icons/ri";
import { User } from '../Interfaces'
import './Friends.scss'

interface myProps {
  user: User;
  getSelectedFriend: Function;
}

const Friends = ({user,  getSelectedFriend}: myProps) => {
  let history = useHistory();

  async function handleClick() {
    history.push("/friendSearch")
  }

  return (
    <>
    <header className="friendsHeader">
      <h1 className='searchH1'>Your Friends:</h1>
      <RiUserSearchLine className="addFriendIcon" onClick={handleClick} />
    </header>
      <div className="friendsDiv">
        {user && user.friends?.map(friend => {
          return <Friend friendId={friend}  getSelectedFriend={getSelectedFriend} key={friend}/>
        })}
      </div>
    </>
  )
}

export default Friends;