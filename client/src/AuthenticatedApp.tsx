import React, { useState, FunctionComponent } from 'react'
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
import { getUser } from './ApiService/serverApiService'

import { User } from './Interfaces'


type AuthAppProps = {
  user: User,
  confirmFriend: Function,
}

const AuthenticatedApp: FunctionComponent<AuthAppProps> = ({user, confirmFriend}) => {
  const [selectedFriend, setSelectedFriend] = useState<User>()

  async function getSelectedFriend(name: string) {
    const user: User = await getUser(name);
    setSelectedFriend(user);
    console.log(user)
  }

  return (
    <Router>    
      <main>
        <AuthHeader />  
        <Switch>
          <Route path="/" exact >
            <Dashboard user={user} confirmFriend={confirmFriend} />
          </Route>
          <Route path="/yourLibrary" >
            <Bookcase user={user}/>
          </Route>
          <Route path="/friends">
            <Friends user={user}  getSelectedFriend={getSelectedFriend}/>
          </Route>
          <Route path="/friendsLibrary">
            <Bookcase user={selectedFriend || user} name={selectedFriend ? selectedFriend.name : null} /> {/* TODO: cheated typescript here - need to refactor - shouldn't be passing user data down */}
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