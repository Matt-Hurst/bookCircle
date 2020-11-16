import React, { FunctionComponent } from "react"
import FriendSearchResult from "./FriendSearchResult"
import {UserInfo, User} from "../Interfaces"
import './Friend.scss'


type FriendsSearchResultsProps = {
  users: Array<UserInfo>,
  handleAddFriend: Function,
  user: User
}

const FriendsSearchResults: FunctionComponent<FriendsSearchResultsProps> = ({users, handleAddFriend, user}) => {

  const handleClick = (id: string) => {
    handleAddFriend({friend_id: id, user: user.name})
  }

  return (
    <div> 
      {users.map((otherUser) => {
        if (otherUser._id === user._id) return null;
        return (
          <FriendSearchResult otherUser={otherUser} handleClick={handleClick} user={user} />
        )})}
    </div>
  )
}

export default FriendsSearchResults;