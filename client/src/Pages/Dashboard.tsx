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
  
  // function to look through each book, if book year === current year, add to count
  const userId = user._id

  return (
  <>
    <h1 className='dashboardHeader'>Recent activity:</h1>
    {user.activityLog.map((activity:any) => {
    return <Message 
      activity={activity} 
      confirmFriend={confirmFriend} 
      userId={userId} 
      rejectFriendRequest={rejectFriendRequest}
      confirmBookReq={confirmBookReq}
      rejectBookReq={rejectBookReq}
      removeMessage={removeMessage}
      />
    })}
    <h1 className='dashboardHeader'>Goal progress:</h1>
    <h1 className='dashboardHeader'>Friends books available to borrow:</h1>
  </>
  )
}

export default Dashboard;