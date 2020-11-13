import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Search from './Pages/Search'
import AuthHeader from './Components/AuthHeader'
import Bookcase from './Pages/Bookcase'
import Friends from './Pages/Friends'
import Dashboard from './Pages/Dashboard'

import { User } from './Interfaces'


interface myProps {
  user: User;
}

const AuthenticatedApp = (props: myProps) => {


  return (
    <Router>    
      <main>
        <AuthHeader />  
        <Switch>
          <Route path="/" component={Dashboard} exact/>
          <Route path="/yourLibrary" >
            <Bookcase user={props.user}/>
          </Route>
          <Route path="/friends">
            <Friends user={props.user}/>
          </Route>
          <Route path="/search" component={Search} />
          {/* <Route component={Error} /> */}
        </Switch>
      </main>
    </Router>
  )
}

export default AuthenticatedApp;