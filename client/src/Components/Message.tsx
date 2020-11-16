import React, { FunctionComponent } from "react";
import { ActivityLog } from '../Interfaces'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import './Message.scss'

type MessageProps = {
  activity: ActivityLog,
  confirmFriend: Function,
  userId: string | null,
  rejectFriendRequest: Function,
  confirmBookReq: Function,
  rejectBookReq: Function,
  removeMessage: Function
}

// TODO: conditional rendering based on type of activity - need to pass down following functions:
// // accept book borrow request, send message to requester, and delete activityLog
// // reject book borrow request, send message to requester, and delete activityLog

// TODO: style component


const Message: FunctionComponent<MessageProps> = ({activity, confirmFriend, userId, rejectFriendRequest, confirmBookReq, rejectBookReq, removeMessage}) => {
  
  const handleClick = (action: string | React.MouseEvent<SVGElement, MouseEvent>) => {
    // const action = e.currentTarget.getAttribute('value');
    if (activity.type === 'friendRequest') {
      if (action === 'accept') {
        confirmFriend({...activity, userId: userId})
      }else if (action === 'reject') {
        rejectFriendRequest({...activity, userId: userId})
      }
    } else if (activity.type === 'bookRequest') {
      if (action === 'accept') {
        confirmBookReq({...activity, userId: userId})
      }else if (action === 'reject') {
        rejectBookReq({...activity, userId: userId})
      }
    } else if (activity.type === 'resolved') {
        removeMessage({...activity, userId: userId})
    }
  }

  return (
    <div className="messageContainer">
      <p>{activity.message}</p>
      {activity.type === 'friendRequest' && 
        <div className="requestBtnsContainer">
          <IoIosCheckmarkCircle className="friendRequestBtnAccept" onClick={() => handleClick('accept')} />
          <IoIosCloseCircle className="friendRequestBtnReject" onClick={() => handleClick('reject')} />
        </div>}
      {activity.type === 'bookRequest' && 
        <div className="requestBtnsContainer">
          <IoIosCheckmarkCircle className="friendRequestBtnAccept" onClick={() => handleClick('accept')} />
          <IoIosCloseCircle className="friendRequestBtnReject" onClick={() => handleClick('reject')} />
        </div>}
      {activity.type === 'resolved' && 
        <div>
          <IoIosCheckmarkCircle className="resolveRequestBtn" onClick={handleClick} />
        </div>}
    </div>
  )
}

export default Message;