import React, { useState, FunctionComponent, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Search from './Pages/Search'
import AuthHeader from './Components/AuthHeader'
import Bookcase from './Pages/Bookcase'
import Friends from './Pages/Friends'
import Dashboard from './Pages/Dashboard'
import FriendSearch from './Pages/FriendSearch'
import { getUser, requestBook } from './ApiService/serverApiService'

import { User, Book } from './Interfaces'


type AuthAppProps = {
  user: User,
  confirmFriend: Function,
  rejectFriendRequest: Function,
  confirmBookReq: Function,
  rejectBookReq: Function,
  removeMessage: Function,
  handleAddFriend: Function,
  updateYearlyTarget: Function,
  addBookToBookCase: Function
}

const AuthenticatedApp: FunctionComponent<AuthAppProps> = (
  {user, 
  confirmFriend, 
  rejectFriendRequest, 
  confirmBookReq, 
  rejectBookReq, 
  removeMessage, 
  handleAddFriend,
  updateYearlyTarget,
  addBookToBookCase
  }) => {
  const [selectedFriend, setSelectedFriend] = useState<User>()

  async function getSelectedFriend(name: string) {
    const user: User = await getUser(name);
    setSelectedFriend(user);
  }

  async function handleBookRequest(book: Book) {
    const result: any = await requestBook({
      user: user,
      book: book,
      friendId: selectedFriend ? selectedFriend._id : book._id
    })
    setSelectedFriend(result)
  }

  return (
    <Router>    
      <main>
        <AuthHeader />  
        <Switch>
          <Route path="/" exact >
            <Dashboard user={user} 
            confirmFriend={confirmFriend} 
            rejectFriendRequest={rejectFriendRequest}
            confirmBookReq={confirmBookReq}
            rejectBookReq={rejectBookReq}
            removeMessage={removeMessage}
            updateYearlyTarget={updateYearlyTarget}
            handleBookRequest={handleBookRequest}
            getSelectedFriend={getSelectedFriend}
            />
          </Route>
          <Route path="/yourLibrary" >
            <Bookcase 
              username={user.name} 
              user={user} 
              handleBookRequest={handleBookRequest} 
              fromUserLibrary={true} 
            />
          </Route>
          <Route path="/friends">
            <Friends user={user}  getSelectedFriend={getSelectedFriend}/>
          </Route>
          <Route path="/friendSearch">
            <FriendSearch handleAddFriend={handleAddFriend} user={user}/>
          </Route>
          <Route path="/friendsLibrary">
            <Bookcase username={user.name} 
            user={selectedFriend || user} 
            name={selectedFriend ? selectedFriend.name : null} 
            handleBookRequest={handleBookRequest}
            /> {/* TODO: cheated typescript here - need to refactor - shouldn't be passing user data down */}
          </Route>
          <Route path="/search" >
            <Search user={user} addBookToBookCase={addBookToBookCase}/>
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default AuthenticatedApp;