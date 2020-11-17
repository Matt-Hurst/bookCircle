import React, { useState, useEffect } from 'react';
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import { 
  getUser, 
  acceptFriend, 
  rejectFriend, 
  acceptBookRequest,
  rejectBookRequest,
  deleteMessage,
  addFriend,
  updateTarget,
  addBook,
  deleteBook
  } from './ApiService/serverApiService'
import { ActivityLog, User, AddFriend, BookRequest, NewBook } from './Interfaces'
import './App.scss';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<any>()

  async function getUserData (name: string) {
    const user: User = await getUser(name);
    setUserLoggedIn(user);
  }

  // TODO: function that saves all friends books available to borrow to state
  
  useEffect( () => {
    getUserData('Matt')
  }, [])

  // function to add friend
  const handleAddFriend = async (obj: AddFriend) => {
    const result: any = await addFriend(obj);
    setUserLoggedIn(result)
  }

  // function to confirm friend
  const confirmFriend = async (activity: ActivityLog) => {
    const result: any = await acceptFriend(activity);
    setUserLoggedIn(result)
  }
  // function to reject friend request
  const rejectFriendRequest = async (activity: ActivityLog) => {
    const result: any = await rejectFriend(activity);
    setUserLoggedIn(result)
  }
  // function to confirm book request
  const confirmBookReq = async (activity: ActivityLog) => {
    const result: any = await acceptBookRequest(activity);
    setUserLoggedIn(result)
  }
  // function to reject book request
  const rejectBookReq = async (obj: BookRequest) => {
    const result: any = await rejectBookRequest(obj);
    setUserLoggedIn(result)
  }

  //function to remove messages with no actions from dashboard
  const removeMessage = async (activity: ActivityLog) => {
    const result: any = await deleteMessage(activity);
    setUserLoggedIn(result)
  }

  // update target
  const updateYearlyTarget = async (id: string, newTarget: number) => {
    const result: any = await updateTarget(id, newTarget);
    setUserLoggedIn(result)
  }

  // add book
  const addBookToBookCase = async (newbook: NewBook) => {
    const result: any = await addBook(newbook);
    setUserLoggedIn({...userLoggedIn, books: result})
  }
  
  const removeBookFromBookCase = async (userId: string, bookId: string) => {
    const result: any = await deleteBook(userId, bookId);
    setUserLoggedIn(result)
    console.log('App',result)
  }

  return (
    <div>
    { userLoggedIn && 
    <AuthenticatedApp 
    user={userLoggedIn} 
    confirmFriend={confirmFriend} 
    rejectFriendRequest={rejectFriendRequest} 
    confirmBookReq={confirmBookReq}
    rejectBookReq={rejectBookReq}
    removeMessage={removeMessage}
    handleAddFriend={handleAddFriend}
    updateYearlyTarget={updateYearlyTarget}
    addBookToBookCase={addBookToBookCase}
    removeBookFromBookCase={removeBookFromBookCase}
    />}
    { !userLoggedIn && <UnauthenticatedApp />}
   </div>
  );
}

export default App;
