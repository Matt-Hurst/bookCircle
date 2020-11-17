import React, { FunctionComponent, useEffect, useState } from "react";
import Message from "../Components/Message"
import BookShelf from "../Components/BookShelf"
import ProgressBar from "../Components/ProgressBar"
import EditTarget from "../Components/EditTarget"
import FriendsBook from "../Components/FriendsBook"
import { User, Book } from '../Interfaces'
import { getAvailableBooks } from "../ApiService/serverApiService"
import './Dashboard.scss'

type DashboardProps = {
  user: User,
  confirmFriend: Function,
  rejectFriendRequest: Function,
  confirmBookReq: Function,
  rejectBookReq: Function,
  removeMessage: Function,
  updateYearlyTarget: Function,
  handleBookRequest: Function,
  getSelectedFriend: Function
}

const Dashboard: FunctionComponent<DashboardProps> = (
  {
    user, 
    confirmFriend, 
    rejectFriendRequest, 
    confirmBookReq, 
    rejectBookReq, 
    removeMessage,
    updateYearlyTarget,
    handleBookRequest,
    getSelectedFriend
  }) => {
    const [borrowableBooks, setBorrowableBooks] = useState(null)
    const [updateTargetClicked, setUpdateTargetClicked] = useState(false)
    const [bookClicked, setBookClicked] = useState<Book | null>()

  async function handleUpdateTarget (newTarget: number) {
    await updateYearlyTarget(user._id, newTarget)
    setUpdateTargetClicked(false)
  }

  async function getAllAvailableBooks (id:string | null) {
    const result = await getAvailableBooks(id)
    const books = result.map((obj: any) => {
      return {...obj.book, friendName: obj.friendName}
    })
    setBorrowableBooks(books)
  }

  async function updateAvailableBooks() {
    return await getAllAvailableBooks(user._id)
  }

  function availableBookClicked (book: Book) {
    setBookClicked(book)
  }
  const userId = user._id

  useEffect( () => {
    getAllAvailableBooks(user._id)

    // return function () {
    //   setBorrowableBooks(null)
    // }
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
    {!user.activityLog.length ?  <p className="noMessages">{`${user.name} you have no new messages`}</p> : null}
    <h1 className='dashboardHeader'>Goal progress:</h1>
    <div className="progressSection">
      <ProgressBar completed={user.books && user.books.length > 0 ? 
        Math.round((booksReadThisYear/user.yearlyTarget)*100): 0}/>
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
    <BookShelf books={borrowableBooks} handleBookClicked={availableBookClicked} fromDashboard={true} />
    {bookClicked && 
      <FriendsBook  clickedBook={bookClicked} 
                    handleBookRequest={handleBookRequest} 
                    handleClosePopOut={setBookClicked}
                    getSelectedFriend={getSelectedFriend}
                    updateAvailableBooks={updateAvailableBooks}
                    />}
                    
  </>
  )
}

export default Dashboard;