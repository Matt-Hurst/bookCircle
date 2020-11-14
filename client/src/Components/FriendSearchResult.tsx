import React, { FunctionComponent, useState } from "react"
import { BsFillPersonFill } from "react-icons/bs";
import './Friend.scss'

type UserInfo = {
  _id: string,
  name: string
}

type FriendSearchResultProps = {
  users: Array<UserInfo>,
  handleAddFriend: Function,
  user: string | null
}

const FriendSearchResult: FunctionComponent<FriendSearchResultProps> = ({users, handleAddFriend, user}) => {
  const [addFriendClicked, setAddFriendClicked] = useState(false)

  const handleClick = (id: string) => {
    handleAddFriend({friend_id: id, user: user})
    setAddFriendClicked(true)
  }

  return (
    <div> 
      {users.map(user => {
        return (
          <div className="friendDiv">
            <div className="friendIconAndNameDiv">
              <BsFillPersonFill className="friendIcon" />
              <h3>{user.name}</h3>
            </div>
              <button className={addFriendClicked ? 'clickedFriendBtn' : "friendButton"} onClick={() => handleClick(user._id)} >
              {addFriendClicked ? 'request sent' : "add friend"}
              </button>    
          </div>
        )
      })}
    </div>
  )
}

export default FriendSearchResult;