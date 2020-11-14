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
import { getUser, requestBook } from './ApiService/serverApiService'

import { User, Book } from './Interfaces'


type AuthAppProps = {
  user: User,
  confirmFriend: Function,
  rejectFriendRequest: Function,
  confirmBookReq: Function,
  rejectBookReq: Function,
  removeMessage: Function
}

const AuthenticatedApp: FunctionComponent<AuthAppProps> = ({user, confirmFriend, rejectFriendRequest, confirmBookReq, rejectBookReq, removeMessage}) => {
  const [selectedFriend, setSelectedFriend] = useState<User>()

  async function getSelectedFriend(name: string) {
    const user: User = await getUser(name);
    setSelectedFriend(user);
    console.log(user)
  }

  async function handleBookRequest(book: Book) {
    const result: User = await requestBook({
      user: user,
      book: book,
      friendId: selectedFriend ? selectedFriend._id : undefined
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
            />
          </Route>
          <Route path="/yourLibrary" >
            <Bookcase username={user.name} user={user} handleBookRequest={handleBookRequest}/>
          </Route>
          <Route path="/friends">
            <Friends user={user}  getSelectedFriend={getSelectedFriend}/>
          </Route>
          <Route path="/friendsLibrary">
            <Bookcase username={user.name} 
            user={selectedFriend || user} 
            name={selectedFriend ? selectedFriend.name : null} 
            handleBookRequest={handleBookRequest}
            /> {/* TODO: cheated typescript here - need to refactor - shouldn't be passing user data down */}
          </Route>
          <Route path="/search" >
            <Search user={user} />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default AuthenticatedApp;