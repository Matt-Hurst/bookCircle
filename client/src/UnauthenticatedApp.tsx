import React from 'react';
import UnauthHeader from './Components/UnauthHeader';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


const UnauthenticatedApp = () => {
  
  return (
  <>
    <Router>
      <UnauthHeader />
      <Switch>
        <Route path="/" exact >
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>      
    </Router>
  </>
  )
}

export default UnauthenticatedApp;