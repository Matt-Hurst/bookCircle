import React, { FunctionComponent } from "react";
import Message from "../Components/Message"
import { User } from '../Interfaces'
import './Dashboard.scss'

/* TODO:

=> make activity component and make render again
=> render goal and progress
=> find nice pie chart plugin
=> display book shelf showing all books users friends have available to borrow
*/

type DashboardProps = {
  user: User,
  confirmFriend: Function,
  rejectFriendRequest: Function,
  confirmBookReq: Function,
  rejectBookReq: Function,
  removeMessage: Function
}

const Dashboard: FunctionComponent<DashboardProps> = ({user, confirmFriend, rejectFriendRequest, confirmBookReq, rejectBookReq, removeMessage}) => {
  
  // TODO:function to look through each book, if book year === current year, add to count

  // TODO: get all available books to borrow
  const userId = user._id

  return (
  <>
    <h1 className='dashboardHeader'>Recent activity:</h1>
    {user.activityLog.length ? user.activityLog.map((activity:any, i) => {
    return <Message 
      key={activity._id}
      activity={activity} 
      confirmFriend={confirmFriend} 
      userId={userId} 
      rejectFriendRequest={rejectFriendRequest}
      confirmBookReq={confirmBookReq}
      rejectBookReq={rejectBookReq}
      removeMessage={removeMessage}
      />
    }): null}
    {!user.activityLog.length ?  <p className="noMessages">no new messages</p> : null}
    <h1 className='dashboardHeader'>Goal progress:</h1>
    <h1 className='dashboardHeader'>Friends books available to borrow:</h1>
  </>
  )
}

export default Dashboard;