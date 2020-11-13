import React, { useEffect, useState } from "react"
import { BsFillPersonFill } from "react-icons/bs";
import {getFriendName} from '../ApiService/serverApiService'
import './Friend.scss'

interface myProps {
  friendId: string;
}

const Friend = ({friendId}: myProps) => {
  const [friendName, setFriendName] = useState('')

  useEffect(() => {
    getFriendsName(friendId)
  },[friendId])

  async function getFriendsName(id: string) {
    const result:any = await getFriendName(id)
    setFriendName(result);
  } 

  return (
    <div className="friendDiv">
      <div className="friendIconAndNameDiv">
        <BsFillPersonFill className="friendIcon" />
        {<h3>{friendName}</h3>}
      </div>
      <button className="friendButton">view books</button>
    </div>
  )
}

export default Friend;