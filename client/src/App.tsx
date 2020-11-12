import React, { useState, useEffect } from 'react';
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import './App.scss';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({loggedIn: false, name: 'Matt'})

  useEffect(() => {
    setUserLoggedIn({...userLoggedIn, loggedIn: true});
  }, [])

  return (
    <div>
    { userLoggedIn.loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
   </div>
  );
}

export default App;
