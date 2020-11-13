import React, { useState } from 'react'
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


interface myProps {
  user: User;
}

const AuthenticatedApp = (props: myProps) => {
  const [selectedFriend, setSelectedFriend] = useState<User>()
  // create function that uses api function to get and set selectedFriend id
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
            <Dashboard user={props.user} />
          </Route>
          <Route path="/yourLibrary" >
            <Bookcase user={props.user}/>
          </Route>
          <Route path="/friends">
            <Friends user={props.user}  getSelectedFriend={getSelectedFriend}/>
          </Route>
          <Route path="/friendsLibrary">
            <Bookcase user={props.user} name={`Friends`} />
          </Route>
          <Route path="/search" component={Search} />
          {/* <Route component={Error} /> */}
        </Switch>
      </main>
    </Router>
  )
}

export default AuthenticatedApp;