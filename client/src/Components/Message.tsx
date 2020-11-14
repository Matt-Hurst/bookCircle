import React, { FunctionComponent } from "react";
import { ActivityLog } from '../Interfaces'
import './Message.scss'

type MessageProps = {
  activity: ActivityLog,
  confirmFriend: Function,
  userId: string | null,
  rejectFriendRequest: Function
}

// TODO: conditional rendering based on type of activity - need to pass down following functions:
// // reject friend request and delete activity log and send activityLog to reject
// // accept book borrow request, send message to requester, and delete activityLog
// // reject book borrow request, send message to requester, and delete activityLog

// TODO: style component


const Message: FunctionComponent<MessageProps> = ({activity, confirmFriend, userId, rejectFriendRequest}) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.getAttribute('value');
    if (action === 'accept') {
      confirmFriend({...activity, userId: userId})
    }
    if (action === 'reject') {
      rejectFriendRequest({...activity, userId: userId})
    }
  }

  return (
    <div className="messageContainer">
      <p>{activity.message}</p>
      {activity.type === 'friendRequest' && <button value="accept" onClick={handleClick}>accept</button>}
      {activity.type === 'friendRequest' && <button value="reject" onClick={handleClick}>reject</button>}
    </div>
  )
}

export default Message;