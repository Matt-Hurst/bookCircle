import React, { FunctionComponent, useState } from "react"
import {UserInfo, User} from "../Interfaces"
import { BsFillPersonFill } from "react-icons/bs";
import './Friend.scss'


type FriendSearchResultProps = {
  otherUser: UserInfo,
  handleClick: Function,
  user: User
}

const FriendSearchResult: FunctionComponent<FriendSearchResultProps> = ({otherUser, handleClick, user}) => {
  const [pendingFriends, setPendingFriends] = useState(user.pendingFriends)
  const currentFriends = user.friends;


  return (
    <div className="friendDiv" key={otherUser._id}>
      <div className="friendIconAndNameDiv">
        <BsFillPersonFill className="friendIcon" />
        <h3>{otherUser.name}</h3>
      </div>
      { !(pendingFriends.includes(otherUser._id) || currentFriends?.includes(otherUser._id)) ? <button className="friendButton" onClick={() => {
          handleClick(otherUser._id)
          setPendingFriends([otherUser._id, ...pendingFriends])
         }}>add friend</button> : null}
      { pendingFriends.includes(otherUser._id) ? <button className="clickedFriendBtn" 
      >request sent</button> : null}
     { currentFriends && currentFriends.includes(otherUser._id) && <button className="friendsBtn" 
      >friends</button>}
    </div>
  )
}


export default FriendSearchResult;
