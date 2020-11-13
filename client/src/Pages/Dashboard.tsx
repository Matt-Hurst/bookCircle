import React from "react";
import { User } from '../Interfaces'
import './Dashboard.scss'


interface myProps {
  user: User;
}

const Dashboard = ({user}: myProps) => {
  return (
  <>
    <h1 className='dashboardHeader'>Recent activity:</h1>
    <h1 className='dashboardHeader'>Goal progress:</h1>
    <h1 className='dashboardHeader'>Friends books available to borrow:</h1>

  </>
  )
}

export default Dashboard;