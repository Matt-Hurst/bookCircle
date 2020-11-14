import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"; 
import { BsFillPersonFill } from "react-icons/bs";
import {getFriendName} from '../ApiService/serverApiService'
import './Friend.scss'

interface myProps {
  friendId: string;
  getSelectedFriend: Function;
}

// props.history + push to the history.push
const Friend = ({friendId,  getSelectedFriend}: myProps) => {
  const [friendName, setFriendName] = useState('')
  let history = useHistory();

  useEffect(() => {
    getFriendsName(friendId)
  },[friendId])

  async function getFriendsName(id: string) {
    const result:any = await getFriendName(id)
    setFriendName(result);
  }

  async function handleClick() {
    await getSelectedFriend(friendName)
    history.push("/friendsLibrary")
  }

  return (
    <div className="friendDiv">
      <div className="friendIconAndNameDiv">
        <BsFillPersonFill className="friendIcon" />
        {<h3>{friendName}</h3>}
      </div>
        <button className="friendButton" onClick={handleClick}>
          view books
        </button>    
    </div>
  )
}

export default Friend;