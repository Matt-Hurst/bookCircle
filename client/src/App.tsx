import React, { useState } from 'react';
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import './App.scss';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({loggedIn: true, name: 'Matt'})

  return (
    <div>
    { userLoggedIn.loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
   </div>
  );
}

export default App;
