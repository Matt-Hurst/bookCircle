import React, { FunctionComponent } from "react";
import { ActivityLog } from '../Interfaces'
import './Message.scss'

type MessageProps = {
  activity: ActivityLog
}

// TODO: conditional rendering based on type of activity - need to pass down following functions:
// // accept friend request and delete activity log and send activity log to accepted
// // reject friend request and delete activity log and send activityLog to reject
// // accept book borrow request, send message to requester, and delete activityLog
// // reject book borrow request, send message to requester, and delete activityLog

// TODO: style component

const Message: FunctionComponent<MessageProps> = ({activity}) => {
  return (
    <div className="messageContainer">
      <p>{activity.message}</p>
    </div>
  )
}

export default Message;