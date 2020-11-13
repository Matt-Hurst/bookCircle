import React from "react";
import Message from "../Components/Message"
import { User } from '../Interfaces'
import './Dashboard.scss'

/* TODO:

=> make activity component and make render again
=> render goal and progress
=> find nice pie chart plugin
=> display book shelf showing all books users friends have available to borrow
*/

interface myProps {
  user: User;
}

const Dashboard = ({user}: myProps) => {
  
  // function to look through each book, if book year === current year, add to count
  
  return (
  <>
    <h1 className='dashboardHeader'>Recent activity:</h1>
    {user.activityLog.map((activity:any) => <Message activity={activity} />)}
    <h1 className='dashboardHeader'>Goal progress:</h1>
    <h1 className='dashboardHeader'>Friends books available to borrow:</h1>

  </>
  )
}

export default Dashboard;