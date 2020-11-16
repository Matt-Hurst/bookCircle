import React, { FunctionComponent, useEffect, useState } from "react";
import Message from "../Components/Message"
import BookShelf from "../Components/BookShelf"
import ProgressBar from "../Components/ProgressBar"
import EditTarget from "../Components/EditTarget"
import { User } from '../Interfaces'
import { getAvailableBooks } from "../ApiService/serverApiService"
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
  removeMessage: Function,
  updateYearlyTarget: Function
}

const Dashboard: FunctionComponent<DashboardProps> = (
  {
    user, 
    confirmFriend, 
    rejectFriendRequest, 
    confirmBookReq, 
    rejectBookReq, 
    removeMessage,
    updateYearlyTarget
  }) => {
    const [borrowableBooks, setBorrowableBooks] = useState(null)
    const [updateTargetClicked, setUpdateTargetClicked] = useState(false)

  async function handleUpdateTarget (newTarget: number) {
    await updateYearlyTarget(user._id, newTarget)
    setUpdateTargetClicked(false)
  }

  async function getAllAvailableBooks (id:string | null) {
    const result = await getAvailableBooks(id)
    setBorrowableBooks(result)
  }

  function availableBookClicked (book: any) {
    console.log(book)
  }
  const userId = user._id

  useEffect( () => {
    getAllAvailableBooks(user._id)
  } ,[])

  let booksReadThisYear = 0;

  if (user.books && user.books.length > 0) {
    user.books.forEach(book => {
      if( book.dateRead) {
        const date = new Date(book.dateRead)
        const currentYear = new Date().getFullYear()
        if (date.getFullYear() === currentYear) {
          booksReadThisYear++;
        }
      }
    }
    )
  }

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
    <div className="progressSection">
      <ProgressBar completed={user.books && user.books.length > 0 ? Math.round((booksReadThisYear/user.yearlyTarget)*100): 0}/>
      <div className="progressText">
        <h3>Books read this year:</h3>
        <h3>{`${booksReadThisYear}/${user.yearlyTarget}`}</h3>
        <button className="editTargetBtn"
          onClick={() => {
            setUpdateTargetClicked(true)
        }}>edit</button>
      </div>
    </div>
    {updateTargetClicked && 
      <EditTarget target={user.yearlyTarget} 
                  setUpdateTargetClicked={setUpdateTargetClicked}
                  handleUpdateTarget={handleUpdateTarget}/>}
    <h1 className='dashboardHeader'>All available books:</h1>
      <BookShelf books={borrowableBooks} handleBookClicked={availableBookClicked} fromDashboard={true}/>
  </>
  )
}

export default Dashboard;