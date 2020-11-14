import React, { FunctionComponent } from "react";
import { ActivityLog } from '../Interfaces'
import './Message.scss'

type MessageProps = {
  activity: ActivityLog,
  confirmFriend: Function,
  userId: string | null,
  rejectFriendRequest: Function,
  confirmBookReq: Function
}

// TODO: conditional rendering based on type of activity - need to pass down following functions:
// // accept book borrow request, send message to requester, and delete activityLog
// // reject book borrow request, send message to requester, and delete activityLog

// TODO: style component


const Message: FunctionComponent<MessageProps> = ({activity, confirmFriend, userId, rejectFriendRequest, confirmBookReq}) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.getAttribute('value');
    if (activity.type === 'friendRequest') {
      if (action === 'accept') {
        confirmFriend({...activity, userId: userId})
      }
      if (action === 'reject') {
        rejectFriendRequest({...activity, userId: userId})
      }
    } else if (activity.type === 'bookRequest') {
      if (action === 'accept') {
        console.log(action, 'accept')
        confirmBookReq({...activity, userId: userId})
      }
      if (action === 'reject') {
        console.log(action, 'reject')
      }
    }
  }

  return (
    <div className="messageContainer">
      <p>{activity.message}</p>
      {activity.type === 'friendRequest' && 
        <div>
          <button value="accept" onClick={handleClick}>accept</button>
          <button value="reject" onClick={handleClick}>reject</button>
        </div>}
      {activity.type === 'bookRequest' && 
        <div>
          <button value="accept" onClick={handleClick}>accept</button>
          <button value="reject" onClick={handleClick}>reject</button>
        </div>}
    </div>
  )
}

export default Message;